"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Kecamatan } from "@/services/kecamatan";
import { uppercaseFirst } from "@/utils/string";

interface BreadcumbKecProps {
  kecamatans: Kecamatan[];
  activeSlug: string;
}

const BreadcumbKec: React.FC<BreadcumbKecProps> = ({ kecamatans, activeSlug }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const selected = kecamatans.find((k) => k.slug === activeSlug) || kecamatans[0];

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    router.push(`/peta/${slug}`);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
      <div className="text-base md:text-xl font-medium leading-[120%] flex items-center gap-1 mb-4 md:mb-0">
        <span className="text-gray-400">Peta Potensi</span>
        <span className="text-gray-400">/</span>
        <span className="text-green-600 font-medium">Kabupaten Bogor</span>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-auto px-4 py-2 font-medium text-base md:text-xl text-black bg-white border border-gray-300 rounded-lg shadow-sm hover:border-green-500 transition"
        >
          {selected ? `Kec. ${uppercaseFirst(selected.title)}` : "Pilih Kecamatan"}
          <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded-md shadow-lg z-10 animate-in fade-in slide-in-from-top-1 duration-200">
            {kecamatans.map((k) => (
              <button key={k.id} onClick={() => handleSelect(k.slug)} className={`w-full text-left px-4 py-2 text-base md:text-lg hover:bg-green-50 ${selected?.id === k.id ? "text-green-600 font-medium" : "text-gray-700"}`}>
                {k.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadcumbKec;
