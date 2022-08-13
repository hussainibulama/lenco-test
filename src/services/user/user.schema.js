const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.registerUserSchema = Joi.object().keys({
  password: Joi.string().required().label("password"),
  email: Joi.string().email().trim().required().label("email"),
});

exports.loginUserSchema = Joi.object({
  email: Joi.string().email().trim().required().label("email"),
  password: Joi.string().required().label("password"),
});
exports.UserPhoneSchema = Joi.object({
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .trim()
    .required()
    .label("phone"),
});
exports.UserDetailsSchema = Joi.object({
  first_name: Joi.string().required().label("first_name"),
  last_name: Joi.string().required().label("last_name"),
});
exports.UserPasswordSchema = Joi.object({
  password: Joi.string().min(8).required().label("password"),
  new_password: Joi.string().min(8).required().label("new_password"),
  new_confirm: Joi.any()
    .valid(Joi.ref("new_password"))
    .required()
    .label("new_confirm"),
});
exports.UserNotificationSchema = Joi.object({
  push_notification: Joi.boolean(),
  sms: Joi.boolean(),
  email_notification: Joi.boolean(),
});
