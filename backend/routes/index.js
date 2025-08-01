const router = require("express").Router();
const booksRoute = require("./books.js");
const swaggerRoute = require("./swagger.js")
const path = require("path");
const passport = require("passport");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/index.html"));
})

router.use("/all", booksRoute);
router.use("/api-doc", swaggerRoute);

module.exports = router;