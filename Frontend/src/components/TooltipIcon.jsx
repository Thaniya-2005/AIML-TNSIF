import React, { useState } from 'react';
import { Info } from 'lucide-react';

export const medicalDescriptions = {
  age: "Age in years. Risk of cardiovascular issues generally increases with age (especially > 55).",
  sex: "Biological sex assigned at birth. Statistical baseline risk varies between males and females.",
  cp: "Chest Pain Type: 0 = Typical Angina (classic pressure/squeezing), 1 = Atypical Angina, 2 = Non-anginal Pain, 3 = Asymptomatic.",
  trestbps: "Resting Blood Pressure in mmHg on hospital admission. Normal is < 120 mmHg. Stage 1 HTN is 130-139, Stage 2 is >= 140.",
  chol: "Serum Cholesterol in mg/dl. Normal is < 200 mg/dl. High cholesterol (> 240 mg/dl) leads to plaque buildup in arteries.",
  fbs: "Fasting Blood Sugar > 120 mg/dl: 1 = True (elevated diabetic risk), 0 = False (normal blood glucose).",
  restecg: "Resting Electrocardiographic Results: 0 = Normal, 1 = ST-T Wave Abnormality (T wave inversions), 2 = Left Ventricular Hypertrophy.",
  thalach: "Maximum Heart Rate Achieved during exercise stress testing. Healthy target peak HR is roughly 220 minus your age.",
  exang: "Exercise Induced Angina: 1 = Yes (chest pain triggered by physical stress), 0 = No.",
  oldpeak: "ST depression induced by exercise relative to rest (in mm). Values > 1.5 mm indicate exercise-induced myocardial ischemia.",
  slope: "Slope of the peak exercise ST segment: 0 = Upsloping (normal response), 1 = Flat (possible ischemia), 2 = Downsloping (high risk).",
  ca: "Number of major blood vessels (0-4) colored by fluoroscopy. Higher vessel counts indicate significant arterial narrowing.",
  thal: "Thalassemia Nuclear Stress Test Result: 0 = Normal / Null, 1 = Fixed Defect (permanent tissue damage), 2 = Normal Flow, 3 = Reversible Defect (blood flow restriction)."
};

const TooltipIcon = ({ termKey, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const description = medicalDescriptions[termKey] || "Clinical vital parameter used for heart disease ML modeling.";

  return (
    <div className="relative inline-block ml-1.5 align-middle">
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
        title={title || "Click or hover for clinical information"}
        aria-label="Clinical information"
      >
        <Info className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-slate-100 text-xs rounded-xl shadow-2xl border border-slate-700 pointer-events-none transition-all duration-200">
          <div className="font-semibold text-blue-400 mb-1 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>Clinical Guidance</span>
          </div>
          <p className="leading-relaxed font-normal">{description}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
        </div>
      )}
    </div>
  );
};

export default TooltipIcon;
