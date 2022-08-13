const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.AddressSchema = Joi.object().keys({
  id: Joi.string().label("id"),
  street: Joi.string().required().label("street"),
  house_no: Joi.string().required().label("house_no"),
  delivery_instruction: Joi.string().label("delivery_instruction"),
});
