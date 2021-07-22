const { ApolloError } = require("apollo-server");
const Misc = require("../../models/Misc");
const User = require("../../models/User");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    getMisc: async (_, __, context) => {
      const miscValues = await Misc.findOne();

      if (miscValues) {
        return miscValues;
      } else {
        throw new ApolloError("Could not find anything", {
          errors: { error: "Could not find anything" },
        });
      }
    },

    getChefSettings: async (_, __, context) => {
      const username = checkAuth(context);

      if (username.role === "chef") {
        const chef = await User.findById(username.id);
        if (chef) {
          return chef;
        } else {
          throw new ApolloError("Something Went Wrong", {
            errors: { unknownError: "Something Went Wront" },
          });
        }
      } else {
        throw new ApolloError("Something Went Wrong", {
          errors: { unknownError: "Something Went Wront" },
        });
      }
    },
  },

  Mutation: {
    addMisc: async (_, { miscInput: values }, context) => {
      const username = checkAuth(context);
      if (username.role === "admin") {
        let miscValues = await Misc.findOne();
        if (miscValues) {
          const miscValues = await Misc.findOneAndUpdate(
            {},
            { ...values },
            { new: true }
          );

          return miscValues;
        } else {
          throw new ApolloError("You are not authorized for this action", {
            errors: { auth: "You are not authorized for this action" },
          });
        }
      } else {
        const miscValues = await new Misc(values);
        await miscValues.save();
        return miscValues;
      }
    },

    addFeaturedDish: async (_, { image, headline, index }, context) => {
      const username = checkAuth(context);
      if (username.role === "admin" && index >= 0 && index < 3) {
        try {
          let misc = await Misc.findOneAndUpdate(
            // { featuredDishes: `featuredDishes.${index}` }
            {},
            { $set: { [`featuredDishes.${index}`]: { image, headline } } },
            { new: true }
            // { $set: { image, headline } }
          );
          // misc.featuredDishes[index].image = image;
          // misc.featuredDishes[index].headline = headline;
          misc = await misc.save();
          return misc;
        } catch (err) {
          throw new ApolloError("Error", { errors: { err } });
        }
      } else {
        throw new ApolloError("Only three items are allowed", {
          errors: { index: "Only three items are allowed" },
        });
      }
    },

    changeChefSettings: async (_, { ...options }, context) => {
      const username = checkAuth(context);

      if (username.role === "chef") {
        let chef = await User.findById(username.id);

        if (chef) {
          chef.deliveryOption = options.deliveryOption;
          chef.deliveryFee = options.deliveryFee;
          chef.pickupFee = options.pickupFee;

          chef = await chef.save();
          return chef;
        } else {
          throw new ApolloError("Something Went Wrong", {
            errors: { unknownError: "Something Went Wrong" },
          });
        }
      } else {
        throw new ApolloError("Something Went Wrong", {
          errors: { unknownError: "Something Went Wrong" },
        });
      }
    },
  },
};
