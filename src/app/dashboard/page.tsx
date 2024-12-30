import getUserData from "@/actions/getUserData";
import getUserQuizAttemptsData from "@/actions/getUserQuizAttemptsData";
import getUserQuizData from "@/actions/getUserQuizData";
import UserAttemptQuizCard from "@/components/UserAttemptQuizCard";
import UserQuizCard from "@/components/UserQuizCard";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getUserData();

  if (!user) {
    return redirect("/login");
  }

  const userQuizData = await getUserQuizData(user.id);
  const userQuizAttemptsData = await getUserQuizAttemptsData(user.id);

  return (
    <div className="flex flex-col items-center space-y-4 ">
      <h1 className="font-bold text-2xl">Manage Your Own Quiz</h1>
      {userQuizData.length > 0 ? (
        <UserQuizCard quizzes={userQuizData} />
      ) : (
        <p className="text-gray-500">You don&apos;t have a quiz created yet</p>
      )}
      {userQuizAttemptsData.length > 0 ? (
        <>
          <h1 className="font-bold text-2xl">Quiz Taken</h1>
          <UserAttemptQuizCard quizzes={userQuizAttemptsData} />
        </>
      ) : (
        <p className="text-gray-500">
          You don&apos;t have any quiz attempts yet
        </p>
      )}
    </div>
  );
}
