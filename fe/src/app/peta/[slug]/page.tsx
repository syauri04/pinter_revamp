"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BreadcumbKec from "@/components/BreadcumbKec";
import Image from "next/image";
import Link from "next/link";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import CardGridKec from "@/components/CardGridKec";
import { fetchKecamatans, fetchKecamatanBySlug, Kecamatan } from "@/services/kecamatan";
import { uppercaseFirst } from "@/utils/string";
import MapDetail from "@/components/MapDetail";
import SkeletonKec from "@/components/SkeletonKec";

export default function KecamatanDetailPage() {
  const params = useParams<{ slug: string }>();
  const [data, setData] = useState<Kecamatan | null>(null);
  const [kecamatanList, setKecamatanList] = useState<Kecamatan[]>([]);
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  useEffect(() => {
    fetchKecamatans().then((all) => setKecamatanList(all.filter((k) => k.cat === "Kecamatan")));
  }, []);

  useEffect(() => {
    if (!params.slug) return;
    fetchKecamatanBySlug(params.slug).then((res) => setData(res));
  }, [params.slug]);

  if (!data) {
    return <SkeletonKec />;
  }

  // console.log("data", data);

  return (
    <div>
      <BreadcumbKec kecamatans={kecamatanList} activeSlug={data.slug} />
      {/* Hero Section */}
      <section className="relative w-full bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 xl:px-0 py-14 md:py-16 items-start">
          <div className="order-2 sm:order-1">
            <h1 className="font-bold text-5xl md:text-[80px] leading-[100%] text-[#000000] mb-10">{data.cat === "Kecamatan" ? `Kec. ${uppercaseFirst(data.title)}` : uppercaseFirst(data.title)}</h1>
            <p className="font-medium text-lg md:text-2xl leading-[120%] text-[#000000] opacity-[0.4]">{data.ringkasan}</p>

            <div className="flex space-x-4 mt-14">
              <Link href={data.linkInstagram || "#"} target={data.linkInstagram ? "_blank" : "_self"} className="hover:opacity-[1] transition">
                <AiFillInstagram size={39} className="text-[#FE9100]" />
              </Link>

              <Link href={data.linkYoutube || "#"} target={data.linkYoutube ? "_blank" : "_self"} className="hover:opacity-[1] transition">
                <AiFillYoutube size={42} className="text-[#FE9100]" />
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end order-1 sm:order-2">
            {/* <Image src="/assets/map-kec.png" alt={data.title} width={620} height={365} className="w-[580px] object-contain" /> */}
            <MapDetail slug={data.slug} />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative w-full py-10">
        {/* Background */}
        <div className="absolute inset-x-0 bottom-0 z-0 min-h-[1000px]">
          <Image src="/assets/berita1.jpg" alt="Background" fill className="object-cover object-bottom opacity-[0.8]" />
          <div className="absolute inset-0 -top-[100px] bg-gradient-to-b from-[#FE9100]/0 to-[#FE9100] opacity-80" />
        </div>
        {/* <div className="absolute min-h-[1450px] bottom-0 inset-x-0 bg-gradient-to-b from-[#FE9100]/0 to-[#FE9100] opacity-80" /> */}

        {/* Swiper Gallery */}
        <Swiper spaceBetween={30} slidesPerView="auto" centeredSlides className="w-full">
          {data.galleryKecamatan?.map((item) => (
            <SwiperSlide key={item.id} className="flex justify-center !w-auto">
              <div className="relative w-[300px] sm:w-[500px] lg:w-[840px] h-[171px] sm:h-[285px] lg:h-[480px]">
                <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnail?.url}`} alt={item.thumbnail?.name || `gallery-${item.id}`} fill className="object-cover rounded-2xl" priority />

                {item.youtubeUrl && (
                  <button onClick={() => setOpenVideo(item.youtubeUrl!)} className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 hover:bg-black/50 transition rounded-2xl">
                    <FaPlay className="text-white text-4xl" />
                  </button>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Video Popup */}
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

        {/* Potensi Section */}
        <div className="container max-w-7xl mx-auto relative px-4 xl:px-0 py-24 z-40">
          <h1 className="font-bold text-[32px] leading-[100%] text-black mb-10">Potensi Investasi:</h1>
          <CardGridKec potensi={data.potensiKecamatan} />
        </div>
      </section>
    </div>
  );
}
