import fecha from "fecha";
import { FrontendTranslationData } from "../types";

// Check for support of native locale string options
function toLocaleDateStringSupportsOptions() {
  try {
    new Date().toLocaleDateString("i");
  } catch (e) {
    return e.name === "RangeError";
  }
  return false;
}

export const formatDate = (toLocaleDateStringSupportsOptions()
  ? (dateObj: Date, locales: FrontendTranslationData) =>
      dateObj.toLocaleDateString(locales.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
  : (dateObj: Date) => fecha.format(dateObj, "mediumDate"));
