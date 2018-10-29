const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const passport = require("passport");

router.post("/register", userControllers.signUp);
router.post("/login", userControllers.login);
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userControllers.getCurrent
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  userControllers.deleteUser
);
router.post(
  "/follow/:userToFollowId",
  passport.authenticate("jwt", { session: false }),
  userControllers.follow
);
router.post(
  "/unfollow/:userToUnfollowId",
  passport.authenticate("jwt", { session: false }),
  userControllers.unfollow
);
module.exports = router;
