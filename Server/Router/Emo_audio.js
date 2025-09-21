const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;
const fssync = require('fs');
const FormData = require('form-data');

const router = express.Router();

const EMOTIONS = ['happy', 'sad', 'disgust', 'fear', 'anger', 'neutral'];
const ID_TO_LABEL = {
  0: 'anger',
  1: 'boredom',   // map to neutral later
  2: 'disgust',
  3: 'fear',
  4: 'happiness', // -> happy
  5: 'neutral',
  6: 'sadness'    // -> sad
};

function canonicalize(label) {
  const l = String(label || '').toLowerCase();
  if (l === 'happiness' || l === 'happy') return 'happy';
  if (l === 'sad' || l === 'sadness') return 'sad';
  if (l === 'anger' || l === 'angry') return 'anger';
  if (l === 'disgust' || l === 'disgusted') return 'disgust';
  if (l === 'fear' || l === 'afraid' || l === 'scared') return 'fear';
  if (l === 'boredom' || l === 'bored' || l === 'neutral') return 'neutral';
  return 'neutral';
}

function randomPrimaryEmotion() {
  return EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
}

function makeMockScores(primary = randomPrimaryEmotion(), primaryPercent = Math.floor(Math.random() * (95 - 62 + 1)) + 62) {
  const others = EMOTIONS.filter(e => e !== primary);
  const remainder = 100 - primaryPercent;
  const weights = others.map(() => Math.random());
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  const scores = {};
  others.forEach((e, i) => {
    scores[e] = Math.round((weights[i] / sum) * remainder);
  });
  // fix rounding to 100
  const othersTotal = others.reduce((acc, e) => acc + scores[e], 0);
  const drift = (100 - primaryPercent) - othersTotal;
  if (others.length) scores[others[0]] += drift;
  scores[primary] = primaryPercent;
  return { primary, scores };
}

// disk storage (delete after processing)
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/audio');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const ts = Date.now();
    const ext = path.extname(file.originalname) || '.wav';
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${name}_${ts}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = (file.mimetype || '').startsWith('audio') ||
               (file.originalname || '').match(/\.(wav|mp3|m4a|aac|ogg|webm)$/i);
    cb(ok ? null : new Error('Only audio files are allowed'), ok);
  }
});

async function callModelServer(filePath, fileName) {
  // Configure when real API is ready. Defaults intended to fail and trigger mock.
  const baseURL = process.env.EMO_MODEL_BASE_URL || 'http://localhost:5000';
  const predictPath = process.env.EMO_MODEL_PREDICT_PATH || '/predict';
  const url = `${baseURL}${predictPath}`;

  const form = new FormData();
  form.append('audio_file', fssync.createReadStream(filePath), { filename: fileName });
  // Also try common field name "audio" in case API expects that
  form.append('audio', fssync.createReadStream(filePath), { filename: fileName });

  const resp = await axios.post(url, form, {
    headers: form.getHeaders(),
    timeout: 20000
  });
  return resp.data;
}

function normalizeModelResponse(data) {
  // Accept shapes:
  // - { emotion: 'happy' }
  // - { label: 'happiness' }
  // - { emotion: 4 } (numeric id -> label via ID_TO_LABEL)
  // - { emotion: 'happy', scores: { happy: 0.82, sad: 0.03, ... } } (optional)
  let primary = null;

  if (typeof data?.emotion === 'number') {
    primary = canonicalize(ID_TO_LABEL[data.emotion]);
  } else {
    primary = canonicalize(data?.emotion || data?.label);
  }

  if (!primary || !EMOTIONS.includes(primary)) {
    const fallback = makeMockScores();
    return { primary: fallback.primary, scores: fallback.scores, source: 'mock' };
  }

  // If scores exist, normalize them to 0-100; otherwise synthesize with primary dominant
  const rawScores = data?.scores || data?.probabilities;
  if (rawScores && typeof rawScores === 'object') {
    const s = {};
    for (const e of EMOTIONS) {
      const v = rawScores[e] ?? rawScores[canonicalize(e)] ?? 0;
      s[e] = typeof v === 'number' ? (v <= 1 ? Math.round(v * 100) : Math.round(v)) : 0;
    }
    const total = EMOTIONS.reduce((a, e) => a + s[e], 0);
    if (total > 0) {
      for (const e of EMOTIONS) s[e] = Math.round((s[e] / total) * 100);
      const fix = 100 - EMOTIONS.reduce((a, e) => a + s[e], 0);
      s[EMOTIONS[0]] += fix;
    } else {
      // no valid scores, synthesize
      return { ...makeMockScores(primary), source: 'mock' };
    }
    return { primary, scores: s, source: 'model' };
  }

  return { ...makeMockScores(primary), source: 'mock' };
}

router.post('/analyze', upload.single('audio'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ success: false, message: 'No audio provided (field "audio")' });

  let result;
  try {
    // Try real model (likely not ready -> will fall back)
    try {
      const data = await callModelServer(file.path, file.filename);
      const normalized = normalizeModelResponse(data);
      result = { success: true, emotion: normalized.primary, scores: normalized.scores, source: normalized.source || 'model' };
    } catch (e) {
      const mock = makeMockScores();
      result = { success: true, emotion: mock.primary, scores: mock.scores, source: 'mock' };
    }
    res.json(result);
  } catch (err) {
    console.error('Audio analyze error:', err);
    res.status(500).json({ success: false, message: 'Failed to analyze audio' });
  } finally {
    // delete uploaded file after processing
    if (file?.path) {
      try { await fs.unlink(file.path); } catch {}
    }
  }
});

router.get('/health', async (req, res) => {
  const baseURL = process.env.EMO_MODEL_BASE_URL || 'http://localhost:5000';
  try {
    await axios.get(`${baseURL}/health`, { timeout: 3000 });
    res.json({ status: 'healthy', model: 'connected' });
  } catch {
    res.status(200).json({ status: 'degraded', model: 'disconnected' });
  }
});

router.get('/labels', (req, res) => {
  res.json({ emotions: EMOTIONS });
});

module.exports = router;
