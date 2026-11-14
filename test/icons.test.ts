import { describe, expect, it, vi } from "vitest";
import { binarySensorIcon } from "../src/binary_sensor_icon";
import { coverIcon } from "../src/cover_icon";
import { domainIcon } from "../src/domain_icons";
import { inputDateTimeIcon } from "../src/input_datetime_icon";
import { sensorIcon } from "../src/sensor_icon";

describe("domainIcon", () => {
  it("returns fixed icons and state-based icons", () => {
    expect(domainIcon("light")).toBe("mdi:lightbulb");
    expect(domainIcon("lock", "unlocked")).toBe("mdi:lock-open");
  });

  it("returns default icon for unknown domain", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    expect(domainIcon("my_unknown_domain", "on")).toBe("mdi:bookmark");
    warnSpy.mockRestore();
  });
});

describe("sensorIcon", () => {
  it("returns device class icon", () => {
    const stateObj = { attributes: { device_class: "humidity" }, state: "10" } as any;
    expect(sensorIcon(stateObj)).toBe("mdi:water-percent");
  });

  it("returns battery icon variants", () => {
    expect(
      sensorIcon({ attributes: { device_class: "battery" }, state: "100" } as any)
    ).toBe("mdi:battery");
    expect(
      sensorIcon({ attributes: { device_class: "battery" }, state: "0" } as any)
    ).toBe("mdi:battery-alert");
  });
});

describe("binarySensorIcon", () => {
  it("returns class-specific icons for on/off", () => {
    expect(binarySensorIcon("off", { attributes: { device_class: "door" } } as any)).toBe(
      "mdi:door-closed"
    );
    expect(binarySensorIcon("on", { attributes: { device_class: "door" } } as any)).toBe(
      "mdi:door-open"
    );
  });
});

describe("coverIcon", () => {
  it("returns class-specific icons", () => {
    expect(
      coverIcon({ state: "open", attributes: { device_class: "garage" } } as any)
    ).toBe("mdi:garage-open");
    expect(
      coverIcon({ state: "closed", attributes: { device_class: "garage" } } as any)
    ).toBe("mdi:garage");
  });

  const icon = (state: string, device_class?: string) =>
    coverIcon({ state, attributes: { device_class } } as any);

  it("returns transitional icons while opening and closing", () => {
    expect(icon("opening", "garage")).toBe("mdi:arrow-up-box");
    expect(icon("closing", "garage")).toBe("mdi:arrow-down-box");
    expect(icon("opening", "gate")).toBe("mdi:gate-arrow-right");
    expect(icon("opening", "curtain")).toBe("mdi:arrow-split-vertical");
    expect(icon("closing", "curtain")).toBe("mdi:arrow-collapse-horizontal");
    expect(icon("opening", "shade")).toBe("mdi:arrow-up-box");
  });

  it("returns closed and open icons for newly supported classes", () => {
    expect(icon("closed", "gate")).toBe("mdi:gate");
    expect(icon("open", "gate")).toBe("mdi:gate-open");
    expect(icon("closed", "shutter")).toBe("mdi:window-shutter");
    expect(icon("open", "curtain")).toBe("mdi:curtains");
    expect(icon("closed", "curtain")).toBe("mdi:curtains-closed");
    expect(icon("closed", "blind")).toBe("mdi:blinds");
    expect(icon("open", "damper")).toBe("mdi:circle");
    expect(icon("closed", "damper")).toBe("mdi:circle-slice-8");
  });

  it("falls back to window icons for unknown device classes", () => {
    expect(icon("closed")).toBe("mdi:window-closed");
    expect(icon("open")).toBe("mdi:window-open");
    expect(icon("opening")).toBe("mdi:arrow-up-box");
    expect(icon("closing")).toBe("mdi:arrow-down-box");
  });
});

describe("inputDateTimeIcon", () => {
  it("returns clock/calendar/domain icon based on attributes", () => {
    expect(inputDateTimeIcon({ attributes: { has_date: false, has_time: true } } as any)).toBe(
      "mdi:clock"
    );
    expect(inputDateTimeIcon({ attributes: { has_date: true, has_time: false } } as any)).toBe(
      "mdi:calendar"
    );
    expect(inputDateTimeIcon({ attributes: { has_date: true, has_time: true } } as any)).toBe(
      "mdi:calendar-clock"
    );
  });
});
