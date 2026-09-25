"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";

export function AddToCartButton({
  slug,
  qty = 1,
  label = "Comprar",
  className = "",
}: {
  slug: string;
  qty?: number;
  label?: string;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <button
      type="button"
      onClick={() => {
        add(slug, qty);
        setAdded(true);
      }}
      className={`inline-flex items-center justify-center gap-1.5 font-semibold uppercase tracking-[0.14em] transition-colors ${
        added ? "bg-oro text-verde-oscuro" : "bg-verde text-crema hover:bg-bordo"
      } ${className}`}
      aria-live="polite"
    >
      {added ? (
        <>
          <Check size={15} strokeWidth={2.5} /> Agregado
        </>
      ) : (
        label
      )}
    </button>
  );
}
