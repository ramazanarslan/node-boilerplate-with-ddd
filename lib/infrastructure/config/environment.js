"use strict";

const constants = require("./constants");

/**
 * This module centralize all the environment variables of the application. Thanks to this module, there MUST NOT be any
 * `process.env` instruction in any other file or module.
 */
const MB = 1024 * 1024;

module.exports = (() => {
  const environment = {
    database: {
      active: constants.SUPPORTED_DATABASE.MONGO,
      url: process.env.DATABASE_URI || "",
    },
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
    maxFileSize: 1000 * MB,
  };

  if (process.env.ENV === "test") {
    environment.database = {
      driver: constants.SUPPORTED_DATABASE.IN_MEMORY,
    };
  }

  return environment;
})();
