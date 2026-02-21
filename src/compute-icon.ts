import { HassEntity } from "home-assistant-js-websocket";

const DOMAIN_ICONS: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch",
  sensor: "mdi:gauge",
  binary_sensor: "mdi:checkbox-marked-circle",
  climate: "mdi:thermostat",
  cover: "mdi:window-shutter",
  fan: "mdi:fan",
  lock: "mdi:lock",
  media_player: "mdi:cast",
  vacuum: "mdi:robot-vacuum",
  camera: "mdi:camera",
  person: "mdi:account",
  device_tracker: "mdi:account-circle",
  sun: "mdi:white-balance-sunny",
  weather: "mdi:weather-cloudy",
};

export const computeIcon = (stateObj: HassEntity, icon?: string): string => {
  if (icon) {
    return icon;
  }

  if (stateObj.attributes.icon) {
    return stateObj.attributes.icon;
  }

  const domain = stateObj.entity_id.split(".")[0];
  return DOMAIN_ICONS[domain] || "mdi:bookmark";
};
