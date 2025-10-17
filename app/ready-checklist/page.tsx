'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/GlassCard';
import { PrepChecklistItem } from '@/components/PrepChecklistItem';
import { InterviewTimer } from '@/components/InterviewTimer';
import { usePrepChecklist } from '@/hooks/usePrepChecklist';
import { ArrowLeft, Filter, RotateCcw, Download, Clock, AlertCircle, CheckCircle } from 'lucide-react';

type FilterType = 'all' | 'critical' | 'important' | 'optional' | 'completed' | 'remaining';
type TimeframeFilter = 'all' | 'week-before' | 'day-before' | 'hour-before' | 'during';

export default function ReadyChecklistPage() {
  const {
    items,
    toggleItem,
    updateNotes,
    resetChecklist,
    getProgress,
    getItemsByCategory,
    getItemsByTimeframe,
    getItemsByPriority,
    getCriticalItems,
    isLoading,
  } = usePrepChecklist();

  const [filter, setFilter] = useState<FilterType>('all');
  const [timeframeFilter, setTimeframeFilter] = useState<TimeframeFilter>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [interviewDate, setInterviewDate] = useState<Date | undefined>(undefined);

  const progress = getProgress();
  const categorizedItems = getItemsByCategory();
  const criticalItems = getCriticalItems();

  // Toggle all categories expanded/collapsed
  const toggleAllCategories = () => {
    if (expandedCategories.size === Object.keys(categorizedItems).length) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set(Object.keys(categorizedItems)));
    }
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Apply priority filter
    if (filter === 'critical') {
      filtered = filtered.filter(item => item.priority === 'critical');
    } else if (filter === 'important') {
      filtered = filtered.filter(item => item.priority === 'important');
    } else if (filter === 'optional') {
      filtered = filtered.filter(item => item.priority === 'optional');
    } else if (filter === 'completed') {
      filtered = filtered.filter(item => item.completed);
    } else if (filter === 'remaining') {
      filtered = filtered.filter(item => !item.completed);
    }

    // Apply timeframe filter
    if (timeframeFilter !== 'all') {
      filtered = filtered.filter(item => item.timeframe === timeframeFilter);
    }

    return filtered;
  }, [items, filter, timeframeFilter]);

  const filteredCategorized = useMemo(() => {
    const categories: { [key: string]: typeof filteredItems } = {};
    filteredItems.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    return categories;
  }, [filteredItems]);

  const handleExport = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      interviewDate: interviewDate?.toISOString(),
      progress,
      criticalItems: criticalItems.length,
      items: items.map(item => ({
        category: item.category,
        task: item.task,
        priority: item.priority,
        timeframe: item.timeframe,
        completed: item.completed,
        notes: item.notes || '',
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-prep-checklist-${new Date().toISOString().split('T')[0]}.json`;
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
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="mb-8 fade-in">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Interview Ready Checklist</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive preparation checklist to ensure you're ready for your interview
          </p>
        </header>

        {/* Interview Timer */}
        <div className="mb-6">
          <InterviewTimer 
            interviewDate={interviewDate} 
            onDateChange={setInterviewDate}
          />
        </div>

        {/* Critical Items Alert */}
        {criticalItems.length > 0 && (
          <GlassCard className="mb-6 border-l-4 border-red-500">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-300">
                  {criticalItems.length} Critical Items Remaining
                </h3>
                <p className="text-sm text-red-600 dark:text-red-400">
                  Complete these high-priority tasks before your interview
                </p>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <GlassCard>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {progress.percentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                {progress.completed}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                {progress.total - progress.completed}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
            </div>
          </GlassCard>
        </div>

        {/* Controls */}
        <GlassCard className="mb-6">
          <div className="space-y-4">
            {/* Priority Filters */}
            <div>
              <label className="block text-sm font-semibold mb-2">Filter by Priority:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  All ({items.length})
                </button>
                <button
                  onClick={() => setFilter('critical')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === 'critical'
                      ? 'bg-red-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  Critical ({items.filter(i => i.priority === 'critical').length})
                </button>
                <button
                  onClick={() => setFilter('important')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === 'important'
                      ? 'bg-orange-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  Important ({items.filter(i => i.priority === 'important').length})
                </button>
                <button
                  onClick={() => setFilter('remaining')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === 'remaining'
                      ? 'bg-blue-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  Remaining ({progress.total - progress.completed})
                </button>
              </div>
            </div>

            {/* Timeframe Filters */}
            <div>
              <label className="block text-sm font-semibold mb-2">Filter by Timeframe:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTimeframeFilter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    timeframeFilter === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setTimeframeFilter('week-before')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    timeframeFilter === 'week-before'
                      ? 'bg-purple-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  Week Before
                </button>
                <button
                  onClick={() => setTimeframeFilter('day-before')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    timeframeFilter === 'day-before'
                      ? 'bg-orange-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  Day Before
                </button>
                <button
                  onClick={() => setTimeframeFilter('hour-before')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    timeframeFilter === 'hour-before'
                      ? 'bg-red-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  Hour Before
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleAllCategories}
                className="glass-button flex items-center gap-2"
              >
                <Filter size={18} />
                {expandedCategories.size === Object.keys(categorizedItems).length
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
                  if (confirm('Are you sure you want to reset all items? This will clear all checkmarks and notes.')) {
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

        {/* Checklist Items by Category */}
        <div className="space-y-6">
          {Object.keys(filteredCategorized).length === 0 ? (
            <GlassCard>
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No items match your current filters.
              </p>
            </GlassCard>
          ) : (
            Object.entries(filteredCategorized).map(([category, categoryItems]) => {
              const categoryProgress = {
                total: categoryItems.length,
                completed: categoryItems.filter(item => item.completed).length,
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
                    <div className="space-y-3 pl-0 sm:pl-4">
                      {categoryItems.map(item => (
                        <PrepChecklistItem
                          key={item.id}
                          item={item}
                          onToggle={toggleItem}
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
