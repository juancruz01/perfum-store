import { deliveryOptions, paymentMethods, site, type DeliveryOptionId, type PaymentMethodId } from "@/config/site";
import type { CartItem } from "./cart";
import { productTitle } from "./catalog";
import { formatPrice } from "./format";

export interface OrderForm {
  name: string;
  phone: string;
  delivery: DeliveryOptionId;
  address: string;
  city: string;
  province: string;
  zip: string;
  payment: PaymentMethodId;
  notes: string;
}

export type OrderErrors = Partial<Record<keyof OrderForm, string>>;

export const emptyOrderForm: OrderForm = {
  name: "",
  phone: "",
  delivery: "envio",
  address: "",
  city: "",
  province: "",
  zip: "",
  payment: "transferencia",
  notes: "",
};

export function validateOrder(form: OrderForm): OrderErrors {
  const errors: OrderErrors = {};
  if (form.name.trim().length < 2) errors.name = "Ingresá tu nombre y apellido.";
  if (form.phone.replace(/\D/g, "").length < 8) errors.phone = "Ingresá un teléfono válido.";
  if (form.delivery === "envio") {
    if (!form.address.trim()) errors.address = "Ingresá la dirección.";
    if (!form.city.trim()) errors.city = "Ingresá la localidad.";
    if (!form.province.trim()) errors.province = "Ingresá la provincia.";
  }
  return errors;
}

/** Costo de envío: 0 si es retiro o supera el mínimo; null si hay que coordinarlo. */
export function shippingCost(subtotal: number, delivery: DeliveryOptionId): number | null {
  if (delivery !== "envio") return 0;
  return subtotal >= site.freeShippingFrom ? 0 : null;
}

export function newOrderNumber(date = new Date()) {
  const yymmdd = date.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PS-${yymmdd}-${rand}`;
}

/** Texto del pedido que se envía por WhatsApp. */
export function buildOrderMessage(orderNumber: string, items: CartItem[], form: OrderForm) {
  const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
  const shipping = shippingCost(subtotal, form.delivery);
  const delivery = deliveryOptions.find((d) => d.id === form.delivery)!;
  const payment = paymentMethods.find((p) => p.id === form.payment)!;

  const lines = items.map((i) => {
    const details = [i.product.concentration, i.product.size].filter(Boolean).join(" ");
    const stock = i.product.stock === "encargo" ? " [por encargo]" : " [en stock]";
    return `• ${i.qty} x ${productTitle(i.product)}${details ? ` (${details})` : ""}${stock} — ${formatPrice(i.qty * i.product.price)}`;
  });

  const shippingText =
    form.delivery !== "envio" ? "Retiro sin cargo" : shipping === 0 ? "Gratis" : "A coordinar";
  const totalText = shipping === null ? `${formatPrice(subtotal)} + envío` : formatPrice(subtotal + shipping);

  const address =
    form.delivery === "envio"
      ? [form.address, form.city, form.province, form.zip && `CP ${form.zip}`].filter(Boolean).join(", ")
      : null;

  return [
    `¡Hola ${site.name}! Quiero hacer este pedido:`,
    ``,
    `*Pedido ${orderNumber}*`,
    ...lines,
    ``,
    `Subtotal: ${formatPrice(subtotal)}`,
    `Envío: ${shippingText}`,
    `*Total: ${totalText}*`,
    ``,
    `*Mis datos*`,
    `Nombre: ${form.name.trim()}`,
    `Teléfono: ${form.phone.trim()}`,
    `Entrega: ${delivery.label}`,
    ...(address ? [`Dirección: ${address}`] : []),
    `Pago: ${payment.label}`,
    ...(form.notes.trim() ? [`Notas: ${form.notes.trim()}`] : []),
  ].join("\n");
}
