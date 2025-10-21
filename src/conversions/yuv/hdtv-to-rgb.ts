import {
    YUV_HDTV_W_B,
    YUV_HDTV_W_G,
    YUV_HDTV_W_R,
    YUV_U_MAX,
    YUV_V_MAX,
} from "./index";

// TODO: docs
export const toRGBRFromYUVHDTV = (y: number, v: number) =>
    y + (v * (1 - YUV_HDTV_W_R)) / YUV_V_MAX;

// TODO: docs
export const toRGBGFromYUVHDTV = (y: number, u: number, v: number) =>
    y -
    (u * YUV_HDTV_W_B * (1 - YUV_HDTV_W_B)) / (YUV_U_MAX * YUV_HDTV_W_G) -
    (v * YUV_HDTV_W_R * (1 - YUV_HDTV_W_R)) / (YUV_V_MAX * YUV_HDTV_W_G);

// TODO: docs
export const toRGBBFromYUVHDTV = (y: number, u: number) =>
    y + (u * (1 - YUV_HDTV_W_G)) / YUV_U_MAX;
