// Constants stem from https://en.wikipedia.org/wiki/Standard_illuminant#White_points_of_standard_illuminants.
// Extracted from the table via:

/*
[...table.children].map(row => {
    const id = row.children[0].textContent.trim().replaceAll(/\.|\-/g, "_");
    return `export const CIE_ILLUMINANT_${id}_2d_x = ${row.children[1].textContent.trim()};\nexport const CIE_ILLUMINANT_${id}_2d_y = ${row.children[2].textContent.trim()};\nexport const CIE_ILLUMINANT_${id}_10d_x = ${row.children[3].textContent.trim()};\nexport const CIE_ILLUMINANT_${id}_10d_y = ${row.children[4].textContent.trim()};\nexport const CIE_ILLUMINANT_${id}_KELVIN = ${row.children[5].textContent.trim()};`;
}).join("\n")
 */

export const CIE_ILLUMINANT_A_2d_x = 0.44758;
export const CIE_ILLUMINANT_A_2d_y = 0.40745;
export const CIE_ILLUMINANT_A_10d_x = 0.45117;
export const CIE_ILLUMINANT_A_10d_y = 0.40594;
export const CIE_ILLUMINANT_A_KELVIN = 2856;
export const CIE_ILLUMINANT_B_2d_x = 0.34842;
export const CIE_ILLUMINANT_B_2d_y = 0.35161;
export const CIE_ILLUMINANT_B_10d_x = 0.34980;
export const CIE_ILLUMINANT_B_10d_y = 0.35270;
export const CIE_ILLUMINANT_B_KELVIN = 4874;
export const CIE_ILLUMINANT_C_2d_x = 0.31006;
export const CIE_ILLUMINANT_C_2d_y = 0.31616;
export const CIE_ILLUMINANT_C_10d_x = 0.31039;
export const CIE_ILLUMINANT_C_10d_y = 0.31905;
export const CIE_ILLUMINANT_C_KELVIN = 6774;
export const CIE_ILLUMINANT_D50_2d_x = 0.34567;
export const CIE_ILLUMINANT_D50_2d_y = 0.35850;
export const CIE_ILLUMINANT_D50_10d_x = 0.34773;
export const CIE_ILLUMINANT_D50_10d_y = 0.35952;
export const CIE_ILLUMINANT_D50_KELVIN = 5003;
export const CIE_ILLUMINANT_D55_2d_x = 0.33242;
export const CIE_ILLUMINANT_D55_2d_y = 0.34743;
export const CIE_ILLUMINANT_D55_10d_x = 0.33411;
export const CIE_ILLUMINANT_D55_10d_y = 0.34877;
export const CIE_ILLUMINANT_D55_KELVIN = 5503;
export const CIE_ILLUMINANT_D65_2d_x = 0.31272;
export const CIE_ILLUMINANT_D65_2d_y = 0.32903;
export const CIE_ILLUMINANT_D65_10d_x = 0.31382;
export const CIE_ILLUMINANT_D65_10d_y = 0.33100;
export const CIE_ILLUMINANT_D65_KELVIN = 6504;
export const CIE_ILLUMINANT_D75_2d_x = 0.29902;
export const CIE_ILLUMINANT_D75_2d_y = 0.31485;
export const CIE_ILLUMINANT_D75_10d_x = 0.29968;
export const CIE_ILLUMINANT_D75_10d_y = 0.31740;
export const CIE_ILLUMINANT_D75_KELVIN = 7504;
export const CIE_ILLUMINANT_D93_2d_x = 0.28315;
export const CIE_ILLUMINANT_D93_2d_y = 0.29711;
export const CIE_ILLUMINANT_D93_10d_x = 0.28327;
export const CIE_ILLUMINANT_D93_10d_y = 0.30043;
export const CIE_ILLUMINANT_D93_KELVIN = 9305;
export const CIE_ILLUMINANT_E_2d_x = 0.33333;
export const CIE_ILLUMINANT_E_2d_y = 0.33333;
export const CIE_ILLUMINANT_E_10d_x = 0.33333;
export const CIE_ILLUMINANT_E_10d_y = 0.33333;
export const CIE_ILLUMINANT_E_KELVIN = 5454;
export const CIE_ILLUMINANT_F1_2d_x = 0.31310;
export const CIE_ILLUMINANT_F1_2d_y = 0.33727;
export const CIE_ILLUMINANT_F1_10d_x = 0.31811;
export const CIE_ILLUMINANT_F1_10d_y = 0.33559;
export const CIE_ILLUMINANT_F1_KELVIN = 6430;
export const CIE_ILLUMINANT_F2_2d_x = 0.37208;
export const CIE_ILLUMINANT_F2_2d_y = 0.37529;
export const CIE_ILLUMINANT_F2_10d_x = 0.37925;
export const CIE_ILLUMINANT_F2_10d_y = 0.36733;
export const CIE_ILLUMINANT_F2_KELVIN = 4230;
export const CIE_ILLUMINANT_F3_2d_x = 0.40910;
export const CIE_ILLUMINANT_F3_2d_y = 0.39430;
export const CIE_ILLUMINANT_F3_10d_x = 0.41761;
export const CIE_ILLUMINANT_F3_10d_y = 0.38324;
export const CIE_ILLUMINANT_F3_KELVIN = 3450;
export const CIE_ILLUMINANT_F4_2d_x = 0.44018;
export const CIE_ILLUMINANT_F4_2d_y = 0.40329;
export const CIE_ILLUMINANT_F4_10d_x = 0.44920;
export const CIE_ILLUMINANT_F4_10d_y = 0.39074;
export const CIE_ILLUMINANT_F4_KELVIN = 2940;
export const CIE_ILLUMINANT_F5_2d_x = 0.31379;
export const CIE_ILLUMINANT_F5_2d_y = 0.34531;
export const CIE_ILLUMINANT_F5_10d_x = 0.31975;
export const CIE_ILLUMINANT_F5_10d_y = 0.34246;
export const CIE_ILLUMINANT_F5_KELVIN = 6350;
export const CIE_ILLUMINANT_F6_2d_x = 0.37790;
export const CIE_ILLUMINANT_F6_2d_y = 0.38835;
export const CIE_ILLUMINANT_F6_10d_x = 0.38660;
export const CIE_ILLUMINANT_F6_10d_y = 0.37847;
export const CIE_ILLUMINANT_F6_KELVIN = 4150;
export const CIE_ILLUMINANT_F7_2d_x = 0.31292;
export const CIE_ILLUMINANT_F7_2d_y = 0.32933;
export const CIE_ILLUMINANT_F7_10d_x = 0.31569;
export const CIE_ILLUMINANT_F7_10d_y = 0.32960;
export const CIE_ILLUMINANT_F7_KELVIN = 6500;
export const CIE_ILLUMINANT_F8_2d_x = 0.34588;
export const CIE_ILLUMINANT_F8_2d_y = 0.35875;
export const CIE_ILLUMINANT_F8_10d_x = 0.34902;
export const CIE_ILLUMINANT_F8_10d_y = 0.35939;
export const CIE_ILLUMINANT_F8_KELVIN = 5000;
export const CIE_ILLUMINANT_F9_2d_x = 0.37417;
export const CIE_ILLUMINANT_F9_2d_y = 0.37281;
export const CIE_ILLUMINANT_F9_10d_x = 0.37829;
export const CIE_ILLUMINANT_F9_10d_y = 0.37045;
export const CIE_ILLUMINANT_F9_KELVIN = 4150;
export const CIE_ILLUMINANT_F10_2d_x = 0.34609;
export const CIE_ILLUMINANT_F10_2d_y = 0.35986;
export const CIE_ILLUMINANT_F10_10d_x = 0.35090;
export const CIE_ILLUMINANT_F10_10d_y = 0.35444;
export const CIE_ILLUMINANT_F10_KELVIN = 5000;
export const CIE_ILLUMINANT_F11_2d_x = 0.38052;
export const CIE_ILLUMINANT_F11_2d_y = 0.37713;
export const CIE_ILLUMINANT_F11_10d_x = 0.38541;
export const CIE_ILLUMINANT_F11_10d_y = 0.37123;
export const CIE_ILLUMINANT_F11_KELVIN = 4000;
export const CIE_ILLUMINANT_F12_2d_x = 0.43695;
export const CIE_ILLUMINANT_F12_2d_y = 0.40441;
export const CIE_ILLUMINANT_F12_10d_x = 0.44256;
export const CIE_ILLUMINANT_F12_10d_y = 0.39717;
export const CIE_ILLUMINANT_F12_KELVIN = 3000;
export const CIE_ILLUMINANT_FL3_1_2d_x = 0.4407;
export const CIE_ILLUMINANT_FL3_1_2d_y = 0.4033;
export const CIE_ILLUMINANT_FL3_1_KELVIN = 2932;
export const CIE_ILLUMINANT_FL3_2_2d_x = 0.3808;
export const CIE_ILLUMINANT_FL3_2_2d_y = 0.3734;
export const CIE_ILLUMINANT_FL3_2_KELVIN = 3965;
export const CIE_ILLUMINANT_FL3_3_2d_x = 0.3153;
export const CIE_ILLUMINANT_FL3_3_2d_y = 0.3439;
export const CIE_ILLUMINANT_FL3_3_KELVIN = 6280;
export const CIE_ILLUMINANT_FL3_4_2d_x = 0.4429;
export const CIE_ILLUMINANT_FL3_4_2d_y = 0.4043;
export const CIE_ILLUMINANT_FL3_4_KELVIN = 2904;
export const CIE_ILLUMINANT_FL3_5_2d_x = 0.3749;
export const CIE_ILLUMINANT_FL3_5_2d_y = 0.3672;
export const CIE_ILLUMINANT_FL3_5_KELVIN = 4086;
export const CIE_ILLUMINANT_FL3_6_2d_x = 0.3488;
export const CIE_ILLUMINANT_FL3_6_2d_y = 0.3600;
export const CIE_ILLUMINANT_FL3_6_KELVIN = 4894;
export const CIE_ILLUMINANT_FL3_7_2d_x = 0.4384;
export const CIE_ILLUMINANT_FL3_7_2d_y = 0.4045;
export const CIE_ILLUMINANT_FL3_7_KELVIN = 2979;
export const CIE_ILLUMINANT_FL3_8_2d_x = 0.3820;
export const CIE_ILLUMINANT_FL3_8_2d_y = 0.3832;
export const CIE_ILLUMINANT_FL3_8_KELVIN = 4006;
export const CIE_ILLUMINANT_FL3_9_2d_x = 0.3499;
export const CIE_ILLUMINANT_FL3_9_2d_y = 0.3591;
export const CIE_ILLUMINANT_FL3_9_KELVIN = 4853;
export const CIE_ILLUMINANT_FL3_10_2d_x = 0.3455;
export const CIE_ILLUMINANT_FL3_10_2d_y = 0.3560;
export const CIE_ILLUMINANT_FL3_10_KELVIN = 5000;
export const CIE_ILLUMINANT_FL3_11_2d_x = 0.3245;
export const CIE_ILLUMINANT_FL3_11_2d_y = 0.3434;
export const CIE_ILLUMINANT_FL3_11_KELVIN = 5854;
export const CIE_ILLUMINANT_FL3_12_2d_x = 0.4377;
export const CIE_ILLUMINANT_FL3_12_2d_y = 0.4037;
export const CIE_ILLUMINANT_FL3_12_KELVIN = 2984;
export const CIE_ILLUMINANT_FL3_13_2d_x = 0.3830;
export const CIE_ILLUMINANT_FL3_13_2d_y = 0.3724;
export const CIE_ILLUMINANT_FL3_13_KELVIN = 3896;
export const CIE_ILLUMINANT_FL3_14_2d_x = 0.3447;
export const CIE_ILLUMINANT_FL3_14_2d_y = 0.3609;
export const CIE_ILLUMINANT_FL3_14_KELVIN = 5045;
export const CIE_ILLUMINANT_FL3_15_2d_x = 0.3127;
export const CIE_ILLUMINANT_FL3_15_2d_y = 0.3288;
export const CIE_ILLUMINANT_FL3_15_KELVIN = 6509;
export const CIE_ILLUMINANT_HP1_2d_x = 0.533;
export const CIE_ILLUMINANT_HP1_2d_y = 0.415;
export const CIE_ILLUMINANT_HP1_KELVIN = 1959;
export const CIE_ILLUMINANT_HP2_2d_x = 0.4778;
export const CIE_ILLUMINANT_HP2_2d_y = 0.4158;
export const CIE_ILLUMINANT_HP2_KELVIN = 2506;
export const CIE_ILLUMINANT_HP3_2d_x = 0.4302;
export const CIE_ILLUMINANT_HP3_2d_y = 0.4075;
export const CIE_ILLUMINANT_HP3_KELVIN = 3144;
export const CIE_ILLUMINANT_HP4_2d_x = 0.3812;
export const CIE_ILLUMINANT_HP4_2d_y = 0.3797;
export const CIE_ILLUMINANT_HP4_KELVIN = 4002;
export const CIE_ILLUMINANT_HP5_2d_x = 0.3776;
export const CIE_ILLUMINANT_HP5_2d_y = 0.3713;
export const CIE_ILLUMINANT_HP5_KELVIN = 4039;
export const CIE_ILLUMINANT_LED_B1_2d_x = 0.4560;
export const CIE_ILLUMINANT_LED_B1_2d_y = 0.4078;
export const CIE_ILLUMINANT_LED_B1_KELVIN = 2733;
export const CIE_ILLUMINANT_LED_B2_2d_x = 0.4357;
export const CIE_ILLUMINANT_LED_B2_2d_y = 0.4012;
export const CIE_ILLUMINANT_LED_B2_KELVIN = 2998;
export const CIE_ILLUMINANT_LED_B3_2d_x = 0.3756;
export const CIE_ILLUMINANT_LED_B3_2d_y = 0.3723;
export const CIE_ILLUMINANT_LED_B3_KELVIN = 4103;
export const CIE_ILLUMINANT_LED_B4_2d_x = 0.3422;
export const CIE_ILLUMINANT_LED_B4_2d_y = 0.3502;
export const CIE_ILLUMINANT_LED_B4_KELVIN = 5109;
export const CIE_ILLUMINANT_LED_B5_2d_x = 0.3118;
export const CIE_ILLUMINANT_LED_B5_2d_y = 0.3236;
export const CIE_ILLUMINANT_LED_B5_KELVIN = 6598;
export const CIE_ILLUMINANT_LED_BH1_2d_x = 0.4474;
export const CIE_ILLUMINANT_LED_BH1_2d_y = 0.4066;
export const CIE_ILLUMINANT_LED_BH1_KELVIN = 2851;
export const CIE_ILLUMINANT_LED_RGB1_2d_x = 0.4557;
export const CIE_ILLUMINANT_LED_RGB1_2d_y = 0.4211;
export const CIE_ILLUMINANT_LED_RGB1_KELVIN = 2840;
export const CIE_ILLUMINANT_LED_V1_2d_x = 0.4548;
export const CIE_ILLUMINANT_LED_V1_2d_y = 0.4044;
export const CIE_ILLUMINANT_LED_V1_KELVIN = 2724;
export const CIE_ILLUMINANT_LED_V2_2d_x = 0.3781;
export const CIE_ILLUMINANT_LED_V2_2d_y = 0.3775;
export const CIE_ILLUMINANT_LED_V2_KELVIN = 4070;
export const CIE_ILLUMINANT_ID50_2d_x = 0.3432;
export const CIE_ILLUMINANT_ID50_2d_y = 0.3602;
export const CIE_ILLUMINANT_ID50_KELVIN = 5098;
export const CIE_ILLUMINANT_ID65_2d_x = 0.3107;
export const CIE_ILLUMINANT_ID65_2d_y = 0.3307;
export const CIE_ILLUMINANT_ID65_KELVIN = 6603;

