const { validateLoginInput } = require("./validateLoginInput");

// @ponicode
describe("validateLoginInput", () => {
  test("0", () => {
    validateLoginInput("TestUpperCase@Example.com", "1Ki77y");
  });

  test("1", () => {
    validateLoginInput("bed-free@tutanota.de", "!Lov3YummyMak3r");
  });

  test("2", () => {
    validateLoginInput("TestUpperCase@Example.com", "!Lov3YummyMak3r");
  });

  test("3", () => {
    validateLoginInput("yummymaker.com", "$yummymaker");
  });

  test("4", () => {
    validateLoginInput("something@example.com", "$p3onyycat");
  });

  test("5", () => {
    validateLoginInput("yummymaker.com", "1Ki77y");
  });

  test("6", () => {
    validateLoginInput("yummymaker.com", ".Matrix53");
  });

  test("7", () => {
    validateLoginInput("yummymaker.com", "!ush3r");
  });

  test("8", () => {
    validateLoginInput("", "");
  });
});
