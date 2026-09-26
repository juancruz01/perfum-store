import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { GENDER_SLUGS, TYPE_SLUGS, products } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const categories = Object.keys(GENDER_SLUGS).flatMap((g) => [
    `/fragancias/${g}`,
    ...Object.keys(TYPE_SLUGS).map((t) => `/fragancias/${g}/${t}`),
  ]);
  return [
    { url: url("/"), priority: 1 },
    ...categories.map((c) => ({ url: url(c), priority: 0.8 })),
    ...products.map((p) => ({ url: url(`/perfume/${p.slug}`), priority: 0.6 })),
    { url: url("/preguntas-frecuentes"), priority: 0.4 },
    { url: url("/arrepentimiento"), priority: 0.1 },
  ];
}
