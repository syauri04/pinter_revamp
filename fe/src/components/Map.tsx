"use client";

import { useEffect, useRef } from "react";
import L, { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
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
      const namaKecamatan = feature.properties.KECAMATAN || "Kecamatan";
      const popupHtml = `
        <div class="p-3 max-w-xs text-center">
          <h3 class="text-lg font-bold text-black mb-2">KEC. ${namaKecamatan}</h3>
          <a href="/peta/${namaKecamatan.toLowerCase()}" class="bg-orange-500 text-white px-3 py-1 rounded" style="color: #FFFFFF !important">Detail</a>
        </div>
      `;
      layer.bindPopup(popupHtml);
    }
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

    const addLayerAndFit = (data: FeatureCollection<Geometry, ZonaProperties>) => {
      const geoLayer: L.GeoJSON = L.geoJSON(data, {
        style: showPolaRuang ? stylePR : { color: "#00994B", weight: 2, fillOpacity: 0.4 },
        onEachFeature: addPopupToFeature,
      }).addTo(layers);

      const bounds = geoLayer.getBounds();
      if (bounds.isValid()) scheduleFit(bounds);
    };

    if (showPolaRuang) {
      fetch("/data/Pola_Ruang1.geojson")
        .then((res) => res.json())
        .then(addLayerAndFit)
        .catch((err) => console.error("Error loading geojson:", err));
    } else if (kecamatanLayers.length === 1) {
      const nama = kecamatanLayers[0];
      const file = `/data/${nama.toLowerCase().replace(/\s+/g, "_")}.geojson`;
      fetch(file)
        .then((res) => res.json())
        .then(addLayerAndFit)
        .catch(() => console.warn(`File geojson untuk ${nama} tidak ditemukan.`));
    }

    return () => {
      clearFitTimer();
    };
  }, [showPolaRuang, kecamatanLayers]);

  return <div ref={mapRef} className="w-full h-screen" />;
}
