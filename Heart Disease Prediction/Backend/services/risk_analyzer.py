def analyze_patient_risk(cleaned_data, prediction_result):
    """
    Analyzes patient vitals and prediction outcome to build:
    1. Identified risk factors
    2. Medical recommendation
    3. Actionable lifestyle suggestions
    """
    risk_factors = []
    lifestyle_tips = []
    
    age = cleaned_data.get("age", 0)
    sex = cleaned_data.get("sex", 0)
    cp = cleaned_data.get("cp", 0)
    trestbps = cleaned_data.get("trestbps", 0)
    chol = cleaned_data.get("chol", 0)
    fbs = cleaned_data.get("fbs", 0)
    restecg = cleaned_data.get("restecg", 0)
    thalach = cleaned_data.get("thalach", 0)
    exang = cleaned_data.get("exang", 0)
    oldpeak = cleaned_data.get("oldpeak", 0)
    ca = cleaned_data.get("ca", 0)
    thal = cleaned_data.get("thal", 0)

    # 1. Blood Pressure Evaluation
    if trestbps >= 140:
        risk_factors.append(f"Stage 2 Hypertension (Resting BP: {trestbps} mmHg)")
        lifestyle_tips.append("Reduce daily sodium intake to less than 2,000 mg and monitor BP regularly.")
    elif trestbps >= 130:
        risk_factors.append(f"Stage 1 Hypertension (Resting BP: {trestbps} mmHg)")
        lifestyle_tips.append("Incorporate stress reduction practices and daily aerobic walking.")

    # 2. Serum Cholesterol
    if chol >= 240:
        risk_factors.append(f"High Blood Cholesterol (Serum Cholesterol: {chol} mg/dl)")
        lifestyle_tips.append("Adopt a heart-healthy diet low in saturated fats and high in soluble fiber.")
    elif chol >= 200:
        risk_factors.append(f"Borderline High Cholesterol ({chol} mg/dl)")
        lifestyle_tips.append("Increase Omega-3 fatty acid intake through fatty fish, walnuts, or flaxseeds.")

    # 3. Fasting Blood Sugar
    if fbs == 1:
        risk_factors.append("Elevated Fasting Blood Sugar (> 120 mg/dl - Diabetes Risk)")
        lifestyle_tips.append("Limit refined sugars and simple carbohydrates; check HbA1c levels.")

    # 4. Exercise Induced Angina & Chest Pain
    if exang == 1:
        risk_factors.append("Exercise-Induced Angina (Chest pain during physical exertion)")
        lifestyle_tips.append("Avoid extreme physical exertion without prior physician clearance.")
    
    if cp == 0:
        risk_factors.append("Typical Anginal Pain (Classic cardiac symptom pattern)")
    elif cp == 1 or cp == 2:
        risk_factors.append("Atypical / Non-anginal Chest Pain observed")

    # 5. ST Depression & ECG
    if oldpeak >= 2.0:
        risk_factors.append(f"Significant Exercise ST Depression ({oldpeak} mm)")
    elif oldpeak > 1.0:
        risk_factors.append(f"Moderate ST Depression ({oldpeak} mm)")

    if restecg == 1:
        risk_factors.append("Resting ECG showing ST-T wave abnormalities")
    elif restecg == 2:
        risk_factors.append("Resting ECG showing Left Ventricular Hypertrophy")

    # 6. Major Vessels & Thalassemia
    if ca > 0:
        risk_factors.append(f"Flouroscopy detected {ca} major blood vessel(s) with calcification/blockage")

    if thal == 3:
        risk_factors.append("Reversible Thalassemia Defect detected during stress test")
    elif thal == 1:
        risk_factors.append("Fixed Thalassemia Defect noted")

    # Age & Demographics
    if age >= 60:
        risk_factors.append(f"Age factor ({age} years - Increased cardiovascular risk group)")

    # Default tips if none triggered
    if not lifestyle_tips:
        lifestyle_tips.append("Maintain at least 150 minutes of moderate aerobic exercise per week.")
        lifestyle_tips.append("Schedule routine annual cardiovascular wellness checks.")
        lifestyle_tips.append("Ensure 7-8 hours of restful sleep every night.")

    # Medical Recommendation based on prediction
    if prediction_result["is_positive"]:
        if prediction_result["risk_level"] == "High":
            recommendation = "High risk detected. We strongly advise scheduling an urgent consultation with a certified Cardiologist for comprehensive diagnostic testing (Echocardiogram / Angiography)."
        else:
            recommendation = "Moderate heart disease risk identified. Please consult your primary care physician to perform follow-up cardiac evaluation and blood panel reviews."
    else:
        recommendation = "Low likelihood of heart disease detected based on clinical inputs. Continue maintaining a healthy lifestyle, balanced nutrition, and regular health checkups."

    return {
        "risk_factors": risk_factors if risk_factors else ["No major isolated vital anomalies identified"],
        "recommendation": recommendation,
        "lifestyle_tips": lifestyle_tips
    }
