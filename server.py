from fastapi import FastAPI
from src.wav2vec.router import router as wav2vec_router

app = FastAPI()
app.include_router(wav2vec_router, prefix="/wav2vec")
