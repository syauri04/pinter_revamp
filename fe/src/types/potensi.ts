export interface PotensiInvestasi {
  id: number;
  documentId: string;
  title: string;
  icon: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  slug: string;
}

export interface StrapiPotensiResponse {
  data: PotensiInvestasi[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
