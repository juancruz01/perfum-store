import Image from "next/image";
import Link from "next/link";
import logoBlanco from "../../public/brand/logo-blanco.png";

/** Logo de la marca (versión blanca, para fondos oscuros). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`block ${className}`} aria-label="Perfum.store, inicio">
      <Image
        src={logoBlanco}
        alt="Perfum.store"
        priority
        className="h-6 w-auto md:h-7"
        sizes="200px"
      />
    </Link>
  );
}
