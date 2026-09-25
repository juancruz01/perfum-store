"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductBySlug } from "./catalog";
import type { Product } from "./types";

const STORAGE_KEY = "perfum-store:cart";

export interface CartLine {
  slug: string;
  qty: number;
}

export interface CartItem extends CartLine {
  product: Product;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return Array.isArray(parsed) ? parsed.filter((l) => l && typeof l.slug === "string" && l.qty > 0) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Sin almacenamiento disponible: el carrito vive sólo en esta pestaña.
    }
  }, [lines, ready]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { slug, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    // Se descartan productos que ya no están en el catálogo.
    const items = lines.flatMap((l) => {
      const product = getProductBySlug(l.slug);
      return product ? [{ ...l, product }] : [];
    });
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.product.price, 0),
      ready,
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, ready, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
