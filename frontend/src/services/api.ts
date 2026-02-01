import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// BMI API
export const calculateBMI = async (height: number, weight: number) => {
  const response = await api.post('/bmi/calculate', { height, weight });
  return response.data;
};

// Food API
export const getFoods = async (params?: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get('/foods', { params });
  return response.data;
};

export const getFoodById = async (id: string) => {
  const response = await api.get(`/foods/${id}`);
  return response.data;
};

export const createFood = async (foodData: any) => {
  const response = await api.post('/foods', foodData);
  return response.data;
};

export const updateFood = async (id: string, foodData: any) => {
  const response = await api.put(`/foods/${id}`, foodData);
  return response.data;
};

export const deleteFood = async (id: string) => {
  const response = await api.delete(`/foods/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/foods/categories');
  return response.data;
};

// Meal API
export const logMeal = async (mealData: any) => {
  const response = await api.post('/meals', mealData);
  return response.data;
};

export const getMealsByDate = async (userId: string, date: string) => {
  const response = await api.get('/meals', {
    params: { userId, date },
  });
  return response.data;
};

export const getNutritionSummary = async (userId: string, date: string) => {
  const response = await api.get('/meals/summary', {
    params: { userId, date },
  });
  return response.data;
};

export const updateMeal = async (id: string, mealData: any) => {
  const response = await api.put(`/meals/${id}`, mealData);
  return response.data;
};

export const deleteMeal = async (id: string) => {
  const response = await api.delete(`/meals/${id}`);
  return response.data;
};

// Auth API
export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// User API
export const getUserProfile = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUserProfile = async (id: string, userData: any) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export default api;
