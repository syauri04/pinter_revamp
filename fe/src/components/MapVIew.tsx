"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import { FeatureCollection, Feature, Geometry } from "geojson";
import "leaflet/dist/leaflet.css";
import MapFilterControl from "@/components/MapFilterControl";
import MapPointControl from "@/components/MapPointControl";
import {
  energiIcon,
  kesehatanIcon,
  pasarIcon,
  pendidikanIcon,
  pslIcon,
  transportIcon,
} from "@/utils/markerIcons";
import L from "leaflet";
type ZonaProperties = {
  Kode?: string;
  NAMOBJ?: string;
  REMARK?: string;
  LABEL?: string;
  JENIS?: string;
};

// 🎨 Warna Pola Ruang
const zonaColors: Record<string, string> = {
  BA: "#B3E6E6",
  "P-2": "#E64CFF",
  CA: "#CCFFB3",
  KPI: "#EDEDD4",
  "P-3": "#9DC183",
  PD: "#FFCC4C",
  HPT: "#FFB340",
  PS: "#D9FFE6",
  PB: "#CCFF80",
  "HPT/P-3": "#FFA032",
  HK: "#B3B3FF",
  HL: "#B3B3FF",
  HP: "#99F2CC",
  "LGE-2": "#D8C48A",
  W: "#5AD1C8",
  "IK-2": "#2FA5C9",
  PK: "#FFD86B",
  "P-1": "#FF9E2C",
  "P-4": "#FF7A1A",
  MBT: "#D9D9D9",
  TN: "#8FD4A3",
  TWA: "#A3E6C2",
  "TWA/W": "#7FD6B5",
  "TWA/PD": "#B7F0D6",
  "TWA/PK": "#9CE7CA",
  "TWA/P-1": "#C7F8E2",
};

// 🎨 Warna Kawasan Strategis Daerah (REMARK)
const ksdColors: Record<string, string> = {
  default: "#FFCC00",
};

// 🎨 Warna Kawasan Rawan Banjir (label)
const krbColors: Record<string, string> = {
  BA: "#FA8072",
  GB: "#CD5C5C",
  GBBA: "#A45A52",
  GT: "#5E1914",
  GAT: "#B22222",
  GAT2: "#C21807",
};

// 🎨 Warna Tanah Kosong
const tnkColors: Record<string, string> = {
  HK: "#4B3A26",
  HL1: "#7C4700",
  HL2: "#5C2c06",
  KC: "#997950",
  LD: "#795C32",
  LH: "#402F1D",
  PR: "#2B1700",
  PK: "#622A0F",
  SP: "#3B270C",
  SB: "#4B382A",
};

// Ambil warna sesuai layer
const getColor = (properties: ZonaProperties, layer: string) => {
  if (layer === "pola") return zonaColors[properties.Kode || ""] || "#cccccc";

  if (layer === "ksd")
    return ksdColors[properties.REMARK || "default"] || "#FFCC00";

  if (layer === "krb")
    return krbColors[properties.Kode || "Rendah"] || "#FF9999";

  if (layer === "tnk") return tnkColors[properties.Kode || ""] || "#4B382A";

  return "#cccccc";
};

