"use client";

import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { FeatureCollection, Feature, Geometry } from "geojson";
import { PathOptions, Control } from "leaflet";
import "leaflet/dist/leaflet.css";

type ZonaProperties = {
  Kode_Zona?: string;
  Zona?: string;
  Keterangan?: string;
  Pola_Ruang?: string;
  Luas_Ha?: number;
};

// Peta warna
const zonaColors: Record<string, string> = {
  KH: "#E64CFF",
  LB: "#CCFFB3",
  KPI: "#EDEDD4",
  Pp1: "#FF8C28",
  PD: "#FFCC4C",
  Pp3: "#FFB340",
  LK: "#D9FFE6",
  PB: "#CCFF80",
  Pp2: "#FFA032",
  HPT: "#B3E6E6",
  HK: "#B3B3FF",
  HL: "#B3B3FF",
  HP: "#99F2CC",
  EH: "#4E4E4E",
};

const getColorPR = (d?: string) => zonaColors[d || ""] || "#ccc";

// Style setiap feature
const stylePR = (feature?: Feature<Geometry, ZonaProperties>): PathOptions => {
  const kode = feature?.properties?.Kode_Zona;
  return {
    fillColor: getColorPR(kode),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "2",
    fillOpacity: 0.7,
  };
};

// Komponen legend khusus
function Legend() {
  const map = useMap();

  useEffect(() => {
    const legend = new Control({ position: "topright" }); // ⬅ posisi di atas kanan

    legend.onAdd = () => {
      const div = document.createElement("div");
      div.className = "leaflet-control leaflet-bar";
      div.style.background = "white";
      div.style.padding = "10px";
      div.style.fontSize = "12px";
      div.style.lineHeight = "16px";
      div.style.borderRadius = "6px";
      div.style.boxShadow = "0 0 6px rgba(0,0,0,0.2)";
      div.style.color = "#000000"; // ⬅ teks warna hitam

      div.innerHTML =
        `<strong style="color:#000;">Legenda Zona</strong><br/>` +
        Object.entries(zonaColors)
          .map(
            ([kode, color]) =>
              `<div style="display:flex;align-items:center;margin-top:4px;color:#000;">
                <span style="display:inline-block;width:14px;height:14px;background:${color};margin-right:6px;border:1px solid #999;"></span> ${kode}
              </div>`
          )
          .join("");

      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

export default function MapView() {
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry, ZonaProperties> | null>(null);

  useEffect(() => {
    fetch("/data/Pola_Ruang1.geojson")
      .then((res) => res.json())
      .then((data: FeatureCollection<Geometry, ZonaProperties>) => setGeoData(data));
  }, []);

  return (
    <MapContainer center={[-6.6, 106.8]} zoom={10} style={{ height: "853px", width: "100%" }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoData && (
        <GeoJSON
          data={geoData}
          style={stylePR}
          onEachFeature={(feature, layer) => {
            const { Kode_Zona, Zona, Keterangan, Pola_Ruang, Luas_Ha } = feature.properties || {};
            const popupHtml = `
              <div class="p-3 max-w-xs">
                <h3 class="text-lg font-bold text-black leading-[100%] pb-1">${Kode_Zona || "-"} - ${Zona || "-"}</h3>
                <p class="text-sm text-black opacity-[0.4] font-medium pb-0.5">
                  <span class="font-bold opacity-100">Keterangan:</span> ${Keterangan || "-"}
                </p>
                <p class="text-sm text-black opacity-[0.4] font-medium pb-0.5">
                  <span class="font-bold opacity-100">Penetapan:</span> ${Pola_Ruang || "-"}
                </p>
                <p class="text-sm text-black opacity-[0.4] font-medium pb-0.5">
                  <span class="font-bold opacity-100">Luas Ha:</span> ${Luas_Ha || "-"}
                </p>
              </div>
            `;
            layer.bindPopup(popupHtml);
          }}
        />
      )}
      <Legend />
    </MapContainer>
  );
}
