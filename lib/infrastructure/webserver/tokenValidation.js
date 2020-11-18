const jwt = require("jsonwebtoken");
// const UserService = require("./domains/user/UserService");

exports.forStaff = (req, res, next) => {
  if (
    req.headers.tokenstaff &&
    ![undefined, null].includes(req.headers.tokenstaff)
  ) {
    jwt.verify(req.headers.tokenstaff, req.app.get("secretKey"), function (
      err,
      decoded
    ) {
      if (err) {
        return res.junauthorize();
      } else {
        Object.assign(req.userdata, { _id: decoded.id }); //TODO: req.userdata is not related for staff
        Object.assign(req, { loggedIn: true });
        next();
      }
    });
  } else next();
};

exports.forUser = (req, res, next) => {
  if (req.headers.token && ![undefined, null].includes(req.headers.token)) {
    jwt.verify(req.headers.token, req.app.get("secretKey"), async function (
      err,
      decoded
    ) {
      if (err) {
        return res.junauthorize();
      } else {
        const _id = decoded.id.substring(0, 24);

        const activeDeviceId = decoded.id.substring(24);

        if (!activeDeviceId) {
          return res.junauthorize();
        } else {
          const user = await UserService.findByActiveDeviceId(
            _id,
            activeDeviceId
          );
          if (user) {
            Object.assign(req.userdata, { _id });
            Object.assign(req, { loggedIn: true });
            next();
          } else {
            return res.junauthorize();
          }
        }
      }
    });
  } else next();
};
