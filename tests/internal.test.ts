import {expect, test} from "vitest";
import {conditionalAssign} from "../src/internal";

test("conditionalAssign", () => {
    expect(conditionalAssign({
        r: 0,
    }, undefined, undefined)).toEqual({
        r: 0,
    });

    expect(conditionalAssign({
        r: 1,
    }, 0, "srgb")).toEqual({
        r: 1,
        a: 0,
        _: "srgb"
    });
});