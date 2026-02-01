import React, { useState, useEffect } from 'react';
import {
  Card,
  DatePicker,
  Typography,
  Row,
  Col,
  Progress,
  Statistic,
  Space,
  Divider,
  List,
  Tag,
} from 'antd';
import {
  DashboardOutlined,
  FireOutlined,
  ThunderboltOutlined,
  AppleOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { getNutritionSummary, getMealsByDate } from '../services/api';

const { Title, Text, Paragraph } = Typography;

interface NutritionData {
  consumed: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  goals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  remaining: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  percentages: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const NutritionDashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock user ID - in real app, this would come from auth context
  const userId = '507f1f77bcf86cd799439011';

  useEffect(() => {
    fetchNutritionSummary();
  }, [selectedDate]);

  const fetchNutritionSummary = async () => {
    setLoading(true);
    try {
      const response = await getNutritionSummary(userId, selectedDate.format('YYYY-MM-DD'));
      if (response.success) {
        setNutritionData(response.data);
      }
    } catch (error) {
      console.error('Error fetching nutrition summary:', error);
      setNutritionData(null);
    } finally {
      setLoading(false);
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return '#52c41a';
    if (percentage < 80) return '#faad14';
    if (percentage <= 100) return '#1890ff';
    return '#f5222d';
  };

  const getProgressStatus = (percentage: number) => {
    if (percentage > 100) return 'exception';
    if (percentage >= 80) return 'success';
    return 'active';
  };

  const nutritionItems = nutritionData
    ? [
        {
          key: 'calories',
          title: 'Calories',
          icon: <FireOutlined style={{ fontSize: 24, color: '#f5222d' }} />,
          consumed: nutritionData.consumed.calories,
          goal: nutritionData.goals.calories,
          remaining: nutritionData.remaining.calories,
          percentage: nutritionData.percentages.calories,
          unit: 'kcal',
          color: '#f5222d',
        },
        {
          key: 'protein',
          title: 'Protein',
          icon: <ThunderboltOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
          consumed: nutritionData.consumed.protein,
          goal: nutritionData.goals.protein,
          remaining: nutritionData.remaining.protein,
          percentage: nutritionData.percentages.protein,
          unit: 'g',
          color: '#52c41a',
        },
        {
          key: 'carbs',
          title: 'Carbohydrates',
          icon: <AppleOutlined style={{ fontSize: 24, color: '#faad14' }} />,
          consumed: nutritionData.consumed.carbs,
          goal: nutritionData.goals.carbs,
          remaining: nutritionData.remaining.carbs,
          percentage: nutritionData.percentages.carbs,
          unit: 'g',
          color: '#faad14',
        },
        {
          key: 'fat',
          title: 'Fat',
          icon: <HeartOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
          consumed: nutritionData.consumed.fat,
          goal: nutritionData.goals.fat,
          remaining: nutritionData.remaining.fat,
          percentage: nutritionData.percentages.fat,
          unit: 'g',
          color: '#1890ff',
        },
      ]
    : [];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        <DashboardOutlined /> Nutrition Dashboard
      </Title>

      <Card style={{ marginBottom: 24, borderRadius: 12 }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong>Select Date:</Text>
            <DatePicker
              value={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
              style={{ marginLeft: 16 }}
              size="large"
              format="YYYY-MM-DD"
            />
          </div>
        </Space>
      </Card>

      {nutritionData ? (
        <>
          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            {nutritionItems.map((item) => (
              <Col xs={24} sm={12} lg={6} key={item.key}>
                <Card
                  style={{
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}05 100%)`,
                  }}
                >
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {item.icon}
                      <Tag color={item.percentage > 100 ? 'red' : 'blue'}>
                        {item.percentage}%
                      </Tag>
                    </div>
                    <Title level={5} style={{ margin: 0 }}>
                      {item.title}
                    </Title>
                    <Statistic
                      value={Math.round(item.consumed)}
                      suffix={`/ ${Math.round(item.goal)} ${item.unit}`}
                      valueStyle={{ fontSize: 20, color: item.color }}
                    />
                    <Progress
                      percent={item.percentage}
                      strokeColor={getProgressColor(item.percentage)}
                      status={getProgressStatus(item.percentage)}
                      showInfo={false}
                    />
                    <Text type="secondary">
                      {item.remaining > 0
                        ? `${Math.round(item.remaining)} ${item.unit} remaining`
                        : `${Math.abs(Math.round(item.remaining))} ${item.unit} over goal`}
                    </Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title="Daily Progress" style={{ borderRadius: 12 }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {nutritionItems.map((item) => (
                    <div key={item.key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text strong>{item.title}</Text>
                        <Text>
                          {Math.round(item.consumed)} / {Math.round(item.goal)} {item.unit}
                        </Text>
                      </div>
                      <Progress
                        percent={item.percentage}
                        strokeColor={item.color}
                        status={getProgressStatus(item.percentage)}
                      />
                    </div>
                  ))}
                </Space>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Nutrition Insights" style={{ borderRadius: 12 }}>
                <List
                  dataSource={[
                    {
                      title: 'Calorie Status',
                      description:
                        nutritionData.percentages.calories < 80
                          ? 'You have room for more calories today. Consider adding a healthy snack.'
                          : nutritionData.percentages.calories <= 100
                          ? 'Great! You\'re on track with your calorie goal.'
                          : 'You\'ve exceeded your calorie goal. Try lighter options for remaining meals.',
                    },
                    {
                      title: 'Protein Intake',
                      description:
                        nutritionData.percentages.protein < 80
                          ? 'Your protein intake is low. Add protein-rich foods like chicken, fish, or legumes.'
                          : 'Excellent protein intake! Keep it up for muscle maintenance and growth.',
                    },
                    {
                      title: 'Carbohydrate Balance',
                      description:
                        nutritionData.percentages.carbs < 80
                          ? 'You need more carbs for energy. Include whole grains, fruits, or vegetables.'
                          : nutritionData.percentages.carbs <= 100
                          ? 'Your carb intake is well-balanced for sustained energy.'
                          : 'Consider reducing carb portions in your next meals.',
                    },
                    {
                      title: 'Fat Consumption',
                      description:
                        nutritionData.percentages.fat < 80
                          ? 'Include healthy fats like avocado, nuts, or olive oil.'
                          : nutritionData.percentages.fat <= 100
                          ? 'Good balance of healthy fats in your diet.'
                          : 'You\'ve consumed enough fats for today. Choose lean options.',
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<Text strong>{item.title}</Text>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>

          <Card style={{ marginTop: 24, borderRadius: 12 }}>
            <Title level={4}>What You Need to Complete Your Daily Goals</Title>
            <Divider />
            <Row gutter={[16, 16]}>
              {nutritionItems.map((item) => (
                item.remaining > 0 && (
                  <Col xs={24} sm={12} lg={6} key={item.key}>
                    <Card
                      size="small"
                      style={{ background: `${item.color}10`, border: `1px solid ${item.color}30` }}
                    >
                      <Statistic
                        title={item.title}
                        value={Math.round(item.remaining)}
                        suffix={item.unit}
                        valueStyle={{ color: item.color, fontSize: 24 }}
                        prefix={item.icon}
                      />
                    </Card>
                  </Col>
                )
              ))}
            </Row>
            {nutritionItems.every((item) => item.remaining <= 0) && (
              <Paragraph style={{ textAlign: 'center', fontSize: 16, marginTop: 16 }}>
                🎉 Congratulations! You've met all your nutritional goals for today!
              </Paragraph>
            )}
          </Card>
        </>
      ) : (
        <Card style={{ borderRadius: 12, textAlign: 'center', padding: 40 }}>
          <DashboardOutlined style={{ fontSize: 64, color: '#d9d9d9', marginBottom: 16 }} />
          <Paragraph style={{ color: '#8c8c8c' }}>
            No nutrition data available for this date. Start logging your meals to see your progress!
          </Paragraph>
        </Card>
      )}
    </div>
  );
};

export default NutritionDashboard;
