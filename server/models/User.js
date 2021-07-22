const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    select: false,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  handle: {
    type: String,
    required: true,
  },

  deliveryOption: { type: String },
  deliveryFee: { type: Number },
  pickupFee: { type: Number },

  reviews: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],

  deliveryDays: [{ type: String }],

  bio: { type: String },
  orders: { type: Number, default: 0 },
  placeId: { type: String, select: true },

  refferalLink: {
    type: String,
  },

  createdAt: {
    type: String,
    required: true,
  },

  cuisine: {
    type: [{ type: String }],
  },

  tags: {
    type: [String],
  },

  phone: { type: String },

  avatar: {
    type: String,
  },

  dietary: [{ type: String, required: true }],

  isApplicationDone: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  foodCertificate: { type: String },

  zipCode: { type: String },
  role: { type: String, required: true },

  foodItems: [{ type: Schema.Types.ObjectId, ref: "Food" }],

  isAvailable: { type: Boolean, default: false },

  stripe_id: { type: String, select: false },

  addresses: [
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      streetAddress: { type: String, required: true },
      addressLine2: { type: String },
      deliveryNotes: { type: String },
      createdAt: { type: String },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
