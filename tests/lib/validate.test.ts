import { assert } from "chai";
import validate, { ErrorMessage } from "../../src/lib/validate";

const template = { struct: { string: "String" } };
const faultyObject = { struct: { string: 1 } };
const validObject = { struct: { string: "String" } };
const missingItemObject = { struct: { types: "String" } };
const complexObject = { struct: { types: { list: [1, 2, 3] } } };
const complexObjectCorrect = { struct: { types: { list: 1 } } };
const complexObjectIncorrect = { struct: { typse: { list: "1" } } };
const complexObjectArray = { struct: { kk: { list: [1337] } } };
const complexObjectIncorrectArray = { "struct?": { typse: { list: [1337] } } };
const complexObjectCorrectArray = { struct: { kk: { list: 1337 } } };
const optionalObject = { "struct?": "String", required: "Number" };
const optionalObjectCorrect = { required: 12 };
const optionalObjectIncorrect = { struct: "string" };

describe("Unit testing validate object funciton", () => {
  it("Should be able to detect error on easy faulty object", () => {
    const response: boolean = validate(faultyObject, template);
    assert(!response, "Validting fault object gave true");
  });

  it("Should be  able to clear an easy valid object", () => {
    const response = validate(validObject, template);
    assert(response);
  });

  it("Should be able to clear an easy valid object", () => {
    const response = validate(missingItemObject, template);
    assert(!response);
  });

  it("Should be  able to clear an easy valid object", () => {
    const response = validate(complexObjectCorrect, complexObject);
    assert(response);
  });

  it("Should be  able to clear an easy valid object", () => {
    const response = validate(complexObjectIncorrect, complexObject);
    assert(!response);
  });

  it("Should be  able to clear an easy valid object", () => {
    const response = validate(complexObjectIncorrect, complexObject);
    assert(!response);
  });

  it("Should be  able to clear an easy valid object", () => {
    const response = validate(complexObjectCorrectArray, complexObjectArray);
    assert(response);
  });

  it("Should be  able to clear an easy valid object", () => {
    const response = validate(complexObjectIncorrectArray, complexObjectArray);
    assert(!response);
  });

  it("Should be  able to clear an easy valid object", () => {
    const response = validate(optionalObjectIncorrect, optionalObject);
    assert(!response);
  });

  it("Should be  able to clear an easy valid object", () => {
    const response = validate(optionalObjectCorrect, optionalObject);
    //    console.log(ErrorMessage());

    //console.log(response);
    assert(response);
  });
});
