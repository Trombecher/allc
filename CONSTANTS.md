# Constants

This is an attempt to document the various values and matrices used for color conversion by libraries and websites. Most
of them are inaccurate.

## Sources

* Culori: https://github.com/Evercoder/culori
* Color.js: https://github.com/color-js/color.js
* color-space: https://github.com/colorjs/color-space
* Bruce Lindbloom: http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
* Wikipedia (sRGB): https://en.wikipedia.org/wiki/SRGB#Primaries
* Wikipedia (Standard
  Illuminants): https://en.wikipedia.org/wiki/Standard_illuminant#White_points_of_standard_illuminants
* Viereck: https://viereck.ch/hue-xy-rgb/ColorSpace.js
* Matrixmaker: https://drafts.csswg.org/css-color-4/matrixmaker.html
* CSS 4 GitHub issue: https://github.com/w3c/csswg-drafts/issues/5922
* CSS 4 Sample Code: https://drafts.csswg.org/css-color-4/#color-conversion-code

## CIE Illuminant D65 2°

### Allc (Recalculated)

(Most accurate, deviates from definition.)

```
x = 0.3127219659805473
y = 0.329126958343955
Y = 1

=> X = 0.9501560356953087
=> Z = 1.0881851716966038
```

### Wikipedia (Standard Illuminants)

(Definition)

```
x = 0.31272
y = 0.32903
Y = 1

=> X = 0.9504300519709449
=> Z = 1.0888064918092575
```

### Matrixmaker

(Inaccurate!)

(References ASTM E308-01, but there are no XYZ values for D65.)

```
X = 0.95047
Y = 1
Z = 1.08883
```

### Culori, Color Space, and Color.js

```
x = 0.3127
y = 0.329
Y = 1

=> X = 0.9504559270516716
=> Z = 1.0890577507598784
```

## 2° D65 Linear sRGB -> CIE 1931 XYZ

### Allc (This Repo)

What should I do here?

### Bruce Lindbloom

```
0.4124564, 0.3575761, 0.1804375,
0.2126729, 0.7151522, 0.0721750,
0.0193339, 0.1191920, 0.9503041,
```

### Wikipedia (sRGB)

```
0.4124, 0.3576, 0.1805,
0.2126, 0.7152, 0.0722,
0.0193, 0.1192, 0.9505,
```

### Viereck

```
0.412453, 0.35758, 0.180423,
0.212671, 0.71516, 0.072169,
0.019334, 0.119193, 0.950227,
```

### Matrixmaker

(console output)

```
0.4124564390896923, 0.357576077643909, 0.18043748326639894
0.2126728514056226, 0.715152155287818, 0.07217499330655958
0.019333895582329307, 0.11919202588130297, 0.9503040785363679
```

### CSS 4 Sample Code, Culori, Color.js, CSS 4 GitHub issue, and color-space

```
506752 / 1228815,  87881 / 245763,   12673 /   70218,
87098 /  409605, 175762 / 245763,   12673 /  175545,
7918 /  409605,  87881 / 737289, 1001167 / 1053270,
```

Equivalent to

```
0.4123907992659595, 0.35758433938387796, 0.1804807884018343
0.21263900587151036, 0.7151686787677559, 0.07219231536073371
0.01933081871559185, 0.11919477979462599, 0.9505321522496606
```

## Other

=== D50 Linear sRGB -> CIE 1931 XYZ matrix from: https://github.com/google/skia/blob/main/include/core/SkColorSpace.h
0.436065674, 0.385147095, 0.143066406,
0.222488403, 0.716873169, 0.060607910,
0.013916016, 0.097076416, 0.714096069,

=== D65 Linear Wide -> CIE 1931 XYZ matrix from: https://viereck.ch/hue-xy-rgb/ColorSpace.js
0.7164, 0.1010, 0.1468,
0.2587, 0.7247, 0.0166,
0.0000, 0.0512, 0.7740,

=== D65 Linear Adobe RGB -> CIE 1931 XYZ matrix from: https://viereck.ch/hue-xy-rgb/ColorSpace.js
0.5767, 0.1856, 0.1882,
0.2974, 0.6273, 0.0753,
0.0270, 0.0707, 0.9911

=== D65 Linear Adobe RGB -> CIE 1931 XYZ matrix
from https://en.wikipedia.org/wiki/Adobe_RGB_color_space#Reference_viewing_conditions
0.57667, 0.18556, 0.18823
0.29734, 0.62736, 0.07529
0.02703, 0.07069, 0.99134

=== D65 Linear Display P3 -> CIE 1931 XYZ matrix from: https://drafts.csswg.org/css-color-4/#color-conversion-code
608311 / 1250200, 189793 / 714400, 198249 / 1000160,
35783 / 156275, 247089 / 357200, 198249 / 2500400,
0 / 1, 32229 / 714400, 5220557 / 5000800,

Equivalent to

0.48657094864821626, 0.26566769316909294, 0.1982172852343625,
0.22897456406974884, 0.6917385218365062, 0.079286914093745,
0, 0.045113381858902575, 1.0439443689009757,