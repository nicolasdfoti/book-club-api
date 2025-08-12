const router = require("express").Router();
const booksRoute = require("./books.js");
const usersRoute = require("./users.js");
const bookGroupRoute = require("./bookgroup.js");
const bookGroupCommentRoute = require("./bookgroupcomment.js");
const path = require("path");
const passport = require("passport");
const authRoutes = require("./auth");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/public/views/index.html"));
});

router.use("/books", booksRoute);
router.use("/users", usersRoute);
router.use("/bookgroups", bookGroupRoute);
// Auth routes - authentication endpoints
router.use("/auth", authRoutes);

module.exports = router;
