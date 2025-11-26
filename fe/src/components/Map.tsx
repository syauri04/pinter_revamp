"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import L, { PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import {
  PiGraduationCapDuotone,
  PiHospitalDuotone,
  PiCellTowerDuotone,
  PiShareNetworkDuotone,
  PiLightningDuotone,
  PiStorefrontDuotone,
  PiShoppingCartDuotone,
} from "react-icons/pi";
import { FeatureCollection, Feature, Geometry } from "geojson";

/* OPTIONAL: import marker icons used in homepage to match markers */
import {
  energiIcon,
  kesehatanIcon,
  pasarIcon,
  pendidikanIcon,
  pslIcon,
  transportIcon,
} from "@/utils/markerIcons";

interface MapProps {
  showPolaRuang: boolean;
  kecamatanLayers: string[]; // Hanya 0 atau 1 kecamatan
}

interface ZonaProperties {
  Kode_Zona?: string;
  Kode?: string;
  Zona?: string;
  Keterangan?: string;
  Pola_Ruang?: string;
  Luas_Ha?: string | number;
  KECAMATAN?: string;
  TipeFasdik?: string | null;
  TipeFaskes?: string | null;
  source_layer?: string | null;
  NAMOBJ?: string;
  REMARK?: string;
  LABEL?: string;
  JENIS?: string;
  [key: string]: unknown;
}

