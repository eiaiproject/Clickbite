import { SITE_CONFIG, getConfiguredUrl } from "./config.js";
import {
  bestSellerIds,
  categories,
  getBestSellerProducts,
  getProductById,
  getProductsByCategory,
  occasionChips,
  occasionRecommendations,
} from "./data/products.js";
import {
  Accordion,
  Badge,
  Button,
  CategoryCard,
  ProductCard,
  SectionTitle,
  StickyBottomCTA,
  Tabs,
  escapeHtml,
} from "./components/ui.js";
import { ANALYTICS_EVENTS, bindAnalytics, trackEvent } from "./utils/analytics.js";
import {
  getGenericOrderMessage,
  getGenericOrderUrl,
} from "./utils/whatsapp.js";

const app = document.querySelector("#app");
let activeCategory = "burnt-cheesecake";
let activeOccasion = "Birthday";

const trustItems = [
  ["Fresh", "Home-baked fresh by order"],
  ["Text", "Bisa request tulisan"],
  ["Gift", "Cocok untuk gift & surprise"],
  ["Ship", "Pickup, GoSend, atau kurir"],
  ["Pack", "Packaging cantik dengan pita"],
  ["Local", "Area Sepande-Candi, Sidoarjo"],
];

const orderSteps = [
  ["1", "Pilih menu favorit", "Cek best seller atau menu lengkap."],
  ["2", "Klik WhatsApp", "Kirim format order otomatis."],
  ["3", "Konfirmasi jadwal", "Admin cek slot produksi dan pengiriman."],
  ["4", "Pembayaran", "Lakukan pembayaran atau DP sesuai arahan admin."],
  ["5", "Pickup / Dikirim", "Pesanan bisa self pickup, GoSend, atau kurir."],
];

const orderNotes = [
  "Sebagian menu PO H-1.",
  "Flower Box Cake order H-3.",
  "Greeting card +3k.",
  "Box full mika +7k.",
  "Max tulisan brownies gift 20 huruf.",
];

const testimonials = [
  ["A", "Cake-nya cantik banget buat surprise ulang tahun."],
  ["R", "Tulisannya rapi, packaging-nya gemes."],
  ["N", "Admin responsif dan bisa bantu pilih menu."],
];

const faqItems = [
  {
    question: "Apakah bisa order dadakan?",
    answer:
      "Tergantung slot produksi. Disarankan order H-1 untuk sebagian menu.",
  },
  {
    question: "Flower Box Cake harus order H-berapa?",
    answer: "Flower Box Cake perlu order H-3.",
  },
  {
    question: "Bisa request tulisan?",
    answer: "Bisa untuk beberapa menu. Brownies gift maksimal 20 huruf.",
  },
  {
    question: "Bisa request topping?",
    answer: "Bisa untuk beberapa menu, silakan konfirmasi ke admin.",
  },
  {
    question: "Bisa dikirim?",
    answer: "Bisa self pickup, GoSend, atau kurir.",
  },
  {
    question: "Lokasinya di mana?",
    answer: "Sepande-Candi, Sidoarjo.",
  },
  {
    question: "Ada greeting card?",
    answer: "Ada, greeting card +3k.",
  },
  {
    question: "Apakah sudah termasuk lilin dan pita?",
    answer:
      "Beberapa menu sudah termasuk lilin dan pita. Cek detail menu atau tanya admin.",
  },
];

