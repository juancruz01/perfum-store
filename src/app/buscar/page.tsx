import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/catalog/PageHeader";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = {
  title: "Buscar perfumes",
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <div className="container-page">
      <Suspense fallback={<PageHeader title="Buscar" crumbs={[{ label: "Inicio", href: "/" }, { label: "Buscar" }]} />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
