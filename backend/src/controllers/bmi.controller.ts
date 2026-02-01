import { Request, Response } from 'express';
import logger from '../config/logger';

interface BMIRequest {
  height: number; // in cm
  weight: number; // in kg
}

interface BMIResult {
  bmi: number;
  category: string;
  healthyWeightRange: {
    min: number;
    max: number;
  };
  recommendations: string[];
}

export const calculateBMI = (req: Request, res: Response): void => {
  try {
    const { height, weight } = req.body as BMIRequest;

    // Validation
    if (!height || !weight) {
      res.status(400).json({
        success: false,
        message: 'Height and weight are required',
      });
      return;
    }

    if (height <= 0 || weight <= 0) {
      res.status(400).json({
        success: false,
        message: 'Height and weight must be positive numbers',
      });
      return;
    }

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10;

    // Determine category
    let category: string;
    let recommendations: string[];

    if (roundedBMI < 18.5) {
      category = 'Underweight';
      recommendations = [
        'Increase calorie intake with nutrient-dense foods',
        'Include more protein-rich foods in your diet',
        'Eat frequent, smaller meals throughout the day',
        'Consider strength training to build muscle mass',
        'Consult with a nutritionist for a personalized meal plan',
      ];
    } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
      category = 'Normal weight';
      recommendations = [
        'Maintain your current healthy lifestyle',
        'Continue balanced diet with variety of nutrients',
        'Stay physically active with regular exercise',
        'Monitor your weight periodically',
        'Focus on overall wellness and stress management',
      ];
    } else if (roundedBMI >= 25 && roundedBMI < 30) {
      category = 'Overweight';
      recommendations = [
        'Reduce calorie intake by 300-500 calories per day',
        'Increase physical activity to 150+ minutes per week',
        'Focus on whole foods and reduce processed foods',
        'Practice portion control',
        'Consider consulting a healthcare provider for guidance',
      ];
    } else {
      category = 'Obese';
      recommendations = [
        'Consult with a healthcare provider for a comprehensive plan',
        'Create a sustainable calorie deficit (500-750 cal/day)',
        'Start with low-impact exercises like walking or swimming',
        'Work with a registered dietitian',
        'Focus on long-term lifestyle changes, not quick fixes',
        'Consider joining a support group',
      ];
    }

    // Calculate healthy weight range (BMI 18.5-24.9)
    const minHealthyWeight = Math.round(18.5 * heightInMeters * heightInMeters * 10) / 10;
    const maxHealthyWeight = Math.round(24.9 * heightInMeters * heightInMeters * 10) / 10;

    const result: BMIResult = {
      bmi: roundedBMI,
      category,
      healthyWeightRange: {
        min: minHealthyWeight,
        max: maxHealthyWeight,
      },
      recommendations,
    };

    logger.info(`BMI calculated: ${roundedBMI} (${category}) for height: ${height}cm, weight: ${weight}kg`);
    
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('BMI calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating BMI',
    });
  }
};
