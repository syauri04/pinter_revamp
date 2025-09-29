// components/SkeletonKecamatanDetail.tsx
"use client";

import { motion } from "motion/react";

export default function SkeletonKec() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 xl:px-0 py-14 md:py-16 items-start">
          {/* Left Side */}
          <div className="order-2 sm:order-1">
            <div className="h-12 md:h-20 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-6" />
            <div className="h-5 md:h-7 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-10" />

            <div className="flex space-x-4 mt-14">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Right Side (Map placeholder) */}
          <div className="flex justify-center lg:justify-end order-1 sm:order-2">
            <div className="w-[580px] h-[365px] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative w-full py-10">
        <div className="flex space-x-6 overflow-x-auto px-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-[300px] sm:w-[500px] lg:w-[840px] h-[171px] sm:h-[285px] lg:h-[480px] bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse flex-shrink-0"
            />
          ))}
        </div>

        {/* Potensi Section */}
        <div className="container max-w-7xl mx-auto relative px-4 xl:px-0 py-24 z-40">
          <div className="h-10 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
