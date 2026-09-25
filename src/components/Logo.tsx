import Link from "next/link";

/** Isotipo: frasco de perfume con una "P". Reemplazable por el logo definitivo. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden="true" fill="none">
      <rect x="15" y="2" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M17 8v4M23 8v4" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="12" width="32" height="34" rx="6" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M16 38V20h6.5a5 5 0 0 1 0 10H16"
        stroke="var(--oro)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Perfum.store, inicio">
      <LogoMark />
      <span className="font-serif text-2xl leading-none tracking-wide">
        Perfum<span className="text-oro">.store</span>
      </span>
    </Link>
  );
}
