import parseYML from "./parse-yml";
import _validate, { ErrorMessage as getError } from "./validate";
import chalk from "chalk";
import { all as merge } from "deepmerge"
interface Cofig {
  noExeceptions?: boolean;
}

const validate = (
  input: string | object,
  template: string | object,
  config?: Cofig
): any => {
  const parsedInput = parseYML(input);
  const parsedTemplate = parseYML(template);
  const valid = _validate(parsedInput, parsedTemplate);

  if (!valid && config && config.noExeceptions) return false;
  else {
    if (!valid) throw new Error(chalk.red(getError()));
    else {
      const removedQuestionMarked = JSON.parse(JSON.stringify(parsedTemplate).replace(/\?\"/g, "\""));
      const mergedObject = merge([removedQuestionMarked, parsedInput]);
      console.log(mergedObject)
      return parsedInput;
    }
  }
};

export default validate;
export { validate };
