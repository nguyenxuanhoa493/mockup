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
    Modal,
    Select,
    DatePicker,
    Input,
    Timeline,
    Avatar,
    Badge,
    Tooltip,
    Progress,
    Statistic,
    Tabs,
    List,
} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    FormOutlined,
    UserOutlined,
    CalendarOutlined,
    EnvironmentOutlined,
    EyeOutlined,
    DownloadOutlined,
    TeamOutlined,
    BarChartOutlined,
    HistoryOutlined,
    CheckOutlined,
    CloseOutlined,
    WarningOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

// Data mẫu
const CLASS_INFO = {
    id: 1,
    name: "Kỹ năng bán hàng cơ bản - Khóa K01",
    course: "Kỹ năng bán hàng cơ bản",
    instructor: "Nguyễn Văn An",
    startDate: "2024-11-20",
    endDate: "2024-12-20",
    schedule: "Thứ 3, Thứ 5 - 14:00-17:00",
    location: "Phòng đào tạo 301 - Tòa nhà A",
    totalSessions: 12,
    completedSessions: 8,
    enrolledStudents: 28,
};

const STUDENTS = [
    {
        id: 1,
        name: "Nguyễn Hoàng Minh",
        avatar: "https://i.pravatar.cc/150?img=12",
        department: "Sales",
        email: "nguyenhoangminh@company.com",
    },
    {
        id: 2,
        name: "Trần Thị Mai Anh",
        avatar: "https://i.pravatar.cc/150?img=47",
        department: "Marketing",
        email: "tran.mai.anh@company.com",
    },
    {
        id: 3,
        name: "Lê Quang Hải",
        avatar: "https://i.pravatar.cc/150?img=33",
        department: "Sales",
        email: "lequanghai@company.com",
    },
    {
        id: 4,
        name: "Phạm Thị Thanh Hương",
        avatar: "https://i.pravatar.cc/150?img=20",
        department: "HR",
        email: "phamthihhuong@company.com",
    },
    {
        id: 5,
        name: "Hoàng Văn Đức",
        avatar: "https://i.pravatar.cc/150?img=68",
        department: "Sales",
        email: "hoangvanduc@company.com",
    },
];

