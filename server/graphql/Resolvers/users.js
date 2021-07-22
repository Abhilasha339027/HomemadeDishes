const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server");
const User = require("../../models/User");
const {
  validateRegisterInput,
} = require("../../utils/Validators/validateRegisterInput");
const {
  validateLoginInput,
} = require("../../utils/Validators/validateLoginInput");
const {
  validateUpdateProfileInput,
} = require("../../utils/Validators/validateUpdateProfileInput");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const checkAuth = require("../../utils/checkAuth");
const generateToken = require("../../utils/generateToken");
const { JWT, OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const { GMAIL_OAUTH_URL, SECRET_KEY } = require("../../config");
const {
  validateApplyChefInput,
} = require("../../utils/Validators/validateApplyChefInput");
const comparePassword = require("../../utils/comparePassword");

const client = new OAuth2Client(GMAIL_OAUTH_URL);

module.exports = {
  Query: {
    async getUser(_, __, context) {
      const username = checkAuth(context);
      const user = await User.findById(username.id).select("+email");
      // let user = {
      //   id: "alskdnoqwi",
      //   firstName: "lansdpqiw",
      //   lastName: "lasndoqwin",
      //   email: "shahzaib@gmail.com",
      //   phone: "alskndoli",
      //   handle: "shahzaib1",
      //   role: "chef",
      //   bio: "Reallyy Long Bio",
      //   avatar: "lasdoinlkn",
      // };
      if (user) {
        const dates = user.deliveryDays;
        let availability = dates.map((date) => {
          let dateFormatted = new Date(date);
        });
        console.log(availability);
        return user;
      } else {
        throw new ApolloError("Invalid credentials", {
          errors: { account: "Invalid Credentials" },
        });
      }
    },
  },

  Mutation: {
    async login(_, { email, password }, context, info) {
      let { errors, isValid } = validateLoginInput(email, password);
      if (!isValid) {
        throw new UserInputError("Errors in input", { errors });
      }

      let user = await User.findOne({ email }).select("+email +password");
      if (!user) {
        throw new UserInputError("Wrong Credentials", {
          errors: { account: "Wrong Credentials" },
        });
      }

      const token = await comparePassword(password, user, errors);

      delete user.password;

      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },

    googleLogin: async (_, { tokenId }) => {
      let res = await client.verifyIdToken({
        idToken: tokenId,
        audience:
          "237554737750-autq8gujbqu3v09uigeh3ci4jr07t8n9.apps.googleusercontent.com",
      });
      try {
        const {
          email,
          email_verified,
          given_name: firstName,
          family_name: lastName,
          picture,
        } = res.payload;
        if (email_verified) {
          const user = await User.findOne({ email }).select("+email +password");

          if (user) {
            const token = await comparePassword(
              `${firstName}${lastName}${email}${SECRET_KEY}`,
              user
            );
            return {
              ...user._doc,
              id: user.id,
              token,
            };
          } else {
            const password = await bcrypt.hash(
              `${firstName}${lastName}${email}${SECRET_KEY}`,
              8
            );

            const newUser = new User({
              firstName,
              lastName,
              handle: firstName,
              email,
              password,
              avatar: picture,
              role: "user",
              createdAt: new Date().toISOString(),
            });

            const res = await newUser.save();
            const token = generateToken(newUser);
            return {
              ...res._doc,
              id: res.id,
              token,
            };
          }
        }
      } catch (error) {
        throw new ApolloError("Something Went Wrong", {
          errors: { account: "Something Went Wrong" },
        });
      }
    },

    facebookLogin: async (_, { userID, accessToken }) => {
      let facebookGraph = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,first_name,last_name,picture&access_token=${accessToken}`;
      try {
        let res = await fetch(facebookGraph, { method: "GET" });

        const {
          name,
          email,
          first_name: firstName,
          last_name: lastName,
          picture,
        } = await res.json();

        const user = await User.findOne({ email }).select("+email +password");
        if (user) {
          const token = await comparePassword(
            `${firstName}${lastName}${email}${SECRET_KEY}`,
            user
          );

          return {
            ...user._doc,
            id: user.id,
            token,
          };
        } else {
          const password = await bcrypt.hash(
            `${firstName}${lastName}${email}${SECRET_KEY}`,
            8
          );

          const newUser = new User({
            firstName,
            lastName,
            password,
            handle: firstName,
            email,
            role: "user",
            createdAt: new Date().toISOString(),
          });

          const res = await newUser.save();
          const token = generateToken(newUser);
          return {
            ...res._doc,
            id: res.id,
            token,
          };
        }
      } catch (error) {
        throw new ApolloError("Something Went Wrong", {
          errors: { account: "Something Went Wrong" },
        });
      }
    },

    async register(
      _,
      {
        registerInput: {
          firstName,
          lastName,
          handle,
          email,
          password,
          confirmPassword,
        },
      }
    ) {
      // Validate User Data
      let { isValid, errors } = validateRegisterInput(
        firstName,
        lastName,
        handle,
        email,
        password,
        confirmPassword
      );

      if (!isValid) {
        throw new UserInputError("Errors in input", { errors });
      }

      // Make sure the user doesn't already exist
      let checkMail = await User.findOne({ email }).select("+password +email ");

      if (checkMail) {
        throw new UserInputError("This Email is already registered", {
          errors: { account: "This Email is already registered" },
        });
      }

      password = await bcrypt.hash(password, 8);

      const newUser = new User({
        firstName,
        lastName,
        handle,
        email,
        password,
        role: "user",
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },

    async addAddress(
      _,
      {
        addressInput: {
          name,
          phone,
          streetAddress,
          addressLine2,
          deliveryNotes,
        },
      },
      context,
      info
    ) {
      const username = checkAuth(context);
      let user = await User.findOne({ email: username.email });

      if (user) {
        user.addresses.push({
          name,
          phone,
          streetAddress,
          addressLine2,
          deliveryNotes,
          createdAt: new Date().toISOString(),
        });
        await user.save();
        return user;
      }
    },

    updateProfile: async (
      _,
      { profileInput: { firstName, lastName, email } },
      context
    ) => {
      const username = checkAuth(context);

      const { errors, isValid } = validateUpdateProfileInput(
        firstName,
        lastName,
        email
      );

      if (!isValid) {
        throw new UserInputError("Errors in input", { errors });
      }
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        let updateProfile = await User.findOneAndUpdate(
          { email: username.email },
          { firstName, lastName, email }
        );

        updateProfile = await updateProfile.save();
        return updateProfile;
      } else if (checkUser) {
        let updateProfile = await User.findOneAndUpdate(
          {
            email: username.email,
          },
          { firstName, lastName, email }
        );

        updateProfile = await updateProfile.save();
        return updateProfile;
      }
    },
  },
};
