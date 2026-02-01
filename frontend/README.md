# Healthcare Frontend

React frontend application for the Healthcare app built with TypeScript and Ant Design.

## Features

- **Landing Page**: Overview of all features and offerings
- **BMI Calculator**: Calculate BMI and get personalized recommendations
- **Food Database**: Browse comprehensive food database with nutritional information
- **Food Logger**: Log daily meals and track nutrition
- **Nutrition Dashboard**: Monitor progress towards daily nutritional goals

## Tech Stack

- React 18
- TypeScript
- Ant Design (UI Components)
- React Router (Navigation)
- Axios (API calls)
- Day.js (Date handling)

## Setup

### Prerequisites

- Node.js (v18 or higher)
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

3. Configure your `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Layout.tsx
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── BMICalculator.tsx
│   │   ├── FoodDatabase.tsx
│   │   ├── FoodLogger.tsx
│   │   └── NutritionDashboard.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
└── tsconfig.json
```

## Features Overview

### Landing Page
- Hero section with call-to-action
- Feature cards with navigation
- Offerings showcase
- Responsive design

### BMI Calculator
- Input height and weight
- Calculate BMI with category
- Get healthy weight range
- Receive personalized recommendations

### Food Database
- Search foods by name
- Filter by category
- View detailed nutrition information
- Sortable table with pagination

### Food Logger
- Select date and meal type
- Choose food from database
- Specify quantity (servings)
- View daily summary
- Delete logged meals

### Nutrition Dashboard
- Select date to view
- Progress bars for each macro
- Nutrition insights and recommendations
- Track remaining nutrients needed
- Visual statistics and charts

## API Integration

The frontend communicates with the backend API through the `services/api.ts` file. All API endpoints are configured with the base URL from environment variables.

## Styling

- Uses Ant Design's theming system
- Custom CSS for additional styling
- Responsive design for mobile and desktop
- Modern gradient backgrounds and card designs

## Future Enhancements

- User authentication with Google OAuth
- User profile management
- Historical data visualization
- Meal planning features
- Recipe suggestions
- Social features and sharing

## License

MIT
