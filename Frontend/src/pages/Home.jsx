import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ArrowRight, ShieldCheck, Cpu, Activity, BarChart2, CheckCircle2, Sparkles } from 'lucide-react';
import DashboardCards from '../components/DashboardCards';
import HeartPulse from '../components/HeartPulse';
import { fetchMetadata } from '../utils/api';

const Home = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    fetchMetadata().then((data) => setMetadata(data));
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24 pb-12">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-8 lg:pt-16 pb-12">
        {/* Background ambient lighting blur circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-red-500/10 dark:bg-red-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                <span>Next-Gen Machine Learning Healthcare</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                AI-Powered <span className="text-gradient-blue">Heart Disease</span> Risk Prediction
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Empowering cardiologists and patients with instant, machine learning risk assessment using 13 clinical vitals. Validated with 80.33% diagnostic accuracy.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/predict"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
                >
                  <Stethoscope className="w-5 h-5" />
                  <span>Start Clinical Prediction</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/about"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl glass-card text-slate-700 dark:text-slate-200 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span>Explore Model Science</span>
                </Link>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  No Registration Required
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Downloadable Clinical PDF Report
                </span>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="glass-panel p-8 rounded-3xl relative shadow-2xl border border-white/40 dark:border-slate-800 space-y-6">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HeartPulse size="md" />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">Cardiac Diagnostic Status</h3>
                      <p className="text-xs text-emerald-500 font-semibold">Active Scikit-Learn Engine</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    80.33% Accuracy
                  </span>
                </div>

                {/* Simulated Live Scan Preview */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                    <span>Clinical Parameters</span>
                    <span className="text-blue-400 font-mono">13 Features Loaded</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-800/80">
                      <span className="text-slate-400 block text-[10px]">Resting BP</span>
                      <span className="text-sm font-bold text-white">125 mmHg</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80">
                      <span className="text-slate-400 block text-[10px]">Serum Chol</span>
                      <span className="text-sm font-bold text-white">212 mg/dl</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80">
                      <span className="text-slate-400 block text-[10px]">Max Heart Rate</span>
                      <span className="text-sm font-bold text-emerald-400">168 bpm</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80">
                      <span className="text-slate-400 block text-[10px]">Chest Pain Type</span>
                      <span className="text-sm font-bold text-blue-400">Typical Angina</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Inference Response Time:</span>
                    <span className="font-mono text-emerald-400 font-semibold">18 ms</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Model Performance Dashboard Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            System Specifications & Model Metrics
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time performance indicators loaded directly from model metadata
          </p>
        </div>

        <DashboardCards metadata={metadata} />
      </section>

      {/* How it Works Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How CardioCheck AI Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            A seamless three-step clinical assessment workflow built for speed, accuracy, and ease of use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 rounded-3xl text-center space-y-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Input Clinical Vitals</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter patient demographics, blood pressure, cholesterol, resting ECG, max heart rate, and exercise angina readings.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl text-center space-y-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Run ML Inference</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Our trained scikit-learn Logistic Regression model evaluates input feature vectors against thousands of clinical patterns.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl text-center space-y-4 relative">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Receive Actionable Report</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              View probability gauge, risk level breakdown, risk factors, cardiologist recommendations, and download a clinical PDF.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-healthcare text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Assess Heart Disease Risk?
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Try our clinical risk calculator with test patient presets or enter custom patient vitals.
            </p>
            <div className="pt-2">
              <Link
                to="/predict"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-blue-900 font-extrabold text-sm shadow-xl hover:bg-blue-50 transition-all"
              >
                <Stethoscope className="w-5 h-5 text-blue-600" />
                <span>Launch Prediction Engine</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
