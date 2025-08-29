"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Galeri", href: "/galeri" },
    { name: "Berita", href: "/berita" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isPetaPage = pathname?.startsWith("/peta");
  const isPetaRoot = pathname === "/peta";
  const isPetaSlug = /^\/peta\/[^/]+$/.test(pathname ?? "");

  return (
    <header
      className={`w-full z-40 transition-all duration-300 
        ${isPetaPage ? "relative bg-white" : "fixed"} 
        ${!isPetaPage && (isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-transparent")}
      `}
    >
      <div className={`${isPetaRoot ? "max-w-full px-4" : "max-w-7xl px-4 xl:px-0"} mx-auto flex items-center justify-between py-4`}>
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image src="/assets/logo.png" alt="PINTER Logo" width={167} height={35} />
          </Link>
          <Image src="/assets/logo-kab.png" alt="Logo Kabupaten" width={41} height={48} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {!isPetaPage && (
            <>
              {menus.map((menu) => {
                const isActive = pathname === menu.href;
                return (
                  <Link key={menu.href} href={menu.href} className={`transition ${isActive ? "text-[#00994B] font-bold" : "text-black opacity-40 font-medium hover:text-[#00994B]"}`}>
                    {menu.name}
                  </Link>
                );
              })}
            </>
          )}

          {/* Tombol Lihat Peta */}
          {isPetaRoot ? (
            <Link href="/" className="border border-[#00994B] hover:bg-[#00994B] hover:text-white text-[#00994B] px-4 py-3 rounded-2xl font-bold transition">
              Beranda
            </Link>
          ) : isPetaSlug ? (
            <Link href="/peta" className="border border-[#00994B] hover:bg-[#00994B] hover:text-white text-[#00994B] px-4 py-3 rounded-2xl font-bold transition">
              Kembali ke Peta
            </Link>
          ) : (
            <Link href="/peta" className="bg-[#004D26] hover:bg-[#02331a] text-white px-4 py-3 rounded-2xl font-bold transition">
              Peta Potensi
            </Link>
          )}

          {/* Language Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 border px-4 py-3 rounded-3xl hover:bg-gray-100" onClick={() => setLang(lang === "id" ? "en" : "id")}>
              <Image src={lang === "id" ? "/assets/flag-id.png" : "/assets/flag-en.png"} alt="flag" width={20} height={20} className="rounded-full" />
              <span className="text-base font-medium text-black">{lang === "id" ? "ID" : "EN"}</span>
              <ChevronRight size={18} className=" text-black" />
            </button>
          </div>
        </nav>

        {/* Mobile Hamburger */}

        {isPetaRoot ? (
          <Link href="/" onClick={() => setIsOpen(false)} className="lg:hidden border border-[#00994B] hover:bg-[#00994B] hover:text-white text-[#00994B] px-6 py-3 rounded-2xl font-bold transition">
            Beranda
          </Link>
        ) : isPetaSlug ? (
          <Link href="/peta" onClick={() => setIsOpen(false)} className="lg:hidden border border-[#00994B] hover:bg-[#00994B] hover:text-white text-[#00994B] px-6 py-3 rounded-2xl font-bold transition">
            Kembali ke Peta
          </Link>
        ) : (
          <button className="lg:hidden flex items-center justify-center p-2" onClick={() => setIsOpen(true)}>
            <Menu size={28} className="text-black" />
          </button>
        )}
      </div>

      {/* Mobile Fullscreen Menu */}
      <div className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-8 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Close Button */}
        <button className="absolute top-6 right-6 p-2" onClick={() => setIsOpen(false)}>
          <X size={32} className="text-black" />
        </button>

        {/* Nav Links */}

        {menus.map((menu) => {
          const isActive = pathname === menu.href;
          return (
            <Link key={menu.href} href={menu.href} onClick={() => setIsOpen(false)} className={`text-2xl transition ${isActive ? "text-[#00994B] font-bold" : "text-black opacity-70 hover:text-[#00994B]"}`}>
              {menu.name}
            </Link>
          );
        })}

        {/* Tombol Lihat Peta */}
        <Link href="/peta" onClick={() => setIsOpen(false)} className="bg-[#004D26] hover:bg-[#02331a] text-white px-6 py-3 rounded-2xl font-bold transition">
          Peta Potensi
        </Link>

        {/* Language Switch */}
        <button onClick={() => setLang(lang === "id" ? "en" : "id")} className="flex items-center gap-2 border px-6 py-3 rounded-3xl hover:bg-gray-100">
          <Image src={lang === "id" ? "/assets/flag-id.png" : "/assets/flag-en.png"} alt="flag" width={24} height={24} className="rounded-full" />
          <span className="text-lg font-medium text-black">{lang === "id" ? "ID" : "EN"}</span>
          <ChevronRight size={20} className=" text-black" />
        </button>
      </div>
    </header>
  );
}
