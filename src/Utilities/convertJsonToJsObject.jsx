function convertKeysToCamelCase(key) {
  if (key.includes("_")) {
    return key.replace(/_./g, (match) => match.charAt(1).toUpperCase());
  }
  return key;
}

export default function convertJsonIntoJsObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertJsonIntoJsObject(item));
  }

  const newObject = {};

  Object.entries(obj).forEach(([key, value]) => {
    const newKey = convertKeysToCamelCase(key);
    newObject[newKey] = convertJsonIntoJsObject(value);
  });

  return newObject;
}
