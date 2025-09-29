import { fetchFromStrapi } from "./strapi";
import { TentangKamiData, StrapiTentangKamiResponse } from "@/types/tentangKami";

export async function fetchTentangKami(): Promise<TentangKamiData> {
  const res = await fetchFromStrapi<StrapiTentangKamiResponse>("/tentang-kami?populate=*");

  if (!res.data) {
    throw new Error("Tentang Kami data not found");
  }

  return res.data;
}
