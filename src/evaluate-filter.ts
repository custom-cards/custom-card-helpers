import { HassEntity } from "home-assistant-js-websocket";

/** Parse a state/attribute/filter value as a finite number, or return undefined. */
const toNumber = (value: unknown): number | undefined => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
};

/**
 * Compare two values: numerically when both are numeric (so "100.0" > "60"),
 * otherwise as strings. Returns a negative number, zero or a positive number.
 */
const compare = (a: unknown, b: unknown): number => {
  const numA = toNumber(a);
  const numB = toNumber(b);
  if (numA !== undefined && numB !== undefined) {
    return numA - numB;
  }
  const strA = String(a);
  const strB = String(b);
  return strA < strB ? -1 : strA > strB ? 1 : 0;
};

const matchesRegex = (state: unknown, pattern: unknown): boolean => {
  try {
    const regex = pattern instanceof RegExp ? pattern : new RegExp(String(pattern));
    return regex.test(String(state));
  } catch {
    return false;
  }
};

/**
 * Evaluate a filter (`{ value, operator?, attribute? }`) against an entity.
 *
 * Numeric states and values are compared as numbers; anything else is compared
 * as a string. Returns false when the entity or attribute does not exist.
 */
export const evaluateFilter = (stateObj: HassEntity | undefined, filter: any): boolean => {
  if (!stateObj) {
    return false;
  }

  const operator = filter.operator || "==";
  const value = filter.value ?? filter;
  const state = filter.attribute ? stateObj.attributes?.[filter.attribute] : stateObj.state;

  if (state === undefined || state === null) {
    return false;
  }

  switch (operator) {
    case "==":
      return compare(state, value) === 0;
    case "!=":
      return compare(state, value) !== 0;
    case "<=":
      return compare(state, value) <= 0;
    case "<":
      return compare(state, value) < 0;
    case ">=":
      return compare(state, value) >= 0;
    case ">":
      return compare(state, value) > 0;
    case "regex":
      return matchesRegex(state, value);
    default:
      return false;
  }
};
