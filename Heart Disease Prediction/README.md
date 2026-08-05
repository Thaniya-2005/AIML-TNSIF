# CardioCheck AI - Heart Disease Prediction System

A professional, production-grade clinical web application for **Heart Disease Risk Prediction**. The application features an optimized scikit-learn Logistic Regression machine learning model trained on cardiovascular clinical data, a modular Python Flask REST API backend with SQLite prediction history database, and a React.js (Vite + Tailwind CSS + Recharts + jsPDF) frontend.

---

## 🌟 Key Features

1. **AI Risk Prediction**: Evaluates 13 clinical vitals to predict heart disease with **80.33% diagnostic accuracy**.
2. **SQLite Prediction History**: Automatically logs every prediction record (`id`, `patient_id`, `age`, `sex`, `prediction`, `probability`, `risk_level`, `timestamp`).
3. **Data Visualizations (Recharts)**:
   - Interactive probability gauge
   - Heart Disease vs. Healthy probability split pie chart
   - Patient vitals vs. clinical reference baseline bar chart
4. **Downloadable Clinical PDF Report**: Generate & download a clinical PDF report containing patient vitals, diagnosis, risk level, cardiologist recommendations, and disclaimer.
5. **Interactive Medical Tooltips (`ⓘ`)**: Contextual popovers explaining parameters like `cp` (Chest Pain Type), `trestbps`, `chol`, `fbs`, `restecg`, `thalach`, `exang`, `oldpeak`, `slope`, `ca`, `thal`.
6. **Pre-Submission Patient Review Card**: Confirmation drawer displaying all patient parameters before running ML inference.
7. **Multi-Step Medical Loading Overlay**: Step-by-step diagnostic animation (*Analyzing Vitals → Evaluating ECG → Calculating ML Risk → Preparing Report*).
8. **Dark / Light Theme Toggle**: Seamless UI theme switching stored in local memory.
9. **Bonus Tools**: Built-in Body Mass Index (BMI) calculator modal.

---

## 📁 Folder Structure

```
Heart Disease Prediction/
│
├── Backend/
│   ├── .env                    # Environment config (PORT=5000, MODEL_PATH, DATABASE_PATH)
│   ├── config.py               # Application configuration loader
│   ├── requirements.txt        # Flask, flask-cors, joblib, scikit-learn, numpy, python-dotenv
│   ├── app.py                  # Flask server entry point
│   ├── models/
│   │   ├── __init__.py
│   │   └── history_db.py       # SQLite database manager for prediction logs
│   ├── services/
│   │   ├── __init__.py
│   │   ├── model_service.py    # Scikit-learn model loader & inference engine
│   │   └── risk_analyzer.py   # Clinical risk categorization & advice generator
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── predict_routes.py   # POST /predict, POST /api/predict
│   │   ├── history_routes.py   # GET /api/history, DELETE /api/history/<id>
│   │   └── metadata_routes.py  # GET /metadata, GET /health
│   └── utils/
│       ├── __init__.py
│       └── validators.py       # 13-feature numerical range validators
│
├── Frontend/
│   ├── package.json            # React 18, Vite, Tailwind CSS, Lucide React, Recharts, jsPDF
│   ├── vite.config.js          # Vite config with Flask API server proxy
│   ├── tailwind.config.js      # Healthcare theme (blue/white/red, dark mode, glassmorphism)
│   ├── index.html              # HTML entry point with Google Fonts (Outfit, Inter)
│   └── src/
│       ├── main.jsx            # React root entry
│       ├── App.jsx             # Router & layout container
│       ├── index.css           # Glassmorphism & custom utility classes
│       ├── context/
│       │   └── ThemeContext.jsx# Dark/Light mode theme state
│       ├── components/
│       │   ├── Navbar.jsx      # Glass header & route navigation
│       │   ├── Footer.jsx      # Healthcare footer & emergency details
│       │   ├── DashboardCards.jsx # Live model metrics counters
│       │   ├── TooltipIcon.jsx # Interactive clinical popovers
│       │   ├── InputSummaryCard.jsx # Pre-submission review drawer
│       │   ├── LoadingOverlay.jsx# Multi-step medical loader
│       │   ├── BmiCalculatorModal.jsx # Bonus BMI tool
│       │   └── HeartPulse.jsx  # Animated 3D/SVG heart rate pulse
│       ├── pages/
│       │   ├── Home.jsx        # Hero, metrics dashboard, workflow steps
│       │   ├── About.jsx       # Educational hub & "How the Model Works"
│       │   ├── Predict.jsx     # 13-feature input form with presets & validation
│       │   ├── Result.jsx      # Diagnostic breakdown, Recharts, PDF export
│       │   ├── History.jsx     # Database history table & search filter
│       │   └── Contact.jsx     # Medical support form & hotline
│       └── utils/
│           ├── api.js          # Axios client for Flask endpoints
│           └── pdfGenerator.js # jsPDF exporter engine
│
├── Extracted Model/
│   ├── heart_disease_prediction_model.pkl
│   └── model_metadata.json
│
├── Dataset/
│   ├── heart.csv
│   └── heart_cleaned.csv
│
└── README.md
```

