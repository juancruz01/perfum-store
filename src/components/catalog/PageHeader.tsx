import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function PageHeader({ title, crumbs, subtitle }: { title: string; crumbs: Crumb[]; subtitle?: string }) {
  return (
    <header className="pb-8 pt-8 md:pt-10">
      <nav aria-label="Ruta de navegación">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gris">
          {crumbs.map((c, i) => (
            <li key={c.label} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.href ? (
                <Link href={c.href} className="hover:text-bordo">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-tinta">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h1 className="mt-3 font-serif text-4xl text-verde-oscuro md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-sm text-gris md:text-base">{subtitle}</p>}
    </header>
  );
}
