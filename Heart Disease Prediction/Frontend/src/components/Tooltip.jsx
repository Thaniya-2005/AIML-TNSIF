import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { medicalDescriptions } from './TooltipIcon';

const Tooltip = ({ content, title, children, termKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const textContent = content || (termKey ? medicalDescriptions[termKey] : null) || "Clinical vital parameter used for heart disease ML modeling.";

  return (
    <div className="relative inline-block align-middle">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
      >
        {children || (
          <button
            type="button"
            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none ml-1"
            title={title || "Clinical Information"}
          >
            <Info className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-slate-100 text-xs rounded-xl shadow-2xl border border-slate-700 pointer-events-none transition-all duration-200">
          <div className="font-semibold text-blue-400 mb-1 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            <span>{title || "Clinical Guidance"}</span>
          </div>
          <p className="leading-relaxed font-normal">{textContent}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
