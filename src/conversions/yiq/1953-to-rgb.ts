import {
    MATRIX_RGB_FROM_YIQ_1953_0_0,
    MATRIX_RGB_FROM_YIQ_1953_0_1,
    MATRIX_RGB_FROM_YIQ_1953_0_2,
    MATRIX_RGB_FROM_YIQ_1953_1_0,
    MATRIX_RGB_FROM_YIQ_1953_1_1,
    MATRIX_RGB_FROM_YIQ_1953_1_2,
    MATRIX_RGB_FROM_YIQ_1953_2_0,
    MATRIX_RGB_FROM_YIQ_1953_2_1,
    MATRIX_RGB_FROM_YIQ_1953_2_2,
} from "../../matrices";

// TODO: docs
export const toRGBRFromYIQ1953 = (y: number, i: number, q: number) =>
    MATRIX_RGB_FROM_YIQ_1953_0_0 * y +
    MATRIX_RGB_FROM_YIQ_1953_0_1 * i +
    MATRIX_RGB_FROM_YIQ_1953_0_2 * q;

// TODO: docs
export const toRGBGFromYIQ1953 = (y: number, i: number, q: number) =>
    MATRIX_RGB_FROM_YIQ_1953_1_0 * y +
    MATRIX_RGB_FROM_YIQ_1953_1_1 * i +
    MATRIX_RGB_FROM_YIQ_1953_1_2 * q;

// TODO: docs
export const toRGBBFromYIQ1953 = (y: number, i: number, q: number) =>
    MATRIX_RGB_FROM_YIQ_1953_2_0 * y +
    MATRIX_RGB_FROM_YIQ_1953_2_1 * i +
    MATRIX_RGB_FROM_YIQ_1953_2_2 * q;
