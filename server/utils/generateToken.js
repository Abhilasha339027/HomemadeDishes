const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },

    SECRET_KEY,
    { expiresIn: "1d" }
  );
};
