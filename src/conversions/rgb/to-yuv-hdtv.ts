import {
    YUV_HDTV_W_B,
    YUV_HDTV_W_G,
    YUV_HDTV_W_R,
    YUV_U_MAX,
    YUV_V_MAX,
} from "../yuv";

// TODO: docs
export const toYUVHDTVYFromRGB = (r: number, g: number, b: number) =>
    YUV_HDTV_W_R * r + YUV_HDTV_W_G * g + YUV_HDTV_W_B * b;

// TODO: docs
export const toYUVHDTVUFromRGB = (r: number, g: number, b: number) =>
    (YUV_U_MAX * (b - YUV_HDTV_W_R * r + YUV_HDTV_W_G * g + YUV_HDTV_W_B * b)) /
    (1 - YUV_HDTV_W_B);

// TODO: docs
export const toYUVHDTVVFromRGB = (r: number, g: number, b: number) =>
    (YUV_V_MAX * (r - YUV_HDTV_W_R * r + YUV_HDTV_W_G * g + YUV_HDTV_W_B * b)) /
    (1 - YUV_HDTV_W_R);
