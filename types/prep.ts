export interface PrepChecklistItem {
  id: string;
  category: string;
  task: string;
  description?: string;
  completed: boolean;
  priority: 'critical' | 'important' | 'optional';
  timeframe: 'week-before' | 'day-before' | 'hour-before' | 'during';
  notes?: string;
  timestamp?: Date;
}

export interface PracticeQuestion {
  id: string;
  category: string;
  question: string;
  tips: string[];
  sampleAnswer: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeLimit: number; // in minutes
  starMethod?: boolean;
}

export interface InterviewTimer {
  interviewDate: Date;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
  };
  status: 'upcoming' | 'today' | 'overdue';
}

export interface PrepSession {
  id: string;
  questionId: string;
  startTime: Date;
  endTime?: Date;
  notes?: string;
  rating?: number; // 1-5 self-rating
}
