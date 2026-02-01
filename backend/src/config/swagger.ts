import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Healio API Documentation',
      version: '1.0.0',
      description: 'Comprehensive healthcare application API for BMI calculation, nutrition tracking, and personalized health plans.',
      contact: {
        name: 'Healio Support',
        email: 'hello@healio.app',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://api.healio.app',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints',
      },
      {
        name: 'Users',
        description: 'User profile management',
      },
      {
        name: 'BMI',
        description: 'BMI calculation and recommendations',
      },
      {
        name: 'Foods',
        description: 'Food database management',
      },
      {
        name: 'Meals',
        description: 'Meal logging and nutrition tracking',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            name: {
              type: 'string',
              description: 'User full name',
            },
            height: {
              type: 'number',
              description: 'Height in centimeters',
            },
            weight: {
              type: 'number',
              description: 'Weight in kilograms',
            },
            age: {
              type: 'number',
              description: 'User age',
            },
            gender: {
              type: 'string',
              enum: ['male', 'female', 'other'],
              description: 'User gender',
            },
            activityLevel: {
              type: 'string',
              enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
              description: 'Activity level',
            },
            dailyCalorieGoal: {
              type: 'number',
              description: 'Daily calorie goal',
            },
            dailyProteinGoal: {
              type: 'number',
              description: 'Daily protein goal in grams',
            },
            dailyCarbsGoal: {
              type: 'number',
              description: 'Daily carbs goal in grams',
            },
            dailyFatGoal: {
              type: 'number',
              description: 'Daily fat goal in grams',
            },
          },
        },
        Food: {
          type: 'object',
          required: ['name', 'category', 'servingSize', 'servingUnit', 'nutrition'],
          properties: {
            _id: {
              type: 'string',
              description: 'Food ID',
            },
            name: {
              type: 'string',
              description: 'Food name',
            },
            category: {
              type: 'string',
              description: 'Food category',
            },
            servingSize: {
              type: 'number',
              description: 'Serving size',
            },
            servingUnit: {
              type: 'string',
              description: 'Serving unit (e.g., grams, cup, piece)',
            },
            nutrition: {
              $ref: '#/components/schemas/Nutrition',
            },
            description: {
              type: 'string',
              description: 'Food description',
            },
            imageUrl: {
              type: 'string',
              description: 'Food image URL',
            },
          },
        },
        Nutrition: {
          type: 'object',
          required: ['calories', 'protein', 'carbs', 'fat'],
          properties: {
            calories: {
              type: 'number',
              description: 'Calories in kcal',
            },
            protein: {
              type: 'number',
              description: 'Protein in grams',
            },
            carbs: {
              type: 'number',
              description: 'Carbohydrates in grams',
            },
            fat: {
              type: 'number',
              description: 'Fat in grams',
            },
            fiber: {
              type: 'number',
              description: 'Fiber in grams',
            },
            sugar: {
              type: 'number',
              description: 'Sugar in grams',
            },
            sodium: {
              type: 'number',
              description: 'Sodium in mg',
            },
            calcium: {
              type: 'number',
              description: 'Calcium in mg',
            },
            iron: {
              type: 'number',
              description: 'Iron in mg',
            },
            vitaminA: {
              type: 'number',
              description: 'Vitamin A in mcg',
            },
            vitaminC: {
              type: 'number',
              description: 'Vitamin C in mg',
            },
            vitaminD: {
              type: 'number',
              description: 'Vitamin D in mcg',
            },
          },
        },
        Meal: {
          type: 'object',
          required: ['userId', 'date', 'mealType', 'items'],
          properties: {
            _id: {
              type: 'string',
              description: 'Meal ID',
            },
            userId: {
              type: 'string',
              description: 'User ID',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Meal date',
            },
            mealType: {
              type: 'string',
              enum: ['breakfast', 'lunch', 'dinner', 'snack'],
              description: 'Type of meal',
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/MealItem',
              },
            },
            totalNutrition: {
              $ref: '#/components/schemas/Nutrition',
            },
            notes: {
              type: 'string',
              description: 'Meal notes',
            },
          },
        },
        MealItem: {
          type: 'object',
          required: ['foodId', 'quantity'],
          properties: {
            foodId: {
              type: 'string',
              description: 'Food ID',
            },
            foodName: {
              type: 'string',
              description: 'Food name',
            },
            quantity: {
              type: 'number',
              description: 'Quantity (multiplier of serving size)',
            },
            nutrition: {
              $ref: '#/components/schemas/Nutrition',
            },
          },
        },
        BMIResult: {
          type: 'object',
          properties: {
            bmi: {
              type: 'number',
              description: 'Calculated BMI value',
            },
            category: {
              type: 'string',
              description: 'BMI category (Underweight, Normal weight, Overweight, Obese)',
            },
            healthyWeightRange: {
              type: 'object',
              properties: {
                min: {
                  type: 'number',
                  description: 'Minimum healthy weight in kg',
                },
                max: {
                  type: 'number',
                  description: 'Maximum healthy weight in kg',
                },
              },
            },
            recommendations: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Health recommendations',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
            message: {
              type: 'string',
              description: 'Success message',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
