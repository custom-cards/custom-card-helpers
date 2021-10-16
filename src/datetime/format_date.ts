import { FrontendLocaleData } from "../types";


// Tuesday, August 10
export const formatDateWeekday = (dateObj: Date, locale: FrontendLocaleData) =>
  formatDateWeekdayMem(locale).format(dateObj);

const formatDateWeekdayMem =
  (locale: FrontendLocaleData) =>
    new Intl.DateTimeFormat(locale.language, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });


// August 10, 2021
export const formatDate = (dateObj: Date, locale: FrontendLocaleData) =>
  formatDateMem(locale).format(dateObj);

const formatDateMem =
  (locale: FrontendLocaleData) =>
    new Intl.DateTimeFormat(locale.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });


// 10/08/2021
export const formatDateNumeric = (dateObj: Date, locale: FrontendLocaleData) =>
  formatDateNumericMem(locale).format(dateObj);

const formatDateNumericMem =
  (locale: FrontendLocaleData) =>
    new Intl.DateTimeFormat(locale.language, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });


// Aug 10
export const formatDateShort = (dateObj: Date, locale: FrontendLocaleData) =>
formatDateShortMem(locale).format(dateObj);

const formatDateShortMem =
(locale: FrontendLocaleData) =>
  new Intl.DateTimeFormat(locale.language, {
    day: "numeric",
    month: "short",
  });


/**
 * Formatting a Date to just a month with year e.g. August 2021
 * @param dateObj The date to convert
 * @param locale The users's locale settings
 * @returns month and year like "August 2021"
 */
export const formatDateMonthYear = (
dateObj: Date,
locale: FrontendLocaleData
) => formatDateMonthYearMem(locale).format(dateObj);

const formatDateMonthYearMem = (locale: FrontendLocaleData) =>
  new Intl.DateTimeFormat(locale.language, {
    month: "long",
    year: "numeric",
  });


/**
 * Formatting a Date to just a month e.g. August
 * @param dateObj The date to convert
 * @param locale The users's locale settings
 * @returns the written out months of the date
 */
export const formatDateMonth = (dateObj: Date, locale: FrontendLocaleData) =>
formatDateMonthMem(locale).format(dateObj);

const formatDateMonthMem = (locale: FrontendLocaleData) =>
  new Intl.DateTimeFormat(locale.language, {
    month: "long",
  });


/**
 * Formatting a Date to just a year e.g. 2021
 * @param dateObj The date to convert
 * @param locale The users's locale settings
 * @returns the year of the date in yyyy
 */
export const formatDateYear = (dateObj: Date, locale: FrontendLocaleData) =>
formatDateYearMem(locale).format(dateObj);

const formatDateYearMem = (locale: FrontendLocaleData) =>
  new Intl.DateTimeFormat(locale.language, {
    year: "numeric",
  });