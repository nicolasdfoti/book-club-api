const express = require("express");
const app = express();
const db = require("./data/db");

const PORT = 3000;
// Initialize database connection
db.intializeDb((err) => {
  if (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1); // Exit the application if database initialization fails
  } else {
    console.log("Database initialized successfully");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
