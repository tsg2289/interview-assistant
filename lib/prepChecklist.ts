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

export const prepChecklistItems: Omit<PrepChecklistItem, 'completed' | 'notes' | 'timestamp'>[] = [
  // Technical Preparation
  {
    id: 'tech-1',
    category: 'Technical Preparation',
    task: 'Test video call setup (camera, microphone, internet)',
    description: 'Ensure your camera, microphone, and internet connection work properly',
    priority: 'critical',
    timeframe: 'day-before',
  },
  {
    id: 'tech-2',
    category: 'Technical Preparation',
    task: 'Download required software (Zoom, Teams, etc.)',
    description: 'Install and test any required video conferencing software',
    priority: 'critical',
    timeframe: 'day-before',
  },
  {
    id: 'tech-3',
    category: 'Technical Preparation',
    task: 'Test screen sharing functionality',
    description: 'Practice sharing your screen and switching between applications',
    priority: 'important',
    timeframe: 'day-before',
  },
  {
    id: 'tech-4',
    category: 'Technical Preparation',
    task: 'Check lighting and background',
    description: 'Ensure good lighting and professional background for video calls',
    priority: 'important',
    timeframe: 'day-before',
  },
  {
    id: 'tech-5',
    category: 'Technical Preparation',
    task: 'Have backup internet connection ready',
    description: 'Prepare mobile hotspot or alternative internet connection',
    priority: 'important',
    timeframe: 'hour-before',
  },
  {
    id: 'tech-6',
    category: 'Technical Preparation',
    task: 'Test audio and video quality',
    description: 'Record a test video to check audio and video quality',
    priority: 'optional',
    timeframe: 'day-before',
  },

  // Research Preparation
  {
    id: 'research-1',
    category: 'Research Preparation',
    task: 'Complete company research using AI tool',
    description: 'Use the firm research feature to gather comprehensive company insights',
    priority: 'critical',
    timeframe: 'week-before',
  },
  {
    id: 'research-2',
    category: 'Research Preparation',
    task: 'Review job description thoroughly',
    description: 'Analyze the job requirements and prepare examples that match',
    priority: 'critical',
    timeframe: 'week-before',
  },
  {
    id: 'research-3',
    category: 'Research Preparation',
    task: 'Research interviewer(s) on LinkedIn',
    description: 'Learn about your interviewer(s) background and interests',
    priority: 'important',
    timeframe: 'day-before',
  },
  {
    id: 'research-4',
    category: 'Research Preparation',
    task: 'Read recent company news and articles',
    description: 'Stay updated on company developments and industry trends',
    priority: 'important',
    timeframe: 'day-before',
  },
  {
    id: 'research-5',
    category: 'Research Preparation',
    task: 'Prepare specific examples for common questions',
    description: 'Have 3-5 specific examples ready using the STAR method',
    priority: 'critical',
    timeframe: 'week-before',
  },
  {
    id: 'research-6',
    category: 'Research Preparation',
    task: 'Research company culture and values',
    description: 'Understand what the company values and how you align',
    priority: 'important',
    timeframe: 'week-before',
  },

  // Materials Preparation
  {
    id: 'materials-1',
    category: 'Materials Preparation',
    task: 'Print copies of resume and cover letter',
    description: 'Have physical copies ready for in-person interviews',
    priority: 'important',
    timeframe: 'day-before',
  },
  {
    id: 'materials-2',
    category: 'Materials Preparation',
    task: 'Prepare portfolio/work samples',
    description: 'Organize relevant work samples and portfolio pieces',
    priority: 'important',
    timeframe: 'week-before',
  },
  {
    id: 'materials-3',
    category: 'Materials Preparation',
    task: 'Have questions list ready',
    description: 'Prepare your list of questions to ask the interviewer',
    priority: 'critical',
    timeframe: 'day-before',
  },
  {
    id: 'materials-4',
    category: 'Materials Preparation',
    task: 'Prepare STAR method stories',
    description: 'Write out 5-7 detailed STAR stories for behavioral questions',
    priority: 'critical',
    timeframe: 'week-before',
  },
  {
    id: 'materials-5',
    category: 'Materials Preparation',
    task: 'Set up note-taking system',
    description: 'Prepare digital or physical note-taking method',
    priority: 'important',
    timeframe: 'day-before',
  },
  {
    id: 'materials-6',
    category: 'Materials Preparation',
    task: 'Prepare references list',
    description: 'Have contact information for professional references ready',
    priority: 'optional',
    timeframe: 'week-before',
  },

  // Logistics Preparation
  {
    id: 'logistics-1',
    category: 'Logistics Preparation',
    task: 'Plan route and timing (for in-person)',
    description: 'Calculate travel time and plan for traffic delays',
    priority: 'critical',
    timeframe: 'day-before',
  },
  {
    id: 'logistics-2',
    category: 'Logistics Preparation',
    task: 'Prepare professional outfit',
    description: 'Choose and prepare appropriate interview attire',
    priority: 'critical',
    timeframe: 'day-before',
  },
  {
    id: 'logistics-3',
    category: 'Logistics Preparation',
    task: 'Get good night\'s sleep',
    description: 'Ensure you\'re well-rested for the interview',
    priority: 'critical',
    timeframe: 'day-before',
  },
  {
    id: 'logistics-4',
    category: 'Logistics Preparation',
    task: 'Eat a good meal beforehand',
    description: 'Have a nutritious meal before the interview',
    priority: 'important',
    timeframe: 'hour-before',
  },
  {
    id: 'logistics-5',
    category: 'Logistics Preparation',
    task: 'Have water and tissues nearby',
    description: 'Keep water and tissues within reach during the interview',
    priority: 'optional',
    timeframe: 'hour-before',
  },
  {
    id: 'logistics-6',
    category: 'Logistics Preparation',
    task: 'Arrive 10-15 minutes early',
    description: 'Plan to arrive early but not too early',
    priority: 'critical',
    timeframe: 'during',
  },

  // Mental Preparation
  {
    id: 'mental-1',
    category: 'Mental Preparation',
    task: 'Practice answers out loud',
    description: 'Rehearse your answers to common questions',
    priority: 'critical',
    timeframe: 'day-before',
  },
  {
    id: 'mental-2',
    category: 'Mental Preparation',
    task: 'Review company values and culture',
    description: 'Align your responses with company culture',
    priority: 'important',
    timeframe: 'day-before',
  },
  {
    id: 'mental-3',
    category: 'Mental Preparation',
    task: 'Prepare for common objections',
    description: 'Think about potential concerns and how to address them',
    priority: 'important',
    timeframe: 'week-before',
  },
  {
    id: 'mental-4',
    category: 'Mental Preparation',
    task: 'Practice confident body language',
    description: 'Work on posture, eye contact, and hand gestures',
    priority: 'important',
    timeframe: 'day-before',
  },
  {
    id: 'mental-5',
    category: 'Mental Preparation',
    task: 'Set positive intentions',
    description: 'Visualize success and set positive goals',
    priority: 'optional',
    timeframe: 'hour-before',
  },
  {
    id: 'mental-6',
    category: 'Mental Preparation',
    task: 'Practice deep breathing exercises',
    description: 'Learn calming techniques for interview nerves',
    priority: 'optional',
    timeframe: 'hour-before',
  },
];

export const getCategorizedPrepItems = () => {
  const categories: { [key: string]: typeof prepChecklistItems } = {};
  
  prepChecklistItems.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });
  
  return categories;
};

export const getPrepItemsByTimeframe = (timeframe: PrepChecklistItem['timeframe']) => {
  return prepChecklistItems.filter(item => item.timeframe === timeframe);
};

export const getPrepItemsByPriority = (priority: PrepChecklistItem['priority']) => {
  return prepChecklistItems.filter(item => item.priority === priority);
};
