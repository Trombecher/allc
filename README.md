![](./hero.svg)

<h1 align="center">All Colors (Allc)</h1>

<p align="center">A fast TypeScript package for color management.</p>

## Table Of Contents

<!-- TOC -->
  * [Table Of Contents](#table-of-contents)
  * [Installation](#installation)
  * [Spaces and Models](#spaces-and-models)
  * [Guarantees (!)](#guarantees-)
  * [Planned Support](#planned-support)
  * [Building This Package](#building-this-package)
  * [Other JavaScript Color Packages](#other-javascript-color-packages)
  * [License](#license)
  * [Package Usage Overview](#package-usage-overview)
  * [Package API Structure Overview](#package-api-structure-overview)
    * [`allc`](#allc)
    * [`allc/conversions`](#allcconversions)
    * [`allc/distances`](#allcdistances)
    * [`allc/primaries`](#allcprimaries)
    * [`allc/illuminants`](#allcilluminants)
  * [A Note On Precision](#a-note-on-precision)
<!-- TOC -->

## Installation

```shell
bun i Allc
```

...or use your favourite package manager.

## Spaces and Models

(All colors have the standard illuminant D65.)

* CIE 1931 XYZ
* CIE 1931 xyY
* Linear RGB / RGB / HSL / HSV / HSI / Y'UV SDTV / Y'UV HDTV / YDbDr / YIQ 1953 / YIQ FCC
    * sRGB
    * Display P3
    * Adobe RGB
    * ProPhoto RGB
    * Rec. 2020
    * NTSC (1953)
    * SMPTE C (1987)
* LAB / LCH
    * Oklab
    * CIELAB

## Guarantees (!)

* **This package does not allocate!** Yes, you heard that right. Conversions do not allocate any objects. The only
  things
  which can be allocated are instances of the color class, which the user does. This is why Allc is so fast.
* **This package does not throw.** In fact, it does not even error in any way.
* **This package is side-effect-free.**
* **This package is fully tree-shakable.**
* **This package is (runtime) dependency-free.** There are still some dev-dependencies used in the compilation (e.g.,
  TypeScript).
* **This package is written solely in TypeScript and uses no `// @ts-ignore`.**

## Planned Support

* Rec. 2100 support
* HWB color model support
* D50 support

If you would like to implement one of these features, feel free to submit a PR :)

## Building This Package

To build this package, `bun run build` or use your favourite JavaScript runtime.
The output files will be in the `./dist` directory.

## Other JavaScript Color Packages

* [Culori](https://github.com/Evercoder/culori)
* [color-space](https://github.com/colorjs/color-space)
* [color.js](https://github.com/color-js/color.js)
* [@thi.ng/color](https://www.npmjs.com/package/@thi.ng/color)

## License

This repository is MIT-licensed. You can find a copy of the license [here](./LICENSE).

## Package Usage Overview

Allc provides many levels of granularity when it comes to color management.

* **If you want to quickly convert from one color space to another, you should use the `Color` class.**
* If you want to convert colors manually, you should use the color conversion functions in [
  `allc/conversions`](#allcconversions).

## Package API Structure Overview

Allc has five main entries:

### `allc`

This is the main package entry. It contains the `Color` class and color space types.

### `allc/conversions`

This entry contains color conversion functions in the format `to<TARGET><COMPONENT>From<SOURCE>` with

* `<TARGET>` being either
  * `LinearSRGB`,
  * `LinearAdobeRGB`,
  * `LinearDisplayP3`
  * `LinearRec2020`
  * `LinearProPhotoRGB`
  * `CIE1931XYZ`,
  * `CIE1931xyY`,
  * `HSL`
  * `HSV`
  * `HSI`
  * `RGB`
  * `LAB`
  * `LCH`
  * `CIELAB`
  * `Oklab`
  * `LMS`
  * `LMSDash`

// TODO: add more docs here

---

### `allc/distances`

This entry contains color distance functions. **A general Euclidean distance function is not provided**, as it can be
easily replicated with `Math.hypot(...components)`. Instead, the functions in this entry should be used where possible
because they are more accurate and sensical.

### `allc/primaries`

This entry contains constants for RGB primaries of [all supported RGB color spaces](#spaces-and-models). These are in
the format `PRIMARY_<SPACE>_<COMPONENT>_<X_OR_Y>` with

* `<SPACE>` being either
  * `SRGB` (sRGB),
  * `ADOBE_RGB` (Adobe RGB),
  * `DISPLAY_P3` (Display P3),
  * `REC_2020` (Rec. 2020), or
  * `PROPHOTO_RGB` (ProPhoto RGB);
* `CHANNEL` being either
  * `RED`,
  * `GREEN`, or
  * `BLUE`; and
* `X_OR_Y` being either `x` or `y`, the CIE 1931 xy parameters. `Y` is not provided, you can calculate that by
  converting red, green, or blue in the RGB color space to CIE 1931 XYZ.

### `allc/illuminants`

This entry contains constants for CIE standard illuminants. Every standard illuminant constant has the format:

`CIE_ILLUMINANT_<TYPE>_<DEGREES>_<X_OR_Y>` or
`CIE_ILLUMINANT_<TYPE>_KELVIN`

with

* `<TYPE>` being either
  * `A`,
  * `B`,
  * `C`,
  * `D50`,
  * `D55`,
  * `D65`,
  * `D75`,
  * `D93`,
  * `E`,
  * `F<1..=12>`,
  * `FL3_<1..=15>`,
  * `HP<1..=5>`,
  * `LED_B<1..=5>`,
  * `LED_BH1`,
  * `RED_RGB1`,
  * `LED_V1`,
  * `LED_V2`,
  * `ID50`, or
  * `ID65`;
* `<DEGREES>` being either
  * `2d` (CIE 2° standard observer) or
  * `10d` (CIE 2° standard observer) (some illuminants have no 10° standard observer values); and
* `<X_OR_Y>` being either `x` or `y`, the CIE 1931 xyY values (every illuminant has Y=1).

CIE _defines_ the CCT, (real) kelvin values, for each illuminant, and Allc uses them ALTHOUGH they are only
approximations. For example, the CIE standard illuminant D65 was originally defined with a CCT of 6500K. But since then
the Planck constant and others have changed (they became more accurate).

So to preserve the legacy xy of the illuminant, the illuminants' CCTs were redefined with a factor. If you want to
compute the new values yourself, Allc provides the function `illuminantDKelvinToRealKelvin(...)` that does that.

Allc exposes two more functions, `illuminantDyFromX(...)` and `illuminantDxFromRealKelvin(...)`, that you can use to
calculate the exact xy values for a D-series illuminant.

Additionally, Allc provides `PLANCK_CONSTANT`, `SPEED_OF_LIGHT`, `BOLTZMANN_CONSTANT`, and `SECOND_RADIATION_CONSTANT` (
derived from the previous three).

## A Note On Precision

Every library out there does color conversion differently because they use different matrices and constants. [Here is a
non-exhaustive list of matrix usage](./CONSTANTS.md).

Allc uses the _defined_ illuminant and primaries xy values to generate the conversion matrices for RGB color spaces at
machine-precision level. The code for that is [here](./src-comptime/precalculate.ts).