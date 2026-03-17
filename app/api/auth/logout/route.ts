import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
  await supabase.auth.signOut();
  const res = NextResponse.json({ message: "Logged out!" });
  res.cookies.set("token", "", { maxAge: 0 });
  return res;
}
