import type { Metadata } from "next";
import { PageHeader } from "@/components/catalog/PageHeader";
import { Accordion } from "@/components/product/Accordion";
import { faq } from "@/data/faq";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Envíos, retiros, formas de pago, disponibilidad y todo lo que necesitás saber para comprar tu perfume.",
};

// Datos estructurados para que Google pueda mostrar las preguntas en los resultados
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.flatMap((s) =>
    s.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a.join(" ") },
    })),
  ),
};

export default function FaqPage() {
  return (
    <div className="container-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title="Preguntas frecuentes"
          subtitle="Todo lo que necesitás saber antes de comprar tu perfume."
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Preguntas frecuentes" }]}
        />

        <div className="space-y-12">
          {faq.map((section, si) => (
            <section key={section.title} aria-labelledby={`faq-${si}`}>
              <h2 id={`faq-${si}`} className="mb-4 font-serif text-2xl text-verde-oscuro">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <Accordion key={item.q} title={item.q}>
                    <div className="space-y-2">
                      {item.a.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </Accordion>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-verde px-6 py-10 text-center text-crema">
          <h2 className="font-serif text-3xl">¿Te quedó alguna duda?</h2>
          <p className="mt-2 text-sm text-crema/80">Escribinos y te asesoramos para elegir tu perfume.</p>
          <a
            href={whatsappLink("¡Hola! Tengo una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-[#25D366] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white hover:brightness-95"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
