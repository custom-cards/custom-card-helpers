import { HassEntity } from "home-assistant-js-websocket";
import { formatDateTime } from "./datetime/format_date_time";
import { formatDate } from "./datetime/format_date";
import { formatTime } from "./datetime/format_time";
import { LocalizeFunc } from "./translations/localize";
import { computeStateDomain } from "./compute-state-domain";
import { FrontendTranslationData } from "./types";
import { formatNumber } from "./format-number";

export function computeStateDisplay(
  localize: LocalizeFunc,
  stateObj: HassEntity,
  locale: FrontendTranslationData,
  state?: string
): string {
  const compareState = state !== undefined ? state : stateObj.state;

  if (compareState === "unknown" || compareState  === "unavailable") {
    return localize(`state.default.${compareState}`);
  }

  if (stateObj.attributes.unit_of_measurement) {
    return `${formatNumber(compareState, locale)} ${stateObj.attributes.unit_of_measurement}`;
  }

  const domain = computeStateDomain(stateObj);

  if (domain === "input_datetime") {
    let date: Date;
    if (!stateObj.attributes.has_time) {
      date = new Date(
        stateObj.attributes.year,
        stateObj.attributes.month - 1,
        stateObj.attributes.day
      );
      return formatDate(date, locale);
    }
    if (!stateObj.attributes.has_date) {
      const now = new Date();
      date = new Date(
        // Due to bugs.chromium.org/p/chromium/issues/detail?id=797548
        // don't use artificial 1970 year.
        now.getFullYear(),
        now.getMonth(),
        now.getDay(),
        stateObj.attributes.hour,
        stateObj.attributes.minute
      );
      return formatTime(date, locale);
    }

    date = new Date(
      stateObj.attributes.year,
      stateObj.attributes.month - 1,
      stateObj.attributes.day,
      stateObj.attributes.hour,
      stateObj.attributes.minute
    );
    return formatDateTime(date, locale);
  }

  if (domain === "humidifier") {
    if (compareState === "on" && stateObj.attributes.humidity) {
      return `${stateObj.attributes.humidity} %`;
    }
  }

  // `counter` and `number` domains do not have a unit of measurement but should still use `formatNumber`
  if (domain === "counter" || domain === "number") {
    return formatNumber(compareState, locale);
  }

  return (
    // Return device class translation
    (stateObj.attributes.device_class &&
      localize(
        `component.${domain}.state.${stateObj.attributes.device_class}.${stateObj.state}`
      )) ||
    // Return default translation
    localize(`component.${domain}.state._.${stateObj.state}`) ||
    // We don't know! Return the raw state.
    stateObj.state
  );
}
