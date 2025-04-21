export type Matrix3x3 = [number, number, number, number, number, number, number, number, number];

export type Vector3 = [number, number, number];

export const matrixTimesVector = (m: Matrix3x3, [x, y, z]: Vector3): Vector3 => [
    m[0] * x + m[1] * y + m[2] * z,
    m[3] * x + m[4] * y + m[5] * z,
    m[6] * x + m[7] * y + m[8] * z,
];

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export const D_65_XN = 95.0489;
export const D_65_YN = 100;
export const D_65_ZN = 108.884;

const normalizeHue = (hue: number) => (hue + 2 * Math.PI) % (2 * Math.PI);

export const sharedDistanceImplementation = <T extends object>(a: T, b: T): number => {
    let total = 0;
    Object.entries(a).forEach(([key, value]) => key !== "_"
        && (total += key === "h"
            // @ts-ignore
            ? (value as number) - (b[key] as number)
            // @ts-ignore
            * (value as number) - (b[key] as number)
            // @ts-ignore
            : Math.pow(normalizeHue(value as number) - normalizeHue(b[key] as number), 2)),
    );

    return Math.sqrt(total);
}