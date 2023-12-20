const { tokenVerifier } = require("../helpers/jwt");

const checkAuth = (role) => {
  return (req, res, next) => {
    const { access_token } = req.headers;
    try {
      if (access_token) {
        const decoded = tokenVerifier(access_token);
        if (decoded.role.toLowerCase() === role) {
          req.userData = decoded;
          next();
        } else {
          throw {
            status: 401,
            message: "You are not authorized!",
          };
        }
      } else {
        throw {
          status: 404,
          message: "Token not found!",
        };
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        ...err,
      });
    }
  }
}
const adminAuth = (req, res, next) => {
  const { access_token } = req.headers;

  try {
    if (access_token) {
      const decoded = tokenVerifier(access_token);
      if (decoded.role.toLowerCase() === "admin") {
        req.userData = decoded;
        next();
      } else {
        throw {
          status: 401,
          message: "You are not authorized!",
        };
      }
    } else {
      throw {
        status: 404,
        message: "Token not found!",
      };
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      ...err,
    });
  }
};

const auth = (req, res, next) => {
  const { access_token } = req.headers;

  try {
    if (access_token) {
      const decoded = tokenVerifier(access_token);
      req.userData = decoded;
      next();
    } else {
      throw {
        status: 404,
        message: "Token not found!",
      };
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      ...err,
    });
  }
};

module.exports = { adminAuth, auth, checkAuth };
