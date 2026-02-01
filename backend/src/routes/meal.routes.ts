import { Router } from 'express';
import {
  logMeal,
  getMealsByDate,
  getNutritionSummary,
  updateMeal,
  deleteMeal,
} from '../controllers/meal.controller';

const router = Router();

/**
 * @swagger
 * /api/meals:
 *   post:
 *     summary: Log a meal
 *     description: Create a new meal entry with food items
 *     tags: [Meals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - date
 *               - mealType
 *               - items
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Meal date
 *               mealType:
 *                 type: string
 *                 enum: [breakfast, lunch, dinner, snack]
 *                 description: Type of meal
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     foodId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               notes:
 *                 type: string
 *                 description: Optional notes
 *     responses:
 *       201:
 *         description: Meal logged successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Meal'
 *                 message:
 *                   type: string
 */
router.post('/', logMeal);

/**
 * @swagger
 * /api/meals:
 *   get:
 *     summary: Get meals by date
 *     description: Retrieve all meals for a specific user and date
 *     tags: [Meals]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Meals retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     meals:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Meal'
 *                     dailyTotal:
 *                       $ref: '#/components/schemas/Nutrition'
 */
router.get('/', getMealsByDate);

/**
 * @swagger
 * /api/meals/summary:
 *   get:
 *     summary: Get nutrition summary
 *     description: Get daily nutrition summary with goals comparison
 *     tags: [Meals]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Nutrition summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     consumed:
 *                       type: object
 *                       properties:
 *                         calories:
 *                           type: number
 *                         protein:
 *                           type: number
 *                         carbs:
 *                           type: number
 *                         fat:
 *                           type: number
 *                     goals:
 *                       type: object
 *                       properties:
 *                         calories:
 *                           type: number
 *                         protein:
 *                           type: number
 *                         carbs:
 *                           type: number
 *                         fat:
 *                           type: number
 *                     remaining:
 *                       type: object
 *                       properties:
 *                         calories:
 *                           type: number
 *                         protein:
 *                           type: number
 *                         carbs:
 *                           type: number
 *                         fat:
 *                           type: number
 *                     percentages:
 *                       type: object
 *                       properties:
 *                         calories:
 *                           type: number
 *                         protein:
 *                           type: number
 *                         carbs:
 *                           type: number
 *                         fat:
 *                           type: number
 */
router.get('/summary', getNutritionSummary);

/**
 * @swagger
 * /api/meals/{id}:
 *   put:
 *     summary: Update a meal
 *     description: Update an existing meal entry
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     foodId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meal updated successfully
 *       404:
 *         description: Meal not found
 */
router.put('/:id', updateMeal);

/**
 * @swagger
 * /api/meals/{id}:
 *   delete:
 *     summary: Delete a meal
 *     description: Remove a meal entry
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meal ID
 *     responses:
 *       200:
 *         description: Meal deleted successfully
 *       404:
 *         description: Meal not found
 */
router.delete('/:id', deleteMeal);

export default router;
