import { createClient } from "@/db/supabase";
import { getMessages } from "next-intl/server";

export async function getUserAndTranslations(locale: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return { user: null, messages: await getMessages({ locale }) };
  }

  return { user: data.user, messages: await getMessages({ locale }) };
}