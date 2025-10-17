import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
}

export function ProgressBar({ current, total, percentage }: ProgressBarProps) {
  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold">Progress</span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {current} / {total} ({percentage}%)
        </span>
      </div>
      
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {percentage === 100 && (
        <p className="text-sm text-green-600 dark:text-green-400 font-semibold mt-2 animate-pulse">
          ✓ All questions completed!
        </p>
      )}
    </div>
  );
}

