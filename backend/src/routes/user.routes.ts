import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller';

const router = Router();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve user profile information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/:id', getUserProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user profile
 *     description: Update user profile information and health goals
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               name:
 *                 type: string
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               activityLevel:
 *                 type: string
 *                 enum: [sedentary, light, moderate, active, very_active]
 *               dailyCalorieGoal:
 *                 type: number
 *               dailyProteinGoal:
 *                 type: number
 *               dailyCarbsGoal:
 *                 type: number
 *               dailyFatGoal:
 *                 type: number
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.put('/:id', updateUserProfile);

export default router;
