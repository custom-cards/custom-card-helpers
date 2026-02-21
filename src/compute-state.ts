import { HassEntity } from "home-assistant-js-websocket";

const CAP_STATE: string[] = [
  "on",
  "off",
  "open",
  "closed",
  "locked",
  "unlocked",
];

export const computeState = (stateObj: HassEntity): string => {
  const state = stateObj.state;
  const unit = stateObj.attributes.unit_of_measurement;

  if (unit) {
    return `${state} ${unit}`;
  }

  if (CAP_STATE.includes(state)) {
    return state.charAt(0).toUpperCase() + state.slice(1);
  }

  return state;
};
