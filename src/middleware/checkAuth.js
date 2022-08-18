const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const { jwtVerify } = require("../helpers/token");
const knex = require("../../knex.js");

exports.checkAuth = async (req, _, next) => {
  const message = "Unauthorized";
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return next(
      createError(HTTP.UNAUTHORIZED, [
        {
          status: RESPONSE.ERROR,
          message: "invalid header",
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
  try {
    const { id } = jwtVerify(token) || {};
    if (!id) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "invalid header",
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    const user = await knex("users").where("id", id);

    if (user.length <= 0) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "invalid header",
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }

    if (user) {
      req.user = user[0];
      req.token = token;
      return next();
    }

    return next(
      createError(HTTP.UNAUTHORIZED, [
        {
          status: RESPONSE.ERROR,
          message: "invalid header",
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  } catch (err) {
    console.log(err);
    return next(createError.InternalServerError());
  }
};
