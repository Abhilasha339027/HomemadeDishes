const {
  UserInputError,
  ApolloError,
  ForbiddenError,
} = require("apollo-server");
const User = require("../../models/User");
const checkAuth = require("../../utils/checkAuth");
const Food = require("../../models/Food");
const {
  validateAddChefInput,
} = require("../../utils/Validators/validateAddChefInput");
// const { calculateDistance } = require("../../utils/calculateDistance");
// const jsonFile = require("../../utils/csvjson.json");
const { distance } = require("zipcodes");
const { scheduleJob } = require("node-schedule");
// const { performance, PerformanceObserver } = require("perf_hooks");
// performance

// const distanceNew = distance("10032", "10040");
// console.log(distanceNew);

module.exports = {
  Query: {
    async getChef(_, __, ctx) {
      const username = checkAuth(ctx);
      if (username.role === "chef") {
        const user = await await User.findById(username.id)
          .select("+email +stripe_id")
          .populate("foodItems");

        const stripeConnected = user.stripe_id ? true : false;

        if (user) {
          return { id: user._id, ...user._doc, stripeConnected };
        } else {
          throw new ApolloError("Invalid credentials", {
            errors: { account: "Invalid Credentials" },
          });
        }
      }
    },

    async getAllChefs(_, __, ctx, ___) {
      const username = checkAuth(ctx);
      if (username.role === "admin") {
        const usersArray = await User.find({ role: "chef" })
          .select("+email")
          .populate("foodItems")
          .populate("chef");
        return usersArray;
      } else {
        throw new UserInputError("Error: You are not authorized...", {
          error: { auth: "Authentication Error" },
        });
      }
    },

    async getChefsByAreaCode(_, { zipCode }) {
      zipCode = parseInt(zipCode);
      let list = [
        -8,
        -9,
        -7,
        -6,
        -5,
        -4,
        -3,
        -2,
        -1,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ].map((elem) => (zipCode + elem).toString());

      const verifiedList = [];
      list.forEach((code) => {
        if (code !== zipCode && distance(zipCode, code) < 2)
          verifiedList.push(code);
        else if (code === zipCode) zipCode.push(code);
      });

      // console.log(verifiedList);
      // const codes = jsonFile.filter((code) => {
      //   if (code.zip === zipCode) {
      //     original = code;
      //   }

      //   return list.includes(code.zip.toString());
      // });

      // let distance = codes.map((code) => {
      //   let distances = calculateDistance(
      //     code.latitude,
      //     code.longitude,
      //     original.latitude,
      //     original.longitude
      //   );

      //   if (distances <= 1) {
      //     verifiedList.push(code.zip);
      //   }
      //   return distances;
      // });

      // function iterateThroughRes(res) {
      //   //

      //   verifiedList.push(
      //     ...res.map((dat) => {
      //       calculateDistance(
      //         dat.latitude,
      //         dat.longitude,
      //         original.data.latitude,
      //         original.data.longitude
      //       );
      //     })
      //   );
      // }

      // const askedZip = results.filter(
      //   (code) => code.zip === zipCode.toString()
      // );
      // const verifiedList = results.filter((code)=>);

      let allChefs = await User.find({
        role: "chef",
        isAvailable: true,
        zipCode: { $in: verifiedList },
      }).populate("foodItems");
      // const chef = allChefs.map((singleChef)=>{
      //   if (singleChef) {
      //     let distance = calculateDistance()
      //   }
      // })

      // allChefs
      //   .map((singleChef) =>
      //     singleChef.sort((a, b) => (a.orders <= b.orders ? 1 : -1))
      //   )
      // let filteredChefs = allChefs.sort((a, b) =>
      //   a.orders <= b.orders ? 1 : -1
      // );
      return allChefs;
    },

    async advancedSearch(
      _,
      { deliveryDays, diet, zipCode, cuisine, deliveryOption }
    ) {
      let regexArrDiet = [];
      let regexArrDeliveryDay = [];
      zipCode = parseInt(zipCode);
      let list = [
        -8,
        -9,
        -7,
        -6,
        -5,
        -4,
        -3,
        -2,
        -1,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ].map((elem) => (zipCode + elem).toString());

      const verifiedList = [];
      list.forEach((code) => {
        if (code !== zipCode && distance(zipCode, code) < 2)
          verifiedList.push(code);
        else if (code === zipCode) zipCode.push(code);
      });

      // let list = [-3, -2, -1, 0, 1, 2, 3].map((elem) =>
      //   (zipCode + elem).toString()
      // );

      // // console.log(deliveryDays, diet, deliveryOption);

      // const verifiedList = [];
      // let original = {};

      // const codes = jsonFile.filter((code) => {
      //   if (code.zip === zipCode) {
      //     original = code;
      //   }

      //   return list.includes(code.zip.toString());
      // });

      // let distance = codes.map((code) => {
      //   let distances = calculateDistance(
      //     code.latitude,
      //     code.longitude,
      //     original.latitude,
      //     original.longitude
      //   );

      //   if (distances <= 1) {
      //     verifiedList.push(code.zip);
      //   }
      //   return distances;
      // });

      diet.forEach((item) => {
        let re = new RegExp(item, "i");
        regexArrDiet.push(re);
      });

      deliveryDays.forEach((item) => {
        let re = new RegExp(item, "i");
        regexArrDeliveryDay.push(re);
      });

      let chefs;
      chefs = await User.find({
        zipCode: { $in: verifiedList },
        role: "chef",
        isAvailable: true,
        ...(cuisine && { cuisine }),
        // $and: [
        //   { dietary: { $in: regexArrDiet } },
        //   { deliveryDays: { $in: regexArrDeliveryDay } },
        //   { deliveryOption },
        // ],
      })
        .or([
          { dietary: { $in: regexArrDiet } },
          { deliveryDays: { $in: regexArrDeliveryDay } },
          { deliveryOption },
        ])
        .or([{ deliveryOption }, { deliveryOption: "both" }])
        .populate("foodItems");

      return chefs;
    },

    async getBySearch(_, { option, zip }) {
      let zipCode = parseInt(zip);

      // let list = [-3, -2, -1, 0, 1, 2, 3].map((elem) =>
      //   (zip + elem).toString()
      // );

      // const verifiedList = [];
      // let original = {};
      let list = [
        -8,
        -9,
        -7,
        -6,
        -5,
        -4,
        -3,
        -2,
        -1,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ].map((elem) => (zipCode + elem).toString());

      const verifiedList = [];
      list.forEach((code) => {
        if (code !== zipCode && distance(zipCode, code) < 2)
          verifiedList.push(code);
        else if (code === zipCode) zipCode.push(code);
      });

      // const codes = jsonFile.filter((code) => {
      //   if (code.zip === zip) {
      //     original = code;
      //   }

      //   return list.includes(code.zip.toString());
      // });

      // let distance = codes.map((code) => {
      //   let distances = calculateDistance(
      //     code.latitude,
      //     code.longitude,
      //     original.latitude,
      //     original.longitude
      //   );

      //   if (distances <= 1) {
      //     verifiedList.push(code.zip);
      //   }
      //   return distances;
      // });

      let chefs = await User.find({
        role: "chef",
        isAvailable: true,
        zip: { $in: verifiedList },
      })
        .or([
          { firstName: { $regex: option.trim(), $options: "i" } },
          { lastName: { $regex: option.trim(), $options: "i" } },
          { description: { $regex: option.trim(), $options: "i" } },
        ])
        .populate("footItems");

      let dishes = await Food.find()
        .or([
          { name: { $regex: option.trim(), $options: "i" } },
          { description: { $regex: option.trim(), $options: "i" } },
        ])
        .populate("chef");

      return { chefs, dishes };
    },

    async getChefByCuisine(_, { cuisine, zipCode }) {
      zipCode = parseInt(zipCode);

      let list = [
        -8,
        -9,
        -7,
        -6,
        -5,
        -4,
        -3,
        -2,
        -1,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ].map((elem) => (zipCode + elem).toString());

      const verifiedList = [];
      list.forEach((code) => {
        if (code !== zipCode && distance(zipCode, code) < 2)
          verifiedList.push(code);
        else if (code === zipCode) zipCode.push(code);
      });

      // let list = [-3, -2, -1, 0, 1, 2, 3].map((elem) =>
      //   (zipCode + elem).toString()
      // );

      // const verifiedList = [];
      // let original = {};

      // const codes = jsonFile.filter((code) => {
      //   if (code.zip === zipCode) {
      //     original = code;
      //   }

      //   return list.includes(code.zip.toString());
      // });

      // let distance = codes.map((code) => {
      //   let distances = calculateDistance(
      //     code.latitude,
      //     code.longitude,
      //     original.latitude,
      //     original.longitude
      //   );

      //   if (distances <= 1) {
      //     verifiedList.push(code.zip);
      //   }
      //   return distances;
      // });

      if (cuisine === "All") {
        let chef = await User.find({
          role: "chef",
          zipCode: { $in: verifiedList },

          isAvailable: true,
        })
          .populate("foodItems")
          .populate("chef");
        if (chef) {
          return chef;
        } else return [];
      } else {
        let chef = await User.find({
          role: "chef",
          // cuisine: { $regex: `^cuisine`, $options: "i" },
          cuisine: { $regex: cuisine.trim(), $options: "i" },
          zipCode: { $in: verifiedList },

          isAvailable: true,
        })
          .populate("foodItems")
          .populate("chef");
        if (chef) {
          return chef;
        } else return [];
      }
    },
  },

  Mutation: {
    addChefInfo: async (_, { addChefInfoInput: { ...info } }, ctx) => {
      const user = checkAuth(ctx);
      const { errors, isValid } = validateAddChefInput({ ...info });

      const chef = await User.findOneAndUpdate(
        { _id: user.id, role: "chef" },
        { $set: { ...info } }
      )
        .select("+email")
        .populate("foodItems");

      const dates = info.deliveryDays;
      dates.forEach((date) => {
        let dateFormatted = new Date(date);
        let today = new Date();
        if (dateFormatted < today) {
          let dayIndex = chef.deliveryDays.indexOf(date);
          chef.deliveryDays.splice(dayIndex, 1);
          chef.save();
        } else {
          const job = scheduleJob(dateFormatted, () => {
            let dayIndex = chef.deliveryDays.indexOf(date);
            chef.deliveryDays.splice(dayIndex, 1);
            chef.save();
          });
        }
      });
      // let dates = info.deli
      // let datesAvailable = Date.parse()
      // let chef = {
      //   id:
      //   firstName: "firstName",
      //   lastName: "lastName",
      //   email: "email",
      //   password: "password",
      //   confirmPassword: "confirmPassword",
      //   phone: "phone",
      //   isAvailable: "isAvailable",
      //   handle: "handle",
      //   avatar: "avatar",
      //   placeId: "placeId",
      //   dietary: "dietary",
      //   deliveryDays: "deliveryDays",
      //   cuisine: "cuisine",
      //   address: "address",
      //   zipCode: "zipCode",
      //   bio: "bio",
      //   description: "description",
      // };
      return chef;
    },

    chefApplicationComplete: async (_, __, ctx) => {
      const username = checkAuth(ctx);

      const user = await User.findByIdAndUpdate(username.id, {
        $set: { isApplicationDone: true },
      });

      user.save();
    },

    verifyChef: async (_, { id }, ctx) => {
      const username = checkAuth(ctx);
      if (username.role === "admin") {
        const user = await User.findByIdAndUpdate(id, {
          $set: { isVerified: true },
        })
          .select("+email")
          .populate("foodItems");

        return user;
      } else throw new ForbiddenError("Not Allowed");
    },

    async addReview(_, { reviewInput: { id, text, rating } }, ctx) {
      if (rating > 5 || rating < 0) {
        throw new ApolloError(
          "You trying to break my security?, Incident reported"
        );
      }

      const username = checkAuth(ctx);
      let getChef = await User.findOne({ role: "chef", foodItems: id });

      getChef.reviews.push({ user: username.id, text, rating });
      getChef = await getChef.save();
      if (getChef) {
        return "Done";
      } else {
        return "Something Went Wrong";
      }
    },

    async deleteChef(_, { id }, ctx, info) {
      const username = checkAuth(ctx);
      if (username.role === "admin") {
        let chef;
        try {
          chef = await User.findByIdAndDelete(id);
          if (chef) chef = await chef.save();
          else throw new ApolloError("Could not find anything");
        } catch (error) {
          throw new ApolloError("Failed to fetch Data");
        }
        return null;
      } else throw new ForbiddenError("You are not allowed to do that");
    },
  },
};
