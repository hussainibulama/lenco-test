const { Router } = require("express");
const validateRequest = require("../../middleware/validateRequest");
const addressSchema = require("./address.schema");
const addressController = require("./address.controller");
const { authorizeLogin } = require("../../middleware/authorizeLogin");
const { checkExistingUser } = require("../../middleware/checkExistingUser");
const { checkAuth } = require("../../middleware/checkAuth");
const router = Router();
router.post(
  "/add-address",
  checkAuth,
  validateRequest(addressSchema.AddressSchema, "body"),
  addressController.addAddressController
);

router.patch(
  "/edit-address",
  checkAuth,
  validateRequest(addressSchema.AddressSchema, "body"),
  addressController.editAddressController
);
router.get(
  "/get-all-address",
  checkAuth,
  addressController.getAllAddressController
);

module.exports = router;
