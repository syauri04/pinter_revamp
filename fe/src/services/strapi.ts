const STRAPI_API = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchFromStrapi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${STRAPI_API}/api${endpoint}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}
