import { createClient } from "@/db/supabase";

type AttemptData = {
  id: string;
  quiz_id: string;
  user_id: string;
  score: number;
};

type CorrectOption = {
  id: string;
  question_id: string;
  is_correct: boolean;
};

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    // Create a new attempt
    const url = new URL(req.url);
    const id = url.pathname.split("/").slice(-2, -1)[0];
    const body = await req.json();
    const { answers } = body;
    console.log("Answers:", answers);

    const { data: attemptData, error: attemptError } = await supabase
      .from("attempts")
      .insert([
        {
          quiz_id: id,
          user_id: "b2e909a1-bd9a-441a-b5f3-d4f89872a1b5",
          score: 0,
        },
      ])
      .select()
      .single<AttemptData>();

    if (attemptError) {
      console.error("Attempt Error:", attemptError);
      throw attemptError;
    }

    if (!attemptData) {
      throw new Error("Failed to create attempt");
    }

    const attemptId = attemptData.id;
    console.log("Attempt ID:", attemptId);

    // Insert answers
    for (const [questionId, optionId] of Object.entries(answers)) {
      const { error: answerError } = await supabase
        .from("answers")
        .insert([
          {
            attempt_id: attemptId,
            question_id: questionId,
            selected_option: optionId,
          },
        ]);

      if (answerError) {
        console.error("Answer Error:", answerError);
        throw answerError;
      }
    }

    // Calculate score (this is a simplified example, adjust scoring logic as needed)
    const { data: correctOptions, error: correctOptionsError } = await supabase
      .from("options")
      .select("id, question_id, is_correct")
      .in("id", Object.values(answers)) as { data: CorrectOption[], error: unknown };

    if (correctOptionsError) {
      console.error("Correct Options Error:", correctOptionsError);
      throw correctOptionsError;
    }

    const score = correctOptions.reduce((acc, option) => {
      if (option.is_correct) {
        acc += 1;
      }
      return acc;
    }, 0);

    // Update attempt with score
    const { error: updateError } = await supabase
      .from("attempts")
      .update({ score })
      .eq("id", attemptId);

    if (updateError) {
      console.error("Update Error:", updateError);
      throw updateError;
    }

    // Prepare correct answers map
    const correctAnswers = correctOptions.reduce((acc, option) => {
      if (option.is_correct) {
        acc[option.question_id] = option.id;
      }
      return acc;
    }, {} as { [key: string]: string });

    return new Response(JSON.stringify({ score, correctAnswers }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 400,
    });
  }
}