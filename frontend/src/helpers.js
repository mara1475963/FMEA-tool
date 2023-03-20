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

export const findKey = (key, type) => {
  let result = false;
  const recursiveSearch = (obj = structure1) => {
    if (!obj || typeof obj !== "object") {
      return;
    }
    if (obj[key] && typeof obj[key] == type) {
      result = true;
      return true;
    }
    Object.keys(obj).forEach((k) => {
      recursiveSearch(obj[k]);
    });
  };
  recursiveSearch(structure1);
  return result;
};

export const checkImportFormat = (obj = {}) => {
  for (const key in Object.keys(obj)) {
    console.log(findKey(key, typeof obj[key]));
    if (!findKey(key, typeof obj[key])) {
      return false;
    }
  }

  return true;
};

export const getNewId = () => {
  return uuid();
};
