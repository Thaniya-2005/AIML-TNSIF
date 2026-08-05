import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Sparkles, CheckCircle2, RotateCcw, AlertCircle, HelpCircle } from 'lucide-react';
import TooltipIcon from '../components/TooltipIcon';
import InputSummaryCard from '../components/InputSummaryCard';
import LoadingOverlay from '../components/LoadingOverlay';
import { fetchPrediction } from '../utils/api';

const defaultForm = {
  age: '52',
  sex: '1',
  cp: '0',
  trestbps: '125',
  chol: '212',
  fbs: '0',
  restecg: '1',
  thalach: '168',
  exang: '0',
  oldpeak: '1.0',
  slope: '2',
  ca: '2',
  thal: '3'
};

const healthyPreset = {
  age: '42',
  sex: '0',
  cp: '1',
  trestbps: '115',
  chol: '185',
  fbs: '0',
  restecg: '0',
  thalach: '175',
  exang: '0',
  oldpeak: '0.0',
  slope: '0',
  ca: '0',
  thal: '2'
};

const highRiskPreset = {
  age: '65',
  sex: '1',
  cp: '0',
  trestbps: '155',
  chol: '295',
  fbs: '1',
  restecg: '1',
  thalach: '110',
  exang: '1',
  oldpeak: '3.2',
  slope: '1',
  ca: '3',
  thal: '3'
};

