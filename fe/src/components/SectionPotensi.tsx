"use client";

import Image from "next/image";
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, LabelList } from "recharts";
import { motion, useInView, animate, useMotionValue } from "motion/react";
import { useRef, useEffect, useState } from "react";
// ---------- CONFIG ----------
const COLOR_PMDN = "#00994B"; // PMDN
const COLOR_PMA = "#FE9100"; // PMA

// Source numbers (dummy data, bisa ganti dengan API)
const PMA_VALUE = 8_274_598_071_194;
const PMDN_VALUE = 14_632_961_355_632;
const TOTAL = PMA_VALUE + PMDN_VALUE;

const donutData = [
  { name: "PMDN", value: PMDN_VALUE, color: COLOR_PMDN },
  { name: "PMA", value: PMA_VALUE, color: COLOR_PMA },
];

const lineData = [
  { year: 2025, target: 22.9 },
  { year: 2026, target: 22.91 },
  { year: 2027, target: 22.92 },
  { year: 2028, target: 22.93 },
  { year: 2029, target: 22.94 },
];

// ---------- UTILS ----------
const nfmt = new Intl.NumberFormat("en-US");
const formatRupiah = (n: number) => `Rp${nfmt.format(n)}`;

// Types for custom renderers
type PieLabelProps = {
  cx: number;
  cy: number;
  midAngle?: number;
  innerRadius: number;
  outerRadius: number;
  percent?: number; // <-- ubah jadi optional
  name?: string;
  fontSize?: number;
};

