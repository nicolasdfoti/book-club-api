const router = require("express").Router();
const controller = require("../controllers/controller.js");
const { bookValidation } = require("../utils/validation.js");

// get routes
router.get("/all", controller.getAllBooks);
router.get("/:id", controller.getSingleBook);

// post routes
router.post("/",
    bookValidation,
    controller.createBook
);

// put routes
router.put("/:id",
    bookValidation,
    controller.updateBook
)

// delete routes
router.delete(":id",
    bookValidation,
    controller.deleteBook
)

module.exports = router;