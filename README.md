# TRAPPUNK
**Olympic Trap Gyro Simulator**

Public project website for a low-cost, ESP32-S3-based Olympic Trap training simulator.

**Status:** Website public; first-install / recovery firmware release candidate for Waveshare V2 (Rev1.1) only. The firmware source remains private. Browser flashing has not been validated on a separate blank board. New installations may erase records.

## Website
Once GitHub Pages is enabled: https://lit-u.github.io/trappunk/

## Pages
- Home: `index.html`
- Install: `install.html` (V2-only first-install USB release candidate)
- Build: `build.html`
- Coach: `coach.html`
- FAQ: `faq.html` — 10 expandable questions, no JavaScript required
- Community: `community.html`

## Discussions
Enable **Settings → General → Features → Discussions** in this repository. Then the community link will open https://github.com/lit-u/trappunk/discussions.

## GitHub Pages
Open **Settings → Pages**. Choose **Deploy from a branch**, then select **main** and **/(root)** and save. All pages are static HTML/CSS, so no GitHub Actions workflow is needed.

## Source code and licensing
The public site is separate from the private firmware. No software source license has been granted for the firmware. The V2 build is published as a release candidate for factory installation/recovery, not as a verified data-preserving updater. No MIT source license has been granted.

This project is independent of the IOC and ISSF and is not an official Olympic or ISSF product.

**Artwork notice:** `assets/start-banner.webp` is the supplied START banner. `assets/holder-guide.webp` is the user-supplied English DIY cardboard-holder infographic, shown on HOME and at full size on BUILD. The old concept illustration is no longer used.

## Firmware release candidate

- User-facing installation: [INSTALL](install.html) (no manual firmware downloads)
- Source commit: `3bb0736a28da0b70b81700ccc85941b6d0411e7f`
- Hardware: Waveshare 3.49B V2 / Rev1.1 only

Compiled successfully in CI, but independent new-board browser flashing is not yet verified. A factory installation may erase stored results.

## Edit FAQ questions

Open [`faq.html`](faq.html) or the [GitHub editor](https://github.com/lit-u/trappunk/edit/main/faq.html). Find the section between `<!-- FAQ ITEMS START -->` and `<!-- FAQ ITEMS END -->`. Each question is inside `<summary>`, each answer is inside `<div class="faq-answer">`. Commit to `main` to publish the edits.
