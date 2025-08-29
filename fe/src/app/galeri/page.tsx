"use client";

import HeroTitlePage from "@/components/HeroTitlePage";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface GaleriItem {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
}

const categories = ["Semua Kategori", "Acara", "Peta", "Lainnya"];

const galeriData: GaleriItem[] = [
  {
    id: 1,
    category: "Acara",
    title: "PINTER - Juni 2025",
    date: "14 Juni 2025",
    image: "/assets/galeri1.jpg",
  },
  {
    id: 2,
    category: "Peta",
    title: "PINTER - Mei 2025",
    date: "13 Mei 2025",
    image: "/assets/galeri2.png",
  },
  {
    id: 3,
    category: "Lainnya",
    title: "PINTER - April 2025",
    date: "12 April 2025",
    image: "/assets/galeri2.png",
  },
  {
    id: 4,
    category: "Acara",
    title: "PINTER - Maret 2025",
    date: "11 Maret 2025",
    image: "/assets/galeri1.jpg",
  },
  {
    id: 5,
    category: "Peta",
    title: "PINTER - Februari 2025",
    date: "10 Februari 2025",
    image: "/assets/galeri1.jpg",
  },
  {
    id: 6,
    category: "Lainnya",
    title: "PINTER - Januari 2025",
    date: "9 Januari 2025",
    image: "/assets/galeri2.png",
  },
];

export default function TentangKamiPage() {
  const [activeCategory, setActiveCategory] = useState("Semua Kategori");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredGaleri = activeCategory === "Semua Kategori" ? galeriData : galeriData.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filteredGaleri.length / itemsPerPage);
  const paginatedGaleri = filteredGaleri.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div>
      <HeroTitlePage title="Galeri" description="Ikuti Kegiatan DPMPTSP dan SIPINTER" styleClass="bg-[linear-gradient(180deg, rgba(254, 145, 0, 0.05) 0%, rgba(254, 145, 0, 0) 100%)] opacity-5" />

      <section className="w-full max-w-7xl mx-auto px-4 md:px-0 pb-24">
        {/* Kategori */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border border-black transition  text-base tracking-[-0.01em] text-black cursor-pointer ${activeCategory === cat ? "opacity-100 font-bold" : "opacity-40 hover:opacity-70 font-medium"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 space-y-8">
          <AnimatePresence mode="wait">
            {paginatedGaleri.map((item) => (
              <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-2">
                <div className="relative w-full h-[349px] rounded-[20px] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-[20px] tracking-[-0.01em] leading-[100%] text-black mt-4">{item.title}</h3>
                <p className="text-sm text-black opacity-[0.4] font-medium leading-[100%] mt-4">{item.date}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="disabled:opacity-30">
            <FiChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button key={num} onClick={() => setCurrentPage(num)} className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === num ? "bg-green-600 text-white" : "text-black hover:bg-gray-100"}`}>
              {num}
            </button>
          ))}

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="disabled:opacity-30">
            <FiChevronRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
