"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiSidebarSimple, PiSidebarSimpleDuotone } from "react-icons/pi";
import Link from "next/link";
import { fetchKecamatans, Kecamatan } from "@/services/kecamatan";
import Accordion from "@/components/Accordion";
import { uppercaseFirst } from "@/utils/string";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function PetaPage() {
  const [data, setData] = useState<Kecamatan[]>([]);
  const [loading, setLoading] = useState(true);

  // toggle state
  const [showKecamatan, setShowKecamatan] = useState(false);
  const [showPolaRuang, setShowPolaRuang] = useState(true);
  const [activeKecamatan, setActiveKecamatan] = useState<string | null>(null);

  // active area data (Kabupaten/Kecamatan) untuk sidebar
  const [activeAreaData, setActiveAreaData] = useState<Kecamatan | null>(null);

  // sidebar state
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [cekleftSidebarWidth, setLeftSidebarWidth] = useState(350);
  const [toggleLeftSidebar, settoggleLeftSidebar] = useState(360);

  const leftSidebarWidth = cekleftSidebarWidth;

  useEffect(() => {
    fetchKecamatans()
      .then((res) => {
        setData(res);

        // default ke Kabupaten
        const kabupaten = res.find((d) => d.cat === "Kabupaten");
        if (kabupaten) {
          setActiveKecamatan(kabupaten.title);
          setActiveAreaData(kabupaten); // ✅ set default sidebar
        }
      })
      .catch((err) => console.error("Fetch kecamatan gagal:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleKecamatanSelect = (nama: string) => {
    setActiveKecamatan((prev) => (prev === nama ? null : nama));

    // update activeAreaData
    const selected = data.find((d) => d.title === nama);
    setActiveAreaData(selected || null);

    if (window.innerWidth < 640) {
      setShowLeftSidebar(false);
    }
  };

  const handleToggleKecamatan = () => {
    setShowKecamatan(!showKecamatan);
    if (!showKecamatan) {
      setShowPolaRuang(false);
    } else {
      // jika toggle off, kembalikan ke Kabupaten
      const kabupaten = data.find((d) => d.cat === "Kabupaten");
      if (kabupaten) {
        setActiveKecamatan(kabupaten.title);
        setActiveAreaData(kabupaten);
      }
    }
  };

  const handleTogglePolaRuang = () => {
    setShowPolaRuang(!showPolaRuang);
    if (!showPolaRuang) {
      setShowKecamatan(false);
      const kabupaten = data.find((d) => d.cat === "Kabupaten");
      if (kabupaten) {
        setActiveKecamatan(kabupaten.title);
        setActiveAreaData(kabupaten);
      }
    }
    if (window.innerWidth < 640) {
      setShowLeftSidebar(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 400) {
      setLeftSidebarWidth(290);
      settoggleLeftSidebar(300);
    }
    if (window.innerWidth <= 768) {
      setShowLeftSidebar(false);
    }
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowLeftSidebar(false);
      } else {
        setShowLeftSidebar(true);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        Loading...
      </div>
    );
  }

  // pisahkan data
  const kabupaten = data.find((d) => d.cat === "Kabupaten");
  const kecamatanList = data.filter((d) => d.cat === "Kecamatan");

  console.log("activeAreaData", activeAreaData);

  return (
    <div className="fixed w-screen h-screen overflow-hidden flex">
      {/* LEFT SIDEBAR */}
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
            {activeAreaData && (
              <div>
                <h2 className="text-xl font-bold leading-[120%] text-black mb-4">
                  {activeAreaData.title}
                </h2>
                <p className="text-base text-black opacity-[0.4] leading-[120%] mb-4">
                  {activeAreaData.ringkasan}
                </p>
              </div>
            )}

            {/* Bagian Bawah */}
            <div className="space-y-4 mb-6 overflow-y-auto custom-scroll">
              <h2 className="text-base font-bold leading-[100%] text-black mb-6">
                Peta Wilayah Perancangan
              </h2>

              {/* Toggle Kecamatan */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium leading-[100%] text-black">
                    Kecamatan
                  </span>
                  <button
                    onClick={handleToggleKecamatan}
                    className={`w-10 h-5 cursor-pointer flex items-center rounded-full p-1 transition-colors duration-300 ${
                      showKecamatan ? "bg-[#00994B]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white cursor-pointer w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${
                        showKecamatan ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {showKecamatan && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 mt-2 space-y-2 overflow-hidden"
                    >
                      {kecamatanList.map((k) => (
                        <div
                          key={k.id}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-black">
                            {uppercaseFirst(k.title)}
                          </span>
                          <button
                            onClick={() => handleKecamatanSelect(k.title)}
                            className={`cursor-pointer w-8 h-4 flex items-center rounded-full p-1 transition-colors duration-300 ${
                              activeKecamatan === k.title
                                ? "bg-[#00994B]"
                                : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`bg-white cursor-pointer w-2.5 h-2.5 rounded-full shadow-md transform transition-transform duration-300 ${
                                activeKecamatan === k.title
                                  ? "translate-x-4"
                                  : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Toggle Pola Ruang */}
              {kabupaten && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium leading-[100%] text-black">
                    Pola Ruang
                  </span>
                  <button
                    onClick={handleTogglePolaRuang}
                    className={`w-10 h-5 cursor-pointer flex items-center rounded-full p-1 transition-colors duration-300 ${
                      showPolaRuang ? "bg-[#FE9100]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white cursor-pointer w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${
                        showPolaRuang ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              )}

              {activeKecamatan && activeKecamatan !== kabupaten?.title && (
                <div>
                  <Link
                    href={`/peta/${activeKecamatan.toLowerCase()}`}
                    className="cursor-pointer"
                  >
                    <button className="w-full py-2 bg-green-600 text-white rounded-lg cursor-pointer">
                      Lihat Detail
                    </button>
                  </Link>
                </div>
              )}
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
        {showLeftSidebar ? (
          <PiSidebarSimple className="text-black opacity-[0.4] text-2xl" />
        ) : (
          <PiSidebarSimpleDuotone className="text-black opacity-[0.4] text-2xl" />
        )}
      </motion.button>

      {/* Map */}
      <div
        className="flex-1 h-full relative z-0"
        style={{ marginLeft: showLeftSidebar ? leftSidebarWidth : 0 }}
      >
        <Map
          showPolaRuang={showPolaRuang}
          kecamatanLayers={
            activeKecamatan && activeKecamatan !== kabupaten?.title
              ? [activeKecamatan]
              : []
          }
        />
      </div>

      {/* RIGHT SIDEBAR */}
      {showRightSidebar && activeAreaData && !showPolaRuang && (
        <div className="absolute right-0 bottom-28 sm:top-0 w-full sm:w-[320px] h-auto bg-transparent p-2 sm:p-4 z-20">
          <Accordion
            deskripsi={activeAreaData.deskripsi}
            potensiKecamatan={activeAreaData.potensiKecamatan}
          />
        </div>
      )}
    </div>
  );
}
