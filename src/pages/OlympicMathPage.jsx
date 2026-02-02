import React, { useState } from "react";
import {
    Card,
    Typography,
    Button,
    Steps,
    Form,
    Input,
    Select,
    Table,
    Tag,
    Space,
    Tabs,
    Progress,
    Modal,
    Result,
    Alert,
    Statistic,
    Row,
    Col,
    Badge,
    Divider,
    Avatar,
    List,
    Descriptions,
    message,
} from "antd";
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    BankOutlined,
    TeamOutlined,
    TrophyOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    LockOutlined,
    PlayCircleOutlined,
    CrownOutlined,
    DollarOutlined,
    SafetyCertificateOutlined,
    EnvironmentOutlined,
    NumberOutlined,
    HistoryOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const provinces = [
    "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ",
    "Bình Dương", "Đồng Nai", "Nghệ An", "Thanh Hóa", "Bắc Ninh"
];

const schools = {
    "Hà Nội": ["THCS Chu Văn An", "THCS Trưng Vương", "THCS Giảng Võ", "THCS Lê Quý Đôn"],
    "TP. Hồ Chí Minh": ["THCS Trần Văn Ơn", "THCS Lê Văn Tám", "THCS Nguyễn Du"],
    "Đà Nẵng": ["THCS Nguyễn Tri Phương", "THCS Hoàng Hoa Thám"],
};

const grades = ["Khối 6", "Khối 7", "Khối 8", "Khối 9"];
const classes = ["6A1", "6A2", "7A1", "7A2", "8A1", "8A2", "9A1", "9A2"];

const wards = ["Phường Văn Miếu", "Phường Trung Tự", "Phường Kim Liên", "Phường Phương Liên", "Xã Đông Ngạc", "Xã Xuân Đỉnh"];

const mockStudentRanking = [
    { key: 1, rank: 1, name: "Nguyễn Văn A", school: "THCS Chu Văn An", ward: "Phường Văn Miếu", grade: "Khối 8", score: 98, time: "15:23", round: 1 },
    { key: 2, rank: 2, name: "Trần Thị B", school: "THCS Trưng Vương", ward: "Phường Trung Tự", grade: "Khối 9", score: 95, time: "18:45", round: 1 },
    { key: 3, rank: 3, name: "Lê Văn C", school: "THCS Trần Văn Ơn", ward: "Phường Kim Liên", grade: "Khối 7", score: 92, time: "20:12", round: 1 },
    { key: 4, rank: 4, name: "Phạm Thị D", school: "THCS Giảng Võ", ward: "Phường Phương Liên", grade: "Khối 8", score: 90, time: "22:30", round: 1 },
    { key: 5, rank: 5, name: "Hoàng Văn E", school: "THCS Lê Quý Đôn", ward: "Xã Đông Ngạc", grade: "Khối 6", score: 88, time: "19:50", round: 1 },
    { key: 6, rank: 6, name: "Vũ Thị K", school: "THCS Chu Văn An", ward: "Phường Văn Miếu", grade: "Khối 6", score: 85, time: "21:10", round: 1 },
    { key: 7, rank: 7, name: "Đỗ Văn L", school: "THCS Trưng Vương", ward: "Phường Trung Tự", grade: "Khối 7", score: 83, time: "23:05", round: 1 },
    { key: 8, rank: 1, name: "Trần Minh F", school: "THCS Chu Văn An", ward: "Phường Văn Miếu", grade: "Khối 9", score: 96, time: "14:30", round: 2 },
    { key: 9, rank: 2, name: "Lê Thị G", school: "THCS Trưng Vương", ward: "Phường Trung Tự", grade: "Khối 8", score: 94, time: "16:20", round: 2 },
    { key: 10, rank: 3, name: "Nguyễn Văn H", school: "THCS Giảng Võ", ward: "Phường Phương Liên", grade: "Khối 9", score: 91, time: "18:15", round: 2 },
];

const mockSchoolRanking = [
    { key: 1, rank: 1, school: "THCS Chu Văn An", ward: "Phường Văn Miếu", grade: "Khối 8", students: 45, avgScore: 85.5, round: 1 },
    { key: 2, rank: 2, school: "THCS Trưng Vương", ward: "Phường Trung Tự", grade: "Khối 9", students: 38, avgScore: 82.3, round: 1 },
    { key: 3, rank: 3, school: "THCS Trần Văn Ơn", ward: "Phường Kim Liên", grade: "Khối 7", students: 52, avgScore: 80.1, round: 1 },
    { key: 4, rank: 4, school: "THCS Giảng Võ", ward: "Phường Phương Liên", grade: "Khối 8", students: 30, avgScore: 78.9, round: 1 },
    { key: 5, rank: 5, school: "THCS Lê Quý Đôn", ward: "Xã Đông Ngạc", grade: "Khối 6", students: 28, avgScore: 76.5, round: 1 },
    { key: 6, rank: 1, school: "THCS Chu Văn An", ward: "Phường Văn Miếu", grade: "Khối 9", students: 40, avgScore: 88.2, round: 2 },
    { key: 7, rank: 2, school: "THCS Trưng Vương", ward: "Phường Trung Tự", grade: "Khối 8", students: 35, avgScore: 85.1, round: 2 },
];

const mockAttempts = [
    { key: 1, attempt: 1, date: "15/01/2026 09:30", score: 75, time: "25:30", status: "completed" },
    { key: 2, attempt: 2, date: "16/01/2026 14:15", score: 82, time: "22:45", status: "completed" },
    { key: 3, attempt: 3, date: null, score: null, time: null, status: "available" },
];

