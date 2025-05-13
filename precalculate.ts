import Matrix, {inverse} from "ml-matrix";
import {
    BT_709_2_SRGB_BLUE_x,
    BT_709_2_SRGB_BLUE_Y,
    BT_709_2_SRGB_BLUE_y,
    BT_709_2_SRGB_GREEN_x,
    BT_709_2_SRGB_GREEN_Y,
    BT_709_2_SRGB_GREEN_y,
    BT_709_2_SRGB_RED_x,
    BT_709_2_SRGB_RED_Y,
    BT_709_2_SRGB_RED_y, IEC_D65_x, IEC_D65_y,
    ILLUMINANT_D65_KELVIN,
    illuminantDKelvinToRealKelvin,
    illuminantDxFromRealKelvin,
    illuminantDyFromX,
    toCIE1931XYZXFromCIE1931xyY,
    toCIE1931XYZZFromCIE1931xyY,
} from "./src";

const useIEC = true;

const d65x = useIEC ? IEC_D65_x : illuminantDxFromRealKelvin(illuminantDKelvinToRealKelvin(ILLUMINANT_D65_KELVIN));
const d65y = useIEC ? IEC_D65_y : illuminantDyFromX(d65x);

const d65Y = 1;
const d65X = toCIE1931XYZXFromCIE1931xyY(d65x, d65y, d65Y);
const d65Z = toCIE1931XYZZFromCIE1931xyY(d65x, d65y, d65Y);

const sRGBRedX = toCIE1931XYZXFromCIE1931xyY(
    BT_709_2_SRGB_RED_x,
    BT_709_2_SRGB_RED_y,
    BT_709_2_SRGB_RED_Y,
);
const sRGBRedY = BT_709_2_SRGB_RED_Y;
const sRGBRedZ = toCIE1931XYZZFromCIE1931xyY(
    BT_709_2_SRGB_RED_x,
    BT_709_2_SRGB_RED_y,
    BT_709_2_SRGB_RED_Y,
);

const sRGBGreenX = toCIE1931XYZXFromCIE1931xyY(
    BT_709_2_SRGB_GREEN_x,
    BT_709_2_SRGB_GREEN_y,
    BT_709_2_SRGB_GREEN_Y,
);
const sRGBGreenY = BT_709_2_SRGB_GREEN_Y;
const sRGBGreenZ = toCIE1931XYZZFromCIE1931xyY(
    BT_709_2_SRGB_GREEN_x,
    BT_709_2_SRGB_GREEN_y,
    BT_709_2_SRGB_GREEN_Y,
);

const sRGBBlueX = toCIE1931XYZXFromCIE1931xyY(
    BT_709_2_SRGB_BLUE_x,
    BT_709_2_SRGB_BLUE_y,
    BT_709_2_SRGB_BLUE_Y,
);
const sRGBBlueY = BT_709_2_SRGB_BLUE_Y;
const sRGBBlueZ = toCIE1931XYZZFromCIE1931xyY(
    BT_709_2_SRGB_BLUE_x,
    BT_709_2_SRGB_BLUE_y,
    BT_709_2_SRGB_BLUE_Y,
);

const primaries = new Matrix([
    [sRGBRedX, sRGBRedY, sRGBRedZ],
    [sRGBGreenX, sRGBGreenY, sRGBGreenZ],
    [sRGBBlueX, sRGBBlueY, sRGBBlueZ],
]).transpose();

const primariesInverse = inverse(primaries);

const scaling = primariesInverse.mmul(new Matrix([
    [d65X],
    [d65Y],
    [d65Z],
]));

const finalMatrix = primaries.mmul(new Matrix([
    [scaling.get(0, 0), 0, 0],
    [0, scaling.get(1, 0), 0],
    [0, 0, scaling.get(2, 0)],
]));

console.log(finalMatrix.getRow(0));
console.log(finalMatrix.getRow(1));
console.log(finalMatrix.getRow(2));