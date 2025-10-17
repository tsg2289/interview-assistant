import { useState, useCallback } from 'react';
import { PrepChecklistItem } from '@/types/prep';
import { prepChecklistItems } from '@/lib/prepChecklist';
import { useLocalStorage } from './useLocalStorage';

export function usePrepChecklist() {
  const { storedValue, setValue, isLoading } = useLocalStorage<PrepChecklistItem[]>(
    'prep-checklist',
    prepChecklistItems.map(item => ({ ...item, completed: false }))
  );

  const toggleItem = useCallback((id: string) => {
    setValue(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, completed: !item.completed, timestamp: new Date() }
          : item
      )
    );
  }, [setValue]);

  const updateNotes = useCallback((id: string, notes: string) => {
    setValue(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, notes, timestamp: new Date() }
          : item
      )
    );
  }, [setValue]);

  const resetChecklist = useCallback(() => {
    setValue(prepChecklistItems.map(item => ({ ...item, completed: false, notes: undefined })));
  }, [setValue]);

  const getProgress = useCallback(() => {
    const total = storedValue.length;
    const completed = storedValue.filter(item => item.completed).length;
    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [storedValue]);

  const getItemsByCategory = useCallback(() => {
    const categories: { [key: string]: PrepChecklistItem[] } = {};
    
    storedValue.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    
    return categories;
  }, [storedValue]);

  const getItemsByTimeframe = useCallback((timeframe: PrepChecklistItem['timeframe']) => {
    return storedValue.filter(item => item.timeframe === timeframe);
  }, [storedValue]);

  const getItemsByPriority = useCallback((priority: PrepChecklistItem['priority']) => {
    return storedValue.filter(item => item.priority === priority);
  }, [storedValue]);

  const getCriticalItems = useCallback(() => {
    return storedValue.filter(item => item.priority === 'critical' && !item.completed);
  }, [storedValue]);

  return {
    items: storedValue,
    toggleItem,
    updateNotes,
    resetChecklist,
    getProgress,
    getItemsByCategory,
    getItemsByTimeframe,
    getItemsByPriority,
    getCriticalItems,
    isLoading,
  };
}
