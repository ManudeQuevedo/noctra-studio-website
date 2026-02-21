"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function handleSignOut(locale: string) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${locale}/studio/login`);
}