export default function Map({ showPolaRuang, kecamatanLayers }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);
  const fitTimerRef = useRef<number | null>(null);

  // ---- states for filters (mirror MapView control behavior) ----
  const [activeLayer, setActiveLayer] = useState<
    "pola" | "ksd" | "krb" | "tnk"
  >("pola");

  const [showPasar, setShowPasar] = useState(false);
  const [showPendidikan, setShowPendidikan] = useState(false);
  const [showKesehatan, setShowKesehatan] = useState(false);
  const [showTransportasi, setShowTransportasi] = useState(false);
  const [showEnergi, setShowEnergi] = useState(false);
  const [showPsl, setShowPsl] = useState(false);

  const clearFitTimer = () => {
    if (fitTimerRef.current) {
      clearTimeout(fitTimerRef.current);
      fitTimerRef.current = null;
    }
  };

  // 🎨 Warna Pola Ruang (sama persis dengan MapView.tsx)
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

  const stylePR = (
    feature?: Feature<Geometry, ZonaProperties>
  ): PathOptions => {
    // try both 'Kode_Zona' (Map) and 'Kode' (MapView)
    const kode =
      (feature &&
        (feature.properties?.Kode_Zona || feature.properties?.Kode)) ||
      "";
    return {
      fillColor: getColor(feature?.properties ?? {}, activeLayer),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "2",
      fillOpacity: 0.7,
    };
  };

  const addPopupToFeature = (
    feature: Feature<Geometry, ZonaProperties>,
    layer: L.Layer
  ) => {
    if (!feature.properties) return;

    // fallback: kecamatan-like popup (if used)

    const namaKecamatan =
      (feature.properties &&
        (feature.properties.KECAMATAN || feature.properties.KECAMATAN)) ||
      "Kecamatan";
    const popupHtml = `
      <div class="p-3 max-w-xs text-center">
        <h3 class="text-lg font-bold text-black mb-2">KEC. ${namaKecamatan}</h3>
        <a href="/peta/${String(
          namaKecamatan
        ).toLowerCase()}" class="bg-orange-500 text-white px-3 py-1 rounded" style="color: #FFFFFF !important">Detail</a>
      </div>
    `;
    layer.bindPopup(popupHtml);
    return;
  };

  // create icons only once (React icons -> DivIcon)
  const iconsRef = useRef<Record<string, L.DivIcon | null> | null>(null);
  if (!iconsRef.current) {
    const createDivIcon = (element: React.ReactNode, color = "#000") =>
      L.divIcon({
        className: "custom-react-icon",
        html: ReactDOMServer.renderToString(
          <div style={{ fontSize: "30px", color }}>{element}</div>
        ),
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

  // Logic pilih icon sesuai property (fallback)
  const getCustomDivIcon = (props: {
    source_layer: string;
  }): L.DivIcon | null => {
    if (!props || !props.source_layer) return null;

    const layer = props.source_layer.toLowerCase();

    if (layer.includes("bts")) return iconsRef.current!.bts;
    if (layer.includes("fasilitas_kesehatan"))
      return iconsRef.current!.kesehatan;
    if (layer.includes("fasilitas_pendidikan"))
      return iconsRef.current!.pendidikan;
    if (layer.includes("jaringan_prasarana_lainya"))
      return iconsRef.current!.jaringan;
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

  // --- create UI Controls (filter + point) on the right top (same markup + behavior) ---
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    let filterControl: L.Control | null = null;
    let pointControl: L.Control | null = null;

    // ❗ Jika showPolaRuang = false → hapus control & stop
    if (!showPolaRuang) {
      return;
    }

    /* ---------------------- FILTER CONTROL ---------------------- */

    const filterDiv = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control map-filter-control"
    );

    filterDiv.style.background = "white";
    filterDiv.style.padding = "6px";
    filterDiv.style.borderRadius = "4px";
    filterDiv.style.display = "flex";
    filterDiv.style.flexDirection = "column";
    filterDiv.style.gap = "6px";
    filterDiv.style.minWidth = "160px";

    const renderFilterHtml = () => {
      filterDiv.innerHTML = `
      <button data-layer="pola" class="filter-btn ${
        activeLayer === "pola" ? "active" : ""
      }">Pola Ruang</button>
      <button data-layer="ksd" class="filter-btn ${
        activeLayer === "ksd" ? "active" : ""
      }">Kawasan Daerah Strategis</button>
      <button data-layer="krb" class="filter-btn ${
        activeLayer === "krb" ? "active" : ""
      }">Kawasan Rawan Bencana</button>
      <button data-layer="tnk" class="filter-btn ${
        activeLayer === "tnk" ? "active" : ""
      }">Tanah Kosong</button>
    `;
    };

    renderFilterHtml();

    const onFilterClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const layer = target.dataset.layer as
        | "pola"
        | "ksd"
        | "krb"
        | "tnk"
        | undefined;

      if (layer) setActiveLayer(layer);
    };

    filterDiv.addEventListener("click", onFilterClick);

    filterControl = new L.Control({ position: "topright" });
    filterControl.onAdd = () => filterDiv;
    filterControl.addTo(map);

    /* ---------------------- POINT CONTROL ---------------------- */

    const pointDiv = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control map-point-control"
    );

    pointDiv.style.background = "white";
    pointDiv.style.padding = "10px";
    pointDiv.style.borderRadius = "4px";
    pointDiv.style.lineHeight = "18px";
    pointDiv.style.fontSize = "12px";
    pointDiv.style.minWidth = "165px";

    const renderPointHtml = () => {
      pointDiv.innerHTML = `
      <label><input type="checkbox" data-layer="pasar" ${
        showPasar ? "checked" : ""
      }/> Pasar</label><br/>
      <label><input type="checkbox" data-layer="pendidikan" ${
        showPendidikan ? "checked" : ""
      }/> Pendidikan</label><br/>
      <label><input type="checkbox" data-layer="kesehatan" ${
        showKesehatan ? "checked" : ""
      }/> Kesehatan</label><br/>
      <label><input type="checkbox" data-layer="transportasi" ${
        showTransportasi ? "checked" : ""
      }/> Transportasi</label><br/>
      <label><input type="checkbox" data-layer="energi" ${
        showEnergi ? "checked" : ""
      }/> Energi</label><br/>
      <label><input type="checkbox" data-layer="lainnya" ${
        showPsl ? "checked" : ""
      }/> Lainnya</label>
    `;
    };

    renderPointHtml();

    const onPointChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const layer = target.dataset.layer;

      if (layer === "pasar") setShowPasar(target.checked);
      if (layer === "pendidikan") setShowPendidikan(target.checked);
      if (layer === "kesehatan") setShowKesehatan(target.checked);
      if (layer === "transportasi") setShowTransportasi(target.checked);
      if (layer === "energi") setShowEnergi(target.checked);
      if (layer === "lainnya") setShowPsl(target.checked);
    };

    pointDiv.addEventListener("change", onPointChange);

    pointControl = new L.Control({ position: "topright" });
    pointControl.onAdd = () => pointDiv;
    pointControl.addTo(map);

    /* ---------------- CLEANUP ---------------- */

    return () => {
      try {
        filterDiv.removeEventListener("click", onFilterClick);
        pointDiv.removeEventListener("change", onPointChange);
        if (filterControl) map.removeControl(filterControl);
        if (pointControl) map.removeControl(pointControl);
      } catch {}
    };
  }, [
    leafletMapRef.current,
    showPolaRuang,
    activeLayer,
    showPasar,
    showPendidikan,
    showKesehatan,
    showTransportasi,
    showEnergi,
    showPsl,
  ]);

  // Update Layer saat props / filter berubah
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
      if (
        !container ||
        container.offsetWidth === 0 ||
        container.offsetHeight === 0
      )
        return;
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

    const addLayerAndGetBounds = (
      data: FeatureCollection<Geometry, ZonaProperties>,
      opts?: {
        style?: (
          feature: Feature<Geometry, ZonaProperties>
        ) => PathOptions | undefined;
        pointToLayer?: (
          feature: Feature<Geometry, ZonaProperties>,
          latlng: L.LatLngExpression
        ) => L.Layer;
        onEach?: (
          feature: Feature<Geometry, ZonaProperties>,
          layer: L.Layer
        ) => void;
      }
    ) => {
      const geoLayer = L.geoJSON<ZonaProperties>(data, {
        style: opts?.style as L.StyleFunction<ZonaProperties>,
        pointToLayer: opts?.pointToLayer,
        onEachFeature: (feature, layer) => {
          try {
            if (opts?.onEach) {
              opts.onEach(feature, layer);
            } else {
              addPopupToFeature(feature, layer);
            }
          } catch {
            // ignore
          }
        },
      }).addTo(layers);

      return geoLayer.getBounds();
    };

    // file mapping like MapView
    const fileMap: Record<string, string> = {
      pola: "/data/Pola_Ruang_2.geojson",
      ksd: "/data/KSD.geojson",
      krb: "/data/KRB.geojson",
      tnk: "/data/Tanah_Kosong.geojson",
    };

    // 1) If showPolaRuang (prop) true => load pola/ksd/krb/tnk accordingly
    if (showPolaRuang) {
      const file = fileMap[activeLayer] || fileMap["pola"];
      fetch(file)
        .then((res) => res.json())
        .then((data: FeatureCollection<Geometry, ZonaProperties>) => {
          // ensure properties keys compatibility between MapView and Map
          // no further filtering here - MapView changed file name but behavior matches
          const bounds = addLayerAndGetBounds(data, {
            style: stylePR,
            onEach: (feature, layer) => {
              // bind popup similar to MapView
              // respect MapView popup content
              let title = "";
              let desc = "";

              if (activeLayer === "pola") {
                title =
                  feature.properties?.Kode ||
                  feature.properties?.Kode_Zona ||
                  "-";
                desc =
                  feature.properties?.NAMOBJ || feature.properties?.Zona || "-";
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
            },
          });

          if (bounds.isValid()) scheduleFit(bounds);
        })
        .catch((err) => console.error("Error loading pola geojson:", err));

      // 2) Points: mirror MapView files & icons
      // helper to load point file and render with icons/popups

      const addAutoPopup = (
        feature: Feature<Geometry, ZonaProperties>,
        layer: L.Layer
      ) => {
        if (!feature.properties) return;

        const props = feature.properties;

        let html = "<div style='line-height:1.4'>";
        for (const key in props) {
          const value = props[key];
          if (value !== null && value !== undefined && value !== "") {
            html += `<strong>${key}</strong>: ${value}<br>`;
          }
        }
        html += "</div>";

        layer.bindPopup(html);
      };

      const addPointFile = (
        file: string,
        pointToLayer: (
          feature: Feature<Geometry, ZonaProperties>,
          latlng: L.LatLngExpression
        ) => L.Layer,
        onEachFeature?: (
          feature: Feature<Geometry, ZonaProperties>,
          layer: L.Layer
        ) => void
      ) => {
        fetch(file)
          .then((res) => res.json())
          .then((data) => {
            addLayerAndGetBounds(data, {
              pointToLayer,
              onEach: (feature, layer) => {
                if (onEachFeature) return onEachFeature(feature, layer);
                addAutoPopup(feature, layer); // popup dinamis otomatis
              },
            });
          })
          .catch(() => {});
      };

      // Pasar
      if (showPasar) {
        addPointFile("/data/Pasar.geojson", (_feature, latlng) =>
          L.marker(latlng, { icon: pasarIcon })
        );
      }

      // Pendidikan
      if (showPendidikan) {
        addPointFile("/data/Fas_Pendidikan.geojson", (_feature, latlng) =>
          L.marker(latlng, { icon: pendidikanIcon })
        );
      }

      // Kesehatan
      if (showKesehatan) {
        addPointFile("/data/Fas_Kesehatan.geojson", (_feature, latlng) =>
          L.marker(latlng, { icon: kesehatanIcon })
        );
      }

      // Transportasi
      if (showTransportasi) {
        addPointFile(
          "/data/Prasarana_Transportasi.geojson",
          (_feature, latlng) => L.marker(latlng, { icon: transportIcon })
        );
      }

      // Energi
      if (showEnergi) {
        addPointFile("/data/Prasarana_Energi.geojson", (_feature, latlng) =>
          L.marker(latlng, { icon: energiIcon })
        );
      }

      // Lainnya (Prasarana_Lainnya)
      if (showPsl) {
        addPointFile("/data/Prasarana_Lainnya.geojson", (_feature, latlng) =>
          L.marker(latlng, { icon: pslIcon })
        );
      }
    }

    // 3) kecamatanLayers original logic (unchanged)
    if (!showPolaRuang && kecamatanLayers.length === 1) {
      const nama = kecamatanLayers[0];
      if (nama === "CIAMPEA") {
        Promise.all([
          fetch("/data/CIAMPEA_POLYGONNEW.geojson").then((res) => res.json()),
          fetch("/data/CIAMPEA_POINTSNEW.geojson").then((res) => res.json()),
        ])
          .then(([polygonData, pointData]) => {
            let polyBounds: L.LatLngBounds | null = null;
            let pointBounds: L.LatLngBounds | null = null;

            // ===========================
            // 1. POLYGON — popup kecamatan
            // ===========================
            const polygonLayer = L.geoJSON(polygonData, {
              onEachFeature: (feature, layer) => {
                const namaKecamatan =
                  feature.properties?.KECAMATAN ||
                  feature.properties?.Kecamatan ||
                  "CIAMPEA";

                const popupHtml = `
                  <div class="p-3 max-w-xs text-center">
                    <h3 class="text-lg font-bold text-black mb-2">KEC. ${namaKecamatan}</h3>
                    <a href="/peta/${String(namaKecamatan).toLowerCase()}"
                      class="bg-orange-500 text-white px-3 py-1 rounded" style="color: #FFFFFF !important">
                      Detail
                    </a>
                  </div>
                `;
                layer.bindPopup(popupHtml);
              },
            }).addTo(layers);

            polyBounds = polygonLayer.getBounds();

            // ===========================
            // 2. POINTS — popup fasilitas
            // ===========================
            const pointLayer = L.geoJSON(pointData, {
              pointToLayer: (feature, latlng) => {
                // Ambil ikon dari feature properti
                const customIcon = getCustomDivIcon({
                  source_layer: feature.properties?.source_layer,
                });
                // fallback ke ikon default jika getCustomDivIcon mengembalikan null
                return L.marker(latlng, { icon: customIcon || pslIcon });
              },
              onEachFeature: (feature, layer) => {
                if (!feature.properties) return;

                // Ambil semua key/value dari properties
                const entries = Object.entries(feature.properties);

                // Buat HTML secara dinamis
                let popupHtml = `<div class="p-3 max-w-xs">`;
                entries.forEach(([key, value]) => {
                  if (value !== null && value !== undefined && value !== "") {
                    // Bisa ganti format key jadi lebih readable
                    const label = key.replace(/_/g, " ");
                    popupHtml += `<p class="text-sm"><strong>${label}:</strong> ${value}</p>`;
                  }
                });
                popupHtml += `</div>`;

                layer.bindPopup(popupHtml);
              },
            }).addTo(layers);

            pointBounds = pointLayer.getBounds();

            // ===========================
            // FIT BOTH
            // ===========================
            if (polyBounds?.isValid() && pointBounds?.isValid()) {
              const combined = polyBounds.extend(pointBounds);
              scheduleFit(combined);
            } else if (polyBounds?.isValid()) {
              scheduleFit(polyBounds);
            } else if (pointBounds?.isValid()) {
              scheduleFit(pointBounds);
            }
          })
          .catch((err) => console.error("Error loading CIAMPEA geojson:", err));
      } else {
        const file = `/data/${nama.toUpperCase().replace(/\s+/g, "-")}.geojson`;
        fetch(file)
          .then((res) => res.json())
          .then((data) => {
            const bounds = addLayerAndGetBounds(data);
            if (bounds.isValid()) scheduleFit(bounds);
          })
          .catch(() =>
            console.warn(`File geojson untuk ${nama} tidak ditemukan.`)
          );
      }
    }

    return () => {
      clearFitTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showPolaRuang,
    activeLayer,
    showPasar,
    showPendidikan,
    showKesehatan,
    showTransportasi,
    showEnergi,
    showPsl,
    kecamatanLayers,
  ]);

  return <div ref={mapRef} className="w-full h-screen" />;
}
