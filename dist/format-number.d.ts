/**
 * Formats a number based on the specified language with thousands separator(s) and decimal character for better legibility.
 * @param num The number to format
 * @param language The language to use when formatting the number
 */
export declare const formatNumber: (num: string | number, language: string, options?: Intl.NumberFormatOptions) => string;
