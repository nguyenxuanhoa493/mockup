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
    Badge,
    Space,
    Button,
    Tooltip,
    Modal,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Tree,
    Alert,
    message,
    Upload,
    Timeline,
    Descriptions,
    List,
    Steps,
} from "antd";
import {
    DollarOutlined,
    BankOutlined,
    TeamOutlined,
    UserOutlined,
    BarChartOutlined,
    RiseOutlined,
    FallOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    WarningOutlined,
    PlusOutlined,
    EditOutlined,
    EyeOutlined,
    FilterOutlined,
    ExportOutlined,
    FileTextOutlined,
    SendOutlined,
    UploadOutlined,
    BellOutlined,
    ApartmentOutlined,
    CalculatorOutlined,
    FundOutlined,
    SafetyCertificateOutlined,
    ClockCircleOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// ============ MOCK DATA ============

const YEARS = [
    { value: "2026", label: "Năm 2026" },
    { value: "2025", label: "Năm 2025" },
    { value: "2024", label: "Năm 2024" },
];

const OVERVIEW_STATS = {
    totalBudget: 5000000000,
    allocated: 4200000000,
    spent: 2850000000,
    remaining: 2150000000,
    budgetUtilization: 57,
    departments: 8,
    employees: 456,
    coursesWithCost: 34,
};

// Cấu trúc cây bộ phận + ngân sách
const DEPARTMENT_TREE_DATA = [
    {
        title: "Công ty ABC - Ngân sách 2026",
        key: "company",
        budget: 5000000000,
        allocated: 4200000000,
        spent: 2850000000,
        children: [
            {
                title: "Khối Kinh doanh",
                key: "sales",
                budget: 1500000000,
                allocated: 1400000000,
                spent: 980000000,
                children: [
                    { title: "Phòng Kinh doanh 1", key: "sales-1", budget: 500000000, allocated: 480000000, spent: 350000000 },
                    { title: "Phòng Kinh doanh 2", key: "sales-2", budget: 500000000, allocated: 470000000, spent: 320000000 },
                    { title: "Phòng Kinh doanh 3", key: "sales-3", budget: 500000000, allocated: 450000000, spent: 310000000 },
                ],
            },
            {
                title: "Khối Sản xuất",
                key: "production",
                budget: 1200000000,
                allocated: 1100000000,
                spent: 780000000,
                children: [
                    { title: "Phân xưởng A", key: "prod-a", budget: 400000000, allocated: 380000000, spent: 280000000 },
                    { title: "Phân xưởng B", key: "prod-b", budget: 400000000, allocated: 370000000, spent: 260000000 },
                    { title: "Phân xưởng C", key: "prod-c", budget: 400000000, allocated: 350000000, spent: 240000000 },
                ],
            },
            {
                title: "Khối Công nghệ",
                key: "tech",
                budget: 800000000,
                allocated: 750000000,
                spent: 520000000,
            },
            {
                title: "Khối Nhân sự",
                key: "hr",
                budget: 600000000,
                allocated: 550000000,
                spent: 320000000,
            },
            {
                title: "Khối Tài chính",
                key: "finance",
                budget: 400000000,
                allocated: 200000000,
                spent: 130000000,
            },
            {
                title: "Khối Marketing",
                key: "marketing",
                budget: 500000000,
                allocated: 200000000,
                spent: 120000000,
            },
        ],
    },
];

// Ngân sách trần theo cá nhân
const PER_LEARNER_BUDGET = [
    { id: 1, name: "Nguyễn Văn An", department: "Phòng Kinh doanh 1", position: "Nhân viên", budgetCap: 15000000, used: 12500000, remaining: 2500000, coursesEnrolled: 3, status: "warning" },
    { id: 2, name: "Trần Thị Bình", department: "Phòng Nhân sự", position: "Chuyên viên", budgetCap: 15000000, used: 8000000, remaining: 7000000, coursesEnrolled: 2, status: "normal" },
    { id: 3, name: "Lê Hoàng Cường", department: "Phòng Công nghệ", position: "Kỹ sư", budgetCap: 20000000, used: 20000000, remaining: 0, coursesEnrolled: 4, status: "exceeded" },
    { id: 4, name: "Phạm Minh Đức", department: "Phân xưởng A", position: "Tổ trưởng", budgetCap: 12000000, used: 5000000, remaining: 7000000, coursesEnrolled: 1, status: "normal" },
    { id: 5, name: "Hoàng Thị Em", department: "Phòng Kinh doanh 2", position: "Trưởng nhóm", budgetCap: 18000000, used: 16200000, remaining: 1800000, coursesEnrolled: 3, status: "warning" },
    { id: 6, name: "Vũ Quang Phúc", department: "Phòng Tài chính", position: "Kế toán trưởng", budgetCap: 15000000, used: 3000000, remaining: 12000000, coursesEnrolled: 1, status: "normal" },
    { id: 7, name: "Đỗ Thị Giang", department: "Phòng Marketing", position: "Chuyên viên", budgetCap: 15000000, used: 14800000, remaining: 200000, coursesEnrolled: 3, status: "exceeded" },
    { id: 8, name: "Ngô Văn Hải", department: "Phân xưởng B", position: "Công nhân", budgetCap: 10000000, used: 0, remaining: 10000000, coursesEnrolled: 0, status: "normal" },
];

// Chi phí khóa học nội bộ
const INTERNAL_COURSE_COSTS = [
    {
        id: 1,
        courseName: "Kỹ năng bán hàng nâng cao",
        type: "internal",
        startDate: "2026-01-15",
        endDate: "2026-01-20",
        participants: 30,
        status: "completed",
        costs: [
            { category: "Chi phí giáo viên", planned: 25000000, actual: 25000000 },
            { category: "Chi phí văn phòng phẩm", planned: 3000000, actual: 2800000 },
            { category: "Chi phí hậu cần", planned: 5000000, actual: 4500000 },
            { category: "Chi phí cấp chứng chỉ", planned: 1500000, actual: 1500000 },
            { category: "Chi phí thuê địa điểm", planned: 10000000, actual: 10000000 },
            { category: "Chi phí công tác phí", planned: 8000000, actual: 7200000 },
        ],
        totalPlanned: 52500000,
        totalActual: 51000000,
    },
    {
        id: 2,
        courseName: "An toàn lao động 2026",
        type: "internal",
        startDate: "2026-02-01",
        endDate: "2026-02-03",
        participants: 50,
        status: "completed",
        costs: [
            { category: "Chi phí giáo viên", planned: 15000000, actual: 15000000 },
            { category: "Chi phí văn phòng phẩm", planned: 5000000, actual: 5200000 },
            { category: "Chi phí hậu cần", planned: 8000000, actual: 9000000 },
            { category: "Chi phí cấp chứng chỉ", planned: 2500000, actual: 2500000 },
            { category: "Chi phí thuê địa điểm", planned: 0, actual: 0 },
            { category: "Chi phí công tác phí", planned: 12000000, actual: 13500000 },
        ],
        totalPlanned: 42500000,
        totalActual: 45200000,
    },
    {
        id: 3,
        courseName: "Kỹ năng lãnh đạo cấp trung",
        type: "internal",
        startDate: "2026-03-10",
        endDate: "2026-03-15",
        participants: 20,
        status: "in_progress",
        costs: [
            { category: "Chi phí giáo viên", planned: 30000000, actual: 0 },
            { category: "Chi phí văn phòng phẩm", planned: 2000000, actual: 0 },
            { category: "Chi phí hậu cần", planned: 3000000, actual: 0 },
            { category: "Chi phí cấp chứng chỉ", planned: 1000000, actual: 0 },
            { category: "Chi phí thuê địa điểm", planned: 15000000, actual: 15000000 },
            { category: "Chi phí công tác phí", planned: 6000000, actual: 0 },
        ],
        totalPlanned: 57000000,
        totalActual: 15000000,
    },
    {
        id: 4,
        courseName: "Đào tạo hội nhập Q1/2026",
        type: "internal",
        startDate: "2026-01-05",
        endDate: "2026-01-06",
        participants: 25,
        status: "completed",
        costs: [
            { category: "Chi phí giáo viên", planned: 10000000, actual: 10000000 },
            { category: "Chi phí văn phòng phẩm", planned: 2500000, actual: 2200000 },
            { category: "Chi phí hậu cần", planned: 3000000, actual: 3000000 },
            { category: "Chi phí cấp chứng chỉ", planned: 0, actual: 0 },
            { category: "Chi phí thuê địa điểm", planned: 0, actual: 0 },
            { category: "Chi phí công tác phí", planned: 0, actual: 0 },
        ],
        totalPlanned: 15500000,
        totalActual: 15200000,
    },
];

// Đề xuất đào tạo bên ngoài
const EXTERNAL_TRAINING_REQUESTS = [
    {
        id: 1,
        employee: "Lê Hoàng Cường",
        department: "Phòng Công nghệ",
        courseName: "AWS Solutions Architect Professional",
        provider: "Amazon Web Services",
        startDate: "2026-04-10",
        endDate: "2026-04-12",
        estimatedCost: 15000000,
        supportRequest: 15000000,
        status: "approved",
        approvedBy: "Nguyễn Văn Minh",
        approvedDate: "2026-03-15",
        certificate: null,
        completionProof: null,
    },
    {
        id: 2,
        employee: "Đỗ Thị Giang",
        department: "Phòng Marketing",
        courseName: "Google Analytics Professional Certificate",
        provider: "Google / Coursera",
        startDate: "2026-03-01",
        endDate: "2026-05-01",
        estimatedCost: 8000000,
        supportRequest: 6000000,
        status: "completed",
        approvedBy: "Trần Văn Nam",
        approvedDate: "2026-02-20",
        certificate: "GA_Certificate_DoThiGiang.pdf",
        completionProof: "completion_proof.pdf",
    },
    {
        id: 3,
        employee: "Nguyễn Văn An",
        department: "Phòng Kinh doanh 1",
        courseName: "Chương trình MBA Mini - Quản trị Kinh doanh",
        provider: "Đại học Kinh tế TP.HCM",
        startDate: "2026-05-01",
        endDate: "2026-08-30",
        estimatedCost: 35000000,
        supportRequest: 25000000,
        status: "pending",
        approvedBy: null,
        approvedDate: null,
        certificate: null,
        completionProof: null,
    },
    {
        id: 4,
        employee: "Vũ Quang Phúc",
        department: "Phòng Tài chính",
        courseName: "CPA - Chứng chỉ Kế toán Công chứng",
        provider: "VACPA",
        startDate: "2026-06-01",
        endDate: "2026-12-30",
        estimatedCost: 45000000,
        supportRequest: 30000000,
        status: "pending",
        approvedBy: null,
        approvedDate: null,
        certificate: null,
        completionProof: null,
    },
    {
        id: 5,
        employee: "Trần Thị Bình",
        department: "Phòng Nhân sự",
        courseName: "SHRM-CP Certification",
        provider: "SHRM Vietnam",
        startDate: "2026-04-15",
        endDate: "2026-06-15",
        estimatedCost: 20000000,
        supportRequest: 20000000,
        status: "rejected",
        approvedBy: "Nguyễn Văn Minh",
        approvedDate: "2026-03-10",
        rejectReason: "Vượt quá ngân sách trần cá nhân. Cần phê duyệt bổ sung từ Ban Giám đốc.",
        certificate: null,
        completionProof: null,
    },
];

// Lịch sử cảnh báo ngân sách
const BUDGET_ALERTS = [
    { id: 1, date: "2026-03-20", type: "warning", department: "Phòng Kinh doanh 1", message: "Ngân sách đã sử dụng 80% (350tr/500tr)", recipients: "Trưởng phòng KD1, QL Đào tạo" },
    { id: 2, date: "2026-03-18", type: "danger", department: "Phòng Công nghệ", message: "Nhân viên Lê Hoàng Cường đã sử dụng hết ngân sách trần cá nhân (20tr/20tr)", recipients: "Trưởng phòng CNTT, QL Đào tạo" },
    { id: 3, date: "2026-03-15", type: "warning", department: "Phòng Marketing", message: "Nhân viên Đỗ Thị Giang đã sử dụng 98.7% ngân sách trần (14.8tr/15tr)", recipients: "Trưởng phòng MKT" },
    { id: 4, date: "2026-03-10", type: "info", department: "Khối Kinh doanh", message: "Ngân sách Khối Kinh doanh đã sử dụng 65% (980tr/1.5tỷ)", recipients: "Giám đốc Khối KD" },
    { id: 5, date: "2026-02-28", type: "warning", department: "Phòng Kinh doanh 2", message: "Nhân viên Hoàng Thị Em đã sử dụng 90% ngân sách trần (16.2tr/18tr)", recipients: "Trưởng phòng KD2" },
];

// Phê duyệt bổ sung
const APPROVAL_WORKFLOW = [
    { id: 1, employee: "Lê Hoàng Cường", department: "Phòng Công nghệ", courseName: "Kubernetes Advanced", courseCost: 12000000, currentBudget: 0, requestDate: "2026-03-22", status: "pending_manager", reason: "Ngân sách trần cá nhân đã hết" },
    { id: 2, employee: "Hoàng Thị Em", department: "Phòng Kinh doanh 2", courseName: "Kỹ năng đàm phán nâng cao", courseCost: 5000000, currentBudget: 1800000, requestDate: "2026-03-20", status: "pending_director", reason: "Chi phí vượt ngân sách trần còn lại 3.2tr" },
    { id: 3, employee: "Đỗ Thị Giang", department: "Phòng Marketing", courseName: "Digital Marketing Masterclass", courseCost: 8000000, currentBudget: 200000, requestDate: "2026-03-19", status: "approved", reason: "Ngân sách trần còn 200k, cần bổ sung 7.8tr", approvedBy: "Giám đốc Marketing" },
];

const formatCurrency = (value) => {
    if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} tỷ`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)} tr`;
    return `${value.toLocaleString("vi-VN")} đ`;
};

