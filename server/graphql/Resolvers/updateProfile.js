const { UserInputError } = require("apollo-server");
const User = require("../../models/User");
const checkAuth = require("../../utils/checkAuth");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");

module.exports = {
  Mutation: {
    addProfileImage: async (_, { avatar }, context, info) => {
      const username = checkAuth(context);
      let user = await User.findOneAndUpdate(
        { _id: username.id },
        { $set: { avatar } },
        { new: true }
      );
      user = await user.save();
      return user;
    },
  },
};
