import { site } from "@/config/site";
import type { Product } from "@/lib/types";

export function stockLabel(stock: Product["stock"], long = false) {
  if (stock === "inmediato") return long ? "En stock · entrega inmediata" : "En stock";
  return long ? `Por encargo · llega en aprox. ${site.orderLeadDays} días` : "Por encargo";
}

export function StockBadge({ stock, long = false, className = "" }: { stock: Product["stock"]; long?: boolean; className?: string }) {
  const inStock = stock === "inmediato";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${inStock ? "text-verde" : "text-gris"} ${className}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${inStock ? "bg-[#22a45d]" : "bg-oro"}`} aria-hidden="true" />
      {stockLabel(stock, long)}
    </span>
  );
}
