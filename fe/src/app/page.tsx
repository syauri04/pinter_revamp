"use client";

import BeritaSection from "@/components/BeritaSection";
import CardPotensi from "@/components/CardPotensi";
import Hero from "@/components/Hero";
import SectionPotensi from "@/components/SectionPotensi";
import { motion, Variants } from "motion/react";
import { fetchBeranda, fetchPotensiInvestasi } from "@/services/beranda";
import { useState, useEffect } from "react";
import { BerandaData } from "@/types/beranda";
import { PotensiInvestasi } from "@/types/potensi";
import * as PiIcons from "react-icons/pi";
import SkeletonHome from "@/components/SkeletonHome";

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
  const [cardPotensi, setCardPotensi] = useState<PotensiInvestasi[]>([]);

  useEffect(() => {
    fetchPotensiInvestasi().then(setCardPotensi);
  }, []);

  const [beranda, setBeranda] = useState<BerandaData | null>(null); // <-- beri tipe

  useEffect(() => {
    fetchBeranda().then((data) => {
      // console.log("beranda", data);
      setBeranda(data);
    });
  }, []);

  if (!beranda) return <SkeletonHome />;
  return (
    <main>
      <Hero data={beranda.sectionHero} />
      <section className="relative w-full bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4 xl:px-0 py-16 sm:py-24">
          <div>
            <h1 className="font-bold text-[32px] sm:text-[56px] tracking-[-0.01em] leading-[100%] text-[#000000]">{beranda.sectionPotensi.title} </h1>
          </div>
          <div>
            <p className="font-medium text-base sm:text-[20px] leading-[120%] text-[#000000] opacity-[0.4]">{beranda.sectionPotensi.ringkasan}</p>
          </div>
        </div>
      </section>

      <SectionPotensi realisasi={beranda.sectionRealisasi} tujuan={beranda.sectionTujuan} />

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
            {cardPotensi.map((item, index) => {
              const row = Math.floor(index / 4); // baris ke berapa
              const col = index % 4; // posisi di dalam baris

              const variant: "orange" | "green" = row % 2 === 0 ? (col % 2 === 0 ? "orange" : "green") : col % 2 === 0 ? "green" : "orange";

              // Mapping icon string ke React Icon
              const IconComponent = PiIcons[item.icon as keyof typeof PiIcons];

              return (
                <motion.div key={item.id} variants={cardVariants}>
                  <CardPotensi title={item.title} icon={IconComponent ? <IconComponent className="text-white text-5xl" /> : null} variant={variant} />
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