function RegistrationForm({ onComplete }) {
    const [form] = Form.useForm();
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            message.success("Đăng ký thành công!");
            onComplete(values);
        }, 1500);
    };

    return (
        <Card>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
                <Avatar size={80} style={{ backgroundColor: "#1677ff", marginBottom: 16 }}>
                    <TrophyOutlined style={{ fontSize: 40 }} />
                </Avatar>
                <Title level={2} style={{ marginBottom: 8 }}>
                    Olympic Toán Tuổi Thơ 2026
                </Title>
                <Text type="secondary">Đăng ký tài khoản để tham gia cuộc thi</Text>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                size="large"
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="fullName"
                            label="Họ và tên"
                            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: "Vui lòng nhập email" },
                                { type: "email", message: "Email không hợp lệ" }
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Nhập email" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                        >
                            <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="province"
                            label="Tỉnh/Thành phố"
                            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
                        >
                            <Select
                                placeholder="Chọn tỉnh/thành phố"
                                onChange={setSelectedProvince}
                                suffixIcon={<EnvironmentOutlined />}
                            >
                                {provinces.map(p => <Option key={p} value={p}>{p}</Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="school"
                            label="Trường"
                            rules={[{ required: true, message: "Vui lòng chọn trường" }]}
                        >
                            <Select
                                placeholder="Chọn trường"
                                disabled={!selectedProvince}
                                suffixIcon={<BankOutlined />}
                            >
                                {(schools[selectedProvince] || []).map(s => (
                                    <Option key={s} value={s}>{s}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="grade"
                            label="Khối"
                            rules={[{ required: true, message: "Chọn khối" }]}
                        >
                            <Select placeholder="Chọn khối">
                                {grades.map(g => <Option key={g} value={g}>{g}</Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="class"
                            label="Lớp"
                            rules={[{ required: true, message: "Chọn lớp" }]}
                        >
                            <Select placeholder="Chọn lớp">
                                {classes.map(c => <Option key={c} value={c}>{c}</Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Đăng ký tài khoản
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

function RoundCard({ round, status, onAction, onSimulateComplete, onSimulatePractice, onViewHistory }) {
    const statusConfig = {
        locked: { color: "#bfbfbf", bg: "#f5f5f5", icon: <LockOutlined />, text: "🔒 Chưa mở" },
        notPaid: { color: "#fa8c16", bg: "linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)", icon: <DollarOutlined />, text: "💳 Chưa thanh toán" },
        practice: { color: "#722ed1", bg: "linear-gradient(135deg, #722ed1 0%, #b37feb 100%)", icon: <PlayCircleOutlined />, text: "📝 Thi thử" },
        attempt1: { color: "#1890ff", bg: "linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)", icon: <PlayCircleOutlined />, text: "🎯 Lần thi 1" },
        attempt2: { color: "#1890ff", bg: "linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)", icon: <PlayCircleOutlined />, text: "🎯 Lần thi 2" },
        attempt3: { color: "#1890ff", bg: "linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)", icon: <PlayCircleOutlined />, text: "🎯 Lần thi 3" },
        available: { color: "#1890ff", bg: "linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)", icon: <PlayCircleOutlined />, text: "🚀 Sẵn sàng" },
        inProgress: { color: "#fa8c16", bg: "linear-gradient(135deg, #fa8c16 0%, #fadb14 100%)", icon: <ClockCircleOutlined />, text: "⏱️ Đang thi" },
        completed: { color: "#52c41a", bg: "linear-gradient(135deg, #52c41a 0%, #95de64 100%)", icon: <CheckCircleOutlined />, text: "✅ Hoàn thành" },
        notQualified: { color: "#ff4d4f", bg: "#fff2f0", icon: <LockOutlined />, text: "❌ Chưa đủ điều kiện" },
    };

    const config = statusConfig[status] || statusConfig.locked;
    const isActive = ["available", "attempt1", "attempt2", "attempt3", "practice"].includes(status);
    const isCompleted = status === "completed";
    const isNotPaid = status === "notPaid";
    const isPractice = round.isPractice;

    const roundIcons = {
        0: "✏️",
        1: "📚",
        2: "🏫",
        3: "🎓",
    };

    const roundColors = {
        0: { primary: "#722ed1", secondary: "#b37feb", bg: "linear-gradient(135deg, #722ed1 0%, #b37feb 100%)" },
        1: { primary: "#1890ff", secondary: "#36cfc9", bg: "linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)" },
        2: { primary: "#fa8c16", secondary: "#fadb14", bg: "linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)" },
        3: { primary: "#52c41a", secondary: "#95de64", bg: "linear-gradient(135deg, #52c41a 0%, #95de64 100%)" },
    };

    const colors = roundColors[round.number] || roundColors[1];

    return (
        <Card
            style={{
                marginBottom: 20,
                borderRadius: 20,
                overflow: "hidden",
                border: isActive ? `3px solid ${colors.primary}` : isCompleted ? "3px solid #52c41a" : isNotPaid ? "3px solid #fa8c16" : "2px solid #f0f0f0",
                boxShadow: isActive ? `0 8px 24px ${colors.primary}40` : isNotPaid ? "0 8px 24px #fa8c1640" : "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                opacity: status === "locked" ? 0.7 : 1,
            }}
            styles={{
                body: { padding: 0 }
            }}
        >
            <div style={{ display: "flex" }}>
                {/* Left side - Round number with gradient */}
                <div
                    style={{
                        width: 140,
                        background: status === "locked" ? "#f5f5f5" : isCompleted ? "linear-gradient(135deg, #52c41a 0%, #95de64 100%)" : isNotPaid ? "linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)" : colors.bg,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px 16px",
                        position: "relative",
                    }}
                >
                    <div style={{ fontSize: 48, marginBottom: 8 }}>
                        {isCompleted ? "🎉" : roundIcons[round.number]}
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            fontWeight: 800,
                            color: status === "locked" ? "#bfbfbf" : "#fff",
                            textShadow: status === "locked" ? "none" : "0 2px 4px rgba(0,0,0,0.2)",
                        }}
                    >
                        V{round.number}
                    </div>
                    {isActive && (
                        <div
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                background: "#52c41a",
                                boxShadow: "0 0 8px #52c41a",
                                animation: "pulse 2s infinite",
                            }}
                        />
                    )}
                </div>

                {/* Right side - Content */}
                <div style={{ flex: 1, padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                            <Title level={3} style={{ marginBottom: 4, color: status === "locked" ? "#bfbfbf" : "#262626" }}>
                                {round.title}
                            </Title>
                            <Text style={{ color: "#8c8c8c", fontSize: 14 }}>
                                {round.description}
                            </Text>
                        </div>
                        <Tag
                            style={{
                                borderRadius: 20,
                                padding: "4px 16px",
                                fontSize: 14,
                                fontWeight: 600,
                                border: "none",
                                background: isActive ? colors.bg : 
                                    isCompleted ? "linear-gradient(135deg, #52c41a 0%, #95de64 100%)" : 
                                    isNotPaid ? "linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)" : 
                                    "#f5f5f5",
                                color: status === "locked" ? "#bfbfbf" : "#fff",
                            }}
                        >
                            {config.text}
                        </Tag>
                    </div>

                    {/* Requirements as colorful chips */}
                    {round.requirements && (
                        <div style={{ marginBottom: 16 }}>
                            <Space wrap>
                                {round.requirements.map((req, idx) => (
                                    <Tag
                                        key={idx}
                                        style={{
                                            borderRadius: 12,
                                            padding: "6px 12px",
                                            background: status === "locked" ? "#fafafa" : `${colors.primary}15`,
                                            border: `1px solid ${status === "locked" ? "#f0f0f0" : colors.primary}30`,
                                            color: status === "locked" ? "#bfbfbf" : colors.primary,
                                            fontSize: 13,
                                        }}
                                    >
                                        {idx === 0 ? "💰" : idx === 1 ? "🎯" : "⭐"} {req}
                                    </Tag>
                                ))}
                            </Space>
                        </div>
                    )}

                    {round.note && (
                        <Alert
                            type="warning"
                            message={
                                <span style={{ fontSize: 13 }}>
                                    📍 {round.note}
                                </span>
                            }
                            style={{
                                marginBottom: 16,
                                borderRadius: 12,
                                border: "none",
                                background: "#fff7e6",
                            }}
                        />
                    )}

                    {/* Scores display for attempts */}
                    {round.attemptScores && status !== "notPaid" && status !== "locked" && (
                        <div style={{ 
                            background: "#f8fafc", 
                            borderRadius: 16, 
                            padding: 16, 
                            marginTop: 8,
                            marginBottom: 8,
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                                {/* Individual attempt scores */}
                                <div style={{ display: "flex", gap: 12 }}>
                                    {round.attemptScores.map((score, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                padding: "8px 16px",
                                                borderRadius: 12,
                                                background: score !== null 
                                                    ? (score === round.highestScore ? "linear-gradient(135deg, #52c41a 0%, #95de64 100%)" : "#fff")
                                                    : "#f5f5f5",
                                                border: score !== null 
                                                    ? (score === round.highestScore ? "2px solid #52c41a" : "1px solid #e8e8e8")
                                                    : "1px dashed #d9d9d9",
                                                minWidth: 70,
                                            }}
                                        >
                                            <Text style={{ 
                                                fontSize: 11, 
                                                color: score === round.highestScore ? "#fff" : "#8c8c8c",
                                                marginBottom: 2,
                                            }}>
                                                Lần {idx + 1}
                                            </Text>
                                            <div style={{ 
                                                fontSize: 20, 
                                                fontWeight: 700, 
                                                color: score !== null 
                                                    ? (score === round.highestScore ? "#fff" : colors.primary)
                                                    : "#bfbfbf",
                                            }}>
                                                {score !== null ? score : "—"}
                                            </div>
                                            {score === round.highestScore && score !== null && (
                                                <Text style={{ fontSize: 10, color: "#fff" }}>🏆 Cao nhất</Text>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Highest score highlight */}
                                {round.highestScore !== null && (
                                    <div style={{
                                        marginLeft: "auto",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 12,
                                        padding: "12px 20px",
                                        background: "linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)",
                                        borderRadius: 16,
                                    }}>
                                        <div style={{ fontSize: 28 }}>🏆</div>
                                        <div>
                                            <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.9)" }}>Điểm cao nhất</Text>
                                            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>
                                                {round.highestScore} <span style={{ fontSize: 14 }}>điểm</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bottom action area */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                        <div style={{ display: "flex", gap: 24 }}>
                            
                            {round.attempts && status !== "locked" && status !== "notPaid" && (
                                <div style={{ textAlign: "center" }}>
                                    <Text type="secondary" style={{ fontSize: 12 }}>🎮 Lượt còn lại</Text>
                                    <div style={{ 
                                        fontSize: 20, 
                                        fontWeight: 700, 
                                        color: round.attempts.max - round.attempts.used > 0 ? "#52c41a" : "#bfbfbf" 
                                    }}>
                                        {round.attempts.max - round.attempts.used} / {round.attempts.max}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Space>
                            {/* History button for rounds with attempts */}
                            {round.attempts && round.attempts.used > 0 && onViewHistory && (
                                <Button
                                    size="large"
                                    onClick={() => onViewHistory(round)}
                                    style={{
                                        height: 48,
                                        borderRadius: 24,
                                        padding: "0 24px",
                                        fontSize: 14,
                                    }}
                                    icon={<HistoryOutlined />}
                                >
                                    Lịch sử thi
                                </Button>
                            )}
                            {/* Demo buttons */}
                            {["attempt1", "attempt2", "attempt3"].includes(status) && onSimulateComplete && (
                                <Button
                                    size="large"
                                    onClick={onSimulateComplete}
                                    style={{
                                        height: 48,
                                        borderRadius: 24,
                                        padding: "0 24px",
                                        fontSize: 14,
                                    }}
                                >
                                    ✓ Hoàn thành (Demo)
                                </Button>
                            )}
                            {status === "practice" && onSimulatePractice && (
                                <Button
                                    size="large"
                                    onClick={onSimulatePractice}
                                    style={{
                                        height: 48,
                                        borderRadius: 24,
                                        padding: "0 24px",
                                        fontSize: 14,
                                    }}
                                >
                                    ✓ Hoàn thành đề (Demo)
                                </Button>
                            )}
                            <Button
                                type="primary"
                                size="large"
                                disabled={status === "locked" || status === "notQualified" || (status === "completed" && isPractice)}
                                onClick={() => onAction(round)}
                                style={{
                                    height: 48,
                                    borderRadius: 24,
                                    padding: "0 32px",
                                    fontSize: 16,
                                    fontWeight: 600,
                                    background: status === "locked" ? "#d9d9d9" : 
                                        isCompleted ? "linear-gradient(135deg, #52c41a 0%, #95de64 100%)" : 
                                        isNotPaid ? "linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)" : 
                                        colors.bg,
                                    border: "none",
                                    boxShadow: status === "locked" ? "none" : `0 4px 16px ${colors.primary}50`,
                                }}
                            >
                                {status === "completed" ? (isPractice ? "✅ Đã hoàn thành" : "🏆 Xem kết quả") :
                                    status === "practice" ? `📝 Thi thử (còn ${round.attempts.max - round.attempts.used} đề)` :
                                    status === "notPaid" ? `💳 Thanh toán ${round.fee} VNĐ` :
                                    status === "attempt1" ? "🚀 Vào thi lần 1" :
                                    status === "attempt2" ? "🚀 Vào thi lần 2" :
                                    status === "attempt3" ? "🚀 Vào thi lần 3" :
                                    status === "available" ? "🚀 Vào thi ngay" :
                                    status === "locked" ? "🔒 Chưa mở" : "❌ Chưa đủ điều kiện"}
                            </Button>
                        </Space>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function RoundsList({ userInfo, onStartExam }) {
    const [paymentModal, setPaymentModal] = useState(false);
    const [selectedRound, setSelectedRound] = useState(null);
    const [round1State, setRound1State] = useState("notPaid"); // notPaid, attempt1, attempt2, attempt3, completed
    const [attemptScores, setAttemptScores] = useState([null, null, null]); // Điểm 3 lần thi
    const [practiceUsed, setPracticeUsed] = useState(0); // Số đề thi thử đã dùng (max 3 free, thêm 7 nếu thanh toán)

    const getRound1Status = () => {
        switch (round1State) {
            case "notPaid": return "notPaid";
            case "attempt1": return "attempt1";
            case "attempt2": return "attempt2";
            case "attempt3": return "attempt3";
            case "completed": return "completed";
            default: return "notPaid";
        }
    };

    const getRound1AttemptsUsed = () => {
        switch (round1State) {
            case "notPaid": return 0;
            case "attempt1": return 0;
            case "attempt2": return 1;
            case "attempt3": return 2;
            case "completed": return 3;
            default: return 0;
        }
    };

    const getHighestScore = () => {
        const validScores = attemptScores.filter(s => s !== null);
        return validScores.length > 0 ? Math.max(...validScores) : null;
    };

    const isPaid = round1State !== "notPaid";
    const practiceMax = isPaid ? 10 : 3;
    const practiceRemaining = practiceMax - practiceUsed;

    const getPracticeStatus = () => {
        if (practiceUsed >= practiceMax) return "completed";
        return "practice";
    };

    const rounds = [
        {
            number: 0,
            title: "Vòng Thi Thử",
            description: "Luyện tập với các đề thi thử miễn phí. Thanh toán Vòng 1 để mở thêm 7 đề luyện tập.",
            attempts: { used: practiceUsed, max: practiceMax },
            status: getPracticeStatus(),
            isPractice: true,
            requirements: [
                "Miễn phí 3 đề thi thử",
                "Thanh toán Vòng 1 để mở thêm 7 đề",
                "Không tính điểm xếp hạng"
            ]
        },
        {
            number: 1,
            title: "Vòng 1: Thi Tự Do",
            description: "Học sinh thanh toán lệ phí và tham gia thi tự do tại nhà. Điểm của vòng 1 là điểm cao nhất trong các lần thi.",
            fee: "50.000",
            attempts: { used: getRound1AttemptsUsed(), max: 3 },
            attemptScores: attemptScores,
            highestScore: getHighestScore(),
            status: getRound1Status(),
            requirements: [
                "Thanh toán lệ phí 50.000 VNĐ qua VNPay",
                "Tối đa 3 lần thi",
                "Điểm vòng 1 = Điểm cao nhất trong các lần thi"
            ]
        },
        {
            number: 2,
            title: "Vòng 2: Cấp Tỉnh",
            description: "Vòng thi cấp tỉnh dành cho học sinh đủ điều kiện. Học sinh sẽ thi tại trường với sự giám sát của giám thị.",
            status: "locked",
            requirements: [
                "Thuộc top 50% thí sinh vòng 1",
                "Đã thanh toán lệ phí 50.000 VNĐ"
            ],
            note: "Lưu ý: Học sinh sẽ thi tại trường. Giám thị sẽ điểm danh trước khi cho thí sinh vào thi."
        },
    ];

    const handleAction = (round) => {
        if (round.number === 0) {
            // Practice round - go to exam waiting screen
            if (practiceUsed < practiceMax) {
                onStartExam(round, false); // false = not viewing history, go to exam
            }
        } else if (round.number === 1) {
            if (round1State === "notPaid") {
                setSelectedRound(round);
                setPaymentModal(true);
            } else if (round1State !== "completed") {
                onStartExam(round, false); // false = not viewing history, go to exam
            }
        } else {
            onStartExam(round, false);
        }
    };

    const handleViewHistory = (round) => {
        // Navigate to attempts/history screen
        onStartExam(round, true); // true = viewing history
    };

    const simulatePractice = () => {
        if (practiceUsed < practiceMax) {
            setPracticeUsed(practiceUsed + 1);
            message.success(`Hoàn thành đề thi thử ${practiceUsed + 1}!`);
        }
    };

    const handlePayment = () => {
        message.loading("Đang chuyển hướng đến VNPay...", 2);
        setTimeout(() => {
            setPaymentModal(false);
            setRound1State("attempt1");
            message.success("Thanh toán thành công! Bạn có thể bắt đầu thi.");
        }, 2000);
    };

    const simulateCompleteAttempt = () => {
        const randomScore = Math.floor(Math.random() * 41) + 60; // Random 60-100
        
        if (round1State === "attempt1") {
            const newScores = [...attemptScores];
            newScores[0] = randomScore;
            setAttemptScores(newScores);
            setRound1State("attempt2");
            message.success(`Hoàn thành lần 1 với ${randomScore} điểm! Bạn có thể thi lần 2.`);
        } else if (round1State === "attempt2") {
            const newScores = [...attemptScores];
            newScores[1] = randomScore;
            setAttemptScores(newScores);
            setRound1State("attempt3");
            message.success(`Hoàn thành lần 2 với ${randomScore} điểm! Bạn có thể thi lần 3.`);
        } else if (round1State === "attempt3") {
            const newScores = [...attemptScores];
            newScores[2] = randomScore;
            setAttemptScores(newScores);
            setRound1State("completed");
            message.success(`Hoàn thành lần 3 với ${randomScore} điểm! Bạn đã hoàn thành vòng 1.`);
        }
    };

    return (
        <>
            {/* Section header */}
            <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                gap: 12,
            }}>
                <div style={{ fontSize: 32 }}>📝</div>
                <div>
                    <Title level={3} style={{ margin: 0 }}>Các vòng thi</Title>
                    <Text type="secondary">Hoàn thành các vòng để đạt thành tích tốt nhất</Text>
                </div>
            </div>
            
            {rounds.map((round, idx) => (
                <RoundCard
                    key={idx}
                    round={round}
                    status={round.status}
                    onAction={handleAction}
                    onSimulateComplete={round.number === 1 ? simulateCompleteAttempt : null}
                    onSimulatePractice={round.number === 0 ? simulatePractice : null}
                    onViewHistory={round.attempts ? handleViewHistory : null}
                />
            ))}

            <Modal
                title="Thanh toán lệ phí thi"
                open={paymentModal}
                onCancel={() => setPaymentModal(false)}
                footer={null}
                width={500}
            >
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <Avatar size={80} style={{ backgroundColor: "#1677ff", marginBottom: 16 }}>
                        <DollarOutlined style={{ fontSize: 40 }} />
                    </Avatar>
                    <Title level={3}>50.000 VNĐ</Title>
                    <Paragraph type="secondary">
                        Lệ phí tham gia Vòng 1 - Thi Tự Do
                    </Paragraph>
                    <Divider />
                    <Descriptions column={1} style={{ textAlign: "left" }}>
                        <Descriptions.Item label="Thí sinh">{userInfo?.fullName || "Nguyễn Văn A"}</Descriptions.Item>
                        <Descriptions.Item label="Trường">{userInfo?.school || "THCS Chu Văn An"}</Descriptions.Item>
                        <Descriptions.Item label="Số lần thi">Tối đa 3 lần</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={handlePayment}
                        style={{ height: 50 }}
                    >
                        <Space>
                            <img 
                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png" 
                                alt="VNPay" 
                                style={{ height: 24 }}
                            />
                            Thanh toán qua VNPay
                        </Space>
                    </Button>
                </div>
            </Modal>
        </>
    );
}

function ExamAttempts({ onStartExam, onBack }) {
    const columns = [
        { title: "Lần thi", dataIndex: "attempt", key: "attempt", render: (v) => `Lần ${v}` },
        { title: "Thời gian", dataIndex: "date", key: "date", render: (v) => v || "-" },
        { title: "Điểm", dataIndex: "score", key: "score", render: (v) => v ? <Tag color="blue">{v} điểm</Tag> : "-" },
        { title: "Thời gian làm bài", dataIndex: "time", key: "time", render: (v) => v || "-" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "completed" ? "success" : "blue"}>
                    {status === "completed" ? "Đã hoàn thành" : "Chưa thi"}
                </Tag>
            )
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                record.status === "available" ? (
                    <Button type="primary" icon={<PlayCircleOutlined />} onClick={onStartExam}>
                        Bắt đầu thi
                    </Button>
                ) : (
                    <Button icon={<TrophyOutlined />}>Xem chi tiết</Button>
                )
            )
        }
    ];

    const bestScore = Math.max(...mockAttempts.filter(a => a.score).map(a => a.score));

    return (
        <Card>
            <Button onClick={onBack} style={{ marginBottom: 16 }}>← Quay lại</Button>
            
            <Alert
                type="success"
                message={`Điểm cao nhất của bạn: ${bestScore} điểm`}
                description="Điểm này sẽ được sử dụng để xếp hạng vòng 1"
                showIcon
                style={{ marginBottom: 24 }}
            />

            <Title level={4}>Lịch sử các lần thi - Vòng 1</Title>
            <Table
                columns={columns}
                dataSource={mockAttempts}
                pagination={false}
            />
        </Card>
    );
}

function Rankings() {
    const [rankingType, setRankingType] = useState("student");
    const [filterRound, setFilterRound] = useState(1);
    const [filterGrade, setFilterGrade] = useState(null);
    const [filterWard, setFilterWard] = useState(null);
    const [filterSchool, setFilterSchool] = useState(null);

    const filteredStudentData = mockStudentRanking.filter(item => {
        if (filterRound && item.round !== filterRound) return false;
        if (filterGrade && item.grade !== filterGrade) return false;
        if (filterWard && item.ward !== filterWard) return false;
        if (filterSchool && item.school !== filterSchool) return false;
        return true;
    });

    const filteredSchoolData = mockSchoolRanking.filter(item => {
        if (filterRound && item.round !== filterRound) return false;
        if (filterGrade && item.grade !== filterGrade) return false;
        if (filterWard && item.ward !== filterWard) return false;
        return true;
    });

    const studentColumns = [
        {
            title: "Hạng",
            dataIndex: "rank",
            key: "rank",
            width: 80,
            render: (rank) => (
                <Space>
                    {rank <= 3 && <CrownOutlined style={{ color: rank === 1 ? "#ffd700" : rank === 2 ? "#c0c0c0" : "#cd7f32" }} />}
                    <Text strong>{rank}</Text>
                </Space>
            )
        },
        { title: "Họ và tên", dataIndex: "name", key: "name" },
        { title: "Khối", dataIndex: "grade", key: "grade", render: (grade) => <Tag color="cyan">{grade}</Tag> },
        { title: "Trường", dataIndex: "school", key: "school" },
        { title: "Xã/Phường", dataIndex: "ward", key: "ward" },
        {
            title: "Điểm",
            dataIndex: "score",
            key: "score",
            render: (score) => <Tag color="blue">{score}</Tag>
        },
        { title: "Thời gian", dataIndex: "time", key: "time" },
    ];

    const schoolColumns = [
        {
            title: "Hạng",
            dataIndex: "rank",
            key: "rank",
            width: 80,
            render: (rank) => (
                <Space>
                    {rank <= 3 && <CrownOutlined style={{ color: rank === 1 ? "#ffd700" : rank === 2 ? "#c0c0c0" : "#cd7f32" }} />}
                    <Text strong>{rank}</Text>
                </Space>
            )
        },
        { title: "Trường", dataIndex: "school", key: "school" },
        { title: "Xã/Phường", dataIndex: "ward", key: "ward" },
        { title: "Số thí sinh", dataIndex: "students", key: "students" },
        {
            title: "Điểm TB",
            dataIndex: "avgScore",
            key: "avgScore",
            render: (score) => <Tag color="green">{score.toFixed(1)}</Tag>
        },
    ];

    return (
        <Card>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={5}>
                    <Select
                        style={{ width: "100%" }}
                        value={rankingType}
                        onChange={setRankingType}
                    >
                        <Option value="student">Xếp hạng học sinh</Option>
                        <Option value="school">Xếp hạng trường</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <Select
                        style={{ width: "100%" }}
                        value={filterRound}
                        onChange={setFilterRound}
                        placeholder="Chọn vòng thi"
                    >
                        <Option value={1}>📚 Vòng 1</Option>
                        <Option value={2}>🏫 Vòng 2</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <Select
                        style={{ width: "100%" }}
                        placeholder="Lọc theo khối"
                        allowClear
                        onChange={setFilterGrade}
                    >
                        {grades.map(g => <Option key={g} value={g}>{g}</Option>)}
                    </Select>
                </Col>
                <Col span={4}>
                    <Select
                        style={{ width: "100%" }}
                        placeholder="Lọc theo xã/phường"
                        allowClear
                        onChange={setFilterWard}
                    >
                        {wards.map(w => <Option key={w} value={w}>{w}</Option>)}
                    </Select>
                </Col>
                {rankingType === "student" && (
                    <Col span={4}>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Lọc theo trường"
                            allowClear
                            onChange={setFilterSchool}
                        >
                            {Object.values(schools).flat().map(s => (
                                <Option key={s} value={s}>{s}</Option>
                            ))}
                        </Select>
                    </Col>
                )}
            </Row>

            <Table
                columns={rankingType === "student" ? studentColumns : schoolColumns}
                dataSource={rankingType === "student" ? filteredStudentData : filteredSchoolData}
                pagination={{ pageSize: 10 }}
            />
        </Card>
    );
}

const mockHonorData = {
    round1: {
        "Giải Nhất": {
            "Khối 4": { name: "Nguyễn Minh Anh", school: "TH Chu Văn An", avatar: "A" },
            "Khối 5": { name: "Trần Văn Bình", school: "TH Trưng Vương", avatar: "B" },
            "Khối 6": { name: "Lê Thị Cúc", school: "THCS Giảng Võ", avatar: "C" },
            "Khối 7": { name: "Phạm Đức Dũng", school: "THCS Lê Quý Đôn", avatar: "D" },
            "Khối 8": { name: "Hoàng Thị Em", school: "THCS Chu Văn An", avatar: "E" },
            "Khối 9": { name: "Vũ Văn Phú", school: "THCS Trưng Vương", avatar: "P" },
        },
        "Giải Nhì": {
            "Khối 4": { name: "Đỗ Thị Giang", school: "TH Kim Liên", avatar: "G" },
            "Khối 5": { name: "Bùi Văn Hải", school: "TH Đông Ngạc", avatar: "H" },
            "Khối 6": { name: "Ngô Thị Inh", school: "THCS Trần Văn Ơn", avatar: "I" },
            "Khối 7": { name: "Lý Văn Kiên", school: "THCS Giảng Võ", avatar: "K" },
            "Khối 8": { name: "Trịnh Thị Lan", school: "THCS Lê Quý Đôn", avatar: "L" },
            "Khối 9": { name: "Mai Văn Minh", school: "THCS Chu Văn An", avatar: "M" },
        },
        "Giải Ba": {
            "Khối 4": { name: "Cao Thị Nga", school: "TH Văn Miếu", avatar: "N" },
            "Khối 5": { name: "Đinh Văn Oanh", school: "TH Trung Tự", avatar: "O" },
            "Khối 6": { name: "Phan Thị Phương", school: "THCS Kim Liên", avatar: "P" },
            "Khối 7": { name: "Tạ Văn Quang", school: "THCS Đông Ngạc", avatar: "Q" },
            "Khối 8": { name: "Lưu Thị Rạng", school: "THCS Trần Văn Ơn", avatar: "R" },
            "Khối 9": { name: "Hồ Văn Sơn", school: "THCS Giảng Võ", avatar: "S" },
        },
    },
    round2: {
        "Giải Nhất": {
            "Khối 4": { name: "Trương Thị Tâm", school: "TH Chu Văn An", avatar: "T" },
            "Khối 5": { name: "Võ Văn Uy", school: "TH Trưng Vương", avatar: "U" },
            "Khối 6": { name: "Đặng Thị Vân", school: "THCS Lê Quý Đôn", avatar: "V" },
            "Khối 7": { name: "Lê Văn Xuyên", school: "THCS Chu Văn An", avatar: "X" },
            "Khối 8": { name: "Nguyễn Thị Yến", school: "THCS Trưng Vương", avatar: "Y" },
            "Khối 9": { name: "Phạm Văn Zũng", school: "THCS Giảng Võ", avatar: "Z" },
        },
        "Giải Nhì": {
            "Khối 4": { name: "Hoàng Văn An", school: "TH Kim Liên", avatar: "A" },
            "Khối 5": { name: "Trần Thị Bích", school: "TH Đông Ngạc", avatar: "B" },
            "Khối 6": { name: "Lê Văn Cường", school: "THCS Trần Văn Ơn", avatar: "C" },
            "Khối 7": { name: "Ngô Thị Diệp", school: "THCS Giảng Võ", avatar: "D" },
            "Khối 8": { name: "Vũ Văn Đức", school: "THCS Lê Quý Đôn", avatar: "Đ" },
            "Khối 9": { name: "Bùi Thị Hà", school: "THCS Chu Văn An", avatar: "H" },
        },
        "Giải Ba": {
            "Khối 4": { name: "Đinh Văn Hùng", school: "TH Văn Miếu", avatar: "H" },
            "Khối 5": { name: "Cao Thị Khánh", school: "TH Trung Tự", avatar: "K" },
            "Khối 6": { name: "Phan Văn Long", school: "THCS Kim Liên", avatar: "L" },
            "Khối 7": { name: "Tạ Thị Mai", school: "THCS Đông Ngạc", avatar: "M" },
            "Khối 8": { name: "Lưu Văn Nam", school: "THCS Trần Văn Ơn", avatar: "N" },
            "Khối 9": { name: "Hồ Thị Oanh", school: "THCS Giảng Võ", avatar: "O" },
        },
    },
};

const honorGrades = ["Khối 4", "Khối 5", "Khối 6", "Khối 7", "Khối 8", "Khối 9"];
const honorPrizes = ["Giải Nhất", "Giải Nhì", "Giải Ba"];

function HonorBoard() {
    const [selectedRound, setSelectedRound] = useState("round1");

    const prizeColors = {
        "Giải Nhất": { bg: "linear-gradient(135deg, #ffd700 0%, #ffec8b 100%)", border: "#ffd700", icon: "🥇" },
        "Giải Nhì": { bg: "linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%)", border: "#c0c0c0", icon: "🥈" },
        "Giải Ba": { bg: "linear-gradient(135deg, #cd7f32 0%, #daa520 100%)", border: "#cd7f32", icon: "🥉" },
    };

    const gradeColors = ["#1890ff", "#13c2c2", "#52c41a", "#faad14", "#f5222d", "#722ed1"];

    const roundData = mockHonorData[selectedRound];

    return (
        <Card>
            <div style={{ marginBottom: 24 }}>
                <Space size={16}>
                    <Text strong style={{ fontSize: 16 }}>Chọn vòng thi:</Text>
                    <Button
                        type={selectedRound === "round1" ? "primary" : "default"}
                        onClick={() => setSelectedRound("round1")}
                        style={{ borderRadius: 20 }}
                    >
                        📚 Vòng 1 - Thi Tự Do
                    </Button>
                    <Button
                        type={selectedRound === "round2" ? "primary" : "default"}
                        onClick={() => setSelectedRound("round2")}
                        style={{ borderRadius: 20 }}
                    >
                        🏫 Vòng 2 - Cấp Tỉnh
                    </Button>
                </Space>
            </div>

            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 8 }}>
                    <thead>
                        <tr>
                            <th style={{ 
                                padding: 16, 
                                background: "#f5f5f5", 
                                borderRadius: 12,
                                minWidth: 120,
                                textAlign: "center",
                            }}>
                                🏆 Giải thưởng
                            </th>
                            {honorGrades.map((grade, idx) => (
                                <th 
                                    key={grade}
                                    style={{ 
                                        padding: 16, 
                                        background: `${gradeColors[idx]}15`,
                                        borderRadius: 12,
                                        minWidth: 160,
                                        textAlign: "center",
                                        color: gradeColors[idx],
                                        fontWeight: 700,
                                        border: `2px solid ${gradeColors[idx]}30`,
                                    }}
                                >
                                    {grade}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {honorPrizes.map((prize) => (
                            <tr key={prize}>
                                <td style={{
                                    padding: 16,
                                    background: prizeColors[prize].bg,
                                    borderRadius: 12,
                                    textAlign: "center",
                                    fontWeight: 700,
                                    fontSize: 16,
                                    color: "#000",
                                    border: `2px solid ${prizeColors[prize].border}`,
                                }}>
                                    <div style={{ fontSize: 32, marginBottom: 4 }}>{prizeColors[prize].icon}</div>
                                    {prize}
                                </td>
                                {honorGrades.map((grade, idx) => {
                                    const student = roundData[prize]?.[grade];
                                    return (
                                        <td 
                                            key={grade}
                                            style={{
                                                padding: 12,
                                                background: "#fff",
                                                borderRadius: 12,
                                                textAlign: "center",
                                                border: `2px solid ${gradeColors[idx]}30`,
                                                verticalAlign: "top",
                                            }}
                                        >
                                            {student ? (
                                                <div style={{ 
                                                    display: "flex", 
                                                    flexDirection: "column", 
                                                    alignItems: "center",
                                                    gap: 8,
                                                }}>
                                                    <Avatar
                                                        size={56}
                                                        style={{
                                                            background: `linear-gradient(135deg, ${gradeColors[idx]} 0%, ${gradeColors[idx]}99 100%)`,
                                                            fontSize: 24,
                                                            fontWeight: 700,
                                                            border: `3px solid ${prizeColors[prize].border}`,
                                                        }}
                                                    >
                                                        {student.avatar}
                                                    </Avatar>
                                                    <div>
                                                        <Text strong style={{ 
                                                            display: "block", 
                                                            fontSize: 14,
                                                            color: "#262626",
                                                        }}>
                                                            {student.name}
                                                        </Text>
                                                        <Text type="secondary" style={{ 
                                                            fontSize: 12,
                                                            display: "block",
                                                        }}>
                                                            🏫 {student.school}
                                                        </Text>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Text type="secondary">—</Text>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

function ExamWaiting({ round, userInfo, onStartExam, onBack }) {
    const [countdown, setCountdown] = useState(5);
    const [ready, setReady] = useState(false);

    const handleReady = () => {
        setReady(true);
        let count = 5;
        const timer = setInterval(() => {
            count--;
            setCountdown(count);
            if (count === 0) {
                clearInterval(timer);
                message.success("Bắt đầu bài thi!");
            }
        }, 1000);
    };

    return (
        <Card>
            <Button onClick={onBack} style={{ marginBottom: 16 }}>← Quay lại</Button>
            
            <Result
                icon={
                    <div style={{ 
                        width: 120, 
                        height: 120, 
                        borderRadius: "50%", 
                        background: "linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        fontSize: 48,
                    }}>
                        {ready ? countdown : "📝"}
                    </div>
                }
                title={ready ? `Bài thi sẽ bắt đầu trong ${countdown} giây...` : `Chuẩn bị vào thi - ${round?.title || "Vòng 1"}`}
                subTitle={ready ? "Vui lòng không thoát khỏi màn hình" : "Kiểm tra thông tin và sẵn sàng làm bài"}
                extra={
                    <Space direction="vertical" size={24} style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
                        <Card style={{ background: "#f6ffed", border: "1px solid #b7eb8f" }}>
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="👤 Thí sinh">
                                    <Text strong>{userInfo?.fullName || "Nguyễn Văn A"}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="🏫 Trường">
                                    {userInfo?.school || "THCS Chu Văn An"}
                                </Descriptions.Item>
                                <Descriptions.Item label="📝 Vòng thi">
                                    <Tag color="blue">{round?.title || "Vòng 1: Thi Tự Do"}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="⏱️ Thời gian làm bài">
                                    <Text strong style={{ color: "#fa8c16" }}>45 phút</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="❓ Số câu hỏi">
                                    <Text strong>30 câu trắc nghiệm</Text>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Alert
                            type="info"
                            message="📋 Lưu ý khi làm bài"
                            description={
                                <ul style={{ margin: "8px 0 0 0", paddingLeft: 20 }}>
                                    <li>Không thoát khỏi màn hình thi khi đang làm bài</li>
                                    <li>Đảm bảo kết nối internet ổn định</li>
                                    <li>Bài thi sẽ tự động nộp khi hết thời gian</li>
                                </ul>
                            }
                            showIcon
                        />

                        {!ready ? (
                            <Button 
                                type="primary" 
                                size="large" 
                                block
                                onClick={handleReady}
                                style={{
                                    height: 56,
                                    fontSize: 18,
                                    fontWeight: 600,
                                    borderRadius: 28,
                                    background: "linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)",
                                    border: "none",
                                }}
                            >
                                🚀 Sẵn sàng vào thi
                            </Button>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                <Progress 
                                    type="circle" 
                                    percent={(5 - countdown) * 20} 
                                    format={() => countdown}
                                    strokeColor={{ '0%': '#1890ff', '100%': '#36cfc9' }}
                                />
                            </div>
                        )}
                    </Space>
                }
            />
        </Card>
    );
}

function AttendanceCheck({ onConfirm, onBack }) {
    const [confirmed, setConfirmed] = useState(false);

    return (
        <Card>
            <Button onClick={onBack} style={{ marginBottom: 16 }}>← Quay lại</Button>
            
            <Result
                icon={<SafetyCertificateOutlined style={{ color: "#1677ff" }} />}
                title="Điểm danh thí sinh"
                subTitle="Giám thị sẽ xác nhận điểm danh trước khi bạn vào thi"
                extra={
                    <Space direction="vertical" size={16} style={{ width: "100%" }}>
                        <Descriptions bordered column={1} style={{ maxWidth: 400, margin: "0 auto" }}>
                            <Descriptions.Item label="Họ và tên">Nguyễn Văn A</Descriptions.Item>
                            <Descriptions.Item label="Trường">THCS Chu Văn An</Descriptions.Item>
                            <Descriptions.Item label="Lớp">8A1</Descriptions.Item>
                            <Descriptions.Item label="Vòng thi">Vòng 2 - Cấp Tỉnh</Descriptions.Item>
                        </Descriptions>
                        
                        {!confirmed ? (
                            <Alert
                                type="warning"
                                message="Chờ giám thị xác nhận điểm danh"
                                description="Vui lòng liên hệ giám thị để được xác nhận điểm danh"
                                showIcon
                            />
                        ) : (
                            <Alert
                                type="success"
                                message="Đã xác nhận điểm danh"
                                description="Bạn có thể bắt đầu làm bài thi"
                                showIcon
                            />
                        )}

                        <Space>
                            <Button onClick={() => setConfirmed(true)}>
                                Giám thị xác nhận (Demo)
                            </Button>
                            <Button type="primary" disabled={!confirmed} onClick={onConfirm}>
                                Vào thi
                            </Button>
                        </Space>
                    </Space>
                }
            />
        </Card>
    );
}

export default function OlympicMathPage() {
    const [currentView, setCurrentView] = useState("register");
    const [userInfo, setUserInfo] = useState(null);
    const [selectedRound, setSelectedRound] = useState(null);

    const handleRegistration = (values) => {
        setUserInfo(values);
        setCurrentView("rounds");
    };

    const handleStartExam = (round, isViewHistory = false) => {
        setSelectedRound(round);
        if (isViewHistory) {
            // View history - go to attempts screen
            setCurrentView("attempts");
        } else if (round.number === 0) {
            // Practice round - go to waiting screen
            setCurrentView("examWaiting");
        } else if (round.number === 1) {
            // Round 1 - go to waiting screen
            setCurrentView("examWaiting");
        } else {
            // Round 2 - go to attendance check
            setCurrentView("attendance");
        }
    };

    const tabItems = [
        {
            key: "rounds",
            label: "Danh sách vòng thi",
            children: currentView === "rounds" ? (
                <RoundsList userInfo={userInfo} onStartExam={handleStartExam} />
            ) : currentView === "attempts" ? (
                <ExamAttempts 
                    onStartExam={() => setCurrentView("examWaiting")} 
                    onBack={() => setCurrentView("rounds")}
                />
            ) : currentView === "examWaiting" ? (
                <ExamWaiting 
                    round={selectedRound}
                    userInfo={userInfo}
                    onStartExam={() => message.info("Bắt đầu bài thi...")}
                    onBack={() => setCurrentView("rounds")}
                />
            ) : currentView === "attendance" ? (
                <AttendanceCheck 
                    onConfirm={() => message.info("Bắt đầu bài thi vòng 2...")}
                    onBack={() => setCurrentView("rounds")}
                />
            ) : null
        },
        {
            key: "rankings",
            label: "Bảng xếp hạng",
            children: <Rankings />
        },
        {
            key: "honor",
            label: "🏆 Vinh danh",
            children: <HonorBoard />
        }
    ];

    if (currentView === "register") {
        return (
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <RegistrationForm onComplete={handleRegistration} />
                
                <div style={{ textAlign: "center", marginTop: 16 }}>
                    <Button type="link" onClick={() => {
                        setUserInfo({ fullName: "Nguyễn Văn A", school: "THCS Chu Văn An" });
                        setCurrentView("rounds");
                    }}>
                        Bỏ qua đăng ký (Demo)
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Card style={{ marginBottom: 24 }}>
                <Row align="middle" justify="space-between">
                    <Col>
                        <Space>
                            <Avatar size={48} style={{ backgroundColor: "#1677ff" }}>
                                <TrophyOutlined />
                            </Avatar>
                            <div>
                                <Title level={3} style={{ margin: 0 }}>Olympic Toán Tuổi Thơ 2026</Title>
                                <Text type="secondary">olympictuoitho.vn</Text>
                            </div>
                        </Space>
                    </Col>
                    <Col>
                        <Space>
                            <Avatar icon={<UserOutlined />} />
                            <Text strong>{userInfo?.fullName || "Nguyễn Văn A"}</Text>
                            <Button type="link" onClick={() => setCurrentView("register")}>
                                Đăng xuất
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            <Tabs 
                defaultActiveKey="rounds" 
                items={tabItems}
                onChange={(key) => {
                    if (key === "rounds") setCurrentView("rounds");
                }}
            />
        </div>
    );
}
