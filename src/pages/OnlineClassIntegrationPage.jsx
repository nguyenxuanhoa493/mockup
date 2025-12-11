import React from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Table,
    Row,
    Col,
    Form,
    Input,
    Select,
    DatePicker,
    Tag,
    Modal,
    Tabs,
    Switch,
    message,
    Badge,
    Avatar,
    Tooltip,
    Steps,
    InputNumber,
    Radio,
    List,
    Statistic,
} from "antd";
import {
    VideoCameraOutlined,
    LinkOutlined,
    ApiOutlined,
    UserAddOutlined,
    SettingOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    PlusOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
    CopyOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    TeamOutlined,
    GlobalOutlined,
    LockOutlined,
    UnlockOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// Data mẫu
const API_CONNECTIONS = [
    {
        id: 1,
        platform: "Zoom",
        status: "connected",
        apiKey: "zoom_api_***************",
        apiSecret: "zoom_secret_***************",
        connectedAt: "2024-11-15 10:30:00",
        lastSync: "2024-12-11 09:00:00",
        totalMeetings: 45,
    },
    {
        id: 2,
        platform: "Google Meet",
        status: "disconnected",
        apiKey: "",
        apiSecret: "",
        connectedAt: null,
        lastSync: null,
        totalMeetings: 0,
    },
    {
        id: 3,
        platform: "Microsoft Teams",
        status: "connected",
        apiKey: "teams_api_***************",
        apiSecret: "teams_secret_***************",
        connectedAt: "2024-12-01 14:20:00",
        lastSync: "2024-12-11 08:45:00",
        totalMeetings: 12,
    },
];

const ONLINE_CLASSES = [
    {
        id: 1,
        name: "Kỹ năng bán hàng cơ bản - Nhóm 1",
        course: "Kỹ năng bán hàng cơ bản",
        instructor: "Nguyễn Văn An",
        platform: "Zoom",
        integrationType: "api",
        meetingLink: "https://zoom.us/j/1234567890",
        meetingId: "123 456 7890",
        passcode: "abc123",
        schedule: "2024-12-15 14:00:00",
        duration: 120,
        status: "scheduled",
        enrolledCount: 28,
        maxParticipants: 50,
        isRecording: true,
        autoReminder: true,
    },
    {
        id: 2,
        name: "Kỹ năng giao tiếp - Buổi 3",
        course: "Kỹ năng giao tiếp",
        instructor: "Trần Thị Bình",
        platform: "Google Meet",
        integrationType: "link",
        meetingLink: "https://meet.google.com/abc-defg-hij",
        schedule: "2024-12-12 09:00:00",
        duration: 90,
        status: "live",
        enrolledCount: 35,
        maxParticipants: 100,
        isRecording: false,
        autoReminder: true,
    },
    {
        id: 3,
        name: "Quản lý thời gian hiệu quả",
        course: "Quản lý thời gian",
        instructor: "Lê Văn Cường",
        platform: "Microsoft Teams",
        integrationType: "api",
        meetingLink: "https://teams.microsoft.com/l/meetup-join/...",
        meetingId: "987 654 321",
        schedule: "2024-12-18 15:30:00",
        duration: 60,
        status: "scheduled",
        enrolledCount: 15,
        maxParticipants: 30,
        isRecording: true,
        autoReminder: false,
    },
    {
        id: 4,
        name: "Đào tạo hội nhập - Tháng 12",
        course: "Đào tạo hội nhập",
        instructor: "Phạm Thị Dung",
        platform: "Zoom",
        integrationType: "api",
        meetingLink: "https://zoom.us/j/9876543210",
        meetingId: "987 654 3210",
        passcode: "xyz789",
        schedule: "2024-12-10 10:00:00",
        duration: 180,
        status: "completed",
        enrolledCount: 23,
        maxParticipants: 25,
        isRecording: true,
        autoReminder: true,
        recordingUrl: "https://example.com/recording/12345",
    },
];

const ENROLLED_STUDENTS = [
    {
        id: 1,
        name: "Nguyễn Hoàng Minh",
        email: "nguyenhoangminh@company.com",
        department: "Sales",
        avatar: "https://i.pravatar.cc/150?img=12",
        enrolledAt: "2024-12-01",
        attendance: "present",
    },
    {
        id: 2,
        name: "Trần Thị Mai Anh",
        email: "tran.mai.anh@company.com",
        department: "Marketing",
        avatar: "https://i.pravatar.cc/150?img=47",
        enrolledAt: "2024-12-01",
        attendance: "absent",
    },
    {
        id: 3,
        name: "Lê Quang Hải",
        email: "lequanghai@company.com",
        department: "Sales",
        avatar: "https://i.pravatar.cc/150?img=33",
        enrolledAt: "2024-12-02",
        attendance: "present",
    },
];

function OnlineClassIntegrationPage() {
    const [showCreateModal, setShowCreateModal] = React.useState(false);
    const [showSettingsModal, setShowSettingsModal] = React.useState(false);
    const [showEnrollModal, setShowEnrollModal] = React.useState(false);
    const [showApiModal, setShowApiModal] = React.useState(false);
    const [selectedClass, setSelectedClass] = React.useState(null);
    const [selectedPlatform, setSelectedPlatform] = React.useState(null);
    const [createStep, setCreateStep] = React.useState(0);

    React.useEffect(() => {
        document.title = "Tích hợp đào tạo trực tuyến - Mockup App";
    }, []);

    const getPlatformIcon = (platform) => {
        const config = {
            Zoom: { color: "#2D8CFF", icon: "📹" },
            "Google Meet": { color: "#34A853", icon: "📞" },
            "Microsoft Teams": { color: "#6264A7", icon: "💬" },
        };
        return config[platform] || { color: "#8c8c8c", icon: "🎥" };
    };

    const getStatusTag = (status) => {
        const config = {
            scheduled: { color: "blue", text: "Đã lên lịch" },
            live: { color: "green", text: "Đang live" },
            completed: { color: "default", text: "Đã kết thúc" },
            cancelled: { color: "red", text: "Đã hủy" },
        };
        const { color, text } = config[status] || config.scheduled;
        return <Tag color={color}>{text}</Tag>;
    };

    // Tab API Integration
    const apiIntegrationView = (
        <Row gutter={[24, 24]}>
            <Col xs={24}>
                <Card
                    title="Kết nối API với các nền tảng"
                    extra={
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setShowApiModal(true)}
                        >
                            Thêm kết nối
                        </Button>
                    }
                >
                    <Row gutter={[16, 16]}>
                        {API_CONNECTIONS.map((conn) => {
                            const { color, icon } = getPlatformIcon(conn.platform);
                            return (
                                <Col xs={24} md={8} key={conn.id}>
                                    <Card
                                        size="small"
                                        style={{
                                            borderColor: conn.status === "connected" ? color : "#d9d9d9",
                                        }}
                                    >
                                        <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Space>
                                                    <span style={{ fontSize: 32 }}>{icon}</span>
                                                    <div>
                                                        <Text strong style={{ fontSize: 16 }}>
                                                            {conn.platform}
                                                        </Text>
                                                        <br />
                                                        {conn.status === "connected" ? (
                                                            <Badge status="success" text="Đã kết nối" />
                                                        ) : (
                                                            <Badge status="default" text="Chưa kết nối" />
                                                        )}
                                                    </div>
                                                </Space>
                                            </div>

                                            {conn.status === "connected" && (
                                                <>
                                                    <div>
                                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                                            API Key:
                                                        </Text>
                                                        <br />
                                                        <Text style={{ fontSize: 11, fontFamily: "monospace" }}>
                                                            {conn.apiKey}
                                                        </Text>
                                                    </div>
                                                    <div>
                                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                                            Kết nối lúc: {conn.connectedAt}
                                                        </Text>
                                                        <br />
                                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                                            Đồng bộ lần cuối: {conn.lastSync}
                                                        </Text>
                                                    </div>
                                                    <Statistic
                                                        title="Tổng số buổi học"
                                                        value={conn.totalMeetings}
                                                        valueStyle={{ fontSize: 20 }}
                                                    />
                                                </>
                                            )}

                                            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                                                {conn.status === "connected" ? (
                                                    <>
                                                        <Button
                                                            size="small"
                                                            icon={<SettingOutlined />}
                                                            onClick={() => {
                                                                setSelectedPlatform(conn);
                                                                setShowApiModal(true);
                                                            }}
                                                        >
                                                            Cài đặt
                                                        </Button>
                                                        <Button size="small" danger>
                                                            Ngắt kết nối
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button
                                                        type="primary"
                                                        size="small"
                                                        onClick={() => {
                                                            setSelectedPlatform(conn);
                                                            setShowApiModal(true);
                                                        }}
                                                    >
                                                        Kết nối ngay
                                                    </Button>
                                                )}
                                            </Space>
                                        </Space>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Card>
            </Col>

            <Col xs={24}>
                <Card title="Hướng dẫn tích hợp">
                    <Steps
                        direction="vertical"
                        items={[
                            {
                                title: "Đăng ký tài khoản Developer",
                                description: "Truy cập Zoom/Google/Microsoft Developer Portal và đăng ký tài khoản",
                                status: "finish",
                            },
                            {
                                title: "Tạo App và lấy API credentials",
                                description: "Tạo app mới và copy API Key, API Secret",
                                status: "finish",
                            },
                            {
                                title: "Cấu hình OAuth và Webhook",
                                description: "Thiết lập redirect URL và webhook URL cho app",
                                status: "process",
                            },
                            {
                                title: "Nhập API credentials vào hệ thống",
                                description: "Paste API Key và Secret vào form bên trên",
                                status: "wait",
                            },
                        ]}
                    />
                </Card>
            </Col>
        </Row>
    );

    // Tab Manage Classes
    const manageClassesView = (
        <Card
            title="Danh sách lớp học trực tuyến"
            extra={
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setCreateStep(0);
                        setShowCreateModal(true);
                    }}
                >
                    Tạo lớp học mới
                </Button>
            }
        >
            <Table
                dataSource={ONLINE_CLASSES}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                columns={[
                    {
                        title: "Tên lớp học",
                        dataIndex: "name",
                        render: (name, record) => (
                            <div>
                                <Text strong>{name}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    Khóa học: {record.course}
                                </Text>
                            </div>
                        ),
                    },
                    {
                        title: "Giảng viên",
                        dataIndex: "instructor",
                    },
                    {
                        title: "Nền tảng",
                        dataIndex: "platform",
                        render: (platform, record) => {
                            const { color, icon } = getPlatformIcon(platform);
                            return (
                                <Space>
                                    <span style={{ fontSize: 20 }}>{icon}</span>
                                    <div>
                                        <Text>{platform}</Text>
                                        <br />
                                        <Tag color={record.integrationType === "api" ? "blue" : "green"}>
                                            {record.integrationType === "api" ? "API" : "Link"}
                                        </Tag>
                                    </div>
                                </Space>
                            );
                        },
                    },
                    {
                        title: "Thời gian",
                        dataIndex: "schedule",
                        render: (schedule, record) => (
                            <div>
                                <Text>{schedule}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    <ClockCircleOutlined /> {record.duration} phút
                                </Text>
                            </div>
                        ),
                    },
                    {
                        title: "Học viên",
                        dataIndex: "enrolledCount",
                        align: "center",
                        render: (count, record) => (
                            <div>
                                <Text strong>
                                    {count}/{record.maxParticipants}
                                </Text>
                            </div>
                        ),
                    },
                    {
                        title: "Trạng thái",
                        dataIndex: "status",
                        align: "center",
                        render: (status) => getStatusTag(status),
                    },
                    {
                        title: "Thao tác",
                        align: "center",
                        width: 200,
                        render: (_, record) => (
                            <Space>
                                <Tooltip title="Xem link">
                                    <Button
                                        size="small"
                                        icon={<EyeOutlined />}
                                        onClick={() => {
                                            Modal.info({
                                                title: "Link tham gia",
                                                content: (
                                                    <div>
                                                        <Paragraph copyable>{record.meetingLink}</Paragraph>
                                                        {record.meetingId && (
                                                            <div>
                                                                <Text strong>Meeting ID:</Text> {record.meetingId}
                                                                <br />
                                                                {record.passcode && (
                                                                    <>
                                                                        <Text strong>Passcode:</Text> {record.passcode}
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ),
                                            });
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title="Ghi danh">
                                    <Button
                                        size="small"
                                        icon={<UserAddOutlined />}
                                        onClick={() => {
                                            setSelectedClass(record);
                                            setShowEnrollModal(true);
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title="Cài đặt">
                                    <Button
                                        size="small"
                                        icon={<SettingOutlined />}
                                        onClick={() => {
                                            setSelectedClass(record);
                                            setShowSettingsModal(true);
                                        }}
                                    />
                                </Tooltip>
                            </Space>
                        ),
                    },
                ]}
            />
        </Card>
    );

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>
                    <VideoCameraOutlined style={{ marginRight: 8 }} />
                    Tích hợp đào tạo trực tuyến
                </Title>
                <Text type="secondary">
                    Kết nối với Zoom, Google Meet, Microsoft Teams để tổ chức lớp học trực tuyến
                </Text>
            </div>

            <Tabs
                defaultActiveKey="classes"
                items={[
                    {
                        key: "classes",
                        label: (
                            <span>
                                <VideoCameraOutlined /> Quản lý lớp học
                            </span>
                        ),
                        children: manageClassesView,
                    },
                    {
                        key: "integration",
                        label: (
                            <span>
                                <ApiOutlined /> Tích hợp API
                            </span>
                        ),
                        children: apiIntegrationView,
                    },
                ]}
            />

            {/* Modal Create Class */}
            <Modal
                title="Tạo lớp học trực tuyến mới"
                open={showCreateModal}
                onCancel={() => setShowCreateModal(false)}
                width={800}
                footer={[
                    <Button key="cancel" onClick={() => setShowCreateModal(false)}>
                        Hủy
                    </Button>,
                    createStep > 0 && (
                        <Button key="back" onClick={() => setCreateStep(createStep - 1)}>
                            Quay lại
                        </Button>
                    ),
                    createStep < 2 && (
                        <Button key="next" type="primary" onClick={() => setCreateStep(createStep + 1)}>
                            Tiếp theo
                        </Button>
                    ),
                    createStep === 2 && (
                        <Button
                            key="submit"
                            type="primary"
                            onClick={() => {
                                message.success("Đã tạo lớp học trực tuyến thành công!");
                                setShowCreateModal(false);
                            }}
                        >
                            Tạo lớp học
                        </Button>
                    ),
                ]}
            >
                <Steps
                    current={createStep}
                    style={{ marginBottom: 24 }}
                    items={[
                        { title: "Thông tin cơ bản" },
                        { title: "Cấu hình meeting" },
                        { title: "Ghi danh học viên" },
                    ]}
                />

                <Form layout="vertical">
                    {createStep === 0 && (
                        <>
                            <Form.Item label="Tên lớp học" required>
                                <Input placeholder="VD: Kỹ năng bán hàng - Nhóm 1" />
                            </Form.Item>
                            <Form.Item label="Chọn khóa học" required>
                                <Select
                                    placeholder="Chọn khóa học"
                                    options={[
                                        { value: "1", label: "Kỹ năng bán hàng cơ bản" },
                                        { value: "2", label: "Kỹ năng giao tiếp" },
                                        { value: "3", label: "Quản lý thời gian" },
                                        { value: "4", label: "Đào tạo hội nhập" },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item label="Giảng viên" required>
                                <Select
                                    placeholder="Chọn giảng viên"
                                    options={[
                                        { value: "1", label: "Nguyễn Văn An" },
                                        { value: "2", label: "Trần Thị Bình" },
                                        { value: "3", label: "Lê Văn Cường" },
                                    ]}
                                />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Thời gian bắt đầu" required>
                                        <DatePicker showTime style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Thời lượng (phút)" required>
                                        <InputNumber min={30} max={480} defaultValue={90} style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}

                    {createStep === 1 && (
                        <>
                            <Form.Item label="Chọn nền tảng" required>
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value="zoom">📹 Zoom</Radio>
                                        <Radio value="meet">📞 Google Meet</Radio>
                                        <Radio value="teams">💬 Microsoft Teams</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Phương thức tích hợp" required>
                                <Radio.Group defaultValue="api">
                                    <Space direction="vertical">
                                        <Radio value="api">
                                            <Space direction="vertical" size={0}>
                                                <Text strong>Tích hợp API (Khuyến nghị)</Text>
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    Tự động tạo meeting, quản lý học viên, ghi hình
                                                </Text>
                                            </Space>
                                        </Radio>
                                        <Radio value="link">
                                            <Space direction="vertical" size={0}>
                                                <Text strong>Sử dụng link trực tiếp</Text>
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    Dán link meeting có sẵn từ Zoom/Meet/Teams
                                                </Text>
                                            </Space>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Link meeting">
                                <Input placeholder="https://zoom.us/j/1234567890" />
                            </Form.Item>
                            <Form.Item label="Meeting ID (optional)">
                                <Input placeholder="123 456 7890" />
                            </Form.Item>
                            <Form.Item label="Passcode (optional)">
                                <Input placeholder="abc123" />
                            </Form.Item>
                            <Form.Item label="Số lượng tối đa">
                                <InputNumber min={1} max={1000} defaultValue={50} style={{ width: "100%" }} />
                            </Form.Item>
                        </>
                    )}

                    {createStep === 2 && (
                        <>
                            <Form.Item label="Ghi danh học viên">
                                <Select
                                    mode="multiple"
                                    placeholder="Chọn học viên"
                                    options={[
                                        { value: "1", label: "Nguyễn Hoàng Minh - Sales" },
                                        { value: "2", label: "Trần Thị Mai Anh - Marketing" },
                                        { value: "3", label: "Lê Quang Hải - Sales" },
                                        { value: "4", label: "Phạm Thị Thanh Hương - HR" },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>Ghi hình tự động</Text>
                                        <Switch defaultChecked />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>Gửi nhắc nhở tự động</Text>
                                        <Switch defaultChecked />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>Yêu cầu mật khẩu khi tham gia</Text>
                                        <Switch />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>Bật phòng chờ (Waiting room)</Text>
                                        <Switch defaultChecked />
                                    </div>
                                </Space>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>

            {/* Modal Settings */}
            <Modal
                title="Cài đặt lớp học"
                open={showSettingsModal}
                onCancel={() => setShowSettingsModal(false)}
                width={700}
                footer={[
                    <Button key="cancel" onClick={() => setShowSettingsModal(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="save"
                        type="primary"
                        onClick={() => {
                            message.success("Đã lưu cài đặt!");
                            setShowSettingsModal(false);
                        }}
                    >
                        Lưu cài đặt
                    </Button>,
                ]}
            >
                {selectedClass && (
                    <Form layout="vertical">
                        <Form.Item label="Tên lớp học">
                            <Input defaultValue={selectedClass.name} />
                        </Form.Item>
                        <Form.Item label="Link meeting">
                            <Input defaultValue={selectedClass.meetingLink} />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Thời gian">
                                    <DatePicker showTime style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Thời lượng (phút)">
                                    <InputNumber defaultValue={selectedClass.duration} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Số lượng tối đa">
                            <InputNumber defaultValue={selectedClass.maxParticipants} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item label="Cài đặt bảo mật và tính năng">
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Text>Ghi hình tự động</Text>
                                    <Switch defaultChecked={selectedClass.isRecording} />
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Text>Gửi nhắc nhở tự động</Text>
                                    <Switch defaultChecked={selectedClass.autoReminder} />
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Text>Yêu cầu mật khẩu</Text>
                                    <Switch defaultChecked={!!selectedClass.passcode} />
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Text>Bật phòng chờ</Text>
                                    <Switch defaultChecked />
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Text>Cho phép chia sẻ màn hình</Text>
                                    <Switch defaultChecked />
                                </div>
                            </Space>
                        </Form.Item>
                    </Form>
                )}
            </Modal>

            {/* Modal Enroll Students */}
            <Modal
                title="Ghi danh học viên"
                open={showEnrollModal}
                onCancel={() => setShowEnrollModal(false)}
                width={800}
                footer={[
                    <Button key="close" onClick={() => setShowEnrollModal(false)}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedClass && (
                    <div>
                        <div style={{ marginBottom: 16 }}>
                            <Text strong>Lớp học: </Text>
                            <Text>{selectedClass.name}</Text>
                            <br />
                            <Text type="secondary">
                                Đã ghi danh: {selectedClass.enrolledCount}/{selectedClass.maxParticipants}
                            </Text>
                        </div>

                        <Form.Item>
                            <Select
                                mode="multiple"
                                placeholder="Thêm học viên mới"
                                style={{ width: "100%" }}
                                options={[
                                    { value: "5", label: "Hoàng Văn Đức - Sales" },
                                    { value: "6", label: "Nguyễn Thị Lan - Marketing" },
                                    { value: "7", label: "Đỗ Thị Thảo - HR" },
                                ]}
                            />
                            <Button type="primary" style={{ marginTop: 8 }}>
                                Thêm học viên
                            </Button>
                        </Form.Item>

                        <Table
                            dataSource={ENROLLED_STUDENTS}
                            rowKey="id"
                            pagination={false}
                            columns={[
                                {
                                    title: "Học viên",
                                    dataIndex: "name",
                                    render: (name, record) => (
                                        <Space>
                                            <Avatar src={record.avatar}>{name[0]}</Avatar>
                                            <div>
                                                <Text strong>{name}</Text>
                                                <br />
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    {record.department}
                                                </Text>
                                            </div>
                                        </Space>
                                    ),
                                },
                                {
                                    title: "Email",
                                    dataIndex: "email",
                                },
                                {
                                    title: "Ngày ghi danh",
                                    dataIndex: "enrolledAt",
                                },
                                {
                                    title: "Điểm danh",
                                    dataIndex: "attendance",
                                    render: (attendance) =>
                                        attendance === "present" ? (
                                            <Tag color="green">Có mặt</Tag>
                                        ) : (
                                            <Tag color="red">Vắng</Tag>
                                        ),
                                },
                                {
                                    title: "Thao tác",
                                    render: () => (
                                        <Button size="small" danger icon={<DeleteOutlined />}>
                                            Xóa
                                        </Button>
                                    ),
                                },
                            ]}
                        />
                    </div>
                )}
            </Modal>

            {/* Modal API Connection */}
            <Modal
                title={`Kết nối ${selectedPlatform?.platform || "API"}`}
                open={showApiModal}
                onCancel={() => {
                    setShowApiModal(false);
                    setSelectedPlatform(null);
                }}
                width={600}
                footer={[
                    <Button key="cancel" onClick={() => setShowApiModal(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="connect"
                        type="primary"
                        onClick={() => {
                            message.success("Đã kết nối API thành công!");
                            setShowApiModal(false);
                        }}
                    >
                        {selectedPlatform?.status === "connected" ? "Cập nhật" : "Kết nối"}
                    </Button>,
                ]}
            >
                {selectedPlatform && (
                    <Form layout="vertical">
                        <Form.Item label="API Key" required>
                            <Input.Password
                                placeholder="Nhập API Key"
                                defaultValue={selectedPlatform.apiKey}
                            />
                        </Form.Item>
                        <Form.Item label="API Secret" required>
                            <Input.Password
                                placeholder="Nhập API Secret"
                                defaultValue={selectedPlatform.apiSecret}
                            />
                        </Form.Item>
                        <Form.Item label="Webhook URL">
                            <Input
                                value="https://your-lms.com/webhook/zoom"
                                addonAfter={
                                    <Tooltip title="Copy">
                                        <CopyOutlined
                                            onClick={() => {
                                                navigator.clipboard.writeText("https://your-lms.com/webhook/zoom");
                                                message.success("Đã copy URL!");
                                            }}
                                        />
                                    </Tooltip>
                                }
                                readOnly
                            />
                        </Form.Item>
                        <div
                            style={{
                                background: "#e6f7ff",
                                border: "1px solid #91d5ff",
                                padding: 12,
                                borderRadius: 4,
                            }}
                        >
                            <Text strong>💡 Hướng dẫn:</Text>
                            <br />
                            <Text style={{ fontSize: 12 }}>
                                1. Truy cập {selectedPlatform.platform} Developer Portal
                                <br />
                                2. Tạo app mới và copy API Key, Secret
                                <br />
                                3. Cấu hình Webhook URL vào app settings
                                <br />
                                4. Paste credentials vào form trên và click Kết nối
                            </Text>
                        </div>
                    </Form>
                )}
            </Modal>
        </div>
    );
}

export default OnlineClassIntegrationPage;