const ACTIVITY_LOGS = [
    {
        id: 1,
        type: "attendance",
        typeLabel: "Điểm danh",
        session: "Buổi 8 - Kỹ thuật chốt sale",
        sessionDate: "2024-12-10",
        timestamp: "2024-12-10 14:05:00",
        student: "Nguyễn Hoàng Minh",
        studentId: 1,
        status: "present",
        statusLabel: "Có mặt",
        note: "Đúng giờ",
    },
    {
        id: 2,
        type: "attendance",
        typeLabel: "Điểm danh",
        session: "Buổi 8 - Kỹ thuật chốt sale",
        sessionDate: "2024-12-10",
        timestamp: "2024-12-10 14:20:00",
        student: "Trần Thị Mai Anh",
        studentId: 2,
        status: "late",
        statusLabel: "Đi muộn",
        note: "Muộn 20 phút",
    },
    {
        id: 3,
        type: "attendance",
        typeLabel: "Điểm danh",
        session: "Buổi 8 - Kỹ thuật chốt sale",
        sessionDate: "2024-12-10",
        timestamp: "2024-12-10 14:00:00",
        student: "Lê Quang Hải",
        studentId: 3,
        status: "absent",
        statusLabel: "Vắng",
        note: "Vắng có phép - Công tác",
    },
    {
        id: 4,
        type: "assignment",
        typeLabel: "Bài tập",
        title: "Bài tập: Xây dựng kịch bản bán hàng",
        description: "Tạo kịch bản bán hàng hoàn chỉnh cho sản phẩm X",
        deadline: "2024-12-12 23:59:00",
        timestamp: "2024-12-10 16:30:00",
        student: "Nguyễn Hoàng Minh",
        studentId: 1,
        status: "submitted",
        statusLabel: "Đã nộp",
        submittedAt: "2024-12-11 10:00:00",
        score: 95,
        feedback: "Rất tốt! Kịch bản logic và thuyết phục.",
    },
    {
        id: 5,
        type: "assignment",
        typeLabel: "Bài tập",
        title: "Bài tập: Xây dựng kịch bản bán hàng",
        description: "Tạo kịch bản bán hàng hoàn chỉnh cho sản phẩm X",
        deadline: "2024-12-12 23:59:00",
        timestamp: "2024-12-11 22:00:00",
        student: "Trần Thị Mai Anh",
        studentId: 2,
        status: "submitted",
        statusLabel: "Đã nộp",
        submittedAt: "2024-12-11 22:00:00",
        score: 88,
        feedback: "Tốt, cần cải thiện phần xử lý từ chối.",
    },
    {
        id: 6,
        type: "assignment",
        typeLabel: "Bài tập",
        title: "Bài tập: Xây dựng kịch bản bán hàng",
        description: "Tạo kịch bản bán hàng hoàn chỉnh cho sản phẩm X",
        deadline: "2024-12-12 23:59:00",
        timestamp: "2024-12-10 16:30:00",
        student: "Lê Quang Hải",
        studentId: 3,
        status: "pending",
        statusLabel: "Chưa nộp",
    },
    {
        id: 7,
        type: "survey",
        typeLabel: "Khảo sát",
        title: "Khảo sát đánh giá giảng viên - Buổi 8",
        description: "Đánh giá chất lượng giảng dạy và nội dung buổi học",
        timestamp: "2024-12-10 17:00:00",
        student: "Nguyễn Hoàng Minh",
        studentId: 1,
        status: "completed",
        statusLabel: "Đã hoàn thành",
        completedAt: "2024-12-10 17:05:00",
        rating: 5,
        comment: "Buổi học rất hay và bổ ích!",
    },
    {
        id: 8,
        type: "survey",
        typeLabel: "Khảo sát",
        title: "Khảo sát đánh giá giảng viên - Buổi 8",
        description: "Đánh giá chất lượng giảng dạy và nội dung buổi học",
        timestamp: "2024-12-10 17:00:00",
        student: "Trần Thị Mai Anh",
        studentId: 2,
        status: "completed",
        statusLabel: "Đã hoàn thành",
        completedAt: "2024-12-10 17:10:00",
        rating: 4,
        comment: "Nội dung tốt, cần thêm ví dụ thực tế.",
    },
    {
        id: 9,
        type: "survey",
        typeLabel: "Khảo sát",
        title: "Khảo sát đánh giá giảng viên - Buổi 8",
        description: "Đánh giá chất lượng giảng dạy và nội dung buổi học",
        timestamp: "2024-12-10 17:00:00",
        student: "Phạm Thị Thanh Hương",
        studentId: 4,
        status: "pending",
        statusLabel: "Chưa hoàn thành",
    },
    {
        id: 10,
        type: "attendance",
        typeLabel: "Điểm danh",
        session: "Buổi 7 - Xử lý từ chối",
        sessionDate: "2024-12-05",
        timestamp: "2024-12-05 14:00:00",
        student: "Nguyễn Hoàng Minh",
        studentId: 1,
        status: "present",
        statusLabel: "Có mặt",
        note: "Đúng giờ",
    },
];

const STATISTICS = {
    attendance: {
        total: 224, // 28 students x 8 sessions
        present: 198,
        late: 15,
        absent: 11,
        rate: 88.4,
    },
    assignment: {
        total: 84, // 28 students x 3 assignments
        submitted: 68,
        pending: 12,
        late: 4,
        avgScore: 85.5,
    },
    survey: {
        total: 56, // 28 students x 2 surveys
        completed: 48,
        pending: 8,
        avgRating: 4.3,
    },
};

