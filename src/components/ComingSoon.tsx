/** Marcador temporal para las secciones que se construyen en etapas siguientes. */
export function ComingSoon({ title, stage }: { title: string; stage: string }) {
  return (
    <section className="container-page py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bordo">{stage}</p>
      <h1 className="mt-3 font-serif text-4xl text-verde">{title}</h1>
      <p className="mx-auto mt-4 max-w-md text-gris">Esta sección se está construyendo.</p>
    </section>
  );
}
