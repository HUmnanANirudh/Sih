const JWT_SECRET = require("../config/config")
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Access Denied!",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.id) {
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    } else {
      res.status(403).json({
        message: "Access denied",
      });
    }
  } catch (err) {
    res.status(403).json({
      message: "Access denied",
    });
  }
};

module.exports = auth;
