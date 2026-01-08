import React, { useState } from 'react';
import {
    Card,
    Table,
    Tag,
    Button,
    Space,
    Typography,
    Progress,
    Row,
    Col,
    Statistic,
    Avatar,
    Tooltip,
    Input,
    Select,
    Modal,
    message,
    Descriptions,
    Badge,
    Tabs
} from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    UserOutlined,
    SearchOutlined,
    FilterOutlined,
    SettingOutlined,
    ExportOutlined,
    EyeOutlined,
    CheckOutlined,
    ReloadOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const PassFailGradingPage = () => {
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [gradingCriteria, setGradingCriteria] = useState('average'); // average, absolute

    // Fake data for students/submissions
    const [data, setData] = useState([
        {
            key: '1',
            name: 'Nguyễn Văn An',
            studentId: 'SV001',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=An',
            submissionDate: '2023-10-25 09:30',
            score: 85,
            status: 'pass',
            criteriaResult: {
                attendance: 100,
                midterm: 8,
                final: 9
            },
            comment: 'Bài làm tốt, trình bày rõ ràng.'
        },
        {
            key: '2',
            name: 'Trần Thị Bình',
            studentId: 'SV002',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Binh',
            submissionDate: '2023-10-25 10:15',
            score: 45,
            status: 'fail',
            criteriaResult: {
                attendance: 80,
                midterm: 4,
                final: 5
            },
            comment: 'Cần cố gắng hơn ở phần lý thuyết.'
        },
        {
            key: '3',
            name: 'Lê Hoàng Cường',
            studentId: 'SV003',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong',
            submissionDate: '2023-10-25 11:00',
            score: 60,
            status: 'pass',
            criteriaResult: {
                attendance: 90,
                midterm: 6,
                final: 6
            },
            comment: 'Đạt yêu cầu cơ bản.'
        },
        {
            key: '4',
            name: 'Phạm Minh Dung',
            studentId: 'SV004',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dung',
            submissionDate: '2023-10-26 08:45',
            score: 92,
            status: 'pass',
            criteriaResult: {
                attendance: 100,
                midterm: 9,
                final: 9.5
            },
            comment: 'Xuất sắc!'
        },
        {
            key: '5',
            name: 'Vũ Thanh Tú',
            studentId: 'SV005',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tu',
            submissionDate: '2023-10-26 14:20',
            score: null,
            status: 'pending',
            criteriaResult: {
                attendance: 95,
                midterm: 7,
                final: null
            },
            comment: ''
        },
    ]);

    const handlePass = (record) => {
        updateStatus(record.key, 'pass');
        message.success(`Đã chấm ĐẠT cho sinh viên ${record.name}`);
    };

    const handleFail = (record) => {
        updateStatus(record.key, 'fail');
        message.warning(`Đã chấm KHÔNG ĐẠT cho sinh viên ${record.name}`);
    };

    const updateStatus = (key, status) => {
        const newData = data.map((item) => {
            if (item.key === key) {
                return { ...item, status, score: status === 'pass' ? (item.score || 70) : (item.score || 40) };
            }
            return item;
        });
        setData(newData);
    };

    const showDetail = (record) => {
        setSelectedSubmission(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Stats
    const total = data.length;
    const passed = data.filter(d => d.status === 'pass').length;
    const failed = data.filter(d => d.status === 'fail').length;
    const pending = data.filter(d => d.status === 'pending').length;
    const passRate = total > 0 ? Math.round((passed / (total - pending)) * 100) : 0;

    const columns = [
        {
            title: 'Sinh viên',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar src={record.avatar} icon={<UserOutlined />} />
                    <div>
                        <Text strong>{text}</Text>
                        <div style={{ fontSize: '12px', color: '#888' }}>{record.studentId}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'submissionDate',
            key: 'submissionDate',
            responsive: ['md'],
        },
        {
            title: 'Điểm số (TK)',
            dataIndex: 'score',
            key: 'score',
            render: (score) => score ? <Text strong>{score}</Text> : <Text type="secondary">--</Text>,
            sorter: (a, b) => (a.score || 0) - (b.score || 0),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'default';
                let text = 'Chờ chấm';
                let icon = <ReloadOutlined spin />;

                if (status === 'pass') {
                    color = 'success';
                    text = 'Đạt';
                    icon = <CheckCircleOutlined />;
                } else if (status === 'fail') {
                    color = 'error';
                    text = 'Chưa đạt';
                    icon = <CloseCircleOutlined />;
                }

                return (
                    <Tag color={color} icon={icon} style={{ padding: '4px 10px', fontSize: '13px' }}>
                        {text.toUpperCase()}
                    </Tag>
                );
            },
            filters: [
                { text: 'Đạt', value: 'pass' },
                { text: 'Chưa đạt', value: 'fail' },
                { text: 'Chờ chấm', value: 'pending' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Xem chi tiết">
                        <Button icon={<EyeOutlined />} size="small" onClick={() => showDetail(record)} />
                    </Tooltip>
                    {record.status === 'pending' && (
                        <>
                            <Tooltip title="Đạt">
                                <Button
                                    type="primary"
                                    icon={<CheckOutlined />}
                                    size="small"
                                    style={{ backgroundColor: '#52c41a' }}
                                    onClick={() => handlePass(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Không đạt">
                                <Button
                                    type="primary"
                                    danger
                                    icon={<CloseCircleOutlined />}
                                    size="small"
                                    onClick={() => handleFail(record)}
                                />
                            </Tooltip>
                        </>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '0px', minHeight: '100%', background: '#f5f7fa' }}>

            {/* Header Section */}
            <div style={{
                background: '#fff',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} md={12}>
                        <Title level={2} style={{ margin: 0 }}>Chấm điểm Đạt / Chưa đạt</Title>
                        <Text type="secondary">Quản lý kết quả học tập và đánh giá sinh viên theo tiêu chí P/F</Text>
                    </Col>
                    <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                        <Space>
                            <Button icon={<SettingOutlined />}>Cấu hình tiêu chí</Button>
                            <Button type="primary" icon={<ExportOutlined />}>Xuất báo cáo</Button>
                        </Space>
                    </Col>
                </Row>

                {/* Stats Row */}
                <Row gutter={24} style={{ marginTop: '32px' }}>
                    <Col span={6}>
                        <Statistic title="Tổng sinh viên" value={total} prefix={<UserOutlined />} />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="Đạt (Pass)"
                            value={passed}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="Chưa đạt (Fail)"
                            value={failed}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<CloseCircleOutlined />}
                        />
                    </Col>
                    <Col span={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                            <Text type="secondary">Tỷ lệ đạt</Text>
                            <Progress percent={passRate} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Main Content */}
            <Card bordered={false} style={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>

                {/* Toolbar */}
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <Input
                        placeholder="Tìm kiếm sinh viên..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <Space>
                        <Select defaultValue="all" style={{ width: 150 }}>
                            <Option value="all">Tất cả lớp</Option>
                            <Option value="classA">Lớp K65-CNTT</Option>
                            <Option value="classB">Lớp K65-DTVT</Option>
                        </Select>
                        <Button icon={<FilterOutlined />}>Bộ lọc</Button>
                    </Space>
                </div>

                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Danh sách sinh viên" key="1">
                        <Table
                            columns={columns}
                            dataSource={data.filter(item =>
                                item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                item.studentId.toLowerCase().includes(searchText.toLowerCase())
                            )}
                            pagination={{ pageSize: 5 }}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Phân bố điểm" key="2">
                        <div style={{ padding: '40px', textAlign: 'center' }}>
                            <Text type="secondary">Biểu đồ phân bố điểm sẽ hiển thị ở đây (Mockup)</Text>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </Card>

            {/* Detail Modal */}
            <Modal
                title={<Title level={4} style={{ margin: 0 }}>Chi tiết đánh giá</Title>}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={[
                    <Button key="back" onClick={handleCancel}>Đóng</Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>Lưu thay đổi</Button>,
                ]}
            >
                {selectedSubmission && (
                    <Row gutter={24}>
                        <Col span={8} style={{ borderRight: '1px solid #f0f0f0', textAlign: 'center' }}>
                            <Avatar size={80} src={selectedSubmission.avatar} style={{ marginBottom: 16 }} />
                            <Title level={5}>{selectedSubmission.name}</Title>
                            <Text type="secondary">{selectedSubmission.studentId}</Text>
                            <div style={{ marginTop: 24 }}>
                                <Tag color={selectedSubmission.status === 'pass' ? 'success' : selectedSubmission.status === 'fail' ? 'error' : 'default'} style={{ fontSize: '16px', padding: '5px 15px' }}>
                                    {selectedSubmission.status === 'pass' ? 'ĐẠT' : selectedSubmission.status === 'fail' ? 'CHƯA ĐẠT' : 'CHỜ CHẤM'}
                                </Tag>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Descriptions title="Kết quả thành phần" column={1} bordered size="small">
                                <Descriptions.Item label="Chuyên cần">{selectedSubmission.criteriaResult.attendance}%</Descriptions.Item>
                                <Descriptions.Item label="Giữa kỳ">{selectedSubmission.criteriaResult.midterm} / 10</Descriptions.Item>
                                <Descriptions.Item label="Cuối kỳ">
                                    {selectedSubmission.criteriaResult.final !== null ? `${selectedSubmission.criteriaResult.final} / 10` : <Text type="secondary">Chưa có</Text>}
                                </Descriptions.Item>
                                <Descriptions.Item label="Tổng kết (Dự kiến)">
                                    <Text strong style={{ fontSize: '16px' }}>{selectedSubmission.score || '--'}</Text>
                                </Descriptions.Item>
                            </Descriptions>

                            <div style={{ marginTop: 24 }}>
                                <Text strong>Nhận xét của giảng viên:</Text>
                                <Input.TextArea
                                    rows={4}
                                    defaultValue={selectedSubmission.comment}
                                    style={{ marginTop: 8 }}
                                    placeholder="Nhập nhận xét..."
                                />
                            </div>
                        </Col>
                    </Row>
                )}
            </Modal>
        </div>
    );
};

export default PassFailGradingPage;
