from flask import Blueprint, jsonify
from models.history_db import HistoryDB
from config import Config

history_bp = Blueprint('history', __name__)

@history_bp.route('/history', methods=['GET'])
@history_bp.route('/api/history', methods=['GET'])
def get_history():
    try:
        db = HistoryDB(Config.DATABASE_PATH)
        predictions = db.get_all_predictions(limit=100)
        return jsonify({
            "status": "success",
            "count": len(predictions),
            "data": predictions
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@history_bp.route('/history/<record_id>', methods=['GET'])
@history_bp.route('/api/history/<record_id>', methods=['GET'])
def get_history_by_id(record_id):
    try:
        db = HistoryDB(Config.DATABASE_PATH)
        record = db.get_prediction_by_id(record_id)
        if record:
            return jsonify({
                "status": "success",
                "data": record
            }), 200
        return jsonify({
            "status": "error",
            "message": "Prediction record not found"
        }), 404
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@history_bp.route('/history/<record_id>', methods=['DELETE'])
@history_bp.route('/api/history/<record_id>', methods=['DELETE'])
def delete_history(record_id):
    try:
        db = HistoryDB(Config.DATABASE_PATH)
        success = db.delete_prediction(record_id)
        if success:
            return jsonify({
                "status": "success",
                "message": f"Record {record_id} deleted successfully"
            }), 200
        return jsonify({
            "status": "error",
            "message": "Record not found"
        }), 404
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@history_bp.route('/history/clear', methods=['DELETE'])
@history_bp.route('/api/history/clear', methods=['DELETE'])
def clear_history():
    try:
        db = HistoryDB(Config.DATABASE_PATH)
        db.clear_all()
        return jsonify({
            "status": "success",
            "message": "History cleared successfully"
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
