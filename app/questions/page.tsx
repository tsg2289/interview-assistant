'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/GlassCard';
import { ChecklistItem } from '@/components/ChecklistItem';
import { ProgressBar } from '@/components/ProgressBar';
import { useChecklist } from '@/hooks/useChecklist';
import { ArrowLeft, Filter, RotateCcw, Download } from 'lucide-react';

type FilterType = 'all' | 'must-ask' | 'important' | 'optional' | 'completed' | 'remaining';

export default function QuestionsPage() {
  const {
    questions,
    toggleQuestion,
    updateNotes,
    resetChecklist,
    getProgress,
    getQuestionsByCategory,
    isLoading,
  } = useChecklist();

  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const progress = getProgress();
  const categorizedQuestions = getQuestionsByCategory();

  // Toggle all categories expanded/collapsed
  const toggleAllCategories = () => {
    if (expandedCategories.size === Object.keys(categorizedQuestions).length) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set(Object.keys(categorizedQuestions)));
    }
  };

  // Start with all categories collapsed
  useMemo(() => {
    setExpandedCategories(new Set());
  }, []);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredQuestions = useMemo(() => {
    let filtered = questions;

    // Apply priority/status filter
    if (filter === 'must-ask') {
      filtered = filtered.filter(q => q.priority === 'must-ask');
    } else if (filter === 'important') {
      filtered = filtered.filter(q => q.priority === 'important');
    } else if (filter === 'optional') {
      filtered = filtered.filter(q => q.priority === 'optional');
    } else if (filter === 'completed') {
      filtered = filtered.filter(q => q.asked);
    } else if (filter === 'remaining') {
      filtered = filtered.filter(q => !q.asked);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [questions, filter, searchTerm]);

  const filteredCategorized = useMemo(() => {
    const categories: { [key: string]: typeof filteredQuestions } = {};
    filteredQuestions.forEach(question => {
      if (!categories[question.category]) {
        categories[question.category] = [];
      }
      categories[question.category].push(question);
    });
    return categories;
  }, [filteredQuestions]);

  const handleExport = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      progress,
      questions: questions.map(q => ({
        category: q.category,
        question: q.question,
        priority: q.priority,
        asked: q.asked,
        notes: q.notes || '',
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-checklist-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading checklist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <header className="mb-8 fade-in">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Interview Questions</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Strategic questions to ask during your interview
          </p>
        </header>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar 
            current={progress.completed}
            total={progress.total}
            percentage={progress.percentage}
          />
        </div>

        {/* Controls */}
        <GlassCard className="mb-6">
          <div className="space-y-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search questions or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'glass-button'
                }`}
              >
                All ({questions.length})
              </button>
              <button
                onClick={() => setFilter('remaining')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'remaining'
                    ? 'bg-blue-500 text-white'
                    : 'glass-button'
                }`}
              >
                Remaining ({questions.filter(q => !q.asked).length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'completed'
                    ? 'bg-green-500 text-white'
                    : 'glass-button'
                }`}
              >
                Completed ({progress.completed})
              </button>
              <button
                onClick={() => setFilter('must-ask')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'must-ask'
                    ? 'bg-red-500 text-white'
                    : 'glass-button'
                }`}
              >
                Must Ask
              </button>
              <button
                onClick={() => setFilter('important')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'important'
                    ? 'bg-orange-500 text-white'
                    : 'glass-button'
                }`}
              >
                Important
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleAllCategories}
                className="glass-button flex items-center gap-2"
              >
                <Filter size={18} />
                {expandedCategories.size === Object.keys(categorizedQuestions).length
                  ? 'Collapse All'
                  : 'Expand All'}
              </button>
              <button
                onClick={handleExport}
                className="glass-button flex items-center gap-2"
              >
                <Download size={18} />
                Export
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all questions? This will clear all checkmarks and notes.')) {
                    resetChecklist();
                  }
                }}
                className="glass-button flex items-center gap-2 text-red-600 dark:text-red-400"
              >
                <RotateCcw size={18} />
                Reset All
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Questions by Category */}
        <div className="space-y-6">
          {Object.keys(filteredCategorized).length === 0 ? (
            <GlassCard>
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No questions match your current filters.
              </p>
            </GlassCard>
          ) : (
            Object.entries(filteredCategorized).map(([category, categoryQuestions]) => {
              const categoryProgress = {
                total: categoryQuestions.length,
                completed: categoryQuestions.filter(q => q.asked).length,
              };
              const isExpanded = expandedCategories.has(category);

              return (
                <div key={category} className="fade-in">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full glass-card mb-3 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-left">
                        <h2 className="text-xl font-bold mb-1">{category}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {categoryProgress.completed} / {categoryProgress.total} completed
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          {categoryProgress.total}
                        </div>
                        <svg
                          className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="space-y-3 pl-4 sm:pl-8 ml-4 sm:ml-8 border-l-2 border-gray-200 dark:border-gray-700">
                      {categoryQuestions.map(question => (
                        <ChecklistItem
                          key={question.id}
                          question={question}
                          onToggle={toggleQuestion}
                          onUpdateNotes={updateNotes}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

