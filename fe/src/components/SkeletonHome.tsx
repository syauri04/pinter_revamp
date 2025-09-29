"use client";

export default function SkeletonHome() {
  return (
    <main className="space-y-24">
      {/* Hero */}
      <section className="w-full h-[300px] md:h-[400px] bg-gray-200 animate-pulse rounded-md"></section>

      {/* Section Potensi */}
      <section className="max-w-7xl mx-auto px-4 xl:px-0 py-16 sm:py-24 space-y-6">
        <div className="h-10 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-6 w-full md:w-2/3 bg-gray-200 rounded-md animate-pulse"></div>
      </section>

      {/* Section Potensi Grid */}
      <section className="max-w-7xl mx-auto px-4 xl:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
      </section>

      {/* Berita Section */}
      <section className="max-w-7xl mx-auto px-4 xl:px-0 py-24 space-y-6">
        <div className="h-10 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
      </section>
    </main>
  );
}
