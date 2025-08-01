const router = require("express").Router();
const controller = require("../controllers/bookController.js");
const { bookValidation } = require("../utils/validation.js");

// get routes
router.get("/all", controller.getAllBooks);
router.get("/:id", controller.getSingleBook);

// post routes
router.post("/", controller.createBook);

// put routes
router.put("/:id", controller.updateBook);

// delete routes
router.delete("/:id", controller.deleteBook);

module.exports = router;
