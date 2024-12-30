import { createClient } from "@/db/supabase";

export default async function getUserQuizAttemptsData(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("attempts")
    .select(`
      id,
      quiz_id,
      score,
      quizzes (
        id,
        title,
        description
      )
    `)
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user quiz attempts:", error);
    return [];
  }

  return data;
}