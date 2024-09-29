export let applyMatrix3X3 = (x, y, z, matrix) => [
    matrix[0] * x + matrix[1] * y + matrix[2] * z,
    matrix[3] * x + matrix[4] * y + matrix[5] * z,
    matrix[6] * x + matrix[7] * y + matrix[8] * z
];

export let mathMin = Math.min;
export let mathMax = Math.max;
export let mathRandom = Math.random;

export let toHCVFromRGB = (
    {r, g, b},
    max = mathMax(r, g, b),
    min = mathMin(r, g, b),
    c = max - min
) => [
    c === 0 ? 0 : 60 * (
        max === r ? ((g - b) / c) % 6 : (
            max === g ? (b - r) / c + 2 : (r - g) / c + 4
        )
    ),
    c,
    max,
];

export let conditionalAssign = (target, alpha, tag) => (
    alpha !== undefined && (target.a = alpha),
    tag !== undefined && (target._ = tag)
);