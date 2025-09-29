"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { SectionHero } from "@/types/beranda";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapVIew"), { ssr: false });

interface HeroProps {
  data: SectionHero;
}

export default function Hero({ data }: HeroProps) {
  // console.log("dataprops", data.backgroundHero.url);
  const image = data.backgroundHero?.url;
  const imageUrl = image ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${image}` : "/images/fallback.jpg";
  return (
    <section className="relative w-full flex items-center justify-center px-2 sm:px-4 pt-20">
      <div className="relative w-full px-4 pt-16 pb-0 sm:pb-20 rounded-xl sm:rounded-[60px] overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 -z-20">
          <div className="h-[810x] bg-[linear-gradient(180deg, rgba(0, 139, 204, 0.6) 20%, #002333 100%)]"></div>
          <div className="h-full bg-[#002333]"></div>
        </div>

        {/* Background Image */}
        <div className="absolute top-0 left-0 right-0 h-[810px] -z-10">
          {/* <Image src="/assets/bg-hero.png" alt="Hero Background" fill className="object-cover object-top" /> */}

          <Image
            src={imageUrl} // <p- akai dynamic url
            alt={data.backgroundHero.name || "Hero Background"}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Content Text */}
        <motion.div className="relative z-10 max-w-3xl mx-auto text-center text-white" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <h1 className="text-4xl sm:text-5xl md:text-[64px] tracking-[-0.02em] font-bold mb-6">{data.title}</h1>
          <p className="text-base sm:text-lg md:text-xl leading-[120%] opacity-[0.8] mb-6">{data.ringkasan}</p>
          <Link href="/peta" className="inline-flex items-center gap-2 bg-[#002333] hover:bg-[#024b6c] text-white px-6 py-4 rounded-2xl font-medium transition shadow-[0px 4px 8px rgba(0, 0, 0, 0.1)]">
            <span>Lihat Peta</span>
            <ArrowRight size={28} strokeWidth={2} />
          </Link>
        </motion.div>

        {/* Peta Leaflet */}
        <div className="mt-14 relative w-full max-w-7xl mx-auto px-0 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.8 }} className="relative rounded-[20px] overflow-hidden">
            <MapView />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
