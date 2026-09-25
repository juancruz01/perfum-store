import type { Metadata } from "next";
import { PageHeader } from "@/components/catalog/PageHeader";
import { CartView } from "./CartView";

export const metadata: Metadata = {
  title: "Carrito",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="container-page">
      <PageHeader title="Carrito" crumbs={[{ label: "Inicio", href: "/" }, { label: "Carrito" }]} />
      <CartView />
    </div>
  );
}
