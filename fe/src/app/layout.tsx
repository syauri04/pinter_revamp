import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rethink-sans",
});

export const metadata: Metadata = {
  title: "PINTER",
  description: "Peta Potensi Investasi Terpadu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rethinkSans.variable} antialiased bg-white`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
