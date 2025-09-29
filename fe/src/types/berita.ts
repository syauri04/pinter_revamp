export interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
}

export interface StrapiImage {
  id: number;
  url: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
}
export interface KategoriBerita {
  id: number;
  documentId: string;
  kategori: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface RichTextChild {
  text: string;
  type: string;
}

export interface RichTextBlock {
  type: "paragraph" | "image" | string;
  children?: RichTextChild[];
  image?: StrapiImage;
}
export interface BeritaItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  ringkasan: string;
  createdAt: string;
  coverImage?: StrapiImage;
  kategori_berita?: KategoriBerita | null;
  content?: RichTextBlock[];
  kategori: {
    kategori: string;
  };
}

export interface StrapiBeritaResponse {
  data: BeritaItem[];
}
