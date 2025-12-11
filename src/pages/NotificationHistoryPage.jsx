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
    Form,
    Input,
    Select,
    DatePicker,
    Divider,
    Badge,
    message,
    Tooltip,
} from "antd";
import {
    BellOutlined,
    MailOutlined,
    MobileOutlined,
    GlobalOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    EyeOutlined,
    ReloadOutlined,
    FilterOutlined,
    DownloadOutlined,
    SendOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// Data mẫu
const OVERVIEW_STATS = {
    totalSent: 1248,
    successRate: 94.2,
    failedCount: 72,
    pendingCount: 18,
};

const NOTIFICATION_HISTORY = [
    {
        id: 1,
        type: "email",
        recipient: "nguyenhoangminh@company.com",
        recipientName: "Nguyễn Hoàng Minh",
        subject: "Khóa học mới: Kỹ năng bán hàng nâng cao",
        content: "Chào bạn! Chúng tôi vừa ra mắt khóa học mới về Kỹ năng bán hàng nâng cao. Đăng ký ngay để nhận ưu đãi...",
        sentTime: "2024-12-11 09:30:00",
        status: "success",
        channel: "email",
        readStatus: true,
    },
    {
        id: 2,
        type: "web",
        recipient: "tran.mai.anh",
        recipientName: "Trần Thị Mai Anh",
        subject: "Nhắc nhở: Hoàn thành khóa học Giao tiếp",
        content: "Bạn còn 2 bài học nữa để hoàn thành khóa học Kỹ năng giao tiếp. Hãy hoàn thành trước 15/12/2024.",
        sentTime: "2024-12-11 10:15:00",
        status: "success",
        channel: "web",
        readStatus: true,
    },
    {
        id: 3,
        type: "app",
        recipient: "lequanghai",
        recipientName: "Lê Quang Hải",
        subject: "Chúc mừng! Bạn đã đạt huy hiệu Champion",
        content: "Chúc mừng bạn đã hoàn thành 15 khóa học và đạt được huy hiệu Champion! 🏆",
        sentTime: "2024-12-11 08:45:00",
        status: "success",
        channel: "app",
        readStatus: false,
    },
    {
        id: 4,
        type: "email",
        recipient: "phamthihhuong@company.com",
        recipientName: "Phạm Thị Thanh Hương",
        subject: "Khảo sát sau đào tạo",
        content: "Vui lòng dành 5 phút để đánh giá khóa học Quản lý thời gian bạn vừa hoàn thành.",
        sentTime: "2024-12-11 11:20:00",
        status: "failed",
        channel: "email",
        errorMessage: "Email address not found",
        readStatus: false,
    },
    {
        id: 5,
        type: "web",
        recipient: "hoangvanduc",
        recipientName: "Hoàng Văn Đức",
        subject: "Sự kiện: Sprint học tập tháng 12 đang bắt đầu",
        content: "Sprint học tập tháng 12 chính thức bắt đầu! Tham gia ngay để có cơ hội giành giải thưởng hấp dẫn.",
        sentTime: "2024-12-10 15:30:00",
        status: "success",
        channel: "web",
        readStatus: true,
    },
    {
        id: 6,
        type: "app",
        recipient: "nguyenthilan",
        recipientName: "Nguyễn Thị Lan",
        subject: "Bạn có 1 bài quiz mới chưa hoàn thành",
        content: "Hoàn thành bài quiz để tiếp tục khóa học và nhận điểm thưởng.",
        sentTime: "2024-12-10 14:00:00",
        status: "pending",
        channel: "app",
        readStatus: false,
    },
    {
        id: 7,
        type: "email",
        recipient: "sales-team@company.com",
        recipientName: "Nhóm Sales (45 người)",
        subject: "Thông báo khóa học bắt buộc tháng 12",
        content: "Tất cả thành viên team Sales cần hoàn thành khóa 'Kỹ năng bán hàng cơ bản' trước 20/12/2024.",
        sentTime: "2024-12-09 09:00:00",
        status: "success",
        channel: "email",
        readStatus: true,
        isBulk: true,
        bulkCount: 45,
    },
    {
        id: 8,
        type: "web",
        recipient: "all-users",
        recipientName: "Tất cả người dùng",
        subject: "Bảo trì hệ thống vào 12/12/2024",
        content: "Hệ thống LMS sẽ bảo trì từ 22:00 ngày 12/12 đến 02:00 ngày 13/12. Vui lòng lưu lại tiến độ học tập.",
        sentTime: "2024-12-08 16:45:00",
        status: "success",
        channel: "web",
        readStatus: false,
        isBulk: true,
        bulkCount: 156,
    },
    {
        id: 9,
        type: "app",
        recipient: "dothithao",
        recipientName: "Đỗ Thị Thảo",
        subject: "Nhắc nhở: Deadline khóa học sắp đến",
        content: "Khóa học 'Đào tạo hội nhập' của bạn sẽ hết hạn trong 3 ngày nữa.",
        sentTime: "2024-12-11 07:30:00",
        status: "failed",
        channel: "app",
        errorMessage: "Push notification service unavailable",
        readStatus: false,
    },
    {
        id: 10,
        type: "email",
        recipient: "nguyenvana@company.com",
        recipientName: "Nguyễn Văn A",
        subject: "Chứng chỉ hoàn thành khóa học",
        content: "Chúc mừng! Chứng chỉ hoàn thành khóa 'Kỹ năng giao tiếp' của bạn đã sẵn sàng để tải xuống.",
        sentTime: "2024-12-10 13:15:00",
        status: "success",
        channel: "email",
        readStatus: true,
    },
];

const CHANNEL_STATS = [
    { channel: "email", total: 567, success: 534, failed: 28, pending: 5 },
    { channel: "web", total: 398, success: 385, failed: 8, pending: 5 },
    { channel: "app", total: 283, success: 259, failed: 16, pending: 8 },
];

function NotificationHistoryPage() {
    const [selectedNotification, setSelectedNotification] = React.useState(null);
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [filterChannel, setFilterChannel] = React.useState("all");
    const [filterStatus, setFilterStatus] = React.useState("all");

    React.useEffect(() => {
        document.title = "Lịch sử gửi thông báo - Mockup App";
    }, []);

    // Filter data
    const filteredData = React.useMemo(() => {
        return NOTIFICATION_HISTORY.filter((item) => {
            const channelMatch = filterChannel === "all" || item.channel === filterChannel;
            const statusMatch = filterStatus === "all" || item.status === filterStatus;
            return channelMatch && statusMatch;
        });
    }, [filterChannel, filterStatus]);

    const getChannelIcon = (channel) => {
        switch (channel) {
            case "email":
                return <MailOutlined />;
            case "web":
                return <GlobalOutlined />;
            case "app":
                return <MobileOutlined />;
            default:
                return <BellOutlined />;
        }
    };

    const getStatusTag = (status) => {
        const config = {
            success: { color: "success", icon: <CheckCircleOutlined />, text: "Thành công" },
            failed: { color: "error", icon: <CloseCircleOutlined />, text: "Thất bại" },
            pending: { color: "processing", icon: <ClockCircleOutlined />, text: "Đang gửi" },
        };
        const { color, icon, text } = config[status] || config.pending;
        return (
            <Tag color={color} icon={icon}>
                {text}
            </Tag>
        );
    };

    const columns = [
        {
            title: "Kênh",
            dataIndex: "channel",
            width: 80,
            align: "center",
            render: (channel) => (
                <Tooltip
                    title={
                        channel === "email"
                            ? "Email"
                            : channel === "web"
                            ? "Web notification"
                            : "App notification"
                    }
                >
                    <div style={{ fontSize: 20 }}>{getChannelIcon(channel)}</div>
                </Tooltip>
            ),
        },
        {
            title: "Người nhận",
            dataIndex: "recipientName",
            width: 180,
            render: (name, record) => (
                <div>
                    <Text strong>{name}</Text>
                    {record.isBulk && (
                        <Tag color="blue" style={{ marginLeft: 8 }}>
                            {record.bulkCount} người
                        </Tag>
                    )}
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {record.recipient}
                    </Text>
                </div>
            ),
        },
        {
            title: "Tiêu đề",
            dataIndex: "subject",
            render: (subject, record) => (
                <div>
                    <Text>{subject}</Text>
                    {record.readStatus && (
                        <Badge
                            status="success"
                            text="Đã đọc"
                            style={{ marginLeft: 8, fontSize: 11 }}
                        />
                    )}
                </div>
            ),
        },
        {
            title: "Thời gian gửi",
            dataIndex: "sentTime",
            width: 160,
            sorter: (a, b) => new Date(a.sentTime) - new Date(b.sentTime),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 120,
            align: "center",
            render: (status) => getStatusTag(status),
        },
        {
            title: "Thao tác",
            width: 150,
            align: "center",
            render: (_, record) => (
                <Space>
                    <Button
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedNotification(record);
                            setShowDetailModal(true);
                        }}
                    >
                        Xem
                    </Button>
                    {record.status === "failed" && (
                        <Tooltip title="Gửi lại">
                            <Button
                                size="small"
                                icon={<ReloadOutlined />}
                                onClick={() => {
                                    message.success("Đã gửi lại thông báo thành công!");
                                }}
                            />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>
                    <BellOutlined style={{ marginRight: 8 }} />
                    Lịch sử gửi thông báo
                </Title>
                <Text type="secondary">
                    Theo dõi và quản lý tất cả thông báo đã gửi qua Email, Web và App
                </Text>
            </div>

            {/* Overview Statistics */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng số đã gửi"
                            value={OVERVIEW_STATS.totalSent}
                            prefix={<SendOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tỷ lệ thành công"
                            value={OVERVIEW_STATS.successRate}
                            suffix="%"
                            precision={1}
                            valueStyle={{ color: "#3f8600" }}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Thất bại"
                            value={OVERVIEW_STATS.failedCount}
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<CloseCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Đang chờ"
                            value={OVERVIEW_STATS.pendingCount}
                            valueStyle={{ color: "#1890ff" }}
                            prefix={<ClockCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Channel Statistics */}
            <Card style={{ marginBottom: 24 }}>
                <Title level={5}>Thống kê theo kênh</Title>
                <Row gutter={16}>
                    {CHANNEL_STATS.map((stat) => (
                        <Col xs={24} md={8} key={stat.channel}>
                            <Card size="small" style={{ marginTop: 8 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Space>
                                        <div style={{ fontSize: 24 }}>
                                            {getChannelIcon(stat.channel)}
                                        </div>
                                        <div>
                                            <Text strong style={{ textTransform: "capitalize" }}>
                                                {stat.channel === "email"
                                                    ? "Email"
                                                    : stat.channel === "web"
                                                    ? "Web"
                                                    : "App"}
                                            </Text>
                                            <br />
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                Tổng: {stat.total}
                                            </Text>
                                        </div>
                                    </Space>
                                    <Space direction="vertical" size={0}>
                                        <Text style={{ fontSize: 12 }}>
                                            ✓ {stat.success} | ✗ {stat.failed} | ⏳ {stat.pending}
                                        </Text>
                                    </Space>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>

            {/* Main Table */}
            <Card
                title="Danh sách thông báo"
                extra={
                    <Space>
                        <Select
                            placeholder="Kênh"
                            style={{ width: 140 }}
                            value={filterChannel}
                            onChange={setFilterChannel}
                            options={[
                                { value: "all", label: "Tất cả kênh" },
                                { value: "email", label: "📧 Email" },
                                { value: "web", label: "🌐 Web" },
                                { value: "app", label: "📱 App" },
                            ]}
                        />
                        <Select
                            placeholder="Trạng thái"
                            style={{ width: 140 }}
                            value={filterStatus}
                            onChange={setFilterStatus}
                            options={[
                                { value: "all", label: "Tất cả" },
                                { value: "success", label: "Thành công" },
                                { value: "failed", label: "Thất bại" },
                                { value: "pending", label: "Đang gửi" },
                            ]}
                        />
                        <Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>
                    </Space>
                }
            >
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Tổng ${total} thông báo`,
                    }}
                />
            </Card>

            {/* Detail Modal */}
            <Modal
                title="Chi tiết thông báo"
                open={showDetailModal}
                onCancel={() => setShowDetailModal(false)}
                width={700}
                footer={[
                    <Button key="close" onClick={() => setShowDetailModal(false)}>
                        Đóng
                    </Button>,
                    selectedNotification?.status === "failed" && (
                        <Button
                            key="resend"
                            type="primary"
                            icon={<ReloadOutlined />}
                            onClick={() => {
                                message.success("Đã gửi lại thông báo thành công!");
                                setShowDetailModal(false);
                            }}
                        >
                            Gửi lại
                        </Button>
                    ),
                ]}
            >
                {selectedNotification && (
                    <div>
                        <Row gutter={16} style={{ marginBottom: 16 }}>
                            <Col span={12}>
                                <Text type="secondary">Kênh gửi:</Text>
                                <br />
                                <Space>
                                    {getChannelIcon(selectedNotification.channel)}
                                    <Text strong>
                                        {selectedNotification.channel === "email"
                                            ? "Email"
                                            : selectedNotification.channel === "web"
                                            ? "Web notification"
                                            : "App notification"}
                                    </Text>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary">Trạng thái:</Text>
                                <br />
                                {getStatusTag(selectedNotification.status)}
                            </Col>
                        </Row>

                        <Divider />

                        <div style={{ marginBottom: 16 }}>
                            <Text type="secondary">Người nhận:</Text>
                            <br />
                            <Text strong>{selectedNotification.recipientName}</Text>
                            {selectedNotification.isBulk && (
                                <Tag color="blue" style={{ marginLeft: 8 }}>
                                    {selectedNotification.bulkCount} người
                                </Tag>
                            )}
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {selectedNotification.recipient}
                            </Text>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <Text type="secondary">Thời gian gửi:</Text>
                            <br />
                            <Text>{selectedNotification.sentTime}</Text>
                        </div>

                        <Divider />

                        <div style={{ marginBottom: 16 }}>
                            <Text strong style={{ fontSize: 16 }}>
                                {selectedNotification.subject}
                            </Text>
                        </div>

                        <div
                            style={{
                                background: "#f5f5f5",
                                padding: 16,
                                borderRadius: 4,
                                marginBottom: 16,
                            }}
                        >
                            <Paragraph style={{ marginBottom: 0 }}>
                                {selectedNotification.content}
                            </Paragraph>
                        </div>

                        {selectedNotification.status === "failed" && (
                            <div
                                style={{
                                    background: "#fff1f0",
                                    border: "1px solid #ffa39e",
                                    padding: 12,
                                    borderRadius: 4,
                                }}
                            >
                                <Text strong style={{ color: "#cf1322" }}>
                                    ❌ Lỗi:
                                </Text>
                                <br />
                                <Text>{selectedNotification.errorMessage}</Text>
                            </div>
                        )}

                        {selectedNotification.readStatus && (
                            <div style={{ marginTop: 16 }}>
                                <Badge status="success" text="Người nhận đã đọc thông báo này" />
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default NotificationHistoryPage;
