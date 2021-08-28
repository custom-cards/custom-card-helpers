import { HassEntity } from "home-assistant-js-websocket";
import { LocalizeFunc } from "./translations/localize";
import { FrontendTranslationData } from "./types";
export declare function computeStateDisplay(localize: LocalizeFunc, stateObj: HassEntity, locale: FrontendTranslationData, state?: string): string;
