'use client';

import React, { useState } from 'react';
import { InterviewQuestion } from '@/types/interview';
import { ChevronDown, ChevronUp, Pencil } from 'lucide-react';

interface ChecklistItemProps {
  question: InterviewQuestion;
  onToggle: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export function ChecklistItem({ question, onToggle, onUpdateNotes }: ChecklistItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState(question.notes || '');

  const priorityColors = {
    'must-ask': 'text-red-600 dark:text-red-400',
    'important': 'text-orange-600 dark:text-orange-400',
    'optional': 'text-blue-600 dark:text-blue-400',
  };

  const handleSaveNotes = () => {
    onUpdateNotes(question.id, notesValue);
    setIsEditingNotes(false);
  };

  return (
    <div className="glass-card mb-3 fade-in">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={question.asked}
          onChange={() => onToggle(question.id)}
          className="mt-1 flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className={`font-medium ${question.asked ? 'line-through opacity-60' : ''}`}>
                {question.question}
              </p>
              <span className={`text-xs ${priorityColors[question.priority]} font-semibold uppercase tracking-wide`}>
                {question.priority}
              </span>
            </div>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {question.subQuestions && question.subQuestions.length > 0 && (
            <ul className="mt-2 ml-4 space-y-1">
              {question.subQuestions.map((subQ, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  • {subQ}
                </li>
              ))}
            </ul>
          )}

          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
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
                    placeholder="Add your notes about the answer..."
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
                        setNotesValue(question.notes || '');
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
                  {question.notes || 'No notes yet. Click the pencil icon to add notes.'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

