# Healthcare App - API Reference

Base URL: `http://localhost:5000/api`

## Authentication

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

## BMI Calculator

### Calculate BMI
```http
POST /bmi/calculate
Content-Type: application/json

{
  "height": 170,  // in cm
  "weight": 70    // in kg
}

Response: 200 OK
{
  "success": true,
  "data": {
    "bmi": 24.2,
    "category": "Normal weight",
    "healthyWeightRange": {
      "min": 53.5,
      "max": 72.0
    },
    "recommendations": [
      "Maintain your current healthy lifestyle",
      "Continue balanced diet with variety of nutrients",
      "Stay physically active with regular exercise",
      "Monitor your weight periodically",
      "Focus on overall wellness and stress management"
    ]
  }
}
```

## Foods

### Get All Foods
```http
GET /foods?search=chicken&category=Protein&page=1&limit=20

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Chicken Breast",
      "category": "Protein",
      "servingSize": 100,
      "servingUnit": "grams",
      "nutrition": {
        "calories": 165,
        "protein": 31,
        "carbs": 0,
        "fat": 3.6,
        "fiber": 0,
        "sugar": 0,
        "sodium": 74,
        "calcium": 15,
        "iron": 1,
        "vitaminA": 21,
        "vitaminC": 0,
        "vitaminD": 0.1
      },
      "description": "Skinless, boneless chicken breast"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "pages": 1
  }
}
```

### Get Food by ID
```http
GET /foods/:id

Response: 200 OK
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Chicken Breast",
    "category": "Protein",
    ...
  }
}
```

### Get Food Categories
```http
GET /foods/categories

Response: 200 OK
{
  "success": true,
  "data": [
    "Dairy",
    "Fruits",
    "Grains",
    "Legumes",
    "Nuts & Seeds",
    "Protein",
    "Vegetables"
  ]
}
```

### Create Food
```http
POST /foods
Content-Type: application/json

{
  "name": "Grilled Salmon",
  "category": "Protein",
  "servingSize": 150,
  "servingUnit": "grams",
  "nutrition": {
    "calories": 312,
    "protein": 30,
    "carbs": 0,
    "fat": 19.5,
    "sodium": 88
  },
  "description": "Fresh grilled salmon fillet"
}

Response: 201 Created
{
  "success": true,
  "data": { ... },
  "message": "Food created successfully"
}
```

### Update Food
```http
PUT /foods/:id
Content-Type: application/json

{
  "servingSize": 200,
  "nutrition": {
    "calories": 330,
    ...
  }
}

Response: 200 OK
{
  "success": true,
  "data": { ... },
  "message": "Food updated successfully"
}
```

### Delete Food
```http
DELETE /foods/:id

Response: 200 OK
{
  "success": true,
  "message": "Food deleted successfully"
}
```

## Meals

### Log Meal
```http
POST /meals
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011",
  "date": "2026-02-01T10:00:00.000Z",
  "mealType": "breakfast",
  "items": [
    {
      "foodId": "507f1f77bcf86cd799439012",
      "quantity": 1.5
    },
    {
      "foodId": "507f1f77bcf86cd799439013",
      "quantity": 2
    }
  ],
  "notes": "Morning breakfast"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "date": "2026-02-01T10:00:00.000Z",
    "mealType": "breakfast",
    "items": [
      {
        "foodId": "507f1f77bcf86cd799439012",
        "foodName": "Oatmeal",
        "quantity": 1.5,
        "nutrition": {
          "calories": 106.5,
          "protein": 3.75,
          "carbs": 18,
          "fat": 2.25
        }
      }
    ],
    "totalNutrition": {
      "calories": 250,
      "protein": 15,
      "carbs": 30,
      "fat": 8
    }
  },
  "message": "Meal logged successfully"
}
```

### Get Meals by Date
```http
GET /meals?userId=507f1f77bcf86cd799439011&date=2026-02-01

Response: 200 OK
{
  "success": true,
  "data": {
    "meals": [
      {
        "_id": "507f1f77bcf86cd799439014",
        "mealType": "breakfast",
        "items": [...],
        "totalNutrition": {...}
      }
    ],
    "dailyTotal": {
      "calories": 1850,
      "protein": 95,
      "carbs": 220,
      "fat": 65,
      "fiber": 28,
      "sugar": 45,
      "sodium": 1800
    }
  }
}
```

### Get Nutrition Summary
```http
GET /meals/summary?userId=507f1f77bcf86cd799439011&date=2026-02-01

Response: 200 OK
{
  "success": true,
  "data": {
    "consumed": {
      "calories": 1850,
      "protein": 95,
      "carbs": 220,
      "fat": 65
    },
    "goals": {
      "calories": 2000,
      "protein": 50,
      "carbs": 250,
      "fat": 70
    },
    "remaining": {
      "calories": 150,
      "protein": 0,
      "carbs": 30,
      "fat": 5
    },
    "percentages": {
      "calories": 93,
      "protein": 190,
      "carbs": 88,
      "fat": 93
    }
  }
}
```

### Update Meal
```http
PUT /meals/:id
Content-Type: application/json

{
  "items": [
    {
      "foodId": "507f1f77bcf86cd799439012",
      "quantity": 2
    }
  ],
  "notes": "Updated breakfast"
}

Response: 200 OK
{
  "success": true,
  "data": { ... },
  "message": "Meal updated successfully"
}
```

### Delete Meal
```http
DELETE /meals/:id

Response: 200 OK
{
  "success": true,
  "message": "Meal deleted successfully"
}
```

## Users

### Get User Profile
```http
GET /users/:id

Response: 200 OK
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "height": 175,
    "weight": 75,
    "age": 30,
    "gender": "male",
    "activityLevel": "moderate",
    "dailyCalorieGoal": 2200,
    "dailyProteinGoal": 110,
    "dailyCarbsGoal": 275,
    "dailyFatGoal": 73
  }
}
```

### Update User Profile
```http
PUT /users/:id
Content-Type: application/json

{
  "height": 175,
  "weight": 72,
  "age": 30,
  "gender": "male",
  "activityLevel": "active",
  "dailyCalorieGoal": 2400,
  "dailyProteinGoal": 120,
  "dailyCarbsGoal": 300,
  "dailyFatGoal": 80
}

Response: 200 OK
{
  "success": true,
  "data": { ... },
  "message": "Profile updated successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Height and weight are required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Food not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Error calculating BMI"
}
```

## Query Parameters

### Foods Endpoint
- `search` (string): Search foods by name
- `category` (string): Filter by category
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)

### Meals Endpoint
- `userId` (string): User ID (required)
- `date` (string): Date in YYYY-MM-DD format (required)

## Notes

1. All dates should be in ISO 8601 format
2. All weights are in kilograms (kg)
3. All heights are in centimeters (cm)
4. Nutrition values:
   - Calories in kcal
   - Macros (protein, carbs, fat) in grams
   - Sodium, calcium, iron in milligrams (mg)
   - Vitamins in appropriate units (mcg or mg)
5. Authentication token should be included in Authorization header for protected routes (when implemented)

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting in production:
- 100 requests per 15 minutes per IP for general endpoints
- 10 requests per 15 minutes per IP for authentication endpoints

## CORS

CORS is configured to allow requests from:
- `http://localhost:3000` (development frontend)
- Configure additional origins in production

## Health Check

```http
GET /health

Response: 200 OK
{
  "status": "OK",
  "message": "Healthcare API is running"
}
```
