import { describe, expect, it } from "vitest";
import { evaluateFilter } from "../src/evaluate-filter";

const entity = (state: string, attributes: Record<string, unknown> = {}) =>
  ({ entity_id: "sensor.x", state, attributes } as any);

describe("evaluateFilter numeric comparison", () => {
  it("compares numeric states as numbers, not strings", () => {
    expect(evaluateFilter(entity("100.0"), { operator: ">", value: "60" })).toBe(true);
    expect(evaluateFilter(entity("7.0"), { operator: ">", value: "60" })).toBe(false);
    expect(evaluateFilter(entity("10"), { operator: ">", value: "2" })).toBe(true);
    expect(evaluateFilter(entity("10"), { operator: "<=", value: "9" })).toBe(false);
    expect(evaluateFilter(entity("9"), { operator: "<", value: 10 })).toBe(true);
    expect(evaluateFilter(entity("60"), { operator: ">=", value: 60 })).toBe(true);
  });

  it("treats numerically equal values as equal", () => {
    expect(evaluateFilter(entity("70.0"), { operator: "==", value: "70" })).toBe(true);
    expect(evaluateFilter(entity("70.0"), { operator: "==", value: 70 })).toBe(true);
    expect(evaluateFilter(entity("70.0"), { operator: "!=", value: 70 })).toBe(false);
  });

  it("falls back to string comparison for non-numeric values", () => {
    expect(evaluateFilter(entity("b"), { operator: ">", value: "a" })).toBe(true);
    expect(evaluateFilter(entity("on"), { operator: "==", value: "on" })).toBe(true);
    expect(evaluateFilter(entity("on"), { operator: "!=", value: "off" })).toBe(true);
    expect(evaluateFilter(entity(""), { operator: "==", value: 0 })).toBe(false);
  });

  it("handles a value of 0", () => {
    expect(evaluateFilter(entity("0"), { operator: "==", value: 0 })).toBe(true);
    expect(evaluateFilter(entity("1"), { operator: ">", value: 0 })).toBe(true);
  });
});

describe("evaluateFilter attributes", () => {
  const stateObj = entity("on", { max: 100, enabled: true, name: "abc" });

  it("matches numeric attributes against string values", () => {
    expect(evaluateFilter(stateObj, { attribute: "max", value: "100" })).toBe(true);
    expect(evaluateFilter(stateObj, { attribute: "max", operator: ">", value: "60" })).toBe(true);
  });

  it("matches boolean attributes against string values", () => {
    expect(evaluateFilter(stateObj, { attribute: "enabled", value: "true" })).toBe(true);
    expect(evaluateFilter(stateObj, { attribute: "enabled", value: true })).toBe(true);
  });

  it("returns false for a missing attribute", () => {
    expect(evaluateFilter(stateObj, { attribute: "nope", value: "x" })).toBe(false);
    expect(evaluateFilter(stateObj, { attribute: "nope", operator: "regex", value: "x" })).toBe(false);
  });
});

describe("evaluateFilter missing entity", () => {
  it("returns false instead of throwing when the entity does not exist", () => {
    for (const operator of ["==", "!=", "<", "<=", ">", ">=", "regex"]) {
      expect(evaluateFilter(undefined as any, { operator, value: "on" })).toBe(false);
    }
  });
});

describe("evaluateFilter regex", () => {
  it("returns a boolean and supports numeric states", () => {
    expect(evaluateFilter(entity("armed_away"), { operator: "regex", value: "^armed" })).toBe(true);
    expect(evaluateFilter(entity("disarmed"), { operator: "regex", value: "^armed" })).toBe(false);
    expect(evaluateFilter(entity("on", { level: 42 }), { attribute: "level", operator: "regex", value: "^4" })).toBe(true);
  });

  it("returns false for an invalid pattern instead of throwing", () => {
    expect(evaluateFilter(entity("x"), { operator: "regex", value: "(" })).toBe(false);
  });
});

describe("evaluateFilter unknown operator", () => {
  it("returns false", () => {
    expect(evaluateFilter(entity("1"), { operator: "~", value: "1" })).toBe(false);
  });
});
