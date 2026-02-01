import { Router } from 'express';
import {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  getCategories,
} from '../controllers/food.controller';

const router = Router();

/**
 * @swagger
 * /api/foods:
 *   get:
 *     summary: Get all foods
 *     description: Retrieve a list of foods with optional search, category filter, and pagination
 *     tags: [Foods]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for food name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of foods retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Food'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 */
router.get('/', getAllFoods);

/**
 * @swagger
 * /api/foods/categories:
 *   get:
 *     summary: Get food categories
 *     description: Retrieve a list of all food categories
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Protein", "Grains", "Vegetables", "Fruits"]
 */
router.get('/categories', getCategories);

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Get food by ID
 *     description: Retrieve detailed information about a specific food
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Food ID
 *     responses:
 *       200:
 *         description: Food retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Food'
 *       404:
 *         description: Food not found
 */
router.get('/:id', getFoodById);

/**
 * @swagger
 * /api/foods:
 *   post:
 *     summary: Create a new food
 *     description: Add a new food item to the database
 *     tags: [Foods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       201:
 *         description: Food created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Food'
 *                 message:
 *                   type: string
 *                   example: Food created successfully
 */
router.post('/', createFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   put:
 *     summary: Update a food
 *     description: Update an existing food item
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Food ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Food'
 *     responses:
 *       200:
 *         description: Food updated successfully
 *       404:
 *         description: Food not found
 */
router.put('/:id', updateFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   delete:
 *     summary: Delete a food
 *     description: Remove a food item from the database
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Food ID
 *     responses:
 *       200:
 *         description: Food deleted successfully
 *       404:
 *         description: Food not found
 */
router.delete('/:id', deleteFood);

export default router;
