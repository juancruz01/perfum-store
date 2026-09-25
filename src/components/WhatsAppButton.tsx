"use client";

import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  // En el carrito se oculta para no confundirlo con "Enviar pedido por WhatsApp".
  if (usePathname() === "/carrito") return null;
  return (
    <a
      href={whatsappLink("¡Hola! Quería hacer una consulta sobre un perfume.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.376 3 3.996 8.38 3.996 15.008c0 2.12.556 4.19 1.61 6.012L3.9 27.2l6.33-1.66a12 12 0 0 0 5.77 1.47h.005C22.63 27.01 28 21.63 28 15.004 28 11.8 26.75 8.79 24.49 6.52A11.93 11.93 0 0 0 16.004 3Zm0 21.98h-.004a9.96 9.96 0 0 1-5.08-1.39l-.364-.216-3.757.985 1.003-3.662-.237-.376a9.94 9.94 0 0 1-1.525-5.31c0-5.5 4.476-9.975 9.98-9.975a9.9 9.9 0 0 1 7.05 2.925 9.9 9.9 0 0 1 2.92 7.056c-.003 5.5-4.479 9.964-9.986 9.964Zm5.47-7.47c-.3-.15-1.775-.876-2.05-.976-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.266-.467-2.412-1.49-.892-.795-1.494-1.777-1.669-2.077-.175-.3-.019-.462.131-.611.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.585-.49-.506-.675-.515l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.116 3.23 5.126 4.53.716.31 1.275.494 1.71.632.719.228 1.373.196 1.89.119.576-.086 1.775-.726 2.025-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35Z" />
      </svg>
    </a>
  );
}
