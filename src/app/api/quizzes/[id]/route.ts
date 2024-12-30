import { createClient } from "@/db/supabase";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    // Fetch the quiz details
    const { data: quizData, error: quizError } = await supabase
      .from("quizzes")
      .select("id, title, description")
      .eq("id", id)
      .single();

    if (quizError) {
      throw new Error(quizError.message);
    }

    if (!quizData) {
      throw new Error("Failed to fetch quiz");
    }

    // Fetch the questions and options
    const { data: questionsData, error: questionsError } = await supabase
      .from("questions")
      .select(`
        id,
        question_text,
        options (
          id,
          option_text,
          is_correct
        )
      `)
      .eq("quiz_id", id);

    if (questionsError) {
      throw new Error(questionsError.message);
    }

    // Combine quiz data with questions and options
    const quiz = {
      ...quizData,
      questions: questionsData,
    };

    return new Response(JSON.stringify(quiz), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message || "Unknown error occurred" }),
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    const { title, description, questions } = await request.json();

    // Update the quiz details
    const { error: quizError } = await supabase
      .from("quizzes")
      .update({ title, description })
      .eq("id", id);

    if (quizError) {
      throw new Error(quizError.message);
    }

    // Update the questions and options
    for (const question of questions) {
      const { id: questionId, text, answers } = question;

      // Update the question
      const { error: questionError } = await supabase
        .from("questions")
        .update({ question_text: text })
        .eq("id", questionId);

      if (questionError) {
        throw new Error(questionError.message);
      }

      // Update the answers
      for (const answer of answers) {
        const { id: answerId, text: answerText, isCorrect } = answer;

        const { error: answerError } = await supabase
          .from("options")
          .update({ option_text: answerText, is_correct: isCorrect })
          .eq("id", answerId);

        if (answerError) {
          throw new Error(answerError.message);
        }
      }
    }

    return new Response(JSON.stringify({ message: "Quiz updated successfully!" }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message || "Unknown error occurred" }),
      { status: 400 }
    );
  }
}