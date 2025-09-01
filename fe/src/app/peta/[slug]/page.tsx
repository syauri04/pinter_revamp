"use client";

import BreadcumbKec from "@/components/BreadcumbKec";
import Image from "next/image";
import Link from "next/link";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import CardGridKec from "@/components/CardGridKec";
interface SlideItem {
  id: number;
  image: string;
  youtubeUrl?: string; // fleksibel, hanya ada kalau perlu video
}

const slides: SlideItem[] = [
  {
    id: 1,
    image: "/assets/galeri1.jpg",
    youtubeUrl: "https://www.youtube.com/embed/0SXYhKhuhYQ",
  },
  {
    id: 2,
    image: "/assets/galeri2.png",
  },
  {
    id: 3,
    image: "/assets/galeri1.jpg",
  },
];

export default function KecamatanDetailPage() {
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  return (
    <div>
      <BreadcumbKec />
      <section className="relative w-full bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 xl:px-0 py-14 md:py-16 items-start">
          <div className="order-2 sm:order-1">
            <h1 className="font-bold text-5xl md:text-[80px] leading-[100%] text-[#000000] mb-10">Kecamatan Sukamakmur</h1>
            <p className="font-medium text-lg md:text-2xl leading-[120%] text-[#000000] opacity-[0.4]">
              Kecamatan Sukamakmur memiliki luas 16.982,65 Ha, memiki 10 desa/kelurahan dengan ibukecamatan di desa Sukamakmur, memiliki penduduk sebanyak 79.631 jiwa dan masuk di wilayah timur Kabupaten Bogor.
            </p>

            <div className="flex space-x-4 mt-14">
              <Link href="https://www.instagram.com/" target="_blank" className="hover:opacity-[1] transition">
                <AiFillInstagram size={39} className="text-[#FE9100]" />
              </Link>
              <Link href="https://www.youtube.com/" target="_blank" className="hover:opacity-[1] transition">
                <AiFillYoutube size={42} className="text-[#FE9100]" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end order-1 sm:order-2">
            <Image src="/assets/map-kec.png" alt="Tentang Kami" width={620} height={365} className="w-[580px] object-contain" />
          </div>
        </div>
      </section>
      <section className="relative w-full py-10">
        <div className="absolute inset-x-0 bottom-0 z-0 min-h-[1000px]">
          <Image src="/assets/berita1.jpg" alt="Background" fill className="object-cover object-bottom opacity-[0.8] " />
        </div>
        <div className="absolute min-h-[1450px] bottom-0 inset-x-0 bg-gradient-to-b from-[#FE9100]/0 to-[#FE9100] opacity-80" />
        <Swiper
          spaceBetween={30}
          slidesPerView="auto" // ✅ ukur slide berdasarkan kontennya
          centeredSlides // ✅ tetap center
          className="w-full"
        >
          {slides.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex justify-center !w-auto" // ✅ lebar slide = auto, bukan full
            >
              <div className="relative w-[300px] sm:w-[500px] lg:w-[840px] h-[171px] sm:h-[285px] lg:h-[480px]">
                <Image src={item.image} alt={`slide-${item.id}`} fill className="object-cover rounded-2xl" priority />

                {item.youtubeUrl && (
                  <button onClick={() => setOpenVideo(item.youtubeUrl!)} className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 hover:bg-black/50 transition rounded-2xl">
                    <FaPlay className="text-white text-4xl" />
                  </button>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Popup Modal dengan animasi */}
        <AnimatePresence>
          {openVideo && (
            <motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div
                className="bg-white rounded-2xl overflow-hidden w-[90%] md:w-[800px] h-[450px] relative"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <iframe src={openVideo} title="YouTube video" className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
                <button onClick={() => setOpenVideo(null)} className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg">
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container max-w-7xl mx-auto relative px-4 xl:px-0 py-24 z-40">
          <h1 className="font-bold text-[32px] leading-[100%] text-black mb-10">Potensi Investasi:</h1>
          <CardGridKec />
        </div>
      </section>
    </div>
  );
}
