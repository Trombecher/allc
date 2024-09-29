import {conditionalAssign, mathMin, toHCVFromRGB} from "./internal";

export let toHSLFromRGB = (
    rgb,
    [h, c, v] = toHCVFromRGB(rgb),
    l = v - c / 2
) => conditionalAssign({
    h,
    s: l === 0 || l === 1 ? 0 : 2 * (v - l) / (1 - Math.abs(2 * l - 1)),
    l,
}, rgb.a, rgb._);

export let toHSLFromHSV = (
    {h, s, v, a, _},
    l = v * (1 - s / 2)
) => conditionalAssign({
    h,
    s,
    l: l === 0 || l === 1 ? 0 : (v - l) / mathMin(l, 1 - l)
}, a, _);