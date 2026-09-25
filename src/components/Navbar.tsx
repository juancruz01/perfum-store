"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { mainNav, site } from "@/config/site";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";

function CartButton() {
  const { count } = useCart();
  return (
    <Link
      href="/carrito"
      className="relative p-2 text-white transition-colors hover:text-oro"
      aria-label={`Carrito (${count} productos)`}
    >
      <ShoppingBag size={24} strokeWidth={1.6} />
      <span className="absolute right-0 top-0 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-oro px-1 text-[11px] font-bold text-verde-oscuro">
        {count}
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Cerrar el menú móvil al navegar
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40">
      {/* Barra de anuncio */}
      <div className="bg-bordo text-center text-[11px] font-medium uppercase tracking-[0.18em] text-crema">
        <p className="container-page py-2">
          <span className="sm:hidden">Envío gratis desde {formatPrice(site.freeShippingFrom)}</span>
          <span className="hidden sm:inline">
            Envío gratis en compras superiores a {formatPrice(site.freeShippingFrom)}
          </span>
        </p>
      </div>

      <div className="bg-verde text-white">
        {/* Fila principal */}
        <div className="container-page grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 md:grid-cols-[1fr_auto_1fr] md:py-4">
          <div className="flex items-center">
            <button
              type="button"
              className="-ml-2 p-2 md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={24} />
            </button>
            <SearchBox className="hidden w-full max-w-xs md:block" />
          </div>

          <Logo className="justify-self-center" />

          <div className="flex items-center justify-end">
            <CartButton />
          </div>
        </div>

        {/* Buscador móvil */}
        <div className="container-page pb-3 md:hidden">
          <SearchBox />
        </div>

        {/* Navegación desktop */}
        <nav className="hidden border-t border-white/10 md:block" aria-label="Principal">
          <ul className="container-page flex items-center justify-center gap-10">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors hover:text-oro ${
                    isActive(item.href) ? "text-oro" : ""
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-0 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="min-w-52 border-t-2 border-oro bg-white py-2 text-tinta shadow-xl">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block px-5 py-2.5 text-sm transition-colors hover:bg-crema hover:text-verde ${
                              pathname === child.href ? "font-semibold text-verde" : ""
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-verde text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <Logo />
              <button type="button" onClick={() => setMobileOpen(false)} className="p-2" aria-label="Cerrar menú">
                <X size={24} />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto px-4 py-2">
              {mainNav.map((item) => (
                <li key={item.href} className="border-b border-white/10">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium uppercase tracking-[0.12em]"
                        aria-expanded={expanded === item.href}
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${expanded === item.href ? "rotate-180" : ""}`}
                        />
                      </button>
                      {expanded === item.href && (
                        <ul className="pb-3 pl-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link href={child.href} className="block py-2.5 text-sm text-white/85 hover:text-oro">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-4 text-sm font-medium uppercase tracking-[0.12em]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
