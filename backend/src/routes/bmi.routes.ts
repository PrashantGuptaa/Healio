import { Router } from 'express';
import { calculateBMI } from '../controllers/bmi.controller';

const router = Router();

/**
 * @swagger
 * /api/bmi/calculate:
 *   post:
 *     summary: Calculate BMI
 *     description: Calculate Body Mass Index and get personalized health recommendations
 *     tags: [BMI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - height
 *               - weight
 *             properties:
 *               height:
 *                 type: number
 *                 description: Height in centimeters
 *                 example: 170
 *               weight:
 *                 type: number
 *                 description: Weight in kilograms
 *                 example: 70
 *     responses:
 *       200:
 *         description: BMI calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/BMIResult'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/calculate', calculateBMI);

export default router;
