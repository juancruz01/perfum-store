import Link from "next/link";
import { mainNav, site } from "@/config/site";
import { formatPrice } from "@/lib/format";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-verde-oscuro text-white/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="text-white">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{site.description}</p>
        </div>

        {mainNav
          .filter((item) => item.children)
          .map((item) => (
            <div key={item.href}>
              <h3 className="font-serif text-lg text-oro">{item.label}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {item.children!.map((child) => (
                  <li key={child.href}>
                    <Link href={child.href} className="hover:text-oro">
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        <div>
          <h3 className="font-serif text-lg text-oro">Ayuda</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/preguntas-frecuentes" className="hover:text-oro">
                Preguntas frecuentes
              </Link>
            </li>
            <li>Envío gratis desde {formatPrice(site.freeShippingFrom)}</li>
            <li>Perfumes 100% originales</li>
            {site.instagram && (
              <li>
                <a
                  href={`https://instagram.com/${site.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-oro"
                >
                  Instagram @{site.instagram}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-5 text-xs text-white/50">
          © {year} {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
