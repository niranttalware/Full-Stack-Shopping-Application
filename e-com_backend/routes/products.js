// backend/routes/products.js
const express = require("express");
const pool = require("../db");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

const router = express.Router();

// GET all products (returns nested CategoryWiseProducts structure)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products ORDER BY id ASC");

    const grouped = {};
    for (const p of rows) {
      const mainCat = p.main_category || "Others";
      const subCat = p.category || "General";

      if (!grouped[mainCat]) grouped[mainCat] = {};
      if (!grouped[mainCat][subCat]) grouped[mainCat][subCat] = [];

      grouped[mainCat][subCat].push({
        id: p.product_id,
        title: p.title,
        description: p.description,
        price: Number(p.price),
        category: p.category,
        rating: { rate: Number(p.rating_rate), count: Number(p.rating_count) },
        image: p.image,
      });
    }

    res.json(grouped);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// GET single product by product_id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE product_id = ?",
      [req.params.id],
    );
    if (!rows.length)
      return res.status(404).json({ message: "Product not found" });

    const p = rows[0];
    res.json({
      id: p.product_id,
      title: p.title,
      description: p.description,
      price: Number(p.price),
      category: p.category,
      rating: { rate: Number(p.rating_rate), count: Number(p.rating_count) },
      image: p.image,
    });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// GET products by sub-category (category name)
router.get("/category/:categoryName", async (req, res) => {
  try {
    const category = req.params.categoryName;
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE category = ? ORDER BY id",
      [category],
    );

    const products = rows.map((p) => ({
      id: p.product_id,
      title: p.title,
      description: p.description,
      price: Number(p.price),
      category: p.category,
      rating: { rate: Number(p.rating_rate), count: Number(p.rating_count) },
      image: p.image,
    }));

    res.json(products);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

/* ======= ADMIN: Create / Update / Delete products =======
   These endpoints are protected: only admin (verifyAdmin) can use them.
   Your admin panel will call these endpoints.
*/

// CREATE product (admin only)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      price,
      main_category,
      category,
      image,
      rating,
    } = req.body;

    await pool.query(
      `INSERT INTO products
      (product_id, title, description, price, category, main_category, rating_rate, rating_count, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        description,
        price,
        category,
        main_category,
        rating.rate,
        rating.count,
        image,
      ],
    );

    res.status(201).json({ message: "Product created" });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, description, price, category, image, rating } = req.body;

    await pool.query(
      `UPDATE products 
       SET title=?, description=?, price=?, category=?, image=?, rating_rate=?, rating_count=?
       WHERE product_id=?`,
      [
        title,
        description,
        price,
        category,
        image,
        rating.rate,
        rating.count,
        req.params.id,
      ],
    );

    res.json({ message: "Product updated" });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// DELETE product by product_id (admin only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM products WHERE product_id = ?", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;
