"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaStore, FaTools, FaUmbrellaBeach } from "react-icons/fa";
import { PiSidebarSimple, PiSidebarSimpleDuotone } from "react-icons/pi";
import Link from "next/link";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const kecamatanList = ["Cibinong", "Cisarua", "Bojong Gede", "Sukamakmur"];

export default function PetaPage() {
  // state utama
  const [showKecamatan, setShowKecamatan] = useState(false);
  const [showPolaRuang, setShowPolaRuang] = useState(true); // default ON

  // state single active kecamatan
  const [activeKecamatan, setActiveKecamatan] = useState<string | null>(null);

  const handleKecamatanSelect = (nama: string) => {
    // kalau klik yang sama → toggle off, kalau beda → ganti
    setActiveKecamatan((prev) => (prev === nama ? null : nama));
    if (window.innerWidth < 640) {
      setShowLeftSidebar(false);
    }
  };

  // eksklusif toggle master Kecamatan
  const handleToggleKecamatan = () => {
    setShowKecamatan(!showKecamatan);
    if (!showKecamatan) {
      // ketika Kecamatan ON → matikan Pola Ruang
      setShowPolaRuang(false);
    } else {
      // ketika Kecamatan OFF → reset aktif
      setActiveKecamatan(null);
    }
  };

  // eksklusif toggle Pola Ruang
  const handleTogglePolaRuang = () => {
    setShowPolaRuang(!showPolaRuang);
    if (!showPolaRuang) {
      // ketika Pola Ruang ON → matikan Kecamatan
      setShowKecamatan(false);
      setActiveKecamatan(null);
    }
    if (window.innerWidth < 640) {
      setShowLeftSidebar(false);
    }
  };

  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [cekleftSidebarWidth, setLeftSidebarWidth] = useState(350);
  const [toggleLeftSidebar, settoggleLeftSidebar] = useState(360);
  const leftSidebarWidth = cekleftSidebarWidth;
  useEffect(() => {
    // cek lebar layar saat pertama load
    if (window.innerWidth <= 400) {
      setLeftSidebarWidth(290);
      settoggleLeftSidebar(300);
    }

    if (window.innerWidth <= 768) {
      setShowLeftSidebar(false);
    }

    // tambahkan listener resize
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowLeftSidebar(false);
      } else {
        setShowLeftSidebar(true); // optional: show lagi jika >768px
      }

      if (window.innerWidth <= 400) {
        setLeftSidebarWidth(290);
        settoggleLeftSidebar(300);
      } else {
        setLeftSidebarWidth(350);
        settoggleLeftSidebar(360);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed w-screen h-screen overflow-hidden flex">
      <AnimatePresence>
        {showLeftSidebar && (
          <motion.div
            initial={{ x: -350, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -350, opacity: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="absolute top-0 left-0 h-screen w-[290px] xs:w-[350px] bg-white shadow-lg px-4 pt-10 pb-24 z-30 flex flex-col justify-between"
          >
            {/* Bagian Atas */}
            <div>
              <h2 className="text-xl font-bold leading-[120%] text-black mb-4">Kecamatan Sukamakmur</h2>
              <p className="text-base text-black opacity-[0.4] leading-[120%] mb-4">Kecamatan Sukamakmur memiliki luas 16.982,65 Ha, memiliki 10 desa/kelurahan dengan ibukecamatan di desa Sukamakmur...</p>
            </div>

            {/* Bagian Bawah */}
            <div className="space-y-4 mb-6">
              <h2 className="text-base font-bold leading-[100%] text-black mb-6">Peta Wilayah Perancangan</h2>

              {/* Toggle Kecamatan */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium leading-[100%] text-black">Kecamatan</span>
                  <button onClick={handleToggleKecamatan} className={`w-10 h-5 cursor-pointer flex items-center rounded-full p-1 transition-colors duration-300 ${showKecamatan ? "bg-[#00994B]" : "bg-gray-300"}`}>
                    <div className={`bg-white cursor-pointer w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${showKecamatan ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>

                {/* List Kecamatan Expandable */}
                <AnimatePresence>
                  {showKecamatan && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="pl-4 mt-2 space-y-2 overflow-hidden">
                      {kecamatanList.map((nama) => (
                        <div key={nama} className="flex items-center justify-between">
                          <span className="text-sm text-black">{nama}</span>
                          <button
                            onClick={() => handleKecamatanSelect(nama)}
                            className={`cursor-pointer w-8 h-4 flex items-center rounded-full p-1 transition-colors duration-300 ${activeKecamatan === nama ? "bg-[#00994B]" : "bg-gray-300"}`}
                          >
                            <div className={`bg-white cursor-pointer w-2.5 h-2.5 rounded-full shadow-md transform transition-transform duration-300 ${activeKecamatan === nama ? "translate-x-4" : "translate-x-0"}`} />
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Toggle Pola Ruang */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium leading-[100%] text-black">Pola Ruang</span>
                <button onClick={handleTogglePolaRuang} className={`w-10 h-5 cursor-pointer flex items-center rounded-full p-1 transition-colors duration-300 ${showPolaRuang ? "bg-[#FE9100]" : "bg-gray-300"}`}>
                  <div className={`bg-white cursor-pointer w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${showPolaRuang ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              <div>
                <Link href="/peta/sukamakmur" className="cursor-pointer">
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg cursor-pointer">Lihat Detail</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setShowLeftSidebar(!showLeftSidebar)}
        initial={false}
        animate={{ left: showLeftSidebar ? toggleLeftSidebar : 10 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className="absolute top-20 z-30 bg-white p-2 rounded-[10px] shadow-md"
      >
        {showLeftSidebar ? <PiSidebarSimple className="text-black opacity-[0.4] text-2xl" /> : <PiSidebarSimpleDuotone className="text-black opacity-[0.4] text-2xl" />}
      </motion.button>

      {/* Map */}
      <div className="flex-1 h-full relative z-0" style={{ marginLeft: showLeftSidebar ? leftSidebarWidth : 0 }}>
        <Map showPolaRuang={showPolaRuang} kecamatanLayers={activeKecamatan ? [activeKecamatan] : []} />
      </div>

      {/* Sidebar Kanan Floating */}
      {showRightSidebar && (
        <div className="absolute right-0 bottom-20 sm:top-0 w-full sm:w-[320px] h-auto bg-transparent p-2 sm:p-4 z-20">
          <Accordion />
        </div>
      )}
    </div>
  );
}

function Accordion() {
  const [open, setOpen] = useState<string | null>(null);

  const deskripsiText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`;

  const potensiItems = [
    {
      key: "pendidikan",
      title: "Pendidikan",
      icon: <FaBook className="text-orange-500 text-xl" />,
      content: [
        "Pendidikan anak usia dini dan taman kanak-kanak",
        "Pendidikan terpadu dari jenjang TK, SD, SLTP dan SLTA",
        "Pendidikan non formal (kursus keahlian dan keterampilan) termasuk PAUD",
        "Pendidikan sekolah menengah kejuruan untuk mencetak tenaga terampil",
      ],
    },
    {
      key: "perdagangan",
      title: "Perdagangan",
      icon: <FaStore className="text-orange-500 text-xl" />,
      content: ["Penataan dan peningkatan pasar daerah dan pasar desa, serta kawasan perdagangan lainnya"],
    },
    {
      key: "pekerjaan",
      title: "Pekerjaan Umum",
      icon: <FaTools className="text-orange-500 text-xl" />,
      content: ["Pembangunan infrastruktur kompleks di destinasi wisata", "Distribusi air bersih untuk rumah tangga dan bisnis", "Pengelolaan sampah rumah tangga dan limbah cair"],
    },
    {
      key: "pariwisata",
      title: "Pariwisata",
      icon: <FaUmbrellaBeach className="text-orange-500 text-xl" />,
      content: ["Pengembangan destinasi wisata kreatif"],
    },
  ];

  return (
    <div className="space-y-3">
      {/* Deskripsi */}
      <div className="bg-white/80 shadow-md shadow-black/5 backdrop-blur-[12px] rounded-[10px]">
        <button onClick={() => setOpen(open === "deskripsi" ? null : "deskripsi")} className="w-full flex justify-between items-center px-4 py-4 text-base font-bold text-black leading-[100%]">
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
              {deskripsiText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Potensi Investasi */}
      <div className="bg-white/80 shadow-md shadow-black/5 backdrop-blur-[12px] rounded-[10px] ">
        <button onClick={() => setOpen(open === "potensi" ? null : "potensi")} className="w-full flex justify-between items-center px-4 py-4 text-base font-bold text-black leading-[100%]">
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
              {potensiItems.map((item) => (
                <div key={item.key} className="py-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <h4 className="text-sm font-bold text-black leading-[100%]">{item.title}</h4>
                    </div>
                    <a href="#" className="text-green-600 text-sm font-medium hover:underline">
                      Lihat Lokasi
                    </a>
                  </div>
                  <ul className="list-disc list-outside pl-6 mt-4 text-black opacity-40 font-medium text-sm space-y-1">
                    {item.content.map((c, i) => (
                      <li key={i}>{c}</li>
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
