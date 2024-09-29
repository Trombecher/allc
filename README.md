# Allc

A small typescript package for color conversion.

## Color Models And Spaces

This library provides these:

- `RGB<"sRGB">` (3x`number`)
  - `RGBNumber` (3x`integer 0..=255`)
  - `Hex` (3x`integer 0..=255`)
  - `HSL` (3x`number`)
  - `HSB` (3x`number`)
- `CIE 1931 XYZ`

The following color spaces are in development:

- OKLAB
- OKLCH
- Display P3
- Adobe RGB

More color spaces might be added in the future.

## How To Use This Library

You can create colors by using the literal syntax `{r: ..., g: ..., b: ...}`.

Converting between colors is straight forward. It uses the scheme `to{TARGET}From{SOURCE}` where `{TARGET}` and `{SOURCE}` are color spaces.

This library does not have a fully featured conversion matrix (meaning, you cannot convert every type in every other **directly**). Instead, do the following:

- `Hex` ↔ `RGBNumber` ↔ `RGB`
- `HSL` ↔ `RGB`
- `HSV` ↔ `RGB`

From there you can convert to `CIE1931XYZ` and from there you can convert to any other type.

## Guarantees

- This package does not throw.
- Only types and functions are used.
- This package is side effect free (only pay for what you use).

---

The _implementation decisions_ section is gone; a replacement article will be published on https://trombecher.github.io/.