import { InterviewQuestion } from '@/types/interview';

export const interviewQuestions: Omit<InterviewQuestion, 'asked' | 'notes' | 'timestamp'>[] = [
  // Category 1: Company Culture & Environment
  {
    id: 'culture-1',
    category: 'Company Culture & Environment',
    question: 'Why are you interviewing me?',
    priority: 'must-ask',
  },
  {
    id: 'culture-2',
    category: 'Company Culture & Environment',
    question: 'Are you happy here?',
    priority: 'must-ask',
  },
  {
    id: 'culture-3',
    category: 'Company Culture & Environment',
    question: 'What is the culture like?',
    priority: 'must-ask',
  },
  {
    id: 'culture-4',
    category: 'Company Culture & Environment',
    question: 'Is there a team I will be apart of?',
    priority: 'important',
  },
  {
    id: 'culture-5',
    category: 'Company Culture & Environment',
    question: 'When mistakes are made, and they inevitably will be, how do people react?',
    subQuestions: ['By blaming?', 'By rallying around each other and picking each other up?'],
    priority: 'important',
  },
  {
    id: 'culture-6',
    category: 'Company Culture & Environment',
    question: 'How has your role changed here?',
    priority: 'optional',
  },
  {
    id: 'culture-7',
    category: 'Company Culture & Environment',
    question: 'Is there a mentor program?',
    priority: 'important',
  },

  // Category 2: Technology & Systems
  {
    id: 'tech-1',
    category: 'Technology & Systems',
    question: 'What email system are you using?',
    priority: 'important',
  },
  {
    id: 'tech-2',
    category: 'Technology & Systems',
    question: 'What billing system are you using? Can you edit entries? How is my billing reviewed?',
    priority: 'must-ask',
  },
  {
    id: 'tech-3',
    category: 'Technology & Systems',
    question: 'What case management system are you using?',
    priority: 'must-ask',
  },
  {
    id: 'tech-4',
    category: 'Technology & Systems',
    question: 'What trial date calendar system are you using?',
    priority: 'important',
  },
  {
    id: 'tech-5',
    category: 'Technology & Systems',
    question: 'How are your macros in Word?',
    priority: 'optional',
  },
  {
    id: 'tech-6',
    category: 'Technology & Systems',
    question: 'How is the IT department?',
    priority: 'important',
  },
  {
    id: 'tech-7',
    category: 'Technology & Systems',
    question: 'Westlaw or Lexis Nexis and AI prompting?',
    priority: 'important',
  },
  {
    id: 'tech-8',
    category: 'Technology & Systems',
    question: 'What type of remote software are you using? Will you be using it moving forward?',
    priority: 'optional',
  },

  // Category 3: Role & Responsibilities
  {
    id: 'role-1',
    category: 'Role & Responsibilities',
    question: 'What will I be doing day to day?',
    priority: 'must-ask',
  },
  {
    id: 'role-2',
    category: 'Role & Responsibilities',
    question: 'How will I be used?',
    priority: 'must-ask',
  },
  {
    id: 'role-3',
    category: 'Role & Responsibilities',
    question: 'Who and to how many people will I be reporting to?',
    priority: 'must-ask',
  },
  {
    id: 'role-4',
    category: 'Role & Responsibilities',
    question: 'What does a day to day look like?',
    priority: 'important',
  },
  {
    id: 'role-5',
    category: 'Role & Responsibilities',
    question: 'Can you give me what I would be doing in 3, 6, 18 months?',
    priority: 'important',
  },
  {
    id: 'role-6',
    category: 'Role & Responsibilities',
    question: 'What does the training look like?',
    priority: 'must-ask',
  },
  {
    id: 'role-7',
    category: 'Role & Responsibilities',
    question: 'Who are your clients?',
    priority: 'important',
  },
  {
    id: 'role-8',
    category: 'Role & Responsibilities',
    question: 'What is the paralegal help like?',
    priority: 'important',
  },
  {
    id: 'role-9',
    category: 'Role & Responsibilities',
    question: 'What is the assistant like?',
    priority: 'optional',
  },

  // Category 4: Work Schedule & Expectations
  {
    id: 'schedule-1',
    category: 'Work Schedule & Expectations',
    question: 'What are the hours? How are the hours cut? What is the internal process of appeal?',
    priority: 'must-ask',
  },
  {
    id: 'schedule-2',
    category: 'Work Schedule & Expectations',
    question: 'What are the in-person vs remote requirements?',
    priority: 'must-ask',
  },
  {
    id: 'schedule-3',
    category: 'Work Schedule & Expectations',
    question: 'Is the position remote?',
    priority: 'must-ask',
  },
  {
    id: 'schedule-4',
    category: 'Work Schedule & Expectations',
    question: 'What are the expected hours?',
    priority: 'must-ask',
  },
  {
    id: 'schedule-5',
    category: 'Work Schedule & Expectations',
    question: 'Billable hours requirements',
    priority: 'must-ask',
  },
  {
    id: 'schedule-6',
    category: 'Work Schedule & Expectations',
    question: 'How do you measure productivity?',
    priority: 'important',
  },

  // Category 5: Turnover & Retention
  {
    id: 'turnover-1',
    category: 'Turnover & Retention',
    question: 'What is the turnover rate in the company?',
    priority: 'must-ask',
  },
  {
    id: 'turnover-2',
    category: 'Turnover & Retention',
    question: 'What is the number of people that have left in the past year?',
    priority: 'must-ask',
  },
  {
    id: 'turnover-3',
    category: 'Turnover & Retention',
    question: 'Why are you hiring? Did someone leave?',
    priority: 'important',
  },

  // Category 6: Strategic & Leadership Questions
  {
    id: 'strategic-1',
    category: 'Strategic & Leadership Questions',
    question: 'What books are you reading right now? What books would you recommend that you have read?',
    priority: 'optional',
  },
  {
    id: 'strategic-2',
    category: 'Strategic & Leadership Questions',
    question: 'What are you watching right now?',
    priority: 'optional',
  },
  {
    id: 'strategic-3',
    category: 'Strategic & Leadership Questions',
    question: 'What will the next 1 month, 3 months, 6 months, 18 months, 3 years, 5 years, 10 years look like?',
    priority: 'important',
  },
  {
    id: 'strategic-4',
    category: 'Strategic & Leadership Questions',
    question: 'What is something you think that most people disagree with you about?',
    priority: 'optional',
  },
  {
    id: 'strategic-5',
    category: 'Strategic & Leadership Questions',
    question: 'If you had a silver bullet to kill a competitor, who would it be?',
    priority: 'optional',
  },
  {
    id: 'strategic-6',
    category: 'Strategic & Leadership Questions',
    question: 'What are things that you do more than anyone that you know?',
    priority: 'optional',
  },
  {
    id: 'strategic-7',
    category: 'Strategic & Leadership Questions',
    question: 'What are you for that most of the other people are against?',
    priority: 'optional',
  },
  {
    id: 'strategic-8',
    category: 'Strategic & Leadership Questions',
    question: "What's your biggest inflection point?",
    priority: 'optional',
  },
  {
    id: 'strategic-9',
    category: 'Strategic & Leadership Questions',
    question: 'Where do you see opportunities now?',
    priority: 'optional',
  },
  {
    id: 'strategic-10',
    category: 'Strategic & Leadership Questions',
    question: 'How are you leading your team/company through this?',
    priority: 'optional',
  },

  // Category 7: Bias & Interview Process
  {
    id: 'bias-1',
    category: 'Bias & Interview Process',
    question: 'How did you prepare for the interview?',
    priority: 'optional',
  },
  {
    id: 'bias-2',
    category: 'Bias & Interview Process',
    question: 'How do you get around the interview bias?',
    priority: 'optional',
  },
  {
    id: 'bias-3',
    category: 'Bias & Interview Process',
    question: 'You go with the person you like most rather than the best person for the job?',
    priority: 'optional',
  },

  // Category 8: Future & Change
  {
    id: 'future-1',
    category: 'Future & Change',
    question: 'Since the outbreak, a lot of industries are going to change and not go back to the old way of doing. Where do you see that happening in your business?',
    priority: 'optional',
  },
  {
    id: 'future-2',
    category: 'Future & Change',
    question: 'What have you learned and what changes are you making to guide you through upcoming times?',
    priority: 'optional',
  },
  {
    id: 'future-3',
    category: 'Future & Change',
    question: 'What is one thing that you feel you need to change within the firm that you will change in the next 6 months?',
    priority: 'important',
  },

  // Category 9: Personal & Mentorship
  {
    id: 'personal-1',
    category: 'Personal & Mentorship',
    question: "What's the best lesson your father/mother/mentor taught you?",
    priority: 'optional',
  },
];

export const getCategorizedQuestions = () => {
  const categories: { [key: string]: typeof interviewQuestions } = {};
  
  interviewQuestions.forEach(question => {
    if (!categories[question.category]) {
      categories[question.category] = [];
    }
    categories[question.category].push(question);
  });
  
  return categories;
};

export const getQuestionsByPriority = (priority: 'must-ask' | 'important' | 'optional') => {
  return interviewQuestions.filter(q => q.priority === priority);
};

