import { createClient } from "@/db/supabase";
import { UserQuiz } from "../../types";

export default async function getUserQuizData(userId: string): Promise<UserQuiz[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("quizzes")
        .select(`
            id,
            title,
            description,
            attempts (
                id,
                score
            )
        `)
        .eq("user_id", userId);

    if (error) {
        console.error("Error fetching user quizzes:", error);
        return [];
    }

    return Array.isArray(data) ? data.map(quiz => ({
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        score: quiz.attempts.length > 0 ? quiz.attempts[0].score : 0
    })) : [];
}