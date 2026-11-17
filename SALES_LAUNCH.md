# TrapFan selling a prepared device: staged Vercel storefront

**Status:** Preview only. NOT accepting orders, NOT charging cards.

## Fixed decisions

- The seller is the maker, who delivers **a prepared, flashed, tested
  Waveshare ESP32-S3 Touch LCD 3.49B V2 TrapFan device**.
- Do not offer buyers self-installation, a downloadable firmware release, or
  promises of installation support.
- Two paid checkout pathways: **SHIP TO ME** and **SHIP TO A FRIEND**.
- A gift recipient provides their delivery address **privately to the seller**,
  never through the public Challenge Forest. Buyer and recipient agree privately
  how the seller can contact the recipient. There is no mandatory next purchase.
- **PASS ON MY DEVICE** remains a free, voluntary action outside checkout.
- Neither payment details nor third-party delivery addresses should be
  stored in the public GitHub repository or Challenge Forest genealogy.
- Keep the existing TrapFan Vercel production deployment (from GitHub `main`)
  unchanged until the full checkout and legal terms are reviewed.

## Stripe Payment Links: simple phase 1

Two Stripe Payment Links (with the **same genuine device price** and accurate
tax/shipping arrangements) are sufficient initially. No website payment server
and no storage of credit cards are needed.

- **SHIP TO ME:** Stripe checkout collects buyer contact + shipping address
  for supported delivery destinations.
- **SHIP TO A FRIEND:** Stripe checkout does NOT collect a recipient's home
  address. The seller arranges a private handover of shipping details with the
  intended recipient after receiving verified payment. Use a unique private
  order reference; do not expose an email/address in public Challenge Forest.
- The site accepts neither orders nor payments until both genuine links are
  set in `assets/sales-config.js`, with a real positive EUR price and
  `enabled:true`. The script also refuses redirects to non-Stripe domains.
- Do not treat a browser returning from Stripe as proof of payment. Check
  the Stripe Dashboard's confirmed paid order before manufacturing/dispatch.
  In a later automated implementation use verified signed Stripe webhooks.

## Details REQUIRED BEFORE LIVE SALES

1. Announced bundle: **€99 for one tested, ready-to-use ESP32-S3 TrapFan device with an included battery and cardboard holder; no microSD card**. Exact battery type/capacity, charging safety, packaging, included cables, supported hardware revision and buyer instructions must be confirmed before enabling checkout. Do not advertise unverified battery runtime.
2. Announced selling price: **€99 per bundle**. Before enabling payments, verify applicable tax treatment, delivery rates, destination countries, lead time and stock. Shipping is extra and must be clear to buyers; never invent charges or lead times.
3. Seller's legally required name/business details and contact channel.
   Explicit permission needed before publishing private contact data.
4. Payment acceptance/verified Stripe account and two real Payment Links.
   No credentials in `sales-config.js` or GitHub. Only public checkout links.
5. Consumer information, returns/14-day withdrawal rights where applicable,
   warranty/defects, privacy and personal-data retention. For Lithuania
   consult VVTAT and current EU requirements for accessible online
   contract withdrawal (https://vvtat.lrv.lt/lt/DUK/ and
   https://vvtat.lrv.lt/lt/naujienos-ir-pranesimai-ziniasklaidai-377/vvtat-primena-elektronineje-prekyboje-turi-atsirasti-sutarties-atsisakymo-mygtukas-SCA/).
   Get legal/tax specifics verified before enabling checkout.
6. Run a **Stripe test purchase**, check shipping collection, buyer emails,
   gift-recipient private follow-up and refund workflow; then switch to live
   links. A static clickable link is not a complete operational store.

## What this PR changes

- New `order.html`, `assets/sales.css`, `assets/sales.js`,
  `assets/sales-config.js`.
- Navbar adds BUY DEVICE to existing simplified menu (no removed pages resurrected);
  `install.html` remains a legacy informational path, no download/installer.
- Site brand shown as TRAP (green) + FAN (red), matching the board.
- No firmware source/image, Flash or ESP32 build changes.
- No payment account, secret, checkout or customer database created.
- Until launch the user sees a clear no-payment status and no clickable BUY
  buttons, even on the Vercel preview.
