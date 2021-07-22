const {
  UserInputError,
  ForbiddenError,
  ApolloError,
} = require("apollo-server");
const Food = require("../../models/Food");
const { findById } = require("../../models/User");
const User = require("../../models/User");
const checkAuth = require("../../utils/checkAuth");
const {
  validateFoodInput,
} = require("../../utils/Validators/validateFoodInput");

module.exports = {
  Query: {
    async getFoodItemById(_, { id }, context) {
      try {
        let foodItem = await Food.findOne({
          _id: id,
          isAvailable: true,
        }).populate("chef");
        return foodItem;
      } catch (err) {
        throw new ApolloError("Something Went Wrong", {
          error: { unKownError: "Something Went Wrong" },
        });
      }
    },

    async getFoodByChef(_, { chefId }, context) {
      let foodItems;
      foodItems = await Food.find({ chef: chefId, isAvailable: true }).populate(
        "chef"
      );

      if (foodItems) {
        return foodItems;
      } else {
        throw new ApolloError("Could not find anything");
      }
    },

    async getFoodByHandle(_, { handle }, context) {
      // foodItems = await Food.find({
      //   "chef.handle": handle,
      //    "chef.handle": { $regex: option.trim(), $options: "i" },
      //   isAvailable: true,
      // }).populate("chef");
      const chef = await User.findOne({
        handle: { $regex: handle.trim(), $options: "i" },
      }).populate({ path: "foodItems", populate: { path: "chef" } });

      if (chef && chef.foodItems) {
        const foodItems = chef.foodItems;
        console.log(foodItems);
        return foodItems;
      } else {
        throw new ApolloError("Could not find anything");
      }
    },

    async getAllFoodItems(_, __, context) {
      const username = checkAuth(context);
      if (username.role === "admin") {
        const foodItems = await Food.find().populate("chef");
        return foodItems;
      } else {
        throw new ApolloError("You are not authorized", {
          error: { auth: "You are not authorized" },
        });
      }
    },

    async getAllMyFoodItems(_, __, context) {
      const username = checkAuth(context);
      if (username.role === "chef" || username.role === "admin") {
        const foodItems = await Food.find({ chef: username.id }).populate(
          "chef"
        );

        return foodItems;
      }
    },
  },

  Mutation: {
    async addFoodItem(_, { foodItemInput: { ...args } }, context, info) {
      const user = checkAuth(context);
      const { errors, isValid } = validateFoodInput(user, args);

      if (!isValid) {
        throw new UserInputError("Errors in Input", { errors });
      }

      if (user.role === "chef") {
        const chefName = `${user.firstName} ${user.lastName}`;
        let foodItem = new Food({
          ...args,
          chef: user.id,
          chefName,
        });

        let food = await foodItem.save();
        let chef = await User.findById(food.chef);
        chef.foodItems.push(food.id);
        await chef.save();
        return { ...food._doc, chef: user.id, chefName, id: food._id };
      } else {
        throw new Error("You are not allowed to do that");
      }
    },

    async deleteFoodItem(_, { id }, context, info) {
      const username = checkAuth(context);

      // Check if user is Chef
      if (username.role === "chef") {
        let foodItem = await Food.findById(id);
        // Verify The foodItem belongs to the loggedIn user
        if (!foodItem) {
          throw new ApolloError("Could not find any dish with your id");
        }

        if (foodItem.chef == username.id) {
          foodItem = await Food.findByIdAndDelete(id);
          return null;
        } else {
          throw new ForbiddenError(
            "You are not Authorized to delete this food item",
            {
              errors: {
                auth: "You are not allowed to delete this item",
              },
            }
          );
        }
      }
      // If User is admin
      else if (username.role === "admin") {
        let foodItem = await Food.findByIdAndDelete(id);
        return foodItem;
      } else {
        throw new ForbiddenError("You are not authorized to do this", {
          errors: { authorization: "You are not allowed to delete this" },
        });
      }
    },

    changeAvailability: async (_, { id }, context) => {
      const username = checkAuth(context);
      if (username.role === "admin") {
        const foodItem = await Food.findById(id);
        if (foodItem) {
          const dish = await Food.findByIdAndUpdate(id, {
            $set: { isAvailable: !foodItem.isAvailable },
          });
          return dish;
        } else {
          throw new ApolloError("Something Went Wrong", {
            error: "Something Went Wrong!!!",
          });
        }
      }
    },

    async updateFoodItem(
      _,
      {
        updateFoodItemInput: {
          id,
          name,
          description,
          price,
          image,
          ingredients,
          allergyWarning,
          serving,
          categories,
          chefName,
          availableDay,
          isAvailable,
        },
      },
      context
    ) {
      const username = checkAuth(context);
      // Check if user is Chef
      if (username.role === "chef") {
        let foodItem = await Food.findById(id);
        // Verify The foodItem belongs to the loggedIn user
        if (foodItem.chef == username.id) {
          foodItem = await Food.findByIdAndUpdate(id, {
            name,
            description,
            price,
            image,
            ingredients,
            allergyWarning,
            serving,
            categories,
            chefName,
            availableDay,
            isAvailable,
          });
          return foodItem;
        } else {
          throw new ForbiddenError(
            "You are not Authorized to delete this food item",
            {
              errors: {
                authorization: "You are not allowed to delete this item",
              },
            }
          );
        }
      }
      // If User is admin
      else if (username.role === "admin") {
        let foodItem = await Food.findByIdAndUpdate(id, {
          name,
          description,
          price,
          image,
          ingredients,
          allergyWarning,
          serving,
          categories,
          chefName,
          availableDay,
          isAvailable,
        });
        return foodItem;
      } else {
        throw new ForbiddenError("You are not authorized to do this", {
          errors: { authorization: "You are not allowed to delete this" },
        });
      }
    },
  },
};
