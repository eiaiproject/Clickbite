export const SITE_CONFIG = {
  WHATSAPP_NUMBER: "https://wa.me/6285190691587",
  INSTAGRAM_URL: "https://www.instagram.com/clickbite_id",
  GOOGLE_MAPS_URL: "https://maps.app.goo.gl/8VAjDx7bAKHeqjmo7",
  assets: {
    logo: "/assets/logo/Clickbite.png",
    ogImage: "/assets/products/webp/burnt_cheesecake_16_classic.webp",
  },
  seo: {
    title:
      "Clickbite - Dessert Gift Sidoarjo | Burnt Cheesecake & Brownies Gift",
    description:
      "Clickbite adalah home-baked dessert gift di Sepande-Candi, Sidoarjo. Pesan burnt cheesecake, brownies gift, fudgy brownies, dan flower box cake untuk birthday, anniversary, hampers, dan surprise.",
    ogTitle:
      "Clickbite - Dessert Gift Sidoarjo | Burnt Cheesecake & Brownies Gift",
    ogDescription:
      "Home-baked dessert gift di Sepande-Candi, Sidoarjo untuk birthday, anniversary, hampers, thank-you gift, dan surprise manis.",
  },
};

export function getConfiguredUrl(value) {
  if (!value || value === "TO_BE_ADDED") {
    return "#";
  }

  return value;
}
