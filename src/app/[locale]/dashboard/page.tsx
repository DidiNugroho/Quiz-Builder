import { redirect } from "next/navigation";
import ClientDashboard from "@/components/ClientDashboard";
import getUserData from "@/actions/getUserData";
import getUserQuizData from "@/actions/getUserQuizData";
import getUserQuizAttemptsData from "@/actions/getUserQuizAttemptsData";

export default async function Dashboard() {
  const user = await getUserData();

  if (!user) {
    return redirect("/login");
  }

  const userQuizData = await getUserQuizData(user.id);
  const userQuizAttemptsData = await getUserQuizAttemptsData(user.id);
  

  return (
    <ClientDashboard
      userQuizData={userQuizData}
      userQuizAttemptsData={userQuizAttemptsData}
    />
  );
}