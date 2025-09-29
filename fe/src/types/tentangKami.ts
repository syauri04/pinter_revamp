export interface TentangKamiData {
  id: number;
  documentId: string;
  title: string;
  ringkasan: string;
  visi: string;
  contentMisi: MisiItem[];
}

export interface MisiItem {
  id: number;
  icon: string; // Nama icon, nanti kita map ke React Icon
  misi: string;
}

export interface StrapiTentangKamiResponse {
  data: TentangKamiData;
}
