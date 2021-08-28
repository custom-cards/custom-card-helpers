import { FrontendTranslationData } from "./types";
/**
 * Formats a number based on the specified language with thousands separator(s) and decimal character for better legibility.
 * @param num The number to format
 * @param locale The user-selected language and number format, from `hass.locale`
 * @param options Intl.NumberFormatOptions to use
 */
export declare const formatNumber: (num: string | number, locale?: FrontendTranslationData, options?: Intl.NumberFormatOptions) => string;
