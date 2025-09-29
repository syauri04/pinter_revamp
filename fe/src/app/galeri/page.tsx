"use client";

import HeroTitlePage from "@/components/HeroTitlePage";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { fetchGaleri, fetchKategoriGaleri } from "@/services/galeri";
import { GaleriItem, KategoriGaleri } from "@/types/galeri";
import { getStrapiMedia } from "@/utils/media";

export default function GaleriPage() {
  const [categories, setCategories] = useState<KategoriGaleri[]>([]);
  const [activeCategory, setActiveCategory] = useState("Semua Kategori");
  const [galeriData, setGaleriData] = useState<GaleriItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<GaleriItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false); // <-- state loading
  const itemsPerPage = 6;

  // Fetch kategori galeri
  useEffect(() => {
    fetchKategoriGaleri().then((data) => {
      setCategories([{ id: 0, kategori: "Semua Kategori", slug: "" }, ...data]);
    });
  }, []);

  // Fetch galeri berdasarkan kategori & page
  useEffect(() => {
    const kategoriSlug = activeCategory !== "Semua Kategori" ? categories.find((c) => c.kategori === activeCategory)?.slug : undefined;

    setLoading(true); // <-- mulai loading
    fetchGaleri(currentPage, itemsPerPage, kategoriSlug)
      .then((res) => {
        setGaleriData(res.data);
        setTotalPages(res.pageCount);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // <-- selesai loading
  }, [activeCategory, currentPage, categories]);

  const openModal = (item: GaleriItem) => {
    setSelectedGallery(item);
    setCurrentIndex(0);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? (selectedGallery?.galeriImage.length ?? 1) - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev === (selectedGallery?.galeriImage.length ?? 1) - 1 ? 0 : prev + 1));

  // Skeleton card untuk loading
  const SkeletonCard = () => (
    <div className="space-y-2">
      <div className="w-full h-[349px] bg-gray-200 rounded-[20px] animate-pulse" />
      <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mt-2" />
    </div>
  );

  return (
    <div>
      <HeroTitlePage title="Galeri" description="Ikuti Kegiatan DPMPTSP dan SIPINTER" styleClass="bg-[linear-gradient(180deg, rgba(254, 145, 0, 0.05) 0%, rgba(254, 145, 0, 0) 100%)] opacity-5" />

      <section className="w-full max-w-7xl mx-auto px-4 md:px-0 pb-24">
        {/* Kategori */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.kategori);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border border-black transition text-base tracking-[-0.01em] text-black cursor-pointer ${
                activeCategory === cat.kategori ? "opacity-100 font-bold" : "opacity-40 hover:opacity-70 font-medium"
              }`}
            >
              {cat.kategori}
            </button>
          ))}
        </div>

        {/* Card List */}
        {/* Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 space-y-8">
          <AnimatePresence mode="wait">
            {loading
              ? // Skeleton sesuai ukuran card asli
                Array.from({ length: itemsPerPage }).map((_, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
                    <div className="w-full h-[349px] rounded-[20px] bg-gray-200 animate-pulse" />
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                  </motion.div>
                ))
              : galeriData.map((item) => (
                  <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-2 cursor-pointer" onClick={() => openModal(item)}>
                    <div className="relative w-full h-[349px] rounded-[20px] overflow-hidden">{item.featuredImage && <Image src={getStrapiMedia(item.featuredImage.url)} alt={item.title} fill className="object-cover" />}</div>
                    <h3 className="font-bold text-[20px] tracking-[-0.01em] leading-[100%] text-black mt-4">{item.title}</h3>
                    <p className="text-sm text-black opacity-[0.4] font-medium leading-[100%] mt-4">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
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
            <button key={num} onClick={() => setCurrentPage(num)} className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === num ? "bg-[#008BCC] text-white" : "text-black hover:bg-gray-100"}`}>
              {num}
            </button>
          ))}

          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="disabled:opacity-30">
            <FiChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Modal Gallery */}
      {/* Modal Gallery */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}>
            <div className="relative w-[90%] max-w-4xl h-[80vh] bg-black rounded-xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Slider */}
              <div className="relative flex-1 flex items-center justify-center">
                {selectedGallery ? (
                  // Gambar asli
                  <Image src={getStrapiMedia(selectedGallery.galeriImage[currentIndex].url)} alt={`Gallery image ${currentIndex + 1}`} fill className="object-contain" />
                ) : (
                  // Skeleton sementara loading
                  <div className="w-full h-full bg-gray-700 animate-pulse rounded-lg" />
                )}

                {/* Prev / Next */}
                {selectedGallery && selectedGallery.galeriImage.length > 1 && (
                  <>
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white">
                      <FiChevronLeft size={28} />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white">
                      <FiChevronRight size={28} />
                    </button>
                  </>
                )}

                {/* Close */}
                <button onClick={closeModal} className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white">
                  <FiX size={24} />
                </button>
              </div>

              {/* Ringkasan / Deskripsi */}
              <div className="p-4 bg-black text-white text-sm md:text-base overflow-y-auto">
                {selectedGallery ? (
                  selectedGallery.ringkasan
                ) : (
                  <>
                    <div className="h-4 w-3/4 bg-gray-600 rounded mb-2 animate-pulse" />
                    <div className="h-4 w-full bg-gray-600 rounded mb-2 animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-600 rounded mb-2 animate-pulse" />
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
