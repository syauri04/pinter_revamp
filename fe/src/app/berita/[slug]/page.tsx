"use client";

import Image from "next/image";

export default function BeritaDetailPage() {
  return (
    <section className="relative w-full pt-40 pb-24">
      <div className={`absolute inset-0 bg-[linear-gradient(180deg, #FE9100 0%, rgba(254, 145, 0, 0) 100%)]`}></div>

      <div className="max-w-4xl mx-auto px-8 relative z-10">
        {/* Cover Image */}
        <div className="w-full mb-8">
          <Image src="/assets/galeri1.jpg" alt="Peta Potensi Investasi Terpadu" width={1200} height={600} className="w-full h-auto rounded-[30px] object-cover" />
        </div>

        {/* Title */}
        <h1 className="text-[32px] font-bold text-black leading-[120%] mb-5">Peta Potensi Investasi Terpadu</h1>

        {/* Date */}
        <p className="text-sm text-black opacity-[0.4] font-medium leading-[100%] mb-10">14 Jul 2023</p>

        {/* Content */}
        <div className="text-[20px] font-medium leading-[120%] text-black opacity-[0.4]">
          <p>
            Berkasca dalam rangka mewujudkan pelayanan prima di Kabupaten Bogor yang masih diharapkan dengan berbagai realita dimana potret penyelengara pelayanan masih dirasakan belum optimal dan belum memperlihatkan pelayanan prima yang
            diharapkan. Maka Pemerintahan Kabupaten Bogor perlu melakukan langkah reformasi terhadap sejumlah kebijakan, perbaikan kebijakan dimaksud merupakan langkah strategis dalam upaya penyelenggaraan pelayanan publik yang prima.
          </p>
          <br />
          <br />
          <p>
            Dalam rangka menigkatkan pelayanan kepada masyarakat, Pemerintahan Kabupaten Bogor membentuk Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu (DPMPTSP). Melalui Dinas ini diharapkan pelayanan perizinan dilaksanakan sesuai
            dengan asas. Kepastian hukum, tertib penyelenggaraan negara, kepentingan umum, keterbukaan, proporsionalitas, akuntabilitas, efesiensi dan efektivitas. Pembentukan Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu
            diharapkan pula dapat menciptakan iklim yang mendorong kearah terciptanya keseragaman pola dan langkah penyelenggaraan dan pelayanan oleh aparatur pemerintah pada masyarakat serta adanya keterpaduan koordinasi dalam proses
            pemberian dokumen perizinan.
          </p>
          <br />
          <br />
          <p>Pelayanan pada Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu menguntut pada kaidah-kaidah kesederhanaan, kejelasan, dan kepastian, keamanan, keterbukaan, efisiensi ekonomi, dan keadilan serta wajar.</p>
        </div>

        {/* Tags */}
        <div className="mt-8 flex gap-3 flex-wrap">
          <span className="px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">Investasi</span>
        </div>
      </div>
    </section>
  );
}
