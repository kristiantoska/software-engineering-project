const express = require("express");
const router = express.Router();
const passport = require("passport");
const reviewControllers = require("../controllers/reviewControllers");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  reviewControllers.addReview
);

router.get("/:movieName", reviewControllers.getReviewsByMovieName);
router.get("/rating/:movieName", reviewControllers.getMovieRating);
router.get(
  "/user/:movieName",
  passport.authenticate("jwt", { session: false }),
  reviewControllers.getUserReview
);
router.get(
  "/feed/news",
  passport.authenticate("jwt", { session: false }),
  reviewControllers.getFeed
);

router.post(
  "/upvote/:reviewId",
  passport.authenticate("jwt", { session: false }),
  reviewControllers.voteReview
);
router.get(
  "/upvote/:movieName",
  passport.authenticate("jwt", { session: false }),
  reviewControllers.getMostVotedReviews
);

module.exports = router;
