# Healio

A comprehensive healthcare application for BMI calculation, nutrition tracking, and personalized health plans.

## Tech Stack

### Frontend
- React with TypeScript
- Ant Design for UI components
- Axios for API calls

### Backend
- Node.js with TypeScript
- Express.js
- MongoDB with Mongoose

## Project Structure

```
healio/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
└── README.md
```

## Features

1. **BMI Calculator**: Calculate Body Mass Index based on height and weight
2. **Weight Management Plans**: Get personalized suggestions for weight management
3. **Food Database**: Comprehensive database of foods with calorie and mineral breakdown
4. **Nutrition Tracking**: Log daily food intake and track macros (protein, fat, carbs)
5. **Daily Goal Tracking**: Monitor progress towards daily nutritional goals
6. **Google OAuth**: (Optional) Secure authentication with Google

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## Environment Variables

See `.env.example` files in respective directories for required configuration.

## License

MIT
