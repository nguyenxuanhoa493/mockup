import React from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Table,
    Row,
    Col,
    Tag,
    Progress,
    Statistic,
    Tabs,
    Avatar,
    Select,
    DatePicker,
    Input,
    Tooltip,
    Badge,
    Divider,
} from "antd";
import {
    TrophyOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    BarChartOutlined,
    UserOutlined,
    FileTextOutlined,
    DownloadOutlined,
    EyeOutlined,
    SearchOutlined,
    RiseOutlined,
    FallOutlined,
    MinusOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

// Data mẫu
const EXAM_INFO = {
    id: 1,
    name: "Kiểm tra kỹ năng bán hàng - Tháng 12/2024",
    course: "Kỹ năng bán hàng cơ bản",
    type: "Thi cuối khóa",
    startTime: "2024-12-11 09:00:00",
    endTime: "2024-12-11 11:00:00",
    duration: 90, // phút
    totalQuestions: 50,
    totalPoints: 100,
    passingScore: 70,
    totalParticipants: 28,
    completed: 26,
    inProgress: 0,
    notStarted: 2,
    createdBy: "Nguyễn Văn An",
};

const STATISTICS = {
    overview: {
        totalParticipants: 28,
        completed: 26,
        passed: 21,
        failed: 5,
        passRate: 80.77, // 21/26 * 100
        avgScore: 76.5,
        maxScore: 98,
        minScore: 45,
        avgCompletionTime: 72, // phút
    },
    scoreDistribution: [
        { range: "90-100", label: "Xuất sắc", count: 4, percentage: 15.38, color: "#52c41a" },
        { range: "80-89", label: "Giỏi", count: 7, percentage: 26.92, color: "#73d13d" },
        { range: "70-79", label: "Khá", count: 10, percentage: 38.46, color: "#95de64" },
        { range: "60-69", label: "Trung bình", count: 3, percentage: 11.54, color: "#faad14" },
        { range: "50-59", label: "Yếu", count: 1, percentage: 3.85, color: "#ff7875" },
        { range: "0-49", label: "Kém", count: 1, percentage: 3.85, color: "#ff4d4f" },
    ],
    timeDistribution: [
        { range: "< 60 phút", count: 5, percentage: 19.23 },
        { range: "60-75 phút", count: 12, percentage: 46.15 },
        { range: "75-90 phút", count: 8, percentage: 30.77 },
        { range: "> 90 phút", count: 1, percentage: 3.85 },
    ],
};

const QUESTION_ANALYTICS = [
    {
        id: 1,
        question: "Câu 1: 5 bước trong quy trình bán hàng là gì?",
        type: "Trắc nghiệm",
        points: 2,
        correctCount: 24,
        wrongCount: 2,
        correctRate: 92.31,
        avgTime: 45, // giây
    },
    {
        id: 2,
        question: "Câu 2: Kỹ thuật SPIN trong bán hàng bao gồm những gì?",
        type: "Trắc nghiệm",
        points: 2,
        correctCount: 22,
        wrongCount: 4,
        correctRate: 84.62,
        avgTime: 52,
    },
    {
        id: 3,
        question: "Câu 3: Làm thế nào để xử lý từ chối của khách hàng?",
        type: "Tự luận",
        points: 5,
        avgScore: 3.8,
        correctRate: 76.0,
        avgTime: 180,
    },
    {
        id: 4,
        question: "Câu 4: FAB là viết tắt của từ gì?",
        type: "Trắc nghiệm",
        points: 2,
        correctCount: 26,
        wrongCount: 0,
        correctRate: 100.0,
        avgTime: 35,
    },
    {
        id: 5,
        question: "Câu 5: Mô tả quy trình chăm sóc khách hàng sau bán",
        type: "Tự luận",
        points: 5,
        avgScore: 3.5,
        correctRate: 70.0,
        avgTime: 210,
    },
];

const STUDENT_RESULTS = [
    {
        id: 1,
        name: "Nguyễn Hoàng Minh",
        avatar: "https://i.pravatar.cc/150?img=12",
        department: "Sales",
        email: "nguyenhoangminh@company.com",
        score: 98,
        status: "passed",
        correctAnswers: 48,
        wrongAnswers: 2,
        completionTime: 85,
        startTime: "2024-12-11 09:05:00",
        endTime: "2024-12-11 10:30:00",
        rank: 1,
    },
    {
        id: 2,
        name: "Trần Thị Mai Anh",
        avatar: "https://i.pravatar.cc/150?img=47",
        department: "Marketing",
        email: "tran.mai.anh@company.com",
        score: 92,
        status: "passed",
        correctAnswers: 46,
        wrongAnswers: 4,
        completionTime: 78,
        startTime: "2024-12-11 09:02:00",
        endTime: "2024-12-11 10:20:00",
        rank: 2,
    },
    {
        id: 3,
        name: "Lê Quang Hải",
        avatar: "https://i.pravatar.cc/150?img=33",
        department: "Sales",
        email: "lequanghai@company.com",
        score: 88,
        status: "passed",
        correctAnswers: 44,
        wrongAnswers: 6,
        completionTime: 82,
        startTime: "2024-12-11 09:00:00",
        endTime: "2024-12-11 10:22:00",
        rank: 3,
    },
    {
        id: 4,
        name: "Phạm Thị Thanh Hương",
        avatar: "https://i.pravatar.cc/150?img=20",
        department: "HR",
        email: "phamthihhuong@company.com",
        score: 85,
        status: "passed",
        correctAnswers: 43,
        wrongAnswers: 7,
        completionTime: 75,
        startTime: "2024-12-11 09:10:00",
        endTime: "2024-12-11 10:25:00",
        rank: 4,
    },
    {
        id: 5,
        name: "Hoàng Văn Đức",
        avatar: "https://i.pravatar.cc/150?img=68",
        department: "Sales",
        email: "hoangvanduc@company.com",
        score: 82,
        status: "passed",
        correctAnswers: 42,
        wrongAnswers: 8,
        completionTime: 70,
        startTime: "2024-12-11 09:08:00",
        endTime: "2024-12-11 10:18:00",
        rank: 5,
    },
    {
        id: 6,
        name: "Nguyễn Thị Lan",
        avatar: "https://i.pravatar.cc/150?img=45",
        department: "Marketing",
        email: "nguyenlan@company.com",
        score: 78,
        status: "passed",
        correctAnswers: 40,
        wrongAnswers: 10,
        completionTime: 68,
        startTime: "2024-12-11 09:15:00",
        endTime: "2024-12-11 10:23:00",
        rank: 6,
    },
    {
        id: 7,
        name: "Đỗ Thị Thảo",
        avatar: "https://i.pravatar.cc/150?img=31",
        department: "HR",
        email: "dothithao@company.com",
        score: 76,
        status: "passed",
        correctAnswers: 39,
        wrongAnswers: 11,
        completionTime: 72,
        startTime: "2024-12-11 09:05:00",
        endTime: "2024-12-11 10:17:00",
        rank: 7,
    },
    {
        id: 8,
        name: "Trần Văn Bình",
        avatar: "https://i.pravatar.cc/150?img=60",
        department: "Sales",
        email: "tranvanbinhh@company.com",
        score: 74,
        status: "passed",
        correctAnswers: 38,
        wrongAnswers: 12,
        completionTime: 80,
        startTime: "2024-12-11 09:12:00",
        endTime: "2024-12-11 10:32:00",
        rank: 8,
    },
    {
        id: 9,
        name: "Lê Thị Hoa",
        avatar: "https://i.pravatar.cc/150?img=26",
        department: "Marketing",
        email: "lethihoa@company.com",
        score: 72,
        status: "passed",
        correctAnswers: 37,
        wrongAnswers: 13,
        completionTime: 65,
        startTime: "2024-12-11 09:03:00",
        endTime: "2024-12-11 10:08:00",
        rank: 9,
    },
    {
        id: 10,
        name: "Phạm Văn Đạt",
        avatar: "https://i.pravatar.cc/150?img=52",
        department: "Sales",
        email: "phamvandat@company.com",
        score: 70,
        status: "passed",
        correctAnswers: 36,
        wrongAnswers: 14,
        completionTime: 88,
        startTime: "2024-12-11 09:00:00",
        endTime: "2024-12-11 10:28:00",
        rank: 10,
    },
    {
        id: 11,
        name: "Nguyễn Văn Cường",
        avatar: "https://i.pravatar.cc/150?img=15",
        department: "Sales",
        email: "nguyencuong@company.com",
        score: 68,
        status: "failed",
        correctAnswers: 35,
        wrongAnswers: 15,
        completionTime: 75,
        startTime: "2024-12-11 09:20:00",
        endTime: "2024-12-11 10:35:00",
        rank: 11,
    },
    {
        id: 12,
        name: "Trần Thị Duyên",
        avatar: "https://i.pravatar.cc/150?img=38",
        department: "Marketing",
        email: "tranduyen@company.com",
        score: 65,
        status: "failed",
        correctAnswers: 33,
        wrongAnswers: 17,
        completionTime: 62,
        startTime: "2024-12-11 09:18:00",
        endTime: "2024-12-11 10:20:00",
        rank: 12,
    },
    {
        id: 13,
        name: "Hoàng Thị Mai",
        avatar: "https://i.pravatar.cc/150?img=44",
        department: "HR",
        email: "hoangmai@company.com",
        score: 58,
        status: "failed",
        correctAnswers: 30,
        wrongAnswers: 20,
        completionTime: 55,
        startTime: "2024-12-11 09:25:00",
        endTime: "2024-12-11 10:20:00",
        rank: 13,
    },
    {
        id: 14,
        name: "Lê Văn Nam",
        avatar: "https://i.pravatar.cc/150?img=58",
        department: "Sales",
        email: "levannam@company.com",
        score: 52,
        status: "failed",
        correctAnswers: 27,
        wrongAnswers: 23,
        completionTime: 68,
        startTime: "2024-12-11 09:30:00",
        endTime: "2024-12-11 10:38:00",
        rank: 14,
    },
    {
        id: 15,
        name: "Phạm Thị Ngọc",
        avatar: "https://i.pravatar.cc/150?img=29",
        department: "Marketing",
        email: "phamngoc@company.com",
        score: 45,
        status: "failed",
        correctAnswers: 24,
        wrongAnswers: 26,
        completionTime: 90,
        startTime: "2024-12-11 09:00:00",
        endTime: "2024-12-11 10:30:00",
        rank: 15,
    },
];

function ExamReportPage() {
    const [filterStatus, setFilterStatus] = React.useState("all");
    const [filterDepartment, setFilterDepartment] = React.useState("all");
    const [searchText, setSearchText] = React.useState("");

    React.useEffect(() => {
        document.title = "Báo cáo chi tiết kỳ thi - Mockup App";
    }, []);

    // Filter students
    const filteredStudents = React.useMemo(() => {
        return STUDENT_RESULTS.filter((student) => {
            const statusMatch = filterStatus === "all" || student.status === filterStatus;
            const deptMatch = filterDepartment === "all" || student.department === filterDepartment;
            const searchMatch =
                searchText === "" ||
                student.name.toLowerCase().includes(searchText.toLowerCase()) ||
                student.email.toLowerCase().includes(searchText.toLowerCase());
            return statusMatch && deptMatch && searchMatch;
        });
    }, [filterStatus, filterDepartment, searchText]);

    const getRankIcon = (rank) => {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";
        return rank;
    };

    const getScoreColor = (score) => {
        if (score >= 90) return "#52c41a";
        if (score >= 80) return "#73d13d";
        if (score >= 70) return "#95de64";
        if (score >= 60) return "#faad14";
        return "#ff4d4f";
    };

    const getStatusTag = (status, score) => {
        if (status === "passed") {
            return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    Đạt ({score} điểm)
                </Tag>
            );
        }
        return (
            <Tag icon={<CloseCircleOutlined />} color="error">
                Không đạt ({score} điểm)
            </Tag>
        );
    };

    // Tab Overview
    const overviewView = (
        <Row gutter={[24, 24]}>
            {/* Exam Info */}
            <Col xs={24}>
                <Card>
                    <Title level={4}>{EXAM_INFO.name}</Title>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Space direction="vertical" size="small">
                                <Text>
                                    <FileTextOutlined /> <strong>Khóa học:</strong> {EXAM_INFO.course}
                                </Text>
                                <Text>
                                    <TrophyOutlined /> <strong>Loại:</strong> {EXAM_INFO.type}
                                </Text>
                                <Text>
                                    <ClockCircleOutlined /> <strong>Thời gian thi:</strong>{" "}
                                    {EXAM_INFO.startTime} - {EXAM_INFO.endTime}
                                </Text>
                                <Text>
                                    <strong>Thời lượng:</strong> {EXAM_INFO.duration} phút
                                </Text>
                            </Space>
                        </Col>
                        <Col xs={24} md={12}>
                            <Space direction="vertical" size="small">
                                <Text>
                                    <strong>Tổng số câu hỏi:</strong> {EXAM_INFO.totalQuestions} câu
                                </Text>
                                <Text>
                                    <strong>Tổng điểm:</strong> {EXAM_INFO.totalPoints} điểm
                                </Text>
                                <Text>
                                    <strong>Điểm đạt:</strong> {EXAM_INFO.passingScore} điểm
                                </Text>
                                <Text>
                                    <UserOutlined /> <strong>Người tạo:</strong> {EXAM_INFO.createdBy}
                                </Text>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            </Col>

            {/* Statistics Cards */}
            <Col xs={24}>
                <Row gutter={[16, 16]}>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Tổng thí sinh"
                                value={STATISTICS.overview.totalParticipants}
                                prefix={<UserOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Đã hoàn thành"
                                value={STATISTICS.overview.completed}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: "#1890ff" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Tỷ lệ đạt"
                                value={STATISTICS.overview.passRate}
                                suffix="%"
                                prefix={<TrophyOutlined />}
                                valueStyle={{ color: "#52c41a" }}
                            />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {STATISTICS.overview.passed}/{STATISTICS.overview.completed} thí sinh
                            </Text>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Điểm trung bình"
                                value={STATISTICS.overview.avgScore}
                                precision={1}
                                prefix={<BarChartOutlined />}
                                valueStyle={{ color: "#faad14" }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>

            {/* Pass/Fail Analysis */}
            <Col xs={24} lg={12}>
                <Card title="📊 Phân tích kết quả">
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={12}>
                            <div style={{ textAlign: "center" }}>
                                <Progress
                                    type="circle"
                                    percent={STATISTICS.overview.passRate}
                                    format={(percent) => `${percent.toFixed(1)}%`}
                                    strokeColor="#52c41a"
                                    width={120}
                                />
                                <div style={{ marginTop: 8 }}>
                                    <Text strong style={{ color: "#52c41a", fontSize: 16 }}>
                                        ✅ Đạt
                                    </Text>
                                    <br />
                                    <Text type="secondary">
                                        {STATISTICS.overview.passed} thí sinh
                                    </Text>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{ textAlign: "center" }}>
                                <Progress
                                    type="circle"
                                    percent={100 - STATISTICS.overview.passRate}
                                    format={(percent) => `${percent.toFixed(1)}%`}
                                    strokeColor="#ff4d4f"
                                    width={120}
                                />
                                <div style={{ marginTop: 8 }}>
                                    <Text strong style={{ color: "#ff4d4f", fontSize: 16 }}>
                                        ❌ Không đạt
                                    </Text>
                                    <br />
                                    <Text type="secondary">
                                        {STATISTICS.overview.failed} thí sinh
                                    </Text>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Divider />

                    <Space direction="vertical" style={{ width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Text>Điểm cao nhất:</Text>
                            <Text strong style={{ color: "#52c41a", fontSize: 16 }}>
                                {STATISTICS.overview.maxScore}
                            </Text>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Text>Điểm thấp nhất:</Text>
                            <Text strong style={{ color: "#ff4d4f", fontSize: 16 }}>
                                {STATISTICS.overview.minScore}
                            </Text>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Text>Thời gian làm bài TB:</Text>
                            <Text strong style={{ fontSize: 16 }}>
                                {STATISTICS.overview.avgCompletionTime} phút
                            </Text>
                        </div>
                    </Space>
                </Card>
            </Col>

            {/* Score Distribution */}
            <Col xs={24} lg={12}>
                <Card title="📈 Phổ điểm">
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        {STATISTICS.scoreDistribution.map((item) => (
                            <div key={item.range}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 4,
                                    }}
                                >
                                    <Space>
                                        <Tag color={item.color}>{item.range}</Tag>
                                        <Text>{item.label}</Text>
                                    </Space>
                                    <Text strong>
                                        {item.count} ({item.percentage.toFixed(1)}%)
                                    </Text>
                                </div>
                                <Progress
                                    percent={item.percentage}
                                    strokeColor={item.color}
                                    showInfo={false}
                                />
                            </div>
                        ))}
                    </Space>
                </Card>
            </Col>

            {/* Time Distribution */}
            <Col xs={24} lg={12}>
                <Card title="⏱️ Phân bố thời gian làm bài">
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        {STATISTICS.timeDistribution.map((item, index) => (
                            <div key={index}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 4,
                                    }}
                                >
                                    <Text>{item.range}</Text>
                                    <Text strong>
                                        {item.count} ({item.percentage.toFixed(1)}%)
                                    </Text>
                                </div>
                                <Progress percent={item.percentage} showInfo={false} />
                            </div>
                        ))}
                    </Space>
                </Card>
            </Col>

            {/* Top Performers */}
            <Col xs={24} lg={12}>
                <Card title="🏆 Top 10 thí sinh xuất sắc">
                    <Space direction="vertical" style={{ width: "100%" }} size="small">
                        {STUDENT_RESULTS.slice(0, 10).map((student) => (
                            <div
                                key={student.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                    borderBottom: "1px solid #f0f0f0",
                                }}
                            >
                                <Space>
                                    <Text strong style={{ fontSize: 18, minWidth: 35 }}>
                                        {getRankIcon(student.rank)}
                                    </Text>
                                    <Avatar src={student.avatar}>{student.name[0]}</Avatar>
                                    <div>
                                        <Text strong>{student.name}</Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {student.department}
                                        </Text>
                                    </div>
                                </Space>
                                <Tag
                                    color={getScoreColor(student.score)}
                                    style={{ fontSize: 16, padding: "4px 12px" }}
                                >
                                    {student.score}
                                </Tag>
                            </div>
                        ))}
                    </Space>
                </Card>
            </Col>
        </Row>
    );

    // Tab Question Analytics
    const questionAnalyticsView = (
        <Card title="📝 Phân tích từng câu hỏi">
            <Table
                dataSource={QUESTION_ANALYTICS}
                rowKey="id"
                pagination={false}
                columns={[
                    {
                        title: "STT",
                        dataIndex: "id",
                        width: 60,
                        align: "center",
                    },
                    {
                        title: "Câu hỏi",
                        dataIndex: "question",
                        render: (question, record) => (
                            <div>
                                <Text>{question}</Text>
                                <br />
                                <Space size="small">
                                    <Tag color="blue">{record.type}</Tag>
                                    <Tag>{record.points} điểm</Tag>
                                </Space>
                            </div>
                        ),
                    },
                    {
                        title: "Tỷ lệ đúng",
                        dataIndex: "correctRate",
                        width: 150,
                        align: "center",
                        sorter: (a, b) => a.correctRate - b.correctRate,
                        render: (rate, record) => (
                            <div>
                                <Progress
                                    percent={rate}
                                    size="small"
                                    strokeColor={rate >= 80 ? "#52c41a" : rate >= 60 ? "#faad14" : "#ff4d4f"}
                                />
                                {record.correctCount !== undefined && (
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {record.correctCount} đúng / {record.wrongCount} sai
                                    </Text>
                                )}
                                {record.avgScore !== undefined && (
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        Điểm TB: {record.avgScore}/{record.points}
                                    </Text>
                                )}
                            </div>
                        ),
                    },
                    {
                        title: "Thời gian TB",
                        dataIndex: "avgTime",
                        width: 120,
                        align: "center",
                        render: (time) => {
                            if (time >= 60) {
                                return `${Math.floor(time / 60)} phút ${time % 60} giây`;
                            }
                            return `${time} giây`;
                        },
                    },
                    {
                        title: "Độ khó",
                        width: 100,
                        align: "center",
                        render: (_, record) => {
                            const rate = record.correctRate;
                            if (rate >= 80)
                                return (
                                    <Tag color="green" icon={<FallOutlined />}>
                                        Dễ
                                    </Tag>
                                );
                            if (rate >= 60)
                                return (
                                    <Tag color="orange" icon={<MinusOutlined />}>
                                        Trung bình
                                    </Tag>
                                );
                            return (
                                <Tag color="red" icon={<RiseOutlined />}>
                                    Khó
                                </Tag>
                            );
                        },
                    },
                ]}
            />
        </Card>
    );

    // Tab Student Results
    const studentResultsView = (
        <Card
            title="👥 Kết quả chi tiết từng thí sinh"
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
                        placeholder="Trạng thái"
                        style={{ width: 150 }}
                        value={filterStatus}
                        onChange={setFilterStatus}
                        options={[
                            { value: "all", label: "Tất cả" },
                            { value: "passed", label: "✅ Đạt" },
                            { value: "failed", label: "❌ Không đạt" },
                        ]}
                    />
                    <Select
                        placeholder="Phòng ban"
                        style={{ width: 150 }}
                        value={filterDepartment}
                        onChange={setFilterDepartment}
                        options={[
                            { value: "all", label: "Tất cả" },
                            { value: "Sales", label: "Sales" },
                            { value: "Marketing", label: "Marketing" },
                            { value: "HR", label: "HR" },
                        ]}
                    />
                    <Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>
                </Space>
            }
        >
            <Table
                dataSource={filteredStudents}
                rowKey="id"
                pagination={{
                    pageSize: 20,
                    showTotal: (total) => `Tổng ${total} thí sinh`,
                }}
                columns={[
                    {
                        title: "Hạng",
                        dataIndex: "rank",
                        width: 70,
                        align: "center",
                        render: (rank) => (
                            <Text strong style={{ fontSize: 16 }}>
                                {getRankIcon(rank)}
                            </Text>
                        ),
                    },
                    {
                        title: "Thí sinh",
                        dataIndex: "name",
                        width: 250,
                        render: (name, record) => (
                            <Space>
                                <Avatar src={record.avatar}>{name[0]}</Avatar>
                                <div>
                                    <Text strong>{name}</Text>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {record.department} - {record.email}
                                    </Text>
                                </div>
                            </Space>
                        ),
                    },
                    {
                        title: "Điểm số",
                        dataIndex: "score",
                        width: 100,
                        align: "center",
                        sorter: (a, b) => a.score - b.score,
                        render: (score) => (
                            <Tag
                                color={getScoreColor(score)}
                                style={{ fontSize: 18, padding: "6px 16px", fontWeight: "bold" }}
                            >
                                {score}
                            </Tag>
                        ),
                    },
                    {
                        title: "Kết quả",
                        dataIndex: "status",
                        width: 180,
                        align: "center",
                        render: (status, record) => getStatusTag(status, record.score),
                    },
                    {
                        title: "Câu đúng/sai",
                        width: 120,
                        align: "center",
                        render: (_, record) => (
                            <div>
                                <Text type="success">{record.correctAnswers} đúng</Text>
                                <br />
                                <Text type="danger">{record.wrongAnswers} sai</Text>
                            </div>
                        ),
                    },
                    {
                        title: "Thời gian",
                        dataIndex: "completionTime",
                        width: 100,
                        align: "center",
                        sorter: (a, b) => a.completionTime - b.completionTime,
                        render: (time) => `${time} phút`,
                    },
                    {
                        title: "Giờ bắt đầu",
                        dataIndex: "startTime",
                        width: 160,
                    },
                    {
                        title: "Giờ kết thúc",
                        dataIndex: "endTime",
                        width: 160,
                    },
                    {
                        title: "Thao tác",
                        width: 100,
                        align: "center",
                        render: () => (
                            <Button size="small" icon={<EyeOutlined />}>
                                Chi tiết
                            </Button>
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
                    <FileTextOutlined style={{ marginRight: 8 }} />
                    Báo cáo chi tiết kỳ thi
                </Title>
                <Text type="secondary">
                    Xem phân tích chi tiết về kết quả, phổ điểm và thời gian làm bài của kỳ thi
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
                        key: "questions",
                        label: (
                            <span>
                                <FileTextOutlined /> Phân tích câu hỏi
                            </span>
                        ),
                        children: questionAnalyticsView,
                    },
                    {
                        key: "students",
                        label: (
                            <span>
                                <UserOutlined /> Kết quả thí sinh
                            </span>
                        ),
                        children: studentResultsView,
                    },
                ]}
            />
        </div>
    );
}

export default ExamReportPage;
