import {mathMax, mathMin} from "./internal";

export let tag = (color, colorSpace) => (color._ = colorSpace, color);

export let withAlpha = (color, alpha) => (color.a = alpha, color);

export let clamp01 = x => mathMax(0, mathMin(x, 1));

/**
 * @param {object} color
 */
export let clampColor = color =>
    Object
        .keys(color)
        // Iterate over all property keys of `object`:
        .forEach(key => (key !== "_" && (key === "h"
            // Key `_` is ignored; key `h` is treated specially:
            ? (color.h = color.h < 0 ? color.h % 360 + 360 : color.h % 360)
            : (color[key] = clamp01(color[key])), color)));

export let lerp = (a, b, t) => a + (b - a) * t;

export let lerpColor = (a, b, t) =>
    Object.keys(a).reduce((resultColor, key) =>
        (key !== "_" && (resultColor[key] = lerp(a[key], b[key], t)), resultColor), {});