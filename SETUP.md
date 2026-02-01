# Healthcare App - Setup Guide

Complete setup instructions for getting the Healthcare app running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager (comes with Node.js)

## Project Structure

```
healthcare/
├── backend/          # Node.js + TypeScript + Express API
├── frontend/         # React + TypeScript + Ant Design
├── README.md
├── SETUP.md
└── .gitignore
```

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/healthcare
# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthcare

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Google OAuth Configuration (Optional)
ENABLE_GOOGLE_AUTH=false
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 4. Start MongoDB

If using local MongoDB:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# MongoDB should start automatically as a service
```

If using MongoDB Atlas, ensure your connection string is correct in the `.env` file.

### 5. Seed the Database

Populate the database with sample food data:

```bash
npm run seed
```

This will add 15 sample foods to your database.

### 6. Start the Backend Server

```bash
npm run dev
```

The backend API will start on `http://localhost:5000`

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
📊 Environment: development
🔐 Google Auth: Disabled
```

### 7. Test the API

Open your browser and visit:
- Health check: http://localhost:5000/health
- Get foods: http://localhost:5000/api/foods

## Frontend Setup

### 1. Open a New Terminal

Keep the backend running and open a new terminal window.

### 2. Navigate to Frontend Directory

```bash
cd frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the frontend directory:

```bash
cp env.example .env
```

The default configuration should work:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Start the Frontend Development Server

```bash
npm start
```

The React app will start on `http://localhost:3000` and automatically open in your browser.

## Verify Installation

Once both servers are running, you should be able to:

1. **Visit the Landing Page**: http://localhost:3000
2. **Calculate BMI**: Navigate to BMI Calculator and enter height/weight
3. **Browse Foods**: Navigate to Food Database and search/filter foods
4. **Log Meals**: Navigate to Food Logger and log your meals
5. **View Dashboard**: Navigate to Nutrition Dashboard to see your progress

## Common Issues and Solutions

### Backend Issues

**Issue**: MongoDB connection error
```
Solution: 
- Ensure MongoDB is running
- Check your MONGODB_URI in .env
- For MongoDB Atlas, check network access and credentials
```

**Issue**: Port 5000 already in use
```
Solution:
- Change PORT in backend/.env to another port (e.g., 5001)
- Update REACT_APP_API_URL in frontend/.env accordingly
```

**Issue**: Module not found errors
```
Solution:
- Delete node_modules and package-lock.json
- Run npm install again
```

### Frontend Issues

**Issue**: Port 3000 already in use
```
Solution:
- The app will ask if you want to use another port
- Type 'y' to use an alternative port
```

**Issue**: API calls failing
```
Solution:
- Ensure backend is running
- Check REACT_APP_API_URL in frontend/.env
- Check browser console for CORS errors
```

**Issue**: Module not found errors
```
Solution:
- Delete node_modules and package-lock.json
- Run npm install again
```

## Development Workflow

### Running Both Services

You'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Making Changes

- **Backend changes**: The server will automatically restart (using ts-node-dev)
- **Frontend changes**: The browser will automatically reload (using React hot reload)

### Adding More Foods

You can add foods through the API or by modifying `backend/src/seeds/foods.seed.ts` and running:

```bash
cd backend
npm run seed
```

## Production Deployment

### Backend

1. Build the TypeScript code:
```bash
cd backend
npm run build
```

2. Start the production server:
```bash
npm start
```

### Frontend

1. Build the React app:
```bash
cd frontend
npm run build
```

2. The `build` folder contains static files ready to deploy to any hosting service (Netlify, Vercel, AWS S3, etc.)

## Enabling Google OAuth (Optional)

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Configure consent screen
6. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
7. Copy Client ID and Client Secret

### 2. Update Backend Configuration

Edit `backend/.env`:

```env
ENABLE_GOOGLE_AUTH=true
GOOGLE_CLIENT_ID=your-actual-client-id
GOOGLE_CLIENT_SECRET=your-actual-client-secret
```

### 3. Restart Backend Server

```bash
cd backend
npm run dev
```

Google authentication will now be enabled!

## Next Steps

Now that your app is running, you can:

1. **Explore Features**: Try all the features - BMI calculator, food database, meal logging, and dashboard
2. **Add More Foods**: Expand the food database with more items
3. **Customize**: Modify the UI, add new features, or adjust nutritional goals
4. **Deploy**: Deploy to production when ready

## Support

If you encounter any issues:

1. Check the console logs in both terminal windows
2. Check browser console for frontend errors
3. Ensure all prerequisites are installed
4. Verify environment variables are set correctly

## Additional Resources

- [React Documentation](https://react.dev/)
- [Ant Design Documentation](https://ant.design/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

Happy coding! 🚀