const formatFullCurrency = (value) => {
    return `${value.toLocaleString("vi-VN")} đ`;
};

// ============ TAB 1: TỔNG QUAN NGÂN SÁCH ============
const BudgetOverviewTab = () => {
    const [selectedYear, setSelectedYear] = useState("2026");
    const [topUpModalVisible, setTopUpModalVisible] = useState(false);
    const [selectedDept, setSelectedDept] = useState(null);

    const renderTreeTitle = (node) => {
        const usagePercent = node.budget > 0 ? Math.round((node.spent / node.budget) * 100) : 0;
        let color = "#52c41a";
        if (usagePercent >= 90) color = "#ff4d4f";
        else if (usagePercent >= 70) color = "#faad14";

        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "4px 0" }}>
                <Text strong={!!node.children}>{node.title}</Text>
                <Space size="large">
                    <Tooltip title="Ngân sách">
                        <Text type="secondary" style={{ minWidth: 100, textAlign: "right" }}>{formatCurrency(node.budget)}</Text>
                    </Tooltip>
                    <Tooltip title="Đã chi">
                        <Text style={{ color, minWidth: 100, textAlign: "right" }}>{formatCurrency(node.spent)}</Text>
                    </Tooltip>
                    <Progress percent={usagePercent} size="small" style={{ width: 120 }} strokeColor={color} />
                    <Button size="small" icon={<PlusOutlined />} onClick={(e) => { e.stopPropagation(); setSelectedDept(node); setTopUpModalVisible(true); }}>
                        Bổ sung
                    </Button>
                </Space>
            </div>
        );
    };

    // Flatten tree to lookup node data by key
    const nodeMap = {};
    const buildNodeMap = (nodes) => {
        nodes.forEach((n) => {
            nodeMap[n.key] = n;
            if (n.children) buildNodeMap(n.children);
        });
    };
    buildNodeMap(DEPARTMENT_TREE_DATA);

    // Dữ liệu so sánh ngân sách theo bộ phận
    const deptBudgetColumns = [
        { title: "Bộ phận", dataIndex: "department", key: "department", width: 200 },
        {
            title: "Ngân sách", dataIndex: "budget", key: "budget",
            render: (v) => <Text strong>{formatCurrency(v)}</Text>,
            sorter: (a, b) => a.budget - b.budget,
        },
        {
            title: "Đã phân bổ", dataIndex: "allocated", key: "allocated",
            render: (v) => formatCurrency(v),
        },
        {
            title: "Đã chi", dataIndex: "spent", key: "spent",
            render: (v) => <Text style={{ color: "#1677ff" }}>{formatCurrency(v)}</Text>,
        },
        {
            title: "Còn lại", dataIndex: "remaining", key: "remaining",
            render: (_, r) => {
                const rem = r.budget - r.spent;
                return <Text style={{ color: rem > 0 ? "#52c41a" : "#ff4d4f" }}>{formatCurrency(rem)}</Text>;
            },
        },
        {
            title: "Tỷ lệ sử dụng", key: "usage",
            render: (_, r) => {
                const pct = Math.round((r.spent / r.budget) * 100);
                let color = "#52c41a";
                if (pct >= 90) color = "#ff4d4f";
                else if (pct >= 70) color = "#faad14";
                return <Progress percent={pct} size="small" strokeColor={color} />;
            },
            width: 180,
        },
    ];

    const deptBudgetData = [
        { key: "1", department: "Khối Kinh doanh", budget: 1500000000, allocated: 1400000000, spent: 980000000 },
        { key: "2", department: "Khối Sản xuất", budget: 1200000000, allocated: 1100000000, spent: 780000000 },
        { key: "3", department: "Khối Công nghệ", budget: 800000000, allocated: 750000000, spent: 520000000 },
        { key: "4", department: "Khối Nhân sự", budget: 600000000, allocated: 550000000, spent: 320000000 },
        { key: "5", department: "Khối Marketing", budget: 500000000, allocated: 200000000, spent: 120000000 },
        { key: "6", department: "Khối Tài chính", budget: 400000000, allocated: 200000000, spent: 130000000 },
    ];

    return (
        <div>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={6}>
                    <Card>
                        <Statistic title="Tổng ngân sách năm" value={OVERVIEW_STATS.totalBudget} formatter={(v) => formatCurrency(v)} prefix={<BankOutlined />} valueStyle={{ color: "#1677ff" }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Đã phân bổ" value={OVERVIEW_STATS.allocated} formatter={(v) => formatCurrency(v)} prefix={<ApartmentOutlined />} valueStyle={{ color: "#722ed1" }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Đã chi tiêu" value={OVERVIEW_STATS.spent} formatter={(v) => formatCurrency(v)} prefix={<DollarOutlined />} valueStyle={{ color: "#faad14" }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Còn lại" value={OVERVIEW_STATS.remaining} formatter={(v) => formatCurrency(v)} prefix={<FundOutlined />} valueStyle={{ color: "#52c41a" }} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={8}>
                    <Card size="small">
                        <Statistic title="Tỷ lệ sử dụng ngân sách" value={OVERVIEW_STATS.budgetUtilization} suffix="%" prefix={<BarChartOutlined />} />
                        <Progress percent={OVERVIEW_STATS.budgetUtilization} strokeColor="#1677ff" style={{ marginTop: 8 }} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small">
                        <Statistic title="Số bộ phận" value={OVERVIEW_STATS.departments} prefix={<TeamOutlined />} />
                        <Text type="secondary">Đã được phân bổ ngân sách</Text>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small">
                        <Statistic title="Khóa học có chi phí" value={OVERVIEW_STATS.coursesWithCost} prefix={<FileTextOutlined />} />
                        <Text type="secondary">Trong năm {selectedYear}</Text>
                    </Card>
                </Col>
            </Row>

            <Card
                title={<><ApartmentOutlined /> Cấu trúc Ngân sách theo Bộ phận (Tree-view)</>}
                extra={
                    <Space>
                        <Select value={selectedYear} onChange={setSelectedYear} options={YEARS} style={{ width: 120 }} />
                        <Button icon={<ExportOutlined />}>Xuất báo cáo</Button>
                    </Space>
                }
                style={{ marginBottom: 16 }}
            >
                <Alert
                    message="Ngân sách được phân cấp theo cấu trúc tổ chức. Nhấn nút 'Bổ sung' để top-up ngân sách cho bộ phận bất kỳ."
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
                <Tree
                    defaultExpandAll
                    treeData={DEPARTMENT_TREE_DATA}
                    titleRender={(node) => renderTreeTitle(nodeMap[node.key] || node)}
                    blockNode
                    style={{ fontSize: 14 }}
                />
            </Card>

            <Card title={<><BarChartOutlined /> Đối chiếu Ngân sách theo Bộ phận</>}>
                <Table columns={deptBudgetColumns} dataSource={deptBudgetData} pagination={false} size="middle" />
            </Card>

            <Modal
                title={<><PlusOutlined /> Bổ sung ngân sách - {selectedDept?.title}</>}
                open={topUpModalVisible}
                onCancel={() => setTopUpModalVisible(false)}
                onOk={() => { message.success("Đã bổ sung ngân sách thành công!"); setTopUpModalVisible(false); }}
                okText="Xác nhận bổ sung"
                cancelText="Hủy"
            >
                <Form layout="vertical">
                    <Form.Item label="Bộ phận">
                        <Input value={selectedDept?.title} disabled />
                    </Form.Item>
                    <Form.Item label="Ngân sách hiện tại">
                        <Input value={selectedDept ? formatFullCurrency(selectedDept.budget) : ""} disabled />
                    </Form.Item>
                    <Form.Item label="Số tiền bổ sung" rules={[{ required: true }]}>
                        <InputNumber style={{ width: "100%" }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => v.replace(/,/g, "")} placeholder="Nhập số tiền bổ sung" addonAfter="đ" />
                    </Form.Item>
                    <Form.Item label="Lý do bổ sung">
                        <TextArea rows={3} placeholder="Nhập lý do bổ sung ngân sách..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// ============ TAB 2: NGÂN SÁCH THEO CÁ NHÂN ============
const PerLearnerBudgetTab = () => {
    const [configModalVisible, setConfigModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedLearner, setSelectedLearner] = useState(null);

    const columns = [
        {
            title: "Họ tên", dataIndex: "name", key: "name",
            render: (text) => <Text strong>{text}</Text>,
        },
        { title: "Bộ phận", dataIndex: "department", key: "department" },
        { title: "Chức danh", dataIndex: "position", key: "position" },
        {
            title: "Ngân sách trần", dataIndex: "budgetCap", key: "budgetCap",
            render: (v) => formatFullCurrency(v),
            sorter: (a, b) => a.budgetCap - b.budgetCap,
        },
        {
            title: "Đã sử dụng", dataIndex: "used", key: "used",
            render: (v) => <Text style={{ color: "#1677ff" }}>{formatFullCurrency(v)}</Text>,
            sorter: (a, b) => a.used - b.used,
        },
        {
            title: "Còn lại", dataIndex: "remaining", key: "remaining",
            render: (v, r) => {
                const color = r.status === "exceeded" ? "#ff4d4f" : r.status === "warning" ? "#faad14" : "#52c41a";
                return <Text style={{ color }}>{formatFullCurrency(v)}</Text>;
            },
        },
        {
            title: "Tỷ lệ", key: "usage",
            render: (_, r) => {
                const pct = Math.round((r.used / r.budgetCap) * 100);
                let color = "#52c41a";
                if (pct >= 100) color = "#ff4d4f";
                else if (pct >= 80) color = "#faad14";
                return <Progress percent={Math.min(pct, 100)} size="small" strokeColor={color} format={() => `${pct}%`} />;
            },
            width: 150,
        },
        {
            title: "Số KH đăng ký", dataIndex: "coursesEnrolled", key: "coursesEnrolled",
            align: "center",
        },
        {
            title: "Trạng thái", dataIndex: "status", key: "status",
            render: (s) => {
                if (s === "exceeded") return <Tag color="red" icon={<CloseCircleOutlined />}>Hết ngân sách</Tag>;
                if (s === "warning") return <Tag color="orange" icon={<WarningOutlined />}>Sắp hết</Tag>;
                return <Tag color="green" icon={<CheckCircleOutlined />}>Bình thường</Tag>;
            },
            filters: [
                { text: "Bình thường", value: "normal" },
                { text: "Sắp hết", value: "warning" },
                { text: "Hết ngân sách", value: "exceeded" },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "Thao tác", key: "action",
            render: (_, r) => (
                <Space>
                    <Button size="small" icon={<EyeOutlined />} onClick={() => { setSelectedLearner(r); setDetailModalVisible(true); }}>Chi tiết</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Card
                title={<><UserOutlined /> Cấu hình Ngân sách Trần theo Cá nhân</>}
                style={{ marginBottom: 16 }}
                extra={
                    <Button type="primary" icon={<EditOutlined />} onClick={() => setConfigModalVisible(true)}>
                        Cấu hình ngân sách trần
                    </Button>
                }
            >
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Statistic title="Tổng nhân viên" value={OVERVIEW_STATS.employees} prefix={<UserOutlined />} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Đã cấp ngân sách" value={420} prefix={<CheckCircleOutlined />} valueStyle={{ color: "#52c41a" }} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Sắp hết ngân sách" value={15} prefix={<WarningOutlined />} valueStyle={{ color: "#faad14" }} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Đã hết ngân sách" value={8} prefix={<CloseCircleOutlined />} valueStyle={{ color: "#ff4d4f" }} />
                    </Col>
                </Row>
            </Card>

            <Card
                title="Danh sách Ngân sách Cá nhân"
                extra={
                    <Space>
                        <Select placeholder="Lọc bộ phận" style={{ width: 200 }} allowClear options={[
                            { value: "sales", label: "Khối Kinh doanh" },
                            { value: "prod", label: "Khối Sản xuất" },
                            { value: "tech", label: "Khối Công nghệ" },
                            { value: "hr", label: "Khối Nhân sự" },
                        ]} />
                        <Button icon={<ExportOutlined />}>Xuất Excel</Button>
                    </Space>
                }
            >
                <Table columns={columns} dataSource={PER_LEARNER_BUDGET} rowKey="id" pagination={{ pageSize: 10 }} size="middle" />
            </Card>

            {/* Modal cấu hình ngân sách trần */}
            <Modal
                title="Cấu hình Ngân sách Trần mặc định"
                open={configModalVisible}
                onCancel={() => setConfigModalVisible(false)}
                onOk={() => { message.success("Đã cập nhật cấu hình ngân sách trần!"); setConfigModalVisible(false); }}
                okText="Lưu cấu hình"
                cancelText="Hủy"
                width={600}
            >
                <Alert message="Ngân sách trần là mức chi phí tối đa mà mỗi cá nhân được phép sử dụng cho các khóa học có tính phí trong năm." type="info" showIcon style={{ marginBottom: 16 }} />
                <Form layout="vertical">
                    <Form.Item label="Ngân sách trần mặc định (đồng/người/năm)">
                        <InputNumber style={{ width: "100%" }} defaultValue={15000000} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => v.replace(/,/g, "")} addonAfter="đ" />
                    </Form.Item>
                    <Form.Item label="Ngân sách trần cho Quản lý (đồng/người/năm)">
                        <InputNumber style={{ width: "100%" }} defaultValue={20000000} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => v.replace(/,/g, "")} addonAfter="đ" />
                    </Form.Item>
                    <Form.Item label="Ngân sách trần cho Giám đốc (đồng/người/năm)">
                        <InputNumber style={{ width: "100%" }} defaultValue={30000000} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => v.replace(/,/g, "")} addonAfter="đ" />
                    </Form.Item>
                    <Form.Item label="Ngưỡng cảnh báo (%)">
                        <Space>
                            <InputNumber defaultValue={80} min={50} max={100} addonAfter="%" />
                            <Text type="secondary">Gửi cảnh báo khi sử dụng đạt ngưỡng này</Text>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal chi tiết cá nhân */}
            <Modal
                title={<><UserOutlined /> Chi tiết ngân sách - {selectedLearner?.name}</>}
                open={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={null}
                width={700}
            >
                {selectedLearner && (
                    <>
                        <Descriptions bordered column={2} size="small" style={{ marginBottom: 16 }}>
                            <Descriptions.Item label="Họ tên">{selectedLearner.name}</Descriptions.Item>
                            <Descriptions.Item label="Bộ phận">{selectedLearner.department}</Descriptions.Item>
                            <Descriptions.Item label="Chức danh">{selectedLearner.position}</Descriptions.Item>
                            <Descriptions.Item label="Số KH đăng ký">{selectedLearner.coursesEnrolled}</Descriptions.Item>
                            <Descriptions.Item label="Ngân sách trần">{formatFullCurrency(selectedLearner.budgetCap)}</Descriptions.Item>
                            <Descriptions.Item label="Đã sử dụng">
                                <Text style={{ color: "#1677ff" }}>{formatFullCurrency(selectedLearner.used)}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Còn lại" span={2}>
                                <Text style={{ color: selectedLearner.remaining > 0 ? "#52c41a" : "#ff4d4f" }}>
                                    {formatFullCurrency(selectedLearner.remaining)}
                                </Text>
                            </Descriptions.Item>
                        </Descriptions>
                        <Progress
                            percent={Math.min(Math.round((selectedLearner.used / selectedLearner.budgetCap) * 100), 100)}
                            strokeColor={selectedLearner.status === "exceeded" ? "#ff4d4f" : selectedLearner.status === "warning" ? "#faad14" : "#52c41a"}
                            style={{ marginBottom: 16 }}
                        />
                        <Title level={5}>Lịch sử khấu trừ</Title>
                        <Timeline
                            items={[
                                { color: "blue", children: <><Text strong>Kỹ năng bán hàng nâng cao</Text> - Khấu trừ 8,000,000 đ (15/01/2026)</> },
                                { color: "blue", children: <><Text strong>Kỹ năng giao tiếp</Text> - Khấu trừ 3,500,000 đ (20/02/2026)</> },
                                { color: "orange", children: <><Text strong>Kỹ năng đàm phán</Text> - Khấu trừ 1,000,000 đ (05/03/2026)</> },
                            ]}
                        />
                    </>
                )}
            </Modal>
        </div>
    );
};

// ============ TAB 3: CHI PHÍ KHÓA HỌC NỘI BỘ ============
const InternalCourseCostTab = () => {
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [costEditModalVisible, setCostEditModalVisible] = useState(false);
    const [editingCost, setEditingCost] = useState(null);
    const [addCostModalVisible, setAddCostModalVisible] = useState(false);

    const columns = [
        {
            title: "Khóa học", dataIndex: "courseName", key: "courseName",
            render: (text) => <Text strong>{text}</Text>,
        },
        { title: "Thời gian", key: "period", render: (_, r) => `${r.startDate} → ${r.endDate}` },
        { title: "Số HV", dataIndex: "participants", key: "participants", align: "center" },
        {
            title: "Chi phí dự kiến", dataIndex: "totalPlanned", key: "totalPlanned",
            render: (v) => formatFullCurrency(v),
            sorter: (a, b) => a.totalPlanned - b.totalPlanned,
        },
        {
            title: "Chi phí thực tế", dataIndex: "totalActual", key: "totalActual",
            render: (v) => <Text strong style={{ color: "#1677ff" }}>{formatFullCurrency(v)}</Text>,
            sorter: (a, b) => a.totalActual - b.totalActual,
        },
        {
            title: "Chênh lệch", key: "diff",
            render: (_, r) => {
                const diff = r.totalActual - r.totalPlanned;
                const color = diff > 0 ? "#ff4d4f" : diff < 0 ? "#52c41a" : "#666";
                const icon = diff > 0 ? <ArrowUpOutlined /> : diff < 0 ? <ArrowDownOutlined /> : null;
                return <Text style={{ color }}>{icon} {formatFullCurrency(Math.abs(diff))}</Text>;
            },
        },
        {
            title: "Trạng thái", dataIndex: "status", key: "status",
            render: (s) => {
                if (s === "completed") return <Tag color="green">Hoàn thành</Tag>;
                if (s === "in_progress") return <Tag color="blue">Đang diễn ra</Tag>;
                return <Tag>Chưa bắt đầu</Tag>;
            },
        },
        {
            title: "Thao tác", key: "action",
            render: (_, r) => (
                <Button size="small" icon={<EyeOutlined />} onClick={() => { setSelectedCourse(r); setDetailModalVisible(true); }}>
                    Chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Card
                title={<><FileTextOutlined /> Chi phí Khóa học Nội bộ</>}
                extra={
                    <Space>
                        <Select placeholder="Trạng thái" style={{ width: 150 }} allowClear options={[
                            { value: "completed", label: "Hoàn thành" },
                            { value: "in_progress", label: "Đang diễn ra" },
                        ]} />
                        <Button icon={<ExportOutlined />}>Xuất báo cáo</Button>
                    </Space>
                }
            >
                <Table columns={columns} dataSource={INTERNAL_COURSE_COSTS} rowKey="id" pagination={false} size="middle" />
            </Card>

            {/* Modal chi tiết chi phí khóa học */}
            <Modal
                title={<><CalculatorOutlined /> Chi tiết chi phí - {selectedCourse?.courseName}</>}
                open={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={null}
                width={800}
            >
                {selectedCourse && (
                    <>
                        <Descriptions bordered column={2} size="small" style={{ marginBottom: 16 }}>
                            <Descriptions.Item label="Khóa học">{selectedCourse.courseName}</Descriptions.Item>
                            <Descriptions.Item label="Loại">Đào tạo nội bộ</Descriptions.Item>
                            <Descriptions.Item label="Thời gian">{selectedCourse.startDate} → {selectedCourse.endDate}</Descriptions.Item>
                            <Descriptions.Item label="Số học viên">{selectedCourse.participants}</Descriptions.Item>
                        </Descriptions>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                            <Title level={5} style={{ margin: 0 }}>Bảng Chi tiết Chi phí</Title>
                            <Button type="primary" icon={<PlusOutlined />} size="small" onClick={() => setAddCostModalVisible(true)}>
                                Thêm hạng mục
                            </Button>
                        </div>
                        <Table
                            columns={[
                                { title: "Hạng mục", dataIndex: "category", key: "category", render: (t) => <Text strong>{t}</Text> },
                                { title: "Chi phí dự kiến", dataIndex: "planned", key: "planned", render: (v) => formatFullCurrency(v), align: "right" },
                                { title: "Chi phí thực tế", dataIndex: "actual", key: "actual", render: (v) => <Text style={{ color: "#1677ff" }}>{formatFullCurrency(v)}</Text>, align: "right" },
                                {
                                    title: "Chênh lệch", key: "diff", align: "right",
                                    render: (_, r) => {
                                        const diff = r.actual - r.planned;
                                        const color = diff > 0 ? "#ff4d4f" : diff < 0 ? "#52c41a" : "#666";
                                        return <Text style={{ color }}>{diff > 0 ? "+" : ""}{formatFullCurrency(diff)}</Text>;
                                    },
                                },
                                {
                                    title: "Thao tác", key: "action", align: "center", width: 80,
                                    render: (_, r) => (
                                        <Button size="small" type="link" icon={<EditOutlined />} onClick={() => { setEditingCost(r); setCostEditModalVisible(true); }}>
                                            Sửa
                                        </Button>
                                    ),
                                },
                            ]}
                            dataSource={selectedCourse.costs.map((c, i) => ({ ...c, key: i }))}
                            pagination={false}
                            size="small"
                            style={{ marginTop: 12 }}
                            summary={() => (
                                <Table.Summary.Row style={{ fontWeight: "bold", background: "#fafafa" }}>
                                    <Table.Summary.Cell>TỔNG CỘNG</Table.Summary.Cell>
                                    <Table.Summary.Cell align="right">{formatFullCurrency(selectedCourse.totalPlanned)}</Table.Summary.Cell>
                                    <Table.Summary.Cell align="right">
                                        <Text style={{ color: "#1677ff" }}>{formatFullCurrency(selectedCourse.totalActual)}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell align="right">
                                        <Text style={{ color: selectedCourse.totalActual > selectedCourse.totalPlanned ? "#ff4d4f" : "#52c41a" }}>
                                            {selectedCourse.totalActual > selectedCourse.totalPlanned ? "+" : ""}
                                            {formatFullCurrency(selectedCourse.totalActual - selectedCourse.totalPlanned)}
                                        </Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell />
                                </Table.Summary.Row>
                            )}
                        />
                    </>
                )}
            </Modal>

            {/* Modal sửa chi phí */}
            <Modal
                title={<><EditOutlined /> Sửa chi phí - {editingCost?.category}</>}
                open={costEditModalVisible}
                onCancel={() => setCostEditModalVisible(false)}
                onOk={() => { message.success("Đã cập nhật chi phí thành công!"); setCostEditModalVisible(false); }}
                okText="Lưu"
                cancelText="Hủy"
            >
                {editingCost && (
                    <Form layout="vertical">
                        <Form.Item label="Hạng mục">
                            <Input defaultValue={editingCost.category} />
                        </Form.Item>
                        <Form.Item label="Chi phí dự kiến">
                            <InputNumber style={{ width: "100%" }} defaultValue={editingCost.planned} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => v.replace(/,/g, "")} addonAfter="đ" />
                        </Form.Item>
                        <Form.Item label="Chi phí thực tế">
                            <InputNumber style={{ width: "100%" }} defaultValue={editingCost.actual} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => v.replace(/,/g, "")} addonAfter="đ" />
                        </Form.Item>
                    </Form>
                )}
            </Modal>

            {/* Modal thêm hạng mục chi phí */}
            <Modal
                title={<><PlusOutlined /> Thêm hạng mục chi phí</>}
                open={addCostModalVisible}
                onCancel={() => setAddCostModalVisible(false)}
                onOk={() => { message.success("Đã thêm hạng mục chi phí thành công!"); setAddCostModalVisible(false); }}
                okText="Thêm"
                cancelText="Hủy"
            >
                <Form layout="vertical">
                    <Form.Item label="Tên hạng mục" rules={[{ required: true }]}>
                        <Input placeholder="VD: Chi phí ăn uống, Chi phí di chuyển..." />
                    </Form.Item>
                    <Form.Item label="Chi phí dự kiến" rules={[{ required: true }]}>
                        <InputNumber style={{ width: "100%" }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => v.replace(/,/g, "")} placeholder="Nhập chi phí dự kiến" addonAfter="đ" />
                    </Form.Item>
                    <Form.Item label="Chi phí thực tế">
                        <InputNumber style={{ width: "100%" }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => v.replace(/,/g, "")} placeholder="Nhập chi phí thực tế (nếu có)" addonAfter="đ" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// ============ TAB 4: ĐÀO TẠO BÊN NGOÀI ============
const ExternalTrainingTab = () => {
    const [requestModalVisible, setRequestModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [uploadModalVisible, setUploadModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const columns = [
        {
            title: "Nhân viên", dataIndex: "employee", key: "employee",
            render: (text) => <Text strong>{text}</Text>,
        },
        { title: "Bộ phận", dataIndex: "department", key: "department" },
        {
            title: "Khóa học", dataIndex: "courseName", key: "courseName",
            render: (text, r) => (
                <div>
                    <Text strong>{text}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>Đơn vị: {r.provider}</Text>
                </div>
            ),
            width: 250,
        },
        { title: "Thời gian", key: "period", render: (_, r) => `${r.startDate} → ${r.endDate}`, width: 210 },
        {
            title: "Chi phí dự kiến", dataIndex: "estimatedCost", key: "estimatedCost",
            render: (v) => formatFullCurrency(v),
        },
        {
            title: "Đề xuất hỗ trợ", dataIndex: "supportRequest", key: "supportRequest",
            render: (v) => <Text strong style={{ color: "#1677ff" }}>{formatFullCurrency(v)}</Text>,
        },
        {
            title: "Trạng thái", dataIndex: "status", key: "status",
            render: (s) => {
                const map = {
                    pending: { color: "orange", icon: <ClockCircleOutlined />, text: "Chờ duyệt" },
                    approved: { color: "blue", icon: <CheckCircleOutlined />, text: "Đã duyệt" },
                    rejected: { color: "red", icon: <CloseCircleOutlined />, text: "Từ chối" },
                    completed: { color: "green", icon: <SafetyCertificateOutlined />, text: "Hoàn thành" },
                };
                const item = map[s];
                return <Tag color={item.color} icon={item.icon}>{item.text}</Tag>;
            },
            filters: [
                { text: "Chờ duyệt", value: "pending" },
                { text: "Đã duyệt", value: "approved" },
                { text: "Từ chối", value: "rejected" },
                { text: "Hoàn thành", value: "completed" },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "Chứng chỉ", key: "cert",
            render: (_, r) => {
                if (r.status === "completed" && r.certificate) return <Tag color="green" icon={<SafetyCertificateOutlined />}>Đã nộp</Tag>;
                if (r.status === "approved") return <Button size="small" type="link" icon={<UploadOutlined />} onClick={() => { setSelectedRequest(r); setUploadModalVisible(true); }}>Upload</Button>;
                return <Text type="secondary">-</Text>;
            },
        },
        {
            title: "Thao tác", key: "action",
            render: (_, r) => (
                <Button size="small" icon={<EyeOutlined />} onClick={() => { setSelectedRequest(r); setDetailModalVisible(true); }}>
                    Chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Card
                title={<><SendOutlined /> Đề xuất Đào tạo Bên ngoài</>}
                extra={
                    <Space>
                        <Select placeholder="Trạng thái" style={{ width: 150 }} allowClear options={[
                            { value: "pending", label: "Chờ duyệt" },
                            { value: "approved", label: "Đã duyệt" },
                            { value: "completed", label: "Hoàn thành" },
                            { value: "rejected", label: "Từ chối" },
                        ]} />
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setRequestModalVisible(true)}>
                            Tạo đề xuất mới
                        </Button>
                    </Space>
                }
            >
                <Alert
                    message="Học viên đề xuất hỗ trợ kinh phí đào tạo bên ngoài LMS. Sau khi được duyệt và hoàn thành khóa học, cần upload chứng chỉ/minh chứng hoàn thành."
                    type="info"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
                <Table columns={columns} dataSource={EXTERNAL_TRAINING_REQUESTS} rowKey="id" pagination={false} size="middle" />
            </Card>

            {/* Modal tạo đề xuất mới */}
            <Modal
                title={<><PlusOutlined /> Đề xuất Hỗ trợ Đào tạo Bên ngoài</>}
                open={requestModalVisible}
                onCancel={() => setRequestModalVisible(false)}
                onOk={() => { message.success("Đã gửi đề xuất thành công!"); setRequestModalVisible(false); }}
                okText="Gửi đề xuất"
                cancelText="Hủy"
                width={700}
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Tên khóa học" rules={[{ required: true }]}>
                                <Input placeholder="Nhập tên khóa học bên ngoài" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Đơn vị đào tạo" rules={[{ required: true }]}>
                                <Input placeholder="Nhập tên đơn vị/tổ chức đào tạo" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Thời gian bắt đầu">
                                <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày bắt đầu" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Thời gian kết thúc">
                                <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày kết thúc" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Chi phí dự kiến" rules={[{ required: true }]}>
                                <InputNumber style={{ width: "100%" }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => v.replace(/,/g, "")} placeholder="Nhập chi phí" addonAfter="đ" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Mức hỗ trợ đề xuất" rules={[{ required: true }]}>
                                <InputNumber style={{ width: "100%" }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(v) => v.replace(/,/g, "")} placeholder="Nhập mức hỗ trợ" addonAfter="đ" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Mô tả khóa học / Lý do đề xuất">
                        <TextArea rows={3} placeholder="Mô tả nội dung khóa học và lý do cần hỗ trợ kinh phí..." />
                    </Form.Item>
                    <Form.Item label="Tài liệu đính kèm (brochure, lịch học,...)">
                        <Upload>
                            <Button icon={<UploadOutlined />}>Chọn file</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal chi tiết đề xuất */}
            <Modal
                title={<><FileTextOutlined /> Chi tiết Đề xuất Đào tạo Bên ngoài</>}
                open={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                footer={
                    selectedRequest?.status === "pending" ? (
                        <Space>
                            <Button danger onClick={() => { message.warning("Đã từ chối đề xuất"); setDetailModalVisible(false); }}>Từ chối</Button>
                            <Button type="primary" onClick={() => { message.success("Đã phê duyệt đề xuất"); setDetailModalVisible(false); }}>Phê duyệt</Button>
                        </Space>
                    ) : null
                }
                width={700}
            >
                {selectedRequest && (
                    <>
                        <Descriptions bordered column={2} size="small">
                            <Descriptions.Item label="Nhân viên">{selectedRequest.employee}</Descriptions.Item>
                            <Descriptions.Item label="Bộ phận">{selectedRequest.department}</Descriptions.Item>
                            <Descriptions.Item label="Khóa học" span={2}>{selectedRequest.courseName}</Descriptions.Item>
                            <Descriptions.Item label="Đơn vị đào tạo" span={2}>{selectedRequest.provider}</Descriptions.Item>
                            <Descriptions.Item label="Thời gian">{selectedRequest.startDate} → {selectedRequest.endDate}</Descriptions.Item>
                            <Descriptions.Item label="Chi phí dự kiến">{formatFullCurrency(selectedRequest.estimatedCost)}</Descriptions.Item>
                            <Descriptions.Item label="Mức hỗ trợ đề xuất">
                                <Text strong style={{ color: "#1677ff" }}>{formatFullCurrency(selectedRequest.supportRequest)}</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                {selectedRequest.status === "pending" && <Tag color="orange">Chờ duyệt</Tag>}
                                {selectedRequest.status === "approved" && <Tag color="blue">Đã duyệt bởi {selectedRequest.approvedBy}</Tag>}
                                {selectedRequest.status === "completed" && <Tag color="green">Hoàn thành</Tag>}
                                {selectedRequest.status === "rejected" && <Tag color="red">Từ chối</Tag>}
                            </Descriptions.Item>
                            {selectedRequest.rejectReason && (
                                <Descriptions.Item label="Lý do từ chối" span={2}>
                                    <Text type="danger">{selectedRequest.rejectReason}</Text>
                                </Descriptions.Item>
                            )}
                            {selectedRequest.certificate && (
                                <Descriptions.Item label="Chứng chỉ" span={2}>
                                    <Tag color="green" icon={<SafetyCertificateOutlined />}>{selectedRequest.certificate}</Tag>
                                </Descriptions.Item>
                            )}
                        </Descriptions>

                        <Title level={5} style={{ marginTop: 16 }}>Quy trình phê duyệt</Title>
                        <Steps
                            current={
                                selectedRequest.status === "pending" ? 0
                                    : selectedRequest.status === "approved" ? 2
                                        : selectedRequest.status === "completed" ? 3
                                            : selectedRequest.status === "rejected" ? 1
                                                : 0
                            }
                            status={selectedRequest.status === "rejected" ? "error" : "process"}
                            size="small"
                            items={[
                                { title: "Đề xuất", description: "Học viên gửi đề xuất" },
                                { title: "Phê duyệt", description: selectedRequest.approvedBy ? `${selectedRequest.approvedBy}` : "Chờ phê duyệt" },
                                { title: "Tham gia khóa học", description: "Học viên tham gia đào tạo" },
                                { title: "Upload chứng chỉ", description: selectedRequest.certificate ? "Đã nộp" : "Chờ nộp minh chứng" },
                            ]}
                        />
                    </>
                )}
            </Modal>

            {/* Modal upload chứng chỉ */}
            <Modal
                title={<><UploadOutlined /> Upload Chứng chỉ / Minh chứng Hoàn thành</>}
                open={uploadModalVisible}
                onCancel={() => setUploadModalVisible(false)}
                onOk={() => { message.success("Đã upload chứng chỉ thành công!"); setUploadModalVisible(false); }}
                okText="Nộp minh chứng"
                cancelText="Hủy"
            >
                <Alert message="Sau khi kết thúc khóa đào tạo bên ngoài, học viên cần upload lại chứng chỉ và minh chứng hoàn thành khóa học." type="info" showIcon style={{ marginBottom: 16 }} />
                <Form layout="vertical">
                    <Form.Item label="Khóa học">
                        <Input value={selectedRequest?.courseName} disabled />
                    </Form.Item>
                    <Form.Item label="Chứng chỉ (scan/ảnh)" rules={[{ required: true }]}>
                        <Upload listType="picture">
                            <Button icon={<UploadOutlined />}>Chọn file chứng chỉ</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Minh chứng hoàn thành (bảng điểm, xác nhận,...)" rules={[{ required: true }]}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Chọn file minh chứng</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Ghi chú">
                        <TextArea rows={2} placeholder="Ghi chú thêm (nếu có)..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// ============ TAB 5: PHÊ DUYỆT BỔ SUNG ============
const ApprovalWorkflowTab = () => {
    const columns = [
        {
            title: "Nhân viên", dataIndex: "employee", key: "employee",
            render: (text) => <Text strong>{text}</Text>,
        },
        { title: "Bộ phận", dataIndex: "department", key: "department" },
        {
            title: "Khóa học đăng ký", dataIndex: "courseName", key: "courseName",
            render: (text) => <Text>{text}</Text>,
        },
        {
            title: "Chi phí khóa học", dataIndex: "courseCost", key: "courseCost",
            render: (v) => formatFullCurrency(v),
        },
        {
            title: "NS trần còn lại", dataIndex: "currentBudget", key: "currentBudget",
            render: (v) => <Text style={{ color: v === 0 ? "#ff4d4f" : "#faad14" }}>{formatFullCurrency(v)}</Text>,
        },
        {
            title: "Lý do", dataIndex: "reason", key: "reason",
            render: (text) => <Text type="secondary" style={{ fontSize: 12 }}>{text}</Text>,
            width: 250,
        },
        { title: "Ngày yêu cầu", dataIndex: "requestDate", key: "requestDate" },
        {
            title: "Trạng thái", dataIndex: "status", key: "status",
            render: (s) => {
                const map = {
                    pending_manager: { color: "orange", text: "Chờ Quản lý duyệt" },
                    pending_director: { color: "gold", text: "Chờ Giám đốc duyệt" },
                    approved: { color: "green", text: "Đã duyệt" },
                    rejected: { color: "red", text: "Từ chối" },
                };
                const item = map[s];
                return <Tag color={item.color}>{item.text}</Tag>;
            },
        },
        {
            title: "Thao tác", key: "action",
            render: (_, r) => {
                if (r.status === "approved" || r.status === "rejected") return null;
                return (
                    <Space>
                        <Button size="small" type="primary" onClick={() => message.success("Đã phê duyệt!")}>Duyệt</Button>
                        <Button size="small" danger onClick={() => message.warning("Đã từ chối!")}>Từ chối</Button>
                    </Space>
                );
            },
        },
    ];

    return (
        <div>
            <Alert
                message="Luồng Phê duyệt Bổ sung"
                description="Khi chi phí khóa học vượt quá Ngân sách Trần còn lại của cá nhân hoặc vượt quá Ngân sách Tổng của Bộ phận, hệ thống sẽ tự động tạo yêu cầu phê duyệt bổ sung tại đây."
                type="warning"
                showIcon
                icon={<WarningOutlined />}
                style={{ marginBottom: 16 }}
            />
            <Card title={<><CheckCircleOutlined /> Yêu cầu Phê duyệt Bổ sung Ngân sách</>}>
                <Table columns={columns} dataSource={APPROVAL_WORKFLOW} rowKey="id" pagination={false} size="middle" />
            </Card>
        </div>
    );
};

// ============ DATA THỐNG KÊ NGƯỠNG NGÂN SÁCH ============
const DEPT_THRESHOLD_DATA = [
    { key: "1", department: "Khối Kinh doanh", budget: 1500000000, spent: 980000000, usage: 65, level: "normal" },
    { key: "2", department: "Khối Sản xuất", budget: 1200000000, spent: 780000000, usage: 65, level: "normal" },
    { key: "3", department: "Khối Công nghệ", budget: 800000000, spent: 520000000, usage: 65, level: "normal" },
    { key: "4", department: "Phòng Kinh doanh 1", budget: 500000000, spent: 350000000, usage: 70, level: "normal" },
    { key: "5", department: "Phòng Kinh doanh 2", budget: 500000000, spent: 450000000, usage: 90, level: "danger" },
    { key: "6", department: "Phòng Kinh doanh 3", budget: 500000000, spent: 410000000, usage: 82, level: "warning" },
    { key: "7", department: "Phân xưởng A", budget: 400000000, spent: 360000000, usage: 90, level: "danger" },
    { key: "8", department: "Phân xưởng B", budget: 400000000, spent: 260000000, usage: 65, level: "normal" },
    { key: "9", department: "Khối Nhân sự", budget: 600000000, spent: 520000000, usage: 87, level: "warning" },
    { key: "10", department: "Khối Marketing", budget: 500000000, spent: 490000000, usage: 98, level: "exceeded" },
    { key: "11", department: "Khối Tài chính", budget: 400000000, spent: 130000000, usage: 33, level: "normal" },
];

const USER_THRESHOLD_DATA = [
    { key: "1", name: "Lê Hoàng Cường", department: "Phòng Công nghệ", budgetCap: 20000000, used: 20000000, usage: 100, level: "exceeded" },
    { key: "2", name: "Đỗ Thị Giang", department: "Phòng Marketing", budgetCap: 15000000, used: 14800000, usage: 99, level: "exceeded" },
    { key: "3", name: "Hoàng Thị Em", department: "Phòng Kinh doanh 2", budgetCap: 18000000, used: 16200000, usage: 90, level: "danger" },
    { key: "4", name: "Nguyễn Văn An", department: "Phòng Kinh doanh 1", budgetCap: 15000000, used: 12500000, usage: 83, level: "warning" },
    { key: "5", name: "Trần Thị Bình", department: "Phòng Nhân sự", budgetCap: 15000000, used: 8000000, usage: 53, level: "normal" },
    { key: "6", name: "Phạm Minh Đức", department: "Phân xưởng A", budgetCap: 12000000, used: 5000000, usage: 42, level: "normal" },
    { key: "7", name: "Vũ Quang Phúc", department: "Phòng Tài chính", budgetCap: 15000000, used: 3000000, usage: 20, level: "normal" },
    { key: "8", name: "Ngô Văn Hải", department: "Phân xưởng B", budgetCap: 10000000, used: 0, usage: 0, level: "normal" },
    { key: "9", name: "Trần Minh Tuấn", department: "Phòng Kinh doanh 3", budgetCap: 15000000, used: 13500000, usage: 90, level: "danger" },
    { key: "10", name: "Nguyễn Thị Lan", department: "Khối Nhân sự", budgetCap: 15000000, used: 12300000, usage: 82, level: "warning" },
    { key: "11", name: "Phan Văn Hùng", department: "Phòng Công nghệ", budgetCap: 20000000, used: 18500000, usage: 93, level: "danger" },
    { key: "12", name: "Lý Thị Mai", department: "Phòng Marketing", budgetCap: 15000000, used: 12100000, usage: 81, level: "warning" },
];

// ============ TAB 6: CẢNH BÁO NGÂN SÁCH ============
const BudgetAlertTab = () => {
    const deptNormal = DEPT_THRESHOLD_DATA.filter((d) => d.level === "normal").length;
    const deptWarning = DEPT_THRESHOLD_DATA.filter((d) => d.level === "warning").length;
    const deptDanger = DEPT_THRESHOLD_DATA.filter((d) => d.level === "danger").length;
    const deptExceeded = DEPT_THRESHOLD_DATA.filter((d) => d.level === "exceeded").length;
    const deptTotal = DEPT_THRESHOLD_DATA.length;

    const userNormal = USER_THRESHOLD_DATA.filter((u) => u.level === "normal").length;
    const userWarning = USER_THRESHOLD_DATA.filter((u) => u.level === "warning").length;
    const userDanger = USER_THRESHOLD_DATA.filter((u) => u.level === "danger").length;
    const userExceeded = USER_THRESHOLD_DATA.filter((u) => u.level === "exceeded").length;
    const userTotal = USER_THRESHOLD_DATA.length;

    const renderBar = (count, total, color, label) => (
        <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <Text>{label}</Text>
                <Text strong>{count}/{total}</Text>
            </div>
            <div style={{ background: "#f0f0f0", borderRadius: 4, height: 24, position: "relative", overflow: "hidden" }}>
                <div style={{ background: color, height: "100%", width: `${(count / total) * 100}%`, borderRadius: 4, transition: "width 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {count > 0 && <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>{Math.round((count / total) * 100)}%</Text>}
                </div>
            </div>
        </div>
    );

    const deptColumns = [
        { title: "Đơn vị", dataIndex: "department", key: "department", render: (t) => <Text strong>{t}</Text> },
        { title: "Ngân sách", dataIndex: "budget", key: "budget", render: (v) => formatCurrency(v), align: "right" },
        { title: "Đã chi", dataIndex: "spent", key: "spent", render: (v) => <Text style={{ color: "#1677ff" }}>{formatCurrency(v)}</Text>, align: "right" },
        {
            title: "Tỷ lệ sử dụng", dataIndex: "usage", key: "usage", width: 200,
            render: (v) => {
                let color = "#52c41a";
                if (v >= 100) color = "#ff4d4f";
                else if (v >= 90) color = "#ff4d4f";
                else if (v >= 80) color = "#faad14";
                return <Progress percent={v} size="small" strokeColor={color} />;
            },
            sorter: (a, b) => a.usage - b.usage,
            defaultSortOrder: "descend",
        },
        {
            title: "Ngưỡng", dataIndex: "level", key: "level",
            render: (l) => {
                const map = {
                    normal: { color: "green", text: "Bình thường" },
                    warning: { color: "orange", text: "≥80% - Cảnh báo" },
                    danger: { color: "red", text: "≥90% - Nguy hiểm" },
                    exceeded: { color: "magenta", text: "≥100% - Vượt NS" },
                };
                const item = map[l];
                return <Tag color={item.color}>{item.text}</Tag>;
            },
            filters: [
                { text: "Bình thường", value: "normal" },
                { text: "≥80% Cảnh báo", value: "warning" },
                { text: "≥90% Nguy hiểm", value: "danger" },
                { text: "Vượt ngân sách", value: "exceeded" },
            ],
            onFilter: (value, record) => record.level === value,
        },
    ];

    const userColumns = [
        { title: "Nhân viên", dataIndex: "name", key: "name", render: (t) => <Text strong>{t}</Text> },
        { title: "Bộ phận", dataIndex: "department", key: "department" },
        { title: "NS trần", dataIndex: "budgetCap", key: "budgetCap", render: (v) => formatFullCurrency(v), align: "right" },
        { title: "Đã dùng", dataIndex: "used", key: "used", render: (v) => <Text style={{ color: "#1677ff" }}>{formatFullCurrency(v)}</Text>, align: "right" },
        {
            title: "Tỷ lệ sử dụng", dataIndex: "usage", key: "usage", width: 180,
            render: (v) => {
                let color = "#52c41a";
                if (v >= 100) color = "#ff4d4f";
                else if (v >= 90) color = "#ff4d4f";
                else if (v >= 80) color = "#faad14";
                return <Progress percent={Math.min(v, 100)} size="small" strokeColor={color} format={() => `${v}%`} />;
            },
            sorter: (a, b) => a.usage - b.usage,
            defaultSortOrder: "descend",
        },
        {
            title: "Ngưỡng", dataIndex: "level", key: "level",
            render: (l) => {
                const map = {
                    normal: { color: "green", text: "Bình thường" },
                    warning: { color: "orange", text: "≥80%" },
                    danger: { color: "red", text: "≥90%" },
                    exceeded: { color: "magenta", text: "Hết NS" },
                };
                const item = map[l];
                return <Tag color={item.color}>{item.text}</Tag>;
            },
            filters: [
                { text: "Bình thường", value: "normal" },
                { text: "≥80% Cảnh báo", value: "warning" },
                { text: "≥90% Nguy hiểm", value: "danger" },
                { text: "Hết ngân sách", value: "exceeded" },
            ],
            onFilter: (value, record) => record.level === value,
        },
    ];

    return (
        <div>
            {/* Cấu hình ngưỡng */}
            <Card title={<><BellOutlined /> Cấu hình Cảnh báo Ngân sách</>} style={{ marginBottom: 16 }}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card size="small" style={{ borderColor: "#faad14" }}>
                            <Statistic title="Ngưỡng cảnh báo mức 1" value={80} suffix="%" valueStyle={{ color: "#faad14" }} prefix={<WarningOutlined />} />
                            <Text type="secondary">Gửi email thông báo</Text>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small" style={{ borderColor: "#ff4d4f" }}>
                            <Statistic title="Ngưỡng cảnh báo mức 2" value={90} suffix="%" valueStyle={{ color: "#ff4d4f" }} prefix={<CloseCircleOutlined />} />
                            <Text type="secondary">Gửi email + thông báo hệ thống</Text>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small" style={{ borderColor: "#ff4d4f" }}>
                            <Statistic title="Ngưỡng chặn đăng ký" value={100} suffix="%" valueStyle={{ color: "#ff4d4f" }} prefix={<CloseCircleOutlined />} />
                            <Text type="secondary">Chặn đăng ký + yêu cầu phê duyệt</Text>
                        </Card>
                    </Col>
                </Row>
            </Card>

            {/* Thống kê tổng quan theo ngưỡng */}
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={12}>
                    <Card title={<><ApartmentOutlined /> Phân bổ Đơn vị theo Ngưỡng</>} size="small">
                        <Row gutter={[16, 8]} style={{ marginBottom: 16 }}>
                            <Col span={6}><Card size="small" style={{ textAlign: "center", background: "#f6ffed", borderColor: "#b7eb8f" }}><Statistic title="Bình thường" value={deptNormal} valueStyle={{ color: "#52c41a" }} /></Card></Col>
                            <Col span={6}><Card size="small" style={{ textAlign: "center", background: "#fffbe6", borderColor: "#ffe58f" }}><Statistic title="≥80%" value={deptWarning} valueStyle={{ color: "#faad14" }} /></Card></Col>
                            <Col span={6}><Card size="small" style={{ textAlign: "center", background: "#fff2e8", borderColor: "#ffbb96" }}><Statistic title="≥90%" value={deptDanger} valueStyle={{ color: "#ff4d4f" }} /></Card></Col>
                            <Col span={6}><Card size="small" style={{ textAlign: "center", background: "#fff1f0", borderColor: "#ffa39e" }}><Statistic title="Vượt NS" value={deptExceeded} valueStyle={{ color: "#cf1322" }} /></Card></Col>
                        </Row>
                        {renderBar(deptNormal, deptTotal, "#52c41a", "Bình thường (<80%)")}
                        {renderBar(deptWarning, deptTotal, "#faad14", "Cảnh báo (80-89%)")}
                        {renderBar(deptDanger, deptTotal, "#ff4d4f", "Nguy hiểm (90-99%)")}
                        {renderBar(deptExceeded, deptTotal, "#cf1322", "Vượt ngân sách (≥100%)")}
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={<><UserOutlined /> Phân bổ Người dùng theo Ngưỡng</>} size="small">
                        <Row gutter={[16, 8]} style={{ marginBottom: 16 }}>
                            <Col span={6}><Card size="small" style={{ textAlign: "center", background: "#f6ffed", borderColor: "#b7eb8f" }}><Statistic title="Bình thường" value={userNormal} valueStyle={{ color: "#52c41a" }} /></Card></Col>
                            <Col span={6}><Card size="small" style={{ textAlign: "center", background: "#fffbe6", borderColor: "#ffe58f" }}><Statistic title="≥80%" value={userWarning} valueStyle={{ color: "#faad14" }} /></Card></Col>
                            <Col span={6}><Card size="small" style={{ textAlign: "center", background: "#fff2e8", borderColor: "#ffbb96" }}><Statistic title="≥90%" value={userDanger} valueStyle={{ color: "#ff4d4f" }} /></Card></Col>
                            <Col span={6}><Card size="small" style={{ textAlign: "center", background: "#fff1f0", borderColor: "#ffa39e" }}><Statistic title="Hết NS" value={userExceeded} valueStyle={{ color: "#cf1322" }} /></Card></Col>
                        </Row>
                        {renderBar(userNormal, userTotal, "#52c41a", "Bình thường (<80%)")}
                        {renderBar(userWarning, userTotal, "#faad14", "Cảnh báo (80-89%)")}
                        {renderBar(userDanger, userTotal, "#ff4d4f", "Nguy hiểm (90-99%)")}
                        {renderBar(userExceeded, userTotal, "#cf1322", "Hết ngân sách (≥100%)")}
                    </Card>
                </Col>
            </Row>

            {/* Bảng chi tiết đơn vị */}
            <Card title={<><BarChartOutlined /> Chi tiết Ngưỡng theo Đơn vị</>} style={{ marginBottom: 16 }}>
                <Table columns={deptColumns} dataSource={DEPT_THRESHOLD_DATA} pagination={false} size="small" />
            </Card>

            {/* Bảng chi tiết người dùng */}
            <Card title={<><TeamOutlined /> Chi tiết Ngưỡng theo Người dùng</>}>
                <Table columns={userColumns} dataSource={USER_THRESHOLD_DATA} pagination={{ pageSize: 10 }} size="small" />
            </Card>
        </div>
    );
};

// ============ MAIN PAGE ============
const BudgetManagementPage = () => {
    const tabItems = [
        {
            key: "overview",
            label: <><BankOutlined /> Tổng quan Ngân sách</>,
            children: <BudgetOverviewTab />,
        },
        {
            key: "per-learner",
            label: <><UserOutlined /> Ngân sách Cá nhân</>,
            children: <PerLearnerBudgetTab />,
        },
        {
            key: "internal-cost",
            label: <><CalculatorOutlined /> Chi phí KH Nội bộ</>,
            children: <InternalCourseCostTab />,
        },
        {
            key: "external-training",
            label: <><SendOutlined /> Đào tạo Bên ngoài</>,
            children: <ExternalTrainingTab />,
        },
        {
            key: "approval",
            label: <><CheckCircleOutlined /> Phê duyệt Bổ sung</>,
            children: <ApprovalWorkflowTab />,
        },
        {
            key: "alerts",
            label: <><BellOutlined /> Cảnh báo Ngân sách</>,
            children: <BudgetAlertTab />,
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0 }}>
                    <DollarOutlined /> VIII. Quản lý Chi phí & Ngân sách Đào tạo
                </Title>
                <Text type="secondary">
                    Phân hệ Quản lý Ngân sách Đào tạo - Khởi tạo, phân bổ, theo dõi và kiểm soát chi phí đào tạo theo năm, bộ phận và cá nhân
                </Text>
            </div>
            <Tabs defaultActiveKey="overview" items={tabItems} type="card" />
        </div>
    );
};

export default BudgetManagementPage;
