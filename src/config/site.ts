import pricing from "./pricing.json";

export const site = {
  name: "Perfum.store",
  description:
    "Perfumes árabes, de diseñador y nicho 100% originales. Envíos a todo el país y envío gratis superando $150.000.",
  whatsapp: "5491159320255", // formato internacional sin + ni espacios (11 5932-0255)
  instagram: "perfum.storesur", // usuario sin @
  freeShippingFrom: pricing.envioGratisDesde,
};

/** Formas de pago que se ofrecen en el pedido. */
export const paymentMethods = [
  { id: "transferencia", label: "Transferencia bancaria" },
  { id: "efectivo", label: "Efectivo" },
  { id: "mercadopago", label: "Mercado Pago" },
] as const;

/** Opciones de entrega. Los retiros son sin cargo. */
export const deliveryOptions = [
  {
    id: "envio",
    label: "Envío a domicilio",
    detail: "A todo el país. Gratis superando el mínimo; si no, el costo se coordina por WhatsApp.",
  },
  { id: "retiro-claypole", label: "Retiro en Claypole", detail: "Sin cargo. Coordinamos día y horario." },
  {
    id: "retiro-solano",
    label: "Retiro en San Francisco Solano (estación de tren)",
    detail: "Sin cargo. Coordinamos día y horario.",
  },
] as const;

export type PaymentMethodId = (typeof paymentMethods)[number]["id"];
export type DeliveryOptionId = (typeof deliveryOptions)[number]["id"];

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const mainNav: NavItem[] = [
  {
    label: "Fragancias Masculinas",
    href: "/fragancias/masculinas",
    children: [
      { label: "Árabes", href: "/fragancias/masculinas/arabes" },
      { label: "Diseñador", href: "/fragancias/masculinas/disenador" },
      { label: "Nicho", href: "/fragancias/masculinas/nicho" },
      { label: "Ver todas", href: "/fragancias/masculinas" },
    ],
  },
  {
    label: "Fragancias Femeninas",
    href: "/fragancias/femeninas",
    children: [
      { label: "Árabes", href: "/fragancias/femeninas/arabes" },
      { label: "Diseñador", href: "/fragancias/femeninas/disenador" },
      { label: "Nicho", href: "/fragancias/femeninas/nicho" },
      { label: "Ver todas", href: "/fragancias/femeninas" },
    ],
  },
  { label: "FAQ", href: "/preguntas-frecuentes" },
];
