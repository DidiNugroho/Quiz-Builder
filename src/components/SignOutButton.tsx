"use client";

import { createClient } from "@/db/supabase";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
      return;
    }

    // Redirect to login page after sign out
    router.push("/en/login");
  };

  return (
    <button
      onClick={handleSignout}
      className="px-4 py-2 text-sm rounded-full font-bold text-gray-500 border-2 bg-transparent hover:bg-gray-50 transition-all ease-in-out duration-300"
    >
      Logout
    </button>
  );
}