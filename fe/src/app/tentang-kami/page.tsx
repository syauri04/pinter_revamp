"use client";
import HeroTitlePage from "@/components/HeroTitlePage";
import MissionCard from "@/components/MissionCard";
import Image from "next/image";
import { motion } from "motion/react";

import { PiTreasureChestDuotone, PiTimerDuotone, PiGlobeStandFill, PiThumbsUpDuotone, PiChartLineDuotone, PiArrowClockwiseDuotone, PiChatsCircleDuotone } from "react-icons/pi";

export default function TentangKamiPage() {
  const missions = [
    {
      id: 1,
      icon: <PiTreasureChestDuotone className="text-orange-500 text-[64px]" />,
      description: "Meningkatkan jumlah investor yang mengakses dan menggunakan SIPINTER sebagai referensi utama",
    },
    {
      id: 2,
      icon: <PiTimerDuotone className="text-orange-500 text-[64px]" />,
      description: "Mempercepat waktu pelayanan informasi investasi kepada investor dan masyarakat",
    },
    {
      id: 3,
      icon: <PiGlobeStandFill className="text-orange-500 text-[64px]" />,
      description: "Memperluas jangkauan promosi potensi investasi Kabupaten Bogor di tingkat lokal, nasional, hingga internasional",
    },
    {
      id: 4,
      icon: <PiThumbsUpDuotone className="text-orange-500 text-[64px]" />,
      description: "Membangun citra positif DPMPTSP sebagai lembaga yang responsif, transparan, dan pro-investasi",
    },
    {
      id: 5,
      icon: <PiChartLineDuotone className="text-orange-500 text-[64px]" />,
      description: "Menciptakan ekosistem investasi yang sehat, produktif, dan saling menguntungkan antara pemerintah, swasta, dan masyarakat",
    },
    {
      id: 6,
      icon: <PiArrowClockwiseDuotone className="text-orange-500 text-[64px]" />,
      description: "Memastikan pembaruan data dan informasi secara berkala agar selalu relevan dengan kebutuhan pengguna",
    },
    {
      id: 7,
      icon: <PiChatsCircleDuotone className="text-orange-500 text-[64px]" />,
      description: "Menyediakan fitur interaktif yang mempermudah investor untuk berkomunikasi langsung dengan pemerintah daerah terkait kebutuhan dan kendala investasi",
    },
  ];
  return (
    <div>
      <HeroTitlePage
        title="Peta Potensi Investasi Terpadu"
        description="Menghadirkan aplikasi SIPINTER sebagai platform digital yang efektif dan efisien untuk memperkuat komunikasi antara pemerintah, investor, dan masyarakat, menyediakan informasi lengkap terkait potensi dan peluang investasi di Kabupaten Bogor, serta mendukung terciptanya iklim investasi yang kondusif demi mendorong pertumbuhan ekonomi daerah dan kesejahteraan masyarakat."
        styleClass="bg-[linear-gradient(0deg,rgba(0,153,75,0)_0%,#00994B_100%)] opacity-5"
      />

      <section className="relative w-full ">
        <div className="max-w-7xl mx-auto px-4 md:px-0 pb-24">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.8 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
            <div className="justify-self-center">
              <Image src="/assets/PINTER.png" alt="Tentang Kami" width={400} height={83} className="w-[400px] object-cover" />
            </div>
            <div>
              <Image src="/assets/map-kab.png" alt="Tentang Kami" width={620} height={365} className="w-[620px] object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full">
        <div className="absolute bottom-0 left-0 w-full h-[960px] pointer-events-none bg-gradient-to-b from-[#00994B]/0 via-[#00994B]/50 to-[#00994B]/0 opacity-[0.1]" />
        <div className="max-w-7xl mx-auto px-4 md:px-0 pb-24">
          <div className="text-center pb-24">
            <h1 className="text-[32px] font-bold text-black leading-[120%]">Visi</h1>
            <p className="mt-10 text-[20px] font-medium text-black opacity-[0.4] leading-[120%]">Mendorong pertumbuhan ekonomi daerah dan kesejahteraan masyarakat.</p>
          </div>

          <div>
            <h1 className="text-[32px] font-bold text-black leading-[120%] text-center pb-10">Misi</h1>

            <MissionCard missions={missions} />
          </div>
        </div>
      </section>
    </div>
  );
}
