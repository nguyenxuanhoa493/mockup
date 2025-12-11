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
    Radio,
} from "antd";
import {
    BarChartOutlined,
    ClockCircleOutlined,
    BookOutlined,
    ApartmentOutlined,
    FileTextOutlined,
    UserOutlined,
    DownloadOutlined,
    SearchOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    TrophyOutlined,
    TeamOutlined,
    CalendarOutlined,
    LineChartOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

// Data mẫu - Báo cáo thời lượng học tập
const LEARNING_TIME_STATS = {
    today: { hours: 2.5, courses: 3, lessons: 8, users: 142 },
    week: { hours: 18.5, courses: 12, lessons: 56, users: 187 },
    month: { hours: 78.5, courses: 28, lessons: 234, users: 245 },
};

const DAILY_TIME = [
    { date: "06/12", hours: 12.5, users: 128, avgTime: 5.9 },
    { date: "07/12", hours: 15.2, users: 145, avgTime: 6.3 },
    { date: "08/12", hours: 11.8, users: 132, avgTime: 5.4 },
    { date: "09/12", hours: 14.5, users: 156, avgTime: 5.6 },
    { date: "10/12", hours: 16.8, users: 168, avgTime: 6.0 },
    { date: "11/12", hours: 18.5, users: 187, avgTime: 5.9 },
    { date: "12/12", hours: 2.5, users: 142, avgTime: 1.1 },
];

const TOP_ACTIVE_USERS = [
    { id: 1, name: "Nguyễn Hoàng Minh", avatar: "https://i.pravatar.cc/150?img=12", department: "Sales", hours: 45.5, courses: 8, rank: 1 },
    { id: 2, name: "Trần Thị Mai Anh", avatar: "https://i.pravatar.cc/150?img=47", department: "Marketing", hours: 42.3, courses: 7, rank: 2 },
    { id: 3, name: "Lê Quang Hải", avatar: "https://i.pravatar.cc/150?img=33", department: "Sales", hours: 38.8, courses: 6, rank: 3 },
    { id: 4, name: "Phạm Thị Thanh Hương", avatar: "https://i.pravatar.cc/150?img=20", department: "HR", hours: 35.2, courses: 5, rank: 4 },
    { id: 5, name: "Hoàng Văn Đức", avatar: "https://i.pravatar.cc/150?img=68", department: "Sales", hours: 32.5, courses: 5, rank: 5 },
];

// Data mẫu - Tình trạng khóa học
const COURSE_STATUS = [
    {
        id: 1,
        name: "Kỹ năng bán hàng cơ bản",
        category: "Kỹ năng mềm",
        totalStudents: 28,
        completed: 21,
        inProgress: 5,
        notStarted: 2,
        completionRate: 75.0,
        avgScore: 85.5,
        avgTime: 42.5,
        status: "active",
    },
    {
        id: 2,
        name: "Kỹ năng giao tiếp",
        category: "Kỹ năng mềm",
        totalStudents: 35,
        completed: 28,
        inProgress: 7,
        notStarted: 0,
        completionRate: 80.0,
        avgScore: 88.2,
        avgTime: 38.5,
        status: "active",
    },
    {
        id: 3,
        name: "Quản lý thời gian",
        category: "Năng suất",
        totalStudents: 24,
        completed: 18,
        inProgress: 4,
        notStarted: 2,
        completionRate: 75.0,
        avgScore: 82.3,
        avgTime: 35.2,
        status: "active",
    },
    {
        id: 4,
        name: "Làm việc nhóm",
        category: "Kỹ năng mềm",
        totalStudents: 30,
        completed: 25,
        inProgress: 3,
        notStarted: 2,
        completionRate: 83.3,
        avgScore: 86.8,
        avgTime: 40.0,
        status: "active",
    },
    {
        id: 5,
        name: "Đào tạo hội nhập",
        category: "Onboarding",
        totalStudents: 32,
        completed: 30,
        inProgress: 2,
        notStarted: 0,
        completionRate: 93.8,
        avgScore: 90.5,
        avgTime: 28.5,
        status: "active",
    },
];

// Data mẫu - Lộ trình học tập
const LEARNING_PATHS = [
    {
        id: 1,
        name: "Lộ trình Nhân viên Sales",
        courses: 5,
        totalStudents: 45,
        completed: 32,
        inProgress: 10,
        notStarted: 3,
        completionRate: 71.1,
        avgProgress: 78.5,
    },
    {
        id: 2,
        name: "Lộ trình Marketing Professional",
        courses: 4,
        totalStudents: 28,
        completed: 22,
        inProgress: 5,
        notStarted: 1,
        completionRate: 78.6,
        avgProgress: 82.3,
    },
    {
        id: 3,
        name: "Lộ trình Onboarding 2024",
        courses: 3,
        totalStudents: 35,
        completed: 33,
        inProgress: 2,
        notStarted: 0,
        completionRate: 94.3,
        avgProgress: 96.5,
    },
    {
        id: 4,
        name: "Lộ trình Quản lý cấp trung",
        courses: 6,
        totalStudents: 18,
        completed: 12,
        inProgress: 5,
        notStarted: 1,
        completionRate: 66.7,
        avgProgress: 72.8,
    },
];

// Data mẫu - Kỳ thi
const EXAM_REPORTS = [
    {
        id: 1,
        name: "Kiểm tra Kỹ năng bán hàng",
        course: "Kỹ năng bán hàng cơ bản",
        date: "2024-12-11",
        totalStudents: 28,
        completed: 26,
        passed: 21,
        failed: 5,
        passRate: 80.77,
        avgScore: 76.5,
        maxScore: 98,
        minScore: 45,
    },
    {
        id: 2,
        name: "Kiểm tra Giao tiếp",
        course: "Kỹ năng giao tiếp",
        date: "2024-12-08",
        totalStudents: 35,
        completed: 35,
        passed: 30,
        failed: 5,
        passRate: 85.71,
        avgScore: 82.5,
        maxScore: 95,
        minScore: 52,
    },
    {
        id: 3,
        name: "Kiểm tra Quản lý thời gian",
        course: "Quản lý thời gian",
        date: "2024-12-05",
        totalStudents: 24,
        completed: 22,
        passed: 18,
        failed: 4,
        passRate: 81.82,
        avgScore: 78.8,
        maxScore: 92,
        minScore: 58,
    },
];

// Data mẫu - Chi tiết nhân sự
const EMPLOYEE_DETAILS = [
    {
        id: 1,
        name: "Nguyễn Hoàng Minh",
        avatar: "https://i.pravatar.cc/150?img=12",
        department: "Sales",
        position: "Sales Executive",
        email: "nguyenhoangminh@company.com",
        enrolledCourses: 8,
        completedCourses: 6,
        inProgressCourses: 2,
        totalHours: 45.5,
        avgScore: 92.3,
        certificates: 3,
        lastActive: "2024-12-11 14:30:00",
    },
    {
        id: 2,
        name: "Trần Thị Mai Anh",
        avatar: "https://i.pravatar.cc/150?img=47",
        department: "Marketing",
        position: "Marketing Manager",
        email: "tran.mai.anh@company.com",
        enrolledCourses: 7,
        completedCourses: 6,
        inProgressCourses: 1,
        totalHours: 42.3,
        avgScore: 89.5,
        certificates: 4,
        lastActive: "2024-12-11 16:20:00",
    },
    {
        id: 3,
        name: "Lê Quang Hải",
        avatar: "https://i.pravatar.cc/150?img=33",
        department: "Sales",
        position: "Sales Manager",
        email: "lequanghai@company.com",
        enrolledCourses: 6,
        completedCourses: 5,
        inProgressCourses: 1,
        totalHours: 38.8,
        avgScore: 88.2,
        certificates: 3,
        lastActive: "2024-12-11 10:15:00",
    },
    {
        id: 4,
        name: "Phạm Thị Thanh Hương",
        avatar: "https://i.pravatar.cc/150?img=20",
        department: "HR",
        position: "HR Specialist",
        email: "phamthihhuong@company.com",
        enrolledCourses: 5,
        completedCourses: 4,
        inProgressCourses: 1,
        totalHours: 35.2,
        avgScore: 86.8,
        certificates: 2,
        lastActive: "2024-12-11 09:45:00",
    },
    {
        id: 5,
        name: "Hoàng Văn Đức",
        avatar: "https://i.pravatar.cc/150?img=68",
        department: "Sales",
        position: "Sales Executive",
        email: "hoangvanduc@company.com",
        enrolledCourses: 5,
        completedCourses: 3,
        inProgressCourses: 2,
        totalHours: 32.5,
        avgScore: 84.5,
        certificates: 2,
        lastActive: "2024-12-11 11:30:00",
    },
];

function ReportPage() {
    const [timeRange, setTimeRange] = React.useState("month");
    const [selectedDepartment, setSelectedDepartment] = React.useState("all");
    const [searchText, setSearchText] = React.useState("");

    React.useEffect(() => {
        document.title = "Báo cáo - Mockup App";
    }, []);

    const currentStats = LEARNING_TIME_STATS[timeRange] || LEARNING_TIME_STATS.month;

    const getRankIcon = (rank) => {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";
        return rank;
    };

    // Tab 1: Báo cáo thời lượng học tập
    const learningTimeView = (
        <Row gutter={[24, 24]}>
            {/* Time Range Selector */}
            <Col xs={24}>
                <Card>
                    <Space size="large">
                        <Text strong>Chọn khoảng thời gian:</Text>
                        <Radio.Group value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                            <Radio.Button value="today">Hôm nay</Radio.Button>
                            <Radio.Button value="week">Tuần này</Radio.Button>
                            <Radio.Button value="month">Tháng này</Radio.Button>
                        </Radio.Group>
                        <Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>
                    </Space>
                </Card>
            </Col>

            {/* Statistics Cards */}
            <Col xs={24}>
                <Row gutter={[16, 16]}>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Tổng thời lượng"
                                value={currentStats.hours}
                                suffix="giờ"
                                prefix={<ClockCircleOutlined />}
                                valueStyle={{ color: "#1890ff" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Số khóa học"
                                value={currentStats.courses}
                                prefix={<BookOutlined />}
                                valueStyle={{ color: "#52c41a" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Số bài học"
                                value={currentStats.lessons}
                                prefix={<FileTextOutlined />}
                                valueStyle={{ color: "#faad14" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Card>
                            <Statistic
                                title="Người học"
                                value={currentStats.users}
                                prefix={<UserOutlined />}
                                valueStyle={{ color: "#722ed1" }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>

            {/* Daily Time Chart */}
            <Col xs={24} lg={16}>
                <Card title="📊 Biểu đồ thời lượng theo ngày">
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        {DAILY_TIME.map((item) => (
                            <div key={item.date}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                    <Space>
                                        <Text strong>{item.date}</Text>
                                        <Text type="secondary">({item.users} người học)</Text>
                                    </Space>
                                    <Text strong style={{ color: "#1890ff" }}>{item.hours} giờ</Text>
                                </div>
                                <Progress
                                    percent={(item.hours / 20) * 100}
                                    strokeColor="#1890ff"
                                    showInfo={false}
                                />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    Trung bình: {item.avgTime} giờ/người
                                </Text>
                            </div>
                        ))}
                    </Space>
                </Card>
            </Col>

            {/* Top Active Users */}
            <Col xs={24} lg={8}>
                <Card title="🏆 Top học viên tích cực">
                    <Space direction="vertical" style={{ width: "100%" }} size="small">
                        {TOP_ACTIVE_USERS.map((user) => (
                            <div
                                key={user.id}
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
                                        {getRankIcon(user.rank)}
                                    </Text>
                                    <Avatar src={user.avatar}>{user.name[0]}</Avatar>
                                    <div>
                                        <Text strong>{user.name}</Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {user.department}
                                        </Text>
                                    </div>
                                </Space>
                                <div style={{ textAlign: "right" }}>
                                    <Text strong style={{ color: "#1890ff" }}>{user.hours}h</Text>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {user.courses} khóa
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </Space>
                </Card>
            </Col>
        </Row>
    );

    // Tab 2: Tình trạng khóa học
    const courseStatusView = (
        <Card
            title="📚 Tình trạng các khóa học"
            extra={
                <Space>
                    <Select
                        placeholder="Danh mục"
                        style={{ width: 150 }}
                        defaultValue="all"
                        options={[
                            { value: "all", label: "Tất cả danh mục" },
                            { value: "soft", label: "Kỹ năng mềm" },
                            { value: "productivity", label: "Năng suất" },
                            { value: "onboarding", label: "Onboarding" },
                        ]}
                    />
                    <Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>
                </Space>
            }
        >
            <Table
                dataSource={COURSE_STATUS}
                rowKey="id"
                pagination={false}
                columns={[
                    {
                        title: "Khóa học",
                        dataIndex: "name",
                        width: 250,
                        render: (name, record) => (
                            <div>
                                <Text strong>{name}</Text>
                                <br />
                                <Tag color="blue">{record.category}</Tag>
                            </div>
                        ),
                    },
                    {
                        title: "Tổng HV",
                        dataIndex: "totalStudents",
                        width: 100,
                        align: "center",
                    },
                    {
                        title: "Hoàn thành",
                        dataIndex: "completed",
                        width: 100,
                        align: "center",
                        render: (completed) => (
                            <Text strong style={{ color: "#52c41a" }}>
                                {completed}
                            </Text>
                        ),
                    },
                    {
                        title: "Đang học",
                        dataIndex: "inProgress",
                        width: 100,
                        align: "center",
                        render: (inProgress) => (
                            <Text strong style={{ color: "#1890ff" }}>
                                {inProgress}
                            </Text>
                        ),
                    },
                    {
                        title: "Chưa bắt đầu",
                        dataIndex: "notStarted",
                        width: 120,
                        align: "center",
                        render: (notStarted) => (
                            <Text strong style={{ color: "#8c8c8c" }}>
                                {notStarted}
                            </Text>
                        ),
                    },
                    {
                        title: "Tỷ lệ hoàn thành",
                        dataIndex: "completionRate",
                        width: 180,
                        align: "center",
                        sorter: (a, b) => a.completionRate - b.completionRate,
                        render: (rate) => (
                            <Progress
                                percent={rate}
                                size="small"
                                strokeColor={rate >= 80 ? "#52c41a" : rate >= 60 ? "#faad14" : "#ff4d4f"}
                            />
                        ),
                    },
                    {
                        title: "Điểm TB",
                        dataIndex: "avgScore",
                        width: 100,
                        align: "center",
                        render: (score) => <Text strong>{score.toFixed(1)}</Text>,
                    },
                    {
                        title: "Thời gian TB",
                        dataIndex: "avgTime",
                        width: 120,
                        align: "center",
                        render: (time) => `${time}h`,
                    },
                ]}
            />
        </Card>
    );

    // Tab 3: Báo cáo lộ trình
    const learningPathView = (
        <Card
            title="🗺️ Báo cáo theo lộ trình học tập"
            extra={<Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>}
        >
            <Table
                dataSource={LEARNING_PATHS}
                rowKey="id"
                pagination={false}
                columns={[
                    {
                        title: "Lộ trình",
                        dataIndex: "name",
                        width: 300,
                        render: (name, record) => (
                            <div>
                                <Text strong>{name}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {record.courses} khóa học
                                </Text>
                            </div>
                        ),
                    },
                    {
                        title: "Tổng HV",
                        dataIndex: "totalStudents",
                        width: 100,
                        align: "center",
                    },
                    {
                        title: "Hoàn thành",
                        dataIndex: "completed",
                        width: 120,
                        align: "center",
                        render: (completed) => (
                            <Text strong style={{ color: "#52c41a" }}>
                                {completed}
                            </Text>
                        ),
                    },
                    {
                        title: "Đang học",
                        dataIndex: "inProgress",
                        width: 100,
                        align: "center",
                        render: (inProgress) => (
                            <Text strong style={{ color: "#1890ff" }}>
                                {inProgress}
                            </Text>
                        ),
                    },
                    {
                        title: "Chưa bắt đầu",
                        dataIndex: "notStarted",
                        width: 120,
                        align: "center",
                        render: (notStarted) => (
                            <Text strong style={{ color: "#8c8c8c" }}>
                                {notStarted}
                            </Text>
                        ),
                    },
                    {
                        title: "Tỷ lệ hoàn thành",
                        dataIndex: "completionRate",
                        width: 180,
                        align: "center",
                        sorter: (a, b) => a.completionRate - b.completionRate,
                        render: (rate) => (
                            <Progress
                                percent={rate}
                                size="small"
                                strokeColor={rate >= 80 ? "#52c41a" : rate >= 60 ? "#faad14" : "#ff4d4f"}
                            />
                        ),
                    },
                    {
                        title: "Tiến độ TB",
                        dataIndex: "avgProgress",
                        width: 180,
                        align: "center",
                        render: (progress) => (
                            <div>
                                <Progress percent={progress} size="small" />
                            </div>
                        ),
                    },
                ]}
            />
        </Card>
    );

    // Tab 4: Báo cáo kỳ thi
    const examReportView = (
        <Card
            title="📝 Báo cáo các kỳ thi"
            extra={
                <Space>
                    <RangePicker />
                    <Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>
                </Space>
            }
        >
            <Table
                dataSource={EXAM_REPORTS}
                rowKey="id"
                pagination={false}
                columns={[
                    {
                        title: "Kỳ thi",
                        dataIndex: "name",
                        width: 250,
                        render: (name, record) => (
                            <div>
                                <Text strong>{name}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {record.course}
                                </Text>
                            </div>
                        ),
                    },
                    {
                        title: "Ngày thi",
                        dataIndex: "date",
                        width: 120,
                        align: "center",
                    },
                    {
                        title: "Tổng SV",
                        dataIndex: "totalStudents",
                        width: 100,
                        align: "center",
                    },
                    {
                        title: "Hoàn thành",
                        dataIndex: "completed",
                        width: 100,
                        align: "center",
                    },
                    {
                        title: "Đạt",
                        dataIndex: "passed",
                        width: 80,
                        align: "center",
                        render: (passed) => (
                            <Text strong style={{ color: "#52c41a" }}>
                                {passed}
                            </Text>
                        ),
                    },
                    {
                        title: "Không đạt",
                        dataIndex: "failed",
                        width: 100,
                        align: "center",
                        render: (failed) => (
                            <Text strong style={{ color: "#ff4d4f" }}>
                                {failed}
                            </Text>
                        ),
                    },
                    {
                        title: "Tỷ lệ đạt",
                        dataIndex: "passRate",
                        width: 150,
                        align: "center",
                        sorter: (a, b) => a.passRate - b.passRate,
                        render: (rate) => (
                            <Progress
                                percent={rate}
                                size="small"
                                strokeColor={rate >= 80 ? "#52c41a" : rate >= 60 ? "#faad14" : "#ff4d4f"}
                            />
                        ),
                    },
                    {
                        title: "Điểm TB",
                        dataIndex: "avgScore",
                        width: 100,
                        align: "center",
                        render: (score) => <Text strong>{score.toFixed(1)}</Text>,
                    },
                    {
                        title: "Cao nhất",
                        dataIndex: "maxScore",
                        width: 100,
                        align: "center",
                        render: (score) => (
                            <Text style={{ color: "#52c41a" }}>{score}</Text>
                        ),
                    },
                    {
                        title: "Thấp nhất",
                        dataIndex: "minScore",
                        width: 100,
                        align: "center",
                        render: (score) => (
                            <Text style={{ color: "#ff4d4f" }}>{score}</Text>
                        ),
                    },
                ]}
            />
        </Card>
    );

    // Tab 5: Chi tiết nhân sự
    const employeeDetailView = (
        <Card
            title="👥 Báo cáo chi tiết nhân sự"
            extra={
                <Space wrap>
                    <Input
                        placeholder="Tìm kiếm nhân sự..."
                        prefix={<SearchOutlined />}
                        style={{ width: 200 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                    />
                    <Select
                        placeholder="Phòng ban"
                        style={{ width: 150 }}
                        value={selectedDepartment}
                        onChange={setSelectedDepartment}
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
                dataSource={EMPLOYEE_DETAILS}
                rowKey="id"
                pagination={{
                    pageSize: 20,
                    showTotal: (total) => `Tổng ${total} nhân sự`,
                }}
                columns={[
                    {
                        title: "Nhân sự",
                        dataIndex: "name",
                        width: 250,
                        render: (name, record) => (
                            <Space>
                                <Avatar src={record.avatar}>{name[0]}</Avatar>
                                <div>
                                    <Text strong>{name}</Text>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {record.position}
                                    </Text>
                                </div>
                            </Space>
                        ),
                    },
                    {
                        title: "Phòng ban",
                        dataIndex: "department",
                        width: 120,
                        align: "center",
                        render: (dept) => <Tag color="blue">{dept}</Tag>,
                    },
                    {
                        title: "Khóa học",
                        width: 150,
                        align: "center",
                        render: (_, record) => (
                            <div>
                                <Text strong style={{ color: "#52c41a" }}>
                                    {record.completedCourses}
                                </Text>
                                {" / "}
                                <Text>{record.enrolledCourses}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    Đang học: {record.inProgressCourses}
                                </Text>
                            </div>
                        ),
                    },
                    {
                        title: "Thời lượng",
                        dataIndex: "totalHours",
                        width: 100,
                        align: "center",
                        sorter: (a, b) => a.totalHours - b.totalHours,
                        render: (hours) => (
                            <Text strong style={{ color: "#1890ff" }}>
                                {hours}h
                            </Text>
                        ),
                    },
                    {
                        title: "Điểm TB",
                        dataIndex: "avgScore",
                        width: 100,
                        align: "center",
                        sorter: (a, b) => a.avgScore - b.avgScore,
                        render: (score) => (
                            <Tag color={score >= 90 ? "green" : score >= 80 ? "blue" : "orange"}>
                                {score.toFixed(1)}
                            </Tag>
                        ),
                    },
                    {
                        title: "Chứng chỉ",
                        dataIndex: "certificates",
                        width: 100,
                        align: "center",
                        render: (certs) => (
                            <Badge count={certs} showZero style={{ backgroundColor: "#52c41a" }} />
                        ),
                    },
                    {
                        title: "Hoạt động gần nhất",
                        dataIndex: "lastActive",
                        width: 180,
                        render: (time) => (
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {time}
                            </Text>
                        ),
                    },
                    {
                        title: "Thao tác",
                        width: 100,
                        align: "center",
                        render: () => (
                            <Button size="small" type="link">
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
                    <BarChartOutlined style={{ marginRight: 8 }} />
                    Báo cáo
                </Title>
                <Text type="secondary">
                    Xem báo cáo tổng hợp về hoạt động học tập, khóa học, kỳ thi và nhân sự
                </Text>
            </div>

            <Tabs
                defaultActiveKey="time"
                items={[
                    {
                        key: "time",
                        label: (
                            <span>
                                <ClockCircleOutlined /> Thời lượng học tập
                            </span>
                        ),
                        children: learningTimeView,
                    },
                    {
                        key: "course",
                        label: (
                            <span>
                                <BookOutlined /> Tình trạng khóa học
                            </span>
                        ),
                        children: courseStatusView,
                    },
                    {
                        key: "path",
                        label: (
                            <span>
                                <ApartmentOutlined /> Báo cáo lộ trình
                            </span>
                        ),
                        children: learningPathView,
                    },
                    {
                        key: "exam",
                        label: (
                            <span>
                                <FileTextOutlined /> Báo cáo kỳ thi
                            </span>
                        ),
                        children: examReportView,
                    },
                    {
                        key: "employee",
                        label: (
                            <span>
                                <UserOutlined /> Chi tiết nhân sự
                            </span>
                        ),
                        children: employeeDetailView,
                    },
                ]}
            />
        </div>
    );
}

export default ReportPage;
