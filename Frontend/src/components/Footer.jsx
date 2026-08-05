import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Github, Shield, FileText, Mail, Phone, ExternalLink } from 'lucide-react';
import HeartPulse from './HeartPulse';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <HeartPulse size="sm" />
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Cardio<span className="text-blue-400">Check</span> AI
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Clinical decision support system leveraging Logistic Regression machine learning to assess cardiovascular disease risk with 80.33% diagnostic accuracy.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
              <Link
                to="/contact"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700"
                aria-label="Support Contact"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  Home Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  About Heart Disease
                </Link>
              </li>
              <li>
                <Link to="/predict" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  Run Risk Assessment
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  Prediction Log History
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  Support & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Emergency & Care</h3>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
              <div className="flex items-start gap-3 text-red-400">
                <Phone className="w-5 h-5 mt-0.5 shrink-0 animate-pulse" />
                <div>
                  <span className="text-xs font-semibold text-slate-300 block">Emergency Response Hotline</span>
                  <span className="text-lg font-bold text-white">911 / 112</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                If experiencing severe acute chest pressure, shortness of breath, or numbness, seek immediate emergency medical care.
              </p>
            </div>
          </div>

          {/* Compliance & Model Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">System Specifications</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex justify-between py-1 border-b border-slate-800">
                <span>ML Algorithm:</span>
                <span className="font-semibold text-slate-200">Logistic Regression</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-800">
                <span>Model Accuracy:</span>
                <span className="font-semibold text-emerald-400">80.33%</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-800">
                <span>Clinical Features:</span>
                <span className="font-semibold text-slate-200">13 Parameters</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-800">
                <span>Inference Latency:</span>
                <span className="font-semibold text-blue-400">&lt; 50 ms</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Data Protection:</span>
                <span className="font-semibold text-slate-200">HIPAA Compliant Standard</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Medical Disclaimer Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 max-w-3xl">
            <strong className="text-slate-300">MEDICAL DISCLAIMER:</strong> CardioCheck AI is an educational and clinical decision-support tool. Predictions are generated using machine learning models and must not replace professional clinical evaluation, laboratory tests, or physician diagnosis.
          </p>
          <div className="text-xs text-slate-400 whitespace-nowrap">
            &copy; {new Date().getFullYear()} CardioCheck AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
