"use client"

import QuizEditForm from "@/components/QuizEditForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizEditPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch quiz");
        }

        setQuiz(data);
      } catch (error) {
        setError(error as string);
      }
    };

    fetchQuiz();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <QuizEditForm quiz={quiz} />
    </div>
  );
}