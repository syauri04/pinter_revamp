"use client";
import Image from "next/image";
import Link from "next/link";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <footer className={`relative w-full bg-[#fafafa] rounded-xl sm:rounded-t-[80px] overflow-hidden ${isHome ? "-mt-14" : ""}`}>
      <div className="max-w-4xl xl:max-w-7xl mx-auto py-14 px-6 lg:px-0">
        <div>
          <Image src="/assets/logo.png" alt="IBioFund" width={190} height={40} />
        </div>

        <div className="grid md:grid-cols-3 gap-14 md:gap-6 items-start mt-20">
          <div className="flex flex-col">
            <p className="font-medium text-[20px] text-black tracking-[-0.01em] leading-[120%]">Jalan Tegar Beriman, Tengah, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16914</p>
            <Link href="mailto:dpmptsp@bogorkab.go.id" className="mt-6 font-medium text-[20px] leading-[100%] text-[#00994B] underline">
              dpmptsp@bogorkab.go.id
            </Link>
          </div>

          <div className="flex md:justify-end">
            <ul className="space-y-4 text-left text-[20px] font-medium leading-[120%] tracking-[-0.01em]">
              <li>
                <Link href="/" className="text-black opacity-[0.4] hover:opacity-[1] transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="text-black opacity-[0.4] hover:opacity-[1] transition">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-black opacity-[0.4] hover:opacity-[1] transition">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black opacity-[0.4] hover:opacity-[1] transition">
                  Berita
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex md:justify-center">
            <ul className="space-y-4 text-left text-[20px] font-medium leading-[120%] tracking-[-0.01em]">
              <li>
                <Link href="https://bogorkab.go.id/" target="_blank" className="text-black opacity-[0.4] hover:opacity-[1] transition">
                  Bogorkab
                </Link>
              </li>
              <li>
                <Link href="https://optimis.bogorkab.go.id/" target="_blank" className="text-black opacity-[0.4] hover:opacity-[1] transition">
                  DPMPTSP
                </Link>
              </li>
              <li>
                <Link href="/" className="text-black opacity-[0.4] hover:opacity-[1] transition">
                  PINTER
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col text-base text-black opacity-[0.2]  py-4">
        <div className="flex space-x-4 space-y-5">
          <Link href="https://www.instagram.com/" target="_blank" className="hover:opacity-[1] transition">
            <AiFillInstagram size={39} />
          </Link>
          <Link href="https://www.youtube.com/" target="_blank" className="hover:opacity-[1] transition">
            <AiFillYoutube size={42} />
          </Link>
        </div>
        <span>© {new Date().getFullYear()} DPMPTSP PINTER - Kabupaten Bogor. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
