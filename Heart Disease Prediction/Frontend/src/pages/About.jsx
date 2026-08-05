import React from 'react';
import { Heart, Activity, Cpu, Shield, BookOpen, Layers, CheckCircle2, HelpCircle, AlertTriangle } from 'lucide-react';
import { medicalDescriptions } from '../components/TooltipIcon';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wide">
          <BookOpen className="w-4 h-4" />
          <span>Clinical Knowledge Hub</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About Heart Disease & ML Intelligence
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
          Understanding cardiovascular disease risk factors, clinical diagnostic parameters, and how our scikit-learn machine learning engine predicts heart disease.
        </p>
      </div>

      {/* Interactive "How the Model Works" Section */}
      <section className="glass-panel p-8 sm:p-10 rounded-3xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">How the Machine Learning Model Works</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Logistic Regression Classification & Probability Calibration</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 text-base">
              <Layers className="w-5 h-5" />
              <span>1. 13-Feature Matrix</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              The model ingests 13 clinical vitals spanning patient demographics (age, sex), rest vitals (trestbps, chol, fbs), cardiac stress indicators (thalach, exang, oldpeak, slope), and diagnostic imaging (restecg, ca, thal).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 text-base">
              <Activity className="w-5 h-5" />
              <span>2. Logistic Sigmoid Function</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              Using an optimized Logistic Regression decision boundary, the algorithm transforms linear combinations of weighted feature values through a Sigmoid probability curve P(y=1|X) = 1 / (1 + e^-z).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 text-base">
              <CheckCircle2 className="w-5 h-5" />
              <span>3. 80.33% Verified Accuracy</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              Trained on 241 clinical samples and evaluated on 61 unseen patient test cases. The model achieves an 80.33% test accuracy rate with high sensitivity to cardiac ischemia.
            </p>
          </div>
        </div>
      </section>

      {/* Educational Guide: What is Heart Disease? */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-950 text-red-500 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What is Heart Disease?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Heart disease describes a range of conditions affecting the cardiovascular system. The most common type is <strong>Coronary Artery Disease (CAD)</strong>, which occurs when plaque builds up in the arteries that supply blood to the heart muscle.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Over time, arterial plaque narrows coronary arteries, reducing blood flow and potentially leading to angina (chest pain), shortness of breath, or acute heart attacks.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-500 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Major Risk Factors</h2>
          <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>Hypertension (High BP):</strong> Strains heart walls and damages blood vessels.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>High Cholesterol:</strong> Excess LDL cholesterol causes arterial plaque deposits.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>Diabetes & Elevated Blood Sugar:</strong> Damages blood vessels and cardiac nerves.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>Sedentary Lifestyle & Obesity:</strong> Increases cardiac workload and metabolic stress.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Clinical Feature Definitions Table */}
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Clinical Feature Definitions Reference
        </h2>

        <div className="glass-card rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Parameter</th>
                  <th className="px-6 py-4">Medical Name</th>
                  <th className="px-6 py-4">Clinical Guidance & Reference Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                {Object.entries(medicalDescriptions).map(([key, desc]) => (
                  <tr key={key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-3 font-mono font-bold text-blue-600 dark:text-blue-400">{key}</td>
                    <td className="px-6 py-3 font-semibold text-slate-900 dark:text-white capitalize">{key.replace('_', ' ')}</td>
                    <td className="px-6 py-3 leading-relaxed">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
