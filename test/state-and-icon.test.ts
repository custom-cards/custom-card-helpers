import { describe, expect, it } from "vitest";
import { computeIcon } from "../src/compute-icon";
import { computeName } from "../src/compute-name";
import { computeState } from "../src/compute-state";

describe("computeIcon", () => {
  it("prefers provided icon argument", () => {
    const stateObj = { entity_id: "light.kitchen", attributes: {} } as any;
    expect(computeIcon(stateObj, "mdi:star")).toBe("mdi:star");
  });

  it("uses entity icon attribute next", () => {
    const stateObj = {
      entity_id: "light.kitchen",
      attributes: { icon: "mdi:ceiling-light" },
    } as any;
    expect(computeIcon(stateObj)).toBe("mdi:ceiling-light");
  });

  it("falls back to domain icon then default bookmark", () => {
    expect(computeIcon({ entity_id: "switch.test", attributes: {} } as any)).toBe(
      "mdi:toggle-switch"
    );
    expect(computeIcon({ entity_id: "unknown_domain.item", attributes: {} } as any)).toBe(
      "mdi:bookmark"
    );
  });
});

describe("computeName", () => {
  it("uses friendly_name when present", () => {
    expect(
      computeName({
        entity_id: "sensor.temperature",
        attributes: { friendly_name: "Office Temp" },
      } as any)
    ).toBe("Office Temp");
  });

  it("falls back to entity_id", () => {
    expect(computeName({ entity_id: "sensor.temperature", attributes: {} } as any)).toBe(
      "sensor.temperature"
    );
  });
});

describe("computeState", () => {
  it("appends unit when present", () => {
    const stateObj = {
      state: "23",
      attributes: { unit_of_measurement: "°C" },
    } as any;
    expect(computeState(stateObj)).toBe("23 °C");
  });

  it("capitalizes known binary-ish states", () => {
    expect(computeState({ state: "on", attributes: {} } as any)).toBe("On");
    expect(computeState({ state: "locked", attributes: {} } as any)).toBe("Locked");
  });

  it("returns unknown state values unchanged", () => {
    expect(computeState({ state: "standby", attributes: {} } as any)).toBe("standby");
  });
});
