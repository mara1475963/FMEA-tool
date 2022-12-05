export const findObject = (obj = {}, key, value) => {
  const result = [];
  const recursiveSearch = (obj = {}) => {
    if (!obj || typeof obj !== "object") {
      return;
    }
    if (obj[key] === value) {
      result.push(obj);
    }
    Object.keys(obj).forEach(function (k) {
      recursiveSearch(obj[k]);
    });
  };
  recursiveSearch(obj);
  return result;
};
