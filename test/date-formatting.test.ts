import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatDateMonth,
  formatDateMonthYear,
  formatDateNumeric,
  formatDateShort,
  formatDateWeekday,
  formatDateYear,
} from "../src/datetime/format_date";
import {
  formatDateTime,
  formatDateTimeNumeric,
  formatDateTimeWithSeconds,
} from "../src/datetime/format_date_time";
import { relativeTime } from "../src/datetime/relative_time";
import {
  formatTime,
  formatTimeWeekday,
  formatTimeWithSeconds,
} from "../src/datetime/format_time";
import { NumberFormat, TimeFormat } from "../src/types";

const locale = {
  language: "en-US",
  number_format: NumberFormat.comma_decimal,
  time_format: TimeFormat.am_pm,
} as any;

const fixedDate = new Date("2026-02-21T13:15:30.000Z");

describe("datetime formatters", () => {
  it("formats date variants", () => {
    expect(formatDateWeekday(fixedDate, locale)).toBeTypeOf("string");
    expect(formatDate(fixedDate, locale)).toContain("2026");
    expect(formatDateNumeric(fixedDate, locale)).toBeTypeOf("string");
    expect(formatDateShort(fixedDate, locale)).toBeTypeOf("string");
    expect(formatDateMonthYear(fixedDate, locale)).toContain("2026");
    expect(formatDateMonth(fixedDate, locale)).toBeTypeOf("string");
    expect(formatDateYear(fixedDate, locale)).toBe("2026");
  });

  it("formats time and datetime variants", () => {
    expect(formatTime(fixedDate, locale)).toBeTypeOf("string");
    expect(formatTimeWithSeconds(fixedDate, locale)).toBeTypeOf("string");
    expect(formatTimeWeekday(fixedDate, locale)).toBeTypeOf("string");
    expect(formatDateTime(fixedDate, locale)).toContain("2026");
    expect(formatDateTimeWithSeconds(fixedDate, locale)).toContain("2026");
    expect(formatDateTimeNumeric(fixedDate, locale)).toBeTypeOf("string");
  });

  it("formats relative time with and without tense", () => {
    const from = new Date("2026-02-21T13:10:30.000Z");
    const to = new Date("2026-02-21T13:15:30.000Z");

    const withTense = relativeTime(from, locale, to, true);
    const withoutTense = relativeTime(from, locale, to, false);

    expect(withTense).toMatch(/minute|ago|in/i);
    expect(withoutTense).toMatch(/minute/i);
  });
});
