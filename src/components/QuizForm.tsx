"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

function QuizForm() {
  const router = useRouter();
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [
      {
        text: "",
        answers: [{ text: "", isCorrect: false }],
      },
    ],
  });

  const handleQuizChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => ({ ...prevQuiz, [name]: value }));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = quiz.questions.map((q, i) =>
      i === index ? { ...q, text: value } : q
    );
    setQuiz((prevQuiz) => ({ ...prevQuiz, questions: updatedQuestions }));
  };

  const handleAnswerChange = (
    qIndex: number,
    aIndex: number,
    value: string
  ) => {
    const updatedAnswers = quiz.questions[qIndex].answers.map((a, i) =>
      i === aIndex ? { ...a, text: value } : a
    );
    const updatedQuestions = quiz.questions.map((q, i) =>
      i === qIndex ? { ...q, answers: updatedAnswers } : q
    );
    setQuiz((prevQuiz) => ({ ...prevQuiz, questions: updatedQuestions }));
  };

  const toggleCorrectAnswer = (qIndex: number, aIndex: number) => {
    const updatedAnswers = quiz.questions[qIndex].answers.map((a, i) =>
      i === aIndex ? { ...a, isCorrect: !a.isCorrect } : a
    );
    const updatedQuestions = quiz.questions.map((q, i) =>
      i === qIndex ? { ...q, answers: updatedAnswers } : q
    );
    setQuiz((prevQuiz) => ({ ...prevQuiz, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [
        ...prevQuiz.questions,
        { text: "", answers: [{ text: "", isCorrect: false }] },
      ],
    }));
  };

  const addAnswer = (qIndex: number) => {
    const updatedQuestions = quiz.questions.map((q, i) =>
      i === qIndex
        ? { ...q, answers: [...q.answers, { text: "", isCorrect: false }] }
        : q
    );
    setQuiz((prevQuiz) => ({ ...prevQuiz, questions: updatedQuestions }));
  };

  const removeAnswer = (qIndex: number) => {
    const updatedQuestions = quiz.questions.map((q, i) =>
      i === qIndex ? { ...q, answers: q.answers.slice(0, -1) } : q
    );
    setQuiz((prevQuiz) => ({ ...prevQuiz, questions: updatedQuestions }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }

      Swal.fire({
        title: "Success",
        text: "Quiz created successfully",
        icon: "success",
      });

      router.push("/en/quiz-home");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error instanceof Error ? error.message : "Unknown error occurred",
        icon: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 m-24">
      <div className="space-y-2 flex flex-col">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={quiz.title}
          onChange={handleQuizChange}
          className="border p-2 mt-2"
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={quiz.description}
          onChange={handleQuizChange}
          className="border p-2 space-y-2 mt-2 flex flex-col"
        />
      </div>

      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="border p-4 space-y-4">
          <div>
            <label>Question {qIndex + 1}:</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mt-2">
            <label>Answers: </label>
          </div>
          {question.answers.map((answer, aIndex) => (
            <div key={aIndex} className="flex items-center space-x-2">
              <input
                type="text"
                value={answer.text}
                onChange={(e) =>
                  handleAnswerChange(qIndex, aIndex, e.target.value)
                }
                className="border p-2 flex-grow"
              />
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={() => toggleCorrectAnswer(qIndex, aIndex)}
              />
              <label>Correct</label>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addAnswer(qIndex)}
            className="text-blue-500"
          >
            Add Answer
          </button>
          <button
            type="button"
            onClick={() => removeAnswer(qIndex)}
            className="text-red-500 ml-4"
          >
            Remove Answer
          </button>
        </div>
      ))}

      <button type="button" onClick={addQuestion} className="text-white bg-green-500 p-2 mr-4">
        Add Question
      </button>

      <button type="submit" className="bg-blue-500 text-white p-2">
        Submit Quiz
      </button>
    </form>
  );
}

export default QuizForm;
