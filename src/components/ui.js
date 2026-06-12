import { ANALYTICS_EVENTS } from "../utils/analytics.js";
import { getGenericOrderUrl, getProductOrderUrl } from "../utils/whatsapp.js";

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function PriceTag(label) {
  return `<span class="price-tag">${escapeHtml(label)}</span>`;
}

export function Button({
  label,
  href = "#",
  variant = "primary",
  icon = "WA",
  analyticsEvent,
  analyticsId,
  analyticsLabel,
  extraClass = "",
  target = "",
}) {
  const targetAttrs = target
    ? ` target="${target}" rel="noopener noreferrer"`
    : "";
  const analyticsAttrs = analyticsEvent
    ? ` data-analytics-event="${escapeHtml(analyticsEvent)}" data-analytics-id="${escapeHtml(
        analyticsId || ""
      )}" data-analytics-label="${escapeHtml(analyticsLabel || label)}"`
    : "";

  return `<a class="btn btn-${variant} ${extraClass}" href="${escapeHtml(
    href
  )}"${targetAttrs}${analyticsAttrs}>
    <span>${escapeHtml(label)}</span>
    ${icon ? `<span class="btn-icon" aria-hidden="true">${escapeHtml(icon)}</span>` : ""}
  </a>`;
}

export function SectionTitle({ eyebrow, title, subtitle }) {
  return `<div class="section-title">
    ${eyebrow ? `<span class="eyebrow">${escapeHtml(eyebrow)}</span>` : ""}
    <h2>${escapeHtml(title)}</h2>
    ${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ""}
  </div>`;
}

export function ProductCard(
  product,
  {
    analyticsEvent = ANALYTICS_EVENTS.whatsappProduct,
    variant = "",
  } = {}
) {
  return `<article class="product-card ${variant}" data-product-id="${escapeHtml(
    product.id
  )}">
    <div class="product-media">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(
        product.name
      )} dari Clickbite" loading="lazy" width="1080" height="1080">
      ${PriceTag(product.priceLabel)}
    </div>
    <div class="product-content">
      <h3>${escapeHtml(product.name)}</h3>
      <p class="product-size">${escapeHtml(product.size)}</p>
      ${Button({
        label: "Order",
        href: getProductOrderUrl(product),
        variant: "primary",
        analyticsEvent,
        analyticsId: product.id,
        analyticsLabel: product.name,
        extraClass: "btn-full",
        target: "_blank",
      })}
    </div>
  </article>`;
}

export function StickyBottomCTA() {
  return `<aside class="sticky-cta is-hidden" aria-label="Order cepat via WhatsApp">
    <span>Sudah pilih produk?</span>
    ${Button({
      label: "Order via WhatsApp",
      href: getGenericOrderUrl(),
      variant: "primary",
      analyticsEvent: ANALYTICS_EVENTS.whatsappGlobal,
      analyticsId: "sticky-bottom",
      analyticsLabel: "Sticky bottom WhatsApp",
      target: "_blank",
    })}
  </aside>`;
}
