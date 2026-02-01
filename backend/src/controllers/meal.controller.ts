import { Request, Response } from 'express';
import Meal from '../models/Meal.model';
import Food from '../models/Food.model';
import { INutrition } from '../models/Food.model';

// Helper function to calculate total nutrition
const calculateTotalNutrition = (items: any[]): INutrition => {
  return items.reduce(
    (total, item) => ({
      calories: total.calories + item.nutrition.calories,
      protein: total.protein + item.nutrition.protein,
      carbs: total.carbs + item.nutrition.carbs,
      fat: total.fat + item.nutrition.fat,
      fiber: (total.fiber || 0) + (item.nutrition.fiber || 0),
      sugar: (total.sugar || 0) + (item.nutrition.sugar || 0),
      sodium: (total.sodium || 0) + (item.nutrition.sodium || 0),
      calcium: (total.calcium || 0) + (item.nutrition.calcium || 0),
      iron: (total.iron || 0) + (item.nutrition.iron || 0),
      vitaminA: (total.vitaminA || 0) + (item.nutrition.vitaminA || 0),
      vitaminC: (total.vitaminC || 0) + (item.nutrition.vitaminC || 0),
      vitaminD: (total.vitaminD || 0) + (item.nutrition.vitaminD || 0),
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
      calcium: 0,
      iron: 0,
      vitaminA: 0,
      vitaminC: 0,
      vitaminD: 0,
    }
  );
};

// Log a meal
export const logMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, date, mealType, items, notes } = req.body;

    // Validate and enrich items with nutrition data
    const enrichedItems = await Promise.all(
      items.map(async (item: any) => {
        const food = await Food.findById(item.foodId);
        if (!food) {
          throw new Error(`Food with ID ${item.foodId} not found`);
        }

        // Calculate nutrition based on quantity
        const nutrition: INutrition = {
          calories: food.nutrition.calories * item.quantity,
          protein: food.nutrition.protein * item.quantity,
          carbs: food.nutrition.carbs * item.quantity,
          fat: food.nutrition.fat * item.quantity,
          fiber: (food.nutrition.fiber || 0) * item.quantity,
          sugar: (food.nutrition.sugar || 0) * item.quantity,
          sodium: (food.nutrition.sodium || 0) * item.quantity,
          calcium: (food.nutrition.calcium || 0) * item.quantity,
          iron: (food.nutrition.iron || 0) * item.quantity,
          vitaminA: (food.nutrition.vitaminA || 0) * item.quantity,
          vitaminC: (food.nutrition.vitaminC || 0) * item.quantity,
          vitaminD: (food.nutrition.vitaminD || 0) * item.quantity,
        };

        return {
          foodId: food._id,
          foodName: food.name,
          quantity: item.quantity,
          nutrition,
        };
      })
    );

    // Calculate total nutrition
    const totalNutrition = calculateTotalNutrition(enrichedItems);

    const meal = await Meal.create({
      userId,
      date: new Date(date),
      mealType,
      items: enrichedItems,
      totalNutrition,
      notes,
    });

    res.status(201).json({
      success: true,
      data: meal,
      message: 'Meal logged successfully',
    });
  } catch (error) {
    console.error('Log meal error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error logging meal',
    });
  }
};

// Get meals for a user on a specific date
export const getMealsByDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      res.status(400).json({
        success: false,
        message: 'userId and date are required',
      });
      return;
    }

    const startDate = new Date(date as string);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date as string);
    endDate.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: 1 });

    // Calculate daily totals
    const dailyTotal = meals.reduce(
      (total, meal) => ({
        calories: total.calories + meal.totalNutrition.calories,
        protein: total.protein + meal.totalNutrition.protein,
        carbs: total.carbs + meal.totalNutrition.carbs,
        fat: total.fat + meal.totalNutrition.fat,
        fiber: total.fiber + (meal.totalNutrition.fiber || 0),
        sugar: total.sugar + (meal.totalNutrition.sugar || 0),
        sodium: total.sodium + (meal.totalNutrition.sodium || 0),
      }),
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
      }
    );

    res.status(200).json({
      success: true,
      data: {
        meals,
        dailyTotal,
      },
    });
  } catch (error) {
    console.error('Get meals error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching meals',
    });
  }
};

