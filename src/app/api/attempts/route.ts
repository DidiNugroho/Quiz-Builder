import getUserData from "@/actions/getUserData";
import { createClient } from "@/db/supabase";

const supabase = createClient();

// GET function to get user quiz attempts
export async function GET(request: Request) {
    try {
        const user = await getUserData();

        const userId = user?.id;

        if (!userId) {
            throw new Error("You need to login first");
        }

        const { data, error } = await supabase
            .from("attempts")
            .select("*")
            .eq("user_id", userId);

        if (error) {
            throw new Error(error.message);
        }
        if (!data) {
            throw new Error("Failed to fetch user quiz attempts");
        }
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: (error as Error).message || "Unknown error occurred" }),
            { status: 400 }
        );
    }
}