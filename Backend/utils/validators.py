def validate_prediction_input(data):
    """
    Validates input data dictionary for Heart Disease Prediction.
    Returns (is_valid, error_message, cleaned_data)
    """
    if not isinstance(data, dict):
        return False, "Input data must be a JSON object", None

    required_fields = [
        "age", "sex", "cp", "trestbps", "chol", "fbs",
        "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"
    ]

    missing = [field for field in required_fields if field not in data or data[field] is None or data[field] == ""]
    if missing:
        return False, f"Missing required fields: {', '.join(missing)}", None

    cleaned = {}

    try:
        # Age
        age = int(data["age"])
        if age <= 0 or age > 120:
            return False, "Age must be a positive number between 1 and 120", None
        cleaned["age"] = age

        # Sex
        sex = int(data["sex"])
        if sex not in [0, 1]:
            return False, "Sex must be 0 (Female) or 1 (Male)", None
        cleaned["sex"] = sex

        # Chest Pain Type
        cp = int(data["cp"])
        if cp not in [0, 1, 2, 3]:
            return False, "Chest pain type (cp) must be 0, 1, 2, or 3", None
        cleaned["cp"] = cp

        # Resting Blood Pressure
        trestbps = float(data["trestbps"])
        if trestbps < 50 or trestbps > 250:
            return False, "Resting Blood Pressure (trestbps) must be between 50 and 250 mmHg", None
        cleaned["trestbps"] = trestbps

        # Serum Cholesterol
        chol = float(data["chol"])
        if chol < 50 or chol > 650:
            return False, "Serum Cholesterol (chol) must be between 50 and 650 mg/dl", None
        cleaned["chol"] = chol

        # Fasting Blood Sugar
        fbs = int(data["fbs"])
        if fbs not in [0, 1]:
            return False, "Fasting Blood Sugar (fbs) must be 0 or 1", None
        cleaned["fbs"] = fbs

        # Resting ECG
        restecg = int(data["restecg"])
        if restecg not in [0, 1, 2]:
            return False, "Resting ECG (restecg) must be 0, 1, or 2", None
        cleaned["restecg"] = restecg

        # Max Heart Rate
        thalach = float(data["thalach"])
        if thalach < 50 or thalach > 250:
            return False, "Maximum Heart Rate (thalach) must be between 50 and 250 bpm", None
        cleaned["thalach"] = thalach

        # Exercise Induced Angina
        exang = int(data["exang"])
        if exang not in [0, 1]:
            return False, "Exercise Induced Angina (exang) must be 0 or 1", None
        cleaned["exang"] = exang

        # Oldpeak
        oldpeak = float(data["oldpeak"])
        if oldpeak < 0.0 or oldpeak > 10.0:
            return False, "ST depression (oldpeak) must be between 0.0 and 10.0", None
        cleaned["oldpeak"] = oldpeak

        # Slope
        slope = int(data["slope"])
        if slope not in [0, 1, 2]:
            return False, "Slope of peak exercise ST segment must be 0, 1, or 2", None
        cleaned["slope"] = slope

        # ca
        ca = int(data["ca"])
        if ca not in [0, 1, 2, 3, 4]:
            return False, "Major vessels (ca) must be between 0 and 4", None
        cleaned["ca"] = ca

        # thal
        thal = int(data["thal"])
        if thal not in [0, 1, 2, 3]:
            return False, "Thalassemia (thal) must be 0, 1, 2, or 3", None
        cleaned["thal"] = thal

    except ValueError as e:
        return False, f"Numeric format error: {str(e)}", None

    return True, "", cleaned
