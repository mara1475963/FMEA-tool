import { v4 as uuid } from "uuid";
import { structure1 } from "./data/dataJS";

export const findObject = (obj = {}, key, value) => {
  const result = [];
  const recursiveSearch = (obj = {}) => {
    if (!obj || typeof obj !== "object") {
      return;
    }
    if (obj[key] == value) {
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

  const recursiveSearch = (obj = structure1) => {
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
  recursiveSearch(structure1);
  DATA_KEYS.set("nodeID", "string");
  return DATA_KEYS;
};

export const checkImportFormat = (obj = {}) => {
  // const DATA_KEYS = new Map();
  // DATA_KEYS.set("id", "number");
  // DATA_KEYS.set("depth", "number");
  // DATA_KEYS.set("name", "string");
  // DATA_KEYS.set("children", "object");
  // DATA_KEYS.set("functions", "object");
  // DATA_KEYS.set("logs", "object");
  // DATA_KEYS.set("date", "string");
  // DATA_KEYS.set("description", "string");
  // DATA_KEYS.set("relatedDocuments", "string");
  // DATA_KEYS.set("updated", "boolean");
  // DATA_KEYS.set("header", "object");
  // DATA_KEYS.set("dfmeaExamples", "object");
  // DATA_KEYS.set("pfmeaExamples", "object");
  // DATA_KEYS.set("severityExamples", "object");
  // DATA_KEYS.set("occuranceExamples", "object");
  // DATA_KEYS.set("detectionExamples", "object");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");
  // DATA_KEYS.set("", "");

  const DATA_MAP = getAllKeys();
  console.log(DATA_MAP);

  let result = true;

  const recursiveSearch = (obj = structure1) => {
    // console.log(obj, result);
    if (!obj || typeof obj !== "object" || !result) {
      return;
    }
    Object.keys(obj).forEach((k) => {
      if (isNaN(k)) {
        if (!DATA_MAP.has(k) || typeof obj[k] !== DATA_MAP.get(k)) {
          console.log(k, typeof obj[k], DATA_MAP.get(k));
          result = false;
          return;
        }
      }
      recursiveSearch(obj[k]);
    });
  };
  recursiveSearch(obj);

  return result;
};

export const getNewId = () => {
  return uuid();
};
