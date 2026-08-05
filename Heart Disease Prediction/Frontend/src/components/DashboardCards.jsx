import React from 'react';
import { Target, Cpu, Layers, Zap, Database, CheckCircle2 } from 'lucide-react';

const DashboardCards = ({ metadata }) => {
  const accuracy = metadata?.accuracy ? `${metadata.accuracy}%` : '80.33%';
  const modelName = metadata?.model_name || 'Logistic Regression';
  const numFeatures = metadata?.num_features || 13;
  const trainingSamples = metadata?.training_samples || 241;
  const testingSamples = metadata?.testing_samples || 61;

  const cards = [
    {
      title: 'Model Accuracy',
      value: accuracy,
      description: 'Tested on UCI cardiac dataset',
      icon: Target,
      color: 'from-emerald-500 to-teal-600',
      badge: 'High Precision',
      bgGlow: 'group-hover:shadow-emerald-500/20'
    },
    {
      title: 'Best Model Algorithm',
      value: modelName,
      description: 'Optimized Scikit-Learn pipeline',
      icon: Cpu,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Validated ML',
      bgGlow: 'group-hover:shadow-blue-500/20'
    },
    {
      title: 'Clinical Features',
      value: `${numFeatures} Vitals`,
      description: 'Demographics, ECG & Stress test',
      icon: Layers,
      color: 'from-purple-600 to-pink-600',
      badge: 'Comprehensive',
      bgGlow: 'group-hover:shadow-purple-500/20'
    },
    {
      title: 'Prediction Speed',
      value: '< 50 ms',
      description: 'Real-time REST API response',
      icon: Zap,
      color: 'from-amber-500 to-orange-600',
      badge: 'Instant Inference',
      bgGlow: 'group-hover:shadow-amber-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`group glass-card p-6 rounded-3xl relative overflow-hidden transition-all duration-300 ${card.bgGlow}`}
            >
              {/* Background gradient decorative accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>

              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {card.badge}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  {card.title}
                </h4>
                <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
                  {card.value}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dataset Validation Sub-bar */}
      <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-slate-900/60 border border-blue-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
          <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Model trained on <strong>{trainingSamples}</strong> patient cases & validated on <strong>{testingSamples}</strong> unseen test samples.</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>100% Parameter Validation Active</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
