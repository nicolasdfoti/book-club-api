const router = require("express").Router();
const booksRoute = require("./books.js");
const usersRoute = require("./users.js");
const path = require("path");
const passport = require("passport");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/public/views/index.html"));
});

router.use("/books", booksRoute);
router.use("/users", usersRoute);

module.exports = router;
