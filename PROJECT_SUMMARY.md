# Healthcare App - Project Summary

## Overview

A full-stack healthcare application for BMI calculation, nutrition tracking, and personalized health recommendations.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Ant Design** for UI components
- **React Router** for navigation
- **Axios** for API communication
- **Day.js** for date handling

### Backend
- **Node.js** with TypeScript
- **Express.js** for REST API
- **MongoDB** with Mongoose for database
- **JWT** for authentication
- **Passport.js** for Google OAuth (optional)

## Features Implemented

### 1. Landing Page ✅
- Hero section with gradient background
- Feature cards showcasing all capabilities
- Offerings section highlighting weight management plans
- Call-to-action buttons
- Fully responsive design

### 2. BMI Calculator ✅
- Input height (cm) and weight (kg)
- Calculate BMI with category classification
- Display healthy weight range
- Personalized recommendations based on BMI category
- Visual feedback with color-coded results

### 3. Food Database ✅
- Comprehensive database with 15 pre-seeded foods
- Search functionality
- Category filtering
- Sortable table with pagination
- Detailed nutrition modal showing:
  - Macronutrients (calories, protein, carbs, fat)
  - Micronutrients (vitamins, minerals)
  - Serving size information

### 4. Food Logger ✅
- Date selection for meal logging
- Meal type selection (breakfast, lunch, dinner, snack)
- Food selection from database
- Quantity input (servings)
- Daily summary statistics
- View all logged meals
- Delete meals functionality

### 5. Nutrition Dashboard ✅
- Date-based nutrition summary
- Progress bars for each macronutrient
- Visual statistics with color-coded indicators
- Remaining nutrients needed to meet goals
- Nutrition insights and recommendations
- Goal tracking with percentage completion

### 6. Google OAuth Setup ✅
- Infrastructure ready for Google authentication
- Can be enabled with a single environment variable
- Placeholder endpoints implemented
- Easy to activate when needed

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google/callback` - Google OAuth callback

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### BMI
- `POST /api/bmi/calculate` - Calculate BMI with recommendations

### Foods
- `GET /api/foods` - Get all foods (with search, filter, pagination)
- `GET /api/foods/categories` - Get food categories
- `GET /api/foods/:id` - Get food by ID
- `POST /api/foods` - Create new food
- `PUT /api/foods/:id` - Update food
- `DELETE /api/foods/:id` - Delete food

### Meals
- `POST /api/meals` - Log a meal
- `GET /api/meals?userId=&date=` - Get meals by date
- `GET /api/meals/summary?userId=&date=` - Get nutrition summary
- `PUT /api/meals/:id` - Update meal
- `DELETE /api/meals/:id` - Delete meal

## Database Models

### User Model
```typescript
{
  email: string
  password: string (hashed)
  name: string
  googleId?: string
  height?: number (cm)
  weight?: number (kg)
  age?: number
  gender?: 'male' | 'female' | 'other'
  activityLevel?: string
  dailyCalorieGoal: number (default: 2000)
  dailyProteinGoal: number (default: 50g)
  dailyCarbsGoal: number (default: 250g)
  dailyFatGoal: number (default: 70g)
}
```

### Food Model
```typescript
{
  name: string
  category: string
  servingSize: number
  servingUnit: string
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
    calcium?: number
    iron?: number
    vitaminA?: number
    vitaminC?: number
    vitaminD?: number
  }
  description?: string
  imageUrl?: string
}
```

### Meal Model
```typescript
{
  userId: ObjectId
  date: Date
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  items: [{
    foodId: ObjectId
    foodName: string
    quantity: number
    nutrition: {...}
  }]
  totalNutrition: {...}
  notes?: string
}
```

## Pre-seeded Foods

The database comes with 15 sample foods across different categories:

**Proteins:**
- Chicken Breast
- Salmon
- Eggs

**Grains:**
- Brown Rice
- Quinoa
- Oatmeal

**Vegetables:**
- Broccoli
- Sweet Potato
- Spinach

**Fruits:**
- Banana
- Apple
- Avocado

**Dairy:**
- Greek Yogurt

**Nuts & Seeds:**
- Almonds

**Legumes:**
- Lentils

## Key Features

### BMI Recommendations
The app provides category-specific recommendations:
- **Underweight**: Calorie increase strategies, protein-rich foods
- **Normal weight**: Maintenance tips, balanced diet advice
- **Overweight**: Calorie reduction, exercise recommendations
- **Obese**: Professional consultation advice, sustainable weight loss

### Nutrition Tracking
- Real-time calculation of consumed nutrients
- Visual progress indicators
- Remaining nutrients display
- Personalized insights based on consumption patterns

### User Experience
- Modern, gradient-based UI design
- Fully responsive (mobile, tablet, desktop)
- Intuitive navigation
- Color-coded feedback
- Loading states and error handling

## Project Structure

```
healthcare/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── bmi.controller.ts
│   │   │   ├── food.controller.ts
│   │   │   ├── meal.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── models/
│   │   │   ├── User.model.ts
│   │   │   ├── Food.model.ts
│   │   │   └── Meal.model.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── bmi.routes.ts
│   │   │   ├── food.routes.ts
│   │   │   ├── meal.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── seeds/
│   │   │   └── foods.seed.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.tsx
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── BMICalculator.tsx
│   │   │   ├── FoodDatabase.tsx
│   │   │   ├── FoodLogger.tsx
│   │   │   └── NutritionDashboard.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   └── env.example
├── README.md
├── SETUP.md
├── PROJECT_SUMMARY.md
└── .gitignore
```

## Quick Start

1. **Install dependencies:**
```bash
cd backend && npm install
cd ../frontend && npm install
```

2. **Setup environment:**
```bash
# Backend
cd backend
cp env.example .env
# Edit .env with your MongoDB URI

