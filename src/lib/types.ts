export type ProductType = "arabe" | "disenador" | "nicho";
export type Gender = "masculino" | "femenino" | "unisex";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  type: ProductType;
  gender: Gender;
  concentration: string | null;
  size: string | null;
  isSet: boolean;
  priceUsd: number;
  /** Precio final en pesos (ya convertido con src/config/pricing.json). */
  price: number;
  image: string | null;
  /** Orden de relevancia dentro de la selección (menor = más destacado). */
  featured: number;
}
