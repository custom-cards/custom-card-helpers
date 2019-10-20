import { fireEvent } from "./fire-event";

export const createThing = cardConfig => {
  const _createError = (error, config) => {
    return _createThing("hui-error-card", {
      type: "error",
      error,
      config
    });
  };

  const _createThing = (tag, config) => {
    const element = window.document.createElement(tag);
    try {
      element.setConfig(config);
    } catch (err) {
      console.error(tag, err);
      return _createError(err.message, config);
    }
    return element;
  };

  if (!cardConfig || typeof cardConfig !== 'object' || !cardConfig.type)
    return _createError('No type defined', cardConfig);
  let tag = cardConfig.type;
  if (tag.startsWith('custom:'))
    tag = tag.substr('custom:'.length);
  else
    tag = `hui-${tag}-card`;

  if (customElements.get(tag)) return _createThing(tag, cardConfig);

  // If element doesn't exist (yet) create an error
  const element = _createError(
    `Custom element doesn't exist: ${cardConfig.type}.`,
    cardConfig
  );
  element.style.display = "None";
  const timer = setTimeout(() => {
    element.style.display = "";
  }, 2000);
  // Remove error if element is defined later
  customElements.whenDefined(cardConfig.type).then(() => {
    clearTimeout(timer);
    fireEvent(element, "ll-rebuild", {}, element);
  });

  return element;
};
