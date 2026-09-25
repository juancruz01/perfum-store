import data from "@/data/products.json";
import type { Gender, Product, ProductType } from "./types";

export const products = data as Product[];

/** Segmentos de URL -> valores del catálogo */
export const GENDER_SLUGS = { masculinas: "masculino", femeninas: "femenino" } as const;
export const TYPE_SLUGS = { arabes: "arabe", disenador: "disenador", nicho: "nicho" } as const;

export type GenderSlug = keyof typeof GENDER_SLUGS;
export type TypeSlug = keyof typeof TYPE_SLUGS;

export const TYPE_LABELS: Record<ProductType, string> = {
  arabe: "Árabes",
  disenador: "Diseñador",
  nicho: "Nicho",
};

export const GENDER_LABELS: Record<Gender, string> = {
  masculino: "Masculino",
  femenino: "Femenino",
  unisex: "Unisex",
};

export function productTitle(p: Pick<Product, "brand" | "name">) {
  return `${p.brand} ${p.name}`;
}

/** Los unisex aparecen tanto en masculinas como en femeninas. */
export function getProducts({ gender, type }: { gender?: Gender; type?: ProductType } = {}) {
  return products.filter(
    (p) =>
      (!gender || p.gender === gender || p.gender === "unisex") && (!type || p.type === type),
  );
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/** Búsqueda simple: todas las palabras deben aparecer en marca + nombre. */
export function searchProducts(query: string, list: Product[] = products) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return list.filter((p) => {
    const haystack = normalize(`${p.brand} ${p.name} ${p.concentration ?? ""}`);
    return terms.every((t) => haystack.includes(t));
  });
}
