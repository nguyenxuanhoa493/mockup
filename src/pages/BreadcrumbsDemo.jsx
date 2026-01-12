import React, { useState } from 'react';
import { Card, Space, Typography, Divider, Radio, Slider, Button, Tooltip, Dropdown } from 'antd';
import { HomeOutlined, RightOutlined, MoreOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const generateBreadcrumbs = (levels, longNames = false) => {
  const breadcrumbs = [{ label: 'Home', href: '/' }];
  
  const names = longNames 
    ? [
        'Administration & Management',
        'Human Resources Department',
        'Employee Records & Documentation',
        'Performance Management System',
        'Annual Review & Evaluation Process',
        'Department of Sales & Marketing',
        'Regional Sales Operations Center',
        'Customer Relationship Management',
        'Lead Generation & Qualification',
        'Sales Pipeline & Forecasting Tools',
        'Marketing Campaign Management',
        'Digital Marketing & Social Media',
        'Content Creation & Distribution',
        'Search Engine Optimization Strategy',
        'Email Marketing Automation Platform',
        'Analytics & Reporting Dashboard',
        'Customer Segmentation & Targeting',
        'Brand Management & Positioning',
        'Product Launch & Go-to-Market',
        'Market Research & Competitive Analysis'
      ]
    : [
        'Products',
        'Electronics',
        'Computers',
        'Laptops',
        'Gaming',
        'Accessories',
        'Keyboards',
        'Mechanical',
        'RGB',
        'Brands',
        'Razer',
        'Models',
        '2024',
        'BlackWidow',
        'V4',
        'Pro',
        'Details',
        'Specs',
        'Reviews',
        'Purchase'
      ];
  
  for (let i = 0; i < levels - 1; i++) {
    breadcrumbs.push({
      label: names[i % names.length],
      href: `/${names[i % names.length].toLowerCase().replace(/\s+/g, '-')}`
    });
  }
  
  return breadcrumbs;
};

const CollapsedBreadcrumb = ({ items, maxVisible = 3 }) => {
  if (items.length <= maxVisible) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <a 
              href={item.href} 
              style={{ 
                color: index === items.length - 1 ? '#000' : '#1677ff',
                fontWeight: index === items.length - 1 ? 600 : 400,
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'inline-block'
              }}
            >
              {item.label}
            </a>
            {index < items.length - 1 && <RightOutlined style={{ fontSize: '12px', color: '#999' }} />}
          </React.Fragment>
        ))}
      </div>
    );
  }

  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const hiddenItems = items.slice(1, -1);

  const menuItems = hiddenItems.map((item, index) => ({
    key: index,
    label: <a href={item.href}>{item.label}</a>,
  }));

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
      <a href={firstItem.href} style={{ color: '#1677ff' }}>
        {firstItem.label}
      </a>
      <RightOutlined style={{ fontSize: '12px', color: '#999' }} />
      <Dropdown menu={{ items: menuItems }} placement="bottom">
        <Button 
          type="text" 
          icon={<EllipsisOutlined />} 
          size="small"
          style={{ padding: '0 8px', height: '24px' }}
        />
      </Dropdown>
      <RightOutlined style={{ fontSize: '12px', color: '#999' }} />
      <Tooltip title={lastItem.label}>
        <span 
          style={{ 
            color: '#000',
            fontWeight: 600,
            maxWidth: '300px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'inline-block'
          }}
        >
          {lastItem.label}
        </span>
      </Tooltip>
    </div>
  );
};

