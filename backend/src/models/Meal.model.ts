import mongoose, { Document, Schema } from 'mongoose';
import { INutrition } from './Food.model';

export interface IMealItem {
  foodId: mongoose.Types.ObjectId;
  foodName: string;
  quantity: number; // multiplier of serving size
  nutrition: INutrition;
}

export interface IMeal extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  items: IMealItem[];
  totalNutrition: INutrition;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const mealItemSchema = new Schema<IMealItem>(
  {
    foodId: {
      type: Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    nutrition: {
      calories: { type: Number, required: true },
      protein: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fat: { type: Number, required: true },
      fiber: { type: Number },
      sugar: { type: Number },
      sodium: { type: Number },
      calcium: { type: Number },
      iron: { type: Number },
      vitaminA: { type: Number },
      vitaminC: { type: Number },
      vitaminD: { type: Number },
    },
  },
  { _id: false }
);

const mealSchema = new Schema<IMeal>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    mealType: {
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
      required: true,
    },
    items: [mealItemSchema],
    totalNutrition: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      fiber: { type: Number, default: 0 },
      sugar: { type: Number, default: 0 },
      sodium: { type: Number, default: 0 },
      calcium: { type: Number, default: 0 },
      iron: { type: Number, default: 0 },
      vitaminA: { type: Number, default: 0 },
      vitaminC: { type: Number, default: 0 },
      vitaminD: { type: Number, default: 0 },
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
mealSchema.index({ userId: 1, date: 1 });

export default mongoose.model<IMeal>('Meal', mealSchema);
