import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } },
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const supabase = getSupabase(token);

  const { error } = await supabase.from("collections").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Collection deleted" });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  console.log("=== PATCH COLLECTION ===");
  console.log("ID:", id);
  console.log("Body:", body);
  console.log("Name:", body.name);

  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const supabase = getSupabase(token);

  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  console.log("User ID:", user?.id);

  if (!user)
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });

  if (!body.name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const { data, error } = await supabase
    .from("collections")
    .update({ name: body.name })
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  console.log("Supabase result data:", data);
  console.log("Supabase result error:", error);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Collection updated", data });
}
