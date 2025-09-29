// components/InvestmentCard.tsx
"use client";
import { ReactNode } from "react";

type InvestmentCardProps = {
  title: string;
  icon: ReactNode;
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
    border: "border-[#008BCC]",
    text: "text-[#008BCC]",
    circle: "bg-[#008BCC]",
    bgcolor: "bg-[#008BCC0D]",
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
        <div className={`w-[72px] h-[72px] flex items-center justify-center rounded-full ${color.circle}`}>{icon}</div>
      </div>
    </div>
  );
}
