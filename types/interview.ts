export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  subQuestions?: string[];
  asked: boolean;
  priority: 'must-ask' | 'important' | 'optional';
  notes?: string;
  timestamp?: Date;
}

export interface FirmResearch {
  firmName: string;
  overview: string;
  keyPeople: Person[];
  culture: string;
  techStack: string[];
  links: Link[];
  recentNews: string;
  interviewTips: string;
  generatedAt: Date;
  rawContent: string;
}

export interface Person {
  name: string;
  title: string;
  linkedIn?: string;
  articles?: Article[];
  socialMedia?: SocialLink[];
}

export interface Article {
  title: string;
  url: string;
  platform?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Link {
  title: string;
  url: string;
  type: 'careers' | 'news' | 'about' | 'other';
}

export interface ChecklistState {
  questions: InterviewQuestion[];
  firmName?: string;
  interviewDate?: Date;
  lastUpdated: Date;
}

