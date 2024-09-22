import {expect, test} from "vitest";
import {stripHash} from "@/rgb/hex";

test("stripHash", () => {
    expect(stripHash("#344")).toEqual("344");
    expect(stripHash("344")).toEqual("344");
});