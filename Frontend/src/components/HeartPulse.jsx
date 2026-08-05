import React from 'react';

const HeartPulse = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Outer Pulse Glow */}
      <div className="absolute inset-0 rounded-full bg-red-500/30 dark:bg-red-400/20 animate-ping opacity-75"></div>
      
      {/* Heart Icon SVG */}
      <div className={`relative ${sizeClasses[size] || sizeClasses.md} text-red-500 animate-heartbeat drop-shadow-md`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
};

export default HeartPulse;
