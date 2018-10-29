const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function reviewValidation(data) {
  let errors = {};
  data.rating = !isEmpty(data.rating) ? data.rating : "";
  data.reviewText = !isEmpty(data.reviewText) ? data.reviewText : "";
  if (!Validator.isLength(data.reviewText, { max: 100 })) {
    errors.reviewText = "Review text should be less than 100 chars";
  }
  if (!Validator.isFloat(data.rating, { min: 0.0, max: 5.0 })) {
    errors.rating = "Rating should be between 0 and 5";
  }
  if (Validator.isEmpty(data.rating)) {
    errors.rating = "You need to fill rating field";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
