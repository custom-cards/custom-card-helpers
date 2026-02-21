import { describe, expect, it } from "vitest";
import { computeCardSize } from "../src/compute-card-size";
import { computeDomain } from "../src/compute-domain";
import { computeEntity } from "../src/compute-entity";
import { computeStateDomain } from "../src/compute-state-domain";
import { computeRTL, computeRTLDirection } from "../src/compute-rtl";

describe("computeDomain", () => {
  it("returns the domain part of entity id", () => {
    expect(computeDomain("light.kitchen")).toBe("light");
  });
});

describe("computeEntity", () => {
  it("returns the entity part of entity id", () => {
    expect(computeEntity("light.kitchen")).toBe("kitchen");
  });
});

describe("computeStateDomain", () => {
  it("returns domain from state object", () => {
    const stateObj = { entity_id: "sensor.temp" } as any;
    expect(computeStateDomain(stateObj)).toBe("sensor");
  });
});

describe("computeCardSize", () => {
  it("uses card getCardSize implementation", () => {
    const card = { getCardSize: () => 7 } as any;
    expect(computeCardSize(card)).toBe(7);
  });

  it("returns 4 when getCardSize is missing", () => {
    const card = {} as any;
    expect(computeCardSize(card)).toBe(4);
  });
});

describe("computeRTL", () => {
  it("returns true for rtl language metadata", () => {
    const hass = {
      locale: { language: "ar" },
      translationMetadata: {
        translations: {
          ar: { isRTL: true },
        },
      },
    } as any;

    expect(computeRTL(hass)).toBe(true);
    expect(computeRTLDirection(hass)).toBe("rtl");
  });

  it("defaults to ltr when language metadata is missing", () => {
    const hass = {
      locale: { language: "en" },
      translationMetadata: { translations: {} },
    } as any;

    expect(computeRTL(hass)).toBe(false);
    expect(computeRTLDirection(hass)).toBe("ltr");
  });
});
