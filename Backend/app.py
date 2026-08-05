import os
import sys

# Ensure Backend directory is in Python path for sub-module imports
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from flask import Flask
from flask_cors import CORS
from config import Config
from services.model_service import ModelService
from routes.predict_routes import predict_bp
from routes.history_routes import history_bp
from routes.metadata_routes import metadata_bp


def create_app():
    app = Flask(__name__)
    
    # Enable Cross-Origin Resource Sharing for all domains/ports
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Load Model once during server startup
    try:
        print("Initializing Model Service...")
        ModelService(Config.MODEL_PATH, Config.METADATA_PATH)
        print("Model Service initialized successfully.")
    except Exception as e:
        print(f"Warning: Model pre-loading encountered an error: {e}")

    # Register Blueprints
    app.register_blueprint(predict_bp)
    app.register_blueprint(history_bp)
    app.register_blueprint(metadata_bp)

    return app

app = create_app()

if __name__ == '__main__':
    port = Config.PORT
    host = Config.HOST
    print(f"Starting Heart Disease Prediction API server on http://{host}:{port}...")
    app.run(host=host, port=port, debug=(Config.FLASK_ENV == 'development'))
