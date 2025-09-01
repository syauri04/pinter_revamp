"use client";

import BeritaSection from "@/components/BeritaSection";
import CardPotensi from "@/components/CardPotensi";
import Hero from "@/components/Hero";
import SectionPotensi from "@/components/SectionPotensi";
import { motion, Variants } from "motion/react";

const data = [
  { title: "Pariwisata", icon: "/assets/icon-parawisata.png" },
  { title: "Pertanian", icon: "/assets/icon-pertanian.png" },
  { title: "Pendidikan", icon: "/assets/icon-pendidikan.png" },
  { title: "Perdagangan", icon: "/assets/icon-perdagangan.png" },
  { title: "Kehutanan", icon: "/assets/icon-kehutanan.png" },
  { title: "Pekerjaan Umum", icon: "/assets/icon-pekerjaan-umum.png" },
  // bisa ditambah terus...
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // jeda antar card
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const, // <- tipe string literal
    },
  },
};
export default function Home() {
  return (
    <main>
      <Hero />
      <section className="relative w-full bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4 xl:px-0 py-16 sm:py-24">
          <div>
            <h1 className="font-bold text-[32px] sm:text-[56px] tracking-[-0.01em] leading-[100%] text-[#000000]">Peta Potensi Investasi Terpadu (PINTER)</h1>
          </div>
          <div>
            <p className="font-medium text-base sm:text-[20px] leading-[120%] text-[#000000] opacity-[0.4]">
              Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu (DPMPTSP) menghadirkan aplikasi SIPINTER sebagai platform digital yang efektif dan efisien untuk memperkuat komunikasi antara pemerintah, investor, dan masyarakat,
              menyediakan informasi lengkap terkait potensi dan peluang investasi khususnya di Kabupaten Bogor, serta mendukung terciptanya iklim investasi yang kondusif demi mendorong pertumbuhan ekonomi daerah dan kesejahteraan
              masyarakat.
            </p>
          </div>
        </div>
      </section>

      <SectionPotensi />

      <section className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 xl:px-0 py-24">
          <h2 className="font-bold text-[32px] sm:text-[56px] tracking-[-0.01em] leading-[100%] text-[#000000] mb-14">Potensi Investasi</h2>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // muncul hanya sekali saat discroll
          >
            {data.map((item, index) => {
              // hitung baris & col → tentukan warna
              const row = Math.floor(index / 4); // row ke berapa
              const col = index % 4; // posisi di dalam row
              let variant: "orange" | "green";

              if (row % 2 === 0) {
                // row genap (0,2,4) mulai dari orange
                variant = col % 2 === 0 ? "orange" : "green";
              } else {
                // row ganjil (1,3,5) mulai dari green
                variant = col % 2 === 0 ? "green" : "orange";
              }

              return (
                <motion.div key={index} variants={cardVariants}>
                  <CardPotensi title={item.title} icon={item.icon} variant={variant} />;
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <BeritaSection />
    </main>
  );
}
