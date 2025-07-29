const express = require("express");
const app = express();
const db = require("./data/db");
const setupSwagger = require("./swagger");

const PORT = 3000;

db.intializeDb((err) => {
  if (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  } else {
    console.log("Database initialized successfully");
  }
});

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
