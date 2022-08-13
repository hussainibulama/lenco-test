const { Router } = require("express");
const users = require("./user/user.route");
const address = require("./address/address.route");

module.exports = () => {
  const router = Router();

  router.use("/user", users);
  router.use("/location", address);

  return router;
};
