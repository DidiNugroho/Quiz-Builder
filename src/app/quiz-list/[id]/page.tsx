/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './QuizDetail.module.css';

export default function QuizDetail() {
  const [quiz, setQuiz] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<{ [key: string]: string }>({});
  const { id } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/quizzes/${id}`);
        const data = await response.json();

        if (response.ok) {
          setQuiz(data);
        } else {
          setError(data.error || "Failed to fetch quiz");
        }
      } catch (error: unknown) {
        setError(error as string);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleChange = (questionId: string, optionId: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/quizzes/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (response.ok) {
        const data = await response.json();
        setScore(data.score);
        setCorrectAnswers(data.correctAnswers);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to submit quiz");
      }
    } catch (error: unknown) {
      setError(error as string);
    }
  };

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!quiz) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.quizContainer}>
      <h1 className={styles.quizTitle}>{quiz.title}</h1>
      <p className={styles.quizDescription}>{quiz.description}</p>
      {quiz.questions.map((question: any) => (
        <div key={question.id} className={styles.questionContainer}>
          <h2 className={styles.questionText}>{question.question_text}</h2>
          <ul className={styles.optionsList}>
            {question.options.map((option: any) => (
              <li
                key={option.id}
                className={`${styles.optionItem} ${
                  correctAnswers[question.id] === option.id
                    ? styles.correctAnswer
                    : answers[question.id] === option.id && score !== null
                    ? styles.incorrectAnswer
                    : ""
                }`}
              >
                <label>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.id}
                    onChange={() => handleChange(question.id, option.id)}
                    disabled={score !== null}
                  />
                  {option.option_text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {score === null ? (
        <button type="submit" className={styles.submitButton}>Submit Quiz</button>
      ) : (
        <div className={styles.scoreContainer}>
          <h2>Your Score: {score}</h2>
        </div>
      )}
    </form>
  );
}