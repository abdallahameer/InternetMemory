import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchOgImage } from "@/lib/fetchOgImage";

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
  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  if (!user)
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Link deleted" });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const supabase = getSupabase(token);

  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  if (!user)
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });

  const { url, title, description, collection } = await req.json();

  // ✅ Fetch new image if URL changed
  const image = url ? await fetchOgImage(url) : undefined;

  let collection_id = null;

  if (collection?.trim()) {
    const { data: existing } = await supabase
      .from("collections")
      .select("id")
      .eq("name", collection.trim())
      .eq("user_id", user.id)
      .single();

    if (existing) {
      collection_id = existing.id;
    } else {
      const { data: newCol } = await supabase
        .from("collections")
        .insert({ name: collection.trim(), user_id: user.id })
        .select()
        .single();
      collection_id = newCol?.id ?? null;
    }
  }

  const updateData = {
    title,
    description,
    collection_id,
    ...(image !== undefined && { image }), // ✅ only update image if URL was provided
  };

  const { data, error } = await supabase
    .from("links")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ link: data });
}
