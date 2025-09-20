# Wav2Vec Emotion Recognition Inference

This project utilizes a pre-trained Wav2Vec model to predict emotions from audio files. The model has been trained on the EmoDB dataset and can classify audio inputs into various emotional categories.

## Project Structure

```
wav2vec-inference
├── inference
│   └── wav2vec_infer.py
├── models
│   └── wav2vec_EmoDB_80.pth
├── requirements.txt
└── README.md
```

## Setup Instructions

1. **Clone the Repository**: 
   Clone this repository to your local machine using:
   ```
   git clone <repository-url>
   ```

2. **Set Up Environment**: 
   Ensure you have Python installed (preferably Python 3.7 or higher). It is recommended to create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**: 
   Navigate to the project directory and install the required libraries:
   ```
   pip install -r requirements.txt
   ```

## Inference Script

The inference script is located at `inference/wav2vec_infer.py`. This script loads the pre-trained model, processes audio input, and predicts the emotion from the audio file.

### How to Use the Inference Script

1. **Prepare Audio File**: 
   Place your audio file in a known directory. Update the `audio_file` variable in the script with the path to your audio file.

2. **Run the Script**: 
   Execute the script using the command:
   ```
   python inference/wav2vec_infer.py
   ```

3. **Interpret Results**: 
   The predicted emotion will be printed to the console. The output will be the predicted emotion class based on the audio input. You may need to map the predicted class index to the corresponding emotion label based on your label encoding.

## Model Information

- **Model File**: The trained model weights are stored in `models/wav2vec_EmoDB_80.pth`.
- **Processor**: The script uses the Wav2Vec2Processor from the Hugging Face Transformers library to preprocess audio inputs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.