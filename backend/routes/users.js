const router = require("express").Router();
const controller = require("../controllers/userController");
const { requiresAuth } = require("express-openid-connect");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users list
 */
router.get("/", controller.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/:id", controller.getSingleUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               userSurname:
 *                 type: string
 *               userAge:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User created
 *       500:
 *         description: User not created
 */
router.post("/", requiresAuth(), controller.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user using the ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               userSurname:
 *                 type: string
 *               userAge:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *       500:
 *         description: User not created
 */
router.put("/:id", requiresAuth(), controller.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user using ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       500:
 *         description: User not deleted
 */
router.delete("/:id", requiresAuth(), controller.deleteUser);

module.exports = router;
