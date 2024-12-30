import { createClient } from "@/db/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(500).json({ error: "Failed to sign out." });
    }

    // Clear cookies or perform any other logout-related tasks
    res.setHeader("Set-Cookie", "supabase-auth-token=; Max-Age=0; Path=/;");
    return res.status(200).json({ message: "Signed out successfully." });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
