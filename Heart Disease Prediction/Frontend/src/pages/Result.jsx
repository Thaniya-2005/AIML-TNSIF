import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  FileDown,
  RotateCcw,
  Stethoscope,
  Heart,
  Activity,
  Shield,
  Clock,
  ChevronRight,
  Zap,
  Info
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { generatePDFReport } from '../utils/pdfGenerator';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const predictionData = location.state?.predictionData;
  const patientVitals = location.state?.patientVitals || {};

  // Fallback redirect state if directly accessing /result without state
  if (!predictionData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
          <Stethoscope className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">No Prediction Assessment Found</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Please complete the patient vitals form to generate a diagnostic risk prediction.
        </p>
        <Link
          to="/predict"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25"
        >
          <span>Go to Prediction Form</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const isPositive = predictionData.prediction?.includes('Detected') || predictionData.is_positive;
  const probability = predictionData.probability || 0;
  const noDiseaseProb = predictionData.no_disease_probability || (100 - probability);
  const riskLevel = predictionData.risk_level || (isPositive ? 'High' : 'Low');

  // Recharts Data Sets
  const pieData = [
    { name: 'Heart Disease Probability', value: probability, color: isPositive ? '#ef4444' : '#f87171' },
    { name: 'No Heart Disease Probability', value: noDiseaseProb, color: '#22c55e' }
  ];

  const gaugeData = [
    {
      name: 'Risk Level',
      uv: probability,
      fill: isPositive ? '#dc2626' : '#16a34a'
    }
  ];

  // Vitals comparison data comparing patient inputs against standard medical references
  const vitalsComparison = [
    {
      metric: 'Resting BP',
      patient: parseFloat(patientVitals.trestbps || 120),
      normal: 120,
      unit: 'mmHg'
    },
    {
      metric: 'Cholesterol',
      patient: parseFloat(patientVitals.chol || 200),
      normal: 200,
      unit: 'mg/dl'
    },
    {
      metric: 'Max HR',
      patient: parseFloat(patientVitals.thalach || 150),
      normal: 160,
      unit: 'bpm'
    },
    {
      metric: 'ST Depr. (x10)',
      patient: parseFloat(patientVitals.oldpeak || 0) * 10,
      normal: 10,
      unit: 'mm*10'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Diagnostic Report #{predictionData.id || 'HD-2026'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Cardiovascular Diagnostic Assessment
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Timestamp: {predictionData.timestamp} | Model: {predictionData.model || 'Logistic Regression'} ({predictionData.accuracy || '80.33%'})
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => generatePDFReport(predictionData, patientVitals)}
            className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>

          <Link
            to="/predict"
            className="px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Test</span>
          </Link>
        </div>
      </div>

      {/* Main Outcome Card (Red Alert vs Green Success) */}
      <div
        className={`p-6 sm:p-10 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300 ${
          isPositive
            ? 'bg-gradient-to-br from-red-500/10 via-red-500/5 to-slate-900/5 dark:from-red-950/50 dark:to-slate-900 border-red-500/30'
            : 'bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-slate-900/5 dark:from-emerald-950/50 dark:to-slate-900 border-emerald-500/30'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ${
                  isPositive ? 'bg-red-600 shadow-red-500/30' : 'bg-emerald-600 shadow-emerald-500/30'
                }`}
              >
                {isPositive ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
              </div>

              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    isPositive
                      ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                      : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  }`}
                >
                  Risk Level: {riskLevel}
                </span>
                <h2
                  className={`text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight ${
                    isPositive ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {predictionData.prediction}
                </h2>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {predictionData.recommendation}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Inference Time: <strong>{predictionData.prediction_time}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>Confidence Rating: <strong>{predictionData.confidence || 'Very High'}</strong></span>
              </div>
            </div>
          </div>

          {/* Probability Counter Badge */}
          <div className="lg:col-span-4 text-center lg:border-l border-slate-200 dark:border-slate-800 lg:pl-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Calculated Probability
            </span>
            <div
              className={`text-5xl sm:text-6xl font-extrabold tracking-tight ${
                isPositive ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {probability}%
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isPositive ? 'Likelihood of cardiac ischemia' : 'Confidence score for healthy cardiac status'}
            </p>
          </div>

        </div>
      </div>

      {/* Visual Analytics Charts Section (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pie Chart: Probability Split */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Probability Split Chart</span>
            </h3>
            <span className="text-xs text-slate-500">Binary Output</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `${val}%`} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Patient Vitals vs Clinical Baselines */}
        <div className="glass-card p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span>Patient Vitals vs Standard Baselines</span>
            </h3>
            <span className="text-xs text-slate-500">Reference Thresholds</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vitalsComparison} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey="metric" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip formatter={(val, name) => [`${val}`, name === 'patient' ? 'Patient Input' : 'Normal Reference']} />
                <Legend />
                <Bar dataKey="patient" name="Patient Input" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="normal" name="Normal Reference" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Breakdown: Identified Risk Factors & Lifestyle Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Identified Risk Factors */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Identified Risk Factors</h3>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm">
            {predictionData.risk_factors?.map((rf, idx) => (
              <li key={idx} className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 font-medium flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">•</span>
                <span>{rf}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Personalized Lifestyle Tips */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Preventive Care & Lifestyle Recommendations</h3>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm">
            {predictionData.lifestyle_tips?.map((tip, idx) => (
              <li key={idx} className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 font-medium flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};

export default Result;
