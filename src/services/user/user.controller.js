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

exports.UserPhoneController = async (req, res, next) => {
  try {
    const { error, message, data } = await UserService.UserPhoneService(
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

exports.UserDetailsController = async (req, res, next) => {
  try {
    const { error, message, data } = await UserService.UserDetailsService(
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

exports.UserPasswordController = async (req, res, next) => {
  try {
    const { error, message, data } = await UserService.UserPasswordService(
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

exports.UpdateEmailController = async (req, res, next) => {
  try {
    const { error, message, data } = await UserService.UpdateEmailServices(
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

exports.UserNotificationController = async (req, res, next) => {
  try {
    const { error, message, data } = await UserService.UserNotificationService(
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
