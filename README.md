# TRAPPUNK
**Olympic Trap Gyro Simulator**

Public project website for a low-cost, ESP32-S3-based Olympic Trap training simulator.

**Status:** Public TRAPPUNK information site. Browser installation is not offered. The simulator firmware and its source remain private.

## Website
Once GitHub Pages is enabled: https://lit-u.github.io/trappunk/

## Pages
- Home: `index.html`
- V2 information and community contact: `install.html`
- Build: `build.html`
- Coach: `coach.html`
- FAQ: `faq.html` — 10 expandable questions, no JavaScript required
- Community: `community.html`\n- Challenge Forest: `challenge.html` — static concept preview with fictional data and interactive WORLD FOREST, MY TREE and MY PATH views

## Discussions
Enable **Settings → General → Features → Discussions** in this repository. Then the community link will open https://github.com/lit-u/trappunk/discussions.

## GitHub Pages
Open **Settings → Pages**. Choose **Deploy from a branch**, then select **main** and **/(root)** and save. All pages are static HTML/CSS, so no GitHub Actions workflow is needed.

## Source code and licensing
The public site is separate from the private firmware. No software source license has been granted for the firmware. No public firmware installation or firmware source distribution is offered.

This project is independent of the IOC and ISSF and is not an official Olympic or ISSF product.

**Artwork notice:** `assets/start-banner.webp` is the supplied START banner. `assets/holder-guide.webp` is the user-supplied English DIY cardboard-holder infographic, shown on HOME and at full size on BUILD. The old concept illustration is no longer used.

## Firmware availability

Firmware installation is not currently offered on the public website. Interested users can ask in [Discussions](https://github.com/lit-u/trappunk/discussions).

## Edit FAQ questions

Open [`faq.html`](faq.html) or the [GitHub editor](https://github.com/lit-u/trappunk/edit/main/faq.html). Find the section between `<!-- FAQ ITEMS START -->` and `<!-- FAQ ITEMS END -->`. Each question is inside `<summary>`, each answer is inside `<div class="faq-answer">`. Commit to `main` to publish the edits.
\n## Challenge Forest prototype\n\nThe challenge genealogy explorer includes WORLD MAP (country-level cross-border links), WORLD FOREST, MY TREE and MY PATH. The world map aggregates reported invitation, new-device gift, and own-device pass-on links by country, with a Europe zoom. It uses a simplified coastline derived from the public-domain Natural Earth low-resolution dataset; country points are centroids, never precise addresses.\n\nThe challenge genealogy explorer is entirely static. Sample participants and links are embedded inside `challenge.html` and labeled as **illustrative data**. Invitations and device gifts are separate fields (`invitedBy`, `giftFrom`). Independently joined players begin new trees. Browser interactions do not register real participants or accept payment. Before production, replace the demo dataset with a privacy-reviewed database and a branch/pagination API for large networks; provide consent and account/order processes separately. Delivery addresses should be handled privately, never shown in the tree.\n