import sqlite3
import json
import os
from datetime import datetime

class HistoryDB:
    def __init__(self, db_path):
        self.db_path = db_path
        # Ensure parent directory exists
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        self.init_db()

    def get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS predictions (
                    id TEXT PRIMARY KEY,
                    patient_id TEXT NOT NULL,
                    age INTEGER NOT NULL,
                    sex INTEGER NOT NULL,
                    prediction TEXT NOT NULL,
                    probability REAL NOT NULL,
                    risk_level TEXT NOT NULL,
                    confidence TEXT NOT NULL,
                    input_data_json TEXT NOT NULL,
                    risk_factors_json TEXT NOT NULL,
                    recommendations_json TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()

    def save_prediction(self, record):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO predictions (
                    id, patient_id, age, sex, prediction, probability, risk_level,
                    confidence, input_data_json, risk_factors_json, recommendations_json, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                record['id'],
                record['patient_id'],
                record['age'],
                record['sex'],
                record['prediction'],
                record['probability'],
                record['risk_level'],
                record['confidence'],
                json.dumps(record.get('input_data', {})),
                json.dumps(record.get('risk_factors', [])),
                json.dumps(record.get('recommendations', [])),
                record.get('timestamp', datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
            ))
            conn.commit()
            return record['id']

    def get_all_predictions(self, limit=50):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT * FROM predictions ORDER BY created_at DESC LIMIT ?
            ''', (limit,))
            rows = cursor.fetchall()
            results = []
            for row in rows:
                item = dict(row)
                item['input_data'] = json.loads(item['input_data_json']) if item.get('input_data_json') else {}
                item['risk_factors'] = json.loads(item['risk_factors_json']) if item.get('risk_factors_json') else []
                item['recommendations'] = json.loads(item['recommendations_json']) if item.get('recommendations_json') else []
                results.append(item)
            return results

    def get_prediction_by_id(self, record_id):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM predictions WHERE id = ?', (record_id,))
            row = cursor.fetchone()
            if row:
                item = dict(row)
                item['input_data'] = json.loads(item['input_data_json']) if item.get('input_data_json') else {}
                item['risk_factors'] = json.loads(item['risk_factors_json']) if item.get('risk_factors_json') else []
                item['recommendations'] = json.loads(item['recommendations_json']) if item.get('recommendations_json') else []
                return item
            return None

    def delete_prediction(self, record_id):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM predictions WHERE id = ?', (record_id,))
            conn.commit()
            return cursor.rowcount > 0

    def clear_all(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM predictions')
            conn.commit()
            return True
