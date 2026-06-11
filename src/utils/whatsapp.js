import { SITE_CONFIG } from "../config.js";

const PLACEHOLDER_NUMBER = "TO_BE_ADDED";

export function getGenericOrderMessage() {
  return `Halo Clickbite, aku mau tanya menu dan order.

Nama:
Tanggal ambil/kirim:
Momen: Birthday / Anniversary / Gift / Lainnya
Budget:
Pengiriman: Pickup / GoSend / Kurir
Alamat:`;
}

export function getProductOrderMessage(product) {
  return `Halo Clickbite, aku mau order:

Menu: ${product.name}
Ukuran: ${product.size}
Harga: ${product.priceLabel}
Tanggal ambil/kirim:
Tulisan di cake/brownies:
Pengiriman: Pickup / GoSend / Kurir
Nama:
Alamat:`;
}

function normalizeWhatsAppNumber(number) {
  if (!number || number === PLACEHOLDER_NUMBER) {
    return "";
  }

  return number.replace(/\D/g, "");
}

export function buildWhatsAppUrl(message) {
  const encodedMessage = encodeURIComponent(message.trim());
  const number = normalizeWhatsAppNumber(SITE_CONFIG.WHATSAPP_NUMBER);

  if (!number) {
    return `https://api.whatsapp.com/send?text=${encodedMessage}`;
  }

  return `https://wa.me/${number}?text=${encodedMessage}`;
}

export function getGenericOrderUrl() {
  return buildWhatsAppUrl(getGenericOrderMessage());
}

export function getProductOrderUrl(product) {
  return buildWhatsAppUrl(getProductOrderMessage(product));
}
