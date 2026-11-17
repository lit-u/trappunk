"use strict";

/* Static regression checks for the photo refresh. Run with node tests/site-assets.test.cjs. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const photoPaths = [
  "assets/photos/home/home-hero-blue.webp",
  "assets/photos/fly/fly-gameplay.webp",
  "assets/photos/mosquito/mosquito-overview.webp",
  "assets/photos/trap/trap-gameplay.webp",
  "assets/photos/home/home-modes-marble.webp",
  "assets/photos/coach/coach-speed-side.webp",
  "assets/photos/coach/coach-trajectory.webp",
  "assets/photos/coach/coach-stats.webp",
  "assets/photos/coach/coach-results-grid.webp",
  "assets/photos/coach/coach-paused-trajectory.webp"
];
const htmlFiles = ["index.html", "order.html", "coach.html", "faq.html", "challenge.html", "community.html", "build.html", "install.html"];
const siteHtml = htmlFiles.map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");

for (const photoPath of photoPaths) {
  assert.ok(fs.existsSync(path.join(root, photoPath)), `missing photo asset: ${photoPath}`);
  const occurrences = siteHtml.split(photoPath).length - 1;
  assert.equal(occurrences, 1, `photo must be used once, found ${occurrences}: ${photoPath}`);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  assert.match(html, /HOME/);
  assert.match(html, /BUY DEVICE/);
  assert.match(html, /FAQ/);
  assert.match(html, /COACH/);
  assert.match(html, /TREE/);
  assert.match(html, /DISCUSSIONS/);
  for (const ref of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const target = ref[1].split("?")[0];
    if (!target || target.startsWith("#") || /^(?:https?:|mailto:|tel:|\/_vercel\/)/.test(target)) continue;
    assert.ok(fs.existsSync(path.join(root, target)), `${file} has a missing local asset: ${target}`);
  }
}

const order = fs.readFileSync(path.join(root, "order.html"), "utf8");
const renderNotice = "Illustrative product render; final appearance may vary.";
assert.equal(siteHtml.split(renderNotice).length - 1, photoPaths.length,
  "every supplied product render needs its visible illustrative-image notice");
assert.match(order, /Not included:<\/strong> microSD card/);
assert.match(order, /Shipping is additional/);
console.log("PASS: all 10 supplied visual assets are present, used once, and local site links resolve.");
