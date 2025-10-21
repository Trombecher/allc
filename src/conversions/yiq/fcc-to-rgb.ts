import {
    MATRIX_RGB_FROM_YIQ_FCC_0_0,
    MATRIX_RGB_FROM_YIQ_FCC_0_1,
    MATRIX_RGB_FROM_YIQ_FCC_0_2,
    MATRIX_RGB_FROM_YIQ_FCC_1_0,
    MATRIX_RGB_FROM_YIQ_FCC_1_1,
    MATRIX_RGB_FROM_YIQ_FCC_1_2,
    MATRIX_RGB_FROM_YIQ_FCC_2_0,
    MATRIX_RGB_FROM_YIQ_FCC_2_1,
    MATRIX_RGB_FROM_YIQ_FCC_2_2,
} from "../../matrices";

// TODO: docs
export const toRGBRFromYIQFCC = (y: number, i: number, q: number) =>
    MATRIX_RGB_FROM_YIQ_FCC_0_0 * y +
    MATRIX_RGB_FROM_YIQ_FCC_0_1 * i +
    MATRIX_RGB_FROM_YIQ_FCC_0_2 * q;

// TODO: docs
export const toRGBGFromYIQFCC = (y: number, i: number, q: number) =>
    MATRIX_RGB_FROM_YIQ_FCC_1_0 * y +
    MATRIX_RGB_FROM_YIQ_FCC_1_1 * i +
    MATRIX_RGB_FROM_YIQ_FCC_1_2 * q;

// TODO: docs
export const toRGBBFromYIQFCC = (y: number, i: number, q: number) =>
    MATRIX_RGB_FROM_YIQ_FCC_2_0 * y +
    MATRIX_RGB_FROM_YIQ_FCC_2_1 * i +
    MATRIX_RGB_FROM_YIQ_FCC_2_2 * q;
