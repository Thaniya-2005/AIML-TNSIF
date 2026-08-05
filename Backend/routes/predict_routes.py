from flask import Blueprint, request, jsonify
import uuid
from datetime import datetime
from utils.validators import validate_prediction_input
from services.model_service import ModelService
from services.risk_analyzer import analyze_patient_risk
from models.history_db import HistoryDB
from config import Config

predict_bp = Blueprint('predict', __name__)

@predict_bp.route('/predict', methods=['POST'])
@predict_bp.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(silent=True) or request.form.to_dict()
        
        is_valid, error_msg, cleaned_data = validate_prediction_input(data)
        if not is_valid:
            return jsonify({
                "status": "error",
                "message": error_msg
            }), 400

        # Run ML model prediction
        model_service = ModelService(Config.MODEL_PATH, Config.METADATA_PATH)
        pred_res = model_service.predict(cleaned_data)

        # Generate risk analysis & recommendations
        analysis = analyze_patient_risk(cleaned_data, pred_res)

        # Generate unique IDs & Timestamp
        record_id = f"HD-{uuid.uuid4().hex[:6].upper()}"
        patient_id = f"PT-2026-{uuid.uuid4().hex[:5].upper()}"
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        response_payload = {
            "status": "success",
            "id": record_id,
            "patient_id": patient_id,
            "prediction": pred_res["prediction"],
            "is_positive": pred_res["is_positive"],
            "probability": pred_res["probability"],
            "no_disease_probability": pred_res["no_disease_probability"],
            "risk_level": pred_res["risk_level"],
            "confidence": pred_res["confidence"],
            "recommendation": analysis["recommendation"],
            "risk_factors": analysis["risk_factors"],
            "lifestyle_tips": analysis["lifestyle_tips"],
            "model": pred_res["model_name"],
            "accuracy": pred_res["accuracy"],
            "prediction_time": pred_res["execution_time_ms"],
            "timestamp": timestamp,
            "input_data": cleaned_data
        }

        # Save to SQLite history database
        db = HistoryDB(Config.DATABASE_PATH)
        db.save_prediction({
            "id": record_id,
            "patient_id": patient_id,
            "age": cleaned_data["age"],
            "sex": cleaned_data["sex"],
            "prediction": pred_res["prediction"],
            "probability": pred_res["probability"],
            "risk_level": pred_res["risk_level"],
            "confidence": pred_res["confidence"],
            "input_data": cleaned_data,
            "risk_factors": analysis["risk_factors"],
            "recommendations": [analysis["recommendation"]] + analysis["lifestyle_tips"],
            "timestamp": timestamp
        })

        return jsonify(response_payload), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "status": "error",
            "message": f"Server processing error: {str(e)}"
        }), 500
