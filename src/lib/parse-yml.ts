import * as yml from "js-yaml";
import * as fs from "fs";
const parseYML = (path: string | any) => {
  if (typeof path == "object") return path;
  if (path.includes(".yml"))
    return yml.safeLoad(fs.readFileSync(path, "utf-8"));
  if (path.includes(".json")) return JSON.parse(fs.readFileSync(path, "utf-8"));
  return JSON.parse(path);
};

export { parseYML };
export default parseYML;
