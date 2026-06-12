import { SITE_CONFIG, getConfiguredUrl } from "./config.js";
import { products } from "./data/products.js";
import {
  Button,
  ProductCard,
  SectionTitle,
  StickyBottomCTA,
  escapeHtml,
} from "./components/ui.js";
import { ANALYTICS_EVENTS, bindAnalytics } from "./utils/analytics.js";
import { getGenericOrderUrl } from "./utils/whatsapp.js";

const app = document.querySelector("#app");
const menuProducts = products.filter((product) => product.category !== "add-ons");

const orderHighlights = [
  ["PO", "H-1 untuk sebagian menu"],
  ["Flower Box", "Order H-3"],
  ["Kirim", "Pickup / GoSend / Kurir"],
  ["Lokasi", "Sepande-Candi"],
];

function Header() {
  return `<header class="site-header">
    <div class="container header-inner">
      <a class="logo-link" href="#top" aria-label="Clickbite home">
        <img src="${SITE_CONFIG.assets.logo}" alt="Clickbite" width="200" height="200">
      </a>
      <nav class="desktop-nav" aria-label="Navigasi utama">
        <a href="#menu" data-analytics-event="${ANALYTICS_EVENTS.scrollToMenu}" data-analytics-id="header-menu">Produk</a>
        <a href="#cara-order">Order</a>
      </nav>
      ${Button({
        label: "WhatsApp",
        href: getGenericOrderUrl(),
        variant: "primary",
        analyticsEvent: ANALYTICS_EVENTS.whatsappGlobal,
        analyticsId: "header",
        analyticsLabel: "Header WhatsApp",
        target: "_blank",
      })}
    </div>
  </header>`;
}

function Hero() {
  return `<section class="hero" id="top" aria-labelledby="hero-title">
    <div class="container hero-inner">
      <div class="hero-copy">
        <span class="hero-kicker">Clickbite Sidoarjo</span>
        <h1 id="hero-title">Dessert Gift Clickbite</h1>
        <p>Home-baked cake dan brownies untuk hadiah. Pilih produk, lalu order via WhatsApp.</p>
        <div class="hero-actions">
          ${Button({
            label: "Order WhatsApp",
            href: getGenericOrderUrl(),
            variant: "primary",
            analyticsEvent: ANALYTICS_EVENTS.whatsappGlobal,
            analyticsId: "hero",
            analyticsLabel: "Hero WhatsApp",
            target: "_blank",
          })}
          ${Button({
            label: "Lihat Produk",
            href: "#menu",
            variant: "secondary",
            icon: "Menu",
            analyticsEvent: ANALYTICS_EVENTS.scrollToMenu,
            analyticsId: "hero-menu",
            analyticsLabel: "Hero lihat produk",
          })}
        </div>
        <div class="quick-info" aria-label="Info cepat Clickbite">
          <span>Request tulisan</span>
          <span>Pickup / GoSend / Kurir</span>
          <span>Sepande-Candi</span>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <img class="hero-visual-main" src="/assets/products/webp/burnt_cheesecake_16_classic.webp" alt="" width="1080" height="1080" loading="eager" fetchpriority="high">
        <img class="hero-visual-accent" src="/assets/products/webp/flower_box_cake.webp" alt="" width="1080" height="1080" loading="eager">
      </div>
    </div>
  </section>`;
}

