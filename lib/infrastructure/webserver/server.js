const express = require("express");
var session = require("express-session");
const cors = require("cors");
const formidableMiddleware = require("express-formidable");
const logger = require("morgan");
const pug = require("pug");
const environment = require("../config/environment");
const responseStructure =require("./responseStructure")
const tokenValidation =require("./tokenValidation")
const createServer = async () => {
  const app = express();
  const PORT = environment.port || 5000;

  app.use(cors()); //TODO: security
  app.set("secretKey", environment.secretKey); // jwt secret token
  app.set("view engine", "pug");
  app.use(logger("dev"));
  app.use(
    session({
      secret: environment.secretKey,
      resave: true,
      saveUninitialized: true,
    })
  );

  app.use(express.static("public"));
  app.use(formidableMiddleware({ maxFileSize: environment.maxFileSize }));
  app.use(responseStructure.create)
  // app.use(tokenValidation.forStaff)
  // app.use(tokenValidation.forUser)
  app.listen(PORT, function () {
    console.log("Server listening on port http://localhost:" + PORT);
  });
};

module.exports = createServer;
