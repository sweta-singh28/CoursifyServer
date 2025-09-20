// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization") || req.header("x-auth-token");
  if (!authHeader)
    return res.status(401).json({ msg: "No token, authorization denied" });

  // support "Bearer <token>" or raw token
  let token = authHeader;
  if (token.startsWith("Bearer ")) token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // e.g. { userId, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
