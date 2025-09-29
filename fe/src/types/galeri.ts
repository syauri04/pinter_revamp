export interface GaleriImage {
  id: number;
  url: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
    thumbnail?: { url: string };
  };
}

export interface KategoriGaleri {
  id: number;
  kategori: string;
  slug: string;
}

export interface GaleriItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  ringkasan: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  kategori_galeri: KategoriGaleri | null;
  featuredImage: GaleriImage | null;
  galeriImage: GaleriImage[];
}
