export type Matrix3X3 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
];

export const applyMatrix3X3 = (x: number, y: number, z: number, matrix: Readonly<Matrix3X3>): [number, number, number] => [
    matrix[0] * x + matrix[1] * y + matrix[2] * z,
    matrix[3] * x + matrix[4] * y + matrix[5] * z,
    matrix[6] * x + matrix[7] * y + matrix[8] * z
] as const;