export default function MapView() {
  const [showPasar, setShowPasar] = useState(false);
  const [showPendidikan, setShowPendidikan] = useState(false);
  const [showKesehatan, setShowKesehatan] = useState(false);
  const [showTransportasi, setShowTransportasi] = useState(false);
  const [showEnergi, setShowEnergi] = useState(false);
  const [showPsl, setShowPsl] = useState(false);

  const [pasarData, setPasarData] = useState(null);
  const [pendidikanData, setPendidikanData] = useState(null);
  const [kesehatanData, setKesehatanData] = useState(null);
  const [transportasiData, setTransportasiData] = useState(null);
  const [energiData, setEnergiData] = useState(null);
  const [pslData, setPslData] = useState(null);

  const [activeLayer, setActiveLayer] = useState<
    "pola" | "ksd" | "krb" | "tnk"
  >("pola");
  const [geoData, setGeoData] = useState<FeatureCollection<
    Geometry,
    ZonaProperties
  > | null>(null);

  useEffect(() => {
    fetch("/data/Pasar.geojson")
      .then((r) => r.json())
      .then(setPasarData);
    fetch("/data/Fas_Pendidikan.geojson")
      .then((r) => r.json())
      .then(setPendidikanData);
    fetch("/data/Fas_Kesehatan.geojson")
      .then((r) => r.json())
      .then(setKesehatanData);
    fetch("/data/Prasarana_Transportasi.geojson")
      .then((r) => r.json())
      .then(setTransportasiData);
    fetch("/data/Prasarana_Energi.geojson")
      .then((r) => r.json())
      .then(setEnergiData);
    fetch("/data/Prasarana_Lainnya.geojson")
      .then((r) => r.json())
      .then(setPslData);
  }, []);
  // Load GeoJSON sesuai filter
  useEffect(() => {
    const fileMap = {
      pola: "/data/Pola_Ruang_2.geojson",
      ksd: "/data/KSD.geojson",
      krb: "/data/KRB.geojson",
      tnk: "/data/Tanah_Kosong.geojson",
    };

    fetch(fileMap[activeLayer], { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, [activeLayer]);

  return (
    <div>
      {/* MAP */}
      <MapContainer
        center={[-6.6, 106.8]}
        zoom={11}
        style={{ height: "603px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapFilterControl
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
        />
        <MapPointControl
          showPasar={showPasar}
          setShowPasar={setShowPasar}
          showPendidikan={showPendidikan}
          setShowPendidikan={setShowPendidikan}
          showKesehatan={showKesehatan}
          setShowKesehatan={setShowKesehatan}
          showTransportasi={showTransportasi}
          setShowTransportasi={setShowTransportasi}
          showEnergi={showEnergi}
          setShowEnergi={setShowEnergi}
          showPsl={showPsl}
          setShowPsl={setShowPsl}
        />

        {showPasar && pasarData && (
          <GeoJSON
            data={pasarData}
            pointToLayer={(_, latlng) => L.marker(latlng, { icon: pasarIcon })}
            onEachFeature={(feature, layer) => {
              const name = feature.properties?.Nama_Pasar || "Pasar";

              layer.bindPopup(`
                <div>
                  <h4 style="margin:0;font-weight:bold;">${name}</h4>
                </div>
              `);
            }}
          />
        )}

        {showPendidikan && pendidikanData && (
          <GeoJSON
            data={pendidikanData}
            pointToLayer={(_, latlng) =>
              L.marker(latlng, { icon: pendidikanIcon })
            }
            onEachFeature={(feature, layer) => {
              const name = feature.properties?.Name || "Pendidikan";
              const jenis = feature.properties?.TipeFasdik || "-";

              layer.bindPopup(`
                <div>
                  <h4 style="margin:0;font-weight:bold;">${name}</h4>
                  <p style="margin:0;font-size:12px;">Jenis: ${jenis}</p>
                </div>
              `);
            }}
          />
        )}

        {showKesehatan && kesehatanData && (
          <GeoJSON
            data={kesehatanData}
            pointToLayer={(_, latlng) =>
              L.marker(latlng, { icon: kesehatanIcon })
            }
            onEachFeature={(feature, layer) => {
              const name = feature.properties?.Name || "Fasilitas Kesehatan";
              const jenis = feature.properties?.TipeFaskes || "-";

              layer.bindPopup(`
                <div>
                  <h4 style="margin:0;font-weight:bold;">${name}</h4>
                  <p style="margin:0;font-size:12px;">Jenis: ${jenis}</p>
                </div>
              `);
            }}
          />
        )}

        {showTransportasi && transportasiData && (
          <GeoJSON
            data={transportasiData}
            pointToLayer={(_, latlng) =>
              L.marker(latlng, { icon: transportIcon })
            }
            onEachFeature={(feature, layer) => {
              const name =
                feature.properties?.NAMOBJ || "Prasarana Transportasi";
              const jenis = feature.properties?.REMARK || "-";

              layer.bindPopup(`
                <div>
                  <h4 style="margin:0;font-weight:bold;">${name}</h4>
                  <p style="margin:0;font-size:12px;">Remark: ${jenis}</p>
                </div>
              `);
            }}
          />
        )}

        {showEnergi && energiData && (
          <GeoJSON
            data={energiData}
            pointToLayer={(_, latlng) => L.marker(latlng, { icon: energiIcon })}
            onEachFeature={(feature, layer) => {
              const name = feature.properties?.NAMOBJ || "Prasarana Energi";
              const jenis = feature.properties?.REMARK || "-";

              layer.bindPopup(`
                <div>
                  <h4 style="margin:0;font-weight:bold;">${name}</h4>
                  <p style="margin:0;font-size:12px;">Remark: ${jenis}</p>
                </div>
              `);
            }}
          />
        )}

        {showPsl && pslData && (
          <GeoJSON
            data={pslData}
            pointToLayer={(_, latlng) => L.marker(latlng, { icon: pslIcon })}
            onEachFeature={(feature, layer) => {
              const name = feature.properties?.NAMOBJ || "Prasarana Lainnya";
              const jenis = feature.properties?.REMARK || "-";

              layer.bindPopup(`
                <div>
                  <h4 style="margin:0;font-weight:bold;">${name}</h4>
                  <p style="margin:0;font-size:12px;">Remark: ${jenis}</p>
                </div>
              `);
            }}
          />
        )}

        {geoData && (
          <GeoJSON
            key={activeLayer + "-" + Date.now()}
            data={geoData}
            style={(feature: Feature<Geometry, ZonaProperties> | undefined) => {
              if (!feature) return {};

              return {
                fillColor: getColor(feature.properties, activeLayer),
                weight: 0.5,
                color: "white",
                fillOpacity: 0.7,
              };
            }}
            onEachFeature={(feature, layer) => {
              // Popup dinamis sesuai layer
              let title = "";
              let desc = "";

              if (activeLayer === "pola") {
                title = feature.properties?.Kode || "-";
                desc = feature.properties?.NAMOBJ || "-";
              }

              if (activeLayer === "ksd") {
                title = "Kawasan Strategis Daerah";
                desc = feature.properties?.REMARK || "-";
              }

              if (activeLayer === "krb") {
                title = "Kawasan Rawan Bencana";
                desc = feature.properties?.LABEL || "-";
              }

              if (activeLayer === "tnk") {
                title = "Tanah Kosong";
                desc = feature.properties?.JENIS || "-";
              }

              const popupHtml = `
                <div class="p-2">
                  <h3 class="font-bold text-black text-sm">${title}</h3>
                  <p class="text-xs text-black opacity-70">${desc}</p>
                </div>
              `;

              layer.bindPopup(popupHtml);
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
