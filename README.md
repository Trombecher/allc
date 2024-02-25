# `allc`

A small typescript package for color conversion.

## Color Models/Representations

`allc` provides color models in various representations:

- `Hex` (sRGB)
- `RGBNumber` (sRGB)
- `RGB` (sRGB)
- `HSV`
- `HSL`
- `CMYK`

More models/representations might be added in the future.

## Guarantees

- This package does not throw.
- Only types and functions are used.
- This package is side effect free.

## Implementation Decisions

No classes are used in this package. Although color conversions via chaining allow for great developer experience, the bundler would not be able to minify the class member function names. This would also block tree shaking and therefore include all color models and their interconversions by default when using only one model.

This is an issue with JavaScript in general: bundlers are not able to minify object/class properties and functions because they might be accessed dynamically during runtime. Therefore, this package includes minified but still descriptive object properties (color channels) like `r`, `g` and `b` and type aliases for objects that will be compiled away. Independent functions operate on those objects (color models), allowing for tree shaking and a small bundle size.

In source, color models are separated by file and accessed via re-exports by one import (`import {} from "allc"`) in library use. This prevents import hell from various subdirectories.

### Naming

Every color model is a type-alias, including primitives like `RGBNumber`. Functions that provide interconversion are named `to{TARGET}From{SOURCE}(...)`. They do not modify the source color which is ensured by a `Readonly<...>` wrapper.

Functions that change the input color are named `{ACTION}{COLOR_MODEL}(...)`.