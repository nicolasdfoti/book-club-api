const router = require("express").Router();
const controller = require("../controllers/bookGroupCommentsController.js");

/**
 * @swagger
 * /book-groups-comments:
 *   get:
 *     summary: Get all book Groups comments
 *     tags:
 *       - BookGroupsComments
 *     responses:
 *       200:
 *         description: Book Goups list
 */
router.get("/", controller.getAllBookGroupComments);

/**
 * @swagger
 * /book-groups-comments/{id}:
 *   get:
 *     summary: Get a book-group-comments by ID
 *     tags:
 *       - BookGroupsComments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: BookGroupComments ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book Groups Comment found
 *       404:
 *         description: Book Groups Comment not found
 */
router.get("/:id", controller.getSingleBookGroupComment);

/**
 * @swagger
 * /book-groups-comments:
 *   post:
 *     summary: Create a new Book Group Comment
 *     tags:
 *       - BookGroupsComments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentText:
 *                 type: string
 *               userName:
 *                 type: string
 *               bookGroupId:
 *                 type: string
 *               commentDate:
 *                 type: date
 *     responses:
 *       200:
 *         description: Book Group Comment created
 *       500:
 *         description: Book Group Comment not created
 */
router.post("/", controller.createBookGroupComment);

/**
 * @swagger
 * /book-groups-comments/{id}:
 *   put:
 *     summary: Update a book group comments using the ID
 *     tags:
 *       - BookGroups
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: BookGroupComments ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentText:
 *                 type: string
 *               userName:
 *                 type: string
 *               bookGroupId:
 *                 type: string
 *               commentDate:
 *                 type: date
 *     responses:
 *       200:
 *         description: Book Group Comment updated
 *       500:
 *         description: Book Group Comment not updated
 */
router.put("/:id", controller.updateBookGroupComment);

/**
 * @swagger
 * /book-groups-comments/{id}:
 *   delete:
 *     summary: Delete a book group comment using ID
 *     tags:
 *       - BookGroupsComments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: BookGroupComments ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book Group Comment deleted
 *       500:
 *         description: Book Group Comment not deleted
 */
router.delete("/:id", controller.deleteBookGroupComment);

module.exports = router;
