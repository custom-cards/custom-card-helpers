import {
  HassEntities,
  HassEntity,
  HassConfig,
  Auth,
  Connection,
  MessageBase,
  HassServices,
  HassServiceTarget,
} from "home-assistant-js-websocket";
import { HapticType } from "./haptic";

export interface EntityRegistryDisplayEntry {
  entity_id: string;
  name?: string;
  device_id?: string;
  area_id?: string;
  hidden?: boolean;
  entity_category?: "config" | "diagnostic";
  translation_key?: string;
  platform?: string;
  labels?: string[];
}

export interface DeviceRegistryEntry {
  id: string;
  name: string | null;
  name_by_user: string | null;
  area_id: string | null;
  /** Set when this device is a sub-device of another. @since Home Assistant 2026.4 */
  parent_device_id?: string | null;
}

export interface AreaRegistryEntry {
  area_id: string;
  name: string;
  floor_id: string | null;
}

export interface FloorRegistryEntry {
  floor_id: string;
  name: string;
  level: number | null;
}

/** One part of a composed entity name, as accepted by `formatEntityName`. */
export type EntityNameItem =
  | { type: "entity" | "device" | "area" | "floor" }
  | { type: "text"; text: string };

export interface EntityNameOptions {
  /** Joins the resolved parts. Defaults to a single space. */
  separator?: string;
}
import { HASSDomEvent } from "./fire-event";

export interface ToggleMenuActionConfig extends BaseActionConfig {
  action: "toggle-menu";
}

export interface ToggleActionConfig extends BaseActionConfig {
  action: "toggle";
}

export interface CallServiceActionConfig extends BaseActionConfig {
  action: "call-service";
  service: string;
  data?: {
    entity_id?: string | [string];
    [key: string]: any;
  };

  target?: HassServiceTarget;
  repeat?: number;
  haptic?: HapticType;
}

export interface NavigateActionConfig extends BaseActionConfig {
  action: "navigate";
  navigation_path: string;
}

export interface UrlActionConfig extends BaseActionConfig {
  action: "url";
  url_path: string;
}

export interface MoreInfoActionConfig extends BaseActionConfig {
  action: "more-info";
  entity?: string;
}

export interface NoActionConfig extends BaseActionConfig {
  action: "none";
}

export interface CustomActionConfig extends BaseActionConfig {
  action: "fire-dom-event";
}

export interface TurnOnActionConfig extends BaseActionConfig {
  action: "turn_on";
  entity?: string;
}

export interface TurnOffActionConfig extends BaseActionConfig {
  action: "turn_off";
  entity?: string;
}

/**
 * `repeat` and `haptic` are specifically for use in custom cards like the Button-Card
 */
export interface BaseActionConfig {
  confirmation?: ConfirmationRestrictionConfig;
  repeat?: number;
  repeat_limit?: number;
  haptic?: HapticType;
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
  | ToggleMenuActionConfig
  | TurnOnActionConfig
  | TurnOffActionConfig;

export interface HuiRootElement extends HTMLElement {
  lovelace: {
    config: LovelaceConfig;
    current_view: number;
    [key: string]: any;
  };
  ___curView: number;
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
      entityId: string | undefined;
    };
    "ll-rebuild": {};
    "ll-custom": {};
    "location-changed": {
      replace: boolean;
    };
    "show-dialog": {};
    undefined;
    action: {
      action: string;
    };
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

export interface ServiceCallRequest {
  domain: string;
  service: string;
  serviceData?: Record<string, any>;
  target?: HassServiceTarget;
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
  locale: FrontendLocaleData;
  // local stored language, keep that name for backward compability
  selectedLanguage: string | null;
  resources: Resources;
  localize: LocalizeFunc;
  translationMetadata: {
    fragments: string[];
    translations: {
      [lang: string]: Translation;
    };
  };

  // Registry data. Populated over the websocket connection after connect, and
  // needed to resolve an entity's naming context. All optional: `floors` only
  // exists from HA 2024.4, and marking the rest optional keeps this interface
  // safe to construct in tests and mocks.
  entities?: Record<string, EntityRegistryDisplayEntry>;
  devices?: Record<string, DeviceRegistryEntry>;
  areas?: Record<string, AreaRegistryEntry>;
  floors?: Record<string, FloorRegistryEntry>;

  // Display formatters, which apply the user's locale, precision and naming
  // preferences the same way the built-in cards do. Optional because each was
  // added in a specific Home Assistant version - check before calling, or gate
  // on `hass.config.version`.
  /** @since Home Assistant 2024.4 */
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
  /** @since Home Assistant 2024.4 */
  formatEntityAttributeName?: (stateObj: HassEntity, attribute: string) => string;
  /** @since Home Assistant 2024.4 */
  formatEntityAttributeValue?: (
    stateObj: HassEntity,
    attribute: string,
    value?: unknown
  ) => string;
  /**
   * Formats an entity's display name from its registry context.
   *
   * Accepts a plain string (returned as-is), a single name item, an array of
   * items joined with the separator, or `undefined` for the default name.
   *
   * @since Home Assistant 2026.4 in this shape. The helper exists from 2025.10,
   * but took bare type strings then, and only accepted `EntityNameItem`s
   * between 2025.11 and 2026.3 - so feature detection is not sufficient, check
   * `hass.config.version` before calling with a card's `name` option.
   */
  formatEntityName?: (
    stateObj: HassEntity,
    name?: string | EntityNameItem | EntityNameItem[],
    options?: EntityNameOptions
  ) => string;

  dockedSidebar: boolean;
  moreInfoEntityId: string;
  user: CurrentUser;
  callService: (
    domain: ServiceCallRequest["domain"],
    service: ServiceCallRequest["service"],
    serviceData?: ServiceCallRequest["serviceData"],
    target?: ServiceCallRequest["target"]
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
  hassUrl: (path?: string) => string;
}

export enum NumberFormat {
  language = "language",
  system = "system",
  comma_decimal = "comma_decimal",
  decimal_comma = "decimal_comma",
  space_comma = "space_comma",
  none = "none",
}

export enum TimeFormat {
  language = "language",
  system = "system",
  am_pm = "12",
  twenty_four = "24",
}

export enum TimeZone {
  local = "local",
  server = "server",
}

export enum DateFormat {
  language = "language",
  system = "system",
  DMY = "DMY",
  MDY = "MDY",
  YMD = "YMD",
}

export enum FirstWeekday {
  language = "language",
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export interface FrontendLocaleData {
  language: string;
  number_format: NumberFormat;
  time_format: TimeFormat;
  date_format: DateFormat;
  first_weekday: FirstWeekday;
  time_zone: TimeZone;
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
  editMode?: boolean;
  getCardSize(): number | Promise<number>;
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
  repeat?: number;
  repeatLimit?: number;
  isMomentary?: boolean;
  disableKbd?: boolean;
  disabled?: boolean;
}

export interface EntitiesCardEntityConfig extends EntityConfig {
  type?: string;
  secondary_info?:
    | "entity-id"
    | "last-changed"
    | "last-triggered"
    | "last-updated"
    | "position"
    | "tilt-position"
    | "brightness";
  action_name?: string;
  service?: string;
  data?: Record<string, unknown>;
  url?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  state_color?: boolean;
  show_name?: boolean;
  show_icon?: boolean;
}

export interface EntityConfig {
  entity: string;
  type?: string;
  name?: string;
  icon?: string;
  image?: string;
}

export interface LovelaceElementConfigBase {
  type: string;
  style: Record<string, string>;
}
