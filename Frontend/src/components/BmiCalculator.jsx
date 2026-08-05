import React, { useState } from 'react';
import { Calculator, Scale } from 'lucide-react';

const BmiCalculator = ({ onCalculated }) => {
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    const hMeters = parseFloat(height) / 100;
    const wKg = parseFloat(weight);

    if (hMeters > 0 && wKg > 0) {
      const bmi = wKg / (hMeters * hMeters);
      const rounded = Math.round((bmi + Number.EPSILON) * 100) / 100;
      
      let category = 'Normal';
      let color = 'text-emerald-500';
      let desc = 'Healthy weight range. Keep up balanced nutrition and daily exercise!';

      if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-amber-500';
        desc = 'Below average BMI. Ensure adequate nutrient intake and strength training.';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        color = 'text-amber-600';
        desc = 'Slightly elevated BMI. Moderate weight reduction lowers cardiac stress.';
      } else if (bmi >= 30) {
        category = 'Obese';
        color = 'text-red-500';
        desc = 'High BMI range. Obesity is a significant risk factor for cardiovascular disease.';
      }

      const res = { val: rounded, category, color, desc, height, weight };
      setBmiResult(res);
      if (onCalculated) onCalculated(res);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">BMI Calculator</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Body Mass Index & Heart Risk Assessment</p>
        </div>
      </div>

      <form onSubmit={calculateBMI} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="50"
            max="250"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="20"
            max="300"
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-semibold"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          <span>Calculate Body Mass Index</span>
        </button>
      </form>

      {bmiResult && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-2 animate-fade-in">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Calculated BMI Score</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {bmiResult.val} <span className="text-sm font-normal text-slate-500">kg/m²</span>
          </div>
          <div className={`text-sm font-bold ${bmiResult.color}`}>
            Category: {bmiResult.category}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {bmiResult.desc}
          </p>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
