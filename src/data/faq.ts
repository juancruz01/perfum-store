import { deliveryOptions, paymentMethods, site } from "@/config/site";
import { formatPrice } from "@/lib/format";

export interface FaqItem {
  q: string;
  a: string[];
}

export interface FaqSection {
  title: string;
  items: FaqItem[];
}

const pickups = deliveryOptions.filter((d) => d.id !== "envio").map((d) => d.label.replace("Retiro en ", ""));
const payments = paymentMethods.map((p) => p.label.toLowerCase());
const freeShipping = formatPrice(site.freeShippingFrom);

export const faq: FaqSection[] = [
  {
    title: "Productos",
    items: [
      {
        q: "¿Los perfumes son originales?",
        a: ["Sí. Todos nuestros perfumes son 100% originales."],
      },
      {
        q: "¿Qué significa “En stock” y “Por encargo”?",
        a: [
          "En stock: el perfume está disponible para despacharlo enseguida de confirmado el pago.",
          `Por encargo: lo pedimos especialmente para vos y tarda aproximadamente ${site.orderLeadDays} días en llegarnos. Apenas lo recibimos, te lo enviamos o coordinamos el retiro.`,
          "Cada perfume muestra su disponibilidad en el catálogo, en su ficha y en el carrito.",
        ],
      },
      {
        q: "¿Qué quiere decir “Inspirado en…”?",
        a: [
          "Algunos perfumes árabes tienen un perfil aromático parecido a una fragancia famosa de diseñador o nicho. Te lo indicamos como referencia para que sepas qué esperar.",
          "No son réplicas: son perfumes originales de su propia marca (Lattafa, Armaf, Afnan, etc.), con su frasco y su fórmula.",
        ],
      },
      {
        q: "¿Qué diferencia hay entre Eau de Toilette, Eau de Parfum y Parfum?",
        a: [
          "Es la concentración de esencia. De menor a mayor: Eau de Toilette (más liviano y fresco), Eau de Parfum (más intenso y duradero), Parfum / Extrait de Parfum (la concentración más alta).",
          "En general, a mayor concentración, mayor duración en la piel.",
        ],
      },
      {
        q: "¿Consiguen perfumes que no están en el catálogo?",
        a: ["Sí. Escribinos por WhatsApp con el perfume que buscás y te pasamos precio y disponibilidad."],
      },
    ],
  },
  {
    title: "Compras y pagos",
    items: [
      {
        q: "¿Cómo hago un pedido?",
        a: [
          "1. Agregá los perfumes al carrito con el botón “Comprar”.",
          "2. En el carrito completá tus datos, elegí envío o retiro y la forma de pago.",
          "3. Tocá “Enviar pedido por WhatsApp”: se abre el chat con tu pedido armado. Lo enviás y te respondemos para confirmar stock, pago y entrega.",
        ],
      },
      {
        q: "¿Qué formas de pago aceptan?",
        a: [
          `Aceptamos ${payments.slice(0, -1).join(", ")} y ${payments.at(-1)}.`,
          "Te enviamos los datos de pago por WhatsApp cuando confirmamos tu pedido.",
        ],
      },
      {
        q: "¿Se cobra algo al enviar el pedido por WhatsApp?",
        a: ["No. Enviar el pedido no tiene costo ni compromiso: el pago se coordina después, cuando te confirmamos la disponibilidad."],
      },
    ],
  },
  {
    title: "Envíos y retiros",
    items: [
      {
        q: "¿Hacen envíos?",
        a: [
          `Sí, enviamos a todo el país por ${site.shippingCarriers}.`,
          `El envío es gratis en compras superiores a ${freeShipping}. Para montos menores, el costo depende del destino y te lo confirmamos por WhatsApp.`,
        ],
      },
      {
        q: "¿Puedo retirar en persona?",
        a: [
          `Sí, sin cargo, en ${pickups.join(" o en ")}.`,
          "Coordinamos el día y el horario por WhatsApp.",
        ],
      },
      {
        q: "¿Cuánto tarda en llegar mi pedido?",
        a: [
          "Perfumes en stock: los despachamos apenas se confirma el pago. Después se suma el tiempo del correo, que depende de tu localidad.",
          `Perfumes por encargo: sumá aproximadamente ${site.orderLeadDays} días hasta que el perfume nos llega.`,
          "Siempre te pasamos el número de seguimiento del envío.",
        ],
      },
    ],
  },
  {
    title: "Cambios",
    items: [
      {
        q: "¿Puedo cambiar un perfume?",
        a: ["Escribinos por WhatsApp y vemos tu caso. Te recomendamos consultarnos cualquier duda antes de comprar: te asesoramos para que elijas el perfume ideal."],
      },
    ],
  },
];
