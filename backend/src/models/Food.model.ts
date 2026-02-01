import mongoose, { Document, Schema } from 'mongoose';

export interface INutrition {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
  sugar?: number; // grams
  sodium?: number; // mg
  calcium?: number; // mg
  iron?: number; // mg
  vitaminA?: number; // mcg
  vitaminC?: number; // mg
  vitaminD?: number; // mcg
}

export interface IFood extends Document {
  name: string;
  category: string;
  servingSize: number; // in grams
  servingUnit: string; // e.g., "grams", "cup", "piece"
  nutrition: INutrition;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const nutritionSchema = new Schema<INutrition>(
  {
    calories: { type: Number, required: true, min: 0 },
    protein: { type: Number, required: true, min: 0 },
    carbs: { type: Number, required: true, min: 0 },
    fat: { type: Number, required: true, min: 0 },
    fiber: { type: Number, min: 0 },
    sugar: { type: Number, min: 0 },
    sodium: { type: Number, min: 0 },
    calcium: { type: Number, min: 0 },
    iron: { type: Number, min: 0 },
    vitaminA: { type: Number, min: 0 },
    vitaminC: { type: Number, min: 0 },
    vitaminD: { type: Number, min: 0 },
  },
  { _id: false }
);

const foodSchema = new Schema<IFood>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    servingSize: {
      type: Number,
      required: true,
      min: 0,
    },
    servingUnit: {
      type: String,
      required: true,
      default: 'grams',
    },
    nutrition: {
      type: nutritionSchema,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching foods
foodSchema.index({ name: 'text', category: 'text' });

export default mongoose.model<IFood>('Food', foodSchema);
