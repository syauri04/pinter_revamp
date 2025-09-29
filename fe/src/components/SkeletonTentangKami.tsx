"use client";
import { motion } from "motion/react";

export default function SkeletonTentangKami() {
  return (
    <div className="animate-pulse">
      {/* Hero */}
      <section className="w-full bg-gray-200 h-[200px] md:h-[300px] mb-24 rounded-md"></section>

      {/* Images */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 max-w-7xl mx-auto px-4 lg:px-0 pb-24">
        <div className="w-full h-[83px] md:h-[100px] bg-gray-200 rounded-md"></div>
        <div className="w-full h-[365px] bg-gray-200 rounded-md"></div>
      </section>

      {/* Visi */}
      <section className="max-w-7xl mx-auto px-4 lg:px-0 pb-24 text-center">
        <div className="mb-10">
          <div className="w-40 h-8 bg-gray-200 mx-auto rounded-md mb-4"></div>
          <div className="w-full md:w-2/3 h-6 bg-gray-200 mx-auto rounded-md"></div>
        </div>

        {/* Misi */}
        <div>
          <div className="w-48 h-8 bg-gray-200 mx-auto rounded-md mb-10"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 bg-gray-200 rounded-md space-y-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