---

## ⚙️ Installation & Setup Guide

### Prerequisites
- **Python**: Version 3.9+ installed
- **Node.js**: Version 18+ installed

---

### 1. Running the Backend (Flask API)

Navigate to the `Backend/` directory:

```bash
cd Backend
```

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask REST API server:

```bash
python app.py
```

The Flask server will launch on **`http://localhost:5000`**. You will see startup messages confirming that the model has been loaded:

```
Loading heart disease model from Extracted Model/heart_disease_prediction_model.pkl...
Model loaded successfully!
Starting Heart Disease Prediction API server on http://0.0.0.0:5000...
```

---

### 2. Running the Frontend (React + Vite)

Open a new terminal window and navigate to the `Frontend/` directory:

```bash
cd Frontend
```

Install Node dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The web application will open on **`http://localhost:5173`**.

---

## 📡 REST API Documentation

### 1. Prediction Endpoint
- **URL**: `POST /predict` or `POST /api/predict`
- **Content-Type**: `application/json`

**Sample Input Payload:**
```json
{
  "age": 52,
  "sex": 1,
  "cp": 0,
  "trestbps": 125,
  "chol": 212,
  "fbs": 0,
  "restecg": 1,
  "thalach": 168,
  "exang": 0,
  "oldpeak": 1.0,
  "slope": 2,
  "ca": 2,
  "thal": 3
}
```

**Sample Output Response:**
```json
{
  "status": "success",
  "id": "HD-94821A",
  "patient_id": "PT-2026-X812",
  "prediction": "Heart Disease Detected",
  "is_positive": true,
  "probability": 87.54,
  "no_disease_probability": 12.46,
  "risk_level": "High",
  "confidence": "Very High",
  "recommendation": "High risk detected. We strongly advise scheduling an urgent consultation with a certified Cardiologist for comprehensive diagnostic testing.",
  "risk_factors": [
    "Typical Anginal Pain (Classic cardiac symptom pattern)",
    "Exercise ST Depression (1.0 mm)",
    "Flouroscopy detected 2 major blood vessel(s) with calcification/blockage",
    "Reversible Thalassemia Defect detected during stress test"
  ],
  "lifestyle_tips": [
    "Adopt a low-sodium Mediterranean diet",
    "Schedule routine annual cardiovascular wellness checks"
  ],
  "model": "Logistic Regression",
  "accuracy": "80.33%",
  "prediction_time": "18.5 ms",
  "timestamp": "2026-08-04 21:30:00"
}
```

---

### 2. History Endpoint
- **URL**: `GET /api/history`
- **Response**: List of all past predictions saved in the SQLite database.

### 3. Clear History Endpoint
- **URL**: `DELETE /api/history/clear`
- **Response**: Confirmation message clearing database records.

### 4. Model Metadata Endpoint
- **URL**: `GET /metadata`
- **Response**: Algorithm name, accuracy (80.33%), feature list, sample counts.

---

## 🚀 Deployment Instructions

### Deploying Backend (Render / Railway / Heroku)
1. Push repository to GitHub.
2. Create a Python Web Service on Render or Railway.
3. Set build command: `pip install -r Backend/requirements.txt`
4. Set start command: `gunicorn Backend.app:app` or `python Backend/app.py`
5. Set environment variable `MODEL_PATH` to point to `../Extracted Model/heart_disease_prediction_model.pkl`.

### Deploying Frontend (Vercel / Netlify)
1. Import `Frontend/` folder to Vercel.
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variable `VITE_API_URL` to point to your live Flask backend URL.

---

## 🛡️ License & Medical Disclaimer

**CardioCheck AI** is an educational and clinical decision-support tool. It provides machine learning predictions based on statistical patterns in historical training data. It is **not** a substitute for professional medical advice, clinical diagnosis, or treatment.
