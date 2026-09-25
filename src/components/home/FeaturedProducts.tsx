import Link from "next/link";
import { getProducts } from "@/lib/catalog";
import { ProductCard } from "../product/ProductCard";

/** Los primeros de la selección (más vendidos), mezclando árabes y diseñador. */
function pickFeatured(perType = 4) {
  const top = (type: "arabe" | "disenador") =>
    getProducts({ type })
      .sort((a, b) => a.featured - b.featured)
      .slice(0, perType);
  const arabes = top("arabe");
  const disenador = top("disenador");
  return arabes.flatMap((p, i) => [p, disenador[i]].filter(Boolean));
}

export function FeaturedProducts() {
  const products = pickFeatured();
  return (
    <section className="container-page py-14 md:py-20" aria-labelledby="destacados">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bordo">Lo que todos buscan</p>
          <h2 id="destacados" className="mt-2 font-serif text-3xl text-verde-oscuro md:text-4xl">
            Los más vendidos
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/fragancias/masculinas"
          className="border border-verde px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-verde transition-colors hover:bg-verde hover:text-crema"
        >
          Ver masculinas
        </Link>
        <Link
          href="/fragancias/femeninas"
          className="border border-verde px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-verde transition-colors hover:bg-verde hover:text-crema"
        >
          Ver femeninas
        </Link>
      </div>
    </section>
  );
}