const Predict = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultForm);
  const [validationError, setValidationError] = useState('');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const loadPreset = (presetObj) => {
    setFormData(presetObj);
    setValidationError('');
  };

  const validateForm = () => {
    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age <= 0 || age > 120) {
      setValidationError('Age must be a positive number between 1 and 120.');
      return false;
    }

    const bp = parseFloat(formData.trestbps);
    if (isNaN(bp) || bp < 50 || bp > 250) {
      setValidationError('Resting Blood Pressure must be a valid number between 50 and 250 mmHg.');
      return false;
    }

    const chol = parseFloat(formData.chol);
    if (isNaN(chol) || chol < 50 || chol > 650) {
      setValidationError('Serum Cholesterol must be a valid number between 50 and 650 mg/dl.');
      return false;
    }

    const hr = parseFloat(formData.thalach);
    if (isNaN(hr) || hr < 50 || hr > 250) {
      setValidationError('Maximum Heart Rate must be a valid number between 50 and 250 bpm.');
      return false;
    }

    const op = parseFloat(formData.oldpeak);
    if (isNaN(op) || op < 0 || op > 10) {
      setValidationError('ST depression (oldpeak) must be between 0.0 and 10.0.');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSummaryModal(true);
    }
  };

  const executePrediction = async () => {
    setShowSummaryModal(false);
    setIsLoading(true);

    try {
      const response = await fetchPrediction(formData);
      setIsLoading(false);
      // Navigate to Results page with prediction data
      navigate('/result', { state: { predictionData: response, patientVitals: formData } });
    } catch (err) {
      setIsLoading(false);
      setValidationError(err.message || 'Failed to communicate with prediction server.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Stethoscope className="w-4 h-4 text-blue-500" />
          <span>Clinical Decision Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Heart Disease Risk Assessment
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Enter patient vitals and cardiac test parameters below. Hover over <TooltipIcon termKey="age" /> icons for clinical definitions.
        </p>
      </div>

      {/* Preset Quick Loader Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Quick Patient Presets:</span>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => loadPreset(healthyPreset)}
            className="px-3.5 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-all"
          >
            Load Healthy Preset
          </button>
          <button
            type="button"
            onClick={() => loadPreset(highRiskPreset)}
            className="px-3.5 py-2 rounded-xl bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-semibold hover:bg-red-200 dark:hover:bg-red-900 transition-all"
          >
            Load High Risk Preset
          </button>
          <button
            type="button"
            onClick={() => setFormData(defaultForm)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Validation Error Alert */}
      {validationError && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Clinical Input Form */}
      <form onSubmit={handleFormSubmit} className="space-y-8">
        
        {/* Section 1: Demographics & Vitals */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">1</span>
              <span>Patient Demographics & Resting Vitals</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Age (years) <TooltipIcon termKey="age" />
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
                placeholder="e.g. 52"
              />
            </div>

            {/* Sex */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Sex <TooltipIcon termKey="sex" />
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
              >
                <option value="1">1 - Male</option>
                <option value="0">0 - Female</option>
              </select>
            </div>

            {/* Resting Blood Pressure */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Resting Blood Pressure (mmHg) <TooltipIcon termKey="trestbps" />
              </label>
              <input
                type="number"
                name="trestbps"
                value={formData.trestbps}
                onChange={handleChange}
                min="50"
                max="250"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
                placeholder="e.g. 125"
              />
            </div>

            {/* Serum Cholesterol */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Serum Cholesterol (mg/dl) <TooltipIcon termKey="chol" />
              </label>
              <input
                type="number"
                name="chol"
                value={formData.chol}
                onChange={handleChange}
                min="50"
                max="650"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
                placeholder="e.g. 212"
              />
            </div>

            {/* Fasting Blood Sugar */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Fasting Blood Sugar (&gt; 120 mg/dl) <TooltipIcon termKey="fbs" />
              </label>
              <select
                name="fbs"
                value={formData.fbs}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
              >
                <option value="0">0 - False (&lt;= 120 mg/dl)</option>
                <option value="1">1 - True (&gt; 120 mg/dl)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Section 2: Cardiac Symptoms & ECG */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center font-bold">2</span>
              <span>Cardiac Symptoms & Resting ECG</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Chest Pain Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Chest Pain Type (cp) <TooltipIcon termKey="cp" />
              </label>
              <select
                name="cp"
                value={formData.cp}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
              >
                <option value="0">0 - Typical Angina</option>
                <option value="1">1 - Atypical Angina</option>
                <option value="2">2 - Non-anginal Pain</option>
                <option value="3">3 - Asymptomatic</option>
              </select>
            </div>

            {/* Resting ECG */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Resting ECG Results (restecg) <TooltipIcon termKey="restecg" />
              </label>
              <select
                name="restecg"
                value={formData.restecg}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
              >
                <option value="0">0 - Normal</option>
                <option value="1">1 - ST-T Wave Abnormality</option>
                <option value="2">2 - Left Ventricular Hypertrophy</option>
              </select>
            </div>

            {/* Max Heart Rate */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Maximum Heart Rate (thalach) <TooltipIcon termKey="thalach" />
              </label>
              <input
                type="number"
                name="thalach"
                value={formData.thalach}
                onChange={handleChange}
                min="50"
                max="250"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
                placeholder="e.g. 168"
              />
            </div>

          </div>
        </div>

        {/* Section 3: Stress Testing & Fluoroscopy */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-xs flex items-center justify-center font-bold">3</span>
              <span>Exercise Stress Testing & Fluoroscopy Scans</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Exercise Angina */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Exercise Induced Angina (exang) <TooltipIcon termKey="exang" />
              </label>
              <select
                name="exang"
                value={formData.exang}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
              >
                <option value="0">0 - No (Absent)</option>
                <option value="1">1 - Yes (Present)</option>
              </select>
            </div>

            {/* ST Depression (Oldpeak) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                ST Depression (oldpeak) <TooltipIcon termKey="oldpeak" />
              </label>
              <input
                type="number"
                step="0.1"
                name="oldpeak"
                value={formData.oldpeak}
                onChange={handleChange}
                min="0.0"
                max="10.0"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
                placeholder="e.g. 1.0"
              />
            </div>

            {/* ST Slope */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                ST Segment Slope (slope) <TooltipIcon termKey="slope" />
              </label>
              <select
                name="slope"
                value={formData.slope}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
              >
                <option value="0">0 - Upsloping (Normal)</option>
                <option value="1">1 - Flat (Ischemia Risk)</option>
                <option value="2">2 - Downsloping (High Risk)</option>
              </select>
            </div>

            {/* Major Vessels (ca) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Major Vessels Fluoroscopy (ca) <TooltipIcon termKey="ca" />
              </label>
              <select
                name="ca"
                value={formData.ca}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
              >
                <option value="0">0 Major Vessels</option>
                <option value="1">1 Major Vessel</option>
                <option value="2">2 Major Vessels</option>
                <option value="3">3 Major Vessels</option>
                <option value="4">4 Major Vessels</option>
              </select>
            </div>

            {/* Thalassemia (thal) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Thalassemia Scan (thal) <TooltipIcon termKey="thal" />
              </label>
              <select
                name="thal"
                value={formData.thal}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
              >
                <option value="0">0 - Normal / Null</option>
                <option value="1">1 - Fixed Defect</option>
                <option value="2">2 - Normal Flow</option>
                <option value="3">3 - Reversible Defect</option>
              </select>
            </div>

          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
          >
            <Stethoscope className="w-5 h-5" />
            <span>Analyze Patient Vitals & Predict Risk</span>
          </button>
        </div>

      </form>

      {/* Pre-submission Summary Confirmation Drawer */}
      <InputSummaryCard
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        onConfirm={executePrediction}
        formData={formData}
      />

      {/* Multi-Step Medical Loading Animation */}
      <LoadingOverlay isVisible={isLoading} />

    </div>
  );
};

export default Predict;
