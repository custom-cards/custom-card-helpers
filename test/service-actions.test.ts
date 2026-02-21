import { describe, expect, it, vi } from "vitest";
import { toggleEntity } from "../src/toggle-entity";
import { turnOnOffEntities } from "../src/turn-on-off-entities";
import { turnOnOffEntity } from "../src/turn-on-off-entity";

describe("turnOnOffEntity", () => {
  it("uses domain-specific lock and cover services", async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const hass = { callService } as any;

    await turnOnOffEntity(hass, "lock.front", true);
    await turnOnOffEntity(hass, "cover.shade", false);

    expect(callService).toHaveBeenNthCalledWith(1, "lock", "unlock", {
      entity_id: "lock.front",
    });
    expect(callService).toHaveBeenNthCalledWith(2, "cover", "close_cover", {
      entity_id: "cover.shade",
    });
  });

  it("uses homeassistant domain for groups", async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    await turnOnOffEntity({ callService } as any, "group.all_lights", true);

    expect(callService).toHaveBeenCalledWith("homeassistant", "turn_on", {
      entity_id: "group.all_lights",
    });
  });
});

describe("toggleEntity", () => {
  it("turns on when entity is currently in off-state set", async () => {
    const callService = vi.fn().mockResolvedValue(undefined);
    const hass = {
      states: {
        "switch.kitchen": { state: "off" },
      },
      callService,
    } as any;

    await toggleEntity(hass, "switch.kitchen");
    expect(callService).toHaveBeenCalledWith("switch", "turn_on", {
      entity_id: "switch.kitchen",
    });
  });
});

describe("turnOnOffEntities", () => {
  it("batches service calls by service domain", () => {
    const callService = vi.fn();
    const hass = {
      callService,
      states: {
        "switch.a": { state: "off" },
        "light.b": { state: "off" },
        "cover.c": { state: "closed" },
        "lock.d": { state: "locked" },
      },
    } as any;

    turnOnOffEntities(
      hass,
      ["switch.a", "light.b", "cover.c", "lock.d"],
      true
    );

    expect(callService).toHaveBeenCalledWith("homeassistant", "turn_on", {
      entity_id: ["switch.a", "light.b"],
    });
    expect(callService).toHaveBeenCalledWith("cover", "open_cover", {
      entity_id: ["cover.c"],
    });
    expect(callService).toHaveBeenCalledWith("lock", "unlock", {
      entity_id: ["lock.d"],
    });
  });
});
