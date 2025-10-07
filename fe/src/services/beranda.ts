import { fetchFromStrapi } from "./strapi";
import { BerandaData, StrapiBerandaResponse, BackgroundHeroData } from "@/types/beranda";
import { PotensiInvestasi, StrapiPotensiResponse } from "@/types/potensi";

export async function fetchBeranda(): Promise<BerandaData> {
  const res = await fetchFromStrapi<StrapiBerandaResponse>("/beranda?populate[sectionHero][populate]=*&populate[sectionPotensi][populate]=*&populate[sectionRealisasi][populate]=*&populate[sectionTujuan][populate]=*");

  const data = res.data;

  if (!data) {
    throw new Error("Beranda data not found");
  }

  // backgroundHero sudah object, bisa langsung pakai .url
  const backgroundHero: BackgroundHeroData = data.sectionHero?.backgroundHero || { id: 0, url: "/placeholder.jpg" };

  return {
    sectionHero: {
      id: data.sectionHero.id,
      title: data.sectionHero.title || "Default Title",
      ringkasan: data.sectionHero.ringkasan || "Default Ringkasan",
      backgroundHero, // bisa langsung akses backgroundHero.url
    },
    sectionPotensi: {
      id: data.sectionPotensi.id,
      title: data.sectionPotensi.title || "Default Section Title",
      ringkasan: data.sectionPotensi.ringkasan || "Default Section Ringkasan",
    },
    sectionRealisasi: {
      id: data.sectionRealisasi.id,
      title: data.sectionRealisasi.title || "Default Section Title",
      periodeRealisasi: data.sectionRealisasi.periodeRealisasi || "Default Periodisasi",
      pma: Number(data.sectionRealisasi.pma) || 0,
      pmdn: Number(data.sectionRealisasi.pmdn) || 0,
      sumber: data.sectionRealisasi.sumber || "Default sumber",
    },
    sectionTujuan: {
      id: data.sectionTujuan.id,
      title: data.sectionTujuan.title || "Default Section Title",
      tagline: data.sectionTujuan.tagline || "Default Periodisasi",
      lineData: data.sectionTujuan.lineData || [],
      listLogo: data.sectionTujuan.listLogo || [],
    },
  };
}

export async function fetchPotensiInvestasi(): Promise<PotensiInvestasi[]> {
  const res = await fetchFromStrapi<StrapiPotensiResponse>("/potensi-investasis?sort=order:asc");

  if (!res.data) {
    throw new Error("Potensi Investasi data not found");
  }

  // Mengembalikan array PotensiInvestasi
  return res.data;
}
