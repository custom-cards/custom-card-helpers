import { describe, expect, it } from "vitest";
import { computeStateDisplay } from "../src/compute-state-display";
import { NumberFormat, TimeFormat } from "../src/types";

const locale = {
  language: "en",
  number_format: NumberFormat.none,
  time_format: TimeFormat.twenty_four,
} as any;

const localize = (key: string): string => {
  const map: Record<string, string> = {
    "state.default.unknown": "Unknown",
    "state.default.unavailable": "Unavailable",
    "component.light.state._.on": "On",
    "component.binary_sensor.state.door.on": "Door Open",
  };
  return map[key] || "";
};

describe("computeStateDisplay", () => {
  it("localizes unknown/unavailable", () => {
    const stateObj = { state: "unknown", entity_id: "sensor.a", attributes: {} } as any;
    expect(computeStateDisplay(localize, stateObj, locale)).toBe("Unknown");

    stateObj.state = "unavailable";
    expect(computeStateDisplay(localize, stateObj, locale)).toBe("Unavailable");
  });

  it("formats numeric state with unit", () => {
    const stateObj = {
      state: "12.5",
      entity_id: "sensor.power",
      attributes: { unit_of_measurement: "W" },
    } as any;

    expect(computeStateDisplay(localize, stateObj, locale)).toBe("12.5 W");
  });

  it("handles humidifier percentage path", () => {
    const stateObj = {
      state: "on",
      entity_id: "humidifier.room",
      attributes: { humidity: 45 },
    } as any;

    expect(computeStateDisplay(localize, stateObj, locale)).toBe("45 %");
  });

  it("uses translation fallbacks then raw state", () => {
    const doorObj = {
      state: "on",
      entity_id: "binary_sensor.front_door",
      attributes: { device_class: "door" },
    } as any;
    expect(computeStateDisplay(localize, doorObj, locale)).toBe("Door Open");

    const lightObj = {
      state: "on",
      entity_id: "light.kitchen",
      attributes: {},
    } as any;
    expect(computeStateDisplay(localize, lightObj, locale)).toBe("On");

    const rawObj = {
      state: "mystery",
      entity_id: "switch.foo",
      attributes: {},
    } as any;
    expect(computeStateDisplay(localize, rawObj, locale)).toBe("mystery");
  });

  it("formats counter/number/input_number via formatNumber", () => {
    const numberObj = {
      state: "33.20",
      entity_id: "number.volume",
      attributes: {},
    } as any;

    expect(computeStateDisplay(localize, numberObj, locale)).toBe("33.20");
  });
});
