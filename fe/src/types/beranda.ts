// src/types/beranda.ts

export type BackgroundHeroData = {
  id: number;
  name: string;
  url: string;
};

export type SectionHero = {
  id: number;
  title: string;
  ringkasan: string;
  backgroundHero: BackgroundHeroData;
};

export type SectionPotensi = {
  id: number;
  title: string;
  ringkasan: string;
};

export type SectionRealisasi = {
  id: number;
  title: string;
  periodeRealisasi: string;
  pma: number;
  pmdn: number;
  sumber: string;
};

export interface SectionTujuan {
  id: number;
  title: string;
  tagline: string;
  lineData: LineData[];
  listLogo: LogoItem[];
}

export interface LineData {
  id: number;
  tahun: string;
  investasi: number;
}

export interface LogoItem {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type BerandaData = {
  sectionHero: SectionHero;
  sectionPotensi: SectionPotensi;
  sectionRealisasi: SectionRealisasi;
  sectionTujuan: SectionTujuan;
};

// Tipe response full dari Strapi
export type StrapiBerandaResponse = {
  data: BerandaData & {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
  meta: Record<string, unknown>;
};
