export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  text: string;
  answers: Answer[];
}

export interface DashboardProps {
    locale: string;
}

export interface LocaleProps {
    params: {
      locale: string;
    }
}

export interface ClientDashboardProps {
  user: User;
  userQuizData: UserQuiz[];
  userQuizAttemptsData: UserQuizAttempt[];
  messages: Record<string, string>;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}


export interface UserQuiz {
  id: string;
  title: string;
  description: string;
  score: number;
}

export interface User {
  id: string;
  email: string;
}


export interface UserQuizAttempt {
  id: string;
  quiz_id: string;
  score: number;
}
