const generateToken = require("./generateToken");
const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

module.exports = (password, user, errors = {}) => {
  return bcrypt.compare(password, user.password).then((isMatch) => {
    if (!isMatch) {
      errors.account = "Wrong credentials";
      throw new UserInputError("Wrong credentials", {
        errors: {
          account: "Wrong credentials",
        },
      });
    }
    return generateToken(user);
  });
};
