const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.changePassword = (req, res) => {
  const password = req.body.password;
  User.findById(req.user.id)
    .then(user => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
          user.password = hash;
          user
            .save()
            .then(user => res.send(user))
            .catch(err => console.log(err));
        });
      });
    })
    .catch(err => console.log(err));
};
