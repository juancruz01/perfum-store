import { BadgeCheck, MessageCircle, Package, Truck } from "lucide-react";
import { site } from "@/config/site";
import { formatPrice } from "@/lib/format";

const items = [
  {
    icon: Truck,
    title: "Envío gratis",
    text: `En compras superiores a ${formatPrice(site.freeShippingFrom)}`,
  },
  { icon: BadgeCheck, title: "100% originales", text: "Todos nuestros perfumes son originales" },
  { icon: Package, title: "Envíos a todo el país", text: "Embalaje seguro y seguimiento" },
  { icon: MessageCircle, title: "Atención por WhatsApp", text: "Te asesoramos para elegir tu perfume" },
];

export function Benefits() {
  return (
    <section className="border-y border-linea bg-white" aria-label="Beneficios">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-7 py-8 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-6 w-6 shrink-0 text-bordo" strokeWidth={1.5} />
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wide text-verde-oscuro">{title}</p>
              <p className="mt-0.5 text-xs leading-snug text-gris sm:text-[13px]">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
