const mongoose = require("mongoose");
const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const knex = require("../../knex.js");

exports.checkExistingUser = async (req, _, next) => {
  let { email } = req.body;
  try {
    const userEmail = await knex("users").where("email", email);
    if (userEmail.length > 0 && userEmail[0].email === email.toLowerCase()) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `email already exists`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    return next();
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