# Frontend
cd frontend
cp env.example .env
```

3. **Seed database:**
```bash
cd backend
npm run seed
```

4. **Start servers:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

5. **Access app:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Future Enhancements

### Phase 1 (Immediate)
- [ ] User authentication implementation
- [ ] User profile management
- [ ] Persistent user sessions
- [ ] User-specific nutritional goals

### Phase 2 (Short-term)
- [ ] Historical data visualization (charts/graphs)
- [ ] Weekly/monthly nutrition reports
- [ ] Meal planning feature
- [ ] Custom food creation by users
- [ ] Recipe database with nutrition calculation

### Phase 3 (Long-term)
- [ ] Mobile app (React Native)
- [ ] Barcode scanning for food items
- [ ] Integration with fitness trackers
- [ ] Social features (share progress, challenges)
- [ ] AI-powered meal recommendations
- [ ] Nutritionist consultation booking

## Google OAuth Activation

To enable Google authentication:

1. Get Google OAuth credentials from Google Cloud Console
2. Update `backend/.env`:
   ```
   ENABLE_GOOGLE_AUTH=true
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```
3. Restart backend server
4. Google login will be available

## Deployment Considerations

### Backend
- Use environment variables for all sensitive data
- Set NODE_ENV=production
- Use MongoDB Atlas for production database
- Implement rate limiting
- Add request validation middleware
- Set up logging (Winston, Morgan)
- Use HTTPS in production

### Frontend
- Build optimized production bundle
- Use CDN for static assets
- Implement code splitting
- Add service worker for PWA
- Configure proper CORS settings
- Use environment-specific API URLs

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS configuration
- Input validation
- MongoDB injection prevention
- XSS protection
- Rate limiting ready

## Performance Optimizations

- Database indexing on frequently queried fields
- Pagination for large datasets
- Lazy loading of components
- Optimized bundle size
- Efficient state management
- Debounced search inputs

## Testing Recommendations

### Backend
- Unit tests for controllers
- Integration tests for API endpoints
- Database connection tests
- Authentication flow tests

### Frontend
- Component unit tests
- Integration tests for user flows
- E2E tests with Cypress/Playwright
- Accessibility tests

## Documentation

- ✅ Main README with project overview
- ✅ Detailed SETUP guide
- ✅ Backend API documentation
- ✅ Frontend component documentation
- ✅ Environment configuration examples
- ✅ Troubleshooting guide

## License

MIT License - Feel free to use this project for personal or commercial purposes.

---

**Built with ❤️ for better health tracking**
