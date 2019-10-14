import * as fs from "fs";
import parseYML from "../../src/lib/parse-yml";
import { assert } from "chai";

const expectedObject = { struct: { string: "string", number: "number" } };
const pathToSampelYML = "./samples/sample.yml";
const pathToSampelJSON = "./samples/sample.json";

describe("Unit testing Parse yml funciton", () => {
  it("Should be able to parse a yml-path to an object", () => {
    const obj = parseYML(pathToSampelYML);
    assert(
      JSON.stringify(obj) == JSON.stringify(expectedObject),
      "Reading yml from file gives unexcpeted response"
    );
  });

  it("Should be able to parse an object to an object", () => {
    const obj = parseYML(expectedObject);
    assert(
      JSON.stringify(obj) == JSON.stringify(expectedObject),
      "Reading object gives unexcpeted response"
    );
  });

  it("Should be able to parse an JSON-string to an object", () => {
    const obj = parseYML(JSON.stringify(expectedObject));
    assert(
      JSON.stringify(obj) == JSON.stringify(expectedObject),
      "Reading JSON-string gives unexcpeted response"
    );
  });

  it("Should be able to parse an JSON-path to an object", () => {
    const obj = parseYML(pathToSampelJSON);
    assert(
      JSON.stringify(obj) == JSON.stringify(expectedObject),
      "Reading json from file gives unexcpeted response"
    );
  });
});
