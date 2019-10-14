let ErrorPath: Array<String> = [];
let ErrorDescription = "";

const ErrorMessage = () => ErrorPath.join(".") + " " + ErrorDescription;

const parse = (input: any, template: any): boolean => {
  return validateHelper(input, getSchema(template));
};

function getSchema(root: any): any {
  if (typeof root !== "object") return getRestriction(root, true);
  const keys: Array<string> = Object.keys(root);
  const schema: any = {};

  for (const key of keys) {
    const lastKeyIndex = key.length - 1;
    const optional = key[lastKeyIndex] === "?";
    const letNewKey = !optional ? key : key.slice(0, key.length - 1);
    if (root[key].constructor.name == "Object") {
      schema[letNewKey] = {};
      if (optional) {
        schema[letNewKey] = getSchema(root[key]);
        schema[letNewKey].required = false;
      } else {
        schema[letNewKey] = getSchema(root[key]);
        schema[letNewKey].required = true;
      }
    } else {
      schema[letNewKey] = getRestriction(root[key], optional);
    }
  }

  return schema;
}

function getRestriction(object: any, optional: boolean): any {
  if (object && object.constructor.name == "Array") {
    return {
      array: object.map(getSchema),
      type: Array,
      required: !optional
    };
  }

  return {
    array: [getJSNativeObject(object)],
    type: getJSNativeObject(object),
    required: !optional
  };
}

function getJSNativeObject(value: any) {
  switch ((value && value.toUpperCase && value.toUpperCase()) || value) {
    case "STRING":
      return String;
    case "NUMBER":
      return Number;
    case "BOOLEAN":
      return Boolean;
    case "OBJECT":
      return Object;
    default:
      return value;
  }
}

function validateHelper(input: any, template: any): boolean {
  const type = template.type;
  const required = template.required;
  const array = template.array;

  if (input === undefined) {
    return !required;
  }

  if (input === template) return true;

  if (!type) {
    for (const key in template) {
      ErrorPath.push(key);
      const value = template[key];
      const res = validateHelper(input[key], value);
      if (res) ErrorPath.pop();
      if (!res) return res;
    }
    return true;
  }

  switch (type) {
    case String:
      const isString = input.constructor.name == "String";
      if (!isString) ErrorDescription = "is not string";
      return isString;

    case Boolean:
      const isBoolean = input.constructor.name == "Boolean";
      if (!isBoolean) ErrorDescription = "is not boolean";
      return isBoolean;

    case Number:
      const isNumber = input.constructor.name == "Number";
      if (!isNumber) ErrorDescription = "is not number";
      return isNumber;

    case Array:
      if (!Array.isArray(input)) input = [input];
      for (const entry of input) {
        let correct = false;
        for (const arr of array) {
          if (validateHelper(entry, arr)) {
            correct = true;
            break;
          }
        }

        if (!correct) {
          ErrorPath.pop();
          ErrorDescription = `content does't match array. The value ${entry} doesnt exist in ${array.map(
            (v: any) => v.array || v
          )}.`;
          return false;
        } else ErrorPath.pop();
      }
      return true;
  }

  if (type) {
    return input === type;
  }
  return false;
}

export { ErrorMessage, parse };
export default parse;
