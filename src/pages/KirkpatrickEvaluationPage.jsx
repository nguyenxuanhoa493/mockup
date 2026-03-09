import React, { useState } from "react";
import {
    Card,
    Typography,
    Table,
    Row,
    Col,
    Statistic,
    Progress,
    Tag,
    Tabs,
    Select,
    Divider,
    Rate,
    Badge,
    Steps,
    Alert,
    Space,
    Button,
    Tooltip,
    List,
    Avatar,
    Modal,
    Form,
    Input,
    DatePicker,
    Radio,
    Slider,
    message,
} from "antd";
import {
    SmileOutlined,
    BookOutlined,
    TeamOutlined,
    TrophyOutlined,
    BarChartOutlined,
    RiseOutlined,
    FallOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    UserOutlined,
    FileTextOutlined,
    EyeOutlined,
    FilterOutlined,
    ExportOutlined,
    PlusOutlined,
    StarOutlined,
    LineChartOutlined,
    SafetyCertificateOutlined,
    BulbOutlined,
    AimOutlined,
    ThunderboltOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// ============ MOCK DATA ============

const COURSES = [
    { value: "all", label: "Tất cả khóa học" },
    { value: "c1", label: "Kỹ năng bán hàng nâng cao" },
    { value: "c2", label: "Đào tạo hội nhập Q1/2026" },
    { value: "c3", label: "Kỹ năng lãnh đạo cấp trung" },
    { value: "c4", label: "An toàn lao động" },
    { value: "c5", label: "Kỹ năng giao tiếp chuyên nghiệp" },
];

const OVERVIEW_STATS = {
    totalEvaluations: 342,
    totalCourses: 12,
    totalEmployees: 256,
    avgLevel1: 4.3,
    avgLevel2: 78.5,
    avgLevel3: 72.1,
    avgLevel4: 68.4,
};

// Level 1: Reaction
const REACTION_DATA = [
    { id: 1, employee: "Nguyễn Văn An", department: "Kinh doanh", course: "Kỹ năng bán hàng nâng cao", date: "2026-01-15", satisfaction: 5, engagement: 4, relevance: 5, support: 4, overall: 4.5, comment: "Khóa học rất hữu ích, giảng viên nhiệt tình" },
    { id: 2, employee: "Trần Thị Bình", department: "Nhân sự", course: "Đào tạo hội nhập Q1/2026", date: "2026-01-20", satisfaction: 4, engagement: 5, relevance: 4, support: 5, overall: 4.5, comment: "Nội dung phù hợp với thực tế công việc" },
    { id: 3, employee: "Lê Hoàng Cường", department: "IT", course: "Kỹ năng lãnh đạo cấp trung", date: "2026-01-22", satisfaction: 3, engagement: 3, relevance: 4, support: 3, overall: 3.3, comment: "Cần thêm ví dụ thực tế" },
    { id: 4, employee: "Phạm Minh Đức", department: "Sản xuất", course: "An toàn lao động", date: "2026-02-01", satisfaction: 5, engagement: 5, relevance: 5, support: 5, overall: 5.0, comment: "Rất thiết thực, áp dụng được ngay" },
    { id: 5, employee: "Hoàng Thị Em", department: "Kinh doanh", course: "Kỹ năng giao tiếp chuyên nghiệp", date: "2026-02-05", satisfaction: 4, engagement: 4, relevance: 3, support: 4, overall: 3.8, comment: "Tốt nhưng hơi dài" },
    { id: 6, employee: "Vũ Quang Phúc", department: "Tài chính", course: "Kỹ năng bán hàng nâng cao", date: "2026-02-08", satisfaction: 4, engagement: 5, relevance: 5, support: 4, overall: 4.5, comment: "Giảng viên truyền đạt dễ hiểu" },
    { id: 7, employee: "Đỗ Thị Giang", department: "Marketing", course: "Kỹ năng lãnh đạo cấp trung", date: "2026-02-10", satisfaction: 5, engagement: 4, relevance: 5, support: 5, overall: 4.8, comment: "Tuyệt vời, nên tổ chức thêm" },
    { id: 8, employee: "Ngô Văn Hải", department: "Sản xuất", course: "An toàn lao động", date: "2026-02-12", satisfaction: 4, engagement: 3, relevance: 5, support: 4, overall: 4.0, comment: "Nội dung cần cập nhật thêm" },
];

// Level 2: Learning
const LEARNING_DATA = [
    { id: 1, employee: "Nguyễn Văn An", department: "Kinh doanh", course: "Kỹ năng bán hàng nâng cao", preTest: 55, postTest: 88, improvement: 33, skillDemo: "Đạt", confidence: 4, commitment: 5, status: "passed" },
    { id: 2, employee: "Trần Thị Bình", department: "Nhân sự", course: "Đào tạo hội nhập Q1/2026", preTest: 40, postTest: 85, improvement: 45, skillDemo: "Đạt", confidence: 5, commitment: 5, status: "passed" },
    { id: 3, employee: "Lê Hoàng Cường", department: "IT", course: "Kỹ năng lãnh đạo cấp trung", preTest: 60, postTest: 72, improvement: 12, skillDemo: "Chưa đạt", confidence: 3, commitment: 3, status: "failed" },
    { id: 4, employee: "Phạm Minh Đức", department: "Sản xuất", course: "An toàn lao động", preTest: 70, postTest: 95, improvement: 25, skillDemo: "Đạt", confidence: 5, commitment: 5, status: "passed" },
    { id: 5, employee: "Hoàng Thị Em", department: "Kinh doanh", course: "Kỹ năng giao tiếp chuyên nghiệp", preTest: 50, postTest: 78, improvement: 28, skillDemo: "Đạt", confidence: 4, commitment: 4, status: "passed" },
    { id: 6, employee: "Vũ Quang Phúc", department: "Tài chính", course: "Kỹ năng bán hàng nâng cao", preTest: 45, postTest: 82, improvement: 37, skillDemo: "Đạt", confidence: 4, commitment: 5, status: "passed" },
    { id: 7, employee: "Đỗ Thị Giang", department: "Marketing", course: "Kỹ năng lãnh đạo cấp trung", preTest: 65, postTest: 90, improvement: 25, skillDemo: "Đạt", confidence: 5, commitment: 5, status: "passed" },
    { id: 8, employee: "Ngô Văn Hải", department: "Sản xuất", course: "An toàn lao động", preTest: 55, postTest: 68, improvement: 13, skillDemo: "Chưa đạt", confidence: 3, commitment: 4, status: "failed" },
];

// Level 3: Behavior
const BEHAVIOR_DATA = [
    { id: 1, employee: "Nguyễn Văn An", department: "Kinh doanh", course: "Kỹ năng bán hàng nâng cao", behaviorBefore: 5.5, behaviorAfter: 8.2, changeRate: 49, managerRating: 4, peerRating: 4, selfRating: 5, appliedSkills: ["Kỹ thuật đặt câu hỏi", "Xử lý từ chối", "Chốt sale"], evaluationDate: "2026-02-20", status: "improved" },
    { id: 2, employee: "Trần Thị Bình", department: "Nhân sự", course: "Đào tạo hội nhập Q1/2026", behaviorBefore: 6.0, behaviorAfter: 8.5, changeRate: 42, managerRating: 5, peerRating: 4, selfRating: 4, appliedSkills: ["Quy trình onboarding", "Đánh giá thử việc"], evaluationDate: "2026-02-22", status: "improved" },
    { id: 3, employee: "Lê Hoàng Cường", department: "IT", course: "Kỹ năng lãnh đạo cấp trung", behaviorBefore: 6.5, behaviorAfter: 6.8, changeRate: 5, managerRating: 3, peerRating: 3, selfRating: 4, appliedSkills: ["Giao việc"], evaluationDate: "2026-02-25", status: "minimal" },
    { id: 4, employee: "Phạm Minh Đức", department: "Sản xuất", course: "An toàn lao động", behaviorBefore: 7.0, behaviorAfter: 9.5, changeRate: 36, managerRating: 5, peerRating: 5, selfRating: 5, appliedSkills: ["Tuân thủ quy trình", "Báo cáo sự cố", "Sử dụng thiết bị bảo hộ"], evaluationDate: "2026-02-28", status: "improved" },
    { id: 5, employee: "Hoàng Thị Em", department: "Kinh doanh", course: "Kỹ năng giao tiếp chuyên nghiệp", behaviorBefore: 5.0, behaviorAfter: 7.5, changeRate: 50, managerRating: 4, peerRating: 4, selfRating: 4, appliedSkills: ["Lắng nghe chủ động", "Trình bày ý tưởng"], evaluationDate: "2026-03-01", status: "improved" },
    { id: 6, employee: "Vũ Quang Phúc", department: "Tài chính", course: "Kỹ năng bán hàng nâng cao", behaviorBefore: 6.0, behaviorAfter: 8.0, changeRate: 33, managerRating: 4, peerRating: 4, selfRating: 5, appliedSkills: ["Kỹ thuật đặt câu hỏi", "Chốt sale"], evaluationDate: "2026-03-03", status: "improved" },
    { id: 7, employee: "Đỗ Thị Giang", department: "Marketing", course: "Kỹ năng lãnh đạo cấp trung", behaviorBefore: 7.0, behaviorAfter: 9.0, changeRate: 29, managerRating: 5, peerRating: 5, selfRating: 5, appliedSkills: ["Ra quyết định", "Giao việc", "Phản hồi"], evaluationDate: "2026-03-05", status: "improved" },
    { id: 8, employee: "Ngô Văn Hải", department: "Sản xuất", course: "An toàn lao động", behaviorBefore: 5.5, behaviorAfter: 5.8, changeRate: 5, managerRating: 3, peerRating: 3, selfRating: 3, appliedSkills: [], evaluationDate: "2026-03-08", status: "minimal" },
];

// Level 4: Results
const RESULTS_DATA = [
    { id: 1, course: "Kỹ năng bán hàng nâng cao", kpi: "Doanh số bán hàng", before: "2.5 tỷ", after: "3.2 tỷ", changePercent: 28, roi: 320, participants: 45, period: "Q1/2026", impact: "high" },
    { id: 2, course: "Đào tạo hội nhập Q1/2026", kpi: "Tỷ lệ nghỉ việc trong thử việc", before: "25%", after: "12%", changePercent: -52, roi: 180, participants: 23, period: "Q1/2026", impact: "high" },
    { id: 3, course: "Kỹ năng lãnh đạo cấp trung", kpi: "Điểm engagement nhân viên", before: "6.5/10", after: "7.8/10", changePercent: 20, roi: 150, participants: 18, period: "Q1/2026", impact: "medium" },
    { id: 4, course: "An toàn lao động", kpi: "Số vụ tai nạn lao động", before: "8 vụ/quý", after: "2 vụ/quý", changePercent: -75, roi: 450, participants: 67, period: "Q1/2026", impact: "high" },
    { id: 5, course: "Kỹ năng giao tiếp chuyên nghiệp", kpi: "Điểm hài lòng khách hàng", before: "7.2/10", after: "8.5/10", changePercent: 18, roi: 210, participants: 34, period: "Q1/2026", impact: "medium" },
];

const COURSE_SUMMARY = [
    { course: "Kỹ năng bán hàng nâng cao", level1: 4.5, level2: 85, level3: 78, level4: 88, overall: "A", status: "excellent" },
    { course: "Đào tạo hội nhập Q1/2026", level1: 4.5, level2: 85, level3: 82, level4: 85, overall: "A", status: "excellent" },
    { course: "Kỹ năng lãnh đạo cấp trung", level1: 4.0, level2: 76, level3: 65, level4: 72, overall: "B", status: "good" },
    { course: "An toàn lao động", level1: 4.5, level2: 82, level3: 85, level4: 92, overall: "A+", status: "excellent" },
    { course: "Kỹ năng giao tiếp chuyên nghiệp", level1: 3.8, level2: 78, level3: 70, level4: 75, overall: "B+", status: "good" },
];

// ============ COMPONENTS ============

function OverviewTab() {
    return (
        <div>
            <Alert
                message="Mô hình Kirkpatrick - Đánh giá hiệu quả đào tạo 4 cấp độ"
                description="Mô hình đánh giá từ Phản hồi (Level 1) → Học tập (Level 2) → Hành vi (Level 3) → Kết quả (Level 4). Bắt đầu lập kế hoạch từ Level 4 (mục tiêu kinh doanh) rồi đánh giá ngược về Level 1."
                type="info"
                showIcon
                icon={<InfoCircleOutlined />}
                style={{ marginBottom: 24 }}
            />

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Tổng lượt đánh giá" value={OVERVIEW_STATS.totalEvaluations} prefix={<FileTextOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Khóa học đã đánh giá" value={OVERVIEW_STATS.totalCourses} prefix={<BookOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Nhân viên tham gia" value={OVERVIEW_STATS.totalEmployees} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic title="Điểm phản hồi TB (L1)" value={OVERVIEW_STATS.avgLevel1} suffix="/ 5" prefix={<SmileOutlined />} valueStyle={{ color: "#52c41a" }} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col xs={24} md={8}>
                    <Card title={<><BookOutlined /> Level 2 - Học tập</>} size="small">
                        <div style={{ textAlign: "center" }}>
                            <Progress type="dashboard" percent={OVERVIEW_STATS.avgLevel2} format={(p) => `${p}%`} strokeColor="#1677ff" />
                            <div style={{ marginTop: 8 }}>
                                <Text type="secondary">Điểm kiểm tra trung bình sau đào tạo</Text>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card title={<><TeamOutlined /> Level 3 - Hành vi</>} size="small">
                        <div style={{ textAlign: "center" }}>
                            <Progress type="dashboard" percent={OVERVIEW_STATS.avgLevel3} format={(p) => `${p}%`} strokeColor="#faad14" />
                            <div style={{ marginTop: 8 }}>
                                <Text type="secondary">Tỷ lệ áp dụng kiến thức vào công việc</Text>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card title={<><TrophyOutlined /> Level 4 - Kết quả</>} size="small">
                        <div style={{ textAlign: "center" }}>
                            <Progress type="dashboard" percent={OVERVIEW_STATS.avgLevel4} format={(p) => `${p}%`} strokeColor="#52c41a" />
                            <div style={{ marginTop: 8 }}>
                                <Text type="secondary">Mức đạt KPI tổ chức</Text>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card title="Tổng hợp đánh giá theo khóa học" style={{ marginTop: 16 }}>
                <Table
                    dataSource={COURSE_SUMMARY}
                    rowKey="course"
                    pagination={false}
                    size="middle"
                    columns={[
                        { title: "Khóa học", dataIndex: "course", key: "course", width: 250 },
                        {
                            title: "L1 - Phản hồi",
                            dataIndex: "level1",
                            key: "level1",
                            align: "center",
                            render: (v) => <Rate disabled value={v} allowHalf style={{ fontSize: 14 }} />,
                        },
                        {
                            title: "L2 - Học tập",
                            dataIndex: "level2",
                            key: "level2",
                            align: "center",
                            render: (v) => <Progress percent={v} size="small" style={{ width: 100 }} />,
                        },
                        {
                            title: "L3 - Hành vi",
                            dataIndex: "level3",
                            key: "level3",
                            align: "center",
                            render: (v) => <Progress percent={v} size="small" strokeColor={v >= 75 ? "#52c41a" : v >= 50 ? "#faad14" : "#ff4d4f"} style={{ width: 100 }} />,
                        },
                        {
                            title: "L4 - Kết quả",
                            dataIndex: "level4",
                            key: "level4",
                            align: "center",
                            render: (v) => <Progress percent={v} size="small" strokeColor={v >= 80 ? "#52c41a" : v >= 60 ? "#faad14" : "#ff4d4f"} style={{ width: 100 }} />,
                        },
                        {
                            title: "Xếp loại",
                            dataIndex: "overall",
                            key: "overall",
                            align: "center",
                            render: (v, r) => (
                                <Tag color={r.status === "excellent" ? "green" : r.status === "good" ? "blue" : "orange"} style={{ fontWeight: "bold", fontSize: 14 }}>
                                    {v}
                                </Tag>
                            ),
                        },
                    ]}
                />
            </Card>

            <Card title="Quy trình đánh giá Kirkpatrick" style={{ marginTop: 16 }}>
                <Steps
                    current={-1}
                    items={[
                        {
                            title: "Level 4: Kết quả",
                            description: "Xác định mục tiêu KPI tổ chức cần đạt",
                            icon: <TrophyOutlined style={{ color: "#52c41a" }} />,
                        },
                        {
                            title: "Level 3: Hành vi",
                            description: "Xác định hành vi cần thay đổi trên công việc",
                            icon: <TeamOutlined style={{ color: "#faad14" }} />,
                        },
                        {
                            title: "Level 2: Học tập",
                            description: "Đánh giá kiến thức, kỹ năng sau đào tạo",
                            icon: <BookOutlined style={{ color: "#1677ff" }} />,
                        },
                        {
                            title: "Level 1: Phản hồi",
                            description: "Thu thập phản hồi về trải nghiệm đào tạo",
                            icon: <SmileOutlined style={{ color: "#eb2f96" }} />,
                        },
                    ]}
                />
                <div style={{ marginTop: 12, textAlign: "center" }}>
                    <Text type="secondary" italic>
                        Lưu ý: Lập kế hoạch từ Level 4 → Level 1, nhưng đánh giá từ Level 1 → Level 4
                    </Text>
                </div>
            </Card>
        </div>
    );
}

function ReactionTab() {
    const columns = [
        { title: "Nhân viên", dataIndex: "employee", key: "employee", render: (t) => <Space><Avatar size="small" icon={<UserOutlined />} /><Text strong>{t}</Text></Space> },
        { title: "Phòng ban", dataIndex: "department", key: "department", render: (t) => <Tag>{t}</Tag> },
        { title: "Khóa học", dataIndex: "course", key: "course", ellipsis: true },
        { title: "Hài lòng", dataIndex: "satisfaction", key: "satisfaction", align: "center", render: (v) => <Rate disabled value={v} style={{ fontSize: 12 }} /> },
        { title: "Hấp dẫn", dataIndex: "engagement", key: "engagement", align: "center", render: (v) => <Rate disabled value={v} style={{ fontSize: 12 }} /> },
        { title: "Phù hợp", dataIndex: "relevance", key: "relevance", align: "center", render: (v) => <Rate disabled value={v} style={{ fontSize: 12 }} /> },
        { title: "Hỗ trợ", dataIndex: "support", key: "support", align: "center", render: (v) => <Rate disabled value={v} style={{ fontSize: 12 }} /> },
        {
            title: "Tổng",
            dataIndex: "overall",
            key: "overall",
            align: "center",
            sorter: (a, b) => a.overall - b.overall,
            render: (v) => (
                <Tag color={v >= 4.5 ? "green" : v >= 3.5 ? "blue" : "orange"} style={{ fontWeight: "bold" }}>
                    {v.toFixed(1)}
                </Tag>
            ),
        },
        {
            title: "Nhận xét",
            dataIndex: "comment",
            key: "comment",
            ellipsis: true,
            width: 200,
            render: (t) => <Tooltip title={t}><Text type="secondary">{t}</Text></Tooltip>,
        },
    ];

    const avgSatisfaction = (REACTION_DATA.reduce((s, r) => s + r.satisfaction, 0) / REACTION_DATA.length).toFixed(1);
    const avgEngagement = (REACTION_DATA.reduce((s, r) => s + r.engagement, 0) / REACTION_DATA.length).toFixed(1);
    const avgRelevance = (REACTION_DATA.reduce((s, r) => s + r.relevance, 0) / REACTION_DATA.length).toFixed(1);

    return (
        <div>
            <Alert
                message="Level 1: Phản hồi (Reaction)"
                description="Đo lường mức độ hài lòng, hấp dẫn, phù hợp và hỗ trợ mà học viên cảm nhận từ khóa đào tạo. Chỉ số 'Phù hợp' (Relevance) là quan trọng nhất vì phản ánh khả năng áp dụng kiến thức."
                type="warning"
                showIcon
                icon={<SmileOutlined />}
                style={{ marginBottom: 16 }}
            />

            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="Hài lòng TB" value={avgSatisfaction} suffix="/ 5" prefix={<SmileOutlined />} valueStyle={{ color: "#52c41a" }} />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="Hấp dẫn TB" value={avgEngagement} suffix="/ 5" prefix={<BulbOutlined />} valueStyle={{ color: "#1677ff" }} />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="Phù hợp TB" value={avgRelevance} suffix="/ 5" prefix={<AimOutlined />} valueStyle={{ color: "#faad14" }} />
                    </Card>
                </Col>
            </Row>

            <Card title="Chi tiết phản hồi học viên">
                <Table
                    dataSource={REACTION_DATA}
                    columns={columns}
                    rowKey="id"
                    size="small"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 1100 }}
                />
            </Card>
        </div>
    );
}

