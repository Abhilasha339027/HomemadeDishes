const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  phone: { type: String, required: true },
  fullName: { type: String, required: true },
  emailOfBuyer: { type: String, required: true },
  chef: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      quantity: { type: Number, default: 1, required: true },
      item: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
    },
  ],
  deliveryDate: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true },
  streetAddress: { type: String, required: true },
  createdAt: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
