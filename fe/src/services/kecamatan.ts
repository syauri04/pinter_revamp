import { fetchFromStrapi } from "./strapi";

interface PotensiRingkasan {
  id: number;
  ringkasan: string;
}

interface PotensiInvestasi {
  id: number;
  title: string;
  icon: string;
}

interface PotensiKecamatan {
  id: number;
  potensi_investasi: PotensiInvestasi;
  potensiRingkasan: PotensiRingkasan[];
}

export interface GalleryKecamatan {
  id: number;
  youtubeUrl?: string | null;
  thumbnail: {
    url: string;
    name: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
      thumbnail?: { url: string };
    };
  };
}

export interface Kecamatan {
  id: number;
  documentId: string;
  slug: string;
  ringkasan: string | null;
  deskripsi: string | null;
  linkInstagram: string | null;
  linkYoutube: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  cat: "Kecamatan" | "Kabupaten";
  title: string;
  potensiKecamatan: PotensiKecamatan[];
  galleryKecamatan: GalleryKecamatan[];
}

export async function fetchKecamatans(): Promise<Kecamatan[]> {
  const res = await fetchFromStrapi<{ data: Kecamatan[] }>("/kecamatans?populate[potensiKecamatan][populate]=*&pagination[page]=1&pagination[pageSize]=45");

  return res.data;
}

export async function fetchKecamatanBySlug(slug: string): Promise<Kecamatan | null> {
  const res = await fetchFromStrapi<{ data: Kecamatan[] }>(`/kecamatans?filters[slug][$eq]=${slug}&populate[galleryKecamatan][populate]=*&populate[potensiKecamatan][populate]=*`);

  if (!res.data || res.data.length === 0) return null;
  return res.data[0];
}
