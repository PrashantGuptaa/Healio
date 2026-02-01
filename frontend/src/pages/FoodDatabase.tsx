import React, { useState, useEffect } from 'react';
import {
  Card,
  Input,
  Select,
  Table,
  Typography,
  Space,
  Tag,
  Button,
  Modal,
  Descriptions,
  Row,
  Col,
} from 'antd';
import { SearchOutlined, DatabaseOutlined, EyeOutlined } from '@ant-design/icons';
import { getFoods, getCategories } from '../services/api';

const { Title, Text } = Typography;
const { Search } = Input;

interface Food {
  _id: string;
  name: string;
  category: string;
  servingSize: number;
  servingUnit: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
    calcium?: number;
    iron?: number;
    vitaminA?: number;
    vitaminC?: number;
    vitaminD?: number;
  };
  description?: string;
}

const FoodDatabase: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchFoods();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFoods = async (page = 1, search?: string, category?: string) => {
    setLoading(true);
    try {
      const response = await getFoods({
        page,
        limit: pagination.pageSize,
        search,
        category,
      });
      if (response.success) {
        setFoods(response.data);
        setPagination({
          ...pagination,
          current: response.pagination.page,
          total: response.pagination.total,
        });
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    fetchFoods(1, value, selectedCategory);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    fetchFoods(1, searchText, value);
  };

  const handleTableChange = (newPagination: any) => {
    fetchFoods(newPagination.current, searchText, selectedCategory);
  };

  const showFoodDetails = (food: Food) => {
    setSelectedFood(food);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: 'Serving',
      key: 'serving',
      render: (_: any, record: Food) => (
        <Text>{`${record.servingSize} ${record.servingUnit}`}</Text>
      ),
    },
    {
      title: 'Calories',
      dataIndex: ['nutrition', 'calories'],
      key: 'calories',
      render: (calories: number) => <Text>{calories} kcal</Text>,
      sorter: (a: Food, b: Food) => a.nutrition.calories - b.nutrition.calories,
    },
    {
      title: 'Protein',
      dataIndex: ['nutrition', 'protein'],
      key: 'protein',
      render: (protein: number) => <Text>{protein}g</Text>,
      sorter: (a: Food, b: Food) => a.nutrition.protein - b.nutrition.protein,
    },
    {
      title: 'Carbs',
      dataIndex: ['nutrition', 'carbs'],
      key: 'carbs',
      render: (carbs: number) => <Text>{carbs}g</Text>,
      sorter: (a: Food, b: Food) => a.nutrition.carbs - b.nutrition.carbs,
    },
    {
      title: 'Fat',
      dataIndex: ['nutrition', 'fat'],
      key: 'fat',
      render: (fat: number) => <Text>{fat}g</Text>,
      sorter: (a: Food, b: Food) => a.nutrition.fat - b.nutrition.fat,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Food) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showFoodDetails(record)}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 16px' }}>
      <Title level={2} style={{ textAlign: 'center', marginTop: 40, marginBottom: 40 }}>
        <DatabaseOutlined /> Food Database
      </Title>

      <Card style={{ marginBottom: 24, borderRadius: 12 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Search
              placeholder="Search foods by name..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              placeholder="Filter by category"
              allowClear
              size="large"
              style={{ width: '100%' }}
              onChange={handleCategoryChange}
              options={categories.map((cat) => ({ label: cat, value: cat }))}
            />
          </Col>
        </Row>
      </Card>

      <Card style={{ borderRadius: 12 }}>
        <Table
          columns={columns}
          dataSource={foods}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="_id"
          scroll={{ x: 1000 }}
        />
      </Card>

      <Modal
        title={selectedFood?.name}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedFood && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Category" span={2}>
                <Tag color="blue">{selectedFood.category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Serving Size" span={2}>
                {selectedFood.servingSize} {selectedFood.servingUnit}
              </Descriptions.Item>
              {selectedFood.description && (
                <Descriptions.Item label="Description" span={2}>
                  {selectedFood.description}
                </Descriptions.Item>
              )}
            </Descriptions>

            <div>
              <Title level={5}>Macronutrients</Title>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Calories">
                  {selectedFood.nutrition.calories} kcal
                </Descriptions.Item>
                <Descriptions.Item label="Protein">
                  {selectedFood.nutrition.protein}g
                </Descriptions.Item>
                <Descriptions.Item label="Carbohydrates">
                  {selectedFood.nutrition.carbs}g
                </Descriptions.Item>
                <Descriptions.Item label="Fat">
                  {selectedFood.nutrition.fat}g
                </Descriptions.Item>
                {selectedFood.nutrition.fiber !== undefined && (
                  <Descriptions.Item label="Fiber">
                    {selectedFood.nutrition.fiber}g
                  </Descriptions.Item>
                )}
                {selectedFood.nutrition.sugar !== undefined && (
                  <Descriptions.Item label="Sugar">
                    {selectedFood.nutrition.sugar}g
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>

            <div>
              <Title level={5}>Micronutrients</Title>
              <Descriptions bordered column={2}>
                {selectedFood.nutrition.sodium !== undefined && (
                  <Descriptions.Item label="Sodium">
                    {selectedFood.nutrition.sodium}mg
                  </Descriptions.Item>
                )}
                {selectedFood.nutrition.calcium !== undefined && (
                  <Descriptions.Item label="Calcium">
                    {selectedFood.nutrition.calcium}mg
                  </Descriptions.Item>
                )}
                {selectedFood.nutrition.iron !== undefined && (
                  <Descriptions.Item label="Iron">
                    {selectedFood.nutrition.iron}mg
                  </Descriptions.Item>
                )}
                {selectedFood.nutrition.vitaminA !== undefined && (
                  <Descriptions.Item label="Vitamin A">
                    {selectedFood.nutrition.vitaminA}mcg
                  </Descriptions.Item>
                )}
                {selectedFood.nutrition.vitaminC !== undefined && (
                  <Descriptions.Item label="Vitamin C">
                    {selectedFood.nutrition.vitaminC}mg
                  </Descriptions.Item>
                )}
                {selectedFood.nutrition.vitaminD !== undefined && (
                  <Descriptions.Item label="Vitamin D">
                    {selectedFood.nutrition.vitaminD}mcg
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default FoodDatabase;
