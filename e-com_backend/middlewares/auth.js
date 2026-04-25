// backend/middlewares/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id, email, role
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function verifyAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: "No user" });
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admins only" });
  next();
}

module.exports = { verifyToken, verifyAdmin };
