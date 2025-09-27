// snake_case to camelCase
const toCamelCase = (str: string) => {
  return str.replace(/_(\w)/g, (_, c) => c.toUpperCase());
}

const convertCaseByArray = (arr: object[]) : object[] => {
  return arr.map((item: object) => {
    return Object.keys(item).reduce((acc, key) => {
      acc[toCamelCase(key)] = item[key as keyof typeof item];
      return acc;
    }, {} as Record<string, any>);
  });
};

const convertCaseByObject = (obj: object) : object => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[toCamelCase(key)] = obj[key as keyof typeof obj];
    return acc;
  }, {} as Record<string, any>);
};

export default { convertCaseByArray, convertCaseByObject };