import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiIslandDuotone, PiTreeDuotone, PiCraneTowerDuotone, PiGraduationCapDuotone, PiStorefrontDuotone, PiFarmDuotone } from "react-icons/pi";
import React from "react";

interface PotensiRingkasan {
  id: number;
  ringkasan: string;
}

interface PotensiInvestasi {
  id: number;
  title: string;
  icon: string;
}

interface PotensiKecamatan {
  id: number;
  potensi_investasi: PotensiInvestasi;
  potensiRingkasan: PotensiRingkasan[];
}

interface AccordionProps {
  deskripsi: string | null;
  potensiKecamatan: PotensiKecamatan[];
}

// map string dari API → komponen icon
const iconMap: Record<string, React.ReactNode> = {
  PiTreeDuotone: <PiTreeDuotone className="text-orange-500 text-xl" />,
  PiCraneTowerDuotone: <PiCraneTowerDuotone className="text-orange-500 text-xl" />,
  PiGraduationCapDuotone: <PiGraduationCapDuotone className="text-orange-500 text-xl" />,
  PiStorefrontDuotone: <PiStorefrontDuotone className="text-orange-500 text-xl" />,
  PiFarmDuotone: <PiFarmDuotone className="text-orange-500 text-xl" />,
  PiIslandDuotone: <PiIslandDuotone className="text-orange-500 text-xl" />,
};

export default function Accordion({ deskripsi, potensiKecamatan }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {/* Deskripsi */}
      <div className="bg-white/80 shadow-md rounded-[10px]">
        <button onClick={() => setOpen(open === "deskripsi" ? null : "deskripsi")} className="w-full flex justify-between items-center px-4 py-4 text-base font-bold text-black">
          Deskripsi
          <span>{open === "deskripsi" ? "-" : "+"}</span>
        </button>
        <AnimatePresence initial={false}>
          {open === "deskripsi" && (
            <motion.div
              key="deskripsi"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-3 text-sm text-gray-700 overflow-hidden"
            >
              {deskripsi || "-"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Potensi Investasi */}
      <div className="bg-white/80 shadow-md rounded-[10px]">
        <button onClick={() => setOpen(open === "potensi" ? null : "potensi")} className="w-full flex justify-between items-center px-4 py-4 text-base font-bold text-black">
          Potensi Investasi
          <span>{open === "potensi" ? "-" : "+"}</span>
        </button>
        <AnimatePresence initial={false}>
          {open === "potensi" && (
            <motion.div
              key="potensi"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="divide-y px-4 pb-3 max-h-[500px] overflow-y-auto custom-scroll"
            >
              {potensiKecamatan.map((item) => (
                <div key={item.id} className="py-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {iconMap[item.potensi_investasi.icon] || <span className="w-5 h-5 bg-gray-300 rounded" />}
                      <h4 className="text-sm font-bold text-black">{item.potensi_investasi.title}</h4>
                    </div>
                    {/* <a href="#" className="text-green-600 text-sm font-medium hover:underline">
                      Lihat Lokasi
                    </a> */}
                  </div>
                  <ul className="list-disc list-outside pl-6 mt-4 text-black opacity-70 text-sm space-y-1">
                    {item.potensiRingkasan.map((r) => (
                      <li key={r.id}>{r.ringkasan}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
