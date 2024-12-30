// import { errorHandler } from "@/helpers/errorHandler";
import { supabaseServerClient } from "@/db/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await supabaseServerClient();
    const { email, password } = await request.json();

    const userData = {
      email,
      password,
    };

    const response = await supabase.auth.signInWithPassword(userData);

    const session = response.data.session;
    
    if (!session) {
      throw new Error("Invalid email or password");
    }

    const token = session.access_token;

    return NextResponse.json({ message: "ok", access_token: token });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Unknown error occurred" },
      { status: 400 }
    );
  }
}
