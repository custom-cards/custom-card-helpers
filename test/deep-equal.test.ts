import { describe, expect, it } from "vitest";
import { deepEqual } from "../src/deep-equal";

describe("deepEqual", () => {
  it("compares primitives and NaN", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual("a", "b")).toBe(false);
    expect(deepEqual(Number.NaN, Number.NaN)).toBe(true);
  });

  it("compares arrays and objects deeply", () => {
    expect(deepEqual([1, { a: 2 }], [1, { a: 2 }])).toBe(true);
    expect(deepEqual({ a: 1, b: [2] }, { a: 1, b: [3] })).toBe(false);
  });

  it("compares map and set values", () => {
    expect(
      deepEqual(
        new Map([
          ["a", { v: 1 }],
          ["b", 2],
        ]),
        new Map([
          ["a", { v: 1 }],
          ["b", 2],
        ])
      )
    ).toBe(true);

    expect(deepEqual(new Set([1, 2]), new Set([2, 1]))).toBe(true);
    expect(deepEqual(new Set([1, 2]), new Set([1, 3]))).toBe(false);
  });

  it("compares array buffer views", () => {
    expect(deepEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3]))).toBe(true);
    expect(deepEqual(new Uint8Array([1, 2]), new Uint8Array([1, 3]))).toBe(false);
  });

  it("compares regexp", () => {
    expect(deepEqual(/a+/gi, /a+/gi)).toBe(true);
    expect(deepEqual(/a+/g, /a+/i)).toBe(false);
  });
});
