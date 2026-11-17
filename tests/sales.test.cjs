"use strict";
/* Static safety tests for the staged checkout page. Run with node tests/sales.test.cjs. */
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const root = path.resolve(__dirname, "..");
const script = fs.readFileSync(path.join(root, "assets/sales.js"), "utf8");
const config = fs.readFileSync(path.join(root, "assets/sales-config.js"), "utf8");

function render(salesConfig) {
  const elements = Object.fromEntries([
    "salePrice", "saleAvailability", "saleStatus",
    "checkoutSelf", "checkoutGift"
  ].map((id) => [id, { textContent: "", href: "#", hidden: true }]));
  const doc = { getElementById(id) {
    if (!elements[id]) throw new Error("Unknown DOM element: " + id);
    return elements[id];
  }};
  vm.runInNewContext(script, {
    window: { TRAPFAN_SALES: salesConfig },
    document: doc,
    URL, Intl
  });
  return elements;
}

assert.match(config, /enabled:\s*false/);
assert.match(config, /unitPrice:\s*99/);
let result = render({ enabled: false, unitPrice: null,
  shipToMeStripeUrl: "", giftStripeUrl: "" });
assert.equal(result.checkoutSelf.hidden, true);
assert.equal(result.checkoutGift.hidden, true);
assert.match(result.saleStatus.textContent, /not open yet/);

result = render({ enabled: true, unitPrice: 65,
  shipToMeStripeUrl: "https://buy.stripe.com/abcd",
  giftStripeUrl: "https://buy.stripe.com.evil.example/abcd" });
assert.equal(result.checkoutSelf.hidden, true);
assert.equal(result.checkoutGift.hidden, true);

result = render({ enabled: true, unitPrice: 65,
  shipToMeStripeUrl: "javascript:alert(1)",
  giftStripeUrl: "https://buy.stripe.com/abcd" });
assert.equal(result.checkoutSelf.hidden, true);

result = render({ enabled: true, unitPrice: 0,
  shipToMeStripeUrl: "https://buy.stripe.com/abc",
  giftStripeUrl: "https://buy.stripe.com/def" });
assert.equal(result.checkoutSelf.hidden, true);

result = render({ enabled: true, unitPrice: 65,
  shipToMeStripeUrl: "https://buy.stripe.com/abc",
  giftStripeUrl: "https://buy.stripe.com/def" });
assert.equal(result.checkoutSelf.hidden, false);
assert.equal(result.checkoutGift.hidden, false);
assert.equal(result.checkoutSelf.href, "https://buy.stripe.com/abc");
assert.equal(result.checkoutGift.href, "https://buy.stripe.com/def");
assert.match(result.salePrice.textContent, /65/);

for (const file of ["index.html", "build.html", "coach.html",
                    "challenge.html", "faq.html", "community.html", "install.html"]) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  assert.match(html, /href="order.html"/);
  assert.doesNotMatch(html, /<a href="install.html">INSTALL<\/a>/);
}

const order = fs.readFileSync(path.join(root, "order.html"), "utf8");
assert.match(order, /SHIP TO ME/);
assert.match(order, /SHIP TO A FRIEND/);
assert.match(order, /PASS ON MY DEVICE/);
assert.match(order, /privately with the seller/);
assert.match(order, /No payment or order is being accepted/);
assert.match(order, /€99/);
assert.match(order, /battery and a cardboard holder/);
assert.match(order, /microSD card/);
assert.match(order, /Shipping is additional/);
assert.doesNotMatch(order, /holder or SD card is not promised/);
console.log("PASS: staged Stripe checkout stays closed until all required public settings are ready.");
