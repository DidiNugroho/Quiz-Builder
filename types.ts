export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  text: string;
  answers: Answer[];
}

export interface DashboardProps {
  params: {
    locale: string;
  };
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
}

export interface User {
  id: string;
  email: string;
}


export interface UserQuizAttempt {
  id: string;
  quiz_id: string;
  score: number;
  quizzes: {
    id: string;
    title: string;
    description: string;
  };
}
