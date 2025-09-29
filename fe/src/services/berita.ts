import { fetchFromStrapi } from "./strapi";
import { BeritaItem, StrapiBeritaResponse, KategoriBerita } from "@/types/berita";

export async function fetchBeritaForHome(): Promise<BeritaItem[]> {
  const res = await fetchFromStrapi<StrapiBeritaResponse>("/beritas?populate=coverImage&populate=kategori_berita&sort=createdAt:desc&pagination[limit]=4");

  if (!res.data) {
    throw new Error("Berita data not found");
  }

  return res.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    ringkasan: item.ringkasan,
    createdAt: item.createdAt,
    coverImage: item.coverImage,
    kategori: item.kategori_berita
      ? {
          id: item.kategori_berita.id,
          slug: item.kategori_berita.slug,
          kategori: item.kategori_berita.kategori,
        }
      : null,
  }));
}

export async function fetchBeritaByKategori(page = 1, pageSize = 6, kategoriSlug?: string) {
  let endpoint = `/beritas?populate=coverImage&populate=kategori_berita&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  if (kategoriSlug) {
    endpoint += `&filters[kategori_berita][slug][$eq]=${kategoriSlug}`;
  }

  const res = await fetchFromStrapi<{
    data: BeritaItem[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }>(endpoint);

  if (!res.data) throw new Error("Berita data not found");

  return {
    data: res.data,
    total: res.meta.pagination.total,
    pageCount: res.meta.pagination.pageCount,
  };
}

export async function fetchKategoriBerita(): Promise<KategoriBerita[]> {
  const res = await fetchFromStrapi<{ data: KategoriBerita[] }>("/kategori-beritas?populate=*&sort=kategori:asc");

  if (!res.data) throw new Error("Kategori berita not found");

  return res.data;
}

export async function fetchBeritaBySlug(slug: string) {
  const res = await fetchFromStrapi<{ data: BeritaItem[] }>(`/beritas?filters[slug][$eq]=${slug}&populate=coverImage&populate=kategori_berita`);

  if (!res.data || res.data.length === 0) throw new Error("Berita tidak ditemukan");

  return res.data[0];
}
