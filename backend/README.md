# Healthcare Backend API

Backend API for the Healthcare application built with Node.js, TypeScript, Express, and MongoDB.

## Features

- **Authentication**: User registration and login (Google OAuth ready)
- **BMI Calculator**: Calculate BMI and get health recommendations
- **Food Database**: Comprehensive food database with nutritional information
- **Meal Logging**: Track daily food intake
- **Nutrition Tracking**: Monitor macros and micronutrients
- **Daily Goals**: Set and track daily nutritional goals

## Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp env.example .env
```

3. Configure your `.env` file with your settings

4. Seed the database with sample foods:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run seed` - Seed database with sample foods

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/google/callback` - Google OAuth callback (when enabled)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### BMI
- `POST /api/bmi/calculate` - Calculate BMI

### Foods
- `GET /api/foods` - Get all foods (with pagination, search, filter)
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

## Google OAuth Setup

To enable Google OAuth:

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Update `.env`:
   ```
   ENABLE_GOOGLE_AUTH=true
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```
5. Restart the server

## Database Models

### User
- email, password, name
- height, weight, age, gender
- activity level
- daily nutritional goals

### Food
- name, category, description
- serving size and unit
- comprehensive nutrition data (calories, macros, vitamins, minerals)

### Meal
- user reference
- date and meal type (breakfast, lunch, dinner, snack)
- food items with quantities
- calculated total nutrition

## Environment Variables

See `env.example` for all available configuration options.

## License

MIT
