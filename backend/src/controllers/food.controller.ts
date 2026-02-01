import { Request, Response } from 'express';
import Food from '../models/Food.model';
import logger from '../config/logger';

// Get all foods with optional search and category filter
export const getAllFoods = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, page = 1, limit = 20 } = req.query;

    const query: any = {};

    if (search) {
      query.$text = { $search: search as string };
    }

    if (category) {
      query.category = category;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const foods = await Food.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ name: 1 });

    const total = await Food.countDocuments(query);

    res.status(200).json({
      success: true,
      data: foods,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    logger.error('Get foods error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching foods',
    });
  }
};

// Get food by ID
export const getFoodById = async (req: Request, res: Response): Promise<void> => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      res.status(404).json({
        success: false,
        message: 'Food not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    logger.error('Get food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching food',
    });
  }
};

// Create new food
export const createFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const food = await Food.create(req.body);
    
    logger.info(`Food created: ${food.name} (${food.category})`);

    res.status(201).json({
      success: true,
      data: food,
      message: 'Food created successfully',
    });
  } catch (error) {
    logger.error('Create food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating food',
    });
  }
};

// Update food
export const updateFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!food) {
      res.status(404).json({
        success: false,
        message: 'Food not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: food,
      message: 'Food updated successfully',
    });
  } catch (error) {
    logger.error('Update food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating food',
    });
  }
};

// Delete food
export const deleteFood = async (req: Request, res: Response): Promise<void> => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      res.status(404).json({
        success: false,
        message: 'Food not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Food deleted successfully',
    });
  } catch (error) {
    logger.error('Delete food error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting food',
    });
  }
};

// Get food categories
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Food.distinct('category');

    res.status(200).json({
      success: true,
      data: categories.sort(),
    });
  } catch (error) {
    logger.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
    });
  }
};
