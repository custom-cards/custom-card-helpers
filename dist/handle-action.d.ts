import { HomeAssistant, ActionConfig } from "./types";
export declare const handleAction: (node: HTMLElement, hass: HomeAssistant, config: {
    entity?: string;
    camera_image?: string;
    hold_action?: ActionConfig;
    tap_action?: ActionConfig;
    double_tap_action?: ActionConfig;
}, action: string) => void;
