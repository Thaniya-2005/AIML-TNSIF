import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class Config:
    FLASK_ENV = os.getenv("FLASK_ENV", "development")
    PORT = int(os.getenv("PORT", 5000))
    HOST = os.getenv("HOST", "0.0.0.0")
    
    # Path handling for Model and Metadata
    MODEL_PATH = os.path.abspath(os.path.join(BASE_DIR, os.getenv("MODEL_PATH", "../Extracted Model/heart_disease_prediction_model.pkl")))
    METADATA_PATH = os.path.abspath(os.path.join(BASE_DIR, os.getenv("METADATA_PATH", "../Extracted Model/model_metadata.json")))
    DATABASE_PATH = os.path.abspath(os.path.join(BASE_DIR, os.getenv("DATABASE_PATH", "models/predictions_history.db")))
