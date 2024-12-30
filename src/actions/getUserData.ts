import { supabaseServerClient } from "@/db/supabaseServer";
import { User } from "../../types";

const getUserData = async (): Promise<User | null> => {
  const supabase = await supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("No User Found", user);
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);

    if (error) {
      console.log("Error fetching user data", error);
      return null;
    }

    return data ? data[0] : null;
};

export default getUserData;
