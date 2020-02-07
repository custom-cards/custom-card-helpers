import {
  HassEntities,
  HassConfig,
  Auth,
  Connection,
  MessageBase,
  HassServices
} from "home-assistant-js-websocket";
import { HapticType } from "./haptic";

export interface ToggleActionConfig extends BaseActionConfig {
  action: "toggle";
  repeat?: number;
  haptic?: HapticType;
}

export interface ToggleMenuActionConfig extends BaseActionConfig {
  action: "toggle-menu";
  repeat?: number;
  haptic?: HapticType;
}

export interface CallServiceActionConfig extends BaseActionConfig {
  action: "call-service";
  repeat?: number;
  haptic?: HapticType;
  service: string;
  service_data?: {
    entity_id?: string | [string];
    [key: string]: any;
  };
}

export interface NavigateActionConfig extends BaseActionConfig {
  action: "navigate";
  repeat?: number;
  haptic?: HapticType;
  navigation_path: string;
}

export interface MoreInfoActionConfig extends BaseActionConfig {
  action: "more-info";
  repeat?: number;
  haptic?: HapticType;
  entity?: string;
}

export interface UrlActionConfig extends BaseActionConfig {
  action: "url";
  repeat?: number;
  haptic?: HapticType;
  url_path: string;
}

export interface NoActionConfig extends BaseActionConfig {
  action: "none";
  repeat?: number;
}

export type ActionConfig =
  | ToggleActionConfig
  | ToggleMenuActionConfig
  | CallServiceActionConfig
  | NavigateActionConfig
  | MoreInfoActionConfig
  | UrlActionConfig
  | NoActionConfig;

export interface BaseActionConfig {
  confirmation?: ConfirmationRestrictionConfig;
}

export interface ConfirmationRestrictionConfig {
  text?: string;
  exemptions?: RestrictionConfig[];
}

export interface RestrictionConfig {
  user: string;
}

export interface Window {
  // Custom panel entry point url
  customPanelJS: string;
  ShadyCSS: {
    nativeCss: boolean;
    nativeShadow: boolean;
    prepareTemplate(templateElement, elementName, elementExtension);
    styleElement(element);
    styleSubtree(element, overrideProperties);
    styleDocument(overrideProperties);
    getComputedStyleValue(element, propertyName);
  };
}

declare global {
  // for fire event
  interface HASSDomEvents {
    "value-changed": {
      value: unknown;
    };
    "config-changed": {
      config: any;
    };
    "hass-more-info": {
      entityId: string | null;
    };
    "ll-rebuild": {};
    "location-changed": {
      replace: boolean;
    };
    "show-dialog": {};
    undefined;
  }
}

type ValidHassDomEvent = keyof HASSDomEvents;

export type LocalizeFunc = (key: string, ...args: any[]) => string;

export interface Credential {
  auth_provider_type: string;
  auth_provider_id: string;
}

export interface MFAModule {
  id: string;
  name: string;
  enabled: boolean;
}

export interface CurrentUser {
  id: string;
  is_owner: boolean;
  is_admin: boolean;
  name: string;
  credentials: Credential[];
  mfa_modules: MFAModule[];
}

export interface Theme {
  // Incomplete
  "primary-color": string;
  "text-primary-color": string;
  "accent-color": string;
}

export interface Themes {
  default_theme: string;
  themes: { [key: string]: Theme };
}

export interface Panel {
  component_name: string;
  config: { [key: string]: any } | null;
  icon: string | null;
  title: string | null;
  url_path: string;
}

export interface Panels {
  [name: string]: Panel;
}

export interface Resources {
  [language: string]: { [key: string]: string };
}

export interface Translation {
  nativeName: string;
  isRTL: boolean;
  fingerprints: { [fragment: string]: string };
}

export interface HomeAssistant {
  auth: Auth;
  connection: Connection;
  connected: boolean;
  states: HassEntities;
  services: HassServices;
  config: HassConfig;
  themes: Themes;
  selectedTheme?: string | null;
  panels: Panels;
  panelUrl: string;

  // i18n
  // current effective language, in that order:
  //   - backend saved user selected lanugage
  //   - language in local appstorage
  //   - browser language
  //   - english (en)
  language: string;
  // local stored language, keep that name for backward compability
  selectedLanguage: string;
  resources: Resources;
  localize: LocalizeFunc;
  translationMetadata: {
    fragments: string[];
    translations: {
      [lang: string]: Translation;
    };
  };

  dockedSidebar: boolean;
  moreInfoEntityId: string;
  user: CurrentUser;
  callService: (
    domain: string,
    service: string,
    serviceData?: { [key: string]: any }
  ) => Promise<void>;
  callApi: <T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: { [key: string]: any }
  ) => Promise<T>;
  fetchWithAuth: (
    path: string,
    init?: { [key: string]: any }
  ) => Promise<Response>;
  sendWS: (msg: MessageBase) => Promise<void>;
  callWS: <T>(msg: MessageBase) => Promise<T>;
}

export interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  type: string;
  [key: string]: any;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  isPanel?: boolean;
  getCardSize(): number;
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceElement extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceElementConfig): void;
}

export interface LovelaceElementConfig {
  type?: string;
  style?: object;
}