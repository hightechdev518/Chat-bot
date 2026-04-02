export type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  content: string;
  sources?: string[];
  feedback?: 'good' | 'bad' | null;
  timestamp: number;
};

export type Feedback = 'good' | 'bad';
