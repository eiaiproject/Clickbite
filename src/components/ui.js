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

export function Badge(label, tone = "pink") {
  return `<span class="badge badge-${tone}">${escapeHtml(label)}</span>`;
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
    compact = false,
    showCategory = false,
    analyticsEvent = ANALYTICS_EVENTS.whatsappProduct,
    variant = "",
  } = {}
) {
  const features = product.features
    .slice(0, compact ? 2 : 3)
    .map((feature) => `<li>${escapeHtml(feature)}</li>`)
    .join("");
  const badges = product.badges
    .slice(0, compact ? 2 : 3)
    .map((badge) => Badge(badge, badge.includes("Best") ? "yellow" : "pink"))
    .join("");

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
      <div class="product-badges">${badges}</div>
      ${
        showCategory
          ? `<p class="product-category">${escapeHtml(product.categoryLabel)}</p>`
          : ""
      }
      <h3>${escapeHtml(product.name)}</h3>
      <p class="product-size">${escapeHtml(product.size)}</p>
      <p class="product-description">${escapeHtml(product.description)}</p>
      <ul class="feature-list">${features}</ul>
      <p class="lead-time">${escapeHtml(product.orderLeadTime)}</p>
      ${Button({
        label: "Order via WA",
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

export function CategoryCard(category) {
  return `<button class="category-card" type="button" data-category-id="${escapeHtml(
    category.id
  )}" data-analytics-event="${
    ANALYTICS_EVENTS.categoryCard
  }" data-analytics-id="${escapeHtml(category.id)}" data-analytics-label="${escapeHtml(
    category.label
  )}">
    <img src="${escapeHtml(category.image)}" alt="${escapeHtml(
    category.label
  )} Clickbite" loading="lazy" width="1080" height="1080">
    <span class="category-price">${escapeHtml(category.priceLabel)}</span>
    <span class="category-body">
      <strong>${escapeHtml(category.label)}</strong>
      <span>${escapeHtml(category.description)}</span>
      <em>Lihat Menu</em>
    </span>
  </button>`;
}

export function Tabs(categories, activeCategory) {
  return `<div class="tabs" role="tablist" aria-label="Kategori menu Clickbite">
    ${categories
      .map(
        (category) => `<button
          class="tab ${category.id === activeCategory ? "is-active" : ""}"
          type="button"
          role="tab"
          aria-selected="${category.id === activeCategory ? "true" : "false"}"
          data-menu-tab="${escapeHtml(category.id)}"
          data-analytics-event="${ANALYTICS_EVENTS.menuTab}"
          data-analytics-id="${escapeHtml(category.id)}"
          data-analytics-label="${escapeHtml(category.label)}"
        >${escapeHtml(category.label)}</button>`
      )
      .join("")}
  </div>`;
}

export function Accordion(items) {
  return `<div class="accordion">
    ${items
      .map(
        (item, index) => `<div class="accordion-item">
          <button class="accordion-trigger" type="button" aria-expanded="false" aria-controls="faq-${index}">
            <span>${escapeHtml(item.question)}</span>
            <span class="accordion-icon" aria-hidden="true">+</span>
          </button>
          <div class="accordion-body" id="faq-${index}" role="region">
            <div>
              <p>${escapeHtml(item.answer)}</p>
            </div>
          </div>
        </div>`
      )
      .join("")}
  </div>`;
}

export function StickyBottomCTA() {
  return `<aside class="sticky-cta is-hidden" aria-label="Order cepat via WhatsApp">
    <span>Sudah pilih menu?</span>
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
