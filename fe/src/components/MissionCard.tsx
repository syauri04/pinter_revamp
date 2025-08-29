"use client";

import { ReactNode } from "react";
import { motion, Variants } from "motion/react";

interface MissionItem {
  id: number;
  icon: ReactNode;
  description: string;
}

interface MissionSectionProps {
  title?: string;
  missions: MissionItem[];
}

// Variants per row
const rowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }, // stagger card di row
};

// Variants per card
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function MissionCard({ missions }: MissionSectionProps) {
  // Pecah list jadi row 2-3-2-3 ...
  const groupedMissions: MissionItem[][] = [];
  let i = 0;

  while (i < missions.length) {
    const rowIndex = groupedMissions.length;
    const maxCols = rowIndex % 2 === 0 ? 2 : 3;
    groupedMissions.push(missions.slice(i, i + maxCols));
    i += maxCols;
  }

  return (
    <div className="flex flex-col gap-8">
      {groupedMissions.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          className={`grid gap-6 ${rowIndex % 2 === 0 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}
          variants={rowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // animasi saat row terlihat
        >
          {row.map((mission) => (
            <motion.div key={mission.id} variants={cardVariants} className="border border-[#00994B] rounded-[20px] p-6 flex flex-col">
              <div className="mb-24">{mission.icon}</div>
              <p className="text-[20px] font-bold leading-[120%] text-black">{mission.description}</p>
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
