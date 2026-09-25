import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogView, type CategoryLink } from "@/components/catalog/CatalogView";
import { PageHeader } from "@/components/catalog/PageHeader";
import {
  GENDER_SLUGS,
  TYPE_LABELS,
  TYPE_SLUGS,
  getProducts,
  type GenderSlug,
  type TypeSlug,
} from "@/lib/catalog";

type Params = { genero: string; tipo?: string[] };

const GENDER_TITLES: Record<GenderSlug, string> = {
  masculinas: "Fragancias masculinas",
  femeninas: "Fragancias femeninas",
};

const TYPE_SUBTITLES: Record<TypeSlug, string> = {
  arabes: "Intensas, duraderas y con gran proyección: las fragancias árabes que son tendencia.",
  disenador: "Los clásicos de las grandes casas de moda que nunca fallan.",
  nicho: "Perfumería de autor, para quienes buscan algo distinto.",
};

function resolve(params: Params) {
  const genderSlug = params.genero as GenderSlug;
  const typeSlug = params.tipo?.[0] as TypeSlug | undefined;
  if (!(genderSlug in GENDER_SLUGS) || (params.tipo?.length ?? 0) > 1) return null;
  if (typeSlug && !(typeSlug in TYPE_SLUGS)) return null;
  return {
    genderSlug,
    typeSlug,
    gender: GENDER_SLUGS[genderSlug],
    type: typeSlug ? TYPE_SLUGS[typeSlug] : undefined,
  };
}

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return Object.keys(GENDER_SLUGS).flatMap((genero) => [
    { genero, tipo: [] },
    ...Object.keys(TYPE_SLUGS).map((t) => ({ genero, tipo: [t] })),
  ]);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const r = resolve(await params);
  if (!r) return {};
  const base = GENDER_TITLES[r.genderSlug];
  return {
    title: r.type ? `${base} ${TYPE_LABELS[r.type].toLowerCase()}` : base,
    description: r.typeSlug ? TYPE_SUBTITLES[r.typeSlug] : undefined,
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const r = resolve(await params);
  if (!r) notFound();

  const baseTitle = GENDER_TITLES[r.genderSlug];
  const products = getProducts({ gender: r.gender, type: r.type });
  const baseHref = `/fragancias/${r.genderSlug}`;

  const categoryLinks: CategoryLink[] = [
    { label: "Todas", href: baseHref, count: getProducts({ gender: r.gender }).length, active: !r.type },
    ...(Object.entries(TYPE_SLUGS) as [TypeSlug, (typeof TYPE_SLUGS)[TypeSlug]][]).map(([slug, type]) => ({
      label: TYPE_LABELS[type],
      href: `${baseHref}/${slug}`,
      count: getProducts({ gender: r.gender, type }).length,
      active: r.type === type,
    })),
  ];

  const crumbs = [
    { label: "Inicio", href: "/" },
    r.type ? { label: baseTitle, href: baseHref } : { label: baseTitle },
    ...(r.type ? [{ label: TYPE_LABELS[r.type] }] : []),
  ];

  return (
    <div className="container-page">
      <PageHeader
        title={r.type ? `${baseTitle} · ${TYPE_LABELS[r.type]}` : baseTitle}
        subtitle={r.typeSlug ? TYPE_SUBTITLES[r.typeSlug] : "Árabes, de diseñador y nicho. Incluye fragancias unisex."}
        crumbs={crumbs}
      />
      <CatalogView products={products} categoryLinks={categoryLinks} />
    </div>
  );
}
