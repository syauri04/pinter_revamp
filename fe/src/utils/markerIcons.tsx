import L from "leaflet";
import { renderToString } from "react-dom/server";
import {
  PiStorefrontDuotone,
  PiGraduationCapDuotone,
  PiHospitalDuotone,
  PiSubwayDuotone,
  PiBatteryPlusDuotone,
  PiBezierCurveDuotone,
} from "react-icons/pi";

export const pasarIcon = L.divIcon({
  html: renderToString(<PiStorefrontDuotone size={22} color="#D84315" />),
  className: "custom-marker-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export const pendidikanIcon = L.divIcon({
  html: renderToString(<PiGraduationCapDuotone size={22} color="#0277BD" />),
  className: "custom-marker-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export const kesehatanIcon = L.divIcon({
  html: renderToString(<PiHospitalDuotone size={22} color="#69a50fff" />),
  className: "custom-marker-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export const transportIcon = L.divIcon({
  html: renderToString(<PiSubwayDuotone size={22} color="#E64CFF" />),
  className: "custom-marker-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export const energiIcon = L.divIcon({
  html: renderToString(<PiBatteryPlusDuotone size={22} color="#FF7A1A" />),
  className: "custom-marker-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export const pslIcon = L.divIcon({
  html: renderToString(<PiBezierCurveDuotone size={22} color="#2c2ce2ff" />),
  className: "custom-marker-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});
