from fastapi import APIRouter, File, UploadFile, HTTPException
import tempfile
import os
import importlib.util

router = APIRouter()

spec = importlib.util.spec_from_file_location(
    "wav2vec_infer",
    os.path.join(os.path.dirname(__file__), "inference", "wav2vec_infer.py"),
)
wav2vec_infer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(wav2vec_infer)


@router.get("/")
async def root():
    return {"status": "ok"}


@router.get("/health")
async def health():
    return {"status": "healthy"}


@router.post("/predict")
async def predict(audio_file: UploadFile = File(...)):
    if not audio_file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="File must be an audio file")
    try:
        audio_bytes = await audio_file.read()
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_file:
            tmp_file.write(audio_bytes)
            tmp_file_path = tmp_file.name
        audio = wav2vec_infer.load_audio(tmp_file_path)
        pred = wav2vec_infer.predict_emotion(audio)
        os.unlink(tmp_file_path)
        return {"emotion": int(pred)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
