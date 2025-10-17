import { useState, useCallback } from 'react';
import { InterviewQuestion } from '@/types/interview';
import { interviewQuestions } from '@/lib/questions';
import { useLocalStorage } from './useLocalStorage';

export function useChecklist() {
  const { storedValue, setValue, isLoading } = useLocalStorage<InterviewQuestion[]>(
    'interview-checklist',
    interviewQuestions.map(q => ({ ...q, asked: false }))
  );

  const toggleQuestion = useCallback((id: string) => {
    setValue(prev => 
      prev.map(q => 
        q.id === id 
          ? { ...q, asked: !q.asked, timestamp: new Date() }
          : q
      )
    );
  }, [setValue]);

  const updateNotes = useCallback((id: string, notes: string) => {
    setValue(prev =>
      prev.map(q =>
        q.id === id
          ? { ...q, notes, timestamp: new Date() }
          : q
      )
    );
  }, [setValue]);

  const resetChecklist = useCallback(() => {
    setValue(interviewQuestions.map(q => ({ ...q, asked: false, notes: undefined })));
  }, [setValue]);

  const getProgress = useCallback(() => {
    const total = storedValue.length;
    const completed = storedValue.filter(q => q.asked).length;
    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [storedValue]);

  const getQuestionsByCategory = useCallback(() => {
    const categories: { [key: string]: InterviewQuestion[] } = {};
    
    storedValue.forEach(question => {
      if (!categories[question.category]) {
        categories[question.category] = [];
      }
      categories[question.category].push(question);
    });
    
    return categories;
  }, [storedValue]);

  return {
    questions: storedValue,
    toggleQuestion,
    updateNotes,
    resetChecklist,
    getProgress,
    getQuestionsByCategory,
    isLoading,
  };
}

