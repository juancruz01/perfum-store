import Link from "next/link";
import { site } from "@/config/site";
import { TYPE_LABELS } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "./AddToCartButton";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const href = `/perfume/${product.slug}`;
  const details = [product.concentration, product.size].filter(Boolean).join(" · ");

  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-crema">
        <ProductImage
          product={product}
          priority={priority}
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-verde-oscuro backdrop-blur">
          {TYPE_LABELS[product.type].replace(/s$/, "")}
        </span>
        {product.price >= site.freeShippingFrom && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-oro px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-verde-oscuro">
            Envío gratis
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-3">
        <Link href={href} className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-bordo">{product.brand}</p>
          <h3 className="mt-1 font-medium leading-snug text-tinta group-hover:text-verde">{product.name}</h3>
          {details && <p className="mt-0.5 text-xs text-gris">{details}</p>}
        </Link>
        <p className="mt-2 text-lg font-semibold text-verde-oscuro">{formatPrice(product.price)}</p>
        <AddToCartButton slug={product.slug} className="mt-3 w-full py-2.5 text-[11px]" />
      </div>
    </article>
  );
}
