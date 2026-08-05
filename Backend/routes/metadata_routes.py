from flask import Blueprint, jsonify
from services.model_service import ModelService
from config import Config

metadata_bp = Blueprint('metadata', __name__)

@metadata_bp.route('/health', methods=['GET'])
@metadata_bp.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "Heart Disease Prediction API",
        "version": "1.0.0"
    }), 200

@metadata_bp.route('/metadata', methods=['GET'])
@metadata_bp.route('/api/metadata', methods=['GET'])
def get_metadata():
    try:
        model_service = ModelService(Config.MODEL_PATH, Config.METADATA_PATH)
        metadata = model_service.metadata or {}
        return jsonify({
            "status": "success",
            "model_name": metadata.get("model_name", "Logistic Regression"),
            "accuracy": round(metadata.get("test_accuracy", 0.8032786885245902) * 100, 2),
            "num_features": len(metadata.get("features", [])),
            "training_samples": metadata.get("training_samples", 241),
            "testing_samples": metadata.get("testing_samples", 61),
            "total_dataset_samples": metadata.get("total_dataset_samples", 302),
            "features": metadata.get("features", [])
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
