"use client";

import { useTranslations } from "next-intl";
import UserAttemptQuizCard from "@/components/UserAttemptQuizCard";
import UserQuizCard from "@/components/UserQuizCard";
import { useState } from "react";
import { deleteQuiz } from "@/actions/deleteQuiz";
import { ClientDashboardProps } from "../../types";
import { useRouter } from "next/navigation";


export default function ClientDashboard({ userQuizData, userQuizAttemptsData }: ClientDashboardProps) {
  
  const t = useTranslations("Dashboard");
  const [quizzes, setQuizzes] = useState(userQuizData);

  const router = useRouter();

  const handleDelete = async (quizId: string) => {
    try {
      await deleteQuiz(quizId);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));

      router.push("/en/dashboard");
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