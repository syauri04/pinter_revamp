"use client";

import { PiBookOpenTextBold, PiBuildingsBold, PiTreeBold, PiShoppingCartBold, PiSunHorizonBold, PiPlantBold } from "react-icons/pi";
import { ReactNode } from "react";

type CardItem = {
  id: number;
  title: string;
  icon: ReactNode;
  content: string[] | string;
};

const cardData: CardItem[] = [
  {
    id: 1,
    title: "Pendidikan",
    icon: <PiBookOpenTextBold className="text-orange-500 text-2xl" />,
    content: [
      "Pendidikan anak usia dini dan taman kanak-kanak.",
      "Pendidikan terpadu dari jenjang TK, SD, SLTP dan SLTA.",
      "Pendidikan non formal (khusus keahlian dan keterampilan) termasuk PAUD (bertemakan Khusus seperti alam).",
      "Pendidikan sekolah menengah kejuruan untuk mencetak tenaga terampil dibidang teknik pertanian dan budidaya pertanian.",
    ],
  },
  {
    id: 2,
    title: "Pekerjaan Umum",
    icon: <PiBuildingsBold className="text-orange-500 text-2xl" />,
    content: [
      "Pembangunan infrastruktur kompleks di destinasi wisata sekitar sumber daya air seperti danau, situ, curug, dan jenis objek pariwisata lainnya.",
      "Pengelolaan dan pendistribusian air bersih untuk rumah tangga dan bisnis di daerah-daerah di luar pusat kegiatan ekonomi kabupaten.",
      "Pengelolaan sampah rumah tangga dan limbah cair.",
    ],
  },
  {
    id: 3,
    title: "Kehutanan",
    icon: <PiTreeBold className="text-orange-500 text-2xl" />,
    content: ["Komoditi non kayu yaitu burung sriti dan madu hutan.", "Komoditi kayu yaitu mahoni, jabon, albazia dan afrika."],
  },
  {
    id: 4,
    title: "Perdagangan",
    icon: <PiShoppingCartBold className="text-orange-500 text-2xl" />,
    content: "Penataan dan peningkatan pasar daerah dan pasar desa, serta kawasan perdagangan lainnya.",
  },
  {
    id: 5,
    title: "Pariwisata",
    icon: <PiSunHorizonBold className="text-orange-500 text-2xl" />,
    content: "Pengembangan destinasi wisata kreatif.",
  },
  {
    id: 6,
    title: "Pertanian",
    icon: <PiPlantBold className="text-orange-500 text-2xl" />,
    content: ["Tanaman pangan dengan komoditi ubi kayu.", "Sayur-sayuran dengan komoditi cabai rawit dan cabai besar.", "Tanaman obat-obatan (Biofarmaka) dengan jenis tanaman lengkuas/laos, jahe, kunyit, kencur, dan kapulaga."],
  },
];

export default function CardGridKec() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 space-y-8">
        {cardData.map((card) => (
          <div key={card.id} className="bg-white rounded-[20px] shadow-lg p-6 flex flex-col">
            {/* Header: Icon + Title */}
            <div className="flex items-center gap-4 mb-8">
              {card.icon}
              <h3 className="font-bold text-xl leading-[100%] text-black">{card.title}</h3>
            </div>

            {/* Content: bisa list atau paragraf */}
            {Array.isArray(card.content) ? (
              <ul className="list-disc pl-5 space-y-2 text-black opacity-[0.4] text-base leading-[120%]">
                {card.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-black opacity-[0.4] text-base leading-[120%]">{card.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