const ScrollableBreadcrumb = ({ items }) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        paddingBottom: '8px',
        scrollbarWidth: 'thin',
      }}
      className="scrollable-breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Tooltip title={item.label}>
            <a 
              href={item.href} 
              style={{ 
                color: index === items.length - 1 ? '#000' : '#1677ff',
                fontWeight: index === items.length - 1 ? 600 : 400,
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'inline-block',
                flexShrink: 0
              }}
            >
              {item.label}
            </a>
          </Tooltip>
          {index < items.length - 1 && (
            <RightOutlined style={{ fontSize: '12px', color: '#999', flexShrink: 0 }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const ResponsiveBreadcrumb = ({ items }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (items.length <= 3 || expanded) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <Tooltip title={item.label}>
              <a 
                href={item.href} 
                style={{ 
                  color: index === items.length - 1 ? '#000' : '#1677ff',
                  fontWeight: index === items.length - 1 ? 600 : 400,
                  maxWidth: '250px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'inline-block'
                }}
              >
                {item.label}
              </a>
            </Tooltip>
            {index < items.length - 1 && <RightOutlined style={{ fontSize: '12px', color: '#999' }} />}
          </React.Fragment>
        ))}
        {expanded && (
          <Button 
            type="link" 
            size="small" 
            onClick={() => setExpanded(false)}
            style={{ padding: 0, height: 'auto' }}
          >
            Thu gọn
          </Button>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
      <a href={items[0].href} style={{ color: '#1677ff' }}>
        {items[0].label}
      </a>
      <RightOutlined style={{ fontSize: '12px', color: '#999' }} />
      <Button 
        type="link" 
        size="small" 
        onClick={() => setExpanded(true)}
        style={{ padding: 0, height: 'auto' }}
      >
        ... ({items.length - 2} cấp)
      </Button>
      <RightOutlined style={{ fontSize: '12px', color: '#999' }} />
      <Tooltip title={items[items.length - 1].label}>
        <span 
          style={{ 
            color: '#000',
            fontWeight: 600,
            maxWidth: '300px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'inline-block'
          }}
        >
          {items[items.length - 1].label}
        </span>
      </Tooltip>
    </div>
  );
};

const TruncatedBreadcrumb = ({ items, maxWidth = 150 }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Tooltip title={item.label} placement="top">
            <a 
              href={item.href} 
              style={{ 
                color: index === items.length - 1 ? '#000' : '#1677ff',
                fontWeight: index === items.length - 1 ? 600 : 400,
                maxWidth: `${maxWidth}px`,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'inline-block'
              }}
            >
              {item.label}
            </a>
          </Tooltip>
          {index < items.length - 1 && <RightOutlined style={{ fontSize: '12px', color: '#999' }} />}
        </React.Fragment>
      ))}
    </div>
  );
};

