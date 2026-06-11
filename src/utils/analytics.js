export const ANALYTICS_EVENTS = {
  whatsappGlobal: "click_whatsapp_global",
  whatsappProduct: "click_whatsapp_product",
  categoryCard: "click_category_card",
  occasionChip: "click_occasion_chip",
  bestSellerCard: "click_best_seller_card",
  menuTab: "click_menu_tab",
  instagram: "click_instagram",
  maps: "click_maps",
  scrollToMenu: "scroll_to_menu",
  scrollToFaq: "scroll_to_faq",
};

export function trackEvent(name, payload = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    ...payload,
  });

  window.dispatchEvent(
    new CustomEvent("clickbite:analytics", {
      detail: { event: name, payload },
    })
  );
}

export function bindAnalytics(root = document) {
  root.addEventListener("click", (event) => {
    const target = event.target.closest("[data-analytics-event]");

    if (!target) {
      return;
    }

    trackEvent(target.dataset.analyticsEvent, {
      id: target.dataset.analyticsId,
      label: target.dataset.analyticsLabel || target.textContent.trim(),
    });
  });
}
