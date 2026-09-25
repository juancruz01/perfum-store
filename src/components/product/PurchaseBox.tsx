"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";
import { whatsappLink } from "@/lib/whatsapp";

const MAX_QTY = 10;

export function PurchaseBox({ slug, title }: { slug: string; title: string }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex items-center border border-linea" role="group" aria-label="Cantidad">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="grid h-12 w-11 place-items-center text-tinta/70 hover:text-tinta disabled:opacity-30"
            aria-label="Restar uno"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
            disabled={qty >= MAX_QTY}
            className="grid h-12 w-11 place-items-center text-tinta/70 hover:text-tinta disabled:opacity-30"
            aria-label="Sumar uno"
          >
            <Plus size={16} />
          </button>
        </div>
        <AddToCartButton slug={slug} qty={qty} label="Agregar al carrito" className="h-12 flex-1 text-xs" />
      </div>
      <a
        href={whatsappLink(`¡Hola! Quería consultar por el perfume ${title}.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 items-center justify-center gap-2 border border-verde text-xs font-semibold uppercase tracking-[0.14em] text-verde transition-colors hover:bg-verde hover:text-crema"
      >
        Consultar por WhatsApp
      </a>
    </div>
  );
}
