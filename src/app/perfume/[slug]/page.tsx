import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  CalendarDays,
  FileText,
  Gauge,
  Heart,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react";
import { PageHeader } from "@/components/catalog/PageHeader";
import { Accordion } from "@/components/product/Accordion";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductImage } from "@/components/product/ProductImage";
import { PurchaseBox } from "@/components/product/PurchaseBox";
import { StockBadge } from "@/components/product/StockBadge";
import { site } from "@/config/site";
import { FAMILY_LABELS, productInfo } from "@/data/product-info";
import { GENDER_LABELS, TYPE_LABELS, TYPE_SLUGS, getProductBySlug, productTitle, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { getRelated } from "@/lib/related";
import type { Product } from "@/lib/types";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  if (!product) return {};
  const info = productInfo[product.slug];
  const title = productTitle(product);
  const description = `${formatPrice(product.price)} · ${info?.d ?? `${title} original. ${site.description}`}`;
  return {
    title,
    description,
    alternates: { canonical: `/perfume/${product.slug}/` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      images: product.image ? [{ url: product.image, width: 800, height: 1000, alt: title }] : undefined,
    },
  };
}

const SILLAGE_LABELS = ["", "Suave", "Moderada", "Notoria", "Fuerte"];

/** Sección de la tienda a la que pertenece el perfume (para las migas de pan). */
function sectionFor(product: Product) {
  const genderSlug = product.gender === "femenino" ? "femeninas" : "masculinas";
  const typeSlug = Object.entries(TYPE_SLUGS).find(([, t]) => t === product.type)![0];
  return {
    genderLabel: genderSlug === "femeninas" ? "Fragancias femeninas" : "Fragancias masculinas",
    genderHref: `/fragancias/${genderSlug}`,
    typeHref: `/fragancias/${genderSlug}/${typeSlug}`,
  };
}

