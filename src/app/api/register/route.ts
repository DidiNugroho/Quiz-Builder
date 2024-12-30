import { supabaseServerClient } from "@/db/supabaseServer";
import { z } from "zod";

// Define a schema for user input validation
const UserSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string({ message: "Password Required" })
    .min(5, { message: "Password must be at least 5 characters" }),
});



export async function POST(request: Request) {
  try {
    // Validate the request body
    const supabase = await supabaseServerClient();

    const { email, password } = UserSchema.parse(await request.json());

    // Register the user using Supabase Auth
    const { data } = await supabase.auth.signUp({
      email,
      password,
    });
    
    const { error: dbError } = await supabase
      .from("users")
      .insert([{ id: data.user?.id, email: data.user?.email }]);

    if (dbError) {
      throw new Error("This email is already registered");
    }

    return new Response(
      JSON.stringify({ message: "User registered successfully!" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message || "Server Error" }),
      { status: 400 }
    );
  }
}
