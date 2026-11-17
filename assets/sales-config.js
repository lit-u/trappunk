/* Public settings only. Never place secret API keys or personal data here.
   Checkout stays closed until genuine Stripe links and price are configured. */
window.TRAPFAN_SALES = Object.freeze({
  enabled: false,
  currency: "EUR",
  unitPrice: null,
  shipToMeStripeUrl: "",
  giftStripeUrl: "",
  stockLabel: "Availability confirmed before purchase"
});
