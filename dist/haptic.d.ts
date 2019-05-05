/**
 * Utility function that enables haptic feedback
 */
export declare type HapticType = "success" | "warning" | "failure" | "light" | "medium" | "heavy" | "selection";
declare global {
    interface HASSDomEvents {
        haptic: HapticType;
    }
}
export declare const forwardHaptic: (el: HTMLElement, hapticType: HapticType) => void;
