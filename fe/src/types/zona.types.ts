export interface ZonaProperties {
  // Properti umum
  NAMOBJ?: string;
  Zona?: string;
  REMARK?: string;
  LABEL?: string;
  JENIS?: string;

  // Pola Ruang
  Kode?: string;
  Kode_Zona?: string;

  // Fallback untuk properti GeoJSON tidak konsisten
  [key: string]: unknown;
}
