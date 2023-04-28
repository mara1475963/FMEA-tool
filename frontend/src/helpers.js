import { v4 as uuid } from "uuid";
import { templateObject } from "./data/dataJS";

export const getNewId = () => {
  return uuid();
};

export const findObject = (obj = {}, key, value) => {
  const result = [];
  const recursiveSearch = (obj = {}) => {
    if (!obj || typeof obj !== "object") {
      return;
    }
    if (obj[key] === value) {
      result.push(obj);
    }
    Object.keys(obj).forEach((k) => {
      recursiveSearch(obj[k]);
    });
  };
  recursiveSearch(obj);
  return result;
};

export const getAllKeys = () => {
  const DATA_KEYS = new Map();

  const recursiveSearch = (obj = templateObject) => {
    if (!obj || typeof obj !== "object") {
      return;
    }
    Object.keys(obj).forEach((k) => {
      if (isNaN(k)) {
        DATA_KEYS.set(k, typeof obj[k]);
      }
      recursiveSearch(obj[k]);
    });
  };
  recursiveSearch(templateObject);
  DATA_KEYS.set("nodeID", "string");
  return DATA_KEYS;
};

export const checkImportFormat = (obj = {}) => {
  const DATA_MAP = getAllKeys();
  let result = true;

  const recursiveSearch = (obj = templateObject) => {
    if (!obj || typeof obj !== "object" || !result) {
      return;
    }
    Object.keys(obj).forEach((k) => {
      if (isNaN(k) && k !== "__rd3t") {
        if (!DATA_MAP.has(k) || typeof obj[k] !== DATA_MAP.get(k)) {
          result = false;
          return;
        }
      }
      if (k !== "__rd3t") {
        recursiveSearch(obj[k]);
      }
    });
  };
  recursiveSearch(obj);

  return result;
};
