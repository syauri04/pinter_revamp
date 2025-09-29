"use client";

import { useState, useEffect } from "react";
import HeroTitlePage from "@/components/HeroTitlePage";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fetchBeritaByKategori, fetchKategoriBerita } from "@/services/berita";
import { BeritaItem, KategoriBerita } from "@/types/berita";
import { getStrapiMedia } from "@/utils/media";

export default function BeritaPage() {
  const [berita, setBerita] = useState<BeritaItem[]>([]);
  const [kategoriList, setKategoriList] = useState<KategoriBerita[]>([]);
  const [activeKategori, setActiveKategori] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  // fetch kategori saat mount
  useEffect(() => {
    fetchKategoriBerita().then((res) => setKategoriList(res));
  }, []);

  // fetch berita setiap kategori/page berubah
  useEffect(() => {
    setLoading(true);
    const slug = activeKategori || undefined;

    fetchBeritaByKategori(currentPage, itemsPerPage, slug)
      .then((res) => {
        setBerita(res.data);
        setTotalPages(res.pageCount);
      })
      .finally(() => setLoading(false));
  }, [activeKategori, currentPage]);

  return (
    <div>
      <HeroTitlePage title="Berita" description="Artikel Informasi Terbaru" styleClass="bg-[linear-gradient(180deg, rgba(254, 145, 0, 0.05) 0%, rgba(254, 145, 0, 0) 100%)] opacity-5" />

      <section className="w-full max-w-7xl mx-auto px-4 md:px-0 pb-24">
        {/* Kategori */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => {
              setActiveKategori(null);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border border-black transition text-base tracking-[-0.01em] text-black cursor-pointer ${!activeKategori ? "opacity-100 font-bold" : "opacity-40 hover:opacity-70 font-medium"}`}
          >
            Semua
          </button>

          {kategoriList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveKategori(cat.slug);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border border-black transition text-base tracking-[-0.01em] text-black cursor-pointer ${activeKategori === cat.slug ? "opacity-100 font-bold" : "opacity-40 hover:opacity-70 font-medium"}`}
            >
              {cat.kategori}
            </button>
          ))}
        </div>

        {/* Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 space-y-10">
          <AnimatePresence>
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, i) => (
                  <motion.div key={i} className="space-y-2 animate-pulse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="w-full h-[267px] bg-gray-200 rounded-[10px]" />
                    <div className="h-4 w-1/4 bg-gray-300 rounded" />
                    <div className="h-5 w-3/4 bg-gray-300 rounded" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded mt-2" />
                    <div className="h-12 w-full bg-gray-200 rounded mt-2" />
                  </motion.div>
                ))
              : berita.map((item) => (
                  <Link key={item.id} href={`/berita/${item.slug}`}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="space-y-2">
                      <div className="relative w-full h-[267px] rounded-[10px] overflow-hidden">{item.coverImage?.url && <Image src={getStrapiMedia(item.coverImage.url)} alt={item.title} fill className="object-cover" />}</div>
                      <span className="font-bold text-[#008BCC] leading-[100%] text-sm">{item.kategori_berita?.kategori}</span>
                      <h3 className="font-bold text-[20px] tracking-[-0.01em] leading-[100%] text-black mt-2">{item.title}</h3>
                      <p className="text-sm text-black opacity-[0.4] font-medium leading-[100%] mt-4">
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-base text-black opacity-[0.4] font-medium leading-[120%] mt-4 overflow-hidden text-ellipsis line-clamp-3">{item.ringkasan}</p>
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
            <button key={num} onClick={() => setCurrentPage(num)} className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === num ? "bg-[#008BCC] text-white" : "text-black hover:bg-gray-100"}`}>
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
