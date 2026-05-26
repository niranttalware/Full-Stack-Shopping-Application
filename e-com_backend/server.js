// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

// Routes
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");

// mount routers
app.use("/api/products", productsRouter); // GET /api/products, /api/products/:id, /api/products/category/:categoryName
app.use("/api/auth", authRouter); // POST /api/auth/signup, POST /api/auth/login

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