function LearningTab() {
    const columns = [
        { title: "Nhân viên", dataIndex: "employee", key: "employee", render: (t) => <Space><Avatar size="small" icon={<UserOutlined />} /><Text strong>{t}</Text></Space> },
        { title: "Phòng ban", dataIndex: "department", key: "department", render: (t) => <Tag>{t}</Tag> },
        { title: "Khóa học", dataIndex: "course", key: "course", ellipsis: true },
        {
            title: "Pre-test",
            dataIndex: "preTest",
            key: "preTest",
            align: "center",
            render: (v) => <Text>{v}%</Text>,
        },
        {
            title: "Post-test",
            dataIndex: "postTest",
            key: "postTest",
            align: "center",
            render: (v) => <Text strong style={{ color: v >= 80 ? "#52c41a" : v >= 60 ? "#faad14" : "#ff4d4f" }}>{v}%</Text>,
        },
        {
            title: "Tiến bộ",
            dataIndex: "improvement",
            key: "improvement",
            align: "center",
            sorter: (a, b) => a.improvement - b.improvement,
            render: (v) => (
                <Space>
                    {v > 20 ? <RiseOutlined style={{ color: "#52c41a" }} /> : <RiseOutlined style={{ color: "#faad14" }} />}
                    <Text style={{ color: v > 20 ? "#52c41a" : "#faad14", fontWeight: "bold" }}>+{v}%</Text>
                </Space>
            ),
        },
        {
            title: "Thực hành",
            dataIndex: "skillDemo",
            key: "skillDemo",
            align: "center",
            render: (v) =>
                v === "Đạt" ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">Đạt</Tag>
                ) : (
                    <Tag icon={<CloseCircleOutlined />} color="error">Chưa đạt</Tag>
                ),
        },
        {
            title: "Tự tin",
            dataIndex: "confidence",
            key: "confidence",
            align: "center",
            render: (v) => <Rate disabled value={v} style={{ fontSize: 12 }} />,
        },
        {
            title: "Cam kết",
            dataIndex: "commitment",
            key: "commitment",
            align: "center",
            render: (v) => <Rate disabled value={v} style={{ fontSize: 12 }} />,
        },
        {
            title: "Kết quả",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (v) =>
                v === "passed" ? (
                    <Badge status="success" text={<Text style={{ color: "#52c41a" }}>Đạt</Text>} />
                ) : (
                    <Badge status="error" text={<Text style={{ color: "#ff4d4f" }}>Không đạt</Text>} />
                ),
        },
    ];

    const passedCount = LEARNING_DATA.filter((d) => d.status === "passed").length;
    const avgImprovement = (LEARNING_DATA.reduce((s, d) => s + d.improvement, 0) / LEARNING_DATA.length).toFixed(0);

    return (
        <div>
            <Alert
                message="Level 2: Học tập (Learning)"
                description="Đo lường mức độ tiếp thu kiến thức, kỹ năng, thái độ, sự tự tin và cam kết của học viên. Sử dụng Pre-test & Post-test, thực hành (role play, teach-back) để đánh giá."
                type="info"
                showIcon
                icon={<BookOutlined />}
                style={{ marginBottom: 16 }}
            />

            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="Tỷ lệ đạt" value={passedCount} suffix={`/ ${LEARNING_DATA.length}`} prefix={<CheckCircleOutlined />} valueStyle={{ color: "#52c41a" }} />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="Tiến bộ TB" value={avgImprovement} suffix="%" prefix={<RiseOutlined />} valueStyle={{ color: "#1677ff" }} />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="Điểm post-test TB" value={(LEARNING_DATA.reduce((s, d) => s + d.postTest, 0) / LEARNING_DATA.length).toFixed(1)} suffix="%" prefix={<BarChartOutlined />} valueStyle={{ color: "#faad14" }} />
                    </Card>
                </Col>
            </Row>

            <Card title="Chi tiết kết quả học tập">
                <Table
                    dataSource={LEARNING_DATA}
                    columns={columns}
                    rowKey="id"
                    size="small"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 1200 }}
                />
            </Card>
        </div>
    );
}