// Get nutrition summary with goals comparison
export const getNutritionSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, date } = req.query;

    if (!userId || !date) {
      res.status(400).json({
        success: false,
        message: 'userId and date are required',
      });
      return;
    }

    const startDate = new Date(date as string);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date as string);
    endDate.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // Calculate consumed totals
    const consumed = meals.reduce(
      (total, meal) => ({
        calories: total.calories + meal.totalNutrition.calories,
        protein: total.protein + meal.totalNutrition.protein,
        carbs: total.carbs + meal.totalNutrition.carbs,
        fat: total.fat + meal.totalNutrition.fat,
      }),
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      }
    );

    // Get user goals (you would fetch from User model in real implementation)
    const goals = {
      calories: 2000,
      protein: 50,
      carbs: 250,
      fat: 70,
    };

    // Calculate remaining
    const remaining = {
      calories: Math.max(0, goals.calories - consumed.calories),
      protein: Math.max(0, goals.protein - consumed.protein),
      carbs: Math.max(0, goals.carbs - consumed.carbs),
      fat: Math.max(0, goals.fat - consumed.fat),
    };

    // Calculate percentages
    const percentages = {
      calories: Math.round((consumed.calories / goals.calories) * 100),
      protein: Math.round((consumed.protein / goals.protein) * 100),
      carbs: Math.round((consumed.carbs / goals.carbs) * 100),
      fat: Math.round((consumed.fat / goals.fat) * 100),
    };

    res.status(200).json({
      success: true,
      data: {
        consumed,
        goals,
        remaining,
        percentages,
      },
    });
  } catch (error) {
    console.error('Get nutrition summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching nutrition summary',
    });
  }
};

// Update meal
export const updateMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, notes } = req.body;

    if (items) {
      // Recalculate nutrition if items changed
      const enrichedItems = await Promise.all(
        items.map(async (item: any) => {
          const food = await Food.findById(item.foodId);
          if (!food) {
            throw new Error(`Food with ID ${item.foodId} not found`);
          }

          const nutrition: INutrition = {
            calories: food.nutrition.calories * item.quantity,
            protein: food.nutrition.protein * item.quantity,
            carbs: food.nutrition.carbs * item.quantity,
            fat: food.nutrition.fat * item.quantity,
            fiber: (food.nutrition.fiber || 0) * item.quantity,
            sugar: (food.nutrition.sugar || 0) * item.quantity,
            sodium: (food.nutrition.sodium || 0) * item.quantity,
            calcium: (food.nutrition.calcium || 0) * item.quantity,
            iron: (food.nutrition.iron || 0) * item.quantity,
            vitaminA: (food.nutrition.vitaminA || 0) * item.quantity,
            vitaminC: (food.nutrition.vitaminC || 0) * item.quantity,
            vitaminD: (food.nutrition.vitaminD || 0) * item.quantity,
          };

          return {
            foodId: food._id,
            foodName: food.name,
            quantity: item.quantity,
            nutrition,
          };
        })
      );

      const totalNutrition = calculateTotalNutrition(enrichedItems);

      const meal = await Meal.findByIdAndUpdate(
        req.params.id,
        { items: enrichedItems, totalNutrition, notes },
        { new: true, runValidators: true }
      );

      if (!meal) {
        res.status(404).json({
          success: false,
          message: 'Meal not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: meal,
        message: 'Meal updated successfully',
      });
    } else {
      const meal = await Meal.findByIdAndUpdate(
        req.params.id,
        { notes },
        { new: true, runValidators: true }
      );

      if (!meal) {
        res.status(404).json({
          success: false,
          message: 'Meal not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: meal,
        message: 'Meal updated successfully',
      });
    }
  } catch (error) {
    console.error('Update meal error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error updating meal',
    });
  }
};

// Delete meal
export const deleteMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);

    if (!meal) {
      res.status(404).json({
        success: false,
        message: 'Meal not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Meal deleted successfully',
    });
  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting meal',
    });
  }
};
