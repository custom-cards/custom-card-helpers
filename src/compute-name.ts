import { HassEntity } from "home-assistant-js-websocket";

/**
 * @deprecated Reads `friendly_name`, which Home Assistant is moving away from -
 * it now always includes the device name, so this duplicates context the
 * surrounding UI already shows. Prefer `hass.formatEntityName(stateObj, name)`
 * on HA 2026.4 and later, which resolves the name from the entity's registry
 * context and lets users choose which parts to include.
 */
export const computeName = (stateObj: HassEntity): string =>
  stateObj.attributes.friendly_name || stateObj.entity_id;
