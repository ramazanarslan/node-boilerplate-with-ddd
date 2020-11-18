const moment = require("moment");

exports.create = (req, res, next) => {
  req.body = req.fields || {};
  req.userdata = {};
  res.resdata = { messages: [], data: {} };

  res.jerror = (errors) => {
    console.log(
      `\nTCLOG: ${
        req.userdata && req.userdata._id ? req.userdata._id : "NO USER "
      }`,
      moment().format(),
      " ",
      req.originalUrl,
      ":",
      errors
    ); //TODO:
    if (typeof errors === "object" && errors.details) {
      errors = errors.details;
    } else if (!Array.isArray(errors)) {
      errors = [errors];
    }
    return res.status(400).send({ status: "error", errors });
  };

  res.jsend = (data) => {
    return res.status(200).send({
      status: "success",
      data: data || res.resdata.data,
      messages: res.resdata.messages,
    });
  };

  res.junauthorize = () => {
    return res.status(401).send({
      status: "error",
      errors: [{ msg: "Unauthorized" }],
    });
  };

  next();
};
