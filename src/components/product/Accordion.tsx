import { ChevronDown } from "lucide-react";

/** Desplegable nativo (<details>): accesible y sin JavaScript. */
export function Accordion({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group rounded-xl bg-crema/70 ring-1 ring-linea/70">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 font-medium text-verde-oscuro select-none [&::-webkit-details-marker]:hidden">
        {icon && <span className="text-bordo">{icon}</span>}
        <span className="flex-1">{title}</span>
        <ChevronDown size={18} className="text-gris transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 text-sm leading-relaxed text-tinta/85">{children}</div>
    </details>
  );
}