function Header() {
  return `<header class="site-header">
    <div class="container header-inner">
      <a class="logo-link" href="#top" aria-label="Clickbite home">
        <img src="${SITE_CONFIG.assets.logo}" alt="Clickbite" width="200" height="200">
      </a>
      <nav class="desktop-nav" aria-label="Navigasi utama">
        <a href="#menu" data-analytics-event="${ANALYTICS_EVENTS.scrollToMenu}" data-analytics-id="header-menu">Menu</a>
        <a href="#best-seller">Best Seller</a>
        <a href="#cara-order">Cara Order</a>
        <a href="#faq" data-analytics-event="${ANALYTICS_EVENTS.scrollToFaq}" data-analytics-id="header-faq">FAQ</a>
      </nav>
      ${Button({
        label: "Order WA",
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
        ${Badge("Home-baked Dessert Gift Sidoarjo", "cream")}
        <h1 id="hero-title">Dessert Gift Cantik untuk Momen Spesialmu</h1>
        <p>Burnt cheesecake, brownies gift, dan flower box cake home-baked dari Sidoarjo. Bisa request tulisan untuk birthday, anniversary, thank-you gift, dan surprise.</p>
        <div class="hero-actions">
          ${Button({
            label: "Order via WhatsApp",
            href: getGenericOrderUrl(),
            variant: "primary",
            analyticsEvent: ANALYTICS_EVENTS.whatsappGlobal,
            analyticsId: "hero",
            analyticsLabel: "Hero WhatsApp",
            target: "_blank",
          })}
          ${Button({
            label: "Lihat Menu",
            href: "#menu",
            variant: "secondary",
            icon: "Menu",
            analyticsEvent: ANALYTICS_EVENTS.scrollToMenu,
            analyticsId: "hero-menu",
            analyticsLabel: "Hero lihat menu",
          })}
        </div>
        <div class="quick-info" aria-label="Info cepat Clickbite">
          <span><b>Loc</b> Sepande-Candi</span>
          <span><b>Send</b> Pickup / GoSend / Kurir</span>
          <span><b>Text</b> Bisa request tulisan</span>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <img class="hero-visual-main" src="/assets/products/webp/burnt_cheesecake_16_classic.webp" alt="" width="1080" height="1080" loading="eager" fetchpriority="high">
        <img class="hero-visual-accent" src="/assets/products/webp/flower_box_cake.webp" alt="" width="1080" height="1080" loading="eager">
      </div>
    </div>
  </section>`;
}

function CategorySection() {
  return `<section class="section section-cream" id="kategori">
    <div class="container">
      ${SectionTitle({
        eyebrow: "Mulai dari kategori",
        title: "Pilih Kategori Favoritmu",
        subtitle: "Pilih cake, brownies gift, atau flower box sesuai momen dan budget.",
      })}
      <div class="category-grid">
        ${categories
          .filter((category) => category.id !== "add-ons")
          .map(CategoryCard)
          .join("")}
      </div>
    </div>
  </section>`;
}

function OccasionSection() {
  return `<section class="section" id="momen">
    <div class="container">
      ${SectionTitle({
        eyebrow: "Bantu pilih cepat",
        title: "Pilih Berdasarkan Momen",
        subtitle: "Bingung mau pilih yang mana? Mulai dari momennya dulu.",
      })}
      <div class="chip-row" id="occasion-chips" aria-label="Pilihan momen"></div>
      <div class="recommendation-grid" id="occasion-products"></div>
    </div>
  </section>`;
}

