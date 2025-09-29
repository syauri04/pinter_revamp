export function getStrapiMedia(url?: string): string {
  if (!url) return "/placeholder.jpg"; // fallback

  try {
    new URL(url);
    return url;
  } catch {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
  }
}
