import React, { useState } from 'react';
import { Card, Form, InputNumber, Button, Typography, Radio, Space, Row, Col } from 'antd';
import { calculateBMI } from '../services/api';

const { Title, Text, Paragraph } = Typography;

interface BMIResult {
  bmi: number;
  category: string;
  healthyWeightRange: {
    min: number;
    max: number;
  };
  recommendations: string[];
}

type UnitSystem = 'metric' | 'imperial';

const BMICalculator: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BMIResult | null>(null);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');

  const onFinish = async (values: { height: number; weight: number }) => {
    setLoading(true);
    try {
      // Convert imperial to metric if needed
      let height = values.height;
      let weight = values.weight;
      
      if (unitSystem === 'imperial') {
        height = values.height * 2.54; // inches to cm
        weight = values.weight * 0.453592; // lbs to kg
      }
      
      const response = await calculateBMI(height, weight);
      if (response.success) {
        setResult(response.data);
      }
    } catch (error) {
      console.error('Error calculating BMI:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return '#1F6AE1';
      case 'Normal weight':
        return '#2FB9A8';
      case 'Overweight':
        return '#F59E0B';
      case 'Obese':
        return '#EF4444';
      default:
        return '#1F6AE1';
    }
  };

  const getBMIPosition = (bmi: number) => {
    if (bmi < 15) return 0;
    if (bmi > 40) return 100;
    return ((bmi - 15) / 25) * 100;
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 72px)',
      background: '#F2F4F7',
      padding: '0 48px 48px'
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: 48, paddingTop: 48 }}>
          <Title level={1} style={{ 
            fontSize: 42,
            fontWeight: 700,
            marginBottom: 16,
            color: '#1A1A1A'
          }}>
            Calculate Your <span style={{ 
              background: 'linear-gradient(135deg, #1F6AE1 0%, #2FB9A8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>BMI</span>
          </Title>
          <Paragraph style={{ 
            fontSize: 16,
            color: '#6B7280',
            maxWidth: 500,
            margin: '0 auto'
          }}>
            Body Mass Index (BMI) is a simple measure using your height and weight to work out if your weight is healthy.
          </Paragraph>
        </div>

        <Row gutter={32}>
          {/* Calculator Card */}
          <Col span={10}>
            <Card 
              style={{ 
                borderRadius: 20,
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                border: 'none',
                height: '100%'
              }}
            >
              <div style={{ padding: '16px 8px' }}>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <div style={{
                      width: 6,
                      height: 24,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #1F6AE1 0%, #2FB9A8 100%)'
                    }} />
                    <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                      Enter Your Details
                    </Title>
                  </div>
                  <Text style={{ color: '#6B7280', fontSize: 14 }}>
                    Choose your preferred unit system and enter your measurements
                  </Text>
                </div>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{ 
                    height: unitSystem === 'metric' ? 170 : 67,
                    weight: unitSystem === 'metric' ? 70 : 154
                  }}
                >
              {/* Unit System */}
              <Form.Item label={<Text strong>Unit System</Text>}>
                <Radio.Group 
                  value={unitSystem} 
                  onChange={(e) => {
                    setUnitSystem(e.target.value);
                    form.resetFields();
                  }}
                  size="large"
                  buttonStyle="solid"
                >
                  <Radio.Button value="metric">Metric (kg, cm)</Radio.Button>
                  <Radio.Button value="imperial">Imperial (lb, ft/in)</Radio.Button>
                </Radio.Group>
              </Form.Item>

              {/* Height */}
              <Form.Item
                label={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Text strong>Height</Text>
                  </div>
                }
                name="height"
                rules={[
                  { required: true, message: 'Please enter your height' },
                  { 
                    type: 'number', 
                    min: unitSystem === 'metric' ? 50 : 20, 
                    max: unitSystem === 'metric' ? 300 : 118,
                    message: `Height must be between ${unitSystem === 'metric' ? '50-300 cm' : '20-118 inches'}`
                  },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  size="large"
                  placeholder={unitSystem === 'metric' ? '244' : '96'}
                  suffix={unitSystem === 'metric' ? 'cm' : 'in'}
                  min={unitSystem === 'metric' ? 50 : 20}
                  max={unitSystem === 'metric' ? 300 : 118}
                />
              </Form.Item>

              {/* Weight */}
              <Form.Item
                label={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Text strong>Weight</Text>
                  </div>
                }
                name="weight"
                rules={[
                  { required: true, message: 'Please enter your weight' },
                  { 
                    type: 'number', 
                    min: unitSystem === 'metric' ? 20 : 44, 
                    max: unitSystem === 'metric' ? 500 : 1102,
                    message: `Weight must be between ${unitSystem === 'metric' ? '20-500 kg' : '44-1102 lbs'}`
                  },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  size="large"
                  placeholder={unitSystem === 'metric' ? '70' : '154'}
                  suffix={unitSystem === 'metric' ? 'kg' : 'lb'}
                  min={unitSystem === 'metric' ? 20 : 44}
                  max={unitSystem === 'metric' ? 500 : 1102}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
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
                  Calculate BMI
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Col>

      {/* Result Card */}
      <Col span={14}>
        {result ? (
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <Card 
              style={{ 
                borderRadius: 20,
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                border: 'none',
                background: '#F9FAFB'
              }}
            >
              <div style={{ padding: '16px 8px', textAlign: 'center' }}>
                <Text style={{ color: '#6B7280', fontSize: 14, display: 'block', marginBottom: 12 }}>
                  Your BMI
                </Text>
                <Title level={1} style={{ 
                  fontSize: 64,
                  fontWeight: 700,
                  margin: '0 0 12px 0',
                  color: getCategoryColor(result.category)
                }}>
                  {result.bmi.toFixed(1)}
                </Title>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 24px',
                  borderRadius: 24,
                  background: getCategoryColor(result.category) + '15',
                  marginBottom: 32
                }}>
                  <Text style={{ 
                    color: getCategoryColor(result.category),
                    fontSize: 16,
                    fontWeight: 600
                  }}>
                    {result.category}
                  </Text>
                </div>

                {/* BMI Scale */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    height: 12,
                    borderRadius: 6,
                    background: 'linear-gradient(90deg, #1F6AE1 0%, #2FB9A8 25%, #F59E0B 50%, #EF4444 100%)',
                    position: 'relative',
                    marginBottom: 12
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: `${getBMIPosition(result.bmi)}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'white',
                      border: `3px solid ${getCategoryColor(result.category)}`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }} />
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: 12,
                    color: '#6B7280'
                  }}>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>Underweight</Text>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>Normal</Text>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>Overweight</Text>
                    <Text style={{ fontSize: 12, color: '#6B7280' }}>Obese</Text>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: 11,
                    color: '#9CA3AF',
                    marginTop: 4
                  }}>
                    <Text style={{ fontSize: 11, color: '#9CA3AF' }}>15</Text>
                    <Text style={{ fontSize: 11, color: '#9CA3AF' }}>18.5</Text>
                    <Text style={{ fontSize: 11, color: '#9CA3AF' }}>25</Text>
                    <Text style={{ fontSize: 11, color: '#9CA3AF' }}>30</Text>
                    <Text style={{ fontSize: 11, color: '#9CA3AF' }}>40</Text>
                  </div>
                </div>

                {/* Healthy Weight Range */}
                <div style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: '16px',
                  textAlign: 'left'
                }}>
                  <Text style={{ color: '#6B7280', fontSize: 13, display: 'block', marginBottom: 8 }}>
                    Healthy Weight Range
                  </Text>
                  <Title level={4} style={{ margin: 0, color: '#1A1A1A' }}>
                    {result.healthyWeightRange.min} - {result.healthyWeightRange.max} kg
                  </Title>
                </div>
              </div>
            </Card>

            {/* Recommendations Card */}
            <Card 
              style={{ 
                borderRadius: 20,
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                border: 'none'
              }}
            >
              <div style={{ padding: '8px' }}>
                <div style={{ marginBottom: 20 }}>
                  <Title level={4} style={{ margin: 0, fontWeight: 600, marginBottom: 8 }}>
                    Recommendations
                  </Title>
                  <Text style={{ color: '#6B7280', fontSize: 14 }}>
                    Personalized tips based on your BMI
                  </Text>
                </div>
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                  {result.recommendations.map((rec, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      gap: 12,
                      padding: '12px',
                      borderRadius: 8,
                      background: '#F9FAFB'
                    }}>
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1F6AE1 0%, #2FB9A8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2
                      }}>
                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
                          {index + 1}
                        </Text>
                      </div>
                      <Text style={{ color: '#1A1A1A', fontSize: 14, lineHeight: '1.6' }}>
                        {rec}
                      </Text>
                    </div>
                  ))}
                </Space>
              </div>
            </Card>
          </Space>
        ) : (
          <Card 
            style={{ 
              borderRadius: 20,
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              border: '2px dashed #E5E7EB',
              background: '#FAFAFA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 500
            }}
          >
            <div style={{ textAlign: 'center', padding: 48 }}>
              <div style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1F6AE1 0%, #2FB9A8 100%)',
                opacity: 0.1,
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  fontSize: 48,
                  opacity: 0.5
                }}>📊</div>
              </div>
              <Title level={3} style={{ color: '#6B7280', fontWeight: 600, marginBottom: 12 }}>
                Your Results Will Appear Here
              </Title>
              <Text style={{ color: '#9CA3AF', fontSize: 15, display: 'block', maxWidth: 300, margin: '0 auto' }}>
                Enter your height and weight, then click calculate to see your BMI and personalized recommendations
              </Text>
            </div>
          </Card>
        )}
      </Col>
    </Row>

    {/* BMI Categories */}
    <Card 
      style={{ 
        borderRadius: 20,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        border: 'none',
        marginTop: 32
      }}
    >
      <div style={{ padding: '8px' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ margin: 0, fontWeight: 600, marginBottom: 8 }}>
            BMI Categories
          </Title>
          <Text style={{ color: '#6B7280', fontSize: 14 }}>
            Understanding BMI ranges and what they mean
          </Text>
        </div>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          {[
            { range: '< 18.5', label: 'Underweight', color: '#1F6AE1' },
            { range: '18.5 - 24.9', label: 'Normal', color: '#2FB9A8' },
            { range: '25 - 29.9', label: 'Overweight', color: '#F59E0B' },
            { range: '≥ 30', label: 'Obese', color: '#EF4444' },
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px',
              borderRadius: 12,
              background: '#F9FAFB',
              border: '1px solid #E5E7EB'
            }}>
              <div>
                <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 4 }}>
                  {item.range}
                </Text>
                <Text style={{ color: '#6B7280', fontSize: 14 }}>
                  {item.label}
                </Text>
              </div>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: item.color + '15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: item.color
                }} />
              </div>
            </div>
          ))}
        </Space>
      </div>
    </Card>
      </div>
    </div>
  );
};

export default BMICalculator;
