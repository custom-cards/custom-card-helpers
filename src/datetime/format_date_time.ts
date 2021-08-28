import fecha from "fecha";
import { FrontendTranslationData } from "../types";

// Check for support of native locale string options
function toLocaleStringSupportsOptions() {
  try {
    new Date().toLocaleString("i");
  } catch (e) {
    return e.name === "RangeError";
  }
  return false;
}

export const formatDateTime = (toLocaleStringSupportsOptions()
  ? (dateObj: Date, locales: FrontendTranslationData) =>
      dateObj.toLocaleString(locales.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
  : (dateObj: Date) => fecha.format(dateObj, "haDateTime"));
