const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("user", userModel);

module.exports = User;
