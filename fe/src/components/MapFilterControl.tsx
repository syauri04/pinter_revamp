"use client";

import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L, { Control } from "leaflet";

type LayerType = "pola" | "ksd" | "krb" | "tnk";

interface MapFilterControlProps {
  activeLayer: LayerType;
  setActiveLayer: (layer: LayerType) => void;
}

export default function MapFilterControl({
  activeLayer,
  setActiveLayer,
}: MapFilterControlProps) {
  const map = useMap();

  useEffect(() => {
    // Container control
    const filterDiv = L.DomUtil.create("div", "leaflet-bar leaflet-control");

    // Styling
    filterDiv.style.background = "white";
    filterDiv.style.padding = "6px";
    filterDiv.style.borderRadius = "4px";
    filterDiv.style.display = "flex";
    filterDiv.style.flexDirection = "column";
    filterDiv.style.gap = "6px";

    // HTML Button Markup
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

    // Typed click handler
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const layer = target.dataset.layer as LayerType | undefined;
      if (layer) {
        setActiveLayer(layer);
      }
    };

    filterDiv.addEventListener("click", onClick);

    // Create Leaflet Control
    const control = new Control({ position: "topright" });
    control.onAdd = () => filterDiv;
    control.addTo(map);

    return () => {
      filterDiv.removeEventListener("click", onClick);
      map.removeControl(control);
    };
  }, [map, activeLayer, setActiveLayer]);

  return null;
}
