// src/components/styles/stylePR.ts
import { Feature, Geometry } from "geojson";
import L from "leaflet";
import { ZonaProperties } from "@/types/zona.types";

export const stylePR = (
  feature: Feature<Geometry, ZonaProperties>
): L.PathOptions => {
  const kode = feature.properties?.Kode || feature.properties?.Kode_Zona;

  // default style
  let fillColor = "#70a1ff";

  // contoh mapping warna berdasarkan kode zona
  switch (kode) {
    case "PD": // permukiman desa
      fillColor = "#feca57";
      break;
    case "PK": // permukiman kota
      fillColor = "#ff9f43";
      break;
    case "HP": // hutan produksi
      fillColor = "#1dd1a1";
      break;
    case "HL": // hutan lindung
      fillColor = "#10ac84";
      break;
    case "KR": // kawasan rawan
      fillColor = "#ff6b6b";
      break;
    default:
      fillColor = "#70a1ff"; // fallback
  }

  return {
    color: "#ffffff", // border
    weight: 1,
    fillOpacity: 0.6,
    fillColor,
  };
};
