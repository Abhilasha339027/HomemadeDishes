const applyForChef = require("./chefApplication");
const usersResolvers = require("./users");
const ordersResolvers = require("./orders");
const foodsResolvers = require("./foods");
const updateProfileResolvers = require("./updateProfile");
const chefsResolvers = require("./chefs");
const adminsResolvers = require("./admins");
const miscResolvers = require("./misc");
const paymentResolvers = require("./payments");
const Mailing = require("./Mailing");

module.exports = {
  Query: {
    ...ordersResolvers.Query,
    ...usersResolvers.Query,
    ...chefsResolvers.Query,
    ...foodsResolvers.Query,
    ...miscResolvers.Query,
    ...paymentResolvers.Query,
  },

  Mutation: {
    ...adminsResolvers.Mutation,
    ...ordersResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...applyForChef.Mutation,
    ...foodsResolvers.Mutation,
    ...updateProfileResolvers.Mutation,
    ...chefsResolvers.Mutation,
    ...paymentResolvers.Mutation,
    ...miscResolvers.Mutation,
    ...Mailing.Mutation,
  },
};