const BreadcrumbsDemo = () => {
  const [levels, setLevels] = useState(10);
  const [longNames, setLongNames] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState('collapsed');

  const breadcrumbs = generateBreadcrumbs(levels, longNames);

  const renderBreadcrumb = () => {
    switch(selectedStrategy) {
      case 'collapsed':
        return <CollapsedBreadcrumb items={breadcrumbs} maxVisible={3} />;
      case 'scrollable':
        return <ScrollableBreadcrumb items={breadcrumbs} />;
      case 'responsive':
        return <ResponsiveBreadcrumb items={breadcrumbs} />;
      case 'truncated':
        return <TruncatedBreadcrumb items={breadcrumbs} maxWidth={150} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <style>
        {`
          .scrollable-breadcrumb::-webkit-scrollbar {
            height: 6px;
          }
          .scrollable-breadcrumb::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }
          .scrollable-breadcrumb::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }
          .scrollable-breadcrumb::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Title level={2}>
            <HomeOutlined style={{ marginRight: 8 }} />
            Breadcrumbs Demo - Xử lý nhiều cấp độ
          </Title>
          <Paragraph type="secondary">
            Demo các chiến lược UI/UX để xử lý breadcrumbs với nhiều level (tới 20 cấp) và tên dài.
            Tất cả các phương án đều responsive và có tooltip khi hover vào các item bị truncate.
          </Paragraph>
        </Card>

        <Card title="⚙️ Cài đặt Test">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Số lượng level: {levels}</Text>
              <Slider 
                min={2} 
                max={20} 
                value={levels} 
                onChange={setLevels}
                marks={{ 2: '2', 5: '5', 10: '10', 15: '15', 20: '20' }}
              />
            </div>
            
            <div>
              <Radio.Group 
                value={longNames} 
                onChange={(e) => setLongNames(e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value={false}>Tên ngắn</Radio.Button>
                <Radio.Button value={true}>Tên dài</Radio.Button>
              </Radio.Group>
            </div>

            <div>
              <Text strong style={{ display: 'block', marginBottom: 8 }}>Chọn chiến lược hiển thị:</Text>
              <Radio.Group 
                value={selectedStrategy} 
                onChange={(e) => setSelectedStrategy(e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value="collapsed">Collapsed (Khuyến nghị)</Radio.Button>
                <Radio.Button value="scrollable">Scrollable</Radio.Button>
                <Radio.Button value="responsive">Responsive</Radio.Button>
                <Radio.Button value="truncated">Truncated</Radio.Button>
              </Radio.Group>
            </div>
          </Space>
        </Card>

        <Card 
          title={
            <Space>
              <span>🎯 Preview - </span>
              {selectedStrategy === 'collapsed' && 'Collapsed Strategy'}
              {selectedStrategy === 'scrollable' && 'Scrollable Strategy'}
              {selectedStrategy === 'responsive' && 'Responsive Strategy'}
              {selectedStrategy === 'truncated' && 'Truncated Strategy'}
            </Space>
          }
        >
          <div style={{ 
            padding: '20px', 
            background: '#fafafa', 
            borderRadius: '8px',
            minHeight: '80px',
            display: 'flex',
            alignItems: 'center'
          }}>
            {renderBreadcrumb()}
          </div>
        </Card>

        <Divider />

        <Card title="📊 So sánh các chiến lược">
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={5}>1. Collapsed (Khuyến nghị) ⭐</Title>
              <Paragraph type="secondary">
                Chỉ hiển thị đầu, cuối và ẩn các level ở giữa vào dropdown. Tốt nhất cho nhiều level.
              </Paragraph>
              <div style={{ 
                padding: '16px', 
                background: '#fafafa', 
                borderRadius: '8px',
                border: '2px solid #1677ff'
              }}>
                <CollapsedBreadcrumb items={breadcrumbs} maxVisible={3} />
              </div>
              <div style={{ marginTop: 8 }}>
                <Text strong style={{ color: '#52c41a' }}>Ưu điểm:</Text>
                <ul style={{ marginTop: 4 }}>
                  <li>Tiết kiệm không gian tốt nhất</li>
                  <li>Luôn hiển thị context (đầu và cuối)</li>
                  <li>Truy cập được tất cả các level qua dropdown</li>
                  <li>Responsive tốt trên mobile</li>
                </ul>
                <Text strong style={{ color: '#ff4d4f' }}>Nhược điểm:</Text>
                <ul style={{ marginTop: 4 }}>
                  <li>Cần thêm 1 click để xem các level ẩn</li>
                </ul>
              </div>
            </div>

            <Divider dashed />

            <div>
              <Title level={5}>2. Scrollable</Title>
              <Paragraph type="secondary">
                Hiển thị tất cả các level, cho phép scroll ngang. Phù hợp khi muốn xem full path.
              </Paragraph>
              <div style={{ 
                padding: '16px', 
                background: '#fafafa', 
                borderRadius: '8px'
              }}>
                <ScrollableBreadcrumb items={breadcrumbs} />
              </div>
              <div style={{ marginTop: 8 }}>
                <Text strong style={{ color: '#52c41a' }}>Ưu điểm:</Text>
                <ul style={{ marginTop: 4 }}>
                  <li>Hiển thị đầy đủ tất cả các level</li>
                  <li>Không bị ẩn thông tin</li>
                  <li>Dễ navigation giữa các level</li>
                </ul>
                <Text strong style={{ color: '#ff4d4f' }}>Nhược điểm:</Text>
                <ul style={{ marginTop: 4 }}>
                  <li>Cần scroll để xem hết (không thân thiện với mouse)</li>
                  <li>Khó sử dụng trên mobile</li>
                  <li>Mất nhiều không gian chiều cao (có scrollbar)</li>
                </ul>
              </div>
            </div>

            <Divider dashed />

            <div>
              <Title level={5}>3. Responsive</Title>
              <Paragraph type="secondary">
                Tự động thu gọn khi có quá nhiều level, có thể expand để xem đầy đủ.
              </Paragraph>
              <div style={{ 
                padding: '16px', 
                background: '#fafafa', 
                borderRadius: '8px'
              }}>
                <ResponsiveBreadcrumb items={breadcrumbs} />
              </div>
              <div style={{ marginTop: 8 }}>
                <Text strong style={{ color: '#52c41a' }}>Ưu điểm:</Text>
                <ul style={{ marginTop: 4 }}>
                  <li>Linh hoạt, có thể expand khi cần</li>
                  <li>Hiển thị số lượng level bị ẩn</li>
                  <li>Tốt cho user muốn kiểm soát</li>
                </ul>
                <Text strong style={{ color: '#ff4d4f' }}>Nhược điểm:</Text>
                <ul style={{ marginTop: 4 }}>
                  <li>Khi expand sẽ chiếm nhiều không gian (wrap xuống dòng)</li>
                  <li>Phức tạp hơn về interaction</li>
                </ul>
              </div>
            </div>

            <Divider dashed />

            <div>
              <Title level={5}>4. Truncated</Title>
              <Paragraph type="secondary">
                Truncate từng item với độ dài cố định, hiển thị full text qua tooltip.
              </Paragraph>
              <div style={{ 
                padding: '16px', 
                background: '#fafafa', 
                borderRadius: '8px'
              }}>
                <TruncatedBreadcrumb items={breadcrumbs} maxWidth={150} />
              </div>
              <div style={{ marginTop: 8 }}>
                <Text strong style={{ color: '#52c41a' }}>Ưu điểm:</Text>
                <ul style={{ marginTop: 4 }}>
                  <li>Giữ được cấu trúc đầy đủ của breadcrumb</li>
                  <li>Độ dài có thể kiểm soát</li>
                  <li>Tooltip hiển thị full text</li>
                </ul>
                <Text strong style={{ color: '#ff4d4f' }}>Nhược điểm:</Text>
                <ul style={{ marginTop: 4 }}>
                  <li>Vẫn chiếm nhiều không gian khi có nhiều level</li>
                  <li>Text bị cắt có thể gây khó hiểu</li>
                  <li>Không tốt cho mobile</li>
                </ul>
              </div>
            </div>
          </Space>
        </Card>

        <Card>
          <Title level={4}>💡 Khuyến nghị sử dụng</Title>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong style={{ color: '#1677ff' }}>Desktop (≥ 768px):</Text>
              <Paragraph>
                → Sử dụng <Text code>Collapsed</Text> strategy với maxVisible = 3-4
              </Paragraph>
            </div>
            <div>
              <Text strong style={{ color: '#1677ff' }}>Tablet (768px - 1024px):</Text>
              <Paragraph>
                → Sử dụng <Text code>Collapsed</Text> strategy với maxVisible = 2-3
              </Paragraph>
            </div>
            <div>
              <Text strong style={{ color: '#1677ff' }}>Mobile (&lt; 768px):</Text>
              <Paragraph>
                → Sử dụng <Text code>Collapsed</Text> strategy với maxVisible = 2, hoặc chỉ hiển thị Back button + Current page
              </Paragraph>
            </div>
            <div>
              <Text strong style={{ color: '#1677ff' }}>Trường hợp đặc biệt (File manager, CMS):</Text>
              <Paragraph>
                → Có thể dùng <Text code>Scrollable</Text> strategy nếu user cần xem full path thường xuyên
              </Paragraph>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default BreadcrumbsDemo;
