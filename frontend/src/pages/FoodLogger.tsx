import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Typography,
  Space,
  message,
  Progress,
  Tag,
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  CalendarOutlined,
  ClockCircleOutlined,
  FireOutlined
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { getFoods, logMeal, getMealsByDate, deleteMeal } from '../services/api';

const { Title, Text } = Typography;

interface Food {
  _id: string;
  name: string;
  category: string;
  servingSize: number;
  servingUnit: string;
  nutrition: any;
}

interface MealItem {
  foodId: string;
  foodName: string;
  quantity: number;
  nutrition: any;
}

interface Meal {
  _id: string;
  mealType: string;
  items: MealItem[];
  totalNutrition: any;
  date: string;
}

const FoodLogger: React.FC = () => {
  const [form] = Form.useForm();
  const [foods, setFoods] = useState<Food[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [dailyTotal, setDailyTotal] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Mock user ID - in real app, this would come from auth context
  const userId = '507f1f77bcf86cd799439011';
  
  const dailyGoal = 2000; // Mock daily calorie goal

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [selectedDate]);

  const fetchFoods = async () => {
    try {
      const response = await getFoods({ limit: 100 });
      if (response.success) {
        setFoods(response.data);
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await getMealsByDate(userId, selectedDate.format('YYYY-MM-DD'));
      if (response.success) {
        setMeals(response.data.meals);
        setDailyTotal(response.data.dailyTotal);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
      setMeals([]);
      setDailyTotal(null);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      const response = await logMeal({
        userId,
        date: selectedDate.toISOString(),
        mealType: values.mealType,
        items: [
          {
            foodId: values.foodId,
            quantity: values.quantity,
          },
        ],
      });

      if (response.success) {
        message.success('Meal logged successfully!');
        form.resetFields(['foodId', 'quantity']);
        fetchMeals();
      }
    } catch (error) {
      message.error('Failed to log meal');
      console.error('Error logging meal:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMeal = async (mealId: string) => {
    try {
      await deleteMeal(mealId);
      message.success('Meal deleted successfully!');
      fetchMeals();
    } catch (error) {
      message.error('Failed to delete meal');
      console.error('Error deleting meal:', error);
    }
  };

  const getMealIcon = (mealType: string) => {
    const icons: { [key: string]: string } = {
      breakfast: '🍳',
      lunch: '🍽️',
      dinner: '🍴',
      snack: '🍪'
    };
    return icons[mealType] || '🍽️';
  };

  const getMealsByType = (type: string) => {
    return meals.filter(meal => meal.mealType === type);
  };

  const getMealTypeTotal = (type: string) => {
    const typeMeals = getMealsByType(type);
    return typeMeals.reduce((sum, meal) => sum + (meal.totalNutrition?.calories || 0), 0);
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 72px)',
      background: '#F2F4F7',
      padding: '0 24px 48px'
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>


        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: 48, paddingTop: 48 }}>
          <Title level={1} style={{ 
            fontSize: 42,
            fontWeight: 700,
            marginBottom: 16,
            color: '#1A1A1A'
          }}>
            Track Your <span style={{ 
              background: 'linear-gradient(135deg, #1F6AE1 0%, #2FB9A8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Daily Meals</span>
          </Title>
          <Text style={{ 
            fontSize: 16,
            color: '#6B7280',
            display: 'block'
          }}>
            Log your food intake and monitor your daily calorie consumption to stay on track with your health goals.
          </Text>
        </div>

        {/* Today's Summary Card */}
        <Card 
          style={{ 
            borderRadius: 20,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            border: 'none',
            marginBottom: 32
          }}
        >
          <div style={{ padding: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <CalendarOutlined style={{ fontSize: 20, color: '#1F6AE1' }} />
              <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                Today's Summary
              </Title>
            </div>
            <Text style={{ color: '#6B7280', fontSize: 14, display: 'block', marginBottom: 24 }}>
              {selectedDate.format('dddd, MMMM D, YYYY')}
            </Text>

            {/* Calorie Progress */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 16
              }}>
                <Title level={1} style={{ 
                  fontSize: 48,
                  fontWeight: 700,
                  margin: 0,
                  background: 'linear-gradient(135deg, #1F6AE1 0%, #2FB9A8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {dailyTotal ? Math.round(dailyTotal.calories) : 0}
                </Title>
                <Text style={{ fontSize: 16, color: '#6B7280' }}>
                  of {dailyGoal} cal
                </Text>
              </div>
              <Progress 
                percent={dailyTotal ? (dailyTotal.calories / dailyGoal) * 100 : 0}
                strokeColor={{
                  '0%': '#1F6AE1',
                  '100%': '#2FB9A8',
                }}
                showInfo={false}
                strokeWidth={12}
                style={{ marginBottom: 12 }}
              />
              <Text style={{ color: '#6B7280', fontSize: 14 }}>
                {dailyTotal ? Math.round(dailyGoal - dailyTotal.calories) : dailyGoal} cal remaining
              </Text>
              <Text style={{ color: '#6B7280', fontSize: 14, marginLeft: 24 }}>
                {dailyTotal ? Math.round((dailyTotal.calories / dailyGoal) * 100) : 0}%
              </Text>
            </div>

            {/* Meal Type Breakdown */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12
            }}>
              {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
                <div key={type} style={{
                  padding: '16px 12px',
                  borderRadius: 12,
                  background: '#F9FAFB',
                  textAlign: 'center'
                }}>
                  <Text style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>
                    {getMealIcon(type)}
                  </Text>
                  <Text style={{ 
                    fontSize: 11,
                    color: '#6B7280',
                    display: 'block',
                    marginBottom: 4,
                    textTransform: 'capitalize'
                  }}>
                    {type}
                  </Text>
                  <Text strong style={{ fontSize: 18, display: 'block' }}>
                    {Math.round(getMealTypeTotal(type))}
                  </Text>
                  <Text style={{ fontSize: 11, color: '#6B7280' }}>
                    calories
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Two Column Layout */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 24,
          marginBottom: 32
        }}>
          {/* Add Food Card */}
          <Card 
            style={{ 
              borderRadius: 20,
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              border: 'none'
            }}
          >
            <div style={{ padding: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <PlusOutlined style={{ fontSize: 20, color: '#1F6AE1' }} />
                <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                  Add Food
                </Title>
              </div>
              <Text style={{ color: '#6B7280', fontSize: 14, display: 'block', marginBottom: 24 }}>
                Log a new food entry
              </Text>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  mealType: 'breakfast',
                  quantity: 1,
                }}
              >
                <Form.Item
                  label={<Text strong>Food Name</Text>}
                  name="foodId"
                  rules={[{ required: true, message: 'Please select a food' }]}
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="e.g., Grilled Chicken"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={foods.map((food) => ({
                      label: `${food.name} (${food.servingSize}${food.servingUnit})`,
                      value: food._id,
                    }))}
                    style={{ borderRadius: 12 }}
                  />
                </Form.Item>

                <Form.Item
                  label={<Text strong>Calories</Text>}
                  name="quantity"
                  rules={[
                    { required: true, message: 'Please enter quantity' },
                    { type: 'number', min: 0.1, message: 'Quantity must be greater than 0' },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%', borderRadius: 12 }}
                    size="large"
                    min={0.1}
                    step={0.5}
                    placeholder="e.g., 250"
                    prefix={<FireOutlined style={{ color: '#6B7280' }} />}
                  />
                </Form.Item>

                <Form.Item
                  label={<Text strong>Meal Type</Text>}
                  name="mealType"
                  rules={[{ required: true, message: 'Please select meal type' }]}
                >
                  <Space size={8} style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                    {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
                      <Button
                        key={type}
                        onClick={() => form.setFieldValue('mealType', type)}
                        style={{
                          flex: '1 1 calc(50% - 4px)',
                          height: 48,
                          borderRadius: 12,
                          textTransform: 'capitalize',
                          background: form.getFieldValue('mealType') === type ? '#1F6AE1' : '#F9FAFB',
                          color: form.getFieldValue('mealType') === type ? 'white' : '#6B7280',
                          border: 'none',
                          fontWeight: 500
                        }}
                      >
                        {type}
                      </Button>
                    ))}
                  </Space>
                </Form.Item>

                <Form.Item
                  label={<Text strong>Time (optional)</Text>}
                >
                  <DatePicker
                    value={selectedDate}
                    onChange={(date) => date && setSelectedDate(date)}
                    style={{ width: '100%', borderRadius: 12 }}
                    size="large"
                    format="HH:mm"
                    showTime={{ format: 'HH:mm' }}
                    placeholder="--:-- --"
                    suffixIcon={<ClockCircleOutlined />}
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={submitting}
                    icon={<PlusOutlined />}
                    style={{
                      height: 52,
                      fontSize: 16,
                      fontWeight: 600,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #1F6AE1 0%, #2FB9A8 100%)',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(31, 106, 225, 0.3)'
                    }}
                  >
                    Add Entry
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>

          {/* Today's Log Card */}
          <Card 
            style={{ 
              borderRadius: 20,
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              border: 'none'
            }}
          >
            <div style={{ padding: '8px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ClockCircleOutlined style={{ fontSize: 20, color: '#1F6AE1' }} />
                    <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                      Today's Log
                    </Title>
                  </div>
                  <Text style={{ color: '#6B7280', fontSize: 14 }}>
                    {meals.length} entries
                  </Text>
                </div>
              </div>

              <Space direction="vertical" size={12} style={{ width: '100%' }}>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: 40 }}>
                    <Text style={{ color: '#6B7280' }}>Loading meals...</Text>
                  </div>
                ) : meals.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 40 }}>
                    <Text style={{ color: '#6B7280' }}>No meals logged yet</Text>
                  </div>
                ) : (
                  meals.map((meal) => (
                    <div key={meal._id} style={{
                      padding: '16px 20px',
                      borderRadius: 12,
                      background: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                        <div style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 24
                        }}>
                          {getMealIcon(meal.mealType)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <Text strong style={{ fontSize: 15, display: 'block', marginBottom: 4 }}>
                            {meal.items.map(item => item.foodName).join(', ')}
                          </Text>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <ClockCircleOutlined style={{ fontSize: 12, color: '#9CA3AF' }} />
                            <Text style={{ fontSize: 13, color: '#6B7280' }}>
                              {dayjs(meal.date).format('HH:mm')}
                            </Text>
                          </div>
                        </div>
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16
                      }}>
                        <div style={{ textAlign: 'right' }}>
                          <Tag 
                            style={{
                              borderRadius: 8,
                              padding: '4px 12px',
                              border: 'none',
                              background: '#1F6AE1' + '15',
                              color: '#1F6AE1',
                              fontWeight: 600,
                              marginBottom: 4
                            }}
                          >
                            {meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}
                          </Tag>
                          <Text strong style={{ fontSize: 16, display: 'block' }}>
                            {Math.round(meal.totalNutrition.calories)} cal
                          </Text>
                        </div>
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteMeal(meal._id)}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8
                          }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </Space>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FoodLogger;
