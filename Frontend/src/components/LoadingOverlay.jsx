import React, { useEffect, useState } from 'react';
import { Stethoscope, Activity, Cpu, FileText, CheckCircle2 } from 'lucide-react';
import HeartPulse from './HeartPulse';

const steps = [
  { id: 1, title: 'Analyzing Patient Vitals...', icon: Stethoscope },
  { id: 2, title: 'Checking Blood Pressure & ECG Status...', icon: Activity },
  { id: 3, title: 'Calculating ML Model Risk Factors...', icon: Cpu },
  { id: 4, title: 'Preparing Diagnostic Clinical Report...', icon: FileText },
];

const LoadingOverlay = ({ isVisible }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(1);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
    }, 600);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-8 text-center">
        
        {/* Animated Heart Visualizer */}
        <div className="flex justify-center my-4">
          <HeartPulse size="xl" />
        </div>

        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Diagnostic Analysis in Progress
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Running scikit-learn Logistic Regression inference on 13 patient parameters
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="space-y-3 text-left">
          {steps.map((step) => {
            const Icon = step.icon;
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 scale-105 shadow-md'
                    : isDone
                    ? 'opacity-80 text-emerald-600 dark:text-emerald-400'
                    : 'opacity-40 text-slate-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                    isDone
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                      : isCurrent
                      ? 'bg-blue-600 text-white animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>

                <span className={`text-xs font-semibold ${isCurrent ? 'text-blue-900 dark:text-blue-200' : ''}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Animated Loader Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>

      </div>
    </div>
  );
};

export default LoadingOverlay;
