import React from 'react';
import { Card, Row, Col, Typography, Button, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  CalculatorOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  DashboardOutlined,
  HeartOutlined,
  RiseOutlined,
  FallOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  TrophyOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'BMI Calculator',
      description: 'Instantly calculate your Body Mass Index and get personalized health recommendations based on your results.',
      icon: <CalculatorOutlined style={{ fontSize: 32 }} />,
      path: '/bmi-calculator',
      color: '#EBF4FF',
      iconBg: '#D6E8FF',
    },
    {
      title: 'Food Database',
      description: 'Access thousands of foods with detailed nutritional information. Search, compare, and make informed choices.',
      icon: <DatabaseOutlined style={{ fontSize: 32 }} />,
      path: '/food-database',
      color: '#FFF0F0',
      iconBg: '#FFD6D6',
    },
    {
      title: 'Food Logger',
      description: 'Log your meals effortlessly. Track calories, macros, and micronutrients with our intuitive logging system.',
      icon: <FileTextOutlined style={{ fontSize: 32 }} />,
      path: '/food-logger',
      color: '#E6F9F7',
      iconBg: '#C2F0EA',
    },
    {
      title: 'Personal Dashboard',
      description: 'View your health metrics at a glance. Beautiful charts and insights to keep you motivated.',
      icon: <DashboardOutlined style={{ fontSize: 32 }} />,
      path: '/nutrition-dashboard',
      color: '#F0F9FF',
      iconBg: '#DBEAFE',
    },
    {
      title: 'Goal Setting',
      description: 'Set personalized health goals and track your progress. Get reminders and celebrate milestones.',
      icon: <TrophyOutlined style={{ fontSize: 32 }} />,
      path: '/nutrition-dashboard',
      color: '#FFF8E6',
      iconBg: '#FFEDB3',
    },
    {
      title: 'Progress Tracking',
      description: 'Visualize your journey with detailed analytics. Understand trends and optimize your health routine.',
      icon: <LineChartOutlined style={{ fontSize: 32 }} />,
      path: '/nutrition-dashboard',
      color: '#F5F3FF',
      iconBg: '#E9E3FF',
    },
  ];

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1F6AE1 0%, #1557B0 50%, #2FB9A8 100%)',
          borderRadius: '0 0 48px 48px',
          padding: '80px 24px 100px',
          marginBottom: -40,
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <Badge
            count="Your Health, Our Priority"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: 14,
              padding: '8px 20px',
              height: 'auto',
              borderRadius: 20,
              marginBottom: 24,
            }}
          />
          <Title
            level={1}
            style={{
              color: 'white',
              marginBottom: 24,
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Take Control of Your
            <br />
            <span style={{ color: '#B3D9FF' }}>Health Journey</span>
          </Title>
          <Paragraph
            style={{
              fontSize: 20,
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: 700,
              margin: '0 auto 48px',
              lineHeight: 1.6,
            }}
          >
            Healio helps you track your nutrition, calculate BMI, log meals, and monitor
            your wellness goals — all in one beautifully designed app.
          </Paragraph>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/bmi-calculator')}
              icon={<ArrowRightOutlined />}
              style={{
                height: 56,
                fontSize: 18,
                padding: '0 40px',
                borderRadius: 12,
                background: 'white',
                color: '#14B8A6',
                border: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
              Start Free Trial
            </Button>
            <Button
              size="large"
              onClick={() => navigate('/food-database')}
              icon={<PlayCircleOutlined />}
              style={{
                height: 56,
                fontSize: 18,
                padding: '0 40px',
                borderRadius: 12,
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                fontWeight: 600,
              }}
            >
              Watch Demo
            </Button>
          </div>
          <div
            style={{
              marginTop: 32,
              display: 'flex',
              gap: 24,
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <span>✓ No credit card required</span>
            <span>✓ 14-day free trial</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <Card
              style={{
                borderRadius: 16,
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                textAlign: 'center',
                padding: '24px 0',
              }}
            >
              <CheckCircleOutlined style={{ fontSize: 32, color: '#2FB9A8', marginBottom: 12 }} />
              <Title level={5} style={{ margin: '8px 0 4px', color: '#64748B' }}>
                HIPAA Compliant
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              style={{
                borderRadius: 16,
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                textAlign: 'center',
                padding: '24px 0',
              }}
            >
              <UserOutlined style={{ fontSize: 32, color: '#2FB9A8', marginBottom: 12 }} />
              <Title level={5} style={{ margin: '8px 0 4px', color: '#64748B' }}>
                50K+ Active Users
              </Title>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Features Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Badge
            count="Features"
            style={{
              backgroundColor: '#EBF4FF',
              color: '#1F6AE1',
              fontSize: 14,
              padding: '6px 16px',
              height: 'auto',
              borderRadius: 20,
              marginBottom: 16,
            }}
          />
          <Title level={2} style={{ fontSize: 42, fontWeight: 700, marginBottom: 16, color: '#1A1A1A' }}>
            Everything You Need to <span style={{ color: '#1F6AE1' }}>Stay Healthy</span>
          </Title>
          <Paragraph style={{ fontSize: 18, color: '#6B7280', maxWidth: 700, margin: '0 auto' }}>
            Comprehensive tools designed to help you achieve your wellness goals with ease and
            precision.
          </Paragraph>
        </div>
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                onClick={() => navigate(feature.path)}
                style={{
                  height: '100%',
                  borderRadius: 20,
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                bodyStyle={{ padding: 32 }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 16,
                    background: feature.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                    color: '#1F2937',
                  }}
                >
                  {feature.icon}
                </div>
                <Title level={4} style={{ marginBottom: 12, fontSize: 20, fontWeight: 600, color: '#1A1A1A' }}>
                  {feature.title}
                </Title>
                <Paragraph style={{ marginBottom: 0, color: '#6B7280', fontSize: 15, lineHeight: 1.6 }}>
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <Card
          style={{
            background: 'linear-gradient(135deg, #1F6AE1 0%, #1557B0 50%, #2FB9A8 100%)',
            border: 'none',
            borderRadius: 24,
            textAlign: 'center',
            padding: '60px 40px',
            boxShadow: '0 20px 60px rgba(31, 106, 225, 0.3)',
          }}
        >
          <Badge
            count="Start Your Journey Today"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: 14,
              padding: '8px 20px',
              height: 'auto',
              borderRadius: 20,
              marginBottom: 24,
            }}
          />
          <Title level={2} style={{ color: 'white', marginBottom: 20, fontSize: 38, fontWeight: 700 }}>
            Ready to Transform Your Health?
          </Title>
          <Paragraph
            style={{
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: 18,
              marginBottom: 40,
              maxWidth: 600,
              margin: '0 auto 40px',
            }}
          >
            Join thousands of users who have already taken control of their wellness journey with
            Healio.
          </Paragraph>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/bmi-calculator')}
              icon={<ArrowRightOutlined />}
              style={{
                height: 56,
                fontSize: 18,
                padding: '0 40px',
                borderRadius: 12,
                background: 'white',
                color: '#14B8A6',
                border: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
              Get Started Free
            </Button>
            <Button
              size="large"
              style={{
                height: 56,
                fontSize: 18,
                padding: '0 40px',
                borderRadius: 12,
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                fontWeight: 600,
              }}
            >
              Contact Sales
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