function OfflineClassActivityLogPage() {
    const [selectedActivity, setSelectedActivity] = React.useState(null);
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [filterType, setFilterType] = React.useState("all");
    const [filterStudent, setFilterStudent] = React.useState("all");

    React.useEffect(() => {
        document.title = "Nhật ký hoạt động lớp học - Mockup App";
    }, []);

    // Filter data
    const filteredData = React.useMemo(() => {
        return ACTIVITY_LOGS.filter((item) => {
            const typeMatch = filterType === "all" || item.type === filterType;
            const studentMatch = filterStudent === "all" || item.studentId === parseInt(filterStudent);
            return typeMatch && studentMatch;
        });
    }, [filterType, filterStudent]);

    const getActivityIcon = (type, status) => {
        if (type === "attendance") {
            if (status === "present") return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
            if (status === "late") return <WarningOutlined style={{ color: "#faad14" }} />;
            return <CloseCircleOutlined style={{ color: "#ff4d4f" }} />;
        }
        if (type === "assignment") {
            return <FileTextOutlined style={{ color: "#1890ff" }} />;
        }
        if (type === "survey") {
            return <FormOutlined style={{ color: "#722ed1" }} />;
        }
        return <HistoryOutlined />;
    };

    const getStatusTag = (type, status) => {
        const configs = {
            attendance: {
                present: { color: "success", icon: <CheckOutlined />, text: "Có mặt" },
                late: { color: "warning", icon: <ClockCircleOutlined />, text: "Đi muộn" },
                absent: { color: "error", icon: <CloseOutlined />, text: "Vắng" },
            },
            assignment: {
                submitted: { color: "success", icon: <CheckOutlined />, text: "Đã nộp" },
                pending: { color: "default", icon: <ClockCircleOutlined />, text: "Chưa nộp" },
                late: { color: "warning", icon: <WarningOutlined />, text: "Nộp trễ" },
            },
            survey: {
                completed: { color: "success", icon: <CheckOutlined />, text: "Đã hoàn thành" },
                pending: { color: "default", icon: <ClockCircleOutlined />, text: "Chưa hoàn thành" },
            },
        };
        const config = configs[type]?.[status] || { color: "default", icon: null, text: status };
        return (
            <Tag color={config.color} icon={config.icon}>
                {config.text}
            </Tag>
        );
    };

    const columns = [
        {
            title: "Thời gian",
            dataIndex: "timestamp",
            width: 160,
            sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
        },
        {
            title: "Loại hoạt động",
            dataIndex: "type",
            width: 150,
            render: (type, record) => (
                <Space>
                    {getActivityIcon(type, record.status)}
                    <Text>{record.typeLabel}</Text>
                </Space>
            ),
        },
        {
            title: "Học viên",
            dataIndex: "student",
            width: 200,
            render: (name, record) => {
                const student = STUDENTS.find((s) => s.id === record.studentId);
                return (
                    <Space>
                        <Avatar src={student?.avatar}>{name[0]}</Avatar>
                        <div>
                            <Text strong>{name}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                {student?.department}
                            </Text>
                        </div>
                    </Space>
                );
            },
        },
        {
            title: "Nội dung",
            dataIndex: "title",
            render: (title, record) => (
                <div>
                    <Text>{title || record.session}</Text>
                    {record.score && (
                        <Tag color="blue" style={{ marginLeft: 8 }}>
                            Điểm: {record.score}
                        </Tag>
                    )}
                    {record.rating && (
                        <Tag color="gold" style={{ marginLeft: 8 }}>
                            ⭐ {record.rating}/5
                        </Tag>
                    )}
                </div>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 150,
            align: "center",
            render: (status, record) => getStatusTag(record.type, status),
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
            {/* Class Info */}
            <Col xs={24}>
                <Card>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Title level={4}>{CLASS_INFO.name}</Title>
                            <Space direction="vertical" size="small">
                                <Text>
                                    <UserOutlined /> Giảng viên: {CLASS_INFO.instructor}
                                </Text>
                                <Text>
                                    <CalendarOutlined /> {CLASS_INFO.schedule}
                                </Text>
                                <Text>
                                    <EnvironmentOutlined /> {CLASS_INFO.location}
                                </Text>
                                <Text type="secondary">
                                    Thời gian: {CLASS_INFO.startDate} đến {CLASS_INFO.endDate}
                                </Text>
                            </Space>
                        </Col>
                        <Col xs={24} md={12}>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <div>
                                    <Text strong>Tiến độ lớp học:</Text>
                                    <Progress
                                        percent={Math.round(
                                            (CLASS_INFO.completedSessions / CLASS_INFO.totalSessions) * 100
                                        )}
                                        format={() =>
                                            `${CLASS_INFO.completedSessions}/${CLASS_INFO.totalSessions} buổi`
                                        }
                                    />
                                </div>
                                <div>
                                    <Text strong>Số học viên:</Text> {CLASS_INFO.enrolledStudents} người
                                </div>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            </Col>

            {/* Statistics */}
            <Col xs={24}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={8}>
                        <Card title="📝 Thống kê điểm danh">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic
                                        title="Tỷ lệ có mặt"
                                        value={STATISTICS.attendance.rate}
                                        suffix="%"
                                        valueStyle={{ color: "#52c41a" }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Tổng lượt" value={STATISTICS.attendance.total} />
                                </Col>
                            </Row>
                            <div style={{ marginTop: 16 }}>
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>✅ Có mặt:</Text>
                                        <Text strong>{STATISTICS.attendance.present}</Text>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>⏰ Đi muộn:</Text>
                                        <Text strong>{STATISTICS.attendance.late}</Text>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>❌ Vắng:</Text>
                                        <Text strong>{STATISTICS.attendance.absent}</Text>
                                    </div>
                                </Space>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card title="📄 Thống kê bài tập">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic
                                        title="Điểm trung bình"
                                        value={STATISTICS.assignment.avgScore}
                                        suffix="/100"
                                        valueStyle={{ color: "#1890ff" }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Tổng bài tập" value={STATISTICS.assignment.total} />
                                </Col>
                            </Row>
                            <div style={{ marginTop: 16 }}>
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>✅ Đã nộp:</Text>
                                        <Text strong>{STATISTICS.assignment.submitted}</Text>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>⏳ Chưa nộp:</Text>
                                        <Text strong>{STATISTICS.assignment.pending}</Text>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>⚠️ Nộp trễ:</Text>
                                        <Text strong>{STATISTICS.assignment.late}</Text>
                                    </div>
                                </Space>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card title="📋 Thống kê khảo sát">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic
                                        title="Đánh giá TB"
                                        value={STATISTICS.survey.avgRating}
                                        suffix="/5"
                                        valueStyle={{ color: "#faad14" }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Tổng khảo sát" value={STATISTICS.survey.total} />
                                </Col>
                            </Row>
                            <div style={{ marginTop: 16 }}>
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>✅ Đã hoàn thành:</Text>
                                        <Text strong>{STATISTICS.survey.completed}</Text>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>⏳ Chưa hoàn thành:</Text>
                                        <Text strong>{STATISTICS.survey.pending}</Text>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Text>Tỷ lệ phản hồi:</Text>
                                        <Text strong>
                                            {Math.round((STATISTICS.survey.completed / STATISTICS.survey.total) * 100)}%
                                        </Text>
                                    </div>
                                </Space>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>

            {/* Recent Timeline */}
            <Col xs={24}>
                <Card title="Hoạt động gần đây">
                    <Timeline
                        items={ACTIVITY_LOGS.slice(0, 6).map((log) => {
                            const student = STUDENTS.find((s) => s.id === log.studentId);
                            return {
                                children: (
                                    <div>
                                        <Space>
                                            {getActivityIcon(log.type, log.status)}
                                            <Text strong>{log.student}</Text>
                                            <Text>- {log.typeLabel}</Text>
                                        </Space>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {log.title || log.session}
                                        </Text>
                                        <br />
                                        {getStatusTag(log.type, log.status)}
                                        <Text type="secondary" style={{ fontSize: 11, marginLeft: 8 }}>
                                            {log.timestamp}
                                        </Text>
                                    </div>
                                ),
                                color: log.status === "present" || log.status === "submitted" || log.status === "completed" ? "green" : "gray",
                            };
                        })}
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
                    <Select
                        placeholder="Loại hoạt động"
                        style={{ width: 180 }}
                        value={filterType}
                        onChange={setFilterType}
                        options={[
                            { value: "all", label: "Tất cả hoạt động" },
                            { value: "attendance", label: "📝 Điểm danh" },
                            { value: "assignment", label: "📄 Bài tập" },
                            { value: "survey", label: "📋 Khảo sát" },
                        ]}
                    />
                    <Select
                        placeholder="Học viên"
                        style={{ width: 200 }}
                        value={filterStudent}
                        onChange={setFilterStudent}
                        options={[
                            { value: "all", label: "Tất cả học viên" },
                            ...STUDENTS.map((s) => ({
                                value: s.id.toString(),
                                label: s.name,
                            })),
                        ]}
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
                    <HistoryOutlined style={{ marginRight: 8 }} />
                    Nhật ký hoạt động lớp học
                </Title>
                <Text type="secondary">
                    Theo dõi điểm danh, bài tập và khảo sát của lớp học offline
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
                        key: "logs",
                        label: (
                            <span>
                                <HistoryOutlined /> Nhật ký chi tiết
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
                                <Text type="secondary">Loại hoạt động:</Text>
                                <br />
                                <Space>
                                    {getActivityIcon(selectedActivity.type, selectedActivity.status)}
                                    <Text strong>{selectedActivity.typeLabel}</Text>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary">Thời gian:</Text>
                                <br />
                                <Text strong>{selectedActivity.timestamp}</Text>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ marginBottom: 16 }}>
                            <Col span={24}>
                                <Text type="secondary">Học viên:</Text>
                                <br />
                                {(() => {
                                    const student = STUDENTS.find((s) => s.id === selectedActivity.studentId);
                                    return (
                                        <Space>
                                            <Avatar src={student?.avatar}>{selectedActivity.student[0]}</Avatar>
                                            <div>
                                                <Text strong>{selectedActivity.student}</Text>
                                                <br />
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    {student?.department} - {student?.email}
                                                </Text>
                                            </div>
                                        </Space>
                                    );
                                })()}
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
                            <Text strong>{selectedActivity.title || selectedActivity.session}</Text>
                            {selectedActivity.description && (
                                <>
                                    <br />
                                    <Text type="secondary">{selectedActivity.description}</Text>
                                </>
                            )}
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <Text type="secondary">Trạng thái:</Text>
                            <br />
                            {getStatusTag(selectedActivity.type, selectedActivity.status)}
                        </div>

                        {selectedActivity.type === "attendance" && (
                            <div style={{ marginBottom: 16 }}>
                                <Text type="secondary">Ghi chú:</Text>
                                <br />
                                <Text>{selectedActivity.note}</Text>
                            </div>
                        )}

                        {selectedActivity.type === "assignment" && (
                            <>
                                {selectedActivity.deadline && (
                                    <div style={{ marginBottom: 16 }}>
                                        <Text type="secondary">Hạn nộp:</Text>
                                        <br />
                                        <Text>{selectedActivity.deadline}</Text>
                                    </div>
                                )}
                                {selectedActivity.submittedAt && (
                                    <div style={{ marginBottom: 16 }}>
                                        <Text type="secondary">Thời gian nộp:</Text>
                                        <br />
                                        <Text>{selectedActivity.submittedAt}</Text>
                                    </div>
                                )}
                                {selectedActivity.score && (
                                    <div style={{ marginBottom: 16 }}>
                                        <Text type="secondary">Điểm số:</Text>
                                        <br />
                                        <Tag color="blue" style={{ fontSize: 18 }}>
                                            {selectedActivity.score}/100
                                        </Tag>
                                    </div>
                                )}
                                {selectedActivity.feedback && (
                                    <div
                                        style={{
                                            background: "#e6f7ff",
                                            border: "1px solid #91d5ff",
                                            padding: 12,
                                            borderRadius: 4,
                                        }}
                                    >
                                        <Text strong>💬 Nhận xét của giảng viên:</Text>
                                        <br />
                                        <Text>{selectedActivity.feedback}</Text>
                                    </div>
                                )}
                            </>
                        )}

                        {selectedActivity.type === "survey" && (
                            <>
                                {selectedActivity.completedAt && (
                                    <div style={{ marginBottom: 16 }}>
                                        <Text type="secondary">Thời gian hoàn thành:</Text>
                                        <br />
                                        <Text>{selectedActivity.completedAt}</Text>
                                    </div>
                                )}
                                {selectedActivity.rating && (
                                    <div style={{ marginBottom: 16 }}>
                                        <Text type="secondary">Đánh giá:</Text>
                                        <br />
                                        <Tag color="gold" style={{ fontSize: 18 }}>
                                            ⭐ {selectedActivity.rating}/5
                                        </Tag>
                                    </div>
                                )}
                                {selectedActivity.comment && (
                                    <div
                                        style={{
                                            background: "#fff7e6",
                                            border: "1px solid #ffd591",
                                            padding: 12,
                                            borderRadius: 4,
                                        }}
                                    >
                                        <Text strong>💬 Ý kiến đóng góp:</Text>
                                        <br />
                                        <Text>{selectedActivity.comment}</Text>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default OfflineClassActivityLogPage;
