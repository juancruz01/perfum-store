import pricing from "./pricing.json";

export const site = {
  name: "Perfum.store",
  description:
    "Perfumes árabes, de diseñador y nicho 100% originales. Envíos a todo el país y envío gratis superando $150.000.",
  whatsapp: "5491159320255", // formato internacional sin + ni espacios (11 5932-0255)
  instagram: "perfum.storesur", // usuario sin @
  freeShippingFrom: pricing.envioGratisDesde,
};

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
