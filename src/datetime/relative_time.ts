import { LocalizeFunc } from "../translations/localize";

/**
 * Calculate a string representing a date object as relative time from now.
 *
 * Example output: 5 minutes ago, in 3 days.
 */
const tests = [60, 60, 24, 7];
const langKey = ["second", "minute", "hour", "day"];

export function relativeTime(
  dateObj: Date,
  localize: LocalizeFunc,
  options: {
    compareTime?: Date;
    includeTense?: boolean;
  } = {}
): string {
  const compareTime = options.compareTime || new Date();
  let delta = (compareTime.getTime() - dateObj.getTime()) / 1000;
  const tense = delta >= 0 ? "past" : "future";
  const durationLangKey = options.includeTense === false ? 'duration' : `${tense}_duration`;
  delta = Math.abs(delta);

  let timeDesc;

  for (let i = 0; i < tests.length; i++) {
    if (delta < tests[i]) {
      delta = Math.floor(delta);
      timeDesc = localize(
        `ui.components.relative_time.${durationLangKey}.${langKey[i]}`,
        "count",
        delta
      );
      break;
    }

    delta /= tests[i];
  }

  if (timeDesc === undefined) {
    delta = Math.floor(delta);
    timeDesc = localize(
      `ui.components.relative_time.${durationLangKey}.week`,
      "count",
      delta
    );
  }

  return timeDesc;
}
