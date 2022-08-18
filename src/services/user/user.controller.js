const { HTTP } = require("../../constants/http");
const { RESPONSE } = require("../../constants/response");
const createError = require("../../helpers/createError");
const { createResponse } = require("../../helpers/createResponse");
const UserService = require("./user.service");

exports.registerUserController = async (req, res, next) => {
  try {
    const { error, message, data } = await UserService.registerUser(
      res,
      req.body
    );
    if (error) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message,
            statusCode:
              data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
            data,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    return createResponse(message, data)(res, HTTP.CREATED);
  } catch (err) {
    console.error(err);

    return next(createError.InternalServerError(err));
  }
};

exports.loginUserController = async (req, res, next) => {
  try {
    const { error, message, data } = await UserService.loginUser(
      req.user,
      req.body
    );
    if (error) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message,
            statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.OK,
            data,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    return createResponse(message, data)(res, HTTP.OK);
  } catch (err) {
    console.error(err);

    return next(createError.InternalServerError(err));
  }
};

exports.UserUpdateBalanceController = async (req, res, next) => {
  try {
    const { error, message, data } = await UserService.UserUpdateBalanceService(
      req.user,
      req.body
    );
    if (error) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message,
            statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.OK,
            data,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    return createResponse(message, data)(res, HTTP.OK);
  } catch (err) {
    console.error(err);

    return next(createError.InternalServerError(err));
  }
};

exports.UserWithdrawController = async (req, res, next) => {
  try {
    const { error, message, data } = await UserService.UserWithdrawService(
      req.user,
      req.body
    );
    if (error) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message,
            statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.OK,
            data,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    return createResponse(message, data)(res, HTTP.OK);
  } catch (err) {
    console.error(err);

    return next(createError.InternalServerError(err));
  }
};

exports.UserTransferController = async (req, res, next) => {
  try {
    const { error, message, data } = await UserService.UserTransferService(
      req.user,
      req.body
    );
    if (error) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.ERROR,
            message,
            statusCode: data instanceof Error ? HTTP.SERVER_ERROR : HTTP.OK,
            data,
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    return createResponse(message, data)(res, HTTP.OK);
  } catch (err) {
    console.error(err);

    return next(createError.InternalServerError(err));
  }
};
