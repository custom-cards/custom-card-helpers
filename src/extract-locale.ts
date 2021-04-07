import { FrontendTranslationData, HomeAssistant, NumberFormat } from "./types";

/**
 * Function for guaranteeing proper locale handling for Homeassistant Versions lower than 20210328.0
 * @param hass Homeassistant Object
 * @param number_format Override default number_format
 * @returns New Locale Format
 */
export function extractLocale(hass: HomeAssistant, number_format = undefined): FrontendTranslationData {
  if ("locale" in hass) {
    return hass.locale
  }
  return { language: hass.language, number_format: number_format || "language" as NumberFormat}
}
