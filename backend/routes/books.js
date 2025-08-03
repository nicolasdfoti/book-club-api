const router = require("express").Router();
const controller = require("../controllers/bookController.js");
const { bookValidation } = require("../utils/validation.js");

// get routes

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books list
 */
router.get("/", controller.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
router.get("/:id", controller.getSingleBook);

// post routes

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookName:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *               numberPages:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *       500:
 *         description: Book not created
 */
router.post("/", controller.createBook);

// PUT route to update a book
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book using the ID
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookName:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *               numberPages:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *       500:
 *         description: Book not created
 */
router.put("/:id", controller.updateBook);

// DELETE route to delete a book
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book using ID
 *     tags:
 *       - Books
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *       500:
 *         description: Book not deleted
 */
router.delete("/:id", controller.deleteBook);

module.exports = router;
