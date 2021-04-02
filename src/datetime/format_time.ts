import fecha from "fecha";
import { FrontendTranslationData } from "../types";

// Check for support of native locale string options
function toLocaleTimeStringSupportsOptions() {
  try {
    new Date().toLocaleTimeString("i");
  } catch (e) {
    return e.name === "RangeError";
  }
  return false;
}

export const formatTime = (toLocaleTimeStringSupportsOptions()
  ? (dateObj: Date, locales: FrontendTranslationData) =>
      dateObj.toLocaleTimeString(locales.language, {
        hour: "numeric",
        minute: "2-digit",
      })
  : (dateObj: Date) => fecha.format(dateObj, "shortTime"));
