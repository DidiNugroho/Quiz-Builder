import getUserData from "@/actions/getUserData";
import getUserQuizAttemptsData from "@/actions/getUserQuizAttemptsData";
import getUserQuizData from "@/actions/getUserQuizData";
import { redirect } from "next/navigation";
import { getMessages } from "next-intl/server";
import ClientDashboard from "@/components/ClientDashboard";
import { DashboardProps } from "../../../../types";

export default async function Dashboard({ params }: DashboardProps) {
  const { locale } = await params;
  const user = await getUserData();

  if (!user) {
    return redirect("/login");
  }

  const userQuizData = await getUserQuizData(user.id);
  const userQuizAttemptsData = await getUserQuizAttemptsData(user.id);
  const messages = await getMessages({locale});

  return (
    <ClientDashboard
      user={user}
      userQuizData={userQuizData}
      userQuizAttemptsData={userQuizAttemptsData}
      messages={messages}
    />
  );
}