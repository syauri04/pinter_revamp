"use client";

import { ReactNode } from "react";
import * as PiIcons from "react-icons/pi";
import type { IconType } from "react-icons";

interface PotensiRingkasan {
  id: number;
  ringkasan: string;
}

interface PotensiInvestasi {
  id: number;
  title: string;
  icon: string;
}

export interface PotensiKecamatan {
  id: number;
  potensi_investasi: PotensiInvestasi;
  potensiRingkasan: PotensiRingkasan[];
}

interface CardGridKecProps {
  potensi: PotensiKecamatan[];
}

// Fungsi untuk mapping string ke icon react-icons/pi
function getIconComponent(name: string): ReactNode {
  const Icon = (PiIcons as Record<string, IconType>)[name];
  if (!Icon) return <span className="w-8 h-8 bg-gray-300 rounded" />;
  return <Icon className="text-orange-500 text-2xl" />;
}

export default function CardGridKec({ potensi }: CardGridKecProps) {
  if (!potensi || potensi.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 space-y-8">
        {potensi.map((item) => (
          <div key={item.id} className="bg-white rounded-[20px] shadow-lg p-6 flex flex-col">
            {/* Header: Icon + Title */}
            <div className="flex items-center gap-4 mb-8">
              {getIconComponent(item.potensi_investasi.icon)}
              <h3 className="font-bold text-xl leading-[100%] text-black">{item.potensi_investasi.title}</h3>
            </div>

            {/* Content */}
            {item.potensiRingkasan.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2 text-black opacity-[0.4] text-base leading-[120%]">
                {item.potensiRingkasan.map((r) => (
                  <li key={r.id}>{r.ringkasan}</li>
                ))}
              </ul>
            ) : (
              <p className="text-black opacity-[0.4] text-base leading-[120%]">-</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
