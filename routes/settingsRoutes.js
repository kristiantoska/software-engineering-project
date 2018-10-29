const express = require("express");
const router = express.Router();
const settingsControllers = require("../controllers/settingsControllers");
const passport = require("passport");
router.post(
  "/changePassword",
  passport.authenticate("jwt", { session: false }),
  settingsControllers.changePassword
);

module.exports = router;
