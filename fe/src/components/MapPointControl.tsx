"use client";

import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L, { Control } from "leaflet";

interface Props {
  showPasar: boolean;
  setShowPasar: (value: boolean) => void;

  showPendidikan: boolean;
  setShowPendidikan: (value: boolean) => void;

  showKesehatan: boolean;
  setShowKesehatan: (value: boolean) => void;

  showTransportasi: boolean;
  setShowTransportasi: (value: boolean) => void;

  showEnergi: boolean;
  setShowEnergi: (value: boolean) => void;

  showPsl: boolean;
  setShowPsl: (value: boolean) => void;
}

export default function MapPointControl({
  showPasar,
  setShowPasar,
  showPendidikan,
  setShowPendidikan,
  showKesehatan,
  setShowKesehatan,
  showTransportasi,
  setShowTransportasi,
  showEnergi,
  setShowEnergi,
  showPsl,
  setShowPsl,
}: Props) {
  const map = useMap();

  useEffect(() => {
    const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");

    div.style.background = "white";
    div.style.padding = "10px";
    div.style.borderRadius = "4px";
    div.style.lineHeight = "18px";
    div.style.fontSize = "12px";
    div.style.minWidth = "165px";

    div.innerHTML = `
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
      }/> Prasarana Transportasi</label><br/>
      <label><input type="checkbox" data-layer="energi" ${
        showEnergi ? "checked" : ""
      }/> Prasarana Energi</label><br/>
      <label><input type="checkbox" data-layer="lainnya" ${
        showPsl ? "checked" : ""
      }/> Prasarana Lainnya</label>
    `;

    const onClick = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.dataset.layer) return;

      const layer = target.dataset.layer;

      if (layer === "pasar") setShowPasar(target.checked);
      if (layer === "pendidikan") setShowPendidikan(target.checked);
      if (layer === "kesehatan") setShowKesehatan(target.checked);
      if (layer === "transportasi") setShowTransportasi(target.checked);
      if (layer === "energi") setShowEnergi(target.checked);
      if (layer === "lainnya") setShowPsl(target.checked);
    };

    div.addEventListener("change", onClick);

    const control = new Control({ position: "topright" });
    control.onAdd = () => div;
    control.addTo(map);

    return () => {
      div.removeEventListener("change", onClick);
      map.removeControl(control);
    };
  }, [
    map,
    showPasar,
    showPendidikan,
    showKesehatan,
    showTransportasi,
    showEnergi,
    showPsl,
  ]);

  return null;
}
