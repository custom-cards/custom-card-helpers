import { beforeEach, describe, expect, it, vi } from "vitest";
import durationToSeconds from "../src/datetime/duration_to_seconds";
import secondsToDuration from "../src/datetime/seconds_to_duration";
import { timerTimeRemaining } from "../src/datetime/timer_time_remaining";
import { useAmPm } from "../src/datetime/use_am_pm";
import { TimeFormat } from "../src/types";

describe("durationToSeconds", () => {
  it("converts hh:mm:ss to seconds", () => {
    expect(durationToSeconds("01:02:03")).toBe(3723);
  });
});

describe("secondsToDuration", () => {
  it("formats seconds into h:mm:ss, m:ss, s and null", () => {
    expect(secondsToDuration(3661)).toBe("1:01:01");
    expect(secondsToDuration(61)).toBe("1:01");
    expect(secondsToDuration(5)).toBe("5");
    expect(secondsToDuration(0)).toBeNull();
  });
});

describe("timerTimeRemaining", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-21T12:00:00.000Z"));
  });

  it("returns static remaining time when timer is idle", () => {
    const entity = {
      state: "idle",
      attributes: { remaining: "00:00:30" },
      last_changed: "2026-02-21T11:59:00.000Z",
    } as any;

    expect(timerTimeRemaining(entity)).toBe(30);
  });

  it("subtracts elapsed time when timer is active", () => {
    const entity = {
      state: "active",
      attributes: { remaining: "00:01:00" },
      last_changed: "2026-02-21T11:59:30.000Z",
    } as any;

    expect(timerTimeRemaining(entity)).toBe(30);
  });

  it("never goes below zero", () => {
    const entity = {
      state: "active",
      attributes: { remaining: "00:00:10" },
      last_changed: "2026-02-21T11:59:00.000Z",
    } as any;

    expect(timerTimeRemaining(entity)).toBe(0);
  });
});

describe("useAmPm", () => {
  it("returns true when locale is explicitly am_pm", () => {
    expect(useAmPm({ language: "en", time_format: TimeFormat.am_pm } as any)).toBe(true);
  });

  it("returns false when locale is explicitly 24h", () => {
    expect(
      useAmPm({ language: "en", time_format: TimeFormat.twenty_four } as any)
    ).toBe(false);
  });
});
