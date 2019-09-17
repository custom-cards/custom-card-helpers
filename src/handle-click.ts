import { HomeAssistant, ActionConfig } from "./types";
import { fireEvent } from "./fire-event";
import { forwardHaptic } from "./haptic";
import { navigate } from "./navigate";
import { toggleEntity } from "./toggle-entity";

export const handleClick = (
  node: HTMLElement,
  hass: HomeAssistant,
  config: {
    entity?: string;
    camera_image?: string;
    hold_action?: ActionConfig;
    tap_action?: ActionConfig;
    dbltap_action?: ActionConfig;
  },
  hold: boolean,
  dblClick: boolean
): void => {
  let actionConfig: ActionConfig | undefined;

  if (dblClick && config.dbltap_action) {
    actionConfig = config.dbltap_action;
  } else if (hold && config.hold_action) {
    actionConfig = config.hold_action;
  } else if (!hold && config.tap_action) {
    actionConfig = config.tap_action;
  }

  if (!actionConfig) {
    actionConfig = {
      action: "more-info"
    };
  }

  switch (actionConfig.action) {
    case "more-info":
      if (config.entity || config.camera_image) {
        fireEvent(node, "hass-more-info", {
          entityId: actionConfig.entity
            ? actionConfig.entity
            : config.entity
              ? config.entity
              : config.camera_image
        });
      }
      break;
    case "navigate":
      if (actionConfig.navigation_path) {
        navigate(node, actionConfig.navigation_path);
      }
      break;
    case "url":
      actionConfig.url && window.open(actionConfig.url);
      break;
    case "toggle":
      if (config.entity) {
        toggleEntity(hass, config.entity!);
      }
      break;
    case "call-service": {
      if (!actionConfig.service) {
        return;
      }
      const [domain, service] = actionConfig.service.split(".", 2);
      const serviceData = { ...actionConfig.service_data };
      if (serviceData.entity_id === 'entity') {
        serviceData.entity_id = config.entity;
      }
      hass.callService(domain, service, serviceData);
    }
  }
 
  if (actionConfig.haptic && actionConfig.haptic !== "none") {
    forwardHaptic(node, actionConfig.haptic);
  } else if (!actionConfig.haptic) {
    forwardHaptic(node, "light");
  }
};
