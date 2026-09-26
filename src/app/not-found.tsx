import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bordo">Error 404</p>
      <h1 className="mt-3 font-serif text-5xl text-verde-oscuro">Esta página se evaporó</h1>
      <p className="mx-auto mt-4 max-w-md text-gris">
        Como un buen perfume, a veces las cosas se van. Probá buscando en el catálogo.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="bg-verde px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-crema hover:bg-bordo"
        >
          Ir al inicio
        </Link>
        <Link
          href="/fragancias/masculinas"
          className="border border-verde px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-verde hover:bg-verde hover:text-crema"
        >
          Ver perfumes
        </Link>
      </div>
    </section>
  );
}