function BestSellerSection() {
  return `<section class="section section-pink" id="best-seller">
    <div class="container">
      ${SectionTitle({
        eyebrow: "Favorit customer",
        title: "Best Seller Clickbite",
        subtitle: "Bingung pilih yang mana? Ini menu favorit untuk surprise.",
      })}
      <div class="horizontal-scroll best-seller-grid">
        ${getBestSellerProducts()
          .map((product) =>
            ProductCard(product, {
              compact: true,
              showCategory: true,
              analyticsEvent: ANALYTICS_EVENTS.bestSellerCard,
              variant: "product-card-compact",
            })
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function MenuSection() {
  return `<section class="section" id="menu">
    <div class="container">
      ${SectionTitle({
        eyebrow: "Katalog lengkap",
        title: "Menu Clickbite",
        subtitle:
          "Lihat pilihan dessert gift dan pilih yang paling cocok untuk momenmu.",
      })}
      <div id="menu-tabs"></div>
      <div class="menu-grid" id="menu-products" aria-live="polite"></div>
    </div>
  </section>`;
}

function WhySection() {
  return `<section class="section section-cream" id="kenapa">
    <div class="container">
      ${SectionTitle({
        eyebrow: "Kenapa pilih Clickbite",
        title: "Gift cantik, order tetap simpel",
        subtitle: "Detail kecil yang bikin dessert lebih siap jadi hadiah.",
      })}
      <div class="trust-grid">
        ${trustItems
          .map(
            ([icon, text]) => `<article class="trust-card">
              <span aria-hidden="true">${escapeHtml(icon)}</span>
              <h3>${escapeHtml(text)}</h3>
            </article>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function OrderSection() {
  return `<section class="section" id="cara-order">
    <div class="container">
      ${SectionTitle({
        eyebrow: "Cara order",
        title: "Dari pilih menu sampai pesanan dikirim",
        subtitle: "Format WhatsApp sudah rapi, tinggal lengkapi jadwal dan detail tulisan.",
      })}
      <div class="order-layout">
        <div class="steps">
          ${orderSteps
            .map(
              ([number, title, body]) => `<article class="step-card">
                <span>${escapeHtml(number)}</span>
                <div>
                  <h3>${escapeHtml(title)}</h3>
                  <p>${escapeHtml(body)}</p>
                </div>
              </article>`
            )
            .join("")}
        </div>
        <aside class="note-panel" aria-label="Catatan order">
          <h3>Catatan sebelum order</h3>
          <ul>
            ${orderNotes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
          </ul>
        </aside>
      </div>
    </div>
  </section>`;
}

function WhatsAppPreviewSection() {
  return `<section class="section section-pink" id="order-preview">
    <div class="container preview-layout">
      <div>
        ${SectionTitle({
          eyebrow: "Format order",
          title: "Chat admin dengan detail yang sudah rapi",
          subtitle:
            "Klik produk tertentu untuk format yang otomatis membawa nama menu, ukuran, dan harga.",
        })}
        ${Button({
          label: "Chat Admin Clickbite",
          href: getGenericOrderUrl(),
          variant: "primary",
          analyticsEvent: ANALYTICS_EVENTS.whatsappGlobal,
          analyticsId: "preview",
          analyticsLabel: "Preview WhatsApp",
          target: "_blank",
        })}
      </div>
      <div class="chat-preview" aria-label="Preview format WhatsApp">
        <span class="chat-name">Clickbite Admin</span>
        <pre>${escapeHtml(getGenericOrderMessage())}</pre>
      </div>
    </div>
  </section>`;
}

function TestimonialsSection() {
  return `<section class="section" id="testimoni">
    <div class="container">
      ${SectionTitle({
        eyebrow: "Testimoni",
        title: "Kesan manis dari customer",
        subtitle: "Placeholder sampai testimoni real disetujui client.",
      })}
      <div class="testimonial-grid horizontal-scroll">
        ${testimonials
          .map(
            ([initial, quote]) => `<article class="testimonial-card">
              <span>${escapeHtml(initial)}</span>
              <p>${escapeHtml(quote)}</p>
            </article>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function FaqSection() {
  return `<section class="section section-cream" id="faq">
    <div class="container faq-layout">
      ${SectionTitle({
        eyebrow: "FAQ",
        title: "Pertanyaan yang sering ditanyakan",
        subtitle: "Jawaban singkat sebelum kamu lanjut chat admin.",
      })}
      ${Accordion(faqItems)}
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
      <h2>Bikin Momenmu Lebih Manis Bareng Clickbite</h2>
      <p>Pilih dessert gift favoritmu, tulis pesan manisnya, lalu order via WhatsApp.</p>
      <div class="final-actions">
        ${Button({
          label: "Order Sekarang via WhatsApp",
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
        <p>Home-baked Dessert Gift - Sepande-Candi, Sidoarjo</p>
        <p>Pickup / GoSend / Kurir</p>
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

function renderOccasionChips() {
  const chipRoot = document.querySelector("#occasion-chips");
  chipRoot.innerHTML = occasionChips
    .map(
      (chip) => `<button class="chip ${chip === activeOccasion ? "is-active" : ""}" type="button" data-occasion="${escapeHtml(
        chip
      )}" data-analytics-event="${ANALYTICS_EVENTS.occasionChip}" data-analytics-id="${escapeHtml(
        chip
      )}" data-analytics-label="${escapeHtml(chip)}">${escapeHtml(chip)}</button>`
    )
    .join("");
}

function renderOccasionProducts() {
  const productRoot = document.querySelector("#occasion-products");
  const recommendationIds = occasionRecommendations[activeOccasion] || [];
  const products = recommendationIds.map(getProductById).filter(Boolean);

  productRoot.innerHTML = products
    .map((product) =>
      ProductCard(product, {
        compact: true,
        showCategory: true,
        analyticsEvent: ANALYTICS_EVENTS.whatsappProduct,
      })
    )
    .join("");
}

function renderOccasionSection() {
  renderOccasionChips();
  renderOccasionProducts();
}

function renderMenu() {
  const tabsRoot = document.querySelector("#menu-tabs");
  const productRoot = document.querySelector("#menu-products");
  const products = getProductsByCategory(activeCategory);

  tabsRoot.innerHTML = Tabs(categories, activeCategory);
  productRoot.innerHTML = products
    .map((product) =>
      ProductCard(product, {
        showCategory: false,
        analyticsEvent: ANALYTICS_EVENTS.whatsappProduct,
      })
    )
    .join("");
}

function setActiveCategory(categoryId, shouldScroll = false) {
  if (!categories.some((category) => category.id === categoryId)) {
    return;
  }

  activeCategory = categoryId;
  renderMenu();

  if (shouldScroll) {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
    trackEvent(ANALYTICS_EVENTS.scrollToMenu, { id: categoryId });
  }
}

function bindInteractions() {
  document.addEventListener("click", (event) => {
    const categoryCard = event.target.closest("[data-category-id]");
    const menuTab = event.target.closest("[data-menu-tab]");
    const occasionChip = event.target.closest("[data-occasion]");
    const placeholderLink = event.target.closest(".placeholder-link");

    if (placeholderLink) {
      event.preventDefault();
      return;
    }

    if (categoryCard) {
      setActiveCategory(categoryCard.dataset.categoryId, true);
      return;
    }

    if (menuTab) {
      setActiveCategory(menuTab.dataset.menuTab);
      return;
    }

    if (occasionChip) {
      activeOccasion = occasionChip.dataset.occasion;
      renderOccasionSection();
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

function bindScrollReveal() {
  // Keep content visible immediately; CSS handles subtle motion without hiding sections.
}

function bindImageFadeIn() {
  // Images are now visible by default, no fade-in needed
}

function bindAccordion() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".accordion-trigger");
    if (!trigger) return;

    const item = trigger.closest(".accordion-item");
    const body = item.querySelector(".accordion-body");
    const isOpen = item.classList.contains("is-open");

    item.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", !isOpen);
  });
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
      ${CategorySection()}
      ${OccasionSection()}
      ${BestSellerSection()}
      ${MenuSection()}
      ${WhySection()}
      ${OrderSection()}
      ${WhatsAppPreviewSection()}
      ${TestimonialsSection()}
      ${FaqSection()}
      ${FinalCtaSection()}
    </main>
    ${Footer()}
    ${StickyBottomCTA()}
  `;

  renderOccasionSection();
  renderMenu();
}

applySeoMetadata();
renderApp();
bindAnalytics(document);
bindInteractions();
bindStickyCta();
bindScrollReveal();
bindImageFadeIn();
bindAccordion();

window.ClickbiteAnalyticsEvents = ANALYTICS_EVENTS;
window.ClickbiteBestSellerIds = bestSellerIds;
