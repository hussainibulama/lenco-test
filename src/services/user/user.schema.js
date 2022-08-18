const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.registerUserSchema = Joi.object().keys({
  name: Joi.string().required().label("name"),
  email: Joi.string().email().trim().required().label("email"),
  password: Joi.string().required().label("password"),
});

exports.loginUserSchema = Joi.object({
  email: Joi.string().email().trim().required().label("email"),
  password: Joi.string().required().label("password"),
});
exports.UserUpdateBalanceSchema = Joi.object({
  amount: Joi.number().required().label("amount"),
});
exports.UserTransferSchema = Joi.object({
  email: Joi.string().email().trim().required().label("email"),
  amount: Joi.number().required().label("amount"),
});
