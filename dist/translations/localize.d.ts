import { Resources } from "../types";
export declare type LocalizeFunc = (key: string, ...args: any[]) => string;
interface FormatType {
    [format: string]: any;
}
export interface FormatsType {
    number: FormatType;
    date: FormatType;
    time: FormatType;
}
/**
 * Adapted from Polymer app-localize-behavior.
 *
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
/**
 * Optional dictionary of user defined formats, as explained here:
 * http://formatjs.io/guides/message-syntax/#custom-formats
 *
 * For example, a valid dictionary of formats would be:
 * this.formats = {
 *    number: { USD: { style: 'currency', currency: 'USD' } }
 * }
 */
export declare const computeLocalize: (cache: any, language: string, resources: Resources, formats?: FormatsType) => LocalizeFunc;
/**
 * Silly helper function that converts an object of placeholders to array so we
 * can convert it back to an object again inside the localize func.
 * @param localize
 * @param key
 * @param placeholders
 */
export declare const localizeKey: (localize: LocalizeFunc, key: string, placeholders?: {
    [key: string]: string;
}) => string;
export {};