function BehaviorTab() {
    const columns = [
        { title: "Nhân viên", dataIndex: "employee", key: "employee", render: (t) => <Space><Avatar size="small" icon={<UserOutlined />} /><Text strong>{t}</Text></Space> },
        { title: "Phòng ban", dataIndex: "department", key: "department", render: (t) => <Tag>{t}</Tag> },
        { title: "Khóa học", dataIndex: "course", key: "course", ellipsis: true },
        {
            title: "Trước ĐT",
            dataIndex: "behaviorBefore",
            key: "behaviorBefore",
            align: "center",
            render: (v) => <Text>{v}/10</Text>,
        },
        {
            title: "Sau ĐT",
            dataIndex: "behaviorAfter",
            key: "behaviorAfter",
            align: "center",
            render: (v) => <Text strong style={{ color: v >= 8 ? "#52c41a" : v >= 6 ? "#faad14" : "#ff4d4f" }}>{v}/10</Text>,
        },
        {
            title: "% Thay đổi",
            dataIndex: "changeRate",
            key: "changeRate",
            align: "center",
            sorter: (a, b) => a.changeRate - b.changeRate,
            render: (v) => (
                <Tag color={v >= 30 ? "green" : v >= 15 ? "blue" : "red"} style={{ fontWeight: "bold" }}>
                    {v > 0 ? "+" : ""}{v}%
                </Tag>
            ),
        },
        {
            title: "QL đánh giá",
            dataIndex: "managerRating",
            key: "managerRating",
            align: "center",
            render: (v) => <Rate disabled value={v} style={{ fontSize: 12 }} />,
        },
        {
            title: "Đồng nghiệp",
            dataIndex: "peerRating",
            key: "peerRating",
            align: "center",
            render: (v) => <Rate disabled value={v} style={{ fontSize: 12 }} />,
        },
        {
            title: "Kỹ năng áp dụng",
            dataIndex: "appliedSkills",
            key: "appliedSkills",
            width: 250,
            render: (skills) =>
                skills.length > 0 ? (
                    <Space wrap size={[4, 4]}>
                        {skills.map((s) => (
                            <Tag key={s} color="blue" style={{ fontSize: 11 }}>{s}</Tag>
                        ))}
                    </Space>
                ) : (
                    <Text type="secondary" italic>Chưa ghi nhận</Text>
                ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (v) =>
                v === "improved" ? (
                    <Tag icon={<RiseOutlined />} color="success">Cải thiện</Tag>
                ) : (
                    <Tag icon={<FallOutlined />} color="warning">Ít thay đổi</Tag>
                ),
        },
    ];

    const improvedCount = BEHAVIOR_DATA.filter((d) => d.status === "improved").length;
    const avgChange = (BEHAVIOR_DATA.reduce((s, d) => s + d.changeRate, 0) / BEHAVIOR_DATA.length).toFixed(0);

    return (
        <div>
            <Alert
                message="Level 3: Hành vi (Behavior)"
                description="Đo lường mức độ nhân viên áp dụng kiến thức/kỹ năng đã học vào công việc thực tế. Đánh giá qua quan sát, phỏng vấn quản lý, đồng nghiệp và tự đánh giá (360°). Nên đánh giá sau 30-90 ngày."
                type="success"
                showIcon
                icon={<TeamOutlined />}
                style={{ marginBottom: 16 }}
            />

            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="Cải thiện hành vi" value={improvedCount} suffix={`/ ${BEHAVIOR_DATA.length}`} prefix={<RiseOutlined />} valueStyle={{ color: "#52c41a" }} />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="% Thay đổi TB" value={avgChange} suffix="%" prefix={<ThunderboltOutlined />} valueStyle={{ color: "#1677ff" }} />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="Tỷ lệ áp dụng" value={((improvedCount / BEHAVIOR_DATA.length) * 100).toFixed(0)} suffix="%" prefix={<CheckCircleOutlined />} valueStyle={{ color: "#faad14" }} />
                    </Card>
                </Col>
            </Row>

            <Card title="Chi tiết đánh giá hành vi trên công việc">
                <Table
                    dataSource={BEHAVIOR_DATA}
                    columns={columns}
                    rowKey="id"
                    size="small"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 1400 }}
                />
            </Card>
        </div>
    );
}

