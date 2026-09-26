"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";
import { StockBadge } from "@/components/product/StockBadge";
import { whatsappLink } from "@/lib/whatsapp";
import { deliveryOptions, paymentMethods, site } from "@/config/site";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import {
  buildOrderMessage,
  emptyOrderForm,
  newOrderNumber,
  shippingCost,
  validateOrder,
  type OrderErrors,
  type OrderForm,
} from "@/lib/order";

const MAX_QTY = 10;

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-tinta">
        {label} {optional && <span className="font-normal text-gris">(opcional)</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-bordo">{error}</span>}
    </label>
  );
}

const inputClass = (error?: string) =>
  `w-full border bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-verde/20 ${
    error ? "border-bordo" : "border-linea focus:border-verde"
  }`;

export function CartView() {
  const { items, subtotal, ready, setQty, remove, clear } = useCart();
  const [form, setForm] = useState<OrderForm>(emptyOrderForm);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [sent, setSent] = useState<{ number: string; url: string } | null>(null);

  const update = <K extends keyof OrderForm>(key: K, value: OrderForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const shipping = shippingCost(subtotal, form.delivery);
  const hasOrderItems = items.some((i) => i.product.stock === "encargo");
  const missingForFree = Math.max(0, site.freeShippingFrom - subtotal);
  const progress = Math.min(100, (subtotal / site.freeShippingFrom) * 100);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateOrder(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    const number = newOrderNumber();
    const url = whatsappLink(buildOrderMessage(number, items, form));
    window.open(url, "_blank", "noopener,noreferrer");
    setSent({ number, url });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!ready) {
    return <div className="py-32" aria-busy="true" />;
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <CheckCircle2 size={56} className="mx-auto text-verde" strokeWidth={1.4} />
        <h2 className="mt-5 font-serif text-4xl text-verde-oscuro">¡Pedido listo!</h2>
        <p className="mt-3 text-gris">
          Tu pedido <strong className="text-tinta">{sent.number}</strong> se abrió en WhatsApp. Enviá el mensaje y te
          respondemos para confirmar stock, pago y entrega.
        </p>
        <a
          href={sent.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block bg-[#25D366] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:brightness-95"
        >
          Abrir WhatsApp de nuevo
        </a>
        <p className="mt-6">
          <Link href="/" className="text-sm text-bordo underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <ShoppingBag size={52} className="mx-auto text-gris" strokeWidth={1.2} />
        <h2 className="mt-5 font-serif text-4xl text-verde-oscuro">Tu carrito está vacío</h2>
        <p className="mt-3 text-gris">Explorá el catálogo y sumá tus perfumes favoritos.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/fragancias/masculinas"
            className="bg-verde px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-crema hover:bg-bordo"
          >
            Masculinas
          </Link>
          <Link
            href="/fragancias/femeninas"
            className="bg-verde px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-crema hover:bg-bordo"
          >
            Femeninas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-10 pb-8 lg:grid-cols-[1fr_400px] lg:gap-14">
      <div className="space-y-12">
        {/* Productos */}
        <section aria-labelledby="productos">
          <h2 id="productos" className="font-serif text-2xl text-verde-oscuro">
            Productos
          </h2>
          <ul className="mt-4 divide-y divide-linea border-y border-linea">
            {items.map(({ product, qty }) => (
              <li key={product.slug} className="flex gap-4 py-5">
                <Link
                  href={`/perfume/${product.slug}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-crema sm:h-28 sm:w-24"
                >
                  <ProductImage product={product} sizes="96px" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-bordo">
                        {product.brand}
                      </p>
                      <Link href={`/perfume/${product.slug}`} className="font-medium hover:text-verde">
                        {product.name}
                      </Link>
                      <p className="text-xs text-gris">
                        {[product.concentration, product.size].filter(Boolean).join(" · ")}
                      </p>
                      <StockBadge stock={product.stock} className="mt-1" />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.slug)}
                      className="p-1 text-gris hover:text-bordo"
                      aria-label={`Quitar ${product.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-linea" role="group" aria-label="Cantidad">
                      <button
                        type="button"
                        onClick={() => setQty(product.slug, qty - 1)}
                        className="grid h-9 w-9 place-items-center text-tinta/70 hover:text-tinta"
                        aria-label="Restar uno"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center text-sm">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(product.slug, Math.min(MAX_QTY, qty + 1))}
                        disabled={qty >= MAX_QTY}
                        className="grid h-9 w-9 place-items-center text-tinta/70 hover:text-tinta disabled:opacity-30"
                        aria-label="Sumar uno"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-semibold text-verde-oscuro">{formatPrice(qty * product.price)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Datos */}
        <section aria-labelledby="datos" className="space-y-5">
          <h2 id="datos" className="font-serif text-2xl text-verde-oscuro">
            Tus datos
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre y apellido" error={errors.name}>
              <input
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass(errors.name)}
              />
            </Field>
            <Field label="Teléfono / WhatsApp" error={errors.phone}>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="11 1234-5678"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass(errors.phone)}
              />
            </Field>
          </div>
        </section>

        {/* Entrega */}
        <section aria-labelledby="entrega" className="space-y-5">
          <h2 id="entrega" className="font-serif text-2xl text-verde-oscuro">
            Entrega
          </h2>
          <div className="space-y-2.5">
            {deliveryOptions.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer gap-3 border p-4 transition-colors ${
                  form.delivery === opt.id ? "border-verde bg-crema/60" : "border-linea hover:border-gris"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value={opt.id}
                  checked={form.delivery === opt.id}
                  onChange={() => update("delivery", opt.id)}
                  className="mt-1 accent-[var(--verde)]"
                />
                <span>
                  <span className="block text-sm font-medium">{opt.label}</span>
                  <span className="block text-xs text-gris">{opt.detail}</span>
                </span>
              </label>
            ))}
          </div>

          {form.delivery === "envio" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Dirección (calle, número, piso/depto)" error={errors.address}>
                  <input
                    name="address"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    className={inputClass(errors.address)}
                  />
                </Field>
              </div>
              <Field label="Localidad" error={errors.city}>
                <input
                  name="city"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={inputClass(errors.city)}
                />
              </Field>
              <Field label="Provincia" error={errors.province}>
                <input
                  name="province"
                  autoComplete="address-level1"
                  value={form.province}
                  onChange={(e) => update("province", e.target.value)}
                  className={inputClass(errors.province)}
                />
              </Field>
              <Field label="Código postal" optional>
                <input
                  name="zip"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  value={form.zip}
                  onChange={(e) => update("zip", e.target.value)}
                  className={inputClass()}
                />
              </Field>
            </div>
          )}
        </section>

        {/* Pago */}
        <section aria-labelledby="pago" className="space-y-5">
          <h2 id="pago" className="font-serif text-2xl text-verde-oscuro">
            Forma de pago
          </h2>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {paymentMethods.map((m) => (
              <label
                key={m.id}
                className={`flex cursor-pointer items-center gap-3 border p-4 text-sm font-medium transition-colors ${
                  form.payment === m.id ? "border-verde bg-crema/60" : "border-linea hover:border-gris"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={m.id}
                  checked={form.payment === m.id}
                  onChange={() => update("payment", m.id)}
                  className="accent-[var(--verde)]"
                />
                {m.label}
              </label>
            ))}
          </div>
          <p className="text-xs text-gris">Te enviamos los datos de pago por WhatsApp al confirmar el pedido.</p>
          <Field label="Notas del pedido" optional>
            <textarea
              name="notes"
              rows={3}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Ej: es para regalo, horario de entrega preferido…"
              className={inputClass()}
            />
          </Field>
        </section>
      </div>

      {/* Resumen */}
      <aside className="lg:sticky lg:top-40 lg:self-start">
        <div className="rounded-2xl bg-crema p-6">
          <h2 className="font-serif text-2xl text-verde-oscuro">Resumen</h2>

          {form.delivery === "envio" && (
            <div className="mt-5">
              <p className="text-sm">
                {missingForFree > 0 ? (
                  <>
                    Te faltan <strong>{formatPrice(missingForFree)}</strong> para el envío gratis.
                  </>
                ) : (
                  <strong className="text-verde">¡Tenés envío gratis!</strong>
                )}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-linea">
                <div className="h-full rounded-full bg-verde transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gris">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gris">Envío</dt>
              <dd>{form.delivery !== "envio" ? "Retiro sin cargo" : shipping === 0 ? "Gratis" : "A coordinar"}</dd>
            </div>
            <div className="flex justify-between border-t border-linea pt-3 text-lg font-semibold text-verde-oscuro">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal + (shipping ?? 0))}</dd>
            </div>
            {shipping === null && <p className="text-xs text-gris">+ costo de envío, que te confirmamos por WhatsApp.</p>}
          </dl>

          {hasOrderItems && (
            <p className="mt-5 rounded-lg bg-oro/15 px-3 py-2.5 text-xs text-verde-oscuro">
              Tu pedido incluye perfumes <strong>por encargo</strong>: llegan en aproximadamente {site.orderLeadDays}{" "}
              días. Los que están en stock se pueden enviar antes.
            </p>
          )}

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 bg-[#25D366] py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-95"
          >
            Enviar pedido por WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-gris">
            Se abre WhatsApp con tu pedido listo para enviar. Todavía no se cobra nada.
          </p>
        </div>
        <Link href="/fragancias/masculinas" className="mt-4 block text-center text-sm text-bordo underline">
          Seguir comprando
        </Link>
      </aside>
    </form>
  );
}
