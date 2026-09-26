import type { Metadata } from "next";
import { PageHeader } from "@/components/catalog/PageHeader";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Botón de arrepentimiento",
  description: "Solicitá la revocación de tu compra dentro de los 10 días corridos.",
};

const message = [
  "Hola, quiero ejercer mi derecho de arrepentimiento (revocación de la compra).",
  "",
  "Número de pedido: ",
  "Nombre y apellido: ",
  "Fecha de compra/entrega: ",
].join("\n");

export default function ArrepentimientoPage() {
  return (
    <div className="container-page">
      <div className="mx-auto max-w-2xl">
        <PageHeader
          title="Botón de arrepentimiento"
          crumbs={[{ label: "Inicio", href: "/" }, { label: "Botón de arrepentimiento" }]}
        />
        <div className="space-y-4 text-sm leading-relaxed text-tinta/85">
          <p>
            Podés revocar tu compra dentro de los <strong>10 días corridos</strong> desde que recibiste el producto o
            celebraste el contrato, lo último que ocurra, sin costo ni responsabilidad alguna (art. 34 de la Ley 24.240
            y Resolución 424/2020).
          </p>
          <p>
            El producto debe devolverse en las mismas condiciones en que lo recibiste. Tocá el botón para enviarnos la
            solicitud por WhatsApp; te respondemos con un código de identificación de tu trámite dentro de las 24 horas.
          </p>
        </div>
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block bg-bordo px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-crema hover:brightness-110"
        >
          Solicitar arrepentimiento
        </a>
      </div>
    </div>
  );
}
