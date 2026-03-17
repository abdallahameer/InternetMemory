import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user)
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });

  return NextResponse.json({
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata.name,
    },
  });
}
