const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const knex = require("../../knex.js");

exports.authorizeLogin = async (req, _, next) => {
  let email = String(req.body.email);
  try {
    let user = null;
    user = await knex("users").where("email", email);
    if (user.length <= 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message: `User does not Exist`,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    } else {
      req.user = user[0];
      next();
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