export const PLANCK_CONSTANT = 6.62607015e-34;
export const SPEED_OF_LIGHT = 299_792_458;
export const BOLTZMANN_CONSTANT = 1.380649e-23;

export const SECOND_RADIATION_CONSTANT = PLANCK_CONSTANT * SPEED_OF_LIGHT / BOLTZMANN_CONSTANT;

/**
 * Calculates the CIE D-series illuminant's y component of CIE 1931 xyY from the x component.
 *
 * @param x The illuminant's x component of CIE 1931 xyY.
 *
 * @returns The illuminant's y component of CIE 1931 xyY.
 * @see https://en.wikipedia.org/wiki/Standard_illuminant#Computation
 */
export const illuminantDyFromX = (
    x: number,
) => -3 * x * x + 2.87 * x - 0.275;

export const illuminantDxFromRealKelvin = (
    realKelvin: number,
) => realKelvin <= 7000
    ? 0.244063
    + 0.09911 * 1e3 / realKelvin
    + 2.9678 * 1e6 / (realKelvin * realKelvin)
    - 4.607 * 1e9 / (realKelvin * realKelvin * realKelvin)
    : 0.23704
    + 0.24748 * 1e3 / realKelvin
    + 1.9018 * 1e6 / (realKelvin * realKelvin)
    - 2.0064 * 1e9 / (realKelvin * realKelvin * realKelvin);

export const illuminantDKelvinToRealKelvin = (
    dKelvin: number,
) => dKelvin * SECOND_RADIATION_CONSTANT * 100 / 1.438;