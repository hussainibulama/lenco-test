const mongoose = require("mongoose");
const app = require("./src/server");
const knex = require("./knex.js");
require("dotenv").config();

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server has started!... and running on port ${PORT}`);
});
