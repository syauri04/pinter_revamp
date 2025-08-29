"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center px-2 sm:px-4 pt-20">
      <div className="relative w-full px-4 pt-16 pb-0 sm:pb-20 rounded-xl sm:rounded-[60px] overflow-hidden">
        {/* Layer Background */}
        <div className="absolute inset-0 -z-20">
          <div className="h-[810px] bg-[linear-gradient(180deg,rgba(0,77,38,0)_70%,#004D26_100%)]"></div>
          <div className="h-full bg-[#004D26]"></div>
        </div>

        {/* Background Image */}
        <div className="absolute top-0 left-0 right-0 h-[810px] -z-10">
          <Image src="/assets/bg-hero.png" alt="Hero Background" fill className="object-cover object-top" />
        </div>

        {/* Content Text */}
        <motion.div className="relative z-10 max-w-3xl mx-auto text-center text-white" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <h1 className="text-4xl sm:text-5xl md:text-[64px] tracking-[-0.02em] font-bold mb-6">Temukan potensi investasi dengan cepat dan mudah</h1>
          <p className="text-base sm:text-lg md:text-xl leading-[120%] opacity-[0.8] mb-6">Peta Potensi Investasi Terpadu (PINTER) menampilkan dataset dan visual geospasial khusus wilayah Kabupaten Bogor.</p>
          <Link
            href="/peta"
            className="inline-flex items-center gap-2 bg-[#FE9100] hover:bg-[#da7e06] text-white px-6 py-4 rounded-2xl font-medium transition shadow-[0px_4px_8px_rgba(0,0,0,0.1),inset_0px_4px_4px_rgba(255,255,255,0.2),inset_0px_-4px_4px_rgba(0,0,0,0.1)]"
          >
            <span>Lihat Peta </span>
            <ArrowRight size={28} strokeWidth={2} />
          </Link>
        </motion.div>

        {/* Image tambahan */}
        <div className="mt-14 relative w-full max-w-7xl mx-auto px-0 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.8 }} className="relative">
            <Image src="/assets/cover-peta.png" alt="Map Preview" width={1200} height={600} className="rounded-lg w-full" />
            <div className="absolute inset-0 rounded-lg bg-[linear-gradient(180deg,rgba(0,77,38,0)_50%,#004D26_100%)]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
