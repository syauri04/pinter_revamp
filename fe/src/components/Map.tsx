"use client";

import React from "react";
import { useEffect, useRef } from "react";
import L, { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import { PiGraduationCapDuotone, PiHospitalDuotone, PiCellTowerDuotone, PiShareNetworkDuotone, PiLightningDuotone, PiStorefrontDuotone, PiShoppingCartDuotone } from "react-icons/pi";
import { FeatureCollection, Feature, Geometry } from "geojson";

interface MapProps {
  showPolaRuang: boolean;
  kecamatanLayers: string[]; // Hanya 0 atau 1 kecamatan
}

interface ZonaProperties {
  Kode_Zona?: string;
  Zona?: string;
  Keterangan?: string;
  Pola_Ruang?: string;
  Luas_Ha?: string | number;
  KECAMATAN?: string;
  TipeFasdik?: string | null;
  TipeFaskes?: string | null;
  source_layer?: string | null;
  [key: string]: unknown;
}

export default function Map({ showPolaRuang, kecamatanLayers }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);
  const fitTimerRef = useRef<number | null>(null);

  const clearFitTimer = () => {
    if (fitTimerRef.current) {
      clearTimeout(fitTimerRef.current);
      fitTimerRef.current = null;
    }
  };

  const getColorPR = (d?: string) =>
    ({
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
    }[d || ""] || "#ccc");

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

  const addPopupToFeature = (feature: Feature<Geometry, ZonaProperties>, layer: L.Layer) => {
    if (!feature.properties) return;

    if (showPolaRuang) {
      const { Kode_Zona, Zona, Keterangan, Pola_Ruang, Luas_Ha } = feature.properties;
      const popupHtml = `
        <div class="p-3 max-w-xs">
          <h3 class="text-lg font-bold text-black leading-[100%] pb-1">${Kode_Zona || "-"} - ${Zona || "-"}</h3>
          <p class="text-sm text-black opacity-[0.4] font-medium pb-0.5"><span class="font-bold opacity-100">Keterangan:</span> ${Keterangan || "-"}</p>
          <p class="text-sm text-black opacity-[0.4] font-medium p-0.5"><span class="font-bold opacity-100">Penetapan:</span> ${Pola_Ruang || "-"}</p>
          <p class="text-sm text-black opacity-[0.4] font-medium pb-0.5"><span class="font-bold opacity-100">Luas Ha:</span> ${Luas_Ha || "-"}</p>
        </div>
      `;
      layer.bindPopup(popupHtml);
    } else {
      const namaKecamatan = (feature.properties && (feature.properties.KECAMATAN || feature.properties.KECAMATAN)) || "Kecamatan";
      const popupHtml = `
        <div class="p-3 max-w-xs text-center">
          <h3 class="text-lg font-bold text-black mb-2">KEC. ${namaKecamatan}</h3>
          <a href="/peta/${String(namaKecamatan).toLowerCase()}" class="bg-orange-500 text-white px-3 py-1 rounded" style="color: #FFFFFF !important">Detail</a>
        </div>
      `;
      layer.bindPopup(popupHtml);
    }
  };

  // create icons only once
  const iconsRef = useRef<Record<string, L.DivIcon | null> | null>(null);
  if (!iconsRef.current) {
    const createDivIcon = (element: React.ReactNode, color = "#000") =>
      L.divIcon({
        className: "custom-react-icon",
        html: ReactDOMServer.renderToString(<div style={{ fontSize: "30px", color }}>{element}</div>),
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
      });

    iconsRef.current = {
      pendidikan: createDivIcon(<PiGraduationCapDuotone />, "#1976d2"),
      kesehatan: createDivIcon(<PiHospitalDuotone />, "#d32f2f"),
      bts: createDivIcon(<PiCellTowerDuotone />, "#ff9800"),
      jaringan: createDivIcon(<PiShareNetworkDuotone />, "#6a1b9a"),
      energi: createDivIcon(<PiLightningDuotone />, "#fbc02d"),
      minimarket: createDivIcon(<PiStorefrontDuotone />, "#2e7d32"),
      pasar: createDivIcon(<PiShoppingCartDuotone />, "#0288d1"),
    };
  }

  // Logic pilih icon sesuai property
  const getCustomDivIcon = (props: { source_layer: string }): L.DivIcon | null => {
    if (!props || !props.source_layer) return null;

    const layer = props.source_layer.toLowerCase();

    if (layer.includes("bts")) return iconsRef.current!.bts;
    if (layer.includes("fasilitas_kesehatan")) return iconsRef.current!.kesehatan;
    if (layer.includes("fasilitas_pendidikan")) return iconsRef.current!.pendidikan;
    if (layer.includes("jaringan_prasarana_lainya")) return iconsRef.current!.jaringan;
    if (layer.includes("prasarana_energi")) return iconsRef.current!.energi;
    if (layer.includes("minimarket")) return iconsRef.current!.minimarket;
    if (layer.includes("pasar")) return iconsRef.current!.pasar;

    return null; // fallback kalau tidak cocok
  };

  // Init Map
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      zoomAnimation: false,
      fadeAnimation: false,
      inertia: false,
    }).setView([-6.6, 106.9], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const layers = L.layerGroup().addTo(map);
    layersRef.current = layers;
    leafletMapRef.current = map;

    return () => {
      clearFitTimer();
      layers.clearLayers();
      map.remove();
      leafletMapRef.current = null;
      layersRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update Layer saat props berubah
  useEffect(() => {
    const map = leafletMapRef.current;
    const layers = layersRef.current;
    if (!map || !layers) return;

    layers.clearLayers();
    clearFitTimer();

    const safeFitBounds = (bounds: L.LatLngBounds) => {
      const m = leafletMapRef.current;
      const container = mapRef.current;
      if (!m || !(m as { _mapPane?: unknown })._mapPane) return;
      if (!container || container.offsetWidth === 0 || container.offsetHeight === 0) return;
      if (!bounds.isValid()) return;

      m.whenReady(() => {
        try {
          m.invalidateSize();
          m.fitBounds(bounds, { padding: [20, 20], animate: false });
        } catch (e) {
          console.warn("fitBounds skipped:", e);
        }
      });
    };

    const scheduleFit = (bounds: L.LatLngBounds) => {
      clearFitTimer();
      fitTimerRef.current = window.setTimeout(() => {
        safeFitBounds(bounds);
      }, 80);
    };

    const addLayerAndGetBounds = (data: FeatureCollection<Geometry, ZonaProperties>) => {
      const geoLayer: L.GeoJSON = L.geoJSON(data, {
        style: showPolaRuang
          ? stylePR
          : (feature) => {
              const type = feature?.geometry?.type;
              if (type === "Point") return {};
              if (type === "LineString" || type === "MultiLineString") {
                return { color: "#1976d2", weight: 3, opacity: 0.8 };
              }
              if (type === "Polygon" || type === "MultiPolygon") {
                return {
                  color: "#00994B",
                  weight: 2,
                  opacity: 1,
                  fillOpacity: 0.4,
                  fillColor: "#66bb6a",
                };
              }
              return { color: "#ff0000", weight: 1, opacity: 0.5 };
            },
        pointToLayer: (feature, latlng) => {
          // cek apakah perlu jadi icon React

          const props = (feature && (feature.properties as ZonaProperties)) || {};
          const divIcon = getCustomDivIcon({ source_layer: props.source_layer ?? "" });
          if (divIcon) {
            return L.marker(latlng, { icon: divIcon });
          }
          // fallback circle marker
          return L.circleMarker(latlng, {
            radius: 6,
            fillColor: "#ff5722",
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.9,
          });
        },
        onEachFeature: (feature, layer) => {
          // bila layer adalah Marker (icon), bindPopup juga perlu
          addPopupToFeature(feature as Feature<Geometry, ZonaProperties>, layer);
        },
      }).addTo(layers);

      return geoLayer.getBounds();
    };

    if (showPolaRuang) {
      fetch("/data/Pola_Ruang1.geojson")
        .then((res) => res.json())
        .then((data) => {
          const bounds = addLayerAndGetBounds(data);
          if (bounds.isValid()) scheduleFit(bounds);
        })
        .catch((err) => console.error("Error loading geojson:", err));
    } else if (kecamatanLayers.length === 1) {
      const nama = kecamatanLayers[0];
      if (nama === "CIAMPEA") {
        // Load 2 file: polygon + points (pastikan nama file tepat di /public/data/)
        Promise.all([fetch("/data/CIAMPEA_POLYGONNEW.geojson").then((res) => res.json()), fetch("/data/CIAMPEA_POINTSNEW.geojson").then((res) => res.json())])
          .then(([polygonData, pointData]) => {
            // debug logs (cek di browser console)

            const polyBounds = addLayerAndGetBounds(polygonData);
            const pointBounds = addLayerAndGetBounds(pointData);

            // gabungkan bounds (safe check)
            if (polyBounds && pointBounds && polyBounds.isValid() && pointBounds.isValid()) {
              const combined = polyBounds.extend(pointBounds);
              if (combined.isValid()) scheduleFit(combined);
            } else if (polyBounds && polyBounds.isValid()) {
              scheduleFit(polyBounds);
            } else if (pointBounds && pointBounds.isValid()) {
              scheduleFit(pointBounds);
            }
          })
          .catch((err) => console.error("Error loading CIAMPEA geojson:", err));
      } else {
        const file = `/data/${nama.toUpperCase().replace(/\s+/g, "_")}.geojson`;
        console.log("file", file);
        fetch(file)
          .then((res) => res.json())
          .then((data) => {
            const bounds = addLayerAndGetBounds(data);
            if (bounds.isValid()) scheduleFit(bounds);
          })
          .catch(() => console.warn(`File geojson untuk ${nama} tidak ditemukan.`));
      }
    }

    return () => {
      clearFitTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPolaRuang, kecamatanLayers]);

  return <div ref={mapRef} className="w-full h-screen" />;
}
