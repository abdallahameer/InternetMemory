import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } },
  );
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params; // ✅ await params first

  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const supabase = getSupabase(token);

  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  if (!user)
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });

  const { data: link } = await supabase
    .from("links")
    .select("is_liked")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!link)
    return NextResponse.json({ error: "Link not found" }, { status: 404 });

  const { data, error } = await supabase
    .from("links")
    .update({ is_liked: !link.is_liked })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ link: data });
}
