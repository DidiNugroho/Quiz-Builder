// import { verifyToken } from "@/utils/jwt";
// import { cookies } from "next/headers";
import { createClient } from "@/db/supabase";

const supabase = createClient();
// below GET function is to get a list of quizzes
export async function GET(request: Request) {
    try {
        
        const { data, error } = await supabase.from("quizzes").select("*")
        if (error) {
            throw new Error(error.message);
        }
        if (!data) {
            throw new Error("Failed to fetch quizzes");
        }
        return Response.json(data);
    } catch (error) {
        return Response.json(
        { error: (error as Error).message || "Unknown error occurred" },
        { status: 400 }
        );
    }
}

export async function GET_USER_QUIZZES(request: Request) {
  try {
      const url = new URL(request.url);
      const userId = url.searchParams.get("user_id");

      if (!userId) {
          throw new Error("User ID is required");
      }

      const { data, error } = await supabase
          .from("quizzes")
          .select("*")
          .eq("user_id", userId);

      if (error) {
          throw new Error(error.message);
      }
      if (!data) {
          throw new Error("Failed to fetch user-created quizzes");
      }
      return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
      return new Response(
          JSON.stringify({ error: (error as Error).message || "Unknown error occurred" }),
          { status: 400 }
      );
  }
}

// below POST function is to create a new quiz
// it will also POST to questions table and answers table related to the quiz
export async function POST(request: Request) {
    try {
        // console.log("API endpoint called");

        // const cookieStore = await cookies()
        // const token = cookieStore.get("Authorization")?.value.split(" ")[1];
        // if (!token) throw { message: "Unauthorized", status: 401 };

        // const payload = verifyToken(token);
        // if (typeof payload === "string" || !payload.id) {
        //     throw { message: "Invalid token payload", status: 401 };
        // }
        // console.log("Payload:", payload);
        const userId = "b2e909a1-bd9a-441a-b5f3-d4f89872a1b5";
        
        const { title, description, questions} = await request.json();

        const { data, error } = await supabase.from("quizzes").insert([
        {
            user_id: userId,
            title,
            description,
        },
        ]).select();
    
        if (error) {
        throw new Error(error.message);
        }
    
        if (!data) {
            throw new Error("Failed to insert quiz");
        }
    
        for (const question of questions) {
            const { data: questionData, error: questionError } = await supabase
              .from("questions")
              .insert([
                {
                  quiz_id: data[0].id,
                  question_text: question.text,
                },
              ])
              .select();
          
            if (questionError) {
              throw new Error(questionError.message);
            }
          
            const questionId = questionData?.[0]?.id;
            if (!questionId) {
              throw new Error("Failed to insert question");
            }
          
            for (const answer of question.answers) { // Use the correct answers array within each question
              const { error: answerError } = await supabase.from("options").insert([
                {
                  question_id: questionId,
                  option_text: answer.text,
                  is_correct: answer.isCorrect,
                },
              ]);
          
              if (answerError) {
                throw new Error(answerError.message);
              }
            }
          }          
    
        return Response.json({ message: "ok" });
    } catch (error) {
        return Response.json(
        { error: (error as Error).message || "Unknown error occurred" },
        { status: 400 }
        );
    }
}

export async function DELETE(response: Response) {
  try {

    

    return Response.json({ message: "ok" });
  } catch (error) {
    return Response.json(
      { error: (error as Error).message || "Unknown error occurred" },
      { status: 400 }
      );
  }
}