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
  "/update-balance",
  checkAuth,
  validateRequest(userSchema.UserUpdateBalanceSchema, "body"),
  userController.UserUpdateBalanceController
);
router.patch(
  "/withdraw",
  checkAuth,
  validateRequest(userSchema.UserUpdateBalanceSchema, "body"),
  userController.UserWithdrawController
);
router.patch(
  "/transfer",
  checkAuth,
  validateRequest(userSchema.UserTransferSchema, "body"),
  userController.UserTransferController
);
module.exports = router;
