"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { PageHeader } from "@/components/catalog/PageHeader";
import { searchProducts } from "@/lib/catalog";

export function SearchResults() {
  const q = useSearchParams().get("q")?.trim() ?? "";
  const results = useMemo(() => searchProducts(q), [q]);

  return (
    <>
      <PageHeader
        title={q ? `Resultados para “${q}”` : "Buscar"}
        subtitle={
          q ? `${results.length} ${results.length === 1 ? "perfume encontrado" : "perfumes encontrados"}` : undefined
        }
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Buscar" }]}
      />
      {results.length > 0 ? (
        <CatalogView products={results} />
      ) : (
        <div className="py-16 text-center">
          <p className="text-gris">
            {q ? "No encontramos perfumes con esa búsqueda." : "Escribí el nombre de un perfume o una marca en el buscador."}
          </p>
          <p className="mt-2 text-sm text-gris">
            ¿Buscás uno que no está? Escribinos por WhatsApp y lo conseguimos.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/fragancias/masculinas" className="border border-verde px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-verde hover:bg-verde hover:text-crema">
              Masculinas
            </Link>
            <Link href="/fragancias/femeninas" className="border border-verde px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-verde hover:bg-verde hover:text-crema">
              Femeninas
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
