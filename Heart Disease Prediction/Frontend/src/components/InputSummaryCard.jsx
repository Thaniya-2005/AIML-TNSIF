import React from 'react';
import { ShieldCheck, X, CheckCircle2, User, Heart, Activity, AlertTriangle } from 'lucide-react';

const cpLabels = {
  0: 'Typical Angina (Classic Pain)',
  1: 'Atypical Angina',
  2: 'Non-anginal Pain',
  3: 'Asymptomatic'
};

const slopeLabels = {
  0: 'Upsloping (Normal)',
  1: 'Flat (Ischemia Risk)',
  2: 'Downsloping (High Risk)'
};

const thalLabels = {
  0: 'Normal / Null',
  1: 'Fixed Defect',
  2: 'Normal Flow',
  3: 'Reversible Defect'
};

const InputSummaryCard = ({ isOpen, onClose, onConfirm, formData }) => {
  if (!isOpen) return null;

  const sexLabel = formData.sex === '1' || formData.sex === 1 ? 'Male' : 'Female';
  const fbsLabel = formData.fbs === '1' || formData.fbs === 1 ? 'Elevated (>120 mg/dl)' : 'Normal (<=120 mg/dl)';
  const exangLabel = formData.exang === '1' || formData.exang === 1 ? 'Yes (Angina on Exertion)' : 'No (Absent)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Patient Vitals Summary</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Review patient clinical parameters before running ML prediction</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Group 1: Demographics */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 border border-slate-100 dark:border-slate-700/50">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm border-b border-slate-200 dark:border-slate-700 pb-1.5 mb-2">
              <User className="w-4 h-4 text-blue-500" />
              <span>Demographics & Vitals</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/30">
              <span className="text-slate-500 dark:text-slate-400">Age:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{formData.age} years</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/30">
              <span className="text-slate-500 dark:text-slate-400">Sex:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{sexLabel}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/30">
              <span className="text-slate-500 dark:text-slate-400">Resting Blood Pressure:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{formData.trestbps} mmHg</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 dark:text-slate-400">Serum Cholesterol:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{formData.chol} mg/dl</span>
            </div>
          </div>

          {/* Group 2: Cardiac Symptoms */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 border border-slate-100 dark:border-slate-700/50">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm border-b border-slate-200 dark:border-slate-700 pb-1.5 mb-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Cardiac Readings</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/30">
              <span className="text-slate-500 dark:text-slate-400">Chest Pain Type:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{cpLabels[formData.cp] || formData.cp}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/30">
              <span className="text-slate-500 dark:text-slate-400">Max Heart Rate (thalach):</span>
              <span className="font-semibold text-slate-900 dark:text-white">{formData.thalach} bpm</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/30">
              <span className="text-slate-500 dark:text-slate-400">Fasting Blood Sugar:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{fbsLabel}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500 dark:text-slate-400">Resting ECG Result:</span>
              <span className="font-semibold text-slate-900 dark:text-white">Type {formData.restecg}</span>
            </div>
          </div>

          {/* Group 3: Stress Test Results */}
          <div className="md:col-span-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2 border border-slate-100 dark:border-slate-700/50">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm border-b border-slate-200 dark:border-slate-700 pb-1.5 mb-2">
              <Activity className="w-4 h-4 text-purple-500" />
              <span>Exercise Stress Test & Fluoroscopy</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/30">
                <span className="text-slate-500 dark:text-slate-400">Exercise Angina:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{exangLabel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/30">
                <span className="text-slate-500 dark:text-slate-400">ST Depression (oldpeak):</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formData.oldpeak} mm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/30">
                <span className="text-slate-500 dark:text-slate-400">ST Slope:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{slopeLabels[formData.slope] || formData.slope}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/30">
                <span className="text-slate-500 dark:text-slate-400">Major Vessels (ca):</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formData.ca} vessels</span>
              </div>
              <div className="sm:col-span-2 flex justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400">Thalassemia Result:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{thalLabels[formData.thal] || formData.thal}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-sm"
          >
            Edit Inputs
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm & Run Model Prediction</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default InputSummaryCard;
