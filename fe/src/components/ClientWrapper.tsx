"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Navbar selalu ada */}
      <Navbar />

      {/* Halaman */}
      {children}

      {/* Footer kecuali di /peta */}
      {!pathname?.startsWith("/peta") && <Footer />}
    </>
  );
}
