"use client";

import React from "react";

import { motion } from "motion/react";

interface HeroSectionProps {
  title: string;
  description: string;
  styleClass?: string;
}

const HeroTitlePage: React.FC<HeroSectionProps> = ({ title, description, styleClass }) => {
  return (
    <section className={`relative w-full pt-36 md:pt-40 pb-24 text-center`}>
      <div className={`absolute inset-0 ${styleClass}`}></div>

      <motion.div className="max-w-4xl mx-auto px-6 relative z-10" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <h1 className="text-[37px] md:text-[56px] font-bold text-black leading-[120%] mb-6">{title}</h1>
        <p className="text-base md:text-[20px] font-medium text-black opacity-[0.4] leading-[120%]">{description}</p>
      </motion.div>
    </section>
  );
};

export default HeroTitlePage;
