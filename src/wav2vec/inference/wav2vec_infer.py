import torch
import librosa
import soundfile as sf
from transformers import Wav2Vec2Processor, Wav2Vec2ForSequenceClassification
import os
import requests

MODEL_PATH = "models/wav2vec_EmoDB_30.pth"
MODEL_URL = "https://github.com/Raghav-56/TheAutisticAPI/releases/download/v1.0/wav2vec_EmoDB_30.pth"
BASE_CKPT = "facebook/wav2vec2-base-960h"

if not os.path.exists(MODEL_PATH):
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    print(f"Downloading model from {MODEL_URL}...")
    with requests.get(MODEL_URL, stream=True) as r:
        r.raise_for_status()
        with open(MODEL_PATH, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    print("Download complete.")

# model = Wav2Vec2ForSequenceClassification.from_pretrained(MODEL_PATH)
# processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")

state_dict = torch.load(MODEL_PATH, map_location="cpu")
candidate_keys = [
    "classifier.weight",
    "projector.weight",
    "score.weight",
]
num_labels = None
for k in candidate_keys:
    if k in state_dict:
        num_labels = state_dict[k].shape[0]
        break
if num_labels is None:
    raise ValueError(
        "Could not infer num_labels automatically – please set it manually."
    )
print(f"Detected classifier with {num_labels} labels.")
model = Wav2Vec2ForSequenceClassification.from_pretrained(
    BASE_CKPT,
    num_labels=num_labels,
    ignore_mismatched_sizes=True,  # allows head shape to differ from base ckpt
)
model.load_state_dict(state_dict)
model.eval()
processor = Wav2Vec2Processor.from_pretrained(BASE_CKPT)


id2label = {
    0: "anger",
    1: "boredom",
    2: "disgust",
    3: "fear",
    4: "happiness",
    5: "neutral",
    6: "sadness",
}


def load_audio(file_path):
    audio, _ = librosa.load(file_path, sr=16000)
    return audio


def predict_emotion(wav_path: str) -> str:
    audio, _ = librosa.load(wav_path, sr=16_000)
    inputs = processor(
        audio,
        sampling_rate=16_000,
        return_tensors="pt",
        padding=True,
    )
    with torch.no_grad():
        logits = model(inputs.input_values).logits
        pred = int(torch.argmax(logits, dim=-1))
    return id2label.get(pred, str(pred))


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Emotion recognition with a Wav2Vec2 .pth checkpoint"
    )
    parser.add_argument("audio", help="Path to a WAV/FLAC/OGG file")
    args = parser.parse_args()

    emotion = predict_emotion(args.audio)
    print(f"Predicted emotion: {emotion}")
