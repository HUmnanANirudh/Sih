const JWT_SECRET = require("../config/config")
const jwt = require("jsonwebtoken");

const roleauth = (roles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        msg: "Access Denied!",
      });
    }
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (roles.includes(decoded.role)) {
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
      } else {
        res.status(403).json({
          msg: "You don't permission to access this",
        });
      }
    } catch (err) {
      res.status(403).json({
        msg: "Access Denied",
      });
    }
  };
};

module.exports = roleauth;
