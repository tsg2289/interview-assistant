'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/GlassCard';
import { ArrowLeft, Clock, Star, Play, Pause, RotateCcw, Download } from 'lucide-react';
import { practiceQuestions } from '@/lib/practiceQuestions';
import { PracticeQuestion } from '@/types/prep';

type FilterType = 'all' | 'beginner' | 'intermediate' | 'advanced' | 'star-method';

export default function PrepQuestionsPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedQuestion, setSelectedQuestion] = useState<PracticeQuestion | null>(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [practiceNotes, setPracticeNotes] = useState('');

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPracticing && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPracticing(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPracticing, timeRemaining]);

  const categorizedQuestions = useMemo(() => {
    const categories: { [key: string]: PracticeQuestion[] } = {};
    practiceQuestions.forEach(question => {
      if (!categories[question.category]) {
        categories[question.category] = [];
      }
      categories[question.category].push(question);
    });
    return categories;
  }, []);

  const filteredQuestions = useMemo(() => {
    let filtered = practiceQuestions;

    if (filter === 'beginner') {
      filtered = filtered.filter(q => q.difficulty === 'beginner');
    } else if (filter === 'intermediate') {
      filtered = filtered.filter(q => q.difficulty === 'intermediate');
    } else if (filter === 'advanced') {
      filtered = filtered.filter(q => q.difficulty === 'advanced');
    } else if (filter === 'star-method') {
      filtered = filtered.filter(q => q.starMethod);
    }

    return filtered;
  }, [filter]);

  const filteredCategorized = useMemo(() => {
    const categories: { [key: string]: PracticeQuestion[] } = {};
    filteredQuestions.forEach(question => {
      if (!categories[question.category]) {
        categories[question.category] = [];
      }
      categories[question.category].push(question);
    });
    return categories;
  }, [filteredQuestions]);

  const startPractice = (question: PracticeQuestion) => {
    setSelectedQuestion(question);
    setTimeRemaining(question.timeLimit * 60); // Convert to seconds
    setIsPracticing(true);
    setPracticeNotes('');
  };

  const stopPractice = () => {
    setIsPracticing(false);
    setTimeRemaining(0);
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'intermediate':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
      case 'advanced':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  if (isPracticing && selectedQuestion) {
    return (
      <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto w-full">
          {/* Practice Header */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Practice Session</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Practice answering this question out loud
            </p>
          </header>

          {/* Timer */}
          <GlassCard className="mb-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-500" />
              <span className="text-2xl font-bold">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(timeRemaining / (selectedQuestion.timeLimit * 60)) * 100}%` }}
              />
            </div>
          </GlassCard>

          {/* Question */}
          <GlassCard className="mb-6">
            <h2 className="text-xl font-bold mb-4">{selectedQuestion.question}</h2>
            
            {selectedQuestion.starMethod && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-blue-700 dark:text-blue-300">STAR Method</span>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Use the STAR method: Situation, Task, Action, Result
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Tips:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {selectedQuestion.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Sample Answer:</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm">
                  {selectedQuestion.sampleAnswer}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Practice Notes */}
          <GlassCard className="mb-6">
            <h3 className="font-semibold mb-3">Your Practice Notes:</h3>
            <textarea
              value={practiceNotes}
              onChange={(e) => setPracticeNotes(e.target.value)}
              className="glass-input w-full min-h-[120px]"
              placeholder="Write your answer or key points here..."
            />
          </GlassCard>

          {/* Practice Controls */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={stopPractice}
              className="glass-button flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
            >
              <Pause size={18} />
              Stop Practice
            </button>
            <button
              onClick={() => {
                // Reset timer
                setTimeRemaining(selectedQuestion.timeLimit * 60);
              }}
              className="glass-button flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Reset Timer
            </button>
          </div>
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
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Practice Questions</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Practice answering common interview questions with timed sessions
          </p>
        </header>

        {/* Controls */}
        <GlassCard className="mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Filter by Difficulty:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  All ({practiceQuestions.length})
                </button>
                <button
                  onClick={() => setFilter('beginner')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === 'beginner'
                      ? 'bg-green-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  Beginner
                </button>
                <button
                  onClick={() => setFilter('intermediate')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === 'intermediate'
                      ? 'bg-orange-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  Intermediate
                </button>
                <button
                  onClick={() => setFilter('advanced')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === 'advanced'
                      ? 'bg-red-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  Advanced
                </button>
                <button
                  onClick={() => setFilter('star-method')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    filter === 'star-method'
                      ? 'bg-purple-500 text-white'
                      : 'glass-button'
                  }`}
                >
                  STAR Method
                </button>
              </div>
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
                          {categoryQuestions.length} questions
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          {categoryQuestions.length}
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
                      {categoryQuestions.map(question => (
                        <GlassCard key={question.id} className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold mb-2">{question.question}</h3>
                              
                              <div className="flex items-center gap-2 mb-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
                                  {question.difficulty}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {question.timeLimit} min
                                </span>
                                {question.starMethod && (
                                  <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                                    <Star size={14} />
                                    <span className="text-xs font-semibold">STAR</span>
                                  </div>
                                )}
                              </div>

                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {question.tips[0]}...
                              </p>
                            </div>
                            
                            <button
                              onClick={() => startPractice(question)}
                              className="glass-button flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
                            >
                              <Play size={16} />
                              Practice
                            </button>
                          </div>
                        </GlassCard>
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
