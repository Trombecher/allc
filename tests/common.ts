import {expect} from "vitest";
import {Color} from "../src";

export const TOLERANCE = 0.000_000_01;
export const SAMPLE_COUNT = 100_000;

expect.extend({
    toBeAboutEqualTo(received: Color, expected: Color) {
        const d = Math.hypot(
            received.X() - expected.X(),
            received.Y() - expected.Y(),
            received.Z() - expected.Z(),
        );

        return {
            pass: d < TOLERANCE,
            message: () =>
                `expected color ${JSON.stringify(received)} to be close to ${JSON.stringify(expected)}, but distance was ${d}`,
        };
    },
});

declare module "vitest" {
    interface Assertion<T> {
        toBeAboutEqualTo(expected: T extends Color ? Color : never): void;
    }
}