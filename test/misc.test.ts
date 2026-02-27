import { describe, expect, it, vi } from "vitest";
import { debounce } from "../src/debounce";
import { evaluateFilter } from "../src/evaluate-filter";
import { formatTimestamp } from "../src/format-timestamp";
import { hasAction } from "../src/has-action";
import { hasDoubleClick } from "../src/has-double-click";
import { formatNumber, isNumericState, numberFormatToLocale, round } from "../src/format-number";
import { NumberFormat } from "../src/types";

describe("evaluateFilter", () => {
  const stateObj = { state: "10", attributes: { level: 10, text: "abc" } } as any;

  it("evaluates operators and attribute mode", () => {
    expect(evaluateFilter(stateObj, { operator: "==", value: "10" })).toBe(true);
    expect(evaluateFilter(stateObj, { operator: ">", value: "2" })).toBe(false);
    expect(evaluateFilter(stateObj, { operator: "<=", value: "9" })).toBe(true);
    expect(evaluateFilter(stateObj, { attribute: "level", operator: ">=", value: 10 })).toBe(
      true
    );
  });

  it("supports regex operator", () => {
    expect(
      Boolean(
        evaluateFilter(stateObj, {
          attribute: "text",
          operator: "regex",
          value: /a/,
        })
      )
    ).toBe(true);
  });
});

describe("hasAction + hasDoubleClick", () => {
  it("returns false for undefined/none and true otherwise", () => {
    expect(hasAction(undefined)).toBe(false);
    expect(hasAction({ action: "none" } as any)).toBe(false);
    expect(hasAction({ action: "toggle" } as any)).toBe(true);

    expect(hasDoubleClick(undefined)).toBe(false);
    expect(hasDoubleClick({ action: "none" } as any)).toBe(false);
    expect(hasDoubleClick({ action: "toggle" } as any)).toBe(true);
  });
});

describe("formatTimestamp", () => {
  it("returns original for invalid timestamp", () => {
    expect(formatTimestamp("not-a-date")).toBe("not-a-date");
  });

  it("formats recent values as relative time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-21T12:00:00.000Z"));

    expect(formatTimestamp("2026-02-21T11:59:30.000Z")).toBe("30 seconds ago");
    expect(formatTimestamp("2026-02-21T11:58:00.000Z")).toBe("2 minutes ago");
  });
});

describe("debounce", () => {
  it("debounces trailing calls", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("a");
    debounced("b");
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("b");
  });
});

describe("format-number helpers", () => {
  it("detects numeric state", () => {
    expect(isNumericState({ attributes: { unit_of_measurement: "W" } } as any)).toBe(true);
    expect(isNumericState({ attributes: {} } as any)).toBe(false);
  });

  it("maps number formats to locales", () => {
    expect(numberFormatToLocale({ number_format: NumberFormat.comma_decimal } as any)).toEqual([
      "en-US",
      "en",
    ]);
    expect(numberFormatToLocale({ number_format: NumberFormat.system } as any)).toBeUndefined();
  });

  it("rounds numbers and formats fallback none mode", () => {
    expect(round(1.236, 2)).toBe(1.24);
    expect(
      formatNumber(1.236, { number_format: NumberFormat.none, language: "en" } as any, {
        maximumFractionDigits: 2,
      })
    ).toBe("1.24");
  });
});
