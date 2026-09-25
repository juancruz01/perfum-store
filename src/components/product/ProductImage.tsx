import Image from "next/image";
import type { Product } from "@/lib/types";

/**
 * Foto del perfume. Mientras no haya foto (etapa 6) muestra un frasco
 * ilustrado con la marca, con el mismo estilo para todo el catálogo.
 */
export function ProductImage({
  product,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
  className = "",
}: {
  product: Pick<Product, "image" | "brand" | "name" | "type">;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={`${product.brand} ${product.name}`}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-contain p-4 ${className}`}
      />
    );
  }

  const accent = product.type === "arabe" ? "var(--oro)" : product.type === "nicho" ? "var(--bordo)" : "var(--verde)";

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-crema to-[#ece4d5] ${className}`}
      role="img"
      aria-label={`${product.brand} ${product.name}`}
    >
      <svg viewBox="0 0 60 84" className="h-2/5 w-auto drop-shadow-md" aria-hidden="true">
        <rect x="22" y="2" width="16" height="10" rx="1.5" fill={accent} />
        <rect x="27" y="12" width="6" height="8" fill={accent} opacity="0.85" />
        <rect x="4" y="20" width="52" height="62" rx="7" fill="#fff" stroke={accent} strokeWidth="2.5" />
        <rect x="14" y="40" width="32" height="22" rx="2" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.6" />
      </svg>
      <span className="px-3 text-center font-serif text-sm italic text-tinta/60">{product.brand}</span>
    </div>
  );
}
