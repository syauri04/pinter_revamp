"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react"; // gunakan icon lucide

const BreadcumbKec = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Kec. Sukamakmur");

  const kecamatan = ["Kec. Sukamakmur", "Kec. Cibinong", "Kec. Citeureup", "Kec. Cileungsi"];

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full max-w-7xl mx-auto px-4 xl:px-0 py-8">
      {/* Breadcrumb */}
      <div className="text-base md:text-xl font-medium leading-[120%] flex items-center gap-1 mb-4 md:mb-0">
        <span className="text-gray-400">Peta Potensi</span>
        <span className="text-gray-400">/</span>
        <span className="text-green-600 font-medium">Kabupaten Bogor</span>
      </div>

      {/* Custom Select */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-auto px-4 py-2  font-medium text-base md:text-xl text-black bg-white border border-gray-300 rounded-lg shadow-sm hover:border-green-500 transition"
        >
          {selected}
          <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded-md shadow-lg z-10
            animate-in fade-in slide-in-from-top-1 duration-200"
          >
            {kecamatan.map((item) => (
              <button key={item} onClick={() => handleSelect(item)} className={`w-full text-left px-4 py-2 text-base md:text-lg hover:bg-green-50 ${item === selected ? "text-green-600 font-medium" : "text-gray-700"}`}>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadcumbKec;
