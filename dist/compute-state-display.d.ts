import { HassEntity } from "home-assistant-js-websocket";
import { LocalizeFunc } from "./translations/localize";
export declare function computeStateDisplay(localize: LocalizeFunc, stateObj: HassEntity, language: string): string;
