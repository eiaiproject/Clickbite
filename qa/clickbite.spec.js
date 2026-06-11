import { expect, test } from "@playwright/test";

const viewports = [360, 390, 430, 768, 1024, 1280];

test.use({ channel: "chrome" });

for (const width of viewports) {
  test(`landing page responsive smoke ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 780 : 900 });
    await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      const step = Math.max(320, window.innerHeight * 0.75);
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 45));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const imageSources = [
        ...new Set(
          [...document.images].map((img) => img.currentSrc || img.src).filter(Boolean)
        ),
      ];
      return {
        scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
        innerWidth: window.innerWidth,
        imageSources,
        productCards: document.querySelectorAll(".product-card").length,
        categoryCards: document.querySelectorAll(".category-card").length,
        tabs: document.querySelectorAll("[data-menu-tab]").length,
        chips: document.querySelectorAll("[data-occasion]").length,
        analyticsEvents: Object.keys(window.ClickbiteAnalyticsEvents || {}).length,
        title: document.title,
        description:
          document.querySelector('meta[name="description"]')?.content || "",
        globalHref: document.querySelector(".site-header a.btn")?.href || "",
      };
    });
    const brokenImages = [];
    for (const imageSource of metrics.imageSources) {
      const response = await page.request.get(imageSource);
      if (!response.ok()) {
        brokenImages.push(imageSource);
      }
    }

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth + 1);
    expect(brokenImages).toEqual([]);
    expect(metrics.productCards).toBeGreaterThanOrEqual(12);
    expect(metrics.categoryCards).toBe(4);
    expect(metrics.tabs).toBe(5);
    expect(metrics.chips).toBe(8);
    expect(metrics.analyticsEvents).toBeGreaterThanOrEqual(10);
    expect(metrics.title).toContain("Clickbite");
    expect(metrics.description).toContain("home-baked dessert gift");
    expect(metrics.globalHref).toContain("text=Halo%20Clickbite");

    await page.click('[data-menu-tab="brownies-gift"]');
    await expect(page.locator("#menu-products .product-card")).toHaveCount(6);

    await page.click('[data-occasion="Anniversary"]');
    await expect(page.locator("#occasion-products .product-card")).toHaveCount(2);

    await page.click(".accordion-trigger");
    await expect(page.locator(".accordion-item.is-open")).toHaveCount(1);

    const productHref = await page
      .locator("#menu-products .product-card a.btn")
      .first()
      .getAttribute("href");
    expect(productHref).toContain("Menu%3A%20Brownies");
    expect(productHref).toContain("Harga%3A%20IDR");

    if (width < 768) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction(
        () => document.querySelector(".sticky-cta")?.classList.contains("is-hidden"),
        { timeout: 3000 }
      );
      await expect(page.locator(".sticky-cta")).toHaveClass(/is-hidden/);
      await page.evaluate(() => window.scrollTo(0, window.innerHeight));
      await page.waitForFunction(
        () => !document.querySelector(".sticky-cta")?.classList.contains("is-hidden"),
        { timeout: 3000 }
      );
      await expect(page.locator(".sticky-cta")).not.toHaveClass(/is-hidden/);
    }
  });
}
