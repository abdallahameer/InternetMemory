import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 401 });

  const res = NextResponse.json({
    message: "Logged in!",
    user: { name: data.user.user_metadata.name, email: data.user.email },
  });

  // Save session token in a cookie
  res.cookies.set("token", data.session.access_token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