function ResultsTab() {
    const columns = [
        { title: "Khóa học", dataIndex: "course", key: "course", width: 220 },
        { title: "KPI đo lường", dataIndex: "kpi", key: "kpi", width: 200 },
        { title: "Trước ĐT", dataIndex: "before", key: "before", align: "center" },
        { title: "Sau ĐT", dataIndex: "after", key: "after", align: "center", render: (v) => <Text strong>{v}</Text> },
        {
            title: "% Thay đổi",
            dataIndex: "changePercent",
            key: "changePercent",
            align: "center",
            sorter: (a, b) => Math.abs(a.changePercent) - Math.abs(b.changePercent),
            render: (v) => {
                const isPositiveChange = v > 0;
                const label = v > 0 ? `+${v}%` : `${v}%`;
                return (
                    <Tag color="green" style={{ fontWeight: "bold" }}>
                        {label} {isPositiveChange ? <RiseOutlined /> : <FallOutlined />}
                    </Tag>
                );
            },
        },
        {
            title: "ROI (%)",
            dataIndex: "roi",
            key: "roi",
            align: "center",
            sorter: (a, b) => a.roi - b.roi,
            render: (v) => (
                <Text strong style={{ color: v >= 200 ? "#52c41a" : v >= 100 ? "#1677ff" : "#faad14", fontSize: 16 }}>
                    {v}%
                </Text>
            ),
        },
        { title: "Số HV", dataIndex: "participants", key: "participants", align: "center" },
        { title: "Kỳ", dataIndex: "period", key: "period", align: "center" },
        {
            title: "Mức tác động",
            dataIndex: "impact",
            key: "impact",
            align: "center",
            render: (v) => (
                <Tag color={v === "high" ? "green" : v === "medium" ? "blue" : "orange"} style={{ fontWeight: "bold" }}>
                    {v === "high" ? "Cao" : v === "medium" ? "Trung bình" : "Thấp"}
                </Tag>
            ),
        },
    ];

    const avgROI = (RESULTS_DATA.reduce((s, d) => s + d.roi, 0) / RESULTS_DATA.length).toFixed(0);
    const highImpactCount = RESULTS_DATA.filter((d) => d.impact === "high").length;

    return (
        <div>
            <Alert
                message="Level 4: Kết quả (Results)"
                description="Đo lường tác động của đào tạo lên mục tiêu kinh doanh: doanh thu, chi phí, chất lượng, an toàn, năng suất. Sử dụng ROI, ROE (Return on Expectations), ROP (Return on Performance) để đánh giá."
                type="error"
                showIcon
                icon={<TrophyOutlined />}
                style={{ marginBottom: 16 }}
            />

            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="ROI trung bình" value={avgROI} suffix="%" prefix={<BarChartOutlined />} valueStyle={{ color: "#52c41a" }} />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="Khóa học tác động cao" value={highImpactCount} suffix={`/ ${RESULTS_DATA.length}`} prefix={<TrophyOutlined />} valueStyle={{ color: "#1677ff" }} />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card size="small">
                        <Statistic title="Tổng học viên" value={RESULTS_DATA.reduce((s, d) => s + d.participants, 0)} prefix={<TeamOutlined />} valueStyle={{ color: "#faad14" }} />
                    </Card>
                </Col>
            </Row>

            <Card title="Kết quả tác động lên tổ chức">
                <Table
                    dataSource={RESULTS_DATA}
                    columns={columns}
                    rowKey="id"
                    size="small"
                    pagination={false}
                    scroll={{ x: 1200 }}
                />
            </Card>
        </div>
    );
}

