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

export const practiceQuestions: PracticeQuestion[] = [
  // Tell Me About Yourself
  {
    id: 'tell-me-about-yourself',
    category: 'Tell Me About Yourself',
    question: 'Tell me about yourself.',
    tips: [
      'Keep it concise (2-3 minutes)',
      'Start with current role and relevant experience',
      'Highlight key achievements with numbers',
      'Connect your background to the role',
      'End with why you\'re interested in this position'
    ],
    sampleAnswer: 'I\'m a [current role] with [X years] of experience in [relevant field]. In my current position at [Company], I\'ve [key achievement with numbers]. I\'m particularly drawn to this role because [specific reason related to job description].',
    difficulty: 'beginner',
    timeLimit: 3,
  },

  // Why This Company
  {
    id: 'why-this-company',
    category: 'Why This Company?',
    question: 'Why do you want to work for our company?',
    tips: [
      'Research the company thoroughly',
      'Mention specific company values or initiatives',
      'Connect company mission to your values',
      'Show knowledge of recent company news',
      'Be genuine and specific'
    ],
    sampleAnswer: 'I\'m excited about [Company] because of your commitment to [specific value/initiative]. I\'ve been following your work on [specific project/news] and it aligns perfectly with my passion for [relevant area]. I\'m particularly impressed by [specific example] and would love to contribute to similar initiatives.',
    difficulty: 'intermediate',
    timeLimit: 2,
  },

  // Why This Role
  {
    id: 'why-this-role',
    category: 'Why This Role?',
    question: 'Why are you interested in this specific role?',
    tips: [
      'Reference specific job requirements',
      'Connect your skills to role needs',
      'Show enthusiasm for the work',
      'Mention growth opportunities',
      'Be specific about what excites you'
    ],
    sampleAnswer: 'This role excites me because it combines my expertise in [relevant skill] with my passion for [relevant area]. I\'m particularly drawn to the opportunity to [specific responsibility from job description]. In my previous role, I [relevant experience] and I\'m eager to apply and expand those skills in this position.',
    difficulty: 'intermediate',
    timeLimit: 2,
  },

  // Strengths
  {
    id: 'strengths',
    category: 'Strengths & Weaknesses',
    question: 'What are your greatest strengths?',
    tips: [
      'Choose 2-3 relevant strengths',
      'Provide specific examples',
      'Connect strengths to job requirements',
      'Be confident but not arrogant',
      'Use the job description as a guide'
    ],
    sampleAnswer: 'My greatest strengths are [strength 1] and [strength 2]. For example, in my current role, I [specific example with results]. This strength has helped me [specific outcome] and I believe it would be valuable in this position because [connection to job requirements].',
    difficulty: 'beginner',
    timeLimit: 2,
  },

  // Weaknesses
  {
    id: 'weaknesses',
    category: 'Strengths & Weaknesses',
    question: 'What is your greatest weakness?',
    tips: [
      'Choose a real but not critical weakness',
      'Show self-awareness and growth',
      'Explain how you\'re working to improve',
      'Turn it into a positive',
      'Avoid clichés like "perfectionism"'
    ],
    sampleAnswer: 'I used to struggle with [specific weakness], but I\'ve been actively working to improve by [specific action taken]. For example, I [specific example of improvement]. This experience has taught me [lesson learned] and I continue to focus on [ongoing improvement efforts].',
    difficulty: 'intermediate',
    timeLimit: 2,
  },

  // Behavioral Questions (STAR Method)
  {
    id: 'challenge-overcome',
    category: 'Behavioral Questions',
    question: 'Tell me about a time you overcame a significant challenge.',
    tips: [
      'Use the STAR method (Situation, Task, Action, Result)',
      'Choose a relevant example',
      'Focus on your specific actions',
      'Quantify results when possible',
      'Show problem-solving skills'
    ],
    sampleAnswer: 'Situation: [Brief context]. Task: [What needed to be done]. Action: [Specific steps you took]. Result: [Outcome with numbers if possible]. This experience taught me [lesson learned].',
    difficulty: 'intermediate',
    timeLimit: 4,
    starMethod: true,
  },

  {
    id: 'teamwork-conflict',
    category: 'Behavioral Questions',
    question: 'Describe a time you had to work with a difficult team member.',
    tips: [
      'Use the STAR method',
      'Stay professional and positive',
      'Focus on resolution, not blame',
      'Show emotional intelligence',
      'Demonstrate leadership skills'
    ],
    sampleAnswer: 'Situation: [Brief context of conflict]. Task: [What needed to be achieved]. Action: [How you addressed the situation]. Result: [Positive outcome]. I learned [lesson about teamwork/communication].',
    difficulty: 'advanced',
    timeLimit: 4,
    starMethod: true,
  },

  {
    id: 'leadership-example',
    category: 'Behavioral Questions',
    question: 'Give me an example of when you showed leadership.',
    tips: [
      'Use the STAR method',
      'Choose a clear leadership example',
      'Show initiative and responsibility',
      'Include team impact',
      'Demonstrate results'
    ],
    sampleAnswer: 'Situation: [Context requiring leadership]. Task: [What needed to be accomplished]. Action: [Specific leadership actions taken]. Result: [Team and project outcomes]. This experience taught me [leadership lessons].',
    difficulty: 'intermediate',
    timeLimit: 4,
    starMethod: true,
  },

  // Technical Questions
  {
    id: 'technical-skills',
    category: 'Technical Questions',
    question: 'What technical skills do you bring to this role?',
    tips: [
      'Match skills to job requirements',
      'Provide specific examples of use',
      'Mention relevant certifications',
      'Show continuous learning',
      'Be honest about skill levels'
    ],
    sampleAnswer: 'I bring strong skills in [relevant technical skills]. For example, I\'ve used [specific technology] to [specific accomplishment]. I\'m also certified in [relevant certification] and I\'m currently learning [new technology] to stay current with industry trends.',
    difficulty: 'intermediate',
    timeLimit: 3,
  },

  // Salary Expectations
  {
    id: 'salary-expectations',
    category: 'Salary & Negotiation',
    question: 'What are your salary expectations?',
    tips: [
      'Research market rates first',
      'Give a range, not a specific number',
      'Consider total compensation package',
      'Be flexible but know your worth',
      'Focus on value you bring'
    ],
    sampleAnswer: 'Based on my research and experience, I\'m looking for a salary in the range of [range]. However, I\'m open to discussing the total compensation package, including benefits, growth opportunities, and other factors that are important to me.',
    difficulty: 'advanced',
    timeLimit: 2,
  },

  // Questions for Them
  {
    id: 'questions-for-them',
    category: 'Questions for Them',
    question: 'Do you have any questions for us?',
    tips: [
      'Prepare 3-5 thoughtful questions',
      'Show genuine interest in the role',
      'Ask about company culture and growth',
      'Avoid questions about salary/benefits initially',
      'Listen to their answers and ask follow-ups'
    ],
    sampleAnswer: 'Yes, I have a few questions. First, what does success look like in this role in the first 90 days? Second, what are the biggest challenges the team is currently facing? And finally, what opportunities are there for professional development and growth?',
    difficulty: 'beginner',
    timeLimit: 3,
  },

  // Where Do You See Yourself
  {
    id: 'career-goals',
    category: 'Career Goals',
    question: 'Where do you see yourself in 5 years?',
    tips: [
      'Align with company growth opportunities',
      'Show ambition but be realistic',
      'Mention specific skills you want to develop',
      'Connect to the role and company',
      'Show commitment to the field'
    ],
    sampleAnswer: 'In 5 years, I see myself [specific career goal] with expertise in [relevant skills]. I\'m particularly interested in [specific area] and would love to contribute to [company-specific goals]. I\'m committed to continuous learning and growth in this field.',
    difficulty: 'intermediate',
    timeLimit: 2,
  },

  // Why Leave Current Job
  {
    id: 'why-leave',
    category: 'Career Transition',
    question: 'Why are you leaving your current position?',
    tips: [
      'Stay positive about current role',
      'Focus on growth and opportunity',
      'Avoid badmouthing current employer',
      'Be honest but diplomatic',
      'Connect to new opportunity'
    ],
    sampleAnswer: 'I\'ve learned a lot in my current role and I\'m grateful for the experience. However, I\'m looking for [specific growth opportunity] and this position offers exactly that. I\'m particularly excited about [specific aspect of new role] and the opportunity to [specific contribution].',
    difficulty: 'intermediate',
    timeLimit: 2,
  },
];

export const getCategorizedPracticeQuestions = () => {
  const categories: { [key: string]: PracticeQuestion[] } = {};
  
  practiceQuestions.forEach(question => {
    if (!categories[question.category]) {
      categories[question.category] = [];
    }
    categories[question.category].push(question);
  });
  
  return categories;
};

export const getQuestionsByDifficulty = (difficulty: PracticeQuestion['difficulty']) => {
  return practiceQuestions.filter(q => q.difficulty === difficulty);
};

export const getSTARMethodQuestions = () => {
  return practiceQuestions.filter(q => q.starMethod);
};
