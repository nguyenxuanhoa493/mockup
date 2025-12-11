import React, { useState } from "react";
import {
    Card,
    Row,
    Col,
    Statistic,
    Progress,
    Table,
    Tag,
    Typography,
    Space,
    Divider,
    Button,
    Tabs,
    Badge,
    Timeline,
    List,
    Avatar,
} from "antd";
import {
    TrophyOutlined,
    ClockCircleOutlined,
    BookOutlined,
    CheckCircleOutlined,
    FireOutlined,
    RiseOutlined,
    StarOutlined,
    CalendarOutlined,
    DownloadOutlined,
    LineChartOutlined,
    BarChartOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const OVERVIEW_STATS = {
    totalCourses: 12,
    completedCourses: 8,
    inProgressCourses: 3,
    notStartedCourses: 1,
    totalLearningHours: 156,
    averageScore: 8.7,
    certificatesEarned: 6,
    currentStreak: 15,
};

const COURSE_DATA = [
    {
        key: "1",
        courseName: "Đào tạo hội nhập - Văn hóa công ty",
        category: "Onboarding",
        progress: 100,
        score: 9.5,
        timeSpent: "12 giờ",
        completedDate: "2024-11-15",
        status: "completed",
        modules: 8,
        completedModules: 8,
        certificate: true,
    },
    {
        key: "2",
        courseName: "Kỹ năng giao tiếp hiệu quả",
        category: "Kỹ năng mềm",
        progress: 100,
        score: 8.8,
        timeSpent: "18 giờ",
        completedDate: "2024-11-20",
        status: "completed",
        modules: 10,
        completedModules: 10,
        certificate: true,
    },
    {
        key: "3",
        courseName: "Kỹ năng làm việc nhóm",
        category: "Kỹ năng mềm",
        progress: 100,
        score: 9.2,
        timeSpent: "15 giờ",
        completedDate: "2024-11-25",
        status: "completed",
        modules: 9,
        completedModules: 9,
        certificate: true,
    },
    {
        key: "4",
        courseName: "Kỹ thuật bán hàng chuyên nghiệp",
        category: "Sales",
        progress: 65,
        score: 8.5,
        timeSpent: "22 giờ",
        completedDate: null,
        status: "in_progress",
        modules: 12,
        completedModules: 8,
        certificate: false,
    },
    {
        key: "5",
        courseName: "Quản lý thời gian và năng suất",
        category: "Kỹ năng mềm",
        progress: 45,
        score: 7.8,
        timeSpent: "8 giờ",
        completedDate: null,
        status: "in_progress",
        modules: 7,
        completedModules: 3,
        certificate: false,
    },
    {
        key: "6",
        courseName: "Kỹ năng thuyết trình và trình bày",
        category: "Kỹ năng mềm",
        progress: 100,
        score: 8.9,
        timeSpent: "20 giờ",
        completedDate: "2024-12-01",
        status: "completed",
        modules: 11,
        completedModules: 11,
        certificate: true,
    },
    {
        key: "7",
        courseName: "Xử lý phản đối khách hàng",
        category: "Sales",
        progress: 30,
        score: null,
        timeSpent: "5 giờ",
        completedDate: null,
        status: "in_progress",
        modules: 6,
        completedModules: 2,
        certificate: false,
    },
    {
        key: "8",
        courseName: "Leadership cơ bản",
        category: "Quản lý",
        progress: 0,
        score: null,
        timeSpent: "0 giờ",
        completedDate: null,
        status: "not_started",
        modules: 10,
        completedModules: 0,
        certificate: false,
    },
];

const RECENT_ACTIVITIES = [
    {
        date: "2024-12-08",
        activity: "Hoàn thành module 8: 'Kỹ thuật đóng sale'",
        course: "Kỹ thuật bán hàng chuyên nghiệp",
        score: 9.0,
    },
    {
        date: "2024-12-07",
        activity: "Hoàn thành bài kiểm tra giữa khóa",
        course: "Kỹ thuật bán hàng chuyên nghiệp",
        score: 8.5,
    },
    {
        date: "2024-12-05",
        activity: "Hoàn thành module 3: 'Phân tích cảm xúc'",
        course: "Xử lý phản đối khách hàng",
        score: 8.2,
    },
    {
        date: "2024-12-01",
        activity: "🎉 Nhận chứng chỉ 'Kỹ năng thuyết trình'",
        course: "Kỹ năng thuyết trình và trình bày",
        score: 8.9,
    },
];

const LEARNING_STREAK = [
    { week: "Tuần 1", hours: 12 },
    { week: "Tuần 2", hours: 15 },
    { week: "Tuần 3", hours: 18 },
    { week: "Tuần 4", hours: 14 },
];

function LearningReportPage() {
    const [selectedCourse, setSelectedCourse] = useState(null);

    React.useEffect(() => {
        document.title = "Báo cáo học tập - Mockup App";
    }, []);

    const getStatusTag = (status) => {
        const statusMap = {
            completed: { color: "success", text: "Hoàn thành" },
            in_progress: { color: "processing", text: "Đang học" },
            not_started: { color: "default", text: "Chưa bắt đầu" },
        };
        return statusMap[status] || statusMap.not_started;
    };

    const columns = [
        {
            title: "Khóa học",
            dataIndex: "courseName",
            key: "courseName",
            width: 300,
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{text}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {record.completedModules}/{record.modules} modules
                    </Text>
                </Space>
            ),
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
            render: (category) => (
                <Tag color="blue">{category}</Tag>
            ),
        },
        {
            title: "Tiến độ",
            dataIndex: "progress",
            key: "progress",
            render: (progress) => (
                <div style={{ width: 120 }}>
                    <Progress
                        percent={progress}
                        size="small"
                        status={progress === 100 ? "success" : "active"}
                    />
                </div>
            ),
        },
        {
            title: "Điểm số",
            dataIndex: "score",
            key: "score",
            render: (score) => (
                <Space>
                    <StarOutlined style={{ color: "#faad14" }} />
                    <Text strong>{score ? `${score}/10` : "Chưa có"}</Text>
                </Space>
            ),
        },
        {
            title: "Thời gian học",
            dataIndex: "timeSpent",
            key: "timeSpent",
            render: (time) => (
                <Space>
                    <ClockCircleOutlined />
                    <Text>{time}</Text>
                </Space>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const { color, text } = getStatusTag(status);
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Ngày hoàn thành",
            dataIndex: "completedDate",
            key: "completedDate",
            render: (date) => (date ? date : <Text type="secondary">-</Text>),
        },
        {
            title: "Chứng chỉ",
            dataIndex: "certificate",
            key: "certificate",
            render: (hasCert) =>
                hasCert ? (
                    <Badge status="success" text="Đã nhận" />
                ) : (
                    <Badge status="default" text="Chưa có" />
                ),
        },
    ];

    const overviewContent = (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng khóa học"
                            value={OVERVIEW_STATS.totalCourses}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: "#1677ff" }}
                        />
                        <Divider style={{ margin: "12px 0" }} />
                        <Space direction="vertical" size={4} style={{ width: "100%" }}>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                ✅ Hoàn thành: {OVERVIEW_STATS.completedCourses}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                🔄 Đang học: {OVERVIEW_STATS.inProgressCourses}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                ⏸️ Chưa bắt đầu: {OVERVIEW_STATS.notStartedCourses}
                            </Text>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng thời gian học"
                            value={OVERVIEW_STATS.totalLearningHours}
                            suffix="giờ"
                            prefix={<ClockCircleOutlined />}
                            valueStyle={{ color: "#52c41a" }}
                        />
                        <Divider style={{ margin: "12px 0" }} />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            Trung bình: ~13 giờ/khóa
                        </Text>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Điểm trung bình"
                            value={OVERVIEW_STATS.averageScore}
                            suffix="/10"
                            prefix={<StarOutlined />}
                            valueStyle={{ color: "#faad14" }}
                            precision={1}
                        />
                        <Divider style={{ margin: "12px 0" }} />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            🏆 Xuất sắc
                        </Text>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Chuỗi học tập"
                            value={OVERVIEW_STATS.currentStreak}
                            suffix="ngày"
                            prefix={<FireOutlined />}
                            valueStyle={{ color: "#ff4d4f" }}
                        />
                        <Divider style={{ margin: "12px 0" }} />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            🔥 Đang duy trì tốt!
                        </Text>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} lg={16}>
                    <Card
                        title={
                            <Space>
                                <BarChartOutlined />
                                <span>Tiến độ theo danh mục</span>
                            </Space>
                        }
                    >
                        <Space direction="vertical" style={{ width: "100%" }} size="large">
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 8,
                                    }}
                                >
                                    <Text>Kỹ năng mềm</Text>
                                    <Text strong>4/5 khóa</Text>
                                </div>
                                <Progress percent={80} strokeColor="#52c41a" />
                            </div>
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 8,
                                    }}
                                >
                                    <Text>Sales & Marketing</Text>
                                    <Text strong>2/3 khóa</Text>
                                </div>
                                <Progress percent={67} strokeColor="#1677ff" />
                            </div>
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 8,
                                    }}
                                >
                                    <Text>Onboarding</Text>
                                    <Text strong>1/1 khóa</Text>
                                </div>
                                <Progress percent={100} strokeColor="#52c41a" />
                            </div>
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 8,
                                    }}
                                >
                                    <Text>Quản lý</Text>
                                    <Text strong>0/1 khóa</Text>
                                </div>
                                <Progress percent={0} strokeColor="#d9d9d9" />
                            </div>
                        </Space>
                    </Card>

                    <Card
                        title={
                            <Space>
                                <LineChartOutlined />
                                <span>Thời gian học 4 tuần gần nhất</span>
                            </Space>
                        }
                        style={{ marginTop: 16 }}
                    >
                        <Row gutter={16}>
                            {LEARNING_STREAK.map((item, index) => (
                                <Col key={index} span={6}>
                                    <Card size="small">
                                        <Statistic
                                            title={item.week}
                                            value={item.hours}
                                            suffix="giờ"
                                            valueStyle={{
                                                fontSize: 20,
                                                color: "#1677ff",
                                            }}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Divider />
                        <Space>
                            <RiseOutlined style={{ color: "#52c41a", fontSize: 20 }} />
                            <Text strong style={{ color: "#52c41a" }}>
                                Tăng 28% so với tháng trước
                            </Text>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        title={
                            <Space>
                                <TrophyOutlined />
                                <span>Chứng chỉ đã đạt được</span>
                            </Space>
                        }
                        extra={<Badge count={OVERVIEW_STATS.certificatesEarned} />}
                    >
                        <List
                            size="small"
                            dataSource={COURSE_DATA.filter((c) => c.certificate)}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                icon={<TrophyOutlined />}
                                                style={{ backgroundColor: "#faad14" }}
                                            />
                                        }
                                        title={
                                            <Text strong style={{ fontSize: 13 }}>
                                                {item.courseName}
                                            </Text>
                                        }
                                        description={
                                            <Space size={4}>
                                                <CalendarOutlined style={{ fontSize: 11 }} />
                                                <Text type="secondary" style={{ fontSize: 11 }}>
                                                    {item.completedDate}
                                                </Text>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                        <Divider style={{ margin: "12px 0" }} />
                        <Button type="primary" block icon={<DownloadOutlined />}>
                            Tải xuất tất cả chứng chỉ
                        </Button>
                    </Card>

                    <Card
                        title={
                            <Space>
                                <CalendarOutlined />
                                <span>Hoạt động gần đây</span>
                            </Space>
                        }
                        style={{ marginTop: 16 }}
                    >
                        <Timeline
                            items={RECENT_ACTIVITIES.map((activity) => ({
                                children: (
                                    <div>
                                        <Text strong style={{ fontSize: 12 }}>
                                            {activity.activity}
                                        </Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: 11 }}>
                                            {activity.course}
                                        </Text>
                                        <br />
                                        <Space size={4} style={{ marginTop: 4 }}>
                                            <Text type="secondary" style={{ fontSize: 11 }}>
                                                {activity.date}
                                            </Text>
                                            {activity.score && (
                                                <>
                                                    <Divider
                                                        type="vertical"
                                                        style={{ margin: "0 4px" }}
                                                    />
                                                    <StarOutlined
                                                        style={{
                                                            color: "#faad14",
                                                            fontSize: 11,
                                                        }}
                                                    />
                                                    <Text style={{ fontSize: 11 }}>
                                                        {activity.score}/10
                                                    </Text>
                                                </>
                                            )}
                                        </Space>
                                    </div>
                                ),
                            }))}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const detailContent = (
        <div>
            <Card
                title={
                    <Space>
                        <BookOutlined />
                        <span>Chi tiết khóa học</span>
                    </Space>
                }
                extra={
                    <Button type="primary" icon={<DownloadOutlined />}>
                        Xuất báo cáo
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={COURSE_DATA}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} khóa học`,
                    }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} md={12}>
                    <Card title="Top 3 khóa học điểm cao nhất">
                        <List
                            dataSource={[...COURSE_DATA]
                                .filter((c) => c.score)
                                .sort((a, b) => b.score - a.score)
                                .slice(0, 3)}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                style={{
                                                    backgroundColor:
                                                        index === 0
                                                            ? "#faad14"
                                                            : index === 1
                                                            ? "#d9d9d9"
                                                            : "#cd7f32",
                                                }}
                                            >
                                                {index + 1}
                                            </Avatar>
                                        }
                                        title={item.courseName}
                                        description={
                                            <Space>
                                                <StarOutlined style={{ color: "#faad14" }} />
                                                <Text strong>{item.score}/10</Text>
                                                <Divider type="vertical" />
                                                <Text type="secondary">{item.timeSpent}</Text>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card title="Khóa học cần hoàn thiện">
                        <List
                            dataSource={COURSE_DATA.filter(
                                (c) => c.status === "in_progress"
                            ).sort((a, b) => a.progress - b.progress)}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.courseName}
                                        description={
                                            <Space direction="vertical" style={{ width: "100%" }}>
                                                <Progress
                                                    percent={item.progress}
                                                    size="small"
                                                    status="active"
                                                />
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    Còn {item.modules - item.completedModules} modules
                                                </Text>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
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
                    <LineChartOutlined style={{ marginRight: 8 }} />
                    Báo cáo học tập
                </Title>
                <Space>
                    <Text type="secondary">Cập nhật: {new Date().toLocaleDateString("vi-VN")}</Text>
                </Space>
            </div>

            <Tabs
                defaultActiveKey="1"
                size="large"
                items={[
                    {
                        key: "1",
                        label: (
                            <span>
                                <BarChartOutlined />
                                Tổng quan
                            </span>
                        ),
                        children: overviewContent,
                    },
                    {
                        key: "2",
                        label: (
                            <span>
                                <BookOutlined />
                                Chi tiết khóa học
                            </span>
                        ),
                        children: detailContent,
                    },
                ]}
            />
        </div>
    );
}

export default LearningReportPage;
