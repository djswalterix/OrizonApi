const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
