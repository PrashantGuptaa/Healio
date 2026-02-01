import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import BMICalculator from './pages/BMICalculator';
import FoodDatabase from './pages/FoodDatabase';
import FoodLogger from './pages/FoodLogger';
import NutritionDashboard from './pages/NutritionDashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1F6AE1',
          colorSuccess: '#2FB9A8',
          colorInfo: '#1F6AE1',
          colorBgBase: '#FFFFFF',
          colorTextBase: '#1A1A1A',
          colorBgContainer: '#FFFFFF',
          colorBgLayout: '#F2F4F7',
          borderRadius: 12,
          fontSize: 15,
        },
      }}
    >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route path="/food-database" element={<FoodDatabase />} />
            <Route path="/food-logger" element={<FoodLogger />} />
            <Route path="/nutrition-dashboard" element={<NutritionDashboard />} />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
