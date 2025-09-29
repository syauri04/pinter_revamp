import { fetchFromStrapi } from "./strapi";
import { GaleriItem, KategoriGaleri } from "@/types/galeri";

// Ambil galeri untuk halaman utama atau pagination
export async function fetchGaleri(page = 1, pageSize = 6, kategoriSlug?: string) {
  let endpoint = `/galeris?populate=featuredImage&populate=galeriImage&populate=kategori_galeri&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  if (kategoriSlug) {
    endpoint += `&filters[kategori_galeri][slug][$eq]=${kategoriSlug}`;
  }

  const res = await fetchFromStrapi<{ data: GaleriItem[]; meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } } }>(endpoint);

  if (!res.data) throw new Error("Galeri data not found");

  return {
    data: res.data,
    total: res.meta.pagination.total,
    pageCount: res.meta.pagination.pageCount,
  };
}

// Ambil semua kategori galeri
export async function fetchKategoriGaleri(): Promise<KategoriGaleri[]> {
  const res = await fetchFromStrapi<{ data: KategoriGaleri[] }>("/kategori-galeris?populate=*&sort=kategori:asc");

  if (!res.data) throw new Error("Kategori galeri not found");

  return res.data;
}

// Ambil galeri berdasarkan slug
export async function fetchGaleriBySlug(slug: string) {
  const res = await fetchFromStrapi<{ data: GaleriItem[] }>(`/galeris?filters[slug][$eq]=${slug}&populate=featuredImage&populate=galeriImage&populate=kategori_galeri`);

  if (!res.data || res.data.length === 0) throw new Error("Galeri tidak ditemukan");

  return res.data[0];
}
