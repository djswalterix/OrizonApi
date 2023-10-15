const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    ProductID: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Order", OrderSchema);
