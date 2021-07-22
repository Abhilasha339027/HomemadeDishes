const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  chef: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  price: { type: Number, required: true },
  image: { type: String },
  ingredients: [{ type: String, required: true }],
  orders: { type: Number, required: true, default: 0 },
  allergyWarning: { type: String },
  price: { type: Number, required: true },
  serving: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
  tags: { type: [String] },
});

module.exports = mongoose.model("Food", foodSchema);
