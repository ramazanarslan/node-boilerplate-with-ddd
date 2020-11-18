"use strict";

require("dotenv").config();

const constants = require("./constants");
const environment = require("./environment");

module.exports = {
  async init() {
    if (environment.database.active === constants.SUPPORTED_DATABASE.MONGO) {
      require("../orm/mongoose/mongoose");
    }
  },
};
