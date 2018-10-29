const validateReview = require("../validation/reviewValidation");
const Review = require("../models/Review");
//@route POST /api/review
//@access PRIVATE
//@desc add a review
exports.addReview = (req, res) => {
  const { errors, isValid } = validateReview(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //check if the user has made a review for this move
  //then post the review
  Review.find({
    user: req.user.id,
    movieName: req.body.movieName
  }).then(review => {
    console.log(review);

    if (review.length !== 0) {
      errors.reviewExists = "You have already made a review for this movie";
      return res.status(400).json(errors);
    }
    const newReview = new Review({
      user: req.user.id,
      movieName: req.body.movieName,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    newReview
      .save()
      .then(review => res.send(review))
      .catch(err => {
        console.log(err);

        errors.errorReview = "Something went wrong";
        return res.status(400).json(errors);
      });
  });
};

//@route GET /api/review/:movieName
//@access PRIVATE
//@desc get all reviews made for a movie
exports.getReviewsByMovieName = (req, res) => {
  const errors = {};
  Review.find({ movieName: req.params.movieName })
    .populate("user", ["name", "followers"])
    .then(reviews => {
      console.log(reviews);

      if (reviews.length === 0) {
        errors.noreviews = "There are no reviews";
        return res.status(404).json(errors);
      }
      res.send(reviews);
    })
    .catch(err => res.status(404).json({ reviews: "There are no reviews" }));
};
//@route GET /api/review/rating/:movieName
//@access PUBLIC
//@desc get movie rating
exports.getMovieRating = (req, res) => {
  const errors = {};
  Review.find({ movieName: req.params.movieName }).then(reviews => {
    const ratings = reviews.map(review => review.rating);
    if (ratings.length === 0) {
      errors.norating = "N/A";
      return res.status(404).json(errors);
    }
    const sum = ratings.reduce((a, b) => a + b, 0.0);

    res.send({ rating: (sum / ratings.length).toFixed(1) });
  });
};

//@route GET /api/review/feed
//@access Private
//@desc get  10 newest reviews
exports.getFeed = (req, res) => {
  //check for reviews made by following users

  if (req.user.following.length === 0) {
    Review.find()
      .sort({ date: -1 })
      .limit(10)
      .populate("user", ["name", "followers"])
      .then(reviews => res.send(reviews))
      .catch(err => console.log(err));
  } else {
    Review.find({ user: { $in: req.user.following } })
      .sort({ date: -1 })
      .limit(20)
      .populate("user", ["name", "followers"])
      .then(review => res.send(review))
      .catch(err => console.log(err));
  }
};

//@route GET /api/review/user/:movieName
//@desc get review that user made for film
//@access Private
exports.getUserReview = (req, res) => {
  const errors = {};
  Review.find({
    user: req.user.id,
    movieName: req.params.movieName
  })
    .then(review => {
      console.log(review);

      if (review.length) {
        return res.json(review);
      }
      errors.noreview = "You havent made a review for this movie";
      return res.status(404).json(errors);
    })
    .catch(err => {
      console.log(err);
    });
};

//@route POST /api/review/upvote/:reviewId
//@desc vote for a review
//@access Private
exports.voteReview = (req, res) => {
  const errors = {};
  Review.findById(req.params.reviewId)
    .then(review => {
      if (!review) {
        errors.reviewNotFound = "Review was not found ";
        return res.status(404).json(errors);
      }
      review.votes++;
      review.voted.from.unshift(req.user.id);
      review
        .save()
        .then(review => res.send(review))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

//@route GET /api/review/upvote/:movieName
//@desc get 3 most upvoted reviews
//@access Public
exports.getMostVotedReviews = (req, res) => {
  const errors = {};
  Review.find({ movieName: req.params.movieName })
    .sort({ votes: -1 })
    .limit(3)
    .then(reviews => {
      if (reviews.length <= 2) {
        errors.reviews = "Low reviews number";
        return res.status(404).json(errors);
      }
      res.send(reviews);
    });
};
