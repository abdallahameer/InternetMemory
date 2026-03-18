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

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const supabase = getSupabase(token);
  const { searchParams } = new URL(req.url);
  const collectionId = searchParams.get("collection_id");
  const isLiked = searchParams.get("is_liked");

  let query = supabase
    .from("links")
    .select("*, collections(name)")
    .order("created_at", { ascending: false });

  if (collectionId) query = query.eq("collection_id", collectionId);
  if (isLiked === "true") query = query.eq("is_liked", true);

  const { data, error } = await query;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ links: data });
}

export async function POST(req: NextRequest) {
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
  if (!url)
    return NextResponse.json({ error: "URL is required" }, { status: 400 });

  // ✅ Fetch og:image automatically
  const image = await fetchOgImage(url);

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

  const { data, error } = await supabase
    .from("links")
    .insert({ url, title, description, collection_id, user_id: user.id, image }) // ✅ image added
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ link: data }, { status: 201 });
}
