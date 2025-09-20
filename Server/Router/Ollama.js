const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;
const FormData = require('form-data');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/ollama');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}_${timestamp}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow all file types as requested
    cb(null, true);
  }
});

// Clean up old files (3 days)
const cleanupOldFiles = async () => {
  try {
    const uploadDir = path.join(__dirname, '../uploads/ollama');
    const files = await fs.readdir(uploadDir);
    const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000);
    
    for (const file of files) {
      const filePath = path.join(uploadDir, file);
      const stats = await fs.stat(filePath);
      if (stats.mtime.getTime() < threeDaysAgo) {
        await fs.unlink(filePath);
        console.log(`Deleted old file: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning up old files:', error);
  }
};

// Run cleanup every hour
setInterval(cleanupOldFiles, 60 * 60 * 1000);

// Chat endpoint with streaming support
router.post('/chat', upload.array('files'), async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    const files = req.files || [];

    // Prepare the request to Ollama
    const ollamaRequest = {
      model: 'llama3:8b-instruct-q4_0', // Use the exact model name
      prompt: message,
      stream: true
    };

    // If files are uploaded, encode them for Ollama
    if (files.length > 0) {
      const fileData = [];
      for (const file of files) {
        const fileBuffer = await fs.readFile(file.path);
        const base64Data = fileBuffer.toString('base64');
        fileData.push({
          type: file.mimetype.startsWith('image/') ? 'image' : 'file',
          data: base64Data,
          filename: file.originalname,
          mimetype: file.mimetype
        });
      }
      
      ollamaRequest.images = fileData.filter(f => f.type === 'image').map(f => f.data);
      ollamaRequest.context = fileData.map(f => `File: ${f.filename} (${f.mimetype})`).join('\n');
    }

    // Set up Server-Sent Events
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    });

    // Send initial response with file info
    if (files.length > 0) {
      res.write(`data: ${JSON.stringify({
        type: 'files',
        files: files.map(f => ({
          filename: f.originalname,
          size: f.size,
          mimetype: f.mimetype,
          path: f.filename
        }))
      })}\n\n`);
    }

    // Make request to Ollama
    const response = await axios.post('http://localhost:11434/api/generate', ollamaRequest, {
      responseType: 'stream',
      timeout: 300000
    });

    // Handle streaming response
    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (data.response) {
            res.write(`data: ${JSON.stringify({
              type: 'token',
              token: data.response,
              done: data.done || false,
              model: 'Vedya' // Custom display name
            })}\n\n`);
          }
          
          if (data.done) {
            res.write(`data: ${JSON.stringify({
              type: 'done',
              model: 'Vedya',
              conversationId
            })}\n\n`);
            res.end();
          }
        } catch (parseError) {
          console.error('Error parsing Ollama response:', parseError);
        }
      }
    });

    response.data.on('error', (error) => {
      console.error('Ollama stream error:', error);
      res.write(`data: ${JSON.stringify({
        type: 'error',
        message: 'Stream error occurred'
      })}\n\n`);
      res.end();
    });

  } catch (error) {
    console.error('Chat error:', error);
    
    if (!res.headersSent) {
      res.writeHead(500, {
        'Content-Type': 'application/json'
      });
    }
    
    res.write(`data: ${JSON.stringify({
      type: 'error',
      message: error.response?.data?.error || 'Failed to connect to Ollama. Make sure it\'s running on localhost:11434'
    })}\n\n`);
    res.end();
  }
});

// Delete specific file endpoint
router.delete('/file/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads/ollama', filename);
    
    await fs.unlink(filePath);
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ success: false, message: 'Failed to delete file' });
  }
});

// Get available models from Ollama
router.get('/models', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:11434/api/tags');
    const models = response.data.models || [];
    
    // Map internal names to display names
    const mappedModels = models.map(model => ({
      ...model,
      display_name: model.name === 'llama3' ? 'Vedya' : model.name
    }));
    
    res.json({ models: mappedModels });
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch models. Make sure Ollama is running.' 
    });
  }
});

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:11434/api/tags', { timeout: 5000 });
    res.json({ status: 'healthy', ollama: 'connected' });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy', 
      ollama: 'disconnected',
      message: 'Ollama is not responding on localhost:11434'
    });
  }
});

module.exports = router;