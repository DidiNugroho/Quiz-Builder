import { createClient } from "@/db/supabase";
import { UserQuiz } from "../../types";

export default async function getUserQuizData(userId: string): Promise<UserQuiz[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("quizzes")
        .select("id, title, description")
        .eq("user_id", userId);

    if (error) {
        console.error("Error fetching user quizzes:", error);
        return [];
    }

    return Array.isArray(data) ? data : [];
}
