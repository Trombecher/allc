import {expect} from "vitest";
import {Color} from "../src";

export const TOLERANCE = 0.000001;
export const SAMPLE_COUNT = 100;

type EnforceColor<T> = T extends Color<infer C> ? T extends C ? T : never : never;

expect.extend({
    toBeAboutEqualTo<C extends Color<C>>(received: C, expected: C) {
        const d = received.distance(expected);

        return {
            pass: d < TOLERANCE,
            message: () =>
                `expected color ${JSON.stringify(received)} to be close to ${JSON.stringify(expected)}, but distance was ${d}`
        };
    }
});

declare module "vitest" {
    interface Assertion<T> {
        toBeAboutEqualTo(expected: EnforceColor<T>): void;
    }
}