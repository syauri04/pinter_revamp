"use client";

import HeroTitlePage from "@/components/HeroTitlePage";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  deskripsi: string;
  image: string;
}

const categories = ["Semua", "Investasi", "Bogor", "Lainnya"];

const newsData: NewsItem[] = [
  {
    id: 1,
    category: "Investasi",
    title: "Peta Potensi Investasi Terpadu",
    date: "14 Juni 2025",
    deskripsi:
      "Berkaca dalam rangka mewujudkan pelayanan prima di Kabupaten Bogor yang masih dihadapkan dengan berbagai realita dimana potret penyelenggara pelayanan masih dirasakan belum optimal dan belum memperlihatkan pelayanan prima yang diharapkan, Maka Pemerintahan Kabupaten Bogor perlu melakukan langkah reformasi terhadap sejumlah kebijakan.",
    image: "/assets/berita1.jpg",
  },
  {
    id: 2,
    category: "Bogor",
    title: "DPMPTSP PINTER",
    date: "13 Mei 2025",
    deskripsi: "Reformasi kebijakan dimaksudkan merupakan langkah strategis dalam upaya pencapaian pelayanan publik yang prima.",
    image: "/assets/berita2.png",
  },
  {
    id: 3,
    category: "Lainnya",
    title: "Pertumbuhan ekonomi daerah dan kesejahteraan masyarakat",
    date: "12 April 2025",
    deskripsi: "Reformasi kebijakan dimaksudkan merupakan langkah strategis dalam upaya pencapaian pelayanan publik yang prima.",

    image: "/assets/berita2.png",
  },
  {
    id: 4,
    category: "Investasi",
    title: "Pertumbuhan ekonomi daerah dan kesejahteraan masyarakat",
    date: "11 Maret 2025",
    deskripsi:
      "Berkaca dalam rangka mewujudkan pelayanan prima di Kabupaten Bogor yang masih dihadapkan dengan berbagai realita dimana potret penyelenggara pelayanan masih dirasakan belum optimal dan belum memperlihatkan pelayanan prima yang diharapkan, Maka Pemerintahan Kabupaten Bogor perlu melakukan langkah reformasi terhadap sejumlah kebijakan.",

    image: "/assets/berita1.jpg",
  },
  {
    id: 5,
    category: "Bogor",
    title: "Peta Potensi Investasi Terpadu",
    date: "10 Februari 2025",
    deskripsi: "Reformasi kebijakan dimaksudkan merupakan langkah strategis dalam upaya pencapaian pelayanan publik yang prima.",
    image: "/assets/berita1.jpg",
  },
  {
    id: 6,
    category: "Lainnya",
    title: "DPMPTSP PINTER",
    date: "9 Januari 2025",
    deskripsi:
      "Berkaca dalam rangka mewujudkan pelayanan prima di Kabupaten Bogor yang masih dihadapkan dengan berbagai realita dimana potret penyelenggara pelayanan masih dirasakan belum optimal dan belum memperlihatkan pelayanan prima yang diharapkan, Maka Pemerintahan Kabupaten Bogor perlu melakukan langkah reformasi terhadap sejumlah kebijakan.",

    image: "/assets/berita2.png",
  },
];

export default function Berita() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredNews = activeCategory === "Semua" ? newsData : newsData.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div>
      <HeroTitlePage title="Berita" description="Artikel Informasi Terbaru" styleClass="bg-[linear-gradient(180deg, rgba(254, 145, 0, 0.05) 0%, rgba(254, 145, 0, 0) 100%)] opacity-5" />

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 space-y-10">
          <AnimatePresence mode="wait">
            {paginatedNews.map((item) => (
              <Link href={`/berita/${item.title}`} key={item.id}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-2">
                  <div className="relative w-full h-[267px] rounded-[10px] overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <span className="font-bold text-[#FE9100] leading-[100%] text-sm">{item.category}</span>
                  <h3 className="font-bold text-[20px] tracking-[-0.01em] leading-[100%] text-black mt-2">{item.title}</h3>
                  <p className="text-sm text-black opacity-[0.4] font-medium leading-[100%] mt-4">{item.date}</p>
                  <p className="text-base text-black opacity-[0.4] font-medium leading-[120%] mt-4 overflow-hidden text-ellipsis line-clamp-3">{item.deskripsi}</p>
                </motion.div>
              </Link>
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
