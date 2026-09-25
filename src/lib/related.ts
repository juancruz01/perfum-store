import { productInfo } from "@/data/product-info";
import { products } from "./catalog";
import type { Product } from "./types";

const compatibleGender = (a: Product, b: Product) =>
  a.gender === b.gender || a.gender === "unisex" || b.gender === "unisex";

/**
 * Perfumes parecidos: comparten familias olfativas y son del mismo género
 * (o unisex). Entre iguales, se priorizan los más vendidos.
 */
export function getRelated(product: Product, limit = 4): Product[] {
  const info = productInfo[product.slug];
  const families = new Set(info?.f ?? []);
  return products
    .filter((p) => p.slug !== product.slug && compatibleGender(product, p))
    .map((p) => {
      const other = productInfo[p.slug];
      const shared = (other?.f ?? []).filter((f) => families.has(f)).length;
      const sameType = p.type === product.type ? 0.5 : 0;
      // Mismo perfume de inspiración (ej. dos alternativas de Creed Aventus)
      const sameInspiration = info?.i && other?.i === info.i ? 3 : 0;
      return { p, score: shared * 2 + sameType + sameInspiration };
    })
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score || a.p.featured - b.p.featured)
    .slice(0, limit)
    .map((x) => x.p);
}
