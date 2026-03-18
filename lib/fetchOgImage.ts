export async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; InternetMemoryBot/1.0)",
      },
    });
    const html = await res.text();

    return (
      html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i)?.[1] ||
      html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i)?.[1] ||
      html.match(
        /<meta[^>]*name="twitter:image"[^>]*content="([^"]+)"/i,
      )?.[1] ||
      null
    );
  } catch {
    return null;
  }
}
