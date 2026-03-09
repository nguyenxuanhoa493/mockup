import React, { useState, useMemo } from "react";
import {
    Typography,
    Space,
    Card,
    Table,
    Tag,
    Select,
    Button,
    Row,
    Col,
    Statistic,
    Modal,
    Divider,
    message,
    Tabs,
    DatePicker,
} from "antd";
import {
    UserOutlined,
    TeamOutlined,
    UserDeleteOutlined,
    UserSwitchOutlined,
    DownloadOutlined,
    RiseOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    StopOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// Mock data - danh sách user
const generateUsers = () => {
    const statuses = ["active", "deactive", "delete"];
    const departments = ["Phòng Kinh doanh", "Phòng IT", "Phòng Nhân sự", "Phòng Marketing", "Phòng Kế toán", "Phòng Hành chính"];
    const names = [
        "Nguyễn Văn An", "Trần Thị Bình", "Lê Hoàng Cường", "Phạm Minh Đức", "Hoàng Thị Em",
        "Vũ Đình Phú", "Đặng Văn Giang", "Bùi Thị Hạnh", "Ngô Quang Huy", "Lý Thị Kim",
        "Trương Văn Long", "Đỗ Thị Mai", "Cao Văn Nam", "Đinh Thị Oanh", "Hà Văn Phong",
        "Lương Thị Quỳnh", "Tạ Văn Rạng", "Phan Thị Sen", "Dương Văn Tâm", "Mai Thị Uyên",
        "Nguyễn Hữu Vinh", "Trần Thị Xuân", "Lê Văn Yên", "Phạm Thị Zoan", "Hoàng Văn Bảo",
        "Vũ Thị Châu", "Đặng Văn Dũng", "Bùi Thị Ên", "Ngô Văn Phúc", "Lý Thị Hồng",
        "Trương Văn Khải", "Đỗ Thị Lan", "Cao Văn Minh", "Đinh Thị Ngọc", "Hà Văn Ơn",
        "Lương Thị Phượng", "Tạ Văn Quân", "Phan Thị Ry", "Dương Văn Sơn", "Mai Thị Tuyết",
        "Nguyễn Văn Uy", "Trần Thị Vân", "Lê Văn Xin", "Phạm Thị Yến", "Hoàng Văn Ẩn",
        "Vũ Thị Bé", "Đặng Văn Cảnh", "Bùi Thị Diệu", "Ngô Văn Ếch", "Lý Thị Gấm",
    ];

    const users = [];
    let id = 1;

    for (let month = 1; month <= 12; month++) {
        const countForMonth = 3 + Math.floor(Math.random() * 6);
        for (let i = 0; i < countForMonth; i++) {
            const nameIdx = (id - 1) % names.length;
            const status = statuses[Math.floor(Math.random() * 3)];
            const day = 1 + Math.floor(Math.random() * 27);
            const hour = Math.floor(Math.random() * 24);
            const min = Math.floor(Math.random() * 60);
            const createdMonth = 1 + Math.floor(Math.random() * month);
            const createdDay = 1 + Math.floor(Math.random() * 27);

            users.push({
                id,
                name: names[nameIdx],
                email: `user${id}@company.com`,
                department: departments[Math.floor(Math.random() * departments.length)],
                status,
                createdAt: `2025-${String(createdMonth).padStart(2, "0")}-${String(createdDay).padStart(2, "0")}`,
                updatedAt: `2025-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:00`,
                phone: `09${String(Math.floor(Math.random() * 100000000)).padStart(8, "0")}`,
            });
            id++;
        }
    }
    return users;
};

const allUsers = generateUsers();

const months = [
    { value: 1, label: "Tháng 1" }, { value: 2, label: "Tháng 2" }, { value: 3, label: "Tháng 3" },
    { value: 4, label: "Tháng 4" }, { value: 5, label: "Tháng 5" }, { value: 6, label: "Tháng 6" },
    { value: 7, label: "Tháng 7" }, { value: 8, label: "Tháng 8" }, { value: 9, label: "Tháng 9" },
    { value: 10, label: "Tháng 10" }, { value: 11, label: "Tháng 11" }, { value: 12, label: "Tháng 12" },
];

const statusMap = {
    active: { text: "Hoạt động", color: "green", icon: <CheckCircleOutlined /> },
    deactive: { text: "Ngưng hoạt động", color: "orange", icon: <CloseCircleOutlined /> },
    delete: { text: "Đã xóa", color: "red", icon: <StopOutlined /> },
};

function UserReportPage() {
    React.useEffect(() => {
        document.title = "Báo cáo User theo tháng - Mockup App";
    }, []);

    const [selectedYear, setSelectedYear] = useState(2025);
    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [exportMonth, setExportMonth] = useState(null);

    // Tính thống kê theo tháng
    const monthlyStats = useMemo(() => {
        const stats = [];
        let cumulative = 0;

        for (let m = 1; m <= 12; m++) {
            const usersInMonth = allUsers.filter((u) => {
                const updatedMonth = parseInt(u.updatedAt.split("-")[1]);
                return updatedMonth === m;
            });

            const active = usersInMonth.filter((u) => u.status === "active").length;
            const deactive = usersInMonth.filter((u) => u.status === "deactive").length;
            const deleted = usersInMonth.filter((u) => u.status === "delete").length;
            const total = usersInMonth.length;
            cumulative += total;

            stats.push({
                key: m,
                month: `Tháng ${m}`,
                monthNum: m,
                total,
                active,
                deactive,
                deleted,
                cumulative,
            });
        }
        return stats;
    }, []);

    // Tổng cộng
    const totalStats = useMemo(() => {
        const totalActive = allUsers.filter((u) => u.status === "active").length;
        const totalDeactive = allUsers.filter((u) => u.status === "deactive").length;
        const totalDeleted = allUsers.filter((u) => u.status === "delete").length;
        return { totalActive, totalDeactive, totalDeleted, total: allUsers.length };
    }, []);

    // Lấy users theo tháng cho export
    const getUsersByMonth = (month) => {
        return allUsers.filter((u) => {
            const updatedMonth = parseInt(u.updatedAt.split("-")[1]);
            return updatedMonth === month;
        });
    };

    // Columns cho bảng thống kê tổng quan
    const summaryColumns = [
        {
            title: "Tháng",
            dataIndex: "month",
            key: "month",
            width: 100,
            fixed: "left",
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: "Số lượng trong tháng",
            dataIndex: "total",
            key: "total",
            width: 150,
            align: "center",
            render: (val) => <Text strong style={{ fontSize: 16 }}>{val}</Text>,
        },
        {
            title: (
                <Space>
                    <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    <span>Active</span>
                </Space>
            ),
            dataIndex: "active",
            key: "active",
            width: 120,
            align: "center",
            render: (val) => <Tag color="green">{val}</Tag>,
        },
        {
            title: (
                <Space>
                    <CloseCircleOutlined style={{ color: "#faad14" }} />
                    <span>Deactive</span>
                </Space>
            ),
            dataIndex: "deactive",
            key: "deactive",
            width: 120,
            align: "center",
            render: (val) => <Tag color="orange">{val}</Tag>,
        },
        {
            title: (
                <Space>
                    <StopOutlined style={{ color: "#ff4d4f" }} />
                    <span>Delete</span>
                </Space>
            ),
            dataIndex: "deleted",
            key: "deleted",
            width: 120,
            align: "center",
            render: (val) => <Tag color="red">{val}</Tag>,
        },
        {
            title: (
                <Space>
                    <RiseOutlined style={{ color: "#1677ff" }} />
                    <span>Tích lũy</span>
                </Space>
            ),
            dataIndex: "cumulative",
            key: "cumulative",
            width: 120,
            align: "center",
            render: (val) => <Text strong style={{ color: "#1677ff", fontSize: 16 }}>{val}</Text>,
        },
        {
            title: "Thao tác",
            key: "action",
            width: 120,
            align: "center",
            render: (_, record) => (
                <Button
                    type="link"
                    icon={<DownloadOutlined />}
                    onClick={() => {
                        setExportMonth(record.monthNum);
                        setExportModalVisible(true);
                    }}
                >
                    Xuất chi tiết
                </Button>
            ),
        },
    ];

    // Columns cho bảng chi tiết user trong modal export
    const detailColumns = [
        {
            title: "STT",
            key: "stt",
            width: 60,
            align: "center",
            render: (_, __, idx) => idx + 1,
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
            width: 180,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 200,
        },
        {
            title: "Phòng ban",
            dataIndex: "department",
            key: "department",
            width: 160,
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: 130,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 150,
            filters: [
                { text: "Hoạt động", value: "active" },
                { text: "Ngưng hoạt động", value: "deactive" },
                { text: "Đã xóa", value: "delete" },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => {
                const s = statusMap[status];
                return (
                    <Tag color={s.color} icon={s.icon}>
                        {s.text}
                    </Tag>
                );
            },
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 120,
        },
        {
            title: "Cập nhật lần cuối",
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: 180,
            sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
        },
    ];

    // Data cho modal export preview
    const exportUsers = exportMonth ? getUsersByMonth(exportMonth) : [];
    const exportStats = exportMonth ? monthlyStats.find((s) => s.monthNum === exportMonth) : null;

    const handleExport = () => {
        message.success(`Đã xuất báo cáo Tháng ${exportMonth}/${selectedYear} thành công!`);
        setExportModalVisible(false);
    };

    const handleExportAll = () => {
        message.success(`Đã xuất báo cáo tất cả các tháng năm ${selectedYear} thành công!`);
    };

    // Tính tháng hiện tại stats
    const currentMonth = new Date().getMonth() + 1;
    const currentMonthStats = monthlyStats.find((s) => s.monthNum <= 12) || monthlyStats[monthlyStats.length - 1];
    const prevMonthStats = monthlyStats.length >= 2 ? monthlyStats[monthlyStats.length - 2] : null;

    return (
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                {/* Header */}
                <Card>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Title level={3} style={{ margin: 0 }}>
                                <TeamOutlined /> Báo cáo số User theo tháng
                            </Title>
                            <Text type="secondary">Thống kê số lượng tài khoản người dùng trong hệ thống theo từng tháng</Text>
                        </Col>
                        <Col>
                            <Space>
                                <Text strong>Năm:</Text>
                                <DatePicker
                                    picker="year"
                                    style={{ width: 120 }}
                                    defaultValue={null}
                                    placeholder="2025"
                                    onChange={(date) => setSelectedYear(date ? date.year() : 2025)}
                                />
                                <Button type="primary" icon={<DownloadOutlined />} onClick={handleExportAll}>
                                    Xuất tất cả
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>

                {/* Summary Cards */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Tổng User"
                                value={totalStats.total}
                                prefix={<TeamOutlined />}
                                valueStyle={{ color: "#1677ff" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Active"
                                value={totalStats.totalActive}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: "#52c41a" }}
                                suffix={
                                    <Text type="secondary" style={{ fontSize: 14 }}>
                                        ({((totalStats.totalActive / totalStats.total) * 100).toFixed(1)}%)
                                    </Text>
                                }
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Deactive"
                                value={totalStats.totalDeactive}
                                prefix={<CloseCircleOutlined />}
                                valueStyle={{ color: "#faad14" }}
                                suffix={
                                    <Text type="secondary" style={{ fontSize: 14 }}>
                                        ({((totalStats.totalDeactive / totalStats.total) * 100).toFixed(1)}%)
                                    </Text>
                                }
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Delete"
                                value={totalStats.totalDeleted}
                                prefix={<StopOutlined />}
                                valueStyle={{ color: "#ff4d4f" }}
                                suffix={
                                    <Text type="secondary" style={{ fontSize: 14 }}>
                                        ({((totalStats.totalDeleted / totalStats.total) * 100).toFixed(1)}%)
                                    </Text>
                                }
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Bảng thống kê theo tháng */}
                <Card title="Thống kê chi tiết theo tháng">
                    <Table
                        columns={summaryColumns}
                        dataSource={monthlyStats}
                        pagination={false}
                        bordered
                        size="middle"
                        scroll={{ x: 900 }}
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row style={{ background: "#fafafa" }}>
                                    <Table.Summary.Cell index={0}>
                                        <Text strong>Tổng cộng</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} align="center">
                                        <Text strong style={{ fontSize: 16 }}>{totalStats.total}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={2} align="center">
                                        <Tag color="green">{totalStats.totalActive}</Tag>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={3} align="center">
                                        <Tag color="orange">{totalStats.totalDeactive}</Tag>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={4} align="center">
                                        <Tag color="red">{totalStats.totalDeleted}</Tag>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={5} align="center">
                                        <Text strong style={{ color: "#1677ff", fontSize: 16 }}>
                                            {totalStats.total}
                                        </Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={6} />
                                </Table.Summary.Row>
                            </Table.Summary>
                        )}
                    />
                </Card>

                {/* Modal xuất chi tiết */}
                <Modal
                    title={
                        <Space>
                            <DownloadOutlined />
                            <span>Xuất báo cáo chi tiết - Tháng {exportMonth}/{selectedYear}</span>
                        </Space>
                    }
                    open={exportModalVisible}
                    onCancel={() => setExportModalVisible(false)}
                    width={1200}
                    footer={[
                        <Button key="cancel" onClick={() => setExportModalVisible(false)}>
                            Đóng
                        </Button>,
                        <Button key="export" type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
                            Xuất Excel
                        </Button>,
                    ]}
                >
                    {exportStats && (
                        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                            {/* Mô tả cấu trúc file export */}
                            <Card size="small" style={{ background: "#f6ffed", border: "1px solid #b7eb8f" }}>
                                <Text>
                                    <strong>Cấu trúc file xuất:</strong> Mỗi tháng = 1 Sheet. Mỗi Sheet gồm 2 bảng:
                                    <strong> Bảng 1</strong> - Thống kê tổng quan |
                                    <strong> Bảng 2</strong> - Chi tiết user theo trạng thái và thời gian cập nhật
                                </Text>
                            </Card>

                            {/* Bảng 1: Thống kê */}
                            <Card
                                title={<Text strong>Bảng 1: Thống kê tổng quan - Tháng {exportMonth}</Text>}
                                size="small"
                            >
                                <Row gutter={[16, 16]}>
                                    <Col span={6}>
                                        <Statistic title="Tổng trong tháng" value={exportStats.total} valueStyle={{ color: "#1677ff" }} />
                                    </Col>
                                    <Col span={6}>
                                        <Statistic title="Active" value={exportStats.active} valueStyle={{ color: "#52c41a" }} />
                                    </Col>
                                    <Col span={6}>
                                        <Statistic title="Deactive" value={exportStats.deactive} valueStyle={{ color: "#faad14" }} />
                                    </Col>
                                    <Col span={6}>
                                        <Statistic title="Đã xóa" value={exportStats.deleted} valueStyle={{ color: "#ff4d4f" }} />
                                    </Col>
                                </Row>
                                <Divider />
                                <Statistic
                                    title="Số lượng tích lũy đến tháng này"
                                    value={exportStats.cumulative}
                                    prefix={<RiseOutlined />}
                                    valueStyle={{ color: "#1677ff" }}
                                />
                            </Card>

                            {/* Bảng 2: Chi tiết */}
                            <Card
                                title={<Text strong>Bảng 2: Chi tiết user - Tháng {exportMonth}</Text>}
                                size="small"
                            >
                                <Tabs
                                    defaultActiveKey="all"
                                    items={[
                                        {
                                            key: "all",
                                            label: `Tất cả (${exportUsers.length})`,
                                            children: (
                                                <Table
                                                    columns={detailColumns}
                                                    dataSource={exportUsers}
                                                    rowKey="id"
                                                    pagination={{ pageSize: 10 }}
                                                    size="small"
                                                    scroll={{ x: 1100 }}
                                                />
                                            ),
                                        },
                                        {
                                            key: "active",
                                            label: (
                                                <span>
                                                    <Tag color="green" style={{ marginRight: 4 }}>Active</Tag>
                                                    ({exportUsers.filter((u) => u.status === "active").length})
                                                </span>
                                            ),
                                            children: (
                                                <Table
                                                    columns={detailColumns}
                                                    dataSource={exportUsers.filter((u) => u.status === "active")}
                                                    rowKey="id"
                                                    pagination={{ pageSize: 10 }}
                                                    size="small"
                                                    scroll={{ x: 1100 }}
                                                />
                                            ),
                                        },
                                        {
                                            key: "deactive",
                                            label: (
                                                <span>
                                                    <Tag color="orange" style={{ marginRight: 4 }}>Deactive</Tag>
                                                    ({exportUsers.filter((u) => u.status === "deactive").length})
                                                </span>
                                            ),
                                            children: (
                                                <Table
                                                    columns={detailColumns}
                                                    dataSource={exportUsers.filter((u) => u.status === "deactive")}
                                                    rowKey="id"
                                                    pagination={{ pageSize: 10 }}
                                                    size="small"
                                                    scroll={{ x: 1100 }}
                                                />
                                            ),
                                        },
                                        {
                                            key: "delete",
                                            label: (
                                                <span>
                                                    <Tag color="red" style={{ marginRight: 4 }}>Delete</Tag>
                                                    ({exportUsers.filter((u) => u.status === "delete").length})
                                                </span>
                                            ),
                                            children: (
                                                <Table
                                                    columns={detailColumns}
                                                    dataSource={exportUsers.filter((u) => u.status === "delete")}
                                                    rowKey="id"
                                                    pagination={{ pageSize: 10 }}
                                                    size="small"
                                                    scroll={{ x: 1100 }}
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            </Card>
                        </Space>
                    )}
                </Modal>
            </Space>
        </div>
    );
}

export default UserReportPage;
