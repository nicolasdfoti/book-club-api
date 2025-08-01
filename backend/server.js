const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./data/db");
const setupSwagger = require("./swagger");
const indexRoutes = require("./routes/index");

db.intializeDb((err) => {
  if (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  } else {
    console.log("Database initialized successfully");
  }
});

setupSwagger(app);

/* ---------- routes ---------- */
app.use("/", indexRoutes);

/* ---------- middleware ---------- */
app.use(express.static(path.join(__dirname, "../frontend/public"))); // serve frontend static files

/* ---------- start server ---------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
