# TRAPPUNK V2 USB Release Candidate

- Version: `0.1.0-trap12-3bb0736a`
- Source: private `lit-u/trap-trainer` branch `trap12-direction-streak-record-20261111`, firmware commit `3bb0736a28da0b70b81700ccc85941b6d0411e7f`
- CI: successful PlatformIO ESP32-S3 build, release packaging, image-header and SHA-256 checks.
- Hardware: **Waveshare ESP32-S3 Touch LCD 3.49B V2 (Rev1.1) only**, 16 MB flash and 8 MB OPI PSRAM.
- This is a **factory installation / deliberate recovery** package. It is not validated as a data-preserving update.
- Browser install on an independent new V2 board remains to be tested. GitHub compilation is not equivalent to a real-device acceptance test.
- Browser chipset detection verifies ESP32-S3 but **cannot identify the Waveshare PCB revision**; the user must confirm V2 with their seller.
- The source code remains in a separate private repository, not included in this release.

## Flash offsets
```
0x0000   bootloader.bin
0x8000   partitions.bin
0xE000   boot_app0.bin
0x10000  firmware.bin
```

**Back up training results before installing.** Factory flashing can erase NVS, local results and configuration. The installer requires acknowledgement of this risk.

The manifest is intended for [ESP Web Tools](https://esphome.github.io/esp-web-tools/).
