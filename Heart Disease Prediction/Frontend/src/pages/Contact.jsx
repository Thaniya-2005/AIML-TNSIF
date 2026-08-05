import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, ShieldAlert } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5 text-blue-500" />
          <span>Clinical & Technical Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact CardioCheck AI Support
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Have questions about ML model integrations, clinical parameter inputs, or research partnerships? Reach out to our technical team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <span>Send a Support Inquiry</span>
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-2 animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">Message Received!</h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Thank you for reaching out. Our clinical support team will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane.doe@hospital.org"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Message / Technical Inquiry
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry or question regarding model inference..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Support Cards & Emergency Alert */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Emergency Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-red-600 to-rose-700 text-white space-y-3 shadow-xl">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
              <h3 className="text-xl font-bold">Medical Emergency Hotline</h3>
            </div>
            <p className="text-xs text-red-100 leading-relaxed">
              If experiencing acute crushing chest pain, radiating left arm pain, or severe difficulty breathing, immediately dial emergency dispatch.
            </p>
            <div className="text-2xl font-extrabold font-mono pt-1">
              Call 911 / 112 Immediately
            </div>
          </div>

          {/* Contact Details */}
          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Contact & Location</h3>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>support@cardiocheck.ai</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+1 (800) 555-CARDIO</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Center for Cardiovascular AI Research, Medical Center Plaza</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
