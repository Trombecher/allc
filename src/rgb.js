import {conditionalAssign, mathMax, mathMin, mathRandom} from "./internal.js";

export let toRGBFromRGBNumber = rgbNumber => ({
    r: (rgbNumber >> 16) / 255,
    g: ((rgbNumber >> 8) & 255) / 255,
    b: (rgbNumber & 255) / 255
});

export let randomRGB = () => ({
    r: mathRandom(),
    g: mathRandom(),
    b: mathRandom()
});

export let toRGBFromHSL = (
    {h, s, l, a, _},
    aFunctionParameter = s * mathMin(l, 1 - l),
    channelFunction = (n, k = (n + h / 30) % 12) =>
        l - aFunctionParameter * mathMax(-1, mathMin(k - 3, 9 - k, 1))
) => conditionalAssign({
    r: channelFunction(0),
    g: channelFunction(8),
    b: channelFunction(4)
}, a, _);

export let toRGBFromHSV = (
    {h, s, v, a, _},
    channelFunction = (n, k = (n + h / 60) % 6) =>
        v - v * s * mathMax(0, mathMin(k, 4 - k, 1))
) => conditionalAssign({
    r: channelFunction(5),
    g: channelFunction(3),
    b: channelFunction(1)
}, a, _);

// ---- RGBNumber ----

export let randomRGBNumber = () => Math.round(mathRandom() * 2 ** 24);

export let toRGBNumberFromHex = hex => parseInt(stripHash(hex), 16);

export let toRGBNumberFromRGB = ({r, g, b}) => (scale(r) << 16) | (scale(g) << 8) | scale(b);

let scale = x => Math.round(x * 255);

// ---- Hex ----

export let stripHash = string => string[0] === '#' ? string.slice(1) : string;

export let toHexFromRGBNumber = rgbNumber => rgbNumber.toString(16).padStart(6, "0");