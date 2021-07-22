const Order = require("../../models/Order");
const checkAuth = require("../../utils/checkAuth");
const User = require("../../models/User");
const mailTransporter = require("../../utils/mailTransporter");
const Food = require("../../models/Food");
const Stripe = require("stripe");
const { ApolloError, UserInputError } = require("apollo-server");
const {
  validateOrderInput,
} = require("../../utils/Validators/validateOrderInput");
const { STRIPE_KEY } = require("../../config");
const stripe = new Stripe(STRIPE_KEY);

const createEmail = (username, dish, totalPrice, order) => {
  let email = `Hi, You have a new order.
  <h3>Details</h3>
  <p>User Name: ${username.firstName} ${username.lastName}</p>
  <p>Email: ${username.email}</p>
  <p>Phone: ${order.phone}</p>
  <p>Delivery Address: ${order.streetAddress}</p>
  <p>Delivery Date: ${order.deliveryDate}</p>
  <p>Delivery Instructions: ${order.deliveryInstructions}</p>

  Items: ${dish.items.map((item) => {
    return `
    <p><strong>Name:</strong> ${item.name} <strong>quantity:</strong> 
    ${item.quantity} <strong>price:</strong> ${item.price}</p>)`;
  })}
  <p>
  Total Price: ${totalPrice}</p>
  `;

  return email;
};

module.exports = {
  Query: {
    async getOrders(_, __, context, info) {
      const username = checkAuth(context);
      const order = await Order.find({ user: username.id })
        .populate("user")
        .populate("chef")
        .populate("items.item");
      if (order) {
        console.log(order);
        return order;
      }
      throw new ApolloError("No Orders Found", { error: "No Orders Found" });
    },

    async getOrdersChef(_, __, context, info) {
      const username = checkAuth(context);
      const order = await Order.find({ chef: username.id })
        .populate("user")
        .populate("chef")
        .populate("items.item");
      if (order) {
        return order;
      }
      throw new ApolloError("No Orders Found", { error: "No Orders Found" });
    },

    getAllMyOrdersChef: async (_, __, context) => {
      const username = checkAuth(context);
      if (username.role === "chef") {
        const orders = await Order.find({ chef: username.id })
          .populate("chef")
          .populate("items.item");
        return orders;
      } else {
        throw new ApolloError("You are not Authorized", {
          errors: { auth: "You are not Authorized" },
        });
      }
    },
  },

  Mutation: {
    addOrder: async (_, { orderInput: { ...order } }, context, info) => {
      const username = checkAuth(context);
      const { errors, isValid } = validateOrderInput(order);

      if (!isValid) {
        throw new UserInputError("Errors in Input", { errors });
      }

      // temp variables
      let pricePerItem = [];
      let dishes = {};
      dishes.items = [];
      let chefsArray = [];
      let status = "Processing";

      // Iterating over each dish item
      for (let index = 0; index < order.items.length; index++) {
        // Get Dish items by id
        let dish = await Food.findById(order.items[index].foodId);
        dish.orders += order.items[index].quantity;
        dish.save();

        // storing the results in dishes object
        dishes.items.push(dish);
        dishes.items[index].foodId = dish.id;

        // Get chef by chef id
        let chef = await User.findById(dish.chef).select("+email +stripe_id");
        chef.orders += 1;

        chefsArray.push(chef);
        pricePerItem.push(
          dishes.items[index].price * order.items[index].quantity
        );
        dishes.items[index].quantity = order.items[index].quantity;
        await chef.save();
      }

      let totalPrice = pricePerItem.reduce((a, b) => a + b, 0);
      totalPrice = parseFloat(totalPrice.toFixed(2));

      let newOrder = new Order({
        items: dishes.items.map((item) => ({
          item: item.id,
          quantity: item.quantity,
        })),
        deliveryOption: order.deliveryOption,
        status,
        deliveryDate: order.deliveryDate,
        streetAddress: order.streetAddress,
        user: username.id,
        chef: chefsArray[0].id,
        phone: order.phone,
        emailOfBuyer: username.email,
        createdAt: new Date().toISOString(),
        fullName: `${username.firstName} ${username.lastName}`,
        totalPrice: totalPrice,
      });

      newOrder = await newOrder.save();

      // mailTransporter.sendMail(
      //   chefsArray[0],
      //   createEmail(username, dishes, totalPrice, order)
      // );

      try {
        const client_secret = await stripe.paymentIntents.create({
          payment_method_types: ["card"],
          amount: parseInt((totalPrice * 100).toFixed()),
          currency: "usd",
          // payment_method: order.id,
          transfer_data: {
            // amount: totalPrice * 0.2 * 100,
            destination: chefsArray[0].stripe_id,
          },
          application_fee_amount: parseInt((totalPrice * 0.2).toFixed()),
        });

        return client_secret.client_secret;
      } catch (error) {
        throw new ApolloError("Something Went Wrong", {
          error: { message: "Something went wrong, Or can not send payment" },
        });
      }
    },

    addMarkAsDelivering: async (_, { id }, context) => {
      const username = checkAuth(context);
      if (username.role === "chef") {
        const order = await Order.findOneAndUpdate(
          {
            _id: id,
            chef: username.id,
          },
          { $set: { status: "Delivering" } }
        )
          .populate("chef")
          .populate("items");
        if (order) {
          return order;
        } else {
          throw new ApolloError("No Item with that id", {
            errors: { noItem: "No Item with that id" },
          });
        }
      } else
        throw new ApolloError("Not Allowed", {
          errors: { auth: "Not Allowed" },
        });
    },

    addMarkAsDelivered: async (_, { id }, context) => {
      const username = checkAuth(context);
      if (username.role === "chef") {
        const order = await Order.findOneAndUpdate(
          {
            _id: id,
            chef: username.id,
          },
          { $set: { status: "Delivered" } }
        )
          .populate("chef")
          .populate("items");

        if (order) {
          return order;
        } else {
          throw new ApolloError("No Item with that id", {
            errors: { noItem: "No Item with that id" },
          });
        }
      } else
        throw new ApolloError("Not Allowed", {
          errors: { auth: "Not Allowed" },
        });
    },

    deleteOrder: async (_, { id }, context) => {
      const username = checkAuth(context);
      if (username.role === "chef") {
        const order = await Order.findOne({ _id: id }).populate("chef");

        if (!order) {
          throw new ApolloError("Something Went Wrong", {
            errors: { order: "Something Went Wrong" },
          });
        }
        if (order.chef._id !== username.id) {
          throw new ApolloError("You are not allowed", {
            errors: { order: "You are not allowed" },
          });
        }

        await Order.findOneAndDelete({ _id: id });
      }

      return "Done";
    },
  },
};
