import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    Input,
    Button,
    Space,
    Typography,
    Avatar,
    Badge,
    Tag,
    Divider,
    Row,
    Col,
    Progress,
    Timeline,
    List,
    Modal,
} from "antd";
import {
    RobotOutlined,
    UserOutlined,
    SendOutlined,
    BookOutlined,
    ClockCircleOutlined,
    TrophyOutlined,
    BulbOutlined,
    CheckCircleOutlined,
    RocketOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const SUGGESTED_QUESTIONS = [
    "Quy trình làm việc của công ty như thế nào?",
    "Gợi ý lộ trình đào tạo cho nhân viên mới",
    "Tôi đang học đến đâu rồi?",
    "Kỹ năng giao tiếp với khách hàng hiệu quả",
];

const MOCK_LEARNING_PATH = [
    { title: "Đào tạo hội nhập - Văn hóa công ty", status: "completed", progress: 100 },
    { title: "Kỹ năng giao tiếp & làm việc nhóm", status: "in_progress", progress: 65 },
    { title: "Kỹ năng bán hàng chuyên nghiệp", status: "pending", progress: 0 },
    { title: "Quản lý thời gian & năng suất", status: "pending", progress: 0 },
];

const MOCK_REMINDERS = [
    {
        type: "deadline",
        title: "Hoàn thành bài kiểm tra kỹ năng bán hàng",
        time: "Còn 2 ngày",
        priority: "high",
    },
    {
        type: "review",
        title: "Ôn tập kỹ năng thuyết trình",
        time: "Hôm nay",
        priority: "medium",
    },
    {
        type: "practice",
        title: "Luyện tập role-play bán hàng",
        time: "Nhắc nhở hàng ngày",
        priority: "low",
    },
];

function AILearningAssistantPage() {
    const [messages, setMessages] = useState([
        {
            type: "ai",
            content:
                "Xin chào! Tôi là trợ lý đào tạo AI của bạn. Tôi có thể hỗ trợ bạn về:\n\n📚 Đào tạo hội nhập và văn hóa công ty\n💬 Kỹ năng mềm: giao tiếp, làm việc nhóm\n📊 Kỹ năng bán hàng chuyên nghiệp\n⏰ Theo dõi tiến độ và nhắc nhở học tập\n\nBạn cần hỗ trợ gì hôm nay?",
            timestamp: new Date().toLocaleTimeString(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showLearningPath, setShowLearningPath] = useState(false);
    const [showReminders, setShowReminders] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        document.title = "Trợ lý đào tạo AI - Mockup App";
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getAIResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        if (
            lowerMessage.includes("lộ trình") ||
            lowerMessage.includes("đào tạo") ||
            lowerMessage.includes("nhân viên mới") ||
            lowerMessage.includes("gợi ý")
        ) {
            return {
                content:
                    "Dựa trên vị trí và trình độ hiện tại của bạn, tôi gợi ý lộ trình đào tạo như sau:\n\n✅ Đào tạo hội nhập - Văn hóa công ty (Đã hoàn thành)\n🔄 Kỹ năng giao tiếp & làm việc nhóm (Đang học - 65%)\n📚 Kỹ năng bán hàng chuyên nghiệp (Tiếp theo)\n🚀 Quản lý thời gian & năng suất (Nâng cao)\n\nBạn đang làm rất tốt! Hãy tiếp tục hoàn thành khóa kỹ năng mềm trước khi chuyển sang kỹ năng bán hàng nhé.",
                showAction: "learning_path",
            };
        }

        if (
            lowerMessage.includes("tiến độ") ||
            lowerMessage.includes("đang học") ||
            lowerMessage.includes("nhắc nhở") ||
            lowerMessage.includes("deadline")
        ) {
            return {
                content:
                    "Đây là tiến độ đào tạo của bạn:\n\n📊 Kỹ năng giao tiếp & làm việc nhóm: 65% (Còn 3 bài học)\n⏰ Bài kiểm tra kỹ năng bán hàng: Còn 2 ngày để hoàn thành\n📖 Bạn nên ôn tập kỹ năng thuyết trình hôm nay\n💪 Hãy duy trì luyện tập role-play bán hàng mỗi ngày!\n\nBạn có muốn xem chi tiết các nhắc nhở không?",
                showAction: "reminders",
            };
        }

        if (
            lowerMessage.includes("quy trình") ||
            lowerMessage.includes("công ty") ||
            lowerMessage.includes("làm việc") ||
            lowerMessage.includes("văn hóa")
        ) {
            return {
                content:
                    "Quy trình làm việc tại công ty bao gồm:\n\n🔹 Giờ làm việc: 8:00 - 17:30 (Nghỉ trưa 12:00 - 13:30)\n🔹 Check-in/out: Sử dụng hệ thống chấm công\n🔹 Họp team: Thứ 2 và Thứ 5 hàng tuần\n🔹 Báo cáo: Gửi báo cáo tuần vào cuối thứ 6\n🔹 Văn hóa: Tôn trọng, hợp tác, đổi mới sáng tạo\n\nBạn có muốn tìm hiểu thêm về quy định nào không?",
            };
        }

        if (
            lowerMessage.includes("kỹ năng") ||
            lowerMessage.includes("giao tiếp") ||
            lowerMessage.includes("khách hàng") ||
            lowerMessage.includes("bán hàng") ||
            lowerMessage.includes("sale")
        ) {
            return {
                content:
                    "Kỹ năng giao tiếp hiệu quả với khách hàng:\n\n🔹 Lắng nghe tích cực: Hiểu nhu cầu thực sự\n🔹 Đặt câu hỏi mở: Khám phá insights\n🔹 Ngôn ngữ cơ thể: Tự tin, chuyên nghiệp\n🔹 Xử lý từ chối: Chuyển đổi thành cơ hội\n🔹 Follow-up: Duy trì mối quan hệ\n\nBạn muốn tôi giải thích chi tiết kỹ thuật nào không?",
            };
        }

        return {
            content:
                "Cảm ơn câu hỏi của bạn! Tôi có thể hỗ trợ bạn:\n\n💡 Giải đáp về quy trình và văn hóa công ty\n🎯 Gợi ý lộ trình đào tạo phù hợp\n⏰ Nhắc nhở tiến độ học tập và deadline\n📚 Hướng dẫn kỹ năng mềm và kỹ năng bán hàng\n\nHãy đặt câu hỏi cụ thể hoặc chọn gợi ý bên dưới nhé!",
        };
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            type: "user",
            content: inputValue,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            const aiResponse = getAIResponse(inputValue);
            const aiMessage = {
                type: "ai",
                content: aiResponse.content,
                timestamp: new Date().toLocaleTimeString(),
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);

            if (aiResponse.showAction === "learning_path") {
                setTimeout(() => setShowLearningPath(true), 500);
            } else if (aiResponse.showAction === "reminders") {
                setTimeout(() => setShowReminders(true), 500);
            }
        }, 1500);
    };

    const handleSuggestedQuestion = (question) => {
        setInputValue(question);
    };

    return (
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <Title level={2} style={{ marginBottom: 24 }}>
                <RobotOutlined style={{ marginRight: 8 }} />
                Trợ lý đào tạo AI
            </Title>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card
                        style={{
                            height: "calc(100vh - 200px)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 16,
                                paddingBottom: 16,
                                borderBottom: "1px solid #f0f0f0",
                            }}
                        >
                            <Badge dot status="success">
                                <Avatar
                                    icon={<RobotOutlined />}
                                    size={48}
                                    style={{ backgroundColor: "#1677ff" }}
                                />
                            </Badge>
                            <div style={{ marginLeft: 12 }}>
                                <Text strong style={{ display: "block" }}>
                                    Trợ lý AI
                                </Text>
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    Trực tuyến 24/7
                                </Text>
                            </div>
                        </div>

                        <div
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                marginBottom: 16,
                                padding: "16px",
                                background: "#fafafa",
                                borderRadius: "8px",
                            }}
                        >
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            message.type === "user"
                                                ? "flex-end"
                                                : "flex-start",
                                        marginBottom: 16,
                                    }}
                                >
                                    {message.type === "ai" && (
                                        <Avatar
                                            icon={<RobotOutlined />}
                                            size={32}
                                            style={{
                                                backgroundColor: "#1677ff",
                                                marginRight: 8,
                                                flexShrink: 0,
                                            }}
                                        />
                                    )}
                                    <div
                                        style={{
                                            maxWidth: "70%",
                                        }}
                                    >
                                        <Card
                                            size="small"
                                            style={{
                                                background:
                                                    message.type === "user"
                                                        ? "#1677ff"
                                                        : "#fff",
                                                color:
                                                    message.type === "user"
                                                        ? "#fff"
                                                        : "#000",
                                                borderRadius: "12px",
                                            }}
                                            bodyStyle={{ padding: "12px 16px" }}
                                        >
                                            <Paragraph
                                                style={{
                                                    margin: 0,
                                                    whiteSpace: "pre-line",
                                                    color:
                                                        message.type === "user"
                                                            ? "#fff"
                                                            : "#000",
                                                }}
                                            >
                                                {message.content}
                                            </Paragraph>
                                            <Text
                                                type="secondary"
                                                style={{
                                                    fontSize: 11,
                                                    display: "block",
                                                    marginTop: 4,
                                                    color:
                                                        message.type === "user"
                                                            ? "rgba(255,255,255,0.7)"
                                                            : undefined,
                                                }}
                                            >
                                                {message.timestamp}
                                            </Text>
                                        </Card>
                                    </div>
                                    {message.type === "user" && (
                                        <Avatar
                                            icon={<UserOutlined />}
                                            size={32}
                                            style={{
                                                backgroundColor: "#52c41a",
                                                marginLeft: 8,
                                                flexShrink: 0,
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Avatar
                                        icon={<RobotOutlined />}
                                        size={32}
                                        style={{ backgroundColor: "#1677ff", marginRight: 8 }}
                                    />
                                    <Card
                                        size="small"
                                        style={{ borderRadius: "12px" }}
                                        bodyStyle={{ padding: "12px 16px" }}
                                    >
                                        <Text type="secondary">Đang soạn tin nhắn...</Text>
                                    </Card>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div>
                            <Space wrap style={{ marginBottom: 12 }}>
                                {SUGGESTED_QUESTIONS.map((question, index) => (
                                    <Tag
                                        key={index}
                                        color="blue"
                                        style={{ cursor: "pointer", padding: "4px 12px" }}
                                        onClick={() => handleSuggestedQuestion(question)}
                                    >
                                        {question}
                                    </Tag>
                                ))}
                            </Space>

                            <Space.Compact style={{ width: "100%" }}>
                                <TextArea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Nhập câu hỏi của bạn..."
                                    autoSize={{ minRows: 1, maxRows: 4 }}
                                    onPressEnter={(e) => {
                                        if (!e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                />
                                <Button
                                    type="primary"
                                    icon={<SendOutlined />}
                                    onClick={handleSend}
                                    style={{ height: "auto" }}
                                >
                                    Gửi
                                </Button>
                            </Space.Compact>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Space direction="vertical" style={{ width: "100%" }} size="large">
                        <Card
                            title={
                                <Space>
                                    <BookOutlined />
                                    <span>Lộ trình đào tạo</span>
                                </Space>
                            }
                            extra={
                                <Tag color="blue" icon={<RocketOutlined />}>
                                    Nhân viên Kinh doanh
                                </Tag>
                            }
                        >
                            <Timeline
                                items={MOCK_LEARNING_PATH.map((item) => ({
                                    color:
                                        item.status === "completed"
                                            ? "green"
                                            : item.status === "in_progress"
                                            ? "blue"
                                            : "gray",
                                    dot:
                                        item.status === "completed" ? (
                                            <CheckCircleOutlined />
                                        ) : undefined,
                                    children: (
                                        <div>
                                            <Text strong>{item.title}</Text>
                                            <Progress
                                                percent={item.progress}
                                                size="small"
                                                status={
                                                    item.status === "completed"
                                                        ? "success"
                                                        : "active"
                                                }
                                                style={{ marginTop: 4 }}
                                            />
                                        </div>
                                    ),
                                }))}
                            />
                        </Card>

                        <Card
                            title={
                                <Space>
                                    <ClockCircleOutlined />
                                    <span>Nhắc nhở</span>
                                </Space>
                            }
                            extra={<Badge count={MOCK_REMINDERS.length} />}
                        >
                            <List
                                dataSource={MOCK_REMINDERS}
                                renderItem={(item) => (
                                    <List.Item style={{ padding: "12px 0" }}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    icon={<ClockCircleOutlined />}
                                                    style={{
                                                        backgroundColor:
                                                            item.priority === "high"
                                                                ? "#ff4d4f"
                                                                : item.priority === "medium"
                                                                ? "#faad14"
                                                                : "#1677ff",
                                                    }}
                                                />
                                            }
                                            title={<Text strong>{item.title}</Text>}
                                            description={
                                                <Text type="secondary">{item.time}</Text>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>

                        <Card
                            title={
                                <Space>
                                    <TrophyOutlined />
                                    <span>Thống kê đào tạo</span>
                                </Space>
                            }
                        >
                            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                <div>
                                    <Text type="secondary">Thời gian đào tạo hôm nay</Text>
                                    <Title level={4} style={{ margin: "4px 0" }}>
                                        2 giờ 45 phút
                                    </Title>
                                    <Progress percent={68} size="small" />
                                </div>
                                <Divider style={{ margin: "8px 0" }} />
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Text type="secondary">Khóa học hoàn thành</Text>
                                        <Title level={4} style={{ margin: "4px 0" }}>
                                            15/23
                                        </Title>
                                    </Col>
                                    <Col span={12}>
                                        <Text type="secondary">Điểm đánh giá</Text>
                                        <Title level={4} style={{ margin: "4px 0" }}>
                                            8.5/10
                                        </Title>
                                    </Col>
                                </Row>
                            </Space>
                        </Card>
                    </Space>
                </Col>
            </Row>

            <Modal
                title="Chi tiết lộ trình đào tạo"
                open={showLearningPath}
                onCancel={() => setShowLearningPath(false)}
                footer={[
                    <Button key="close" onClick={() => setShowLearningPath(false)}>
                        Đóng
                    </Button>,
                    <Button key="adjust" type="primary" icon={<BulbOutlined />}>
                        Điều chỉnh lộ trình
                    </Button>,
                ]}
                width={600}
            >
                <Timeline
                    items={MOCK_LEARNING_PATH.map((item, index) => ({
                        color:
                            item.status === "completed"
                                ? "green"
                                : item.status === "in_progress"
                                ? "blue"
                                : "gray",
                        children: (
                            <Card size="small" style={{ marginBottom: 12 }}>
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <Text strong>{item.title}</Text>
                                    <Progress percent={item.progress} />
                                    <Text type="secondary">
                                        {item.status === "completed"
                                            ? "Đã hoàn thành"
                                            : item.status === "in_progress"
                                            ? "Đang học"
                                            : "Chưa bắt đầu"}
                                    </Text>
                                </Space>
                            </Card>
                        ),
                    }))}
                />
            </Modal>

            <Modal
                title="Nhắc nhở đào tạo"
                open={showReminders}
                onCancel={() => setShowReminders(false)}
                footer={[
                    <Button key="close" onClick={() => setShowReminders(false)}>
                        Đóng
                    </Button>,
                ]}
                width={500}
            >
                <List
                    dataSource={MOCK_REMINDERS}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        icon={<ClockCircleOutlined />}
                                        style={{
                                            backgroundColor:
                                                item.priority === "high"
                                                    ? "#ff4d4f"
                                                    : item.priority === "medium"
                                                    ? "#faad14"
                                                    : "#1677ff",
                                        }}
                                    />
                                }
                                title={item.title}
                                description={item.time}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
}

export default AILearningAssistantPage;
