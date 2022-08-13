const { Router } = require("express");
const validateRequest = require("../../middleware/validateRequest");
const userSchema = require("./user.schema");
const userController = require("./user.controller");
const { authorizeLogin } = require("../../middleware/authorizeLogin");
const { checkExistingUser } = require("../../middleware/checkExistingUser");
const { checkAuth } = require("../../middleware/checkAuth");
const router = Router();
router.post(
  "/signup",
  validateRequest(userSchema.registerUserSchema, "body"),
  checkExistingUser,
  userController.registerUserController
);

router.post(
  "/login",
  validateRequest(userSchema.loginUserSchema, "body"),
  authorizeLogin,
  userController.loginUserController
);
router.patch(
  "/update-phone",
  checkAuth,
  validateRequest(userSchema.UserPhoneSchema, "body"),
  userController.UserPhoneController
);
router.patch(
  "/update-details",
  checkAuth,
  validateRequest(userSchema.UserDetailsSchema, "body"),
  userController.UserDetailsController
);
router.patch(
  "/update-password",
  checkAuth,
  validateRequest(userSchema.UserPasswordSchema, "body"),
  userController.UserPasswordController
);
router.patch(
  "/update-email",
  checkAuth,
  validateRequest(userSchema.registerUserSchema, "body"),
  userController.UpdateEmailController
);
router.patch(
  "/notification",
  checkAuth,
  validateRequest(userSchema.UserNotificationSchema, "body"),
  userController.UserNotificationController
);
module.exports = router;
