/** @vitest-environment jsdom */
import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "../src/fire-event";
import { navigate } from "../src/navigate";

describe("fireEvent", () => {
  it("dispatches event with detail and options", () => {
    const node = document.createElement("div");
    const listener = vi.fn();
    node.addEventListener("my-event", listener as EventListener);

    const event = fireEvent(node, "my-event" as any, { value: 1 } as any, {
      bubbles: false,
      cancelable: true,
      composed: false,
    });

    expect(listener).toHaveBeenCalledTimes(1);
    expect((event as any).detail).toEqual({ value: 1 });
    expect(event.bubbles).toBe(false);
    expect(event.cancelable).toBe(true);
    expect(event.composed).toBe(false);
  });
});

describe("navigate", () => {
  it("pushes history and fires location-changed", () => {
    const pushSpy = vi.spyOn(history, "pushState");
    const replaceSpy = vi.spyOn(history, "replaceState");
    const listener = vi.fn();
    window.addEventListener("location-changed", listener as EventListener);

    navigate(null, "/new-path", false);
    expect(pushSpy).toHaveBeenCalled();
    expect(replaceSpy).not.toHaveBeenCalled();
    expect(listener).toHaveBeenCalled();

    navigate(null, "/replace-path", true);
    expect(replaceSpy).toHaveBeenCalled();
  });
});
