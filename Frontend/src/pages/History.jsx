import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Search, Trash2, FileDown, AlertCircle, RefreshCw, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { fetchHistory, deleteHistoryItem, clearAllHistory } from '../utils/api';
import { generatePDFReport } from '../utils/pdfGenerator';

const History = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');

  const loadHistoryData = async () => {
    setLoading(true);
    try {
      const data = await fetchHistory();
      setHistoryList(data);
    } catch (err) {
      console.error('History fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistoryData();
  }, []);

  const handleDeleteItem = async (id) => {
    if (window.confirm(`Are you sure you want to delete prediction record ${id}?`)) {
      await deleteHistoryItem(id);
      setHistoryList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all prediction history?')) {
      await clearAllHistory();
      setHistoryList([]);
    }
  };

  const handleViewDetails = (item) => {
    navigate('/result', {
      state: {
        predictionData: item,
        patientVitals: item.input_data || {}
      }
    });
  };

  const filteredList = historyList.filter((item) => {
    const matchesSearch =
      item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patient_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prediction?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRisk = riskFilter === 'ALL' || item.risk_level?.toUpperCase() === riskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Database Records</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Prediction History Log
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            View and manage all past patient heart disease diagnostic predictions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadHistoryData}
            className="p-3 rounded-2xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-semibold flex items-center gap-1.5"
            title="Refresh History Log"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          {historyList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-3 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Logs</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Patient ID, Record ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Risk Level Filter Buttons */}
        <div className="flex items-center gap-2 text-xs w-full sm:w-auto overflow-x-auto">
          <span className="text-slate-500 font-bold mr-1 hidden sm:inline-block">Filter Risk:</span>
          {['ALL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setRiskFilter(lvl)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                riskFilter === lvl
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

      </div>

      {/* Table / Records View */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 font-medium">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-2" />
          <span>Loading historical diagnostic records...</span>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto">
          <Clock className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Prediction History Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {searchQuery || riskFilter !== 'ALL'
              ? 'No records match your active search filter.'
              : 'Run your first heart disease risk prediction to see records logged here.'}
          </p>
        </div>
      ) : (
        <div className="glass-card rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Record ID</th>
                  <th className="px-6 py-4">Patient ID</th>
                  <th className="px-6 py-4">Age / Sex</th>
                  <th className="px-6 py-4">Prediction Outcome</th>
                  <th className="px-6 py-4">Probability</th>
                  <th className="px-6 py-4">Risk Level</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                {filteredList.map((item) => {
                  const isPositive = item.prediction?.includes('Detected') || item.is_positive;
                  const sexLabel = item.sex === 1 || item.sex === '1' ? 'Male' : 'Female';

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {item.id}
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                        {item.patient_id || 'PT-2026'}
                      </td>

                      <td className="px-6 py-4">
                        {item.age} yrs / {sexLabel}
                      </td>

                      <td className="px-6 py-4 font-bold">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${
                          isPositive
                            ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        }`}>
                          {isPositive ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          {item.prediction}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white font-mono">
                        {item.probability}%
                      </td>

                      <td className="px-6 py-4 font-bold">
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] uppercase ${
                          item.risk_level === 'High'
                            ? 'bg-red-600 text-white'
                            : item.risk_level === 'Moderate'
                            ? 'bg-amber-500 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}>
                          {item.risk_level}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs text-slate-500">
                        {item.created_at || item.timestamp}
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleViewDetails(item)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all inline-flex items-center gap-1 text-xs font-semibold"
                          title="View Full Report"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => generatePDFReport(item, item.input_data)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all inline-flex items-center gap-1 text-xs font-semibold"
                          title="Download PDF"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-red-500 hover:bg-red-600 hover:text-white transition-all inline-flex items-center gap-1 text-xs"
                          title="Delete Entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default History;
