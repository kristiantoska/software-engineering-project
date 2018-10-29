const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const validateLogin = require("../validation/loginValidation");
const validateRegister = require("../validation/registerValidation");

//@route POST /api/user/login
//@desc Login user
//@access Public
exports.login = (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          followers: user.followers,
          following: user.following
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

//@route POST /api/user/register
//@desc Register user
//@access Public
exports.signUp = (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

//@route GET /api/user/current
//@desc  get current user
//@access Private
exports.getCurrent = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    followers: req.user.followers,
    following: req.user.following
  });
};
//@route DELETE /api/user
//@desc delete user account
//@access Private
exports.deleteUser = (req, res) => {
  const errors = {};
  User.findOneAndRemove({ _id: req.user.id })
    .then(() => res.send({ success: true }))
    .catch(err => {
      errors.deleteUser = "couldnt delete user";
      res.status(404).json(errors);
    });
};
//@route POST api/user/follow/:userToFollowId
//@desc follow a user
//@access Private
exports.follow = (req, res) => {
  if (req.user.id === req.params.userToFollowId) {
    return res.status(400).json({ msg: "you cant follow yourself" });
  }

  User.findById(req.user.id).then(user => {
    user.following.unshift(req.params.userToFollowId);
    user.save().then(user => console.log(user));
  });
  User.findById(req.params.userToFollowId).then(user => {
    user.followers.unshift(req.user.id);
    user.save().then(user => res.send(user));
  });
};
//@route POST api/user/follow/:userToUnfollowId
//@desc unfollow a user
//@access Private
exports.unfollow = (req, res) => {
  User.findById(req.user.id).then(user => {
    const removeIndex = user.following.indexOf(req.params.userToUnfollowId);
    user.following.splice(removeIndex, 1);
    user.save().then(user => console.log(user));
  });
  User.findById(req.params.userToUnfollowId).then(user => {
    const removeIndex = user.followers.indexOf(req.user.id);
    user.followers.splice(removeIndex, 1);

    user.save().then(user => res.send(user));
  });
};
