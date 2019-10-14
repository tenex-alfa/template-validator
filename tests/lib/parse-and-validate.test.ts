import { validate } from "../../src/index";

validate({ test: 4 }, { test: [1, 2, { name: "Number" }] });
