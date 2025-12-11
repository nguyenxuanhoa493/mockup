import React from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Table,
    Row,
    Col,
    Statistic,
    Tag,
    Modal,
    Select,
    DatePicker,
    Input,
    Timeline,
    Avatar,
    Badge,
    Tooltip,
    Tabs,
} from "antd";
import {
    UserOutlined,
    LoginOutlined,
    LogoutOutlined,
    EyeOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    DownloadOutlined,
    CommentOutlined,
    SettingOutlined,
    GiftOutlined,
    TrophyOutlined,
    SearchOutlined,
    ClockCircleOutlined,
    GlobalOutlined,
    MobileOutlined,
    DesktopOutlined,
    FilterOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// Data mẫu
const OVERVIEW_STATS = {
    totalActivities: 3284,
    activeUsers: 142,
    avgSessionTime: 28,
    todayActivities: 187,
};

const ACTIVITY_LOGS = [
    {
        id: 1,
        user: "Nguyễn Hoàng Minh",
        userId: "nguyenhoangminh",
        avatar: "https://i.pravatar.cc/150?img=12",
        department: "Sales",
        action: "login",
        actionLabel: "Đăng nhập",
        description: "Đăng nhập vào hệ thống",
        timestamp: "2024-12-11 09:15:23",
        ipAddress: "192.168.1.105",
        device: "Chrome 120.0 - Windows 10",
        deviceType: "desktop",
    },
    {
        id: 2,
        user: "Trần Thị Mai Anh",
        userId: "tran.mai.anh",
        avatar: "https://i.pravatar.cc/150?img=47",
        department: "Marketing",
        action: "view_course",
        actionLabel: "Xem khóa học",
        description: "Xem khóa học: Kỹ năng giao tiếp",
        relatedItem: "Kỹ năng giao tiếp",
        timestamp: "2024-12-11 09:20:45",
        ipAddress: "192.168.1.108",
        device: "Safari 17.0 - macOS",
        deviceType: "desktop",
    },
    {
        id: 3,
        user: "Lê Quang Hải",
        userId: "lequanghai",
        avatar: "https://i.pravatar.cc/150?img=33",
        department: "Sales",
        action: "complete_lesson",
        actionLabel: "Hoàn thành bài học",
        description: "Hoàn thành bài học: Kỹ thuật chốt sale",
        relatedItem: "Kỹ năng bán hàng nâng cao > Bài 5",
        timestamp: "2024-12-11 09:30:12",
        ipAddress: "192.168.1.120",
        device: "Chrome 120.0 - Windows 10",
        deviceType: "desktop",
        score: 95,
    },
    {
        id: 4,
        user: "Phạm Thị Thanh Hương",
        userId: "phamthihhuong",
        avatar: "https://i.pravatar.cc/150?img=20",
        department: "HR",
        action: "take_quiz",
        actionLabel: "Làm quiz",
        description: "Hoàn thành quiz: Kiểm tra kiến thức Quản lý thời gian",
        relatedItem: "Quiz Chương 3",
        timestamp: "2024-12-11 09:35:30",
        ipAddress: "192.168.1.115",
        device: "Firefox 121.0 - Windows 11",
        deviceType: "desktop",
        score: 82,
    },
    {
        id: 5,
        user: "Hoàng Văn Đức",
        userId: "hoangvanduc",
        avatar: "https://i.pravatar.cc/150?img=68",
        department: "Sales",
        action: "download",
        actionLabel: "Tải tài liệu",
        description: "Tải tài liệu: Sales_Techniques_2024.pdf",
        relatedItem: "Sales_Techniques_2024.pdf",
        timestamp: "2024-12-11 09:40:18",
        ipAddress: "192.168.1.125",
        device: "Edge 120.0 - Windows 10",
        deviceType: "desktop",
        fileSize: "2.5 MB",
    },
    {
        id: 6,
        user: "Nguyễn Thị Lan",
        userId: "nguyenthilan",
        avatar: "https://i.pravatar.cc/150?img=25",
        department: "Marketing",
        action: "comment",
        actionLabel: "Bình luận",
        description: "Bình luận trong khóa học: Kỹ năng giao tiếp",
        relatedItem: "Bài 3: Giao tiếp phi ngôn ngữ",
        timestamp: "2024-12-11 09:45:50",
        ipAddress: "192.168.1.130",
        device: "Chrome Mobile - Android 13",
        deviceType: "mobile",
        comment: "Bài học rất hay và bổ ích!",
    },
    {
        id: 7,
        user: "Đỗ Thị Thảo",
        userId: "dothithao",
        avatar: "https://i.pravatar.cc/150?img=35",
        department: "HR",
        action: "redeem_reward",
        actionLabel: "Đổi quà",
        description: "Đổi quà: Gift Card 100K",
        relatedItem: "Gift Card 100K",
        timestamp: "2024-12-11 09:50:22",
        ipAddress: "192.168.1.112",
        device: "Chrome 120.0 - Windows 10",
        deviceType: "desktop",
        points: 500,
    },
    {
        id: 8,
        user: "Nguyễn Hoàng Minh",
        userId: "nguyenhoangminh",
        avatar: "https://i.pravatar.cc/150?img=12",
        department: "Sales",
        action: "join_event",
        actionLabel: "Tham gia sự kiện",
        description: "Tham gia sự kiện: Sprint học tập tháng 12",
        relatedItem: "Sprint học tập tháng 12",
        timestamp: "2024-12-11 10:00:45",
        ipAddress: "192.168.1.105",
        device: "Chrome 120.0 - Windows 10",
        deviceType: "desktop",
    },
    {
        id: 9,
        user: "Trần Văn Bình",
        userId: "tranvanbinh",
        avatar: "https://i.pravatar.cc/150?img=60",
        department: "IT",
        action: "update_profile",
        actionLabel: "Cập nhật hồ sơ",
        description: "Cập nhật thông tin cá nhân",
        timestamp: "2024-12-11 10:10:30",
        ipAddress: "192.168.1.140",
        device: "Chrome 120.0 - Windows 11",
        deviceType: "desktop",
    },
    {
        id: 10,
        user: "Lê Quang Hải",
        userId: "lequanghai",
        avatar: "https://i.pravatar.cc/150?img=33",
        department: "Sales",
        action: "logout",
        actionLabel: "Đăng xuất",
        description: "Đăng xuất khỏi hệ thống",
        timestamp: "2024-12-11 10:15:00",
        ipAddress: "192.168.1.120",
        device: "Chrome 120.0 - Windows 10",
        deviceType: "desktop",
    },
];

const ACTIVITY_TYPES = [
    { value: "all", label: "Tất cả hoạt động" },
    { value: "login", label: "🔐 Đăng nhập" },
    { value: "logout", label: "🚪 Đăng xuất" },
    { value: "view_course", label: "👁️ Xem khóa học" },
    { value: "complete_lesson", label: "✅ Hoàn thành bài học" },
    { value: "take_quiz", label: "📝 Làm quiz" },
    { value: "download", label: "⬇️ Tải tài liệu" },
    { value: "comment", label: "💬 Bình luận" },
    { value: "redeem_reward", label: "🎁 Đổi quà" },
    { value: "join_event", label: "🏆 Tham gia sự kiện" },
    { value: "update_profile", label: "⚙️ Cập nhật hồ sơ" },
];

const TOP_ACTIVE_USERS = [
    { name: "Nguyễn Hoàng Minh", department: "Sales", activities: 145, avatar: "https://i.pravatar.cc/150?img=12" },
    { name: "Trần Thị Mai Anh", department: "Marketing", activities: 132, avatar: "https://i.pravatar.cc/150?img=47" },
    { name: "Lê Quang Hải", department: "Sales", activities: 128, avatar: "https://i.pravatar.cc/150?img=33" },
    { name: "Phạm Thị Thanh Hương", department: "HR", activities: 98, avatar: "https://i.pravatar.cc/150?img=20" },
    { name: "Hoàng Văn Đức", department: "Sales", activities: 87, avatar: "https://i.pravatar.cc/150?img=68" },
];

function ActivityLogPage() {
    const [selectedActivity, setSelectedActivity] = React.useState(null);
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [filterType, setFilterType] = React.useState("all");
    const [filterUser, setFilterUser] = React.useState("all");
    const [searchText, setSearchText] = React.useState("");

    React.useEffect(() => {
        document.title = "Nhật ký hoạt động - Mockup App";
    }, []);

    // Filter data
    const filteredData = React.useMemo(() => {
        return ACTIVITY_LOGS.filter((item) => {
            const typeMatch = filterType === "all" || item.action === filterType;
            const userMatch = filterUser === "all" || item.userId === filterUser;
            const searchMatch =
                searchText === "" ||
                item.user.toLowerCase().includes(searchText.toLowerCase()) ||
                item.description.toLowerCase().includes(searchText.toLowerCase());
            return typeMatch && userMatch && searchMatch;
        });
    }, [filterType, filterUser, searchText]);

    const getActionIcon = (action) => {
        const icons = {
            login: <LoginOutlined style={{ color: "#52c41a" }} />,
            logout: <LogoutOutlined style={{ color: "#ff4d4f" }} />,
            view_course: <EyeOutlined style={{ color: "#1890ff" }} />,
            complete_lesson: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            take_quiz: <FileTextOutlined style={{ color: "#fa8c16" }} />,
            download: <DownloadOutlined style={{ color: "#722ed1" }} />,
            comment: <CommentOutlined style={{ color: "#13c2c2" }} />,
            redeem_reward: <GiftOutlined style={{ color: "#eb2f96" }} />,
            join_event: <TrophyOutlined style={{ color: "#faad14" }} />,
            update_profile: <SettingOutlined style={{ color: "#8c8c8c" }} />,
        };
        return icons[action] || <UserOutlined />;
    };

    const getDeviceIcon = (deviceType) => {
        if (deviceType === "mobile") return <MobileOutlined />;
        if (deviceType === "tablet") return <MobileOutlined />;
        return <DesktopOutlined />;
    };

    const columns = [
        {
            title: "Thời gian",
            dataIndex: "timestamp",
            width: 160,
            sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
        },
        {
            title: "Người dùng",
            dataIndex: "user",
            width: 200,
            render: (name, record) => (
                <Space>
                    <Avatar src={record.avatar}>{name[0]}</Avatar>
                    <div>
                        <div>
                            <Text strong>{name}</Text>
                        </div>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            {record.department}
                        </Text>
                    </div>
                </Space>
            ),
        },
        {
            title: "Hoạt động",
            dataIndex: "action",
            width: 180,
            render: (action, record) => (
                <Space>
                    {getActionIcon(action)}
                    <Text>{record.actionLabel}</Text>
                </Space>
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (desc, record) => (
                <div>
                    <Text>{desc}</Text>
                    {record.score && (
                        <Tag color="blue" style={{ marginLeft: 8 }}>
                            Điểm: {record.score}
                        </Tag>
                    )}
                    {record.points && (
                        <Tag color="gold" style={{ marginLeft: 8 }}>
                            {record.points} điểm
                        </Tag>
                    )}
                </div>
            ),
        },
        {
            title: "Thiết bị",
            dataIndex: "device",
            width: 120,
            align: "center",
            render: (device, record) => (
                <Tooltip title={device}>
                    <span style={{ fontSize: 18 }}>{getDeviceIcon(record.deviceType)}</span>
                </Tooltip>
            ),
        },
        {
            title: "Thao tác",
            width: 100,
            align: "center",
            render: (_, record) => (
                <Button
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => {
                        setSelectedActivity(record);
                        setShowDetailModal(true);
                    }}
                >
                    Xem
                </Button>
            ),
        },
    ];

    const overviewView = (
        <Row gutter={[24, 24]}>
            {/* Statistics */}
            <Col xs={24}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Tổng hoạt động"
                                value={OVERVIEW_STATS.totalActivities}
                                prefix={<ClockCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Người dùng hoạt động"
                                value={OVERVIEW_STATS.activeUsers}
                                prefix={<UserOutlined />}
                                valueStyle={{ color: "#1890ff" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Thời gian TB/phiên"
                                value={OVERVIEW_STATS.avgSessionTime}
                                suffix="phút"
                                prefix={<ClockCircleOutlined />}
                                valueStyle={{ color: "#52c41a" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card>
                            <Statistic
                                title="Hoạt động hôm nay"
                                value={OVERVIEW_STATS.todayActivities}
                                prefix={<GlobalOutlined />}
                                valueStyle={{ color: "#fa8c16" }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>

            {/* Top Active Users */}
            <Col xs={24} lg={12}>
                <Card title="Top 5 người dùng hoạt động nhiều nhất">
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        {TOP_ACTIVE_USERS.map((user, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Space>
                                    <Badge
                                        count={index + 1}
                                        style={{
                                            backgroundColor:
                                                index === 0
                                                    ? "#faad14"
                                                    : index === 1
                                                    ? "#d9d9d9"
                                                    : index === 2
                                                    ? "#cd7f32"
                                                    : "#8c8c8c",
                                        }}
                                    />
                                    <Avatar src={user.avatar}>{user.name[0]}</Avatar>
                                    <div>
                                        <Text strong>{user.name}</Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {user.department}
                                        </Text>
                                    </div>
                                </Space>
                                <Tag color="blue" style={{ fontSize: 14 }}>
                                    {user.activities} hoạt động
                                </Tag>
                            </div>
                        ))}
                    </Space>
                </Card>
            </Col>

            {/* Recent Activities Timeline */}
            <Col xs={24} lg={12}>
                <Card title="Hoạt động gần đây" style={{ height: "100%" }}>
                    <Timeline
                        items={ACTIVITY_LOGS.slice(0, 6).map((log) => ({
                            children: (
                                <div>
                                    <Space>
                                        {getActionIcon(log.action)}
                                        <Text strong>{log.user}</Text>
                                    </Space>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {log.description}
                                    </Text>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: 11 }}>
                                        {log.timestamp}
                                    </Text>
                                </div>
                            ),
                            color: "blue",
                        }))}
                    />
                </Card>
            </Col>
        </Row>
    );

    const logsView = (
        <Card
            title="Nhật ký hoạt động chi tiết"
            extra={
                <Space wrap>
                    <Input
                        placeholder="Tìm kiếm..."
                        prefix={<SearchOutlined />}
                        style={{ width: 200 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                    />
                    <Select
                        placeholder="Người dùng"
                        style={{ width: 180 }}
                        value={filterUser}
                        onChange={setFilterUser}
                        options={[
                            { value: "all", label: "Tất cả người dùng" },
                            ...Array.from(new Set(ACTIVITY_LOGS.map((log) => log.userId))).map(
                                (userId) => {
                                    const log = ACTIVITY_LOGS.find((l) => l.userId === userId);
                                    return { value: userId, label: log.user };
                                }
                            ),
                        ]}
                    />
                    <Select
                        placeholder="Loại hoạt động"
                        style={{ width: 180 }}
                        value={filterType}
                        onChange={setFilterType}
                        options={ACTIVITY_TYPES}
                    />
                    <RangePicker />
                    <Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>
                </Space>
            }
        >
            <Table
                dataSource={filteredData}
                columns={columns}
                rowKey="id"
                pagination={{
                    pageSize: 20,
                    showTotal: (total) => `Tổng ${total} hoạt động`,
                }}
            />
        </Card>
    );

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>
                    <ClockCircleOutlined style={{ marginRight: 8 }} />
                    Nhật ký hoạt động
                </Title>
                <Text type="secondary">
                    Theo dõi và quản lý tất cả hoạt động của người dùng trên hệ thống
                </Text>
            </div>

            <Tabs
                defaultActiveKey="overview"
                items={[
                    {
                        key: "overview",
                        label: (
                            <span>
                                <GlobalOutlined /> Tổng quan
                            </span>
                        ),
                        children: overviewView,
                    },
                    {
                        key: "logs",
                        label: (
                            <span>
                                <ClockCircleOutlined /> Nhật ký chi tiết
                            </span>
                        ),
                        children: logsView,
                    },
                ]}
            />

            {/* Detail Modal */}
            <Modal
                title="Chi tiết hoạt động"
                open={showDetailModal}
                onCancel={() => setShowDetailModal(false)}
                width={700}
                footer={[
                    <Button key="close" type="primary" onClick={() => setShowDetailModal(false)}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedActivity && (
                    <div>
                        <Row gutter={16} style={{ marginBottom: 16 }}>
                            <Col span={12}>
                                <Text type="secondary">Người dùng:</Text>
                                <br />
                                <Space>
                                    <Avatar src={selectedActivity.avatar}>
                                        {selectedActivity.user[0]}
                                    </Avatar>
                                    <div>
                                        <Text strong>{selectedActivity.user}</Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {selectedActivity.department}
                                        </Text>
                                    </div>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary">Thời gian:</Text>
                                <br />
                                <Text strong>{selectedActivity.timestamp}</Text>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ marginBottom: 16 }}>
                            <Col span={12}>
                                <Text type="secondary">Loại hoạt động:</Text>
                                <br />
                                <Space>
                                    {getActionIcon(selectedActivity.action)}
                                    <Text strong>{selectedActivity.actionLabel}</Text>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary">Thiết bị:</Text>
                                <br />
                                <Space>
                                    {getDeviceIcon(selectedActivity.deviceType)}
                                    <Text>{selectedActivity.device}</Text>
                                </Space>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ marginBottom: 16 }}>
                            <Col span={24}>
                                <Text type="secondary">Địa chỉ IP:</Text>
                                <br />
                                <Text>{selectedActivity.ipAddress}</Text>
                            </Col>
                        </Row>

                        <div
                            style={{
                                background: "#f5f5f5",
                                padding: 16,
                                borderRadius: 4,
                                marginBottom: 16,
                            }}
                        >
                            <Text type="secondary">Mô tả:</Text>
                            <br />
                            <Text strong>{selectedActivity.description}</Text>
                        </div>

                        {selectedActivity.relatedItem && (
                            <div style={{ marginBottom: 16 }}>
                                <Text type="secondary">Liên quan đến:</Text>
                                <br />
                                <Tag color="blue">{selectedActivity.relatedItem}</Tag>
                            </div>
                        )}

                        {selectedActivity.score && (
                            <div style={{ marginBottom: 16 }}>
                                <Text type="secondary">Điểm số:</Text>
                                <br />
                                <Tag color="green" style={{ fontSize: 16 }}>
                                    {selectedActivity.score}/100
                                </Tag>
                            </div>
                        )}

                        {selectedActivity.points && (
                            <div style={{ marginBottom: 16 }}>
                                <Text type="secondary">Điểm thưởng:</Text>
                                <br />
                                <Tag color="gold" style={{ fontSize: 16 }}>
                                    {selectedActivity.points} điểm
                                </Tag>
                            </div>
                        )}

                        {selectedActivity.fileSize && (
                            <div style={{ marginBottom: 16 }}>
                                <Text type="secondary">Kích thước file:</Text>
                                <br />
                                <Text>{selectedActivity.fileSize}</Text>
                            </div>
                        )}

                        {selectedActivity.comment && (
                            <div
                                style={{
                                    background: "#e6f7ff",
                                    border: "1px solid #91d5ff",
                                    padding: 12,
                                    borderRadius: 4,
                                }}
                            >
                                <Text strong>💬 Nội dung bình luận:</Text>
                                <br />
                                <Text>{selectedActivity.comment}</Text>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ActivityLogPage;
