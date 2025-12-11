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
    Empty,
    Modal,
} from "antd";
import {
    SafetyCertificateOutlined,
    TrophyOutlined,
    UserOutlined,
    TeamOutlined,
    BarChartOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    DownloadOutlined,
    EyeOutlined,
    SearchOutlined,
    CalendarOutlined,
    RiseOutlined,
    FallOutlined,
    LineChartOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

// Data mẫu
const CERTIFICATES = [
    {
        id: 1,
        name: "Chứng chỉ Kỹ năng bán hàng cơ bản",
        code: "SALES-BASIC-2024",
        course: "Kỹ năng bán hàng cơ bản",
        issueDate: "2024-12-15",
        validPeriod: "2 năm",
        expiryDate: "2026-12-15",
        requirements: [
            "Hoàn thành 100% khóa học",
            "Điểm thi cuối khóa ≥ 70",
            "Điểm trung bình bài tập ≥ 75",
        ],
        totalEligible: 28,
        achieved: 21,
        notAchieved: 7,
        achievementRate: 75.0,
        inProgress: 5,
        notStarted: 2,
    },
    {
        id: 2,
        name: "Chứng chỉ Kỹ năng giao tiếp chuyên nghiệp",
        code: "COMM-PRO-2024",
        course: "Kỹ năng giao tiếp",
        issueDate: "2024-12-20",
        validPeriod: "3 năm",
        expiryDate: "2027-12-20",
        requirements: [
            "Hoàn thành 100% khóa học",
            "Điểm thi cuối khóa ≥ 75",
            "Tham gia đầy đủ workshop",
        ],
        totalEligible: 35,
        achieved: 28,
        notAchieved: 7,
        achievementRate: 80.0,
        inProgress: 12,
        notStarted: 0,
    },
    {
        id: 3,
        name: "Chứng chỉ Quản lý thời gian hiệu quả",
        code: "TIME-MGT-2024",
        course: "Quản lý thời gian",
        issueDate: "2024-12-10",
        validPeriod: "2 năm",
        expiryDate: "2026-12-10",
        requirements: [
            "Hoàn thành 100% khóa học",
            "Điểm thi cuối khóa ≥ 70",
            "Hoàn thành project cuối khóa",
        ],
        totalEligible: 24,
        achieved: 18,
        notAchieved: 6,
        achievementRate: 75.0,
        inProgress: 8,
        notStarted: 4,
    },
    {
        id: 4,
        name: "Chứng chỉ Làm việc nhóm và Teamwork",
        code: "TEAM-WORK-2024",
        course: "Kỹ năng làm việc nhóm",
        issueDate: "2024-11-30",
        validPeriod: "2 năm",
        expiryDate: "2026-11-30",
        requirements: [
            "Hoàn thành 100% khóa học",
            "Điểm đánh giá nhóm ≥ 80",
            "Tham gia hoạt động team building",
        ],
        totalEligible: 30,
        achieved: 25,
        notAchieved: 5,
        achievementRate: 83.33,
        inProgress: 6,
        notStarted: 1,
    },
    {
        id: 5,
        name: "Chứng chỉ Đào tạo hội nhập",
        code: "ONBOARD-2024",
        course: "Đào tạo hội nhập",
        issueDate: "2024-11-25",
        validPeriod: "Vĩnh viễn",
        expiryDate: null,
        requirements: [
            "Hoàn thành 100% khóa học",
            "Tham gia orientation",
            "Hoàn thành checklist hội nhập",
        ],
        totalEligible: 32,
        achieved: 30,
        notAchieved: 2,
        achievementRate: 93.75,
        inProgress: 3,
        notStarted: 0,
    },
];

const CERTIFICATE_HOLDERS = [
    {
        id: 1,
        certificateId: 1,
        studentId: 1,
        name: "Nguyễn Hoàng Minh",
        avatar: "https://i.pravatar.cc/150?img=12",
        department: "Sales",
        email: "nguyenhoangminh@company.com",
        status: "achieved",
        achievedDate: "2024-12-11",
        expiryDate: "2026-12-11",
        score: 98,
        completionRate: 100,
        certificateNumber: "SALES-BASIC-2024-001",
    },
    {
        id: 2,
        certificateId: 1,
        studentId: 2,
        name: "Trần Thị Mai Anh",
        avatar: "https://i.pravatar.cc/150?img=47",
        department: "Marketing",
        email: "tran.mai.anh@company.com",
        status: "achieved",
        achievedDate: "2024-12-11",
        expiryDate: "2026-12-11",
        score: 92,
        completionRate: 100,
        certificateNumber: "SALES-BASIC-2024-002",
    },
    {
        id: 3,
        certificateId: 1,
        studentId: 3,
        name: "Lê Quang Hải",
        avatar: "https://i.pravatar.cc/150?img=33",
        department: "Sales",
        email: "lequanghai@company.com",
        status: "achieved",
        achievedDate: "2024-12-11",
        expiryDate: "2026-12-11",
        score: 88,
        completionRate: 100,
        certificateNumber: "SALES-BASIC-2024-003",
    },
    {
        id: 4,
        certificateId: 1,
        studentId: 11,
        name: "Nguyễn Văn Cường",
        avatar: "https://i.pravatar.cc/150?img=15",
        department: "Sales",
        email: "nguyencuong@company.com",
        status: "not_achieved",
        reason: "Điểm thi chưa đạt (68/100)",
        completionRate: 95,
        lastAttempt: "2024-12-11",
    },
    {
        id: 5,
        certificateId: 1,
        studentId: 12,
        name: "Trần Thị Duyên",
        avatar: "https://i.pravatar.cc/150?img=38",
        department: "Marketing",
        email: "tranduyen@company.com",
        status: "not_achieved",
        reason: "Điểm thi chưa đạt (65/100)",
        completionRate: 100,
        lastAttempt: "2024-12-11",
    },
    {
        id: 6,
        certificateId: 1,
        studentId: 20,
        name: "Hoàng Văn Long",
        avatar: "https://i.pravatar.cc/150?img=54",
        department: "Sales",
        email: "hoanglong@company.com",
        status: "in_progress",
        completionRate: 75,
        expectedDate: "2024-12-20",
    },
    {
        id: 7,
        certificateId: 1,
        studentId: 21,
        name: "Phạm Thị Huyền",
        avatar: "https://i.pravatar.cc/150?img=24",
        department: "Marketing",
        email: "phamhuyen@company.com",
        status: "in_progress",
        completionRate: 60,
        expectedDate: "2024-12-25",
    },
];

const MONTHLY_TREND = [
    { month: "T7/2024", achieved: 12, total: 15, rate: 80.0 },
    { month: "T8/2024", achieved: 18, total: 22, rate: 81.82 },
    { month: "T9/2024", achieved: 25, total: 30, rate: 83.33 },
    { month: "T10/2024", achieved: 32, total: 38, rate: 84.21 },
    { month: "T11/2024", achieved: 45, total: 55, rate: 81.82 },
    { month: "T12/2024", achieved: 52, total: 68, rate: 76.47 },
];

const DEPARTMENT_STATS = [
    { department: "Sales", eligible: 45, achieved: 38, rate: 84.44, color: "#1890ff" },
    { department: "Marketing", eligible: 28, achieved: 24, rate: 85.71, color: "#52c41a" },
    { department: "HR", eligible: 18, achieved: 14, rate: 77.78, color: "#faad14" },
    { department: "IT", eligible: 22, achieved: 16, rate: 72.73, color: "#722ed1" },
];

function CertificateReportPage() {
    const [selectedCertificate, setSelectedCertificate] = React.useState(null);
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [filterStatus, setFilterStatus] = React.useState("all");
    const [filterDepartment, setFilterDepartment] = React.useState("all");
    const [searchText, setSearchText] = React.useState("");

    React.useEffect(() => {
        document.title = "Báo cáo chứng chỉ - Mockup App";
    }, []);

    // Calculate overall statistics
    const overallStats = React.useMemo(() => {
        const total = CERTIFICATES.reduce((sum, cert) => sum + cert.totalEligible, 0);
        const achieved = CERTIFICATES.reduce((sum, cert) => sum + cert.achieved, 0);
        const notAchieved = CERTIFICATES.reduce((sum, cert) => sum + cert.notAchieved, 0);
        const inProgress = CERTIFICATES.reduce((sum, cert) => sum + cert.inProgress, 0);
        return {
            totalCertificates: CERTIFICATES.length,
            totalEligible: total,
            totalAchieved: achieved,
            totalNotAchieved: notAchieved,
            totalInProgress: inProgress,
            overallRate: total > 0 ? ((achieved / total) * 100).toFixed(2) : 0,
        };
    }, []);

    // Filter certificate holders
    const filteredHolders = React.useMemo(() => {
        if (!selectedCertificate) return [];
        return CERTIFICATE_HOLDERS.filter((holder) => {
            const certMatch = holder.certificateId === selectedCertificate.id;
            const statusMatch = filterStatus === "all" || holder.status === filterStatus;
            const deptMatch = filterDepartment === "all" || holder.department === filterDepartment;
            const searchMatch =
                searchText === "" ||
                holder.name.toLowerCase().includes(searchText.toLowerCase()) ||
                holder.email.toLowerCase().includes(searchText.toLowerCase());
            return certMatch && statusMatch && deptMatch && searchMatch;
        });
    }, [selectedCertificate, filterStatus, filterDepartment, searchText]);

    const getStatusTag = (status, cert) => {
        const configs = {
            achieved: {
                color: "success",
                icon: <CheckCircleOutlined />,
                text: "Đã đạt",
            },
            not_achieved: {
                color: "error",
                icon: <CloseCircleOutlined />,
                text: "Chưa đạt",
            },
            in_progress: {
                color: "processing",
                icon: <ClockCircleOutlined />,
                text: "Đang học",
            },
            expired: {
                color: "default",
                icon: <CloseCircleOutlined />,
                text: "Hết hạn",
            },
        };
        const config = configs[status] || configs.in_progress;
        return (
            <Tag icon={config.icon} color={config.color}>
                {config.text}
            </Tag>
        );
    };

    const certificateColumns = [
        {
            title: "Chứng chỉ",
            dataIndex: "name",
            width: 300,
            render: (name, record) => (
                <div>
                    <Space>
                        <SafetyCertificateOutlined style={{ fontSize: 24, color: "#1890ff" }} />
                        <div>
                            <Text strong>{name}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {record.code}
                            </Text>
                        </div>
                    </Space>
                </div>
            ),
        },
        {
            title: "Khóa học",
            dataIndex: "course",
            width: 200,
        },
        {
            title: "Tổng số",
            dataIndex: "totalEligible",
            width: 100,
            align: "center",
        },
        {
            title: "Đã đạt",
            dataIndex: "achieved",
            width: 100,
            align: "center",
            render: (achieved) => (
                <Text strong style={{ color: "#52c41a", fontSize: 16 }}>
                    {achieved}
                </Text>
            ),
        },
        {
            title: "Chưa đạt",
            dataIndex: "notAchieved",
            width: 100,
            align: "center",
            render: (notAchieved) => (
                <Text strong style={{ color: "#ff4d4f", fontSize: 16 }}>
                    {notAchieved}
                </Text>
            ),
        },
        {
            title: "Đang học",
            dataIndex: "inProgress",
            width: 100,
            align: "center",
            render: (inProgress) => (
                <Text strong style={{ color: "#1890ff", fontSize: 16 }}>
                    {inProgress}
                </Text>
            ),
        },
        {
            title: "Tỷ lệ đạt",
            dataIndex: "achievementRate",
            width: 180,
            align: "center",
            sorter: (a, b) => a.achievementRate - b.achievementRate,
            render: (rate) => (
                <div>
                    <Progress
                        percent={rate}
                        strokeColor={rate >= 80 ? "#52c41a" : rate >= 60 ? "#faad14" : "#ff4d4f"}
                        size="small"
                    />
                </div>
            ),
        },
        {
            title: "Thao tác",
            width: 120,
            align: "center",
            render: (_, record) => (
                <Button
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => {
                        setSelectedCertificate(record);
                        setShowDetailModal(true);
                    }}
                >
                    Chi tiết
                </Button>
            ),
        },
    ];

    const holderColumns = [
        {
            title: "Học viên",
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
            title: "Trạng thái",
            dataIndex: "status",
            width: 150,
            align: "center",
            render: (status) => getStatusTag(status),
        },
        {
            title: "Tiến độ",
            dataIndex: "completionRate",
            width: 150,
            align: "center",
            render: (rate) => (
                <Progress
                    percent={rate}
                    size="small"
                    strokeColor={rate === 100 ? "#52c41a" : "#1890ff"}
                />
            ),
        },
        {
            title: "Thông tin",
            width: 200,
            render: (_, record) => {
                if (record.status === "achieved") {
                    return (
                        <div>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                Đạt ngày: {record.achievedDate}
                            </Text>
                            <br />
                            <Text style={{ fontSize: 12 }}>
                                Điểm: <strong>{record.score}</strong>
                            </Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                Mã: {record.certificateNumber}
                            </Text>
                        </div>
                    );
                }
                if (record.status === "not_achieved") {
                    return (
                        <Text type="danger" style={{ fontSize: 12 }}>
                            {record.reason}
                        </Text>
                    );
                }
                if (record.status === "in_progress") {
                    return (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            Dự kiến: {record.expectedDate}
                        </Text>
                    );
                }
                return null;
            },
        },
        {
            title: "Thao tác",
            width: 150,
            align: "center",
            render: (_, record) => (
                <Space>
                    <Button size="small" icon={<EyeOutlined />}>
                        Xem
                    </Button>
                    {record.status === "achieved" && (
                        <Tooltip title="Tải chứng chỉ">
                            <Button size="small" icon={<DownloadOutlined />} />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    // Tab Overview
    const overviewView = (
        <Row gutter={[24, 24]}>
            {/* Overall Statistics */}
            <Col xs={24}>
                <Row gutter={[16, 16]}>
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card>
                            <Statistic
                                title="Tổng chứng chỉ"
                                value={overallStats.totalCertificates}
                                prefix={<SafetyCertificateOutlined />}
                                valueStyle={{ color: "#1890ff" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card>
                            <Statistic
                                title="Tổng học viên"
                                value={overallStats.totalEligible}
                                prefix={<UserOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card>
                            <Statistic
                                title="Đã đạt"
                                value={overallStats.totalAchieved}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: "#52c41a" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card>
                            <Statistic
                                title="Chưa đạt"
                                value={overallStats.totalNotAchieved}
                                prefix={<CloseCircleOutlined />}
                                valueStyle={{ color: "#ff4d4f" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card>
                            <Statistic
                                title="Đang học"
                                value={overallStats.totalInProgress}
                                prefix={<ClockCircleOutlined />}
                                valueStyle={{ color: "#1890ff" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card>
                            <Statistic
                                title="Tỷ lệ đạt"
                                value={overallStats.overallRate}
                                suffix="%"
                                prefix={<TrophyOutlined />}
                                valueStyle={{ color: "#faad14" }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>

            {/* Achievement by Department */}
            <Col xs={24} lg={12}>
                <Card title="📊 Thống kê theo phòng ban">
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        {DEPARTMENT_STATS.map((dept) => (
                            <div key={dept.department}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 4,
                                    }}
                                >
                                    <Space>
                                        <Badge color={dept.color} />
                                        <Text strong>{dept.department}</Text>
                                    </Space>
                                    <Text>
                                        <strong style={{ color: "#52c41a" }}>{dept.achieved}</strong>/
                                        {dept.eligible} ({dept.rate.toFixed(1)}%)
                                    </Text>
                                </div>
                                <Progress
                                    percent={dept.rate}
                                    strokeColor={dept.color}
                                    showInfo={false}
                                />
                            </div>
                        ))}
                    </Space>
                </Card>
            </Col>

            {/* Monthly Trend */}
            <Col xs={24} lg={12}>
                <Card title="📈 Xu hướng theo tháng">
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        {MONTHLY_TREND.map((item) => (
                            <div key={item.month}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 4,
                                    }}
                                >
                                    <Text strong>{item.month}</Text>
                                    <Space>
                                        <Text>
                                            <strong style={{ color: "#52c41a" }}>{item.achieved}</strong>/
                                            {item.total}
                                        </Text>
                                        <Tag color={item.rate >= 80 ? "green" : "orange"}>
                                            {item.rate.toFixed(1)}%
                                        </Tag>
                                    </Space>
                                </div>
                                <Progress
                                    percent={item.rate}
                                    strokeColor={item.rate >= 80 ? "#52c41a" : "#faad14"}
                                    showInfo={false}
                                />
                            </div>
                        ))}
                    </Space>
                </Card>
            </Col>

            {/* Certificate List */}
            <Col xs={24}>
                <Card
                    title="🏆 Danh sách chứng chỉ"
                    extra={
                        <Button icon={<DownloadOutlined />}>
                            Xuất báo cáo
                        </Button>
                    }
                >
                    <Table
                        dataSource={CERTIFICATES}
                        columns={certificateColumns}
                        rowKey="id"
                        pagination={false}
                    />
                </Card>
            </Col>
        </Row>
    );

    // Tab Certificate Details
    const certificateDetailsView = (
        <Row gutter={[24, 24]}>
            <Col xs={24}>
                <Card>
                    <Select
                        placeholder="Chọn chứng chỉ để xem chi tiết"
                        style={{ width: "100%" }}
                        size="large"
                        value={selectedCertificate?.id}
                        onChange={(value) => {
                            const cert = CERTIFICATES.find((c) => c.id === value);
                            setSelectedCertificate(cert);
                        }}
                        options={CERTIFICATES.map((cert) => ({
                            value: cert.id,
                            label: cert.name,
                        }))}
                    />
                </Card>
            </Col>

            {selectedCertificate ? (
                <>
                    {/* Certificate Info */}
                    <Col xs={24}>
                        <Card title="📋 Thông tin chứng chỉ">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} md={12}>
                                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                        <div>
                                            <Text type="secondary">Tên chứng chỉ:</Text>
                                            <br />
                                            <Text strong style={{ fontSize: 16 }}>
                                                {selectedCertificate.name}
                                            </Text>
                                        </div>
                                        <div>
                                            <Text type="secondary">Mã chứng chỉ:</Text>
                                            <br />
                                            <Tag color="blue">{selectedCertificate.code}</Tag>
                                        </div>
                                        <div>
                                            <Text type="secondary">Khóa học:</Text>
                                            <br />
                                            <Text>{selectedCertificate.course}</Text>
                                        </div>
                                    </Space>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                        <div>
                                            <Text type="secondary">Ngày cấp:</Text>
                                            <br />
                                            <Text>{selectedCertificate.issueDate}</Text>
                                        </div>
                                        <div>
                                            <Text type="secondary">Thời hạn:</Text>
                                            <br />
                                            <Text>{selectedCertificate.validPeriod}</Text>
                                        </div>
                                        {selectedCertificate.expiryDate && (
                                            <div>
                                                <Text type="secondary">Ngày hết hạn:</Text>
                                                <br />
                                                <Text>{selectedCertificate.expiryDate}</Text>
                                            </div>
                                        )}
                                    </Space>
                                </Col>
                            </Row>

                            <Divider />

                            <div>
                                <Text strong>Yêu cầu để đạt chứng chỉ:</Text>
                                <ul style={{ marginTop: 8 }}>
                                    {selectedCertificate.requirements.map((req, index) => (
                                        <li key={index}>
                                            <Text>{req}</Text>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    </Col>

                    {/* Statistics for Selected Certificate */}
                    <Col xs={24}>
                        <Row gutter={[16, 16]}>
                            <Col xs={12} sm={6}>
                                <Card>
                                    <Statistic
                                        title="Tổng số"
                                        value={selectedCertificate.totalEligible}
                                        prefix={<UserOutlined />}
                                    />
                                </Card>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Card>
                                    <Statistic
                                        title="Đã đạt"
                                        value={selectedCertificate.achieved}
                                        prefix={<CheckCircleOutlined />}
                                        valueStyle={{ color: "#52c41a" }}
                                    />
                                </Card>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Card>
                                    <Statistic
                                        title="Chưa đạt"
                                        value={selectedCertificate.notAchieved}
                                        prefix={<CloseCircleOutlined />}
                                        valueStyle={{ color: "#ff4d4f" }}
                                    />
                                </Card>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Card>
                                    <Statistic
                                        title="Tỷ lệ đạt"
                                        value={selectedCertificate.achievementRate}
                                        suffix="%"
                                        prefix={<TrophyOutlined />}
                                        valueStyle={{ color: "#faad14" }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    {/* Holders List */}
                    <Col xs={24}>
                        <Card
                            title="👥 Danh sách học viên"
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
                                            { value: "achieved", label: "✅ Đã đạt" },
                                            { value: "not_achieved", label: "❌ Chưa đạt" },
                                            { value: "in_progress", label: "🔄 Đang học" },
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
                                    <Button icon={<DownloadOutlined />}>
                                        Xuất danh sách
                                    </Button>
                                </Space>
                            }
                        >
                            <Table
                                dataSource={filteredHolders}
                                columns={holderColumns}
                                rowKey="id"
                                pagination={{
                                    pageSize: 20,
                                    showTotal: (total) => `Tổng ${total} học viên`,
                                }}
                            />
                        </Card>
                    </Col>
                </>
            ) : (
                <Col xs={24}>
                    <Card>
                        <Empty description="Vui lòng chọn chứng chỉ để xem chi tiết" />
                    </Card>
                </Col>
            )}
        </Row>
    );

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>
                    <SafetyCertificateOutlined style={{ marginRight: 8 }} />
                    Báo cáo chứng chỉ
                </Title>
                <Text type="secondary">
                    Xem báo cáo số người đạt chứng chỉ theo từng khóa học và phòng ban
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
                        key: "details",
                        label: (
                            <span>
                                <SafetyCertificateOutlined /> Chi tiết chứng chỉ
                            </span>
                        ),
                        children: certificateDetailsView,
                    },
                ]}
            />

            {/* Detail Modal */}
            <Modal
                title={
                    <Space>
                        <SafetyCertificateOutlined style={{ color: "#1890ff", fontSize: 20 }} />
                        <Text strong>Chi tiết chứng chỉ</Text>
                    </Space>
                }
                open={showDetailModal}
                onCancel={() => setShowDetailModal(false)}
                width={900}
                footer={[
                    <Button key="close" onClick={() => setShowDetailModal(false)}>
                        Đóng
                    </Button>,
                    <Button key="export" type="primary" icon={<DownloadOutlined />}>
                        Xuất báo cáo
                    </Button>,
                ]}
            >
                {selectedCertificate && (
                    <div>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <div
                                    style={{
                                        background: "#f0f5ff",
                                        border: "1px solid #adc6ff",
                                        padding: 16,
                                        borderRadius: 4,
                                    }}
                                >
                                    <Title level={4} style={{ marginBottom: 16 }}>
                                        {selectedCertificate.name}
                                    </Title>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Text type="secondary">Mã chứng chỉ:</Text>
                                            <br />
                                            <Tag color="blue" style={{ marginTop: 4 }}>
                                                {selectedCertificate.code}
                                            </Tag>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary">Khóa học:</Text>
                                            <br />
                                            <Text strong>{selectedCertificate.course}</Text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            <Col span={24}>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card size="small">
                                            <Statistic
                                                title="Tổng số"
                                                value={selectedCertificate.totalEligible}
                                                prefix={<UserOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card size="small">
                                            <Statistic
                                                title="Đã đạt"
                                                value={selectedCertificate.achieved}
                                                prefix={<CheckCircleOutlined />}
                                                valueStyle={{ color: "#52c41a" }}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card size="small">
                                            <Statistic
                                                title="Tỷ lệ"
                                                value={selectedCertificate.achievementRate}
                                                suffix="%"
                                                valueStyle={{ color: "#faad14" }}
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>

                            <Col span={24}>
                                <Divider orientation="left">Phân bố kết quả</Divider>
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>✅ Đã đạt:</Text>
                                        <Progress
                                            percent={(selectedCertificate.achieved / selectedCertificate.totalEligible) * 100}
                                            steps={10}
                                            strokeColor="#52c41a"
                                            style={{ width: "60%" }}
                                        />
                                        <Text strong>{selectedCertificate.achieved}</Text>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>❌ Chưa đạt:</Text>
                                        <Progress
                                            percent={(selectedCertificate.notAchieved / selectedCertificate.totalEligible) * 100}
                                            steps={10}
                                            strokeColor="#ff4d4f"
                                            style={{ width: "60%" }}
                                        />
                                        <Text strong>{selectedCertificate.notAchieved}</Text>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>🔄 Đang học:</Text>
                                        <Progress
                                            percent={(selectedCertificate.inProgress / selectedCertificate.totalEligible) * 100}
                                            steps={10}
                                            strokeColor="#1890ff"
                                            style={{ width: "60%" }}
                                        />
                                        <Text strong>{selectedCertificate.inProgress}</Text>
                                    </div>
                                </Space>
                            </Col>

                            <Col span={24}>
                                <Divider orientation="left">Yêu cầu đạt chứng chỉ</Divider>
                                <ul>
                                    {selectedCertificate.requirements.map((req, index) => (
                                        <li key={index}>
                                            <Text>{req}</Text>
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default CertificateReportPage;
