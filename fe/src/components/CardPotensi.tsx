// components/InvestmentCard.tsx
"use client";

import Image from "next/image";

type InvestmentCardProps = {
  title: string;
  icon: string; // path image (png/svg)
  variant: "orange" | "green";
};

const colors = {
  orange: {
    border: "border-[#FE9100]",
    text: "text-[#FE9100]",
    circle: "bg-[#FE9100]",
    bgcolor: "bg-[#FE91000D]",
  },
  green: {
    border: "border-[#00994B]",
    text: "text-[#00994B]",
    circle: "bg-[#00994B]",
    bgcolor: "bg-[#00994B0D]",
  },
};

export default function CardPotensi({ title, icon, variant }: InvestmentCardProps) {
  const color = colors[variant];

  return (
    <div className={`relative flex flex-col justify-between p-4 rounded-[20px] border-2 ${color.bgcolor} ${color.border} min-h-[240px] transition-colors duration-300 hover:bg-white cursor-pointer`}>
      {/* Title */}
      <h3 className={`text-xl sm:text-[32px] font-bold tracking-[-0.01em] leading-[100%] ${color.text}`}>{title}</h3>

      {/* Icon */}
      <div className="absolute bottom-4 left-4">
        <div className={`w-[72px] h-[72px] flex items-center justify-center rounded-full ${color.circle}`}>
          <Image src={icon} alt={title} width={48} height={48} />
        </div>
      </div>
    </div>
  );
}
