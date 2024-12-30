"use client";

import { useTranslations } from "next-intl";
import UserAttemptQuizCard from "@/components/UserAttemptQuizCard";
import UserQuizCard from "@/components/UserQuizCard";
import { useState } from "react";
import { deleteQuiz } from "@/utils/deleteQuiz";


interface ClientDashboardProps {
  userQuizData: { id: string; title: string; description: string }[];
  userQuizAttemptsData: { id: string; quizId: string; score: number }[];
}

export default function ClientDashboard({ userQuizData, userQuizAttemptsData }: ClientDashboardProps) {
  const t = useTranslations("Dashboard");
  const [quizzes, setQuizzes] = useState(userQuizData);

  const handleDelete = async (quizId: string) => {
    try {
        console.log(quizId)
      await deleteQuiz(quizId);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
    } catch (error) {
      console.error('Failed to delete quiz:', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="font-bold text-2xl">{t("manageYourQuiz")}</h1>
      {userQuizData.length > 0 ? (
        <UserQuizCard quizzes={userQuizData} handleDelete={handleDelete} />
      ) : (
        <p className="text-gray-500">{t("noQuizCreated")}</p>
      )}
      {userQuizAttemptsData.length > 0 ? (
        <>
          <h1 className="font-bold text-2xl">{t("quizTaken")}</h1>
          <UserAttemptQuizCard quizzes={userQuizAttemptsData} />
        </>
      ) : (
        <p className="text-gray-500">{t("noQuizAttempts")}</p>
      )}
    </div>
  );
}