// Custom label inside pie chart
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle = 0, innerRadius, outerRadius, percent = 0, name, fontSize = 14 }: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={fontSize} fontWeight={600}>
      {`${name} ${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

const PILL_W = 20;
const PILL_H = 24;
const GAP = 12;

interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: { value: number }[];
  label?: string | number;
}

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "8px 12px",
          borderRadius: "6px",
          color: "#000",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        <p style={{ margin: 0 }}>Tahun {label}</p>
        <p style={{ margin: 0 }}>{payload[0].value?.toFixed(2)} T</p>
      </div>
    );
  }
  return null;
};

// ---------- COMPONENT ----------
export default function SectionPotensi() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  // motion value
  const mvEndAngle = useMotionValue(90);

  // state untuk trigger re-render
  const [endAngle, setEndAngle] = useState(90);

  useEffect(() => {
    // update state setiap kali motion value berubah
    const unsubscribe = mvEndAngle.on("change", (v) => setEndAngle(v));

    if (isInView) {
      animate(mvEndAngle, 450, {
        duration: 1.2,
        ease: "easeOut",
      });
    }

    return () => unsubscribe();
  }, [isInView, mvEndAngle]);

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current.offsetWidth);
      const handleResize = () => setContainerWidth(ref.current?.offsetWidth || 0);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const outerRadius = containerWidth ? containerWidth * 0.3 : 190;
  const fontSize = containerWidth ? Math.max(containerWidth * 0.03, 12) : 20;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 xl:px-0 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-10">
          {/* LEFT: Pie Chart */}
          <div>
            <h2 className="text-2xl sm:text-[32px] font-bold tracking-[-0.01em] text-black leading-[100%]">Realisasi Investasi Kabupaten Bogor</h2>
            <p className="text-base sm:text-[20px] tracking-[-0.01em] text-black leading-[100%] opacity-[0.4] mt-3.5">Januari s/d Desember 2024</p>

            <div className="mt-6 rounded-2xl px-0 sm:px-6">
              <motion.div ref={ref} className="h-[400px] md:h-[420px] lg:h-[400px] w-full" initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: "easeOut" }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={donutData} dataKey="value" nameKey="name" outerRadius={outerRadius} startAngle={90} endAngle={endAngle} labelLine={false} label={(props) => renderCustomizedLabel({ ...props, fontSize })}>
                      {donutData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Legend & values */}
              <div className="mt-6 space-y-10">
                {/* PMA */}
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 rounded-full" style={{ backgroundColor: COLOR_PMA }} />
                  <div>
                    <p className="text-base font-bold text-black tracking-[-0.01em]">PMA</p>
                    <p className="text-sm text-medium text-black opacity-[0.4] tracking-[-0.01em] -mt-0.5">Penanaman Modal Asing</p>
                    <p className="text-xl sm:text-2xl font-bold text-black tracking-[-0.01em] mt-1">{formatRupiah(PMA_VALUE)}</p>
                  </div>
                </div>
                {/* PMDN */}
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 rounded-full" style={{ backgroundColor: COLOR_PMDN }} />
                  <div>
                    <p className="text-base font-bold text-black tracking-[-0.01em]">PMDN</p>
                    <p className="text-sm text-medium text-black opacity-[0.4] tracking-[-0.01em] -mt-0.5">Penanaman Modal Dalam Negeri</p>
                    <p className="text-xl sm:text-2xl font-bold text-black tracking-[-0.01em] mt-1">{formatRupiah(PMDN_VALUE)}</p>
                  </div>
                </div>
                <div className="pt-2 ">
                  <p className="text-base font-bold text-black tracking-[-0.01em]">Total</p>
                  <p className="text-2xl sm:text-[32px] font-bold text-black tracking-[-0.01em]">{formatRupiah(TOTAL)}</p>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-medium text-black opacity-[0.4] tracking-[-0.01em]">Sumber: Data Perkembangan Realisasi Investasi PMA dan PMDN Periode Laporan Januari-Desember 2024, DPMPTSP Provinsi Jawa Barat</p>\
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Line chart */}
          <div>
            <h2 className="text-2xl sm:text-[32px] font-bold tracking-[-0.01em] text-black leading-[100%]">Tujuan Perangkat Daerah DPMPTSP</h2>
            <p className="text-base sm:text-[20px] tracking-[-0.01em] text-black leading-[100%] opacity-[0.4] mt-3.5">“Meningkatnya Perolehan Nilai Investasi”</p>

            <div className="mt-6 p-0 md:p-6">
              {/* Tahun pills */}
              <div className="flex items-center gap-4 xl:gap-8 text-base font-bold text-black tracking-[-0.01em]">
                <span className="shrink-0">Tahun</span>
                <div className="flex gap-2.5 xl:gap-5">
                  {lineData.map((d) => (
                    <span key={d.year} className="inline-flex items-center text-white font-bold text-sm xl:text-xl bg-[#FE9100] justify-center rounded-full px-3 sm:px-4 py-[4px] sm:py-[8px]">
                      {d.year}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="text-base font-bold text-black tracking-[-0.01em] pt-2">
                  Target
                  <br />
                  Investasi
                </div>
                <div className="h-[240px] w-full">
                  <ResponsiveContainer>
                    <LineChart
                      data={lineData}
                      margin={{
                        top: PILL_H + GAP,
                        bottom: PILL_H / 2 + GAP,
                        left: PILL_W / 2 + 10,
                        right: PILL_W / 2 + 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="year"
                        tick={false}
                        axisLine={false}
                        tickLine={false}
                        padding={{
                          left: PILL_W / 2 + 4,
                          right: PILL_W / 2 + 4,
                        }}
                      />
                      <YAxis type="number" hide domain={["dataMin - 0.05", "dataMax + 0.05"]} />
                      <Tooltip content={<CustomTooltip />} />

                      <Line
                        type="linear"
                        dataKey="target"
                        stroke="#111827"
                        strokeWidth={2}
                        dot={{
                          r: 4,
                          strokeWidth: 2,
                          fill: "#111827",
                          stroke: "#fff",
                        }}
                        activeDot={{ r: 6 }}
                      >
                        <LabelList
                          dataKey="target"
                          content={({ x, y, value }) => {
                            if (x == null || y == null || value == null) return null;
                            return (
                              <g>
                                {/* Nilai di bawah titik (hijau) */}
                                <text x={x} y={Number(y) + (PILL_H / 2 + GAP)} textAnchor="middle" fill="#00994B" fontSize={12} fontWeight={600}>
                                  {Number(value).toFixed(2)} T
                                </text>
                              </g>
                            );
                          }}
                        />
                      </Line>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <p className="text-sm text-black opacity-[0.4] tracking-[-0.01em] mt-2">Indikator: Nilai investasi</p>

              {/* Logos */}
              <div className="mt-18 flex items-center gap-6">
                <Image src="/assets/logo-kab.png" alt="Bogor" width={64} height={74} className="h-[74px] w-auto object-contain" />
                <Image src="/assets/logo-dpmptsp.png" alt="DPMPTSP" width={160} height={87} className="h-[87px] w-auto object-contain" />
                <Image src="/assets/logo-mpp.png" alt="MPP" width={128} height={85} className="h-[85px] w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
