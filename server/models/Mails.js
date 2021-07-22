const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MailsSchema = new Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

module.exports = mongoose.model("Mails", MailsSchema);
