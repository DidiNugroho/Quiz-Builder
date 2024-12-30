import { createClient } from "@/db/supabase";
import { Quiz } from "../../types";

export default async function getUserQuizDetail(userId: string): Promise<Quiz[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("quizzes")
        .select("id, title, description, questions")
        .eq("user_id", userId);

    if (error) {
        console.error("Error fetching user quizzes:", error);
        return [];
    }

    return Array.isArray(data) ? data : [];
}
