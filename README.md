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

You can create colors by using the literal syntax `{r: ..., g: ..., b: ...}` or by using a factory function, like: `rgb(...)`.

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

## Implementation Decisions

No classes are used in this package. Although color conversions via chaining allow for great developer experience, the bundler would not be able to minify the class member function names. This would also block tree shaking and therefore include all color models and their interconversions by default when using only one model.

This is an issue with JavaScript in general: bundlers are not able to minify object/class properties and functions because they might be accessed dynamically during runtime. Therefore, this package includes minified but still descriptive object properties (color channels) like `r`, `g` and `b` and type aliases for objects that will be compiled away. Independent functions operate on those objects (color models), allowing for tree shaking and a small bundle size.

In source, color models are separated by file and accessed via re-exports by one import (`import {} from "allc"`) in library use. This prevents import hell from various subdirectories.