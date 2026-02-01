import React from 'react';
import { Layout as AntLayout, Menu, Typography, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  CalculatorOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  DashboardOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = AntLayout;
const { Title, Text } = Typography;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/bmi-calculator',
      icon: <CalculatorOutlined />,
      label: 'BMI Calculator',
    },
    {
      key: '/food-database',
      icon: <DatabaseOutlined />,
      label: 'Food Database',
    },
    {
      key: '/food-logger',
      icon: <FileTextOutlined />,
      label: 'Food Logger',
    },
    {
      key: '/nutrition-dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
  ];

  return (
    <AntLayout style={{ minHeight: '100vh', background: '#F2F4F7' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          padding: '0 48px',
          height: 72,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginRight: 48,
          }}
          onClick={() => navigate('/')}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #1F6AE1 0%, #2FB9A8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <HeartOutlined style={{ fontSize: 20, color: 'white' }} />
          </div>
          <Title level={4} style={{ margin: 0, fontWeight: 700, color: '#1A1A1A' }}>
            Healio
          </Title>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            fontSize: 15,
            fontWeight: 500,
          }}
        />
        <Button
          type="primary"
          onClick={() => navigate('/bmi-calculator')}
          style={{
            height: 44,
            borderRadius: 10,
            background: '#1F6AE1',
            border: 'none',
            fontWeight: 600,
            fontSize: 15,
            padding: '0 28px',
          }}
        >
          Get Started
        </Button>
      </Header>
      <Content style={{ padding: 0, background: '#F2F4F7', minHeight: 'calc(100vh - 72px - 200px)' }}>
        {children}
      </Content>
      <Footer
        style={{
          background: '#1A1A1A',
          color: 'white',
          padding: '60px 48px 40px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 48,
              marginBottom: 48,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: 'linear-gradient(135deg, #1F6AE1 0%, #2FB9A8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}
                >
                  <HeartOutlined style={{ fontSize: 16, color: 'white' }} />
                </div>
                <Text strong style={{ color: 'white', fontSize: 18 }}>
                  Healio
                </Text>
              </div>
              <Text style={{ color: '#9CA3AF', fontSize: 14, display: 'block', lineHeight: 1.6 }}>
                Empowering you to take control of your health journey with innovative tools and
                personalized insights.
              </Text>
            </div>
            <div>
              <Text strong style={{ color: 'white', fontSize: 16, display: 'block', marginBottom: 16 }}>
                Product
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Text
                  style={{ color: '#9CA3AF', cursor: 'pointer' }}
                  onClick={() => navigate('/bmi-calculator')}
                >
                  BMI Calculator
                </Text>
                <Text
                  style={{ color: '#9CA3AF', cursor: 'pointer' }}
                  onClick={() => navigate('/food-database')}
                >
                  Food Database
                </Text>
                <Text
                  style={{ color: '#9CA3AF', cursor: 'pointer' }}
                  onClick={() => navigate('/food-logger')}
                >
                  Food Logger
                </Text>
                <Text
                  style={{ color: '#9CA3AF', cursor: 'pointer' }}
                  onClick={() => navigate('/nutrition-dashboard')}
                >
                  Dashboard
                </Text>
              </div>
            </div>
            <div>
              <Text strong style={{ color: 'white', fontSize: 16, display: 'block', marginBottom: 16 }}>
                Company
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Text style={{ color: '#9CA3AF' }}>About Us</Text>
                <Text style={{ color: '#9CA3AF' }}>Careers</Text>
                <Text style={{ color: '#9CA3AF' }}>Blog</Text>
                <Text style={{ color: '#9CA3AF' }}>Press</Text>
              </div>
            </div>
            <div>
              <Text strong style={{ color: 'white', fontSize: 16, display: 'block', marginBottom: 16 }}>
                Support
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Text style={{ color: '#9CA3AF' }}>Help Center</Text>
                <Text style={{ color: '#9CA3AF' }}>Contact Us</Text>
                <Text style={{ color: '#9CA3AF' }}>Privacy Policy</Text>
                <Text style={{ color: '#9CA3AF' }}>Terms of Service</Text>
              </div>
            </div>
          </div>
          <div
            style={{
              borderTop: '1px solid #333333',
              paddingTop: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <Text style={{ color: '#9CA3AF', fontSize: 14 }}>
              © {new Date().getFullYear()} Healio. All rights reserved.
            </Text>
            <div style={{ display: 'flex', gap: 16 }}>
              <Text style={{ color: '#9CA3AF', fontSize: 14 }}>📧 hello@healio.app</Text>
              <Text style={{ color: '#9CA3AF', fontSize: 14 }}>📞 +1 (555) 123-4567</Text>
            </div>
          </div>
        </div>
      </Footer>
    </AntLayout>
  );
};

export default Layout;
