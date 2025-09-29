"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBeritaBySlug } from "@/services/berita";
import { BeritaItem, RichTextBlock } from "@/types/berita";
import { getStrapiMedia } from "@/utils/media";
import { motion, AnimatePresence } from "motion/react";

export default function BeritaDetailPage() {
  const { slug } = useParams();
  const slugStr = Array.isArray(slug) ? slug[0] : slug; // pastikan string
  const [berita, setBerita] = useState<BeritaItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slugStr) return;
    setLoading(true);
    fetchBeritaBySlug(slugStr)
      .then((res) => setBerita(res))
      .finally(() => setLoading(false));
  }, [slugStr]);

  const renderContent = (content: RichTextBlock[]) => {
    return content.map((block, idx) => {
      if (block.type === "paragraph") {
        return (
          <motion.p key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.4, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.05 }} className="mb-10 text-[20px] font-medium leading-[120%] text-black opacity-[0.4]">
            {block.children?.map((child) => child.text).join("")}
          </motion.p>
        );
      }

      if (block.type === "image" && block.image?.url) {
        return (
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="my-10">
            <Image src={getStrapiMedia(block.image.url)} alt={block.image.alternativeText || block.image.name} width={block.image.width} height={block.image.height} className="w-full h-auto rounded-xl" />
          </motion.div>
        );
      }

      return null;
    });
  };

  return (
    <section className="relative w-full pt-36 sm:pt-40 pb-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg, #FE9100 0%, rgba(254, 145, 0, 0) 100%)]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        <AnimatePresence>
          {loading ? (
            // Skeleton loading
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 animate-pulse">
              <div className="w-full h-[400px] bg-gray-200 rounded-xl" />
              <div className="h-8 w-3/4 bg-gray-300 rounded" />
              <div className="h-4 w-1/4 bg-gray-300 rounded" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-5 w-full bg-gray-200 rounded" />
              ))}
            </motion.div>
          ) : berita ? (
            <motion.div key={berita.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6">
              {/* Cover Image */}
              {berita.coverImage?.url && (
                <div className="w-full mb-8">
                  <Image src={getStrapiMedia(berita.coverImage.url)} alt={berita.title} width={1200} height={600} className="w-full h-auto rounded-xl sm:rounded-[30px] object-cover" />
                </div>
              )}

              {/* Title */}
              <h1 className="text-[32px] font-bold text-black leading-[120%] mb-5">{berita.title}</h1>

              {/* Date */}
              <p className="text-sm text-black opacity-[0.4] font-medium leading-[100%] mb-10">
                {new Date(berita.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              {/* Content */}
              <div>{berita.content && renderContent(berita.content)}</div>

              {/* Kategori */}
              {berita.kategori_berita && (
                <div className="mt-8 flex gap-3 flex-wrap">
                  <span className="px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">{berita.kategori_berita.kategori}</span>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="notfound" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 text-center text-black">
              Berita tidak ditemukan
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