function Meter({ value, max = 4 }: { value: number; max?: number }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`h-1.5 w-7 rounded-full ${i < value ? "bg-bordo" : "bg-linea"}`} />
      ))}
    </span>
  );
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();

  const info = productInfo[product.slug];
  const title = productTitle(product);
  const section = sectionFor(product);
  const related = getRelated(product);
  const freeShipping = product.price >= site.freeShippingFrom;
  const details = [product.concentration, product.size].filter(Boolean).join(" · ");

  // Datos estructurados de producto (precio y disponibilidad para buscadores)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    brand: { "@type": "Brand", name: product.brand },
    image: product.image ? `${site.url}${product.image}` : undefined,
    description: info?.d,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ARS",
      availability:
        product.stock === "inmediato" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      url: `${site.url}/perfume/${product.slug}/`,
    },
  };

  return (
    <div className="container-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="hidden md:block">
        <PageHeader
          crumbs={[
            { label: "Inicio", href: "/" },
            { label: section.genderLabel, href: section.genderHref },
            { label: TYPE_LABELS[product.type], href: section.typeHref },
            { label: title },
          ]}
        />
      </div>

      <div className="grid gap-8 pt-6 md:grid-cols-2 md:gap-12 md:pt-0 lg:gap-16">
        {/* Imagen */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-crema ring-1 ring-linea/70 md:sticky md:top-40 md:self-start">
          <ProductImage product={product} priority sizes="(min-width: 768px) 50vw, 100vw" />
        </div>

        {/* Datos y compra */}
        <div>
          <Link
            href={section.typeHref}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-bordo hover:underline"
          >
            {product.brand} · {TYPE_LABELS[product.type]}
          </Link>
          <h1 className="mt-2 font-serif text-4xl leading-tight text-verde-oscuro lg:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-gris">
            {[details, GENDER_LABELS[product.gender]].filter(Boolean).join(" · ")}
          </p>

          <p className="mt-6 text-3xl font-semibold text-verde-oscuro">{formatPrice(product.price)}</p>

          <StockBadge stock={product.stock} long className="mt-3 text-sm" />

          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2.5 rounded-full bg-crema px-4 py-2.5">
              <Truck size={18} className="shrink-0 text-bordo" strokeWidth={1.6} />
              {freeShipping ? (
                <span>
                  <strong className="font-semibold">¡Este perfume tiene envío gratis!</strong>
                </span>
              ) : (
                <span>Envío gratis a partir de {formatPrice(site.freeShippingFrom)}</span>
              )}
            </li>
            <li className="flex items-center gap-2.5 rounded-full bg-crema px-4 py-2.5">
              <BadgeCheck size={18} className="shrink-0 text-bordo" strokeWidth={1.6} />
              Perfume 100% original
            </li>
          </ul>

          {info?.i && (
            <p className="mt-5 rounded-xl bg-oro/15 px-4 py-3 text-sm text-verde-oscuro">
              <Sparkles size={15} className="-mt-0.5 mr-1.5 inline text-bordo" />
              Inspirado en <strong className="font-semibold">{info.i}</strong>
            </p>
          )}

          <div className="mt-7">
            <PurchaseBox slug={product.slug} title={title} />
          </div>

          {info && (
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-linea pt-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-gris">Familia</dt>
                <dd className="mt-1 font-medium">{info.f.map((f) => FAMILY_LABELS[f]).join(" · ")}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gris">Duración</dt>
                <dd className="mt-1 font-medium">{info.l}</dd>
              </div>
            </dl>
          )}
        </div>
      </div>

      {/* Información en desplegables */}
      {info && (
        <section className="mx-auto mt-14 max-w-3xl space-y-3 md:mt-20" aria-label="Información del perfume">
          <Accordion title="Descripción" icon={<FileText size={18} />} defaultOpen>
            <p>{info.d}</p>
            {info.i && (
              <p className="mt-3">
                Es una fragancia inspirada en <strong>{info.i}</strong>: un perfil similar a un precio mucho más
                accesible.
              </p>
            )}
          </Accordion>

          <Accordion title="Notas y composición" icon={<Sparkles size={18} />}>
            <p className="mb-4">
              Familia olfativa: <strong>{info.f.map((f) => FAMILY_LABELS[f]).join(", ")}</strong>
            </p>
            <dl className="space-y-3">
              {(["Notas de salida", "Notas de corazón", "Notas de fondo"] as const).map((label, i) => (
                <div key={label} className="grid gap-1 sm:grid-cols-[150px_1fr]">
                  <dt className="font-semibold text-verde-oscuro">{label}</dt>
                  <dd>{info.n[i]}</dd>
                </div>
              ))}
            </dl>
          </Accordion>

          <Accordion title="¿Para quién es?" icon={<UserRound size={18} />}>
            <p>{info.w}</p>
            <p className="mt-2 text-gris">Perfil: {GENDER_LABELS[product.gender]}.</p>
          </Accordion>

          <Accordion title="Uso recomendado" icon={<CalendarDays size={18} />}>
            <dl className="space-y-3">
              <div className="grid gap-1 sm:grid-cols-[150px_1fr]">
                <dt className="font-semibold text-verde-oscuro">Estaciones</dt>
                <dd className="flex flex-wrap gap-2">
                  {info.s.map((s) => (
                    <span key={s} className="rounded-full bg-white px-3 py-1 text-xs ring-1 ring-linea">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="grid gap-1 sm:grid-cols-[150px_1fr]">
                <dt className="font-semibold text-verde-oscuro">Ocasiones</dt>
                <dd className="flex flex-wrap gap-2">
                  {info.o.map((o) => (
                    <span key={o} className="rounded-full bg-white px-3 py-1 text-xs ring-1 ring-linea">
                      {o}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Accordion>

          <Accordion title="Rendimiento" icon={<Gauge size={18} />}>
            <dl className="space-y-4">
              <div className="grid items-center gap-1 sm:grid-cols-[150px_1fr]">
                <dt className="font-semibold text-verde-oscuro">Duración</dt>
                <dd>{info.l} en piel</dd>
              </div>
              <div className="grid items-center gap-1 sm:grid-cols-[150px_1fr]">
                <dt className="font-semibold text-verde-oscuro">Estela</dt>
                <dd className="flex items-center gap-3">
                  <Meter value={info.e} />
                  <span>{SILLAGE_LABELS[info.e]}</span>
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-gris">
              La duración varía según el tipo de piel, el clima y la cantidad aplicada. Tip: aplicalo en puntos de
              pulso (cuello y muñecas) y sobre la ropa para que dure más.
            </p>
          </Accordion>

          {related.length > 0 && (
            <Accordion title="Si te gusta este perfume…" icon={<Heart size={18} />}>
              <p className="mb-5">También te pueden gustar estas fragancias con un perfil parecido:</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </Accordion>
          )}
        </section>
      )}
    </div>
  );
}
