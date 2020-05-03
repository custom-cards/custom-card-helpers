import {
  HassEntities,
  HassConfig,
  Auth,
  Connection,
  MessageBase,
  HassServices
} from "home-assistant-js-websocket";
import { HapticType } from "./haptic";
import { HASSDomEvent } from "./fire-event";

export interface ToggleMenuActionConfig extends BaseActionConfig {
  action: "toggle-menu";
  repeat?: number;
  haptic?: HapticType;
}

export interface ToggleActionConfig extends BaseActionConfig {
  action: "toggle";
  repeat?: number;
  haptic?: HapticType;
}

export interface CallServiceActionConfig extends BaseActionConfig {
  action: "call-service";
  service: string;
  service_data?: {
    entity_id?: string | [string];
    [key: string]: any;
  };
  repeat?: number;
  haptic?: HapticType;
}

export interface NavigateActionConfig extends BaseActionConfig {
  action: "navigate";
  navigation_path: string;
  repeat?: number;
  haptic?: HapticType;
}

export interface UrlActionConfig extends BaseActionConfig {
  action: "url";
  url_path: string;
  repeat?: number;
  haptic?: HapticType;
}

export interface MoreInfoActionConfig extends BaseActionConfig {
  action: "more-info";
  entity?: string;
  repeat?: number;
  haptic?: HapticType;
}

export interface NoActionConfig extends BaseActionConfig {
  action: "none";
  repeat?: number;
  haptic?: HapticType;
}

export interface CustomActionConfig extends BaseActionConfig {
  action: "fire-dom-event";
  repeat?: number;
  haptic?: HapticType;
}

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

export type ActionConfig =
  | ToggleActionConfig
  | CallServiceActionConfig
  | NavigateActionConfig
  | UrlActionConfig
  | MoreInfoActionConfig
  | NoActionConfig
  | CustomActionConfig
  | ToggleMenuActionConfig;

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
    "action": {
      action: string;
    }
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

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  lovelace?: LovelaceConfig;
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceConfig {
  title?: string;
  views: LovelaceViewConfig[];
  background?: string;
}

export interface LovelaceViewConfig {
  index?: number;
  title?: string;
  badges?: Array<string | LovelaceBadgeConfig>;
  cards?: LovelaceCardConfig[];
  path?: string;
  icon?: string;
  theme?: string;
  panel?: boolean;
  background?: string;
  visible?: boolean | ShowViewConfig[];
}

export interface ShowViewConfig {
  user?: string;
}

export interface LovelaceBadgeConfig {
  type?: string;
  [key: string]: any;
}

export interface ActionHandlerDetail {
  action: string;
}

export type ActionHandlerEvent = HASSDomEvent<ActionHandlerDetail>;

export interface ActionHandlerOptions {
  hasHold?: boolean;
  hasDoubleClick?: boolean;
}
