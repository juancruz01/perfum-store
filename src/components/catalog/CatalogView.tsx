"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "../product/ProductCard";

export interface CategoryLink {
  label: string;
  href: string;
  count: number;
  active: boolean;
}

const SORTS = {
  relevancia: { label: "Más vendidos", fn: (a: Product, b: Product) => a.featured - b.featured },
  "precio-asc": { label: "Menor precio", fn: (a: Product, b: Product) => a.price - b.price },
  "precio-desc": { label: "Mayor precio", fn: (a: Product, b: Product) => b.price - a.price },
  nombre: {
    label: "Nombre (A-Z)",
    fn: (a: Product, b: Product) => `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`, "es"),
  },
} as const;
type SortKey = keyof typeof SORTS;

export function CatalogView({
  products,
  categoryLinks,
  emptyMessage = "No hay perfumes para mostrar con estos filtros.",
}: {
  products: Product[];
  categoryLinks?: CategoryLink[];
  emptyMessage?: string;
}) {
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Si cambia la lista (otra categoría o búsqueda) se limpian los filtros de marca.
  useEffect(() => {
    setBrands(new Set());
    setOnlyInStock(false);
  }, [products]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const brandCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0], "es"));
  }, [products]);

  const visible = useMemo(() => {
    const list = products.filter(
      (p) => (!brands.size || brands.has(p.brand)) && (!onlyInStock || p.stock === "inmediato"),
    );
    return [...list].sort(SORTS[sort].fn);
  }, [products, brands, onlyInStock, sort]);

  const inStockCount = products.filter((p) => p.stock === "inmediato").length;
  const activeFilters = brands.size + (onlyInStock ? 1 : 0);

  const toggleBrand = (brand: string) =>
    setBrands((prev) => {
      const next = new Set(prev);
      if (next.has(brand)) next.delete(brand);
      else next.add(brand);
      return next;
    });

  const filters = (
    <div className="space-y-9">
      {categoryLinks && (
        <div>
          <h2 className="font-serif text-lg text-verde-oscuro">Categorías</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {categoryLinks.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`flex justify-between py-1 transition-colors hover:text-bordo ${
                    c.active ? "font-semibold text-bordo" : "text-tinta/80"
                  }`}
                >
                  {c.label}
                  <span className="text-gris">{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="font-serif text-lg text-verde-oscuro">Disponibilidad</h2>
        <label className="mt-3 flex cursor-pointer items-center gap-2.5 py-1 text-sm text-tinta/80 hover:text-tinta">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="h-4 w-4 accent-[var(--verde)]"
          />
          <span className="flex-1">Solo en stock (entrega inmediata)</span>
          <span className="text-gris">{inStockCount}</span>
        </label>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-lg text-verde-oscuro">Marca</h2>
          {brands.size > 0 && (
            <button type="button" onClick={() => setBrands(new Set())} className="text-xs text-bordo underline">
              Limpiar
            </button>
          )}
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          {brandCounts.map(([brand, count]) => (
            <li key={brand}>
              <label className="flex cursor-pointer items-center gap-2.5 py-1 text-tinta/80 hover:text-tinta">
                <input
                  type="checkbox"
                  checked={brands.has(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="h-4 w-4 accent-[var(--verde)]"
                />
                <span className="flex-1">{brand}</span>
                <span className="text-gris">{count}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
      {/* Filtros de escritorio */}
      <aside className="hidden lg:block">{filters}</aside>

      <div>
        {/* Barra de herramientas */}
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-linea pb-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 border border-linea px-3.5 py-2 text-sm lg:hidden"
          >
            <SlidersHorizontal size={16} /> Filtrar
            {activeFilters > 0 && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-verde text-[11px] text-white">
                {activeFilters}
              </span>
            )}
          </button>
          <p className="hidden text-sm text-gris lg:block">
            {visible.length} {visible.length === 1 ? "perfume" : "perfumes"}
          </p>
          <label className="relative flex items-center gap-2 text-sm">
            <span className="hidden text-gris sm:inline">Ordenar por</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="appearance-none border border-linea bg-white py-2 pl-3.5 pr-9 text-sm focus:border-verde focus:outline-none"
            >
              {Object.entries(SORTS).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 text-gris" />
          </label>
        </div>

        {visible.length === 0 ? (
          <p className="py-20 text-center text-gris">{emptyMessage}</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        )}
      </div>

      {/* Filtros en celular */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtros">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-linea px-5 py-4">
              <p className="font-serif text-xl text-verde-oscuro">Filtros</p>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Cerrar filtros" className="p-1">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">{filters}</div>
            <div className="border-t border-linea p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full bg-verde py-3 text-xs font-semibold uppercase tracking-[0.18em] text-crema"
              >
                Ver {visible.length} {visible.length === 1 ? "perfume" : "perfumes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
