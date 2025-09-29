"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchBeritaForHome } from "@/services/berita";
import { BeritaItem } from "@/types/berita";
import { getStrapiMedia } from "@/utils/media";

// Variants per row
const rowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Variants per card
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function BeritaSection() {
  const [news, setNews] = useState<BeritaItem[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBeritaForHome();
        setNews(data);
      } catch (err) {
        console.error("Error fetching berita:", err);
      }
    }
    load();
  }, []);

  // Split berita menjadi row per 2 item
  const rows: BeritaItem[][] = [];
  for (let i = 0; i < news.length; i += 2) {
    rows.push(news.slice(i, i + 2));
  }

  return (
    <section className="relative w-full bg-white overflow-hidden min-h-[1900px]">
      {/* Background image sebagai ornament */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[1000px]">
        <Image src="/assets/berita1.jpg" alt="Background" fill className="object-cover object-bottom opacity-[0.8]" />
      </div>

      <div className="container max-w-7xl mx-auto relative px-4 xl:px-0 py-0 sm:py-24 pb-24 sm:pb-0 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-14">
          <h2 className="font-bold text-[32px] sm:text-[56px] tracking-[-0.01em] leading-[100%] text-[#000000]">Berita Terkini</h2>
          <Link href="/berita" className="font-bold text-[20px] leading-[120%] text-[#00994B] underline">
            Lihat Semua
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left summary */}
          <div className="w-full md:w-1/3 order-1">
            <p className="font-medium text-[20px] leading-[120%] text-[#000000] opacity-[0.4]">Artikel terkait Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu (DPMPTSP) dan Aplikasi SPINTER.</p>
          </div>

          {/* Right news grid per row */}
          <div className="w-full md:w-2/3 order-2 space-y-8">
            {rows.map((rowItems, rowIndex) => (
              <motion.div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 gap-8" variants={rowVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                {rowItems.map((item) => (
                  <Link key={item.id} href={`/berita/${item.slug}`} passHref>
                    <motion.div variants={cardVariants} className="flex flex-col bg-transparent rounded-[10px]">
                      {item.coverImage?.url && <Image src={getStrapiMedia(item.coverImage.url)} alt={item.title} width={500} height={300} className="w-full h-[267px] object-cover rounded-md" />}
                      <span className="font-bold text-[#008BCC] leading-[100%] text-sm mt-5">{item.kategori?.kategori}</span>
                      <h3 className="text-2xl font-bold text-black leading-[120%] mt-3 line-clamp-2">{item.title}</h3>
                      <span className="text-sm font-medium text-black opacity-[0.4] leading-[100%] mt-3">
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <p className="text-base font-medium text-black opacity-[0.4] leading-[120%] mt-3 line-clamp-3">{item.ringkasan}</p>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
