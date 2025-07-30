import React, { useState } from "react";
import {
    Typography,
    Space,
    Card,
    Table,
    Tag,
    Select,
    DatePicker,
    Input,
    Button,
    Row,
    Col,
    Avatar,
    Modal,
    Descriptions,
    Divider,
} from "antd";

const { TextArea } = Input;
import {
    UserOutlined,
    LockOutlined,
    InfoCircleOutlined,
    ClockCircleOutlined,
    FilterOutlined,
    EyeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

function AccountHistoryPage() {
    // Set page title
    React.useEffect(() => {
        document.title = "Lịch sử tài khoản - Mockup App";
    }, []);

    const [filterType, setFilterType] = useState("all");
    const [dateRange, setDateRange] = useState(null);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Mock data cho lịch sử thay đổi
    const mockHistoryData = [
        {
            id: 1,
            type: "password_change",
            description: "******** > ********",
            timestamp: "2024-01-15 14:30:25",
            user: "Nguyễn Xuân Hoa",
            ip: "192.168.1.100",
            device: "Chrome - Windows 10",
            apiLog: {
                method: "PUT",
                endpoint: "/api/user/password",
                requestBody: { oldPassword: "***", newPassword: "***" },
                responseBody: {
                    success: true,
                    message: "Password updated successfully",
                },
                responseCode: 200,
                responseTime: "150ms",
                userAgent:
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
        },
        {
            id: 2,
            type: "profile_update",
            description:
                "email: hoa@example.com > hoa.new@example.com, phone: 0123456789 > 0987654321, address: null > '123 Đường ABC'",
            timestamp: "2024-01-14 09:15:42",
            user: "Nguyễn Xuân Hoa",
            ip: "192.168.1.100",
            device: "Chrome - Windows 10",
            apiLog: {
                method: "PUT",
                endpoint: "/api/user/profile",
                requestBody: {
                    email: "hoa.new@example.com",
                    phone: "0987654321",
                    address: "123 Đường ABC",
                },
                responseBody: {
                    success: true,
                    user: {
                        id: 1,
                        email: "hoa.new@example.com",
                        phone: "0987654321",
                        address: "123 Đường ABC",
                    },
                },
                responseCode: 200,
                responseTime: "120ms",
                userAgent:
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
        },
        {
            id: 3,
            type: "status_change",
            description: "inactive > active",
            timestamp: "2024-01-13 16:45:18",
            user: "Admin System",
            ip: "10.0.0.1",
            device: "System",
            apiLog: {
                method: "PATCH",
                endpoint: "/api/user/status",
                requestBody: {
                    status: "active",
                    reason: "Account reactivated",
                },
                responseBody: { success: true, status: "active" },
                responseCode: 200,
                responseTime: "80ms",
                userAgent: "System/1.0",
            },
        },
        {
            id: 4,
            type: "profile_update",
            description:
                "avatar: null > 'avatar.jpg', bio: null > 'Software Developer'",
            timestamp: "2024-01-11 13:55:10",
            user: "Nguyễn Xuân Hoa",
            ip: "192.168.1.100",
            device: "Chrome - Windows 10",
            apiLog: {
                method: "PUT",
                endpoint: "/api/user/profile",
                requestBody: {
                    avatar: "avatar.jpg",
                    bio: "Software Developer",
                },
                responseBody: {
                    success: true,
                    user: {
                        id: 1,
                        avatar: "avatar.jpg",
                        bio: "Software Developer",
                    },
                },
                responseCode: 200,
                responseTime: "110ms",
                userAgent:
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
        },
    ];

    // Lọc dữ liệu theo filter
    const filteredData = mockHistoryData.filter((item) => {
        const matchesType = filterType === "all" || item.type === filterType;
        return matchesType;
    });

    // Hàm render icon theo loại thay đổi
    const getTypeIcon = (type) => {
        switch (type) {
            case "password_change":
                return <LockOutlined style={{ color: "#1890ff" }} />;
            case "profile_update":
                return <UserOutlined style={{ color: "#52c41a" }} />;
            case "status_change":
                return <InfoCircleOutlined style={{ color: "#faad14" }} />;
            case "login_attempt":
                return <ClockCircleOutlined style={{ color: "#ff4d4f" }} />;
            default:
                return <InfoCircleOutlined />;
        }
    };

    // Hàm render tag status
    const getStatusTag = (status) => {
        switch (status) {
            case "success":
                return <Tag color="green">Thành công</Tag>;
            case "warning":
                return <Tag color="orange">Cảnh báo</Tag>;
            case "error":
                return <Tag color="red">Lỗi</Tag>;
            default:
                return <Tag color="default">Không xác định</Tag>;
        }
    };

    // Hàm render tên loại thay đổi
    const getTypeName = (type) => {
        switch (type) {
            case "password_change":
                return "Thay đổi mật khẩu";
            case "profile_update":
                return "Cập nhật thông tin";
            case "status_change":
                return "Thay đổi trạng thái";
            case "login_attempt":
                return "Đăng nhập";
            default:
                return "Khác";
        }
    };

    // Hàm xem chi tiết
    const handleViewDetail = (record) => {
        setSelectedRecord(record);
        setDetailModalVisible(true);
    };

    // Cấu hình cột cho bảng
    const columns = [
        {
            title: "Thời gian",
            dataIndex: "timestamp",
            key: "timestamp",
            width: 150,
            render: (text) => <Text style={{ fontSize: "12px" }}>{text}</Text>,
        },
        {
            title: "Loại thay đổi",
            dataIndex: "type",
            key: "type",
            width: 150,
            render: (type) => (
                <Space>
                    {getTypeIcon(type)}
                    <Text>{getTypeName(type)}</Text>
                </Space>
            ),
        },
        {
            title: "Nội dung thay đổi",
            dataIndex: "description",
            key: "description",
            render: (text) => (
                <Text type="secondary" style={{ fontSize: "12px" }}>
                    {text}
                </Text>
            ),
        },
        {
            title: "Người thực hiện",
            dataIndex: "user",
            key: "user",
            width: 150,
            render: (user) => (
                <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <Text>{user}</Text>
                </Space>
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            width: 100,
            render: (_, record) => (
                <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => handleViewDetail(record)}
                    size="small"
                >
                    Chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Card>
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                >
                    {/* Header */}
                    <div style={{ textAlign: "center" }}>
                        <Title level={2}>Lịch sử thay đổi tài khoản</Title>
                        <Text type="secondary">
                            Theo dõi các hoạt động và thay đổi của tài khoản
                        </Text>
                    </div>

                    <Divider />

                    {/* Filters */}
                    <Card size="small" style={{ background: "#fafafa" }}>
                        <Row gutter={[16, 16]} align="middle">
                            <Col xs={24} sm={12} md={6}>
                                <Text strong>Loại thay đổi:</Text>
                                <Select
                                    value={filterType}
                                    onChange={setFilterType}
                                    style={{ width: "100%", marginTop: 8 }}
                                    placeholder="Chọn loại"
                                >
                                    <Option value="all">Tất cả</Option>
                                    <Option value="password_change">
                                        Thay đổi mật khẩu
                                    </Option>
                                    <Option value="profile_update">
                                        Cập nhật thông tin
                                    </Option>
                                    <Option value="status_change">
                                        Thay đổi trạng thái
                                    </Option>
                                </Select>
                            </Col>

                            <Col xs={24} sm={12} md={6}>
                                <Text strong>Thời gian:</Text>
                                <RangePicker
                                    style={{ width: "100%", marginTop: 8 }}
                                    placeholder={["Từ ngày", "Đến ngày"]}
                                    value={dateRange}
                                    onChange={setDateRange}
                                />
                            </Col>
                            <Col xs={24} sm={12} md={4}>
                                <Button
                                    type="primary"
                                    icon={<FilterOutlined />}
                                    style={{ marginTop: 24 }}
                                    onClick={() => {
                                        setFilterType("all");
                                        setDateRange(null);
                                    }}
                                >
                                    Reset
                                </Button>
                            </Col>
                        </Row>
                    </Card>

                    {/* Table */}
                    <Card>
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            rowKey="id"
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} của ${total} bản ghi`,
                            }}
                            scroll={{ x: 1000 }}
                        />
                    </Card>

                    {/* Detail Modal */}
                    <Modal
                        title={
                            <Space>
                                {selectedRecord &&
                                    getTypeIcon(selectedRecord.type)}
                                <span>Chi tiết API Log</span>
                            </Space>
                        }
                        open={detailModalVisible}
                        onCancel={() => setDetailModalVisible(false)}
                        footer={[
                            <Button
                                key="close"
                                onClick={() => setDetailModalVisible(false)}
                            >
                                Đóng
                            </Button>,
                        ]}
                        width={800}
                    >
                        {selectedRecord && (
                            <div>
                                <TextArea
                                    value={JSON.stringify(
                                        selectedRecord.apiLog,
                                        null,
                                        2
                                    )}
                                    rows={20}
                                    readOnly
                                    style={{
                                        fontFamily: "monospace",
                                        fontSize: "12px",
                                        background: "#f8f9fa",
                                    }}
                                />
                            </div>
                        )}
                    </Modal>
                </Space>
            </Card>
        </div>
    );
}

export default AccountHistoryPage;
