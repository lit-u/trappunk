"use strict";
(() => {
  const config = window.TRAPFAN_SALES || {};
  const price = document.getElementById("salePrice");
  const availability = document.getElementById("saleAvailability");
  const status = document.getElementById("saleStatus");
  const self = document.getElementById("checkoutSelf");
  const gift = document.getElementById("checkoutGift");

  const validPrice = typeof config.unitPrice === "number" &&
    Number.isFinite(config.unitPrice) && config.unitPrice > 0;
  const safeStripeUrl = (s) => {
    if (typeof s !== "string" || !s) return null;
    try {
      const u = new URL(s);
      if (u.protocol !== "https:") return null;
      if (!["buy.stripe.com", "checkout.stripe.com"].includes(u.hostname)) return null;
      if (u.username || u.password || u.searchParams.has("redirect")) return null;
      if (u.pathname.length < 2) return null;
      return u.href;
    } catch (_) {
      return null;
    }
  };
  const selfUrl = safeStripeUrl(config.shipToMeStripeUrl);
  const giftUrl = safeStripeUrl(config.giftStripeUrl);

  if (validPrice) {
    price.textContent = new Intl.NumberFormat("en-IE", {
      style: "currency", currency: "EUR", maximumFractionDigits: 2
    }).format(config.unitPrice);
  } else {
    price.textContent = "Price not published yet";
  }
  availability.textContent = typeof config.stockLabel === "string" ?
    config.stockLabel.slice(0, 100) : "Availability confirmed before purchase";

  // Both flows must be configured. Partial activation would mislead buyers.
  const open = config.enabled === true && validPrice && selfUrl && giftUrl;
  if (!open) {
    status.textContent = "Checkout is not open yet. No payment or order is being accepted.";
    self.hidden = true;
    gift.hidden = true;
    return;
  }
  status.textContent = "Secure payment is handled by Stripe. The seller prepares and ships the device.";
  self.href = selfUrl;
  gift.href = giftUrl;
  self.hidden = false;
  gift.hidden = false;
})();