function MenuSection() {
  return `<section class="section products-section" id="menu">
    <div class="container">
      ${SectionTitle({
        title: "Produk",
      })}
      <div class="menu-grid" id="menu-products" aria-live="polite">
        ${menuProducts
          .map((product) =>
            ProductCard(product, {
              analyticsEvent: ANALYTICS_EVENTS.whatsappProduct,
            })
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function OrderInfoSection() {
  return `<section class="order-mini" id="cara-order">
    <div class="container order-mini-inner">
      <div class="order-highlights" aria-label="Info order">
        ${orderHighlights
          .map(
            ([label, value]) => `<div>
              <span>${escapeHtml(label)}</span>
              <strong>${escapeHtml(value)}</strong>
            </div>`
          )
          .join("")}
      </div>
      ${Button({
        label: "Chat Admin",
        href: getGenericOrderUrl(),
        variant: "primary",
        analyticsEvent: ANALYTICS_EVENTS.whatsappGlobal,
        analyticsId: "order-info",
        analyticsLabel: "Order info WhatsApp",
        target: "_blank",
      })}
    </div>
  </section>`;
}

function externalLink(label, url, eventName, id) {
  const href = getConfiguredUrl(url);
  const isPlaceholder = href === "#";

  return `<a class="text-link ${isPlaceholder ? "placeholder-link" : ""}" href="${escapeHtml(
    href
  )}" ${
    isPlaceholder ? 'aria-disabled="true"' : 'target="_blank" rel="noopener noreferrer"'
  } data-analytics-event="${eventName}" data-analytics-id="${escapeHtml(id)}">${escapeHtml(
    label
  )}</a>`;
}

function FinalCtaSection() {
  return `<section class="final-cta" id="final-cta">
    <div class="container final-cta-inner">
      <h2>Sudah pilih produk?</h2>
      <div class="final-actions">
        ${Button({
          label: "Order WhatsApp",
          href: getGenericOrderUrl(),
          variant: "primary",
          analyticsEvent: ANALYTICS_EVENTS.whatsappGlobal,
          analyticsId: "final-cta",
          analyticsLabel: "Final CTA WhatsApp",
          target: "_blank",
        })}
        ${externalLink(
          "Instagram",
          SITE_CONFIG.INSTAGRAM_URL,
          ANALYTICS_EVENTS.instagram,
          "final-instagram"
        )}
        ${externalLink(
          "Google Maps",
          SITE_CONFIG.GOOGLE_MAPS_URL,
          ANALYTICS_EVENTS.maps,
          "final-maps"
        )}
      </div>
    </div>
  </section>`;
}

function Footer() {
  return `<footer class="site-footer">
    <div class="container footer-inner">
      <div>
        <img src="${SITE_CONFIG.assets.logo}" alt="Clickbite" width="200" height="200">
        <p>Home-baked dessert gift di Sepande-Candi, Sidoarjo.</p>
      </div>
      <nav aria-label="Link footer">
        ${externalLink(
          "Instagram",
          SITE_CONFIG.INSTAGRAM_URL,
          ANALYTICS_EVENTS.instagram,
          "footer-instagram"
        )}
        <a class="text-link" href="${getGenericOrderUrl()}" target="_blank" rel="noopener noreferrer" data-analytics-event="${ANALYTICS_EVENTS.whatsappGlobal}" data-analytics-id="footer-whatsapp">WhatsApp</a>
        ${externalLink(
          "Google Maps",
          SITE_CONFIG.GOOGLE_MAPS_URL,
          ANALYTICS_EVENTS.maps,
          "footer-maps"
        )}
      </nav>
    </div>
  </footer>`;
}

function bindInteractions() {
  document.addEventListener("click", (event) => {
    const placeholderLink = event.target.closest(".placeholder-link");

    if (placeholderLink) {
      event.preventDefault();
    }
  });
}

function bindStickyCta() {
  const stickyCta = document.querySelector(".sticky-cta");

  if (!stickyCta) {
    return;
  }

  const updateVisibility = () => {
    const showAfter = Math.min(520, window.innerHeight * 0.62);
    stickyCta.classList.toggle("is-hidden", window.scrollY < showAfter);
  };

  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
}

function applySeoMetadata() {
  document.title = SITE_CONFIG.seo.title;

  const metaUpdates = {
    description: SITE_CONFIG.seo.description,
    "og:title": SITE_CONFIG.seo.ogTitle,
    "og:description": SITE_CONFIG.seo.ogDescription,
    "og:image": SITE_CONFIG.assets.ogImage,
  };

  Object.entries(metaUpdates).forEach(([name, content]) => {
    const selector = name.startsWith("og:")
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`;
    const tag = document.querySelector(selector);
    tag?.setAttribute("content", content);
  });
}

function renderApp() {
  app.innerHTML = `
    ${Header()}
    <main>
      ${Hero()}
      ${MenuSection()}
      ${OrderInfoSection()}
      ${FinalCtaSection()}
    </main>
    ${Footer()}
    ${StickyBottomCTA()}
  `;
}

applySeoMetadata();
renderApp();
bindAnalytics(document);
bindInteractions();
bindStickyCta();

window.ClickbiteAnalyticsEvents = ANALYTICS_EVENTS;
