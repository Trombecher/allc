import {conditionalAssign, toHCVFromRGB} from "./internal";

export let toHSVFromHSL = (
    {h, s, l, a, _},
    v = l + s * Math.min(l, 1 - l)
) => conditionalAssign({
    h,
    s,
    v: v === 0 ? 0 : 2 * (1 - l / v),
}, a, _);

export let toHSVFromRGB = (
    rgb,
    [h, c, v] = toHCVFromRGB(rgb)
) => conditionalAssign({
    h,
    s: v === 0 ? 0 : c / v,
    v
}, rgb.a, rgb._);