const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const featuredDishLimit = (val) => val.length <= 3;

const miscSchema = new Schema({
  tax: { type: Number, required: true },
  serviceFee: { type: Number, required: true },
  featuredDishes: {
    type: Array,
    headline: { type: String, required: true },
    image: { type: String, required: true },
    default: [
      { headline: "none", image: "none" },
      { headline: "none", image: "none" },
      { headline: "none", image: "none" },
    ],

    validate: [featuredDishLimit, "{PATH} exceeds the limit of 3"],
  },
});

module.exports = mongoose.model("Misc", miscSchema);
