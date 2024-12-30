"use client";

import QuizCard from "@/components/QuizCard";
import { useEffect, useState } from "react";
import { Quiz } from "../../../types";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch("/api/quizzes");
      const data = await response.json();
      setQuizzes(data);
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-semibold">Quiz List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* <QuizCard /> */}
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quizzes={quiz} />
        ))}
      </div>
    </div>
  );
}
