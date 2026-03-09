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
    Segmented,
    Tooltip,
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
    TableOutlined,
    BarChartOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// Mock data - danh sách user
const { RangePicker } = DatePicker;

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
    const years = [2024, 2025, 2026];

    const addUsers = (year, month, count, status) => {
        for (let i = 0; i < count; i++) {
            const nameIdx = (id - 1) % names.length;
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
                createdAt: `${year}-${String(createdMonth).padStart(2, "0")}-${String(createdDay).padStart(2, "0")}`,
                updatedAt: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:00`,
                phone: `09${String(Math.floor(Math.random() * 100000000)).padStart(8, "0")}`,
            });
            id++;
        }
    };

    for (const year of years) {
        for (let month = 1; month <= 12; month++) {
            const activeCount = 50 + Math.floor(Math.random() * 51); // 50-100
            const deactiveCount = 3 + Math.floor(Math.random() * 8); // 3-10
            const deleteCount = 1 + Math.floor(Math.random() * 5);  // 1-5
            addUsers(year, month, activeCount, "active");
            addUsers(year, month, deactiveCount, "deactive");
            addUsers(year, month, deleteCount, "delete");
        }
    }
    return users;
};

const allUsers = generateUsers();

// Helper: tạo danh sách các tháng giữa 2 mốc (year-month)
const getMonthsBetween = (startYear, startMonth, endYear, endMonth) => {
    const result = [];
    let y = startYear;
    let m = startMonth;
    while (y < endYear || (y === endYear && m <= endMonth)) {
        result.push({ year: y, month: m });
        m++;
        if (m > 12) { m = 1; y++; }
    }
    return result;
};

const formatMonthLabel = (year, month) => `T${month}/${year}`;

const statusMap = {
    active: { text: "Hoạt động", color: "green", icon: <CheckCircleOutlined /> },
    deactive: { text: "Ngưng hoạt động", color: "orange", icon: <CloseCircleOutlined /> },
    delete: { text: "Đã xóa", color: "red", icon: <StopOutlined /> },
};

function UserReportPage() {
    React.useEffect(() => {
        document.title = "Báo cáo User theo tháng - Mockup App";
    }, []);

    // Default: 6 tháng gần nhất
    const [monthRange, setMonthRange] = useState(null);
    const [exportModalVisible, setExportModalVisible] = useState(false);
    const [exportMonthKey, setExportMonthKey] = useState(null); // "2025-03"
    const [viewMode, setViewMode] = useState("chart"); // "table" | "chart"

    // Danh sách tháng trong khoảng chọn
    const selectedMonths = useMemo(() => {
        if (!monthRange || !monthRange[0] || !monthRange[1]) {
            // Default: 01/2025 -> 12/2025
            return getMonthsBetween(2025, 1, 2025, 12);
        }
        const start = monthRange[0];
        const end = monthRange[1];
        return getMonthsBetween(start.year(), start.month() + 1, end.year(), end.month() + 1);
    }, [monthRange]);

    // Tính thống kê theo tháng
    // Tích lũy tháng trước kỳ = 100, tích lũy = tích lũy trước + active - deactive - delete
    const monthlyStats = useMemo(() => {
        const stats = [];
        let cumulative = 100;

        for (const { year, month } of selectedMonths) {
            const usersInMonth = allUsers.filter((u) => {
                const parts = u.updatedAt.split("-");
                const uYear = parseInt(parts[0]);
                const uMonth = parseInt(parts[1]);
                return uYear === year && uMonth === month;
            });

            const active = usersInMonth.filter((u) => u.status === "active").length;
            const deactive = usersInMonth.filter((u) => u.status === "deactive").length;
            const deleted = usersInMonth.filter((u) => u.status === "delete").length;
            cumulative = cumulative + active - deactive - deleted;

            stats.push({
                key: `${year}-${month}`,
                month: formatMonthLabel(year, month),
                year,
                monthNum: month,
                active,
                deactive,
                deleted,
                cumulative,
            });
        }
        return stats;
    }, [selectedMonths]);

    // Tổng cộng trong khoảng
    const totalStats = useMemo(() => {
        const totalActive = monthlyStats.reduce((s, m) => s + m.active, 0);
        const totalDeactive = monthlyStats.reduce((s, m) => s + m.deactive, 0);
        const totalDeleted = monthlyStats.reduce((s, m) => s + m.deleted, 0);
        const lastCumulative = monthlyStats.length > 0 ? monthlyStats[monthlyStats.length - 1].cumulative : 100;
        return { totalActive, totalDeactive, totalDeleted, lastCumulative };
    }, [monthlyStats]);

    // Lấy users theo tháng cho export
    const getUsersByMonthKey = (key) => {
        const [y, m] = key.split("-").map(Number);
        return allUsers.filter((u) => {
            const parts = u.updatedAt.split("-");
            return parseInt(parts[0]) === y && parseInt(parts[1]) === m;
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
                    <span>Số user active hiện tại</span>
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
                        setExportMonthKey(record.key);
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
    const exportUsers = exportMonthKey ? getUsersByMonthKey(exportMonthKey) : [];
    const exportStats = exportMonthKey ? monthlyStats.find((s) => s.key === exportMonthKey) : null;
    const exportLabel = exportStats ? exportStats.month : "";

    const handleExport = () => {
        message.success(`Đã xuất báo cáo ${exportLabel} thành công!`);
        setExportModalVisible(false);
    };

    const rangeLabel = useMemo(() => {
        if (selectedMonths.length === 0) return "";
        const first = selectedMonths[0];
        const last = selectedMonths[selectedMonths.length - 1];
        return `${formatMonthLabel(first.year, first.month)} → ${formatMonthLabel(last.year, last.month)}`;
    }, [selectedMonths]);

    const handleExportAll = () => {
        message.success(`Đã xuất báo cáo ${rangeLabel} thành công!`);
    };

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
                                <Text strong>Khoảng thời gian:</Text>
                                <RangePicker
                                    picker="month"
                                    style={{ width: 280 }}
                                    placeholder={["Từ tháng", "Đến tháng"]}
                                    onChange={(dates) => setMonthRange(dates)}
                                    value={monthRange}
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
                                title="Số user active hiện tại"
                                value={totalStats.lastCumulative}
                                prefix={<TeamOutlined />}
                                valueStyle={{ color: "#1677ff" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Tổng Active trong kỳ"
                                value={totalStats.totalActive}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: "#52c41a" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Tổng Deactive trong kỳ"
                                value={totalStats.totalDeactive}
                                prefix={<CloseCircleOutlined />}
                                valueStyle={{ color: "#faad14" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Tổng Delete trong kỳ"
                                value={totalStats.totalDeleted}
                                prefix={<StopOutlined />}
                                valueStyle={{ color: "#ff4d4f" }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Bảng thống kê theo tháng */}
                <Card
                    title="Thống kê chi tiết theo tháng"
                    extra={
                        <Segmented
                            value={viewMode}
                            onChange={setViewMode}
                            options={[
                                { value: "table", icon: <TableOutlined /> },
                                { value: "chart", icon: <BarChartOutlined /> },
                            ]}
                        />
                    }
                >
                    {viewMode === "table" ? (
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
                                            <Tag color="green">{totalStats.totalActive}</Tag>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} align="center">
                                            <Tag color="orange">{totalStats.totalDeactive}</Tag>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={3} align="center">
                                            <Tag color="red">{totalStats.totalDeleted}</Tag>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={4} align="center">
                                            <Text strong style={{ color: "#1677ff", fontSize: 16 }}>
                                                {totalStats.lastCumulative}
                                            </Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={5} />
                                    </Table.Summary.Row>
                                </Table.Summary>
                            )}
                        />
                    ) : (
                        <div>
                            {/* Legend */}
                            <div style={{ display: "flex", gap: 24, marginBottom: 16, justifyContent: "center" }}>
                                <Space><span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 2, background: "#52c41a" }} /> <Text>Active</Text></Space>
                                <Space><span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 2, background: "#faad14" }} /> <Text>Deactive</Text></Space>
                                <Space><span style={{ display: "inline-block", width: 12, height: 12, borderRadius: 2, background: "#ff4d4f" }} /> <Text>Delete</Text></Space>
                                <Space><span style={{ display: "inline-block", width: 20, height: 3, borderRadius: 2, background: "#1677ff" }} /> <Text>Số user active hiện tại</Text></Space>
                            </div>
                            {/* Stacked Bar + Line chart */}
                            {(() => {
                                const maxStack = Math.max(...monthlyStats.map((s) => s.active + s.deactive + s.deleted));
                                const minCum = Math.min(...monthlyStats.map((s) => s.cumulative));
                                const maxCum = Math.max(...monthlyStats.map((s) => s.cumulative));
                                const cumPad = Math.max(Math.round((maxCum - minCum) * 0.1), 1);
                                const cumMin = minCum - cumPad;
                                const cumMax = maxCum + cumPad;
                                const cumRange = cumMax - cumMin || 1;
                                const chartH = 300;
                                const n = monthlyStats.length;

                                // Ticks trục trái (bar)
                                const tickCount = 5;
                                const barStep = Math.ceil(maxStack / tickCount) || 1;
                                const leftTicks = [];
                                for (let i = 0; i <= tickCount; i++) {
                                    const val = barStep * i;
                                    if (val <= maxStack + barStep) leftTicks.push(val);
                                }

                                // Ticks trục phải (line)
                                const cumStep = Math.ceil((maxCum - minCum) / tickCount) || 1;
                                const rightTicks = [];
                                for (let i = 0; i <= tickCount; i++) {
                                    const val = minCum + cumStep * i;
                                    if (val <= cumMax) rightTicks.push(val);
                                }

                                // Line points
                                const linePoints = monthlyStats.map((s, i) => {
                                    const x = ((i + 0.5) / n) * 100;
                                    const y = chartH - ((s.cumulative - cumMin) / cumRange) * (chartH - 20);
                                    return { x, y, cumulative: s.cumulative, month: s.month };
                                });

                                return (
                                    <div style={{ display: "flex", gap: 0 }}>
                                        {/* Left Y axis (bar) */}
                                        <div style={{ width: 45, height: chartH, position: "relative", flexShrink: 0 }}>
                                            {leftTicks.map((val) => {
                                                const y = chartH - (val / maxStack) * (chartH * 0.9);
                                                return (
                                                    <Text key={val} style={{ position: "absolute", left: 0, top: y - 8, fontSize: 11, color: "#333", whiteSpace: "nowrap" }}>
                                                        {val}
                                                    </Text>
                                                );
                                            })}
                                        </div>
                                        {/* Chart area */}
                                        <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
                                            {/* Stacked bars */}
                                            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: chartH, padding: "0 8px" }}>
                                                {monthlyStats.map((s) => {
                                                    const stackTotal = s.active + s.deactive + s.deleted;
                                                    const barTotalH = (stackTotal / maxStack) * chartH * 0.9;
                                                    const activeH = stackTotal ? (s.active / stackTotal) * barTotalH : 0;
                                                    const deactiveH = stackTotal ? (s.deactive / stackTotal) * barTotalH : 0;
                                                    const deleteH = stackTotal ? (s.deleted / stackTotal) * barTotalH : 0;
                                                    return (
                                                        <div key={s.key} style={{ flex: 1, minWidth: 28, display: "flex", justifyContent: "center", height: "100%", alignItems: "flex-end" }}>
                                                            <Tooltip title={<div><div>Active: {s.active}</div><div>Deactive: {s.deactive}</div><div>Delete: {s.deleted}</div></div>}>
                                                                <div style={{ width: 36, cursor: "pointer", display: "flex", flexDirection: "column" }}>
                                                                    <div style={{ height: activeH, background: "#52c41a", borderRadius: "3px 3px 0 0", minHeight: s.active ? 2 : 0 }} />
                                                                    <div style={{ height: deactiveH, background: "#faad14", minHeight: s.deactive ? 2 : 0 }} />
                                                                    <div style={{ height: deleteH, background: "#ff4d4f", minHeight: s.deleted ? 2 : 0 }} />
                                                                </div>
                                                            </Tooltip>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {/* Line overlay */}
                                            <svg style={{ position: "absolute", top: 0, left: 8, width: "calc(100% - 16px)", height: chartH, pointerEvents: "none", overflow: "visible" }}>
                                                {linePoints.map((p, i) => {
                                                    if (i === 0) return null;
                                                    const prev = linePoints[i - 1];
                                                    return <line key={i} x1={`${prev.x}%`} y1={prev.y} x2={`${p.x}%`} y2={p.y} stroke="#1677ff" strokeWidth={2.5} />;
                                                })}
                                                {linePoints.map((p, i) => (
                                                    <Tooltip key={i} title={`${p.month}: ${p.cumulative}`}>
                                                        <circle cx={`${p.x}%`} cy={p.y} r={4} fill="#fff" stroke="#1677ff" strokeWidth={2} style={{ pointerEvents: "all", cursor: "pointer" }} />
                                                    </Tooltip>
                                                ))}
                                            </svg>
                                            {/* X labels */}
                                            <div style={{ display: "flex", gap: 4, padding: "6px 8px 0", height: 24 }}>
                                                {monthlyStats.map((s) => (
                                                    <div key={s.key} style={{ flex: 1, minWidth: 28, textAlign: "center" }}>
                                                        <Text style={{ fontSize: 11, whiteSpace: "nowrap" }}>{s.month}</Text>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Right Y axis */}
                                        <div style={{ width: 55, height: chartH, position: "relative", flexShrink: 0 }}>
                                            {rightTicks.map((val) => {
                                                const y = chartH - ((val - cumMin) / cumRange) * (chartH - 20);
                                                return (
                                                    <Text key={val} style={{ position: "absolute", right: 0, top: y - 8, fontSize: 11, color: "#1677ff", whiteSpace: "nowrap" }}>
                                                        {val}
                                                    </Text>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    )}
                </Card>

                {/* Modal xuất chi tiết */}
                <Modal
                    title={
                        <Space>
                            <DownloadOutlined />
                            <span>Xuất báo cáo chi tiết - {exportLabel}</span>
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
                                title={<Text strong>Bảng 1: Thống kê tổng quan - {exportLabel}</Text>}
                                size="small"
                            >
                                <Row gutter={[16, 16]}>
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
                                    title="Số user active hiện tại"
                                    value={exportStats.cumulative}
                                    prefix={<RiseOutlined />}
                                    valueStyle={{ color: "#1677ff" }}
                                />
                            </Card>

                            {/* Bảng 2: Chi tiết */}
                            <Card
                                title={<Text strong>Bảng 2: Chi tiết user - {exportLabel}</Text>}
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
