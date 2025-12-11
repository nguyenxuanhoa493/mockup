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
    Progress,
    Tag,
    Tabs,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    Divider,
    List,
    Avatar,
    Timeline,
    Rate,
    Badge,
    message,
} from "antd";
import {
    LineChartOutlined,
    FileTextOutlined,
    RobotOutlined,
    SendOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    EyeOutlined,
    PlusOutlined,
    BarChartOutlined,
    TrophyOutlined,
    RiseOutlined,
    FallOutlined,
    UserOutlined,
    TeamOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    DownloadOutlined,
    FundOutlined,
    PieChartOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

// Data mẫu
const OVERVIEW_STATS = {
    totalTrainees: 156,
    completedSurveys: 128,
    surveyResponseRate: 82.1,
    averageApplicationScore: 7.8,
    improvementRate: 73.5,
};

const SURVEYS = [
    {
        id: 1,
        name: "Khảo sát sau khóa Kỹ năng bán hàng cơ bản",
        course: "Kỹ năng bán hàng cơ bản",
        sentDate: "2024-12-01",
        responseRate: 85,
        totalSent: 45,
        totalResponse: 38,
        status: "active",
        avgRating: 4.5,
    },
    {
        id: 2,
        name: "Khảo sát hiệu quả đào tạo hội nhập Q4",
        course: "Đào tạo hội nhập",
        sentDate: "2024-11-15",
        responseRate: 91,
        totalSent: 23,
        totalResponse: 21,
        status: "completed",
        avgRating: 4.7,
    },
    {
        id: 3,
        name: "Đánh giá sau khóa Kỹ năng giao tiếp",
        course: "Kỹ năng giao tiếp",
        sentDate: "2024-12-08",
        responseRate: 45,
        totalSent: 67,
        totalResponse: 30,
        status: "active",
        avgRating: 4.3,
    },
];

const APPLICATION_TRACKING = [
    {
        id: 1,
        trainee: "Nguyễn Hoàng Minh",
        avatar: "https://i.pravatar.cc/150?img=12",
        department: "Sales",
        course: "Kỹ năng bán hàng cơ bản",
        completedDate: "2024-11-20",
        applicationScore: 8.5,
        performanceChange: "+15%",
        status: "excellent",
        aiEvaluation: "Áp dụng tốt kỹ năng chốt sale, tỷ lệ thành công tăng 15%",
    },
    {
        id: 2,
        trainee: "Trần Thị Mai Anh",
        avatar: "https://i.pravatar.cc/150?img=47",
        department: "Marketing",
        course: "Kỹ năng giao tiếp",
        completedDate: "2024-11-25",
        applicationScore: 7.2,
        performanceChange: "+8%",
        status: "good",
        aiEvaluation: "Cải thiện kỹ năng thuyết trình, tự tin hơn khi trình bày ý tưởng",
    },
    {
        id: 3,
        trainee: "Lê Quang Hải",
        avatar: "https://i.pravatar.cc/150?img=33",
        department: "Sales",
        course: "Kỹ năng bán hàng nâng cao",
        completedDate: "2024-11-18",
        applicationScore: 9.0,
        performanceChange: "+22%",
        status: "excellent",
        aiEvaluation: "Xuất sắc trong việc xử lý từ chối, doanh số tăng 22% sau đào tạo",
    },
    {
        id: 4,
        trainee: "Phạm Thị Thanh Hương",
        avatar: "https://i.pravatar.cc/150?img=20",
        department: "HR",
        course: "Quản lý thời gian",
        completedDate: "2024-12-01",
        applicationScore: 6.5,
        performanceChange: "+5%",
        status: "average",
        aiEvaluation: "Cải thiện nhưng cần thực hành thêm các kỹ thuật ưu tiên công việc",
    },
];

const AI_INSIGHTS = [
    {
        id: 1,
        type: "success",
        title: "Kỹ năng bán hàng đang cho hiệu quả cao",
        description: "73% học viên áp dụng thành công kỹ năng chốt sale, doanh số trung bình tăng 18%",
        recommendation: "Mở rộng khóa học này cho toàn bộ phòng Sales",
        priority: "high",
    },
    {
        id: 2,
        type: "warning",
        title: "Kỹ năng quản lý thời gian cần theo dõi thêm",
        description: "Chỉ 58% học viên áp dụng hiệu quả, nhiều người chưa tạo được thói quen mới",
        recommendation: "Tổ chức workshop thực hành bổ sung sau 2 tuần",
        priority: "medium",
    },
    {
        id: 3,
        type: "info",
        title: "Nhân viên mới hội nhập tốt",
        description: "91% nhân viên mới hoàn thành đào tạo và thích nghi nhanh với công việc",
        recommendation: "Duy trì chương trình onboarding hiện tại",
        priority: "low",
    },
];

const PERFORMANCE_DATA = [
    { month: "T7", before: 65, after: 68 },
    { month: "T8", before: 67, after: 73 },
    { month: "T9", before: 66, after: 75 },
    { month: "T10", before: 68, after: 79 },
    { month: "T11", before: 70, after: 82 },
    { month: "T12", before: 71, after: 85 },
];

// Data phân tích chuyên sâu
const COURSE_EFFECTIVENESS = [
    {
        id: 1,
        course: "Kỹ năng bán hàng cơ bản",
        participants: 45,
        completionRate: 93,
        applicationRate: 78,
        satisfactionScore: 4.5,
        roi: 285,
        revenueImpact: "+2.5M",
        department: "Sales",
    },
    {
        id: 2,
        course: "Kỹ năng bán hàng nâng cao",
        participants: 28,
        completionRate: 89,
        applicationRate: 85,
        satisfactionScore: 4.7,
        roi: 320,
        revenueImpact: "+3.2M",
        department: "Sales",
    },
    {
        id: 3,
        course: "Kỹ năng giao tiếp",
        participants: 67,
        completionRate: 95,
        applicationRate: 68,
        satisfactionScore: 4.3,
        roi: 145,
        revenueImpact: "+800K",
        department: "Tất cả",
    },
    {
        id: 4,
        course: "Quản lý thời gian",
        participants: 52,
        completionRate: 91,
        applicationRate: 58,
        satisfactionScore: 4.0,
        roi: 110,
        revenueImpact: "+600K",
        department: "Tất cả",
    },
    {
        id: 5,
        course: "Đào tạo hội nhập",
        participants: 23,
        completionRate: 100,
        applicationRate: 91,
        satisfactionScore: 4.8,
        roi: 195,
        revenueImpact: "+1.2M",
        department: "Nhân viên mới",
    },
];

const DEPARTMENT_PERFORMANCE = [
    {
        department: "Sales",
        trainees: 58,
        avgScore: 8.2,
        improvement: "+18%",
        topCourse: "Kỹ năng bán hàng nâng cao",
        revenueGrowth: "+22%",
    },
    {
        department: "Marketing",
        trainees: 35,
        avgScore: 7.8,
        improvement: "+12%",
        topCourse: "Kỹ năng giao tiếp",
        revenueGrowth: "+15%",
    },
    {
        department: "HR",
        trainees: 18,
        avgScore: 7.5,
        improvement: "+10%",
        topCourse: "Quản lý thời gian",
        revenueGrowth: "+8%",
    },
    {
        department: "IT",
        trainees: 28,
        avgScore: 7.2,
        improvement: "+7%",
        topCourse: "Quản lý dự án",
        revenueGrowth: "+5%",
    },
];

const TRAINING_COSTS = {
    totalInvestment: 450000000, // 450M VND
    costPerTrainee: 2884615, // ~2.9M VND
    totalRevenue: 8200000000, // 8.2B VND
    netProfit: 7750000000, // 7.75B VND
    roi: 172, // 172%
};

function PostTrainingManagementPage() {
    const [showSurveyModal, setShowSurveyModal] = React.useState(false);
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [selectedSurvey, setSelectedSurvey] = React.useState(null);

    React.useEffect(() => {
        document.title = "Quản lý hoạt động sau đào tạo - Mockup App";
    }, []);

    const overviewView = (
        <Row gutter={[24, 24]}>
            <Col xs={24}>
                <Card title={<span><BarChartOutlined /> Tổng quan hiệu quả đào tạo</span>}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={6}>
                            <Statistic
                                title="Tổng số học viên"
                                value={OVERVIEW_STATS.totalTrainees}
                                prefix={<UserOutlined />}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Statistic
                                title="Tỷ lệ phản hồi khảo sát"
                                value={OVERVIEW_STATS.surveyResponseRate}
                                suffix="%"
                                prefix={<FileTextOutlined />}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Statistic
                                title="Điểm áp dụng TB"
                                value={OVERVIEW_STATS.averageApplicationScore}
                                suffix="/10"
                                prefix={<TrophyOutlined />}
                                valueStyle={{ color: '#1677ff' }}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Statistic
                                title="Tỷ lệ cải thiện"
                                value={OVERVIEW_STATS.improvementRate}
                                suffix="%"
                                prefix={<RiseOutlined />}
                                valueStyle={{ color: '#cf1322' }}
                            />
                        </Col>
                    </Row>
                </Card>
            </Col>

            <Col xs={24} lg={12}>
                <Card 
                    title={<span><RobotOutlined /> AI Insights - Phân tích thông minh</span>}
                    style={{ height: "100%" }}
                >
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        {AI_INSIGHTS.map((insight) => (
                            <Card
                                key={insight.id}
                                size="small"
                                style={{
                                    borderLeft: `4px solid ${
                                        insight.type === "success"
                                            ? "#52c41a"
                                            : insight.type === "warning"
                                            ? "#faad14"
                                            : "#1677ff"
                                    }`,
                                }}
                            >
                                <Space direction="vertical" style={{ width: "100%" }} size={4}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Text strong>{insight.title}</Text>
                                        <Tag
                                            color={
                                                insight.priority === "high"
                                                    ? "red"
                                                    : insight.priority === "medium"
                                                    ? "orange"
                                                    : "blue"
                                            }
                                        >
                                            {insight.priority === "high"
                                                ? "Ưu tiên cao"
                                                : insight.priority === "medium"
                                                ? "Ưu tiên TB"
                                                : "Theo dõi"}
                                        </Tag>
                                    </div>
                                    <Text type="secondary" style={{ fontSize: 13 }}>
                                        {insight.description}
                                    </Text>
                                    <div
                                        style={{
                                            background: "#f0f0f0",
                                            padding: "8px 12px",
                                            borderRadius: 4,
                                            marginTop: 4,
                                        }}
                                    >
                                        <Text style={{ fontSize: 12 }}>
                                            💡 <Text strong>Đề xuất:</Text> {insight.recommendation}
                                        </Text>
                                    </div>
                                </Space>
                            </Card>
                        ))}
                    </Space>
                </Card>
            </Col>

            <Col xs={24} lg={12}>
                <Card 
                    title={<span><LineChartOutlined /> So sánh hiệu suất trước/sau đào tạo</span>}
                    style={{ height: "100%" }}
                >
                    <div style={{ marginBottom: 16 }}>
                        <Space>
                            <Badge color="#1677ff" text="Trước đào tạo" />
                            <Badge color="#52c41a" text="Sau đào tạo" />
                        </Space>
                    </div>
                    {PERFORMANCE_DATA.map((data) => (
                        <div key={data.month} style={{ marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                <Text strong>{data.month}</Text>
                                <Text type="secondary">
                                    {data.before}% → {data.after}% (+{data.after - data.before}%)
                                </Text>
                            </div>
                            <Progress
                                percent={data.after}
                                success={{ percent: data.before }}
                                showInfo={false}
                            />
                        </div>
                    ))}
                </Card>
            </Col>
        </Row>
    );

    const surveysView = (
        <Card
            title={<span><FileTextOutlined /> Quản lý khảo sát sau đào tạo</span>}
            extra={
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setShowSurveyModal(true)}
                >
                    Tạo khảo sát mới
                </Button>
            }
        >
            <Table
                dataSource={SURVEYS}
                pagination={{ pageSize: 10 }}
                columns={[
                    {
                        title: "Tên khảo sát",
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
                        title: "Ngày gửi",
                        dataIndex: "sentDate",
                    },
                    {
                        title: "Phản hồi",
                        dataIndex: "responseRate",
                        render: (rate, record) => (
                            <div>
                                <Progress
                                    percent={rate}
                                    size="small"
                                    status={rate >= 80 ? "success" : rate >= 50 ? "normal" : "exception"}
                                />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {record.totalResponse}/{record.totalSent} người
                                </Text>
                            </div>
                        ),
                    },
                    {
                        title: "Đánh giá TB",
                        dataIndex: "avgRating",
                        render: (rating) => (
                            <div>
                                <Rate disabled defaultValue={rating} style={{ fontSize: 14 }} />
                                <br />
                                <Text type="secondary">{rating}/5</Text>
                            </div>
                        ),
                    },
                    {
                        title: "Trạng thái",
                        dataIndex: "status",
                        render: (status) => (
                            <Tag color={status === "active" ? "green" : "default"}>
                                {status === "active" ? "Đang mở" : "Đã đóng"}
                            </Tag>
                        ),
                    },
                    {
                        title: "Thao tác",
                        render: (_, record) => (
                            <Space>
                                <Button
                                    size="small"
                                    icon={<EyeOutlined />}
                                    onClick={() => {
                                        setSelectedSurvey(record);
                                        setShowDetailModal(true);
                                    }}
                                >
                                    Xem
                                </Button>
                                <Button size="small" icon={<SendOutlined />}>
                                    Nhắc nhở
                                </Button>
                            </Space>
                        ),
                    },
                ]}
            />
        </Card>
    );

    const applicationTrackingView = (
        <Card title={<span><CheckCircleOutlined /> Theo dõi áp dụng kiến thức vào công việc</span>}>
            <Table
                dataSource={APPLICATION_TRACKING}
                pagination={{ pageSize: 10 }}
                columns={[
                    {
                        title: "Học viên",
                        dataIndex: "trainee",
                        render: (name, record) => (
                            <Space>
                                <Avatar src={record.avatar}>{name[0]}</Avatar>
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
                        title: "Khóa học",
                        dataIndex: "course",
                        render: (course, record) => (
                            <div>
                                <Text>{course}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    Hoàn thành: {record.completedDate}
                                </Text>
                            </div>
                        ),
                    },
                    {
                        title: "Điểm áp dụng",
                        dataIndex: "applicationScore",
                        sorter: (a, b) => a.applicationScore - b.applicationScore,
                        render: (score, record) => (
                            <div>
                                <Tag
                                    color={
                                        record.status === "excellent"
                                            ? "green"
                                            : record.status === "good"
                                            ? "blue"
                                            : "orange"
                                    }
                                    style={{ fontSize: 14, padding: "4px 12px" }}
                                >
                                    {score}/10
                                </Tag>
                                <br />
                                <Text type="secondary" style={{ fontSize: 11 }}>
                                    {record.status === "excellent"
                                        ? "Xuất sắc"
                                        : record.status === "good"
                                        ? "Tốt"
                                        : "Trung bình"}
                                </Text>
                            </div>
                        ),
                    },
                    {
                        title: "Thay đổi hiệu suất",
                        dataIndex: "performanceChange",
                        render: (change) => {
                            const isPositive = change.includes("+");
                            return (
                                <Tag
                                    color={isPositive ? "green" : "red"}
                                    icon={isPositive ? <RiseOutlined /> : <FallOutlined />}
                                >
                                    {change}
                                </Tag>
                            );
                        },
                    },
                    {
                        title: "Đánh giá của AI",
                        dataIndex: "aiEvaluation",
                        render: (evaluation) => (
                            <Paragraph
                                ellipsis={{ rows: 2, expandable: true, symbol: "xem thêm" }}
                                style={{ marginBottom: 0, maxWidth: 300 }}
                            >
                                🤖 {evaluation}
                            </Paragraph>
                        ),
                    },
                ]}
            />
        </Card>
    );

    const advancedAnalyticsView = (
        <Row gutter={[24, 24]}>
            {/* ROI & Financial Analysis */}
            <Col xs={24}>
                <Card 
                    title={<span><DollarOutlined /> Phân tích ROI & Hiệu quả đầu tư</span>}
                    extra={
                        <Space>
                            <Select
                                defaultValue="2024"
                                style={{ width: 120 }}
                                options={[
                                    { value: "2024", label: "Năm 2024" },
                                    { value: "2023", label: "Năm 2023" },
                                    { value: "q4", label: "Q4 2024" },
                                ]}
                            />
                            <Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>
                        </Space>
                    }
                >
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={6}>
                            <Card size="small" style={{ background: "#e6f7ff", borderColor: "#1890ff" }}>
                                <Statistic
                                    title="Tổng đầu tư"
                                    value={TRAINING_COSTS.totalInvestment / 1000000}
                                    suffix="M"
                                    prefix="₫"
                                    precision={0}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card size="small" style={{ background: "#f6ffed", borderColor: "#52c41a" }}>
                                <Statistic
                                    title="Tổng doanh thu tăng"
                                    value={TRAINING_COSTS.totalRevenue / 1000000000}
                                    suffix="B"
                                    prefix="₫"
                                    precision={1}
                                    valueStyle={{ color: "#3f8600" }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card size="small" style={{ background: "#fff7e6", borderColor: "#fa8c16" }}>
                                <Statistic
                                    title="Lợi nhuận ròng"
                                    value={TRAINING_COSTS.netProfit / 1000000000}
                                    suffix="B"
                                    prefix="₫"
                                    precision={2}
                                    valueStyle={{ color: "#d48806" }}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <Card size="small" style={{ background: "#fff1f0", borderColor: "#ff4d4f" }}>
                                <Statistic
                                    title="ROI"
                                    value={TRAINING_COSTS.roi}
                                    suffix="%"
                                    prefix={<RiseOutlined />}
                                    valueStyle={{ color: "#cf1322" }}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Divider />
                    <Row gutter={16}>
                        <Col xs={24} lg={12}>
                            <div style={{ marginBottom: 16 }}>
                                <Text strong>Chi phí bình quân/học viên:</Text>
                                <Text style={{ fontSize: 18, marginLeft: 12, color: "#1890ff" }}>
                                    ₫{(TRAINING_COSTS.costPerTrainee / 1000000).toFixed(1)}M
                                </Text>
                            </div>
                            <Progress
                                percent={100}
                                strokeColor="#52c41a"
                                format={() => "Hiệu quả cao"}
                            />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                💡 ROI 172% cho thấy hiệu quả đầu tư vượt trội
                            </Text>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Timeline
                                items={[
                                    {
                                        children: (
                                            <div>
                                                <Text strong>Q1 2024:</Text> Đầu tư 120M - ROI 145%
                                            </div>
                                        ),
                                        color: "blue",
                                    },
                                    {
                                        children: (
                                            <div>
                                                <Text strong>Q2 2024:</Text> Đầu tư 110M - ROI 158%
                                            </div>
                                        ),
                                        color: "green",
                                    },
                                    {
                                        children: (
                                            <div>
                                                <Text strong>Q3 2024:</Text> Đầu tư 105M - ROI 165%
                                            </div>
                                        ),
                                        color: "green",
                                    },
                                    {
                                        children: (
                                            <div>
                                                <Text strong>Q4 2024:</Text> Đầu tư 115M - ROI 188%
                                            </div>
                                        ),
                                        color: "red",
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </Card>
            </Col>

            {/* Course Effectiveness Comparison */}
            <Col xs={24}>
                <Card 
                    title={<span><FundOutlined /> So sánh hiệu quả các khóa học</span>}
                >
                    <Table
                        dataSource={COURSE_EFFECTIVENESS}
                        pagination={false}
                        scroll={{ x: 1200 }}
                        columns={[
                            {
                                title: "Khóa học",
                                dataIndex: "course",
                                fixed: "left",
                                width: 200,
                                render: (course, record) => (
                                    <div>
                                        <Text strong>{course}</Text>
                                        <br />
                                        <Tag color="blue">{record.department}</Tag>
                                    </div>
                                ),
                            },
                            {
                                title: "Học viên",
                                dataIndex: "participants",
                                align: "center",
                                sorter: (a, b) => a.participants - b.participants,
                            },
                            {
                                title: "Tỷ lệ hoàn thành",
                                dataIndex: "completionRate",
                                align: "center",
                                sorter: (a, b) => a.completionRate - b.completionRate,
                                render: (rate) => (
                                    <Progress
                                        percent={rate}
                                        size="small"
                                        status={rate >= 90 ? "success" : "normal"}
                                    />
                                ),
                            },
                            {
                                title: "Tỷ lệ áp dụng",
                                dataIndex: "applicationRate",
                                align: "center",
                                sorter: (a, b) => a.applicationRate - b.applicationRate,
                                render: (rate) => (
                                    <Progress
                                        percent={rate}
                                        size="small"
                                        strokeColor={rate >= 80 ? "#52c41a" : rate >= 60 ? "#1890ff" : "#faad14"}
                                    />
                                ),
                            },
                            {
                                title: "Hài lòng",
                                dataIndex: "satisfactionScore",
                                align: "center",
                                sorter: (a, b) => a.satisfactionScore - b.satisfactionScore,
                                render: (score) => (
                                    <div>
                                        <Rate disabled defaultValue={score} style={{ fontSize: 14 }} />
                                        <br />
                                        <Text type="secondary">{score}/5</Text>
                                    </div>
                                ),
                            },
                            {
                                title: "ROI",
                                dataIndex: "roi",
                                align: "center",
                                sorter: (a, b) => a.roi - b.roi,
                                render: (roi) => (
                                    <Tag
                                        color={roi >= 250 ? "red" : roi >= 150 ? "orange" : "blue"}
                                        style={{ fontSize: 14, padding: "4px 12px" }}
                                    >
                                        {roi}%
                                    </Tag>
                                ),
                            },
                            {
                                title: "Tác động doanh thu",
                                dataIndex: "revenueImpact",
                                align: "center",
                                render: (impact) => (
                                    <Text strong style={{ color: "#52c41a" }}>
                                        {impact}
                                    </Text>
                                ),
                            },
                        ]}
                    />
                </Card>
            </Col>

            {/* Department Performance */}
            <Col xs={24} lg={16}>
                <Card title={<span><TeamOutlined /> Hiệu quả đào tạo theo phòng ban</span>}>
                    <Table
                        dataSource={DEPARTMENT_PERFORMANCE}
                        pagination={false}
                        columns={[
                            {
                                title: "Phòng ban",
                                dataIndex: "department",
                                render: (dept) => <Text strong>{dept}</Text>,
                            },
                            {
                                title: "Số học viên",
                                dataIndex: "trainees",
                                align: "center",
                            },
                            {
                                title: "Điểm TB",
                                dataIndex: "avgScore",
                                align: "center",
                                sorter: (a, b) => a.avgScore - b.avgScore,
                                render: (score) => (
                                    <Tag color="blue" style={{ fontSize: 14 }}>
                                        {score}/10
                                    </Tag>
                                ),
                            },
                            {
                                title: "Cải thiện",
                                dataIndex: "improvement",
                                align: "center",
                                render: (improvement) => (
                                    <Tag color="green" icon={<RiseOutlined />}>
                                        {improvement}
                                    </Tag>
                                ),
                            },
                            {
                                title: "Tăng trưởng doanh thu",
                                dataIndex: "revenueGrowth",
                                align: "center",
                                render: (growth) => (
                                    <Text strong style={{ color: "#52c41a" }}>
                                        {growth}
                                    </Text>
                                ),
                            },
                            {
                                title: "Khóa học hiệu quả nhất",
                                dataIndex: "topCourse",
                            },
                        ]}
                    />
                </Card>
            </Col>

            {/* Key Insights */}
            <Col xs={24} lg={8}>
                <Card 
                    title={<span><PieChartOutlined /> Thống kê nổi bật</span>}
                    style={{ height: "100%" }}
                >
                    <Space direction="vertical" style={{ width: "100%" }} size="large">
                        <div>
                            <Text type="secondary">Khóa học ROI cao nhất</Text>
                            <br />
                            <Text strong style={{ fontSize: 16, color: "#1890ff" }}>
                                Kỹ năng bán hàng nâng cao
                            </Text>
                            <br />
                            <Tag color="red" style={{ marginTop: 8 }}>ROI: 320%</Tag>
                        </div>
                        <Divider style={{ margin: "8px 0" }} />
                        <div>
                            <Text type="secondary">Phòng ban hiệu quả nhất</Text>
                            <br />
                            <Text strong style={{ fontSize: 16, color: "#52c41a" }}>
                                Sales
                            </Text>
                            <br />
                            <Tag color="green" style={{ marginTop: 8 }}>+22% doanh thu</Tag>
                        </div>
                        <Divider style={{ margin: "8px 0" }} />
                        <div>
                            <Text type="secondary">Tỷ lệ áp dụng trung bình</Text>
                            <br />
                            <Progress
                                percent={76}
                                strokeColor="#1890ff"
                                style={{ marginTop: 8 }}
                            />
                        </div>
                        <Divider style={{ margin: "8px 0" }} />
                        <div style={{ background: "#f0f0f0", padding: 12, borderRadius: 4 }}>
                            <Text strong>💡 Đề xuất chiến lược:</Text>
                            <br />
                            <Text style={{ fontSize: 12 }}>
                                Tập trung mở rộng các khóa học Sales (ROI cao nhất 320%) và cải thiện chương trình Quản lý thời gian (tỷ lệ áp dụng thấp 58%)
                            </Text>
                        </div>
                    </Space>
                </Card>
            </Col>
        </Row>
    );

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>
                    <LineChartOutlined style={{ marginRight: 8 }} />
                    Quản lý hoạt động sau đào tạo
                </Title>
                <Text type="secondary">
                    Theo dõi và đánh giá hiệu quả áp dụng kiến thức sau đào tạo bằng AI
                </Text>
            </div>

            <Tabs
                defaultActiveKey="overview"
                items={[
                    {
                        key: "overview",
                        label: (
                            <span>
                                <BarChartOutlined /> Tổng quan
                            </span>
                        ),
                        children: overviewView,
                    },
                    {
                        key: "surveys",
                        label: (
                            <span>
                                <FileTextOutlined /> Khảo sát
                            </span>
                        ),
                        children: surveysView,
                    },
                    {
                        key: "application",
                        label: (
                            <span>
                                <CheckCircleOutlined /> Áp dụng kiến thức
                            </span>
                        ),
                        children: applicationTrackingView,
                    },
                    {
                        key: "analytics",
                        label: (
                            <span>
                                <FundOutlined /> Phân tích chuyên sâu
                            </span>
                        ),
                        children: advancedAnalyticsView,
                    },
                ]}
            />

            {/* Modal Tạo khảo sát */}
            <Modal
                title="Tạo khảo sát sau đào tạo"
                open={showSurveyModal}
                onCancel={() => setShowSurveyModal(false)}
                width={700}
                footer={[
                    <Button key="cancel" onClick={() => setShowSurveyModal(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => {
                            message.success("Đã tạo khảo sát thành công!");
                            setShowSurveyModal(false);
                        }}
                    >
                        Tạo và gửi khảo sát
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Tên khảo sát" required>
                        <Input placeholder="VD: Khảo sát sau khóa Kỹ năng bán hàng" />
                    </Form.Item>
                    <Form.Item label="Khóa học liên quan" required>
                        <Select
                            placeholder="Chọn khóa học"
                            options={[
                                { value: "1", label: "Kỹ năng bán hàng cơ bản" },
                                { value: "2", label: "Kỹ năng bán hàng nâng cao" },
                                { value: "3", label: "Kỹ năng giao tiếp" },
                                { value: "4", label: "Quản lý thời gian" },
                                { value: "5", label: "Đào tạo hội nhập" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Thời gian gửi">
                        <RangePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item label="Đối tượng khảo sát" required>
                        <Select
                            mode="multiple"
                            placeholder="Chọn học viên đã hoàn thành khóa học"
                            options={[
                                { value: "1", label: "Nguyễn Hoàng Minh - Sales" },
                                { value: "2", label: "Trần Thị Mai Anh - Marketing" },
                                { value: "3", label: "Lê Quang Hải - Sales" },
                                { value: "4", label: "Phạm Thị Thanh Hương - HR" },
                            ]}
                        />
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Câu hỏi khảo sát">
                        <TextArea
                            rows={6}
                            placeholder="AI sẽ tự động tạo bộ câu hỏi phù hợp dựa trên nội dung khóa học"
                            defaultValue={`1. Bạn đánh giá nội dung khóa học như thế nào?
2. Kiến thức học được có phù hợp với công việc thực tế không?
3. Bạn đã áp dụng được bao nhiêu phần trăm kiến thức vào công việc?
4. Hiệu quả công việc của bạn có cải thiện không?
5. Bạn có đề xuất gì để cải thiện khóa học?`}
                        />
                    </Form.Item>
                    <Button block icon={<RobotOutlined />}>
                        Tạo câu hỏi bằng AI
                    </Button>
                </Form>
            </Modal>

            {/* Modal Chi tiết khảo sát */}
            <Modal
                title="Chi tiết kết quả khảo sát"
                open={showDetailModal}
                onCancel={() => setShowDetailModal(false)}
                width={900}
                footer={[
                    <Button key="export">Xuất báo cáo</Button>,
                    <Button key="close" type="primary" onClick={() => setShowDetailModal(false)}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedSurvey && (
                    <div>
                        <Card size="small" style={{ marginBottom: 16, background: "#f5f5f5" }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Statistic
                                        title="Tổng số phản hồi"
                                        value={selectedSurvey.totalResponse}
                                        suffix={`/ ${selectedSurvey.totalSent}`}
                                    />
                                </Col>
                                <Col span={8}>
                                    <Statistic
                                        title="Tỷ lệ phản hồi"
                                        value={selectedSurvey.responseRate}
                                        suffix="%"
                                    />
                                </Col>
                                <Col span={8}>
                                    <Statistic
                                        title="Đánh giá trung bình"
                                        value={selectedSurvey.avgRating}
                                        suffix="/ 5"
                                    />
                                </Col>
                            </Row>
                        </Card>

                        <Title level={5}>Phản hồi chi tiết</Title>
                        <List
                            dataSource={[
                                {
                                    user: "Nguyễn Hoàng Minh",
                                    rating: 5,
                                    comment: "Khóa học rất hữu ích, tôi đã áp dụng được 80% kiến thức vào công việc. Doanh số tăng đáng kể.",
                                },
                                {
                                    user: "Trần Thị Mai Anh",
                                    rating: 4,
                                    comment: "Nội dung tốt nhưng cần thêm ví dụ thực tế. Tôi đang dần áp dụng vào công việc.",
                                },
                                {
                                    user: "Lê Quang Hải",
                                    rating: 5,
                                    comment: "Xuất sắc! Giảng viên nhiệt tình, bài tập thực hành hay. Đã cải thiện kỹ năng chốt sale rõ rệt.",
                                },
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={
                                            <div>
                                                <Text strong>{item.user}</Text>
                                                <Rate
                                                    disabled
                                                    defaultValue={item.rating}
                                                    style={{ fontSize: 12, marginLeft: 12 }}
                                                />
                                            </div>
                                        }
                                        description={item.comment}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default PostTrainingManagementPage;
