"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import Link from "next/link";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  summary: string;
  image: string;
}

// Data berita
const news: NewsItem[] = [
  {
    id: 1,
    category: "Regulasi",
    title: "Peta Potensi Investasi Terpadu",
    date: "14 Jul 2023",
    summary: "Berdasarkan dalam rangka mewujudkan pelayanan prima di berbagai bidang yang terkait diharapkan...",
    image: "/assets/berita1.jpg",
  },
  {
    id: 2,
    category: "Investasi",
    title: "DPMPTSP PINTER",
    date: "31 Jul 2023",
    summary: "Berdasarkan kebijakan dimaksudkan menciptakan langkah strategis untuk percepatan pelayanan publik...",
    image: "/assets/berita2.png",
  },
  {
    id: 3,
    category: "Layanan",
    title: "Peta Potensi Investasi Terpadu",
    date: "12 Jul 2023",
    summary: "Informasi kebijakan dimaksudkan mewujudkan langkah strategis dalam percepatan pelayanan publik...",
    image: "/assets/berita1.jpg",
  },
  {
    id: 4,
    category: "Regulasi",
    title: "Peta Potensi Investasi Terpadu",
    date: "21 Jul 2023",
    summary: "Berdasarkan dalam rangka mewujudkan pelayanan prima diharapkan mampu mempercepat pencapaian...",
    image: "/assets/berita2.png",
  },
];

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
  // Split berita menjadi row per 2 item
  const rows: NewsItem[][] = [];
  for (let i = 0; i < news.length; i += 2) {
    rows.push(news.slice(i, i + 2));
  }

  return (
    <section className="relative w-full bg-white overflow-hidden min-h-[1900px]">
      {/* Background image sebagai ornament */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[1000px]">
        <Image src="/assets/berita1.jpg" alt="Background" fill className="object-cover object-bottom opacity-[0.8]" />
      </div>

      <div className="container max-w-7xl mx-auto relative px-4 xl:px-0 py-24 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-14">
          <h2 className="font-bold text-[56px] tracking-[-0.01em] leading-[100%] text-[#000000]">Berita Terkini</h2>
          <a href="#" className="font-bold text-[20px] leading-[120%] text-[#00994B] underline">
            Lihat Semua
          </a>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left summary */}
          <div className="w-full md:w-1/3  order-1">
            <p className="font-medium text-[20px] leading-[120%] text-[#000000] opacity-[0.4]">Artikel terkait Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu (DPMPTSP) dan Aplikasi SPINTER.</p>
          </div>

          {/* Right news grid per row */}
          <div className="w-full md:w-2/3  order-2 space-y-8">
            {rows.map((rowItems, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} // animasi saat row terlihat
              >
                {rowItems.map((item) => (
                  <Link key={item.id} href={`/berita/${item.title}`} passHref>
                    <motion.div variants={cardVariants} className="flex flex-col bg-transparent  rounded-[10px]">
                      <Image src={item.image} alt={item.title} width={500} height={300} className="w-full h-[267px] object-cover rounded-md" />
                      <span className="font-bold text-[#FE9100] leading-[100%] text-sm mt-5">{item.category}</span>
                      <h3 className="text-2xl font-bold text-black leading-[120%] mt-3">{item.title}</h3>
                      <span className="text-sm font-medium text-black opacity-[0.4] leading-[100%] mt-3">{item.date}</span>
                      <p className="text-base font-medium text-black opacity-[0.4] leading-[120%] mt-3">{item.summary}</p>
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