// ============ MAIN PAGE ============

export default function KirkpatrickEvaluationPage() {
    const [selectedCourse, setSelectedCourse] = useState("all");

    const tabItems = [
        {
            key: "overview",
            label: (
                <span>
                    <BarChartOutlined /> Tổng quan
                </span>
            ),
            children: <OverviewTab />,
        },
        {
            key: "level1",
            label: (
                <span>
                    <Badge count="L1" size="small" style={{ backgroundColor: "#eb2f96", marginRight: 6 }} />
                    Phản hồi
                </span>
            ),
            children: <ReactionTab />,
        },
        {
            key: "level2",
            label: (
                <span>
                    <Badge count="L2" size="small" style={{ backgroundColor: "#1677ff", marginRight: 6 }} />
                    Học tập
                </span>
            ),
            children: <LearningTab />,
        },
        {
            key: "level3",
            label: (
                <span>
                    <Badge count="L3" size="small" style={{ backgroundColor: "#faad14", marginRight: 6 }} />
                    Hành vi
                </span>
            ),
            children: <BehaviorTab />,
        },
        {
            key: "level4",
            label: (
                <span>
                    <Badge count="L4" size="small" style={{ backgroundColor: "#52c41a", marginRight: 6 }} />
                    Kết quả
                </span>
            ),
            children: <ResultsTab />,
        },
    ];

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <div>
                    <Title level={3} style={{ margin: 0 }}>
                        <SafetyCertificateOutlined /> Đánh giá nhân viên - Mô hình Kirkpatrick
                    </Title>
                    <Text type="secondary">Đánh giá hiệu quả đào tạo theo 4 cấp độ: Phản hồi → Học tập → Hành vi → Kết quả</Text>
                </div>
                <Space>
                    <Select
                        value={selectedCourse}
                        onChange={setSelectedCourse}
                        options={COURSES}
                        style={{ width: 250 }}
                        placeholder="Lọc theo khóa học"
                    />
                    <Button icon={<ExportOutlined />}>Xuất báo cáo</Button>
                    <Button type="primary" icon={<PlusOutlined />}>Tạo đánh giá</Button>
                </Space>
            </div>

            <Tabs defaultActiveKey="overview" items={tabItems} type="card" />
        </div>
    );
}
