'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertTriangle } from 'lucide-react';

interface InterviewTimerProps {
  interviewDate?: Date;
  onDateChange?: (date: Date) => void;
}

export function InterviewTimer({ interviewDate, onDateChange }: InterviewTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  const [status, setStatus] = useState<'upcoming' | 'today' | 'overdue'>('upcoming');

  useEffect(() => {
    if (!interviewDate) return;

    const updateTimer = () => {
      const now = new Date();
      const diff = interviewDate.getTime() - now.getTime();

      if (diff <= 0) {
        setStatus('overdue');
        setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining({ days, hours, minutes });

      if (days === 0) {
        setStatus('today');
      } else {
        setStatus('upcoming');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [interviewDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    onDateChange?.(newDate);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'overdue':
        return 'text-red-500';
      case 'today':
        return 'text-orange-500';
      default:
        return 'text-blue-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'overdue':
        return 'Interview has passed';
      case 'today':
        return 'Interview is today!';
      default:
        return 'Interview countdown';
    }
  };

  return (
    <div className="glass-card">
      <div className="flex items-center gap-3 mb-4">
        <Clock className={`w-6 h-6 ${getStatusColor()}`} />
        <h3 className="text-lg font-semibold">Interview Timer</h3>
      </div>

      {interviewDate ? (
        <div className="space-y-4">
          <div className="text-center">
            <p className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {interviewDate.toLocaleDateString()} at {interviewDate.toLocaleTimeString()}
            </p>
          </div>

          {status !== 'overdue' && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {timeRemaining.days}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Days</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {timeRemaining.hours}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Hours</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {timeRemaining.minutes}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Minutes</div>
              </div>
            </div>
          )}

          {status === 'today' && (
            <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
              <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <AlertTriangle size={16} />
                <span className="text-sm font-medium">Interview is today! Make sure you&apos;re ready.</span>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Update Interview Date:
            </label>
            <input
              type="datetime-local"
              value={interviewDate.toISOString().slice(0, 16)}
              onChange={handleDateChange}
              className="glass-input w-full"
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Set your interview date to start the countdown
          </p>
          <input
            type="datetime-local"
            onChange={handleDateChange}
            className="glass-input w-full max-w-xs mx-auto"
          />
        </div>
      )}
    </div>
  );
}
