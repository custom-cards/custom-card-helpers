//REF: https://github.com/home-assistant/frontend/blob/dev/src/common/datetime/relative_time.ts

import { FrontendLocaleData } from "../types";
import { selectUnit } from "./select_unit";

 const formatRelTimeMem =
  (locale: FrontendLocaleData) =>
    new Intl.RelativeTimeFormat(locale.language, { numeric: "auto" });


/**
 * Calculate a string representing a date object as relative time from now.
 *
 * Example output: 5 minutes ago, in 3 days.
 */
 export const relativeTime = (
  from: Date,
  locale: FrontendLocaleData,
  to?: Date,
  includeTense = true
): string => {
  const diff = selectUnit(from, to);
  if (includeTense) {
    return formatRelTimeMem(locale).format(diff.value, diff.unit);
  }
  return Intl.NumberFormat(locale.language, {
    style: "unit",
    unit: diff.unit,
    unitDisplay: "long",
  }).format(Math.abs(diff.value));
};
