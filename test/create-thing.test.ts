/** @vitest-environment jsdom */
import { describe, expect, it } from "vitest";
import { createThing } from "../src/create-thing";

// See https://github.com/custom-cards/button-card/pull/1152 - the "wait for the lazy-loaded
// element, then recover" mechanism was waiting on `customElements.whenDefined(cardConfig.type)`
// (the raw config type string, e.g. "custom:my-card") instead of the actual resolved DOM tag
// (e.g. "my-card"). Those are different strings, so the wait never resolved - for a `custom:`
// type it could never resolve at all, since colons aren't valid in custom element names.
//
// createThing's error path itself renders a "hui-error-card" element (real HA always has this
// registered) - stub it here so _createThing's error-card creation succeeds in this isolated
// test environment.
if (!customElements.get("hui-error-card")) {
  class HuiErrorCard extends HTMLElement {
    setConfig() {}
  }
  customElements.define("hui-error-card", HuiErrorCard);
}

describe("createThing recovery", () => {
  it("fires ll-rebuild once the resolved tag is defined, for a custom: card type", async () => {
    const tag = `test-recovers-card-${Math.random().toString(36).slice(2)}`;

    const element = createThing({ type: `custom:${tag}` });
    expect(element.tagName.toLowerCase()).toBe("hui-error-card");

    let rebuilt = false;
    element.addEventListener("ll-rebuild", () => {
      rebuilt = true;
    });

    class TestCard extends HTMLElement {
      setConfig() {}
    }
    customElements.define(tag, TestCard);

    await customElements.whenDefined(tag);
    // ll-rebuild is fired synchronously in the whenDefined().then() callback, which runs as a
    // microtask - flush the microtask queue once more before asserting.
    await Promise.resolve();

    expect(rebuilt).toBe(true);
  });

  it("fires ll-rebuild once the resolved tag is defined, for a built-in card type", async () => {
    // Matches the actual reported scenario (button-card#1150): a built-in "conditional" card
    // nested as a custom_field, whose type string ("conditional") has no hyphen and is never a
    // valid custom element name on its own - only the resolved "hui-conditional-card" tag is.
    const tag = "hui-conditional-card";

    const element = createThing({ type: "conditional" });
    expect(element.tagName.toLowerCase()).toBe("hui-error-card");

    let rebuilt = false;
    element.addEventListener("ll-rebuild", () => {
      rebuilt = true;
    });

    if (!customElements.get(tag)) {
      class ConditionalCard extends HTMLElement {
        setConfig() {}
      }
      customElements.define(tag, ConditionalCard);
    }

    await customElements.whenDefined(tag);
    await Promise.resolve();

    expect(rebuilt).toBe(true);
  });
});
