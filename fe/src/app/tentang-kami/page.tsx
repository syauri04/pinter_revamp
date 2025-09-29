"use client";
import HeroTitlePage from "@/components/HeroTitlePage";
import MissionCard from "@/components/MissionCard";
import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import React from "react";

import { PiTreasureChestDuotone, PiTimerDuotone, PiGlobeStandFill, PiThumbsUpDuotone, PiChartLineDuotone, PiArrowClockwiseDuotone, PiChatsCircleDuotone } from "react-icons/pi";

import { fetchTentangKami } from "@/services/tentangKami";
import { TentangKamiData, MisiItem } from "@/types/tentangKami";
import SkeletonTentangKami from "@/components/SkeletonTentangKami";

const iconMap: Record<string, React.ReactNode> = {
  PiTreasureChestDuotone: <PiTreasureChestDuotone className="text-[#008BCC] text-[64px]" />,
  PiTimerDuotone: <PiTimerDuotone className="text-[#008BCC] text-[64px]" />,
  PiGlobeStandFill: <PiGlobeStandFill className="text-[#008BCC] text-[64px]" />,
  PiThumbsUpDuotone: <PiThumbsUpDuotone className="text-[#008BCC] text-[64px]" />,
  PiChartLineDuotone: <PiChartLineDuotone className="text-[#008BCC] text-[64px]" />,
  PiArrowClockwiseDuotone: <PiArrowClockwiseDuotone className="text-[#008BCC] text-[64px]" />,
  PiChatsCircleDuotone: <PiChatsCircleDuotone className="text-[#008BCC] text-[64px]" />,
};

export default function TentangKamiPage() {
  const [data, setData] = useState<TentangKamiData | null>(null);

  useEffect(() => {
    fetchTentangKami().then(setData).catch(console.error);
  }, []);

  if (!data) return <SkeletonTentangKami />;

  const missions: { id: number; icon: React.ReactNode; description: string }[] = data.contentMisi.map((item: MisiItem) => ({
    id: item.id,
    icon: iconMap[item.icon] || <PiTreasureChestDuotone className="text-orange-500 text-[64px]" />,
    description: item.misi,
  }));

  return (
    <div>
      <HeroTitlePage title={data.title} description={data.ringkasan} styleClass="bg-[linear-gradient(0deg,rgba(0,153,75,0)_0%,#00994B_100%)] opacity-5" />

      <section className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 lg:px-0 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 justify-center items-center"
          >
            <div className="justify-self-center">
              <Image src="/assets/logo.svg" alt="Tentang Kami" width={400} height={83} className="w-auto sm:w-[400px] object-cover" />
            </div>
            <div>
              <Image src="/assets/map-kab.png" alt="Tentang Kami" width={620} height={365} className="w-[620px] object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full">
        <div className="absolute bottom-0 left-0 w-full h-[960px] pointer-events-none bg-gradient-to-b from-[#00994B]/0 via-[#00994B]/50 to-[#00994B]/0 opacity-[0.1]" />
        <div className="max-w-7xl mx-auto px-4 lg:px-0 pb-24">
          <div className="text-center pb-24">
            <h1 className="text-[32px] font-bold text-black leading-[120%]">Visi</h1>
            <p className="mt-10 text-[20px] font-medium text-black opacity-[0.4] leading-[120%]">{data.visi}</p>
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
