import React from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Input,
    InputNumber,
    Table,
    message,
    Row,
    Col,
    Select,
    Radio,
    Divider,
    Tag,
    Progress,
    Avatar,
    Tabs,
    Modal,
    Form,
    List,
    Badge,
    Statistic,
    Timeline,
    Tooltip,
    Switch,
} from "antd";
import {
    TrophyOutlined,
    GiftOutlined,
    CrownOutlined,
    FireOutlined,
    StarOutlined,
    ThunderboltOutlined,
    RocketOutlined,
    HeartOutlined,
    TeamOutlined,
    SettingOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    EyeOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// Data mẫu
const EVENTS = [
    {
        id: 1,
        name: "Sprint học tập tháng 12",
        description: "Hoàn thành nhiều bài học nhất trong tháng",
        startDate: "2024-12-01",
        endDate: "2024-12-31",
        status: "active",
        prizes: ["Gift card 500k", "Gift card 300k", "Gift card 100k"],
        participants: 156,
    },
    {
        id: 2,
        name: "Onboarding Challenge",
        description: "Dành cho nhân viên mới hoàn thành chương trình đào tạo hội nhập",
        startDate: "2024-12-01",
        endDate: "2024-12-15",
        status: "active",
        prizes: ["Welcome Kit", "Branded T-shirt"],
        participants: 23,
    },
    {
        id: 3,
        name: "Sales Champion",
        description: "Top nhân viên sale có điểm cao nhất",
        startDate: "2024-11-01",
        endDate: "2024-11-30",
        status: "completed",
        prizes: ["Bonus 2M", "Bonus 1M", "Bonus 500k"],
        participants: 87,
    },
];

const BADGES = [
    {
        id: 1,
        name: "Người mới bắt đầu",
        icon: "🌱",
        description: "Hoàn thành khóa học đầu tiên",
        condition: "Hoàn thành 1 khóa học",
        color: "#52c41a",
        earnedBy: 145,
    },
    {
        id: 2,
        name: "Học viên chăm chỉ",
        icon: "📚",
        description: "Hoàn thành 5 khóa học",
        condition: "Hoàn thành 5 khóa học",
        color: "#1677ff",
        earnedBy: 89,
    },
    {
        id: 3,
        name: "Tốc độ ánh sáng",
        icon: "⚡",
        description: "Hoàn thành khóa học trong 3 ngày",
        condition: "Hoàn thành khóa học < 3 ngày",
        color: "#faad14",
        earnedBy: 45,
    },
    {
        id: 4,
        name: "Điểm số hoàn hảo",
        icon: "💯",
        description: "Đạt 100% điểm trong quiz",
        condition: "Điểm quiz = 100%",
        color: "#eb2f96",
        earnedBy: 67,
    },
    {
        id: 5,
        name: "Champion",
        icon: "🏆",
        description: "Top 1 bảng xếp hạng tháng",
        condition: "Top 1 tháng",
        color: "#faad14",
        earnedBy: 12,
    },
];

const REWARDS = [
    {
        id: 1,
        name: "Gift Card 100K",
        points: 500,
        stock: 20,
        redeemed: 8,
        image: "🎁",
        category: "voucher",
    },
    {
        id: 2,
        name: "Gift Card 300K",
        points: 1500,
        stock: 10,
        redeemed: 3,
        image: "🎁",
        category: "voucher",
    },
    {
        id: 3,
        name: "Branded T-Shirt",
        points: 800,
        stock: 30,
        redeemed: 12,
        image: "👕",
        category: "merchandise",
    },
    {
        id: 4,
        name: "Starbucks Voucher",
        points: 300,
        stock: 50,
        redeemed: 25,
        image: "☕",
        category: "food",
    },
    {
        id: 5,
        name: "1 Ngày nghỉ phép",
        points: 2000,
        stock: 5,
        redeemed: 1,
        image: "🏖️",
        category: "special",
    },
];

const LEADERBOARD = [
    {
        rank: 1,
        name: "Nguyễn Hoàng Minh",
        department: "Sales",
        points: 2450,
        currentPoints: 950,
        convertedPoints: 1500,
        badges: 5,
        badgeIcons: ["🌱", "📚", "⚡", "💯", "🏆"],
        coursesCompleted: 12,
        avatar: "https://i.pravatar.cc/150?img=12",
        trend: "up",
    },
    {
        rank: 2,
        name: "Trần Thị Mai Anh",
        department: "Marketing",
        points: 2280,
        currentPoints: 780,
        convertedPoints: 1500,
        badges: 4,
        badgeIcons: ["🌱", "📚", "⚡", "💯"],
        coursesCompleted: 11,
        avatar: "https://i.pravatar.cc/150?img=47",
        trend: "up",
    },
    {
        rank: 3,
        name: "Lê Quang Hải",
        department: "Sales",
        points: 2150,
        currentPoints: 1150,
        convertedPoints: 1000,
        badges: 4,
        badgeIcons: ["🌱", "📚", "⚡", "💯"],
        coursesCompleted: 10,
        avatar: "https://i.pravatar.cc/150?img=33",
        trend: "down",
    },
    {
        rank: 4,
        name: "Phạm Thị Thanh Hương",
        department: "HR",
        points: 1980,
        currentPoints: 480,
        convertedPoints: 1500,
        badges: 3,
        badgeIcons: ["🌱", "📚", "⚡"],
        coursesCompleted: 9,
        avatar: "https://i.pravatar.cc/150?img=20",
        trend: "same",
    },
    {
        rank: 5,
        name: "Hoàng Văn Đức",
        department: "Sales",
        points: 1850,
        currentPoints: 350,
        convertedPoints: 1500,
        badges: 3,
        badgeIcons: ["🌱", "📚", "⚡"],
        coursesCompleted: 8,
        avatar: "https://i.pravatar.cc/150?img=68",
        trend: "up",
    },
];

const REDEMPTION_HISTORY = [
    {
        id: 1,
        user: "Nguyễn Hoàng Minh",
        reward: "Gift Card 300K",
        points: 1500,
        date: "2024-12-08",
        status: "delivered",
    },
    {
        id: 2,
        user: "Trần Thị Mai Anh",
        reward: "Branded T-Shirt",
        points: 800,
        date: "2024-12-07",
        status: "processing",
    },
    {
        id: 3,
        user: "Lê Quang Hải",
        reward: "Starbucks Voucher",
        points: 300,
        date: "2024-12-06",
        status: "delivered",
    },
];

function KnowledgeRacePage() {
    const [viewMode, setViewMode] = React.useState("teacher"); // teacher or student
    const [showEventModal, setShowEventModal] = React.useState(false);
    const [showBadgeModal, setShowBadgeModal] = React.useState(false);
    const [showRewardModal, setShowRewardModal] = React.useState(false);
    const [showRedeemModal, setShowRedeemModal] = React.useState(false);
    const [selectedPeriod, setSelectedPeriod] = React.useState("month");
    const [sortBy, setSortBy] = React.useState("rank"); // rank, points, badges
    const [studentView, setStudentView] = React.useState("events"); // events or event-detail
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    
    // Student data
    const currentUser = {
        name: "Nguyễn Hoàng Minh",
        department: "Sales",
        points: 2450,
        rank: 1,
        badges: [1, 2, 3, 4, 5],
        coursesCompleted: 12,
        currentStreak: 15,
        avatar: "https://i.pravatar.cc/150?img=12",
    };

    // Student redemption history
    const myRedemptions = [
        {
            id: 1,
            rewardName: "Gift Card 100K",
            rewardImage: "🎁",
            points: 500,
            date: "2024-12-08",
            status: "delivered",
        },
        {
            id: 2,
            rewardName: "Starbucks Voucher",
            rewardImage: "☕",
            points: 300,
            date: "2024-12-05",
            status: "delivered",
        },
        {
            id: 3,
            rewardName: "Branded T-Shirt",
            rewardImage: "👕",
            points: 800,
            date: "2024-12-10",
            status: "processing",
        },
    ];

    // Student events data
    const studentEvents = [
        {
            id: 1,
            name: "Sprint học tập tháng 12",
            description: "Thi đua hoàn thành khóa học trong tháng 12",
            startDate: "2024-12-01",
            endDate: "2024-12-31",
            status: "active",
            myRank: 1,
            myPoints: 2450,
            totalParticipants: 156,
            myBadges: 5,
            coursesCompleted: 12,
        },
        {
            id: 2,
            name: "Onboarding Challenge Q4",
            description: "Thử thách dành cho nhân viên mới",
            startDate: "2024-10-01",
            endDate: "2024-12-31",
            status: "active",
            myRank: 3,
            myPoints: 1850,
            totalParticipants: 23,
            myBadges: 4,
            coursesCompleted: 8,
        },
        {
            id: 3,
            name: "Sales Champion 2024",
            description: "Cuộc thi kỹ năng bán hàng toàn công ty",
            startDate: "2024-11-01",
            endDate: "2024-11-30",
            status: "ended",
            myRank: 2,
            myPoints: 3200,
            totalParticipants: 87,
            myBadges: 6,
            coursesCompleted: 15,
        },
    ];

    React.useEffect(() => {
        document.title = "Đường đua tri thức - Mockup App";
    }, []);

    // Sort leaderboard based on selected criteria
    const sortedLeaderboard = React.useMemo(() => {
        const data = [...LEADERBOARD];
        if (sortBy === "points") {
            return data.sort((a, b) => b.points - a.points);
        } else if (sortBy === "badges") {
            return data.sort((a, b) => b.badges - a.badges);
        }
        return data; // default: by rank
    }, [sortBy]);

    const leaderboardColumns = [
        {
            title: "Hạng",
            dataIndex: "rank",
            width: 80,
            render: (rank) => {
                if (rank === 1) return <CrownOutlined style={{ fontSize: 24, color: "#faad14" }} />;
                if (rank === 2) return <CrownOutlined style={{ fontSize: 24, color: "#d9d9d9" }} />;
                if (rank === 3) return <CrownOutlined style={{ fontSize: 24, color: "#cd7f32" }} />;
                return <Text strong>#{rank}</Text>;
            },
        },
        {
            title: "Học viên",
            dataIndex: "name",
            render: (name, record) => (
                <Space>
                    <Avatar src={record.avatar} style={{ backgroundColor: "#1677ff" }}>
                        {!record.avatar && name.charAt(0)}
                    </Avatar>
                    <div>
                        <div>{name}</div>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            {record.department}
                        </Text>
                    </div>
                </Space>
            ),
        },
        {
            title: "Điểm",
            dataIndex: "points",
            render: (points, record) => (
                <Space direction="vertical" size={0}>
                    <Tag color="blue" style={{ fontSize: 14, padding: "4px 12px", marginBottom: 4 }}>
                        <StarOutlined /> Tổng: {points}
                    </Tag>
                    <div style={{ fontSize: 12 }}>
                        <Text type="secondary">Hiện tại: {record.currentPoints}</Text>
                        <Divider type="vertical" />
                        <Text type="secondary">Đã đổi: {record.convertedPoints}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: "Huy hiệu",
            dataIndex: "badgeIcons",
            render: (badgeIcons, record) => (
                <Space size={4}>
                    {badgeIcons && badgeIcons.length > 0 ? (
                        badgeIcons.slice(0, 5).map((icon, index) => (
                            <Tooltip key={index} title={BADGES.find((b) => b.icon === icon)?.name || "Huy hiệu"}>
                                <span style={{ fontSize: 20 }}>{icon}</span>
                            </Tooltip>
                        ))
                    ) : (
                        <Text type="secondary">Chưa có</Text>
                    )}
                    {badgeIcons && badgeIcons.length > 5 && (
                        <Tag color="gold">+{badgeIcons.length - 5}</Tag>
                    )}
                </Space>
            ),
        },
        {
            title: "Khóa học",
            dataIndex: "coursesCompleted",
            render: (count) => `${count} khóa`,
        },
        {
            title: "Xu hướng",
            dataIndex: "trend",
            render: (trend) => {
                if (trend === "up") return <Tag color="success">↑</Tag>;
                if (trend === "down") return <Tag color="error">↓</Tag>;
                return <Tag>→</Tag>;
            },
        },
    ];

    const teacherView = (
        <Tabs
            items={[
                {
                    key: "events",
                    label: (
                        <span>
                            <FireOutlined /> Sự kiện
                        </span>
                    ),
                    children: (
                        <Space direction="vertical" style={{ width: "100%" }} size="large">
                            <Card
                                title="Danh sách sự kiện"
                                extra={
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => setShowEventModal(true)}
                                    >
                                        Tạo sự kiện mới
                                    </Button>
                                }
                            >
                                <Row gutter={[16, 16]}>
                                    {EVENTS.map((event) => (
                                        <Col xs={24} md={12} lg={8} key={event.id}>
                                            <Card
                                                size="small"
                                                hoverable
                                                actions={[
                                                    <EditOutlined key="edit" />,
                                                    <DeleteOutlined key="delete" />,
                                                    <EyeOutlined key="view" />,
                                                ]}
                                            >
                                                <Space direction="vertical" style={{ width: "100%" }}>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        <Text strong>{event.name}</Text>
                                                        <Tag
                                                            color={
                                                                event.status === "active"
                                                                    ? "success"
                                                                    : "default"
                                                            }
                                                        >
                                                            {event.status === "active"
                                                                ? "Đang diễn ra"
                                                                : "Đã kết thúc"}
                                                        </Tag>
                                                    </div>
                                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                                        {event.description}
                                                    </Text>
                                                    <Divider style={{ margin: "8px 0" }} />
                                                    <Space>
                                                        <TeamOutlined />
                                                        <Text>{event.participants} người tham gia</Text>
                                                    </Space>
                                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                                        {event.startDate} → {event.endDate}
                                                    </Text>
                                                </Space>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Card>
                        </Space>
                    ),
                },
                {
                    key: "badges",
                    label: (
                        <span>
                            <TrophyOutlined /> Huy hiệu
                        </span>
                    ),
                    children: (
                        <Card
                            title="Quản lý huy hiệu"
                            extra={
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setShowBadgeModal(true)}
                                >
                                    Tạo huy hiệu mới
                                </Button>
                            }
                        >
                            <Row gutter={[16, 16]}>
                                {BADGES.map((badge) => (
                                    <Col xs={24} sm={12} md={8} key={badge.id}>
                                        <Card
                                            size="small"
                                            hoverable
                                            style={{ borderColor: badge.color }}
                                        >
                                            <Space direction="vertical" style={{ width: "100%" }}>
                                                <div style={{ textAlign: "center", fontSize: 48 }}>
                                                    {badge.icon}
                                                </div>
                                                <Text strong style={{ textAlign: "center", display: "block" }}>
                                                    {badge.name}
                                                </Text>
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    {badge.description}
                                                </Text>
                                                <Divider style={{ margin: "8px 0" }} />
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    Điều kiện: {badge.condition}
                                                </Text>
                                                <Tag color="blue">{badge.earnedBy} người đạt được</Tag>
                                            </Space>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    ),
                },
                {
                    key: "rewards",
                    label: (
                        <span>
                            <GiftOutlined /> Quà tặng
                        </span>
                    ),
                    children: (
                        <Card
                            title="Quản lý quà tặng"
                            extra={
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setShowRewardModal(true)}
                                >
                                    Thêm quà tặng
                                </Button>
                            }
                        >
                            <Table
                                dataSource={REWARDS}
                                columns={[
                                    {
                                        title: "Quà tặng",
                                        dataIndex: "name",
                                        render: (name, record) => (
                                            <Space>
                                                <span style={{ fontSize: 24 }}>{record.image}</span>
                                                <div>
                                                    <div>{name}</div>
                                                    <Tag>{record.category}</Tag>
                                                </div>
                                            </Space>
                                        ),
                                    },
                                    {
                                        title: "Điểm yêu cầu",
                                        dataIndex: "points",
                                        render: (points) => (
                                            <Tag color="gold">
                                                <StarOutlined /> {points} điểm
                                            </Tag>
                                        ),
                                    },
                                    {
                                        title: "Tồn kho",
                                        dataIndex: "stock",
                                        render: (stock, record) => (
                                            <Progress
                                                percent={
                                                    ((stock - record.redeemed) / stock) * 100
                                                }
                                                format={() =>
                                                    `${stock - record.redeemed}/${stock}`
                                                }
                                                size="small"
                                            />
                                        ),
                                    },
                                    {
                                        title: "Đã đổi",
                                        dataIndex: "redeemed",
                                    },
                                    {
                                        title: "Thao tác",
                                        render: () => (
                                            <Space>
                                                <Button size="small" icon={<EditOutlined />}>
                                                    Sửa
                                                </Button>
                                                <Button
                                                    size="small"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                >
                                                    Xóa
                                                </Button>
                                            </Space>
                                        ),
                                    },
                                ]}
                            />
                        </Card>
                    ),
                },
                {
                    key: "leaderboard",
                    label: (
                        <span>
                            <CrownOutlined /> Bảng xếp hạng
                        </span>
                    ),
                    children: (
                        <Card
                            title="Bảng xếp hạng"
                            extra={
                                <Space>
                                    <Text type="secondary">Thời gian:</Text>
                                    <Select
                                        value={selectedPeriod}
                                        onChange={setSelectedPeriod}
                                        style={{ width: 120 }}
                                        options={[
                                            { value: "week", label: "Tuần này" },
                                            { value: "month", label: "Tháng này" },
                                            { value: "all", label: "Tổng thể" },
                                        ]}
                                    />
                                    <Text type="secondary">Sắp xếp:</Text>
                                    <Select
                                        value={sortBy}
                                        onChange={setSortBy}
                                        style={{ width: 140 }}
                                        options={[
                                            { value: "rank", label: "Theo hạng" },
                                            { value: "points", label: "Theo điểm" },
                                            { value: "badges", label: "Theo huy hiệu" },
                                        ]}
                                    />
                                </Space>
                            }
                        >
                            <Table
                                dataSource={sortedLeaderboard}
                                columns={leaderboardColumns}
                                pagination={{ pageSize: 10 }}
                            />
                        </Card>
                    ),
                },
                {
                    key: "redemptions",
                    label: (
                        <span>
                            <CheckCircleOutlined /> Đổi thưởng
                        </span>
                    ),
                    children: (
                        <Card title="Lịch sử đổi thưởng">
                            <Table
                                dataSource={REDEMPTION_HISTORY}
                                columns={[
                                    { title: "Học viên", dataIndex: "user" },
                                    {
                                        title: "Quà tặng",
                                        dataIndex: "reward",
                                    },
                                    {
                                        title: "Điểm",
                                        dataIndex: "points",
                                        render: (points) => (
                                            <Tag color="gold">
                                                <StarOutlined /> {points}
                                            </Tag>
                                        ),
                                    },
                                    {
                                        title: "Ngày đổi",
                                        dataIndex: "date",
                                    },
                                    {
                                        title: "Trạng thái",
                                        dataIndex: "status",
                                        render: (status) => (
                                            <Tag
                                                color={
                                                    status === "delivered"
                                                        ? "success"
                                                        : "processing"
                                                }
                                            >
                                                {status === "delivered"
                                                    ? "Đã giao"
                                                    : "Đang xử lý"}
                                            </Tag>
                                        ),
                                    },
                                ]}
                            />
                        </Card>
                    ),
                },
            ]}
        />
    );

    // Events List View
    const eventsListView = (
        <Row gutter={[24, 24]}>
            <Col xs={24}>
                <Card title={<span><FireOutlined /> Danh sách sự kiện</span>}>
                    <Row gutter={[16, 16]}>
                        {studentEvents.map((event) => (
                            <Col xs={24} md={12} lg={8} key={event.id}>
                                <Card
                                    hoverable
                                    style={{ height: "100%" }}
                                    actions={[
                                        <Button
                                            type="primary"
                                            icon={<EyeOutlined />}
                                            onClick={() => {
                                                setSelectedEvent(event);
                                                setStudentView("event-detail");
                                            }}
                                        >
                                            Xem chi tiết
                                        </Button>,
                                    ]}
                                >
                                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                        <div>
                                            <Tag color={event.status === "active" ? "green" : "default"}>
                                                {event.status === "active" ? "Đang diễn ra" : "Đã kết thúc"}
                                            </Tag>
                                            <Title level={5} style={{ marginTop: 8 }}>
                                                {event.name}
                                            </Title>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                {event.description}
                                            </Text>
                                        </div>
                                        <Divider style={{ margin: "8px 0" }} />
                                        <Row gutter={[8, 8]}>
                                            <Col span={12}>
                                                <Statistic
                                                    title="Hạng của tôi"
                                                    value={event.myRank}
                                                    prefix={<CrownOutlined />}
                                                    valueStyle={{ fontSize: 20 }}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <Statistic
                                                    title="Điểm"
                                                    value={event.myPoints}
                                                    prefix={<StarOutlined />}
                                                    valueStyle={{ fontSize: 20 }}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <Statistic
                                                    title="Huy hiệu"
                                                    value={event.myBadges}
                                                    prefix={<TrophyOutlined />}
                                                    valueStyle={{ fontSize: 16 }}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <Statistic
                                                    title="Khóa học"
                                                    value={event.coursesCompleted}
                                                    valueStyle={{ fontSize: 16 }}
                                                />
                                            </Col>
                                        </Row>
                                        <div>
                                            <Text type="secondary" style={{ fontSize: 11 }}>
                                                <ClockCircleOutlined /> {event.startDate} → {event.endDate}
                                            </Text>
                                            <br />
                                            <Text type="secondary" style={{ fontSize: 11 }}>
                                                <TeamOutlined /> {event.totalParticipants} người tham gia
                                            </Text>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card>
            </Col>
        </Row>
    );

    // Event Detail View
    const eventDetailView = selectedEvent && (
        <Row gutter={[24, 24]}>
            <Col xs={24}>
                <Button
                    icon={<span>←</span>}
                    onClick={() => {
                        setStudentView("events");
                        setSelectedEvent(null);
                    }}
                    style={{ marginBottom: 16 }}
                >
                    Quay lại danh sách
                </Button>
            </Col>
            <Col xs={24}>
                <Card
                    style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                        <Title level={3} style={{ color: "white", marginBottom: 8 }}>
                            {selectedEvent.name}
                        </Title>
                        <Text style={{ color: "white", fontSize: 14 }}>
                            {selectedEvent.description}
                        </Text>
                    </div>
                    <Row justify="center" gutter={16}>
                        <Col xs={24} md={6} style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                            <div style={{ textAlign: "center" }}>
                                <Avatar size={80} src={currentUser.avatar} style={{ backgroundColor: "#fff", color: "#667eea" }}>
                                    {currentUser.name[0]}
                                </Avatar>
                                <Title level={4} style={{ color: "white", marginTop: 12, marginBottom: 4 }}>
                                    {currentUser.name}
                                </Title>
                                <Text style={{ color: "white" }}>{currentUser.department}</Text>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col xs={12} sm={6}>
                            <div style={{ textAlign: "center" }}>
                                <Statistic
                                    title={<span style={{ color: "white" }}>Hạng hiện tại</span>}
                                    value={selectedEvent.myRank}
                                    prefix={<CrownOutlined />}
                                    valueStyle={{ color: "white" }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div style={{ textAlign: "center" }}>
                                <Statistic
                                    title={<span style={{ color: "white" }}>Tổng điểm</span>}
                                    value={selectedEvent.myPoints}
                                    prefix={<StarOutlined />}
                                    valueStyle={{ color: "white" }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div style={{ textAlign: "center" }}>
                                <Statistic
                                    title={<span style={{ color: "white" }}>Huy hiệu</span>}
                                    value={selectedEvent.myBadges}
                                    prefix={<TrophyOutlined />}
                                    valueStyle={{ color: "white" }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div style={{ textAlign: "center" }}>
                                <Statistic
                                    title={<span style={{ color: "white" }}>Khóa học hoàn thành</span>}
                                    value={selectedEvent.coursesCompleted}
                                    valueStyle={{ color: "white" }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Col>

            <Col xs={24} lg={16}>
                <Tabs
                    items={[
                        {
                            key: "leaderboard",
                            label: (
                                <span>
                                    <CrownOutlined /> Bảng xếp hạng
                                </span>
                            ),
                            children: (
                                <Card
                                    extra={
                                        <Select
                                            value={selectedPeriod}
                                            onChange={setSelectedPeriod}
                                            style={{ width: 120 }}
                                            options={[
                                                { value: "week", label: "Tuần này" },
                                                { value: "month", label: "Tháng này" },
                                                { value: "all", label: "Tổng thể" },
                                            ]}
                                        />
                                    }
                                >
                                    <Table
                                        dataSource={LEADERBOARD}
                                        columns={leaderboardColumns}
                                        pagination={false}
                                    />
                                </Card>
                            ),
                        },
                        {
                            key: "rewards",
                            label: (
                                <span>
                                    <GiftOutlined /> Đổi quà
                                </span>
                            ),
                            children: (
                                <Card 
                                    title="Lịch sử đổi quà"
                                    extra={
                                        <Button
                                            type="primary"
                                            icon={<GiftOutlined />}
                                            onClick={() => setShowRedeemModal(true)}
                                        >
                                            Đổi quà mới
                                        </Button>
                                    }
                                >
                                    <Table
                                        dataSource={myRedemptions}
                                        pagination={false}
                                        columns={[
                                            {
                                                title: "Quà tặng",
                                                dataIndex: "rewardName",
                                                render: (name, record) => (
                                                    <Space>
                                                        <span style={{ fontSize: 32 }}>{record.rewardImage}</span>
                                                        <Text strong>{name}</Text>
                                                    </Space>
                                                ),
                                            },
                                            {
                                                title: "Điểm",
                                                dataIndex: "points",
                                                render: (points) => (
                                                    <Tag color="gold">
                                                        <StarOutlined /> {points}
                                                    </Tag>
                                                ),
                                            },
                                            {
                                                title: "Ngày đổi",
                                                dataIndex: "date",
                                            },
                                            {
                                                title: "Trạng thái",
                                                dataIndex: "status",
                                                render: (status) => (
                                                    <Tag color={status === "delivered" ? "green" : "blue"}>
                                                        {status === "delivered" ? "Đã giao" : "Đang xử lý"}
                                                    </Tag>
                                                ),
                                            },
                                        ]}
                                    />
                                </Card>
                            ),
                        },
                    ]}
                />
            </Col>

            <Col xs={24} lg={8}>
                <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <Card title={<span><TrophyOutlined /> Huy hiệu của tôi</span>}>
                        <Row gutter={[8, 8]}>
                            {BADGES.filter((b) => currentUser.badges.includes(b.id)).map((badge) => (
                                <Col span={12} key={badge.id}>
                                    <Tooltip title={badge.description}>
                                        <Card
                                            size="small"
                                            hoverable
                                            style={{
                                                textAlign: "center",
                                                borderColor: badge.color,
                                            }}
                                        >
                                            <div style={{ fontSize: 32 }}>{badge.icon}</div>
                                            <Text strong style={{ fontSize: 11 }}>
                                                {badge.name}
                                            </Text>
                                        </Card>
                                    </Tooltip>
                                </Col>
                            ))}
                        </Row>
                    </Card>

                    <Card title="📊 Cách kiếm điểm">
                        <Space direction="vertical" style={{ width: "100%" }} size="small">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text>Hoàn thành bài học</Text>
                                <Tag color="blue">+50 điểm</Tag>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text>Hoàn thành quiz (&gt;80%)</Text>
                                <Tag color="blue">+100 điểm</Tag>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text>Nhận chứng chỉ</Text>
                                <Tag color="blue">+200 điểm</Tag>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text>Học liên tục 7 ngày</Text>
                                <Tag color="blue">+150 điểm</Tag>
                            </div>
                        </Space>
                    </Card>
                </Space>
            </Col>
        </Row>
    );

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                }}
            >
                <Title level={2} style={{ margin: 0 }}>
                    <RocketOutlined style={{ marginRight: 8 }} />
                    Đường đua tri thức
                </Title>
                <Radio.Group 
                    value={viewMode} 
                    onChange={(e) => {
                        setViewMode(e.target.value);
                        if (e.target.value === "student") {
                            setStudentView("events");
                            setSelectedEvent(null);
                        }
                    }}
                >
                    <Radio.Button value="teacher">
                        <SettingOutlined /> Giảng viên
                    </Radio.Button>
                    <Radio.Button value="student">
                        <TeamOutlined /> Học viên
                    </Radio.Button>
                </Radio.Group>
            </div>

            {viewMode === "teacher" 
                ? teacherView 
                : (studentView === "events" ? eventsListView : eventDetailView)
            }

            {/* Modals */}
            <Modal
                title="Tạo sự kiện mới"
                open={showEventModal}
                onCancel={() => setShowEventModal(false)}
                width={800}
                footer={[
                    <Button key="cancel" onClick={() => setShowEventModal(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="save"
                        type="primary"
                        onClick={() => {
                            message.success("Đã tạo sự kiện mới!");
                            setShowEventModal(false);
                        }}
                    >
                        Tạo sự kiện
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Tabs
                        items={[
                            {
                                key: "basic",
                                label: "Thông tin cơ bản",
                                children: (
                                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                        <Form.Item label="Tên sự kiện" required>
                                            <Input placeholder="VD: Sprint học tập tháng 12" />
                                        </Form.Item>
                                        <Form.Item label="Mô tả">
                                            <TextArea
                                                rows={3}
                                                placeholder="Mô tả chi tiết về sự kiện, mục tiêu..."
                                            />
                                        </Form.Item>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item label="Ngày bắt đầu" required>
                                                    <Input type="date" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Ngày kết thúc" required>
                                                    <Input type="date" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Form.Item label="Loại sự kiện">
                                            <Select
                                                placeholder="Chọn loại sự kiện"
                                                options={[
                                                    { value: "competition", label: "🏆 Thi đua" },
                                                    { value: "challenge", label: "💪 Thử thách" },
                                                    { value: "campaign", label: "📢 Chiến dịch học tập" },
                                                    { value: "onboarding", label: "🎓 Đào tạo hội nhập" },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Space>
                                ),
                            },
                            {
                                key: "participants",
                                label: "Đối tượng tham gia",
                                children: (
                                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                        <Form.Item label="Đơn vị">
                                            <Select
                                                mode="multiple"
                                                placeholder="Chọn đơn vị có thể tham gia"
                                                options={[
                                                    { value: "hn", label: "Miền Bắc - Hà Nội" },
                                                    { value: "hcm", label: "Miền Nam - HCM" },
                                                    { value: "dn", label: "Miền Trung - Đà Nẵng" },
                                                    { value: "all", label: "Tất cả đơn vị" },
                                                ]}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Phòng ban">
                                            <Select
                                                mode="multiple"
                                                placeholder="Chọn phòng ban có thể tham gia"
                                                options={[
                                                    { value: "sales", label: "Sales" },
                                                    { value: "marketing", label: "Marketing" },
                                                    { value: "hr", label: "Nhân sự" },
                                                    { value: "it", label: "IT" },
                                                    { value: "finance", label: "Tài chính" },
                                                    { value: "operation", label: "Vận hành" },
                                                    { value: "all", label: "Tất cả phòng ban" },
                                                ]}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Chức vụ">
                                            <Select
                                                mode="multiple"
                                                placeholder="Chọn chức vụ có thể tham gia"
                                                options={[
                                                    { value: "staff", label: "Nhân viên" },
                                                    { value: "senior", label: "Nhân viên Senior" },
                                                    { value: "leader", label: "Trưởng nhóm" },
                                                    { value: "manager", label: "Quản lý" },
                                                    { value: "director", label: "Giám đốc" },
                                                    { value: "all", label: "Tất cả chức vụ" },
                                                ]}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                        <Divider />
                                        <Form.Item label="Điều kiện tham gia">
                                            <Space direction="vertical" style={{ width: "100%" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <Text>Thời gian làm việc tối thiểu:</Text>
                                                    <InputNumber min={0} defaultValue={0} style={{ width: 100 }} />
                                                    <Text>tháng</Text>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <Text>Điểm tích lũy tối thiểu:</Text>
                                                    <InputNumber min={0} defaultValue={0} style={{ width: 100 }} />
                                                    <Text>điểm</Text>
                                                </div>
                                            </Space>
                                        </Form.Item>
                                    </Space>
                                ),
                            },
                            {
                                key: "courses",
                                label: "Khóa học & Cuộc thi",
                                children: (
                                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                        <Form.Item label="Khóa học áp dụng">
                                            <Select
                                                mode="multiple"
                                                placeholder="Chọn khóa học tính điểm cho sự kiện"
                                                options={[
                                                    { value: "onboarding", label: "Đào tạo hội nhập" },
                                                    { value: "sales-basic", label: "Kỹ năng bán hàng cơ bản" },
                                                    { value: "sales-advanced", label: "Kỹ năng bán hàng nâng cao" },
                                                    { value: "communication", label: "Kỹ năng giao tiếp" },
                                                    { value: "leadership", label: "Kỹ năng lãnh đạo" },
                                                    { value: "time-management", label: "Quản lý thời gian" },
                                                    { value: "all", label: "Tất cả khóa học" },
                                                ]}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Cuộc thi áp dụng">
                                            <Select
                                                mode="multiple"
                                                placeholder="Chọn cuộc thi tính điểm cho sự kiện"
                                                options={[
                                                    { value: "quiz1", label: "Quiz kiến thức sản phẩm" },
                                                    { value: "quiz2", label: "Quiz kỹ năng bán hàng" },
                                                    { value: "essay1", label: "Viết bài về kinh nghiệm bán hàng" },
                                                    { value: "project1", label: "Dự án thực tế" },
                                                ]}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                        <Divider />
                                        <Form.Item label="Hoạt động tính điểm">
                                            <Space direction="vertical" style={{ width: "100%" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Text>✓ Hoàn thành bài học</Text>
                                                    <Space>
                                                        <InputNumber min={0} defaultValue={50} style={{ width: 80 }} />
                                                        <Text>điểm</Text>
                                                    </Space>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Text>✓ Hoàn thành khóa học</Text>
                                                    <Space>
                                                        <InputNumber min={0} defaultValue={200} style={{ width: 80 }} />
                                                        <Text>điểm</Text>
                                                    </Space>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Text>✓ Đạt quiz &gt;80%</Text>
                                                    <Space>
                                                        <InputNumber min={0} defaultValue={100} style={{ width: 80 }} />
                                                        <Text>điểm</Text>
                                                    </Space>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Text>✓ Nhận chứng chỉ</Text>
                                                    <Space>
                                                        <InputNumber min={0} defaultValue={300} style={{ width: 80 }} />
                                                        <Text>điểm</Text>
                                                    </Space>
                                                </div>
                                            </Space>
                                        </Form.Item>
                                    </Space>
                                ),
                            },
                            {
                                key: "rewards",
                                label: "Giải thưởng",
                                children: (
                                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                        <Form.Item label="Số lượng giải thưởng">
                                            <Radio.Group defaultValue={3}>
                                                <Radio value={1}>Top 1</Radio>
                                                <Radio value={3}>Top 3</Radio>
                                                <Radio value={5}>Top 5</Radio>
                                                <Radio value={10}>Top 10</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Divider />
                                        <Space direction="vertical" style={{ width: "100%" }}>
                                            <div>
                                                <Text strong>🥇 Giải Nhất:</Text>
                                                <Input
                                                    placeholder="VD: Gift card 2.000.000đ + Huy hiệu Champion"
                                                    style={{ marginTop: 8 }}
                                                />
                                            </div>
                                            <div>
                                                <Text strong>🥈 Giải Nhì:</Text>
                                                <Input
                                                    placeholder="VD: Gift card 1.000.000đ + Huy hiệu Runner-up"
                                                    style={{ marginTop: 8 }}
                                                />
                                            </div>
                                            <div>
                                                <Text strong>🥉 Giải Ba:</Text>
                                                <Input
                                                    placeholder="VD: Gift card 500.000đ + Huy hiệu Top 3"
                                                    style={{ marginTop: 8 }}
                                                />
                                            </div>
                                        </Space>
                                        <Divider />
                                        <Form.Item label="Giải thưởng đặc biệt">
                                            <Space direction="vertical" style={{ width: "100%" }}>
                                                <div>
                                                    <Text>🏃 Giải "Người hoàn thành nhanh nhất":</Text>
                                                    <Input
                                                        placeholder="VD: Bonus 500k"
                                                        style={{ marginTop: 8 }}
                                                    />
                                                </div>
                                                <div>
                                                    <Text>⭐ Giải "Điểm số cao nhất":</Text>
                                                    <Input
                                                        placeholder="VD: Voucher 300k"
                                                        style={{ marginTop: 8 }}
                                                    />
                                                </div>
                                            </Space>
                                        </Form.Item>
                                    </Space>
                                ),
                            },
                            {
                                key: "settings",
                                label: "Cài đặt",
                                children: (
                                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                        <Form.Item label="Quy tắc xếp hạng">
                                            <Radio.Group defaultValue="points">
                                                <Space direction="vertical">
                                                    <Radio value="points">Theo tổng điểm</Radio>
                                                    <Radio value="courses">Theo số khóa học hoàn thành</Radio>
                                                    <Radio value="time">Theo thời gian hoàn thành</Radio>
                                                    <Radio value="mixed">Kết hợp (điểm + thời gian)</Radio>
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Divider />
                                        <Form.Item label="Hiển thị bảng xếp hạng">
                                            <Radio.Group defaultValue="realtime">
                                                <Space direction="vertical">
                                                    <Radio value="realtime">Cập nhật realtime</Radio>
                                                    <Radio value="daily">Cập nhật mỗi ngày</Radio>
                                                    <Radio value="weekly">Cập nhật mỗi tuần</Radio>
                                                    <Radio value="end">Chỉ công bố khi kết thúc</Radio>
                                                </Space>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Divider />
                                        <Form.Item label="Thông báo tự động">
                                            <Space direction="vertical" style={{ width: "100%" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Text>Nhắc nhở khi sự kiện sắp kết thúc</Text>
                                                    <Switch defaultChecked />
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Text>Thông báo khi bị vượt hạng</Text>
                                                    <Switch defaultChecked />
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Text>Chúc mừng khi lên hạng</Text>
                                                    <Switch defaultChecked />
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Text>Thông báo công bố kết quả</Text>
                                                    <Switch defaultChecked />
                                                </div>
                                            </Space>
                                        </Form.Item>
                                        <Divider />
                                        <Form.Item label="Khác">
                                            <Space direction="vertical" style={{ width: "100%" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Text>Cho phép tham gia muộn</Text>
                                                    <Switch />
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Text>Hiển thị điểm của người khác</Text>
                                                    <Switch defaultChecked />
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Text>Công khai danh sách người tham gia</Text>
                                                    <Switch defaultChecked />
                                                </div>
                                            </Space>
                                        </Form.Item>
                                    </Space>
                                ),
                            },
                        ]}
                    />
                </Form>
            </Modal>

            {/* Modal Đổi quà */}
            <Modal
                title={
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>Chọn quà tặng</span>
                        <Tag color="blue" style={{ fontSize: 16, padding: "6px 16px", marginRight: 40 }}>
                            <StarOutlined /> Điểm khả dụng: {currentUser.points}
                        </Tag>
                    </div>
                }
                open={showRedeemModal}
                onCancel={() => setShowRedeemModal(false)}
                footer={null}
                width={800}
            >
                <Row gutter={[16, 16]}>
                    {REWARDS.map((reward) => {
                        const canRedeem = currentUser.points >= reward.points;
                        const outOfStock = reward.stock - reward.redeemed <= 0;
                        return (
                            <Col xs={24} sm={12} md={8} key={reward.id}>
                                <Card
                                    hoverable={canRedeem && !outOfStock}
                                    style={{ 
                                        height: "100%",
                                        opacity: (!canRedeem || outOfStock) ? 0.6 : 1,
                                    }}
                                    actions={[
                                        <Button
                                            type="primary"
                                            disabled={!canRedeem || outOfStock}
                                            onClick={() => {
                                                message.success(`Đã đổi ${reward.name} thành công!`);
                                                setShowRedeemModal(false);
                                            }}
                                        >
                                            {outOfStock ? "Hết hàng" : (canRedeem ? "Đổi ngay" : "Không đủ điểm")}
                                        </Button>,
                                    ]}
                                >
                                    <Space direction="vertical" style={{ width: "100%", textAlign: "center" }} size="small">
                                        <div style={{ fontSize: 48 }}>
                                            {reward.image}
                                        </div>
                                        <Text strong>{reward.name}</Text>
                                        <Tag color="gold">
                                            <StarOutlined /> {reward.points} điểm
                                        </Tag>
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            Còn lại: {reward.stock - reward.redeemed}/{reward.stock}
                                        </Text>
                                        {!canRedeem && (
                                            <Text type="danger" style={{ fontSize: 11 }}>
                                                Cần thêm {reward.points - currentUser.points} điểm
                                            </Text>
                                        )}
                                    </Space>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Modal>
        </div>
    );
}

export default KnowledgeRacePage;
