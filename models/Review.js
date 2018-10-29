const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  rating: {
    type: Number,
    required: true
  },
  movieName: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    max: 100
  },
  votes: {
    type: Number,
    default: 0
  },
  voted: {
    from: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
