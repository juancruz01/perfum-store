"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { productTitle, searchProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

const MAX_RESULTS = 6;

export function SearchBox({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapper = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = useMemo(() => searchProducts(query), [query]);
  const visible = results.slice(0, MAX_RESULTS);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const close = () => {
    setOpen(false);
    setActive(-1);
    onNavigate?.();
  };

  const goToResults = () => {
    if (!query.trim()) return;
    router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
    close();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, visible.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && visible[active]) {
        router.push(`/perfume/${visible[active].slug}`);
        setQuery("");
        close();
      } else {
        goToResults();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showPanel = open && query.trim().length > 0;

  return (
    <div ref={wrapper} className={`relative ${className}`}>
      <div className="flex items-center border border-white/30 bg-white/5 transition-colors focus-within:border-oro">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Buscar perfumes, marcas…"
          aria-label="Buscar perfumes"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          className="w-full bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-white/55 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="px-1 text-white/60 hover:text-white"
            aria-label="Borrar búsqueda"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="button"
          onClick={goToResults}
          className="px-3 text-white/80 hover:text-oro"
          aria-label="Buscar"
        >
          <Search size={18} />
        </button>
      </div>

      {showPanel && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 border border-linea bg-white text-tinta shadow-xl">
          {visible.length === 0 ? (
            <p className="px-4 py-5 text-sm text-gris">
              No encontramos perfumes para “{query}”.
            </p>
          ) : (
            <ul id={listId} role="listbox">
              {visible.map((p, i) => (
                <li key={p.id} role="option" aria-selected={i === active}>
                  <Link
                    href={`/perfume/${p.slug}`}
                    onClick={() => {
                      setQuery("");
                      close();
                    }}
                    className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-crema ${
                      i === active ? "bg-crema" : ""
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{productTitle(p)}</span>
                      <span className="block text-xs text-gris">
                        {[p.concentration, p.size].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                    <span className="shrink-0 font-semibold text-verde">{formatPrice(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {results.length > MAX_RESULTS && (
            <button
              type="button"
              onClick={goToResults}
              className="w-full border-t border-linea px-4 py-2.5 text-left text-sm font-medium text-bordo hover:bg-crema"
            >
              Ver los {results.length} resultados
            </button>
          )}
        </div>
      )}
    </div>
  );
}
