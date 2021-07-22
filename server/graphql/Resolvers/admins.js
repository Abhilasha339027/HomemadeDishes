const { UserInputError, ForbiddenError } = require("apollo-server");
const User = require("../../models/User");
const checkAuth = require("../../utils/checkAuth");
const {
  validateRegisterInput,
} = require("../../utils/Validators/validateRegisterInput");

module.exports = {
  Mutation: {
    async addAdmin(_, { addAdminInput: { ...args } }, context, info) {
      const username = checkAuth(context);
      if (username.role === "admin") {
        const { errors, isValid } = validateRegisterInput({ ...args });

        if (!isValid) {
          throw new UserInputError("Errors in input", errors);
        }

        const newAdmin = new User({
          ...args,
        });
        return newAdmin;
      } else {
        throw new ForbiddenError("You are not authorized to add admins");
      }
    },
  },
};
