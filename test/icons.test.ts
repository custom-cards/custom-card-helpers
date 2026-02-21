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
