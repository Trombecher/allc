export const PLANCK_CONSTANT = 6.62607015e-34;
export const SPEED_OF_LIGHT = 299_792_458;
export const BOLTZMANN_CONSTANT = 1.380649e-23;

export const SECOND_RADIATION_CONSTANT = PLANCK_CONSTANT * SPEED_OF_LIGHT / BOLTZMANN_CONSTANT;

export const ILLUMINANT_D50_KELVIN = 5000;
export const ILLUMINANT_D55_KELVIN = 5500;
export const ILLUMINANT_D65_KELVIN = 6500;
export const ILLUMINANT_D75_KELVIN = 7500;

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