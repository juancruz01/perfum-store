import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export interface CategoryBanner {
  href: string;
  image: StaticImageData;
  alt: string;
  kicker: string;
  title: string;
}

export function CategoryBanners({ items }: { items: CategoryBanner[] }) {
  return (
    <section className="container-page py-14 md:py-20" aria-label="Categorías">
      <div className="grid gap-5 md:grid-cols-2 md:gap-8">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative block aspect-[2/1] overflow-hidden rounded-2xl bg-crema shadow-sm ring-1 ring-black/5"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-y-0 right-0 flex w-[55%] flex-col items-center justify-center text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-tinta/70 sm:text-sm">
                {item.kicker}
              </span>
              <span className="mt-1 font-serif text-3xl font-bold italic leading-none text-bordo sm:text-4xl lg:text-5xl">
                {item.title}
              </span>
              <span className="mt-4 rounded-md bg-bordo px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-crema transition-colors group-hover:bg-verde sm:mt-5 sm:px-7 sm:py-2.5 sm:text-xs">
                Descubrir
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
