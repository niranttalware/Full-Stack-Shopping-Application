const pool = require("./db");
const productsObj = require("./data/products");

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    console.log("🧹 Clearing old data...");
    await conn.query("DELETE FROM products");

    console.log("🌱 Inserting products...");

    for (const mainCategory of Object.keys(productsObj)) {
      const subcats = productsObj[mainCategory];

      for (const subCategory of Object.keys(subcats)) {
        const items = subcats[subCategory];

        for (const p of items) {
          await conn.query(
            `INSERT INTO products 
             (product_id, title, description, price, category, main_category, rating_rate, rating_count, image)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              p.id,
              p.title,
              p.description,
              p.price,
              p.category,
              mainCategory,
              p.rating?.rate ?? 0,
              p.rating?.count ?? 0,
              p.image,
            ],
          );
        }
      }
    }

    await conn.commit();
    console.log("✅ All products inserted successfully!");
  } catch (err) {
    await conn.rollback();
    console.error("❌ Error during seeding:", err);
  } finally {
    conn.release();
    process.exit(0);
  }
}

seed();
