"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HeroSlide {
  image: StaticImageData;
  alt: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  text: string;
  cta: { label: string; href: string };
}

const AUTOPLAY_MS = 6000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, next, slides.length]);

  return (
    <section
      className="relative overflow-hidden bg-crema"
      aria-roledescription="carrusel"
      aria-label="Destacados"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2/1] lg:max-h-[640px] lg:w-full">
        {slides.map((s, i) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${slides.length}`}
            aria-hidden={i !== index}
          >
            {/* En celular la foto ocupa la mitad superior y el texto va debajo */}
            <div className="absolute inset-x-0 top-0 h-[45%] sm:h-full">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                priority={i === 0}
                placeholder="blur"
                sizes="100vw"
                className="object-cover object-[80%_center] lg:object-center"
              />
              {/* Degradado para fundir la foto con el fondo y que el texto se lea */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-crema to-transparent sm:inset-0 sm:h-full sm:bg-gradient-to-r sm:from-crema/90 sm:via-crema/40 sm:to-transparent" />
            </div>

            <div className="container-page relative flex h-full items-end pb-12 sm:items-center sm:pb-0 md:pl-20">
              <div
                className={`max-w-md transition-all delay-150 duration-700 lg:max-w-lg ${
                  i === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bordo">{s.eyebrow}</p>
                <h2 className="mt-3 font-serif text-4xl leading-[1.02] text-verde-oscuro sm:text-5xl md:text-6xl lg:text-7xl">
                  {s.title}
                  <span className="block italic text-bordo">{s.titleAccent}</span>
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-tinta/80 md:text-base">{s.text}</p>
                <Link
                  href={s.cta.href}
                  tabIndex={i === index ? 0 : -1}
                  className="mt-7 inline-block bg-verde px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-crema transition-colors hover:bg-bordo"
                >
                  {s.cta.label}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 p-2 text-verde-oscuro/70 transition-colors hover:text-verde-oscuro md:block"
            >
              <ChevronLeft size={32} strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 p-2 text-verde-oscuro/70 transition-colors hover:text-verde-oscuro md:block"
            >
              <ChevronRight size={32} strokeWidth={1.4} />
            </button>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-9">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir a la diapositiva ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-7 bg-verde" : "w-2 bg-verde/30 hover:bg-verde/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
