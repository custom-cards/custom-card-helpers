import { HassEntity } from "home-assistant-js-websocket";

export const computeName = (stateObj: HassEntity): string =>
  stateObj.attributes.friendly_name || stateObj.entity_id;
