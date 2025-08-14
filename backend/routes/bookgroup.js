const router = require("express").Router();
const controller = require("../controllers/bookGroupController.js");
const { requiresAuth } = require("express-openid-connect");

// get routes

/**
 * @swagger
 * /bookgroups:
 *   get:
 *     summary: Get all book Groups
 *     tags:
 *       - BookGroups
 *     responses:
 *       200:
 *         description: Book Goups list
 */
router.get("/", controller.getAllBookGroups);

/**
 * @swagger
 * /bookgroups/{id}:
 *   get:
 *     summary: Get a book-group by ID
 *     tags:
 *       - BookGroups
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: BookGroup ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book Groups found
 *       404:
 *         description: Book Groups not found
 */
router.get("/:id", controller.getSingleBookGroup);

// post routes

/**
 * @swagger
 * /bookgroups:
 *   post:
 *     summary: Create a new Book Group
 *     tags:
 *       - BookGroups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupName:
 *                 type: string
 *               groupDescription:
 *                 type: string
 *               bookName:
 *                 type: string
 *               groupMembers:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book Group created
 *       500:
 *         description: Book Group not created
 */
router.post("/", requiresAuth(), controller.createBookGroup);

// PUT route to update a book
/**
 * @swagger
 * /bookgroups/{id}:
 *   put:
 *     summary: Update a book group using the ID
 *     tags:
 *       - BookGroups
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: BookGroup ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupName:
 *                 type: string
 *               groupDescription:
 *                 type: string
 *               bookName:
 *                 type: string
 *               groupMembers:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book Group updated
 *       500:
 *         description: Book Group not updated
 */
router.put("/:id", requiresAuth(), controller.updateBookGroup);

// DELETE route to delete a book
/**
 * @swagger
 * /bookgroups/{id}:
 *   delete:
 *     summary: Delete a book using ID
 *     tags:
 *       - BookGroups
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: BookGroup ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book Group deleted
 *       500:
 *         description: Book Group not deleted
 */
router.delete("/:id", requiresAuth(), controller.deleteBookGroup);

module.exports = router;
