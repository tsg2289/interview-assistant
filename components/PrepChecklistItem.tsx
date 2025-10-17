'use client';

import React, { useState } from 'react';
import { PrepChecklistItem as PrepItem } from '@/types/prep';
import { ChevronDown, ChevronUp, Pencil, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface PrepChecklistItemProps {
  item: PrepItem;
  onToggle: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export function PrepChecklistItem({ item, onToggle, onUpdateNotes }: PrepChecklistItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState(item.notes || '');

  const priorityColors = {
    'critical': 'text-red-600 dark:text-red-400',
    'important': 'text-orange-600 dark:text-orange-400',
    'optional': 'text-blue-600 dark:text-blue-400',
  };

  const priorityIcons = {
    'critical': <AlertCircle size={16} className="text-red-500" />,
    'important': <Clock size={16} className="text-orange-500" />,
    'optional': <CheckCircle size={16} className="text-blue-500" />,
  };

  const timeframeLabels = {
    'week-before': 'Week Before',
    'day-before': 'Day Before',
    'hour-before': 'Hour Before',
    'during': 'During Interview',
  };

  const handleSaveNotes = () => {
    onUpdateNotes(item.id, notesValue);
    setIsEditingNotes(false);
  };

  return (
    <div className={`glass-card mb-3 fade-in ${item.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          className="mt-1 flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className={`font-medium ${item.completed ? 'line-through opacity-60' : ''}`}>
                {item.task}
              </p>
              
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  {priorityIcons[item.priority]}
                  <span className={`text-xs ${priorityColors[item.priority]} font-semibold uppercase tracking-wide`}>
                    {item.priority}
                  </span>
                </div>
                
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  {timeframeLabels[item.timeframe]}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {item.description}
                </p>
              )}
              
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Notes:
                </label>
                <button
                  onClick={() => setIsEditingNotes(!isEditingNotes)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Edit notes"
                >
                  <Pencil size={16} />
                </button>
              </div>
              
              {isEditingNotes ? (
                <div>
                  <textarea
                    value={notesValue}
                    onChange={(e) => setNotesValue(e.target.value)}
                    className="glass-input w-full min-h-[80px] text-sm resize-y"
                    placeholder="Add your notes about this task..."
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSaveNotes}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setNotesValue(item.notes || '');
                        setIsEditingNotes(false);
                      }}
                      className="px-3 py-1 glass-button text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  {item.notes || 'No notes yet. Click the pencil icon to add notes.'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
