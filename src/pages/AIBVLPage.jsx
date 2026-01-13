import React, { useState } from 'react';
import {
    Layout,
    Tabs,
    Upload,
    Button,
    List,
    Card,
    Typography,
    Space,
    Tag,
    Radio,
    Divider,
    Input,
    Avatar,
    Tooltip,
    Popover,
    Row,
    Col,
    message
} from 'antd';
import {
    InboxOutlined,
    FilePdfOutlined,
    FilePptOutlined,
    DeleteOutlined,
    SendOutlined,
    RobotOutlined,
    UserOutlined,
    BookOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';

const { Dragger } = Upload;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// --- Mock Data ---

const MOCK_CONCEPTS = {
    "Giá trị hoàn lại": {
        definition: "Là số tiền bên mua bảo hiểm sẽ nhận được khi chấm dứt hợp đồng bảo hiểm trước thời hạn (sau khi đã đóng phí đủ số năm quy định, thường là 2 năm).",
        source: "Luật Kinh doanh Bảo hiểm 2022, Điều 3"
    },
    "Thời gian chờ": {
        definition: "Là khoảng thời gian mà các quyền lợi bảo hiểm chưa được kích hoạt. Nếu sự kiện bảo hiểm xảy ra trong thời gian này, doanh nghiệp bảo hiểm sẽ không chi trả.",
        source: "Quy tắc Điều khoản Sản phẩm An Khang, Trang 5"
    },
    "Người được bảo hiểm": {
        definition: "Là cá nhân hiện đang sinh sống tại Việt Nam, được doanh nghiệp bảo hiểm chấp nhận bảo hiểm theo quy tắc, điều khoản của sản phẩm.",
        source: "Hợp đồng Bảo hiểm Nhân thọ mẫu, Mục 1.2"
    },
    "Sản phẩm bổ trợ": {
        definition: "Là các sản phẩm bảo hiểm đi kèm với sản phẩm chính để gia tăng phạm vi bảo vệ (vd: Tai nạn, Bệnh hiểm nghèo, Chăm sóc sức khỏe...).",
        source: "Tài liệu Đào tạo Đại lý mới, Slide 24"
    }
};

const MOCK_QUESTIONS = [
    {
        id: 1,
        question: "Đối với quyền lợi Chăm sóc sức khỏe, thời hạn nào sau đây được gọi là [Thời gian chờ] đối với các bệnh thông thường?",
        options: [
            { id: 'A', text: "0 ngày (Bảo vệ ngay lập tức)" },
            { id: 'B', text: "30 ngày" },
            { id: 'C', text: "90 ngày" },
            { id: 'D', text: "365 ngày" }
        ],
        correctAnswer: 'B',
        explanation: "[Thời gian chờ] đối với bệnh thông thường thường là 30 ngày kể từ ngày hợp đồng được chấp thuận bảo vệ. Đối với bệnh đặc biệt/có sẵn thường là 365 ngày. Tai nạn thường được bảo vệ ngay.",
        source: "Quy tắc Bảo hiểm Sức khỏe Toàn diện, Điều 4"
    }
];

const MOCK_CHAT_HISTORY = [
    {
        id: 1,
        sender: 'user',
        content: "Làm thế nào để tôi có thể nhận được [Giá trị hoàn lại] của hợp đồng?"
    },
    {
        id: 2,
        sender: 'ai',
        content: "Để nhận [Giá trị hoàn lại], bạn cần làm thủ tục hủy hợp đồng trước thời hạn. Số tiền nhận được sẽ phụ thuộc vào số năm bạn đã đóng phí và bảng minh họa giá trị hoàn lại tại thời điểm hủy.",
        sources: [
            { title: "Hướng dẫn giải quyết quyền lợi", page: "Trang 8" },
            { title: "Bảng minh họa quyền lợi", page: "Năm hợp đồng thứ 5" }
        ]
    }
];

// --- Components ---

// 1. Concept Highlighter Component
const ConceptText = ({ text }) => {
    if (!text) return null;

    // Regex to find words wrapped in [] usually, but here we scan for keys in MOCK_CONCEPTS
    // For simplicity in this mock, I'll rely on exact string matching or manual marking in mock data
    // Let's assume the mock data uses [] to denote concepts for easier parsing in this demo, 
    // or we just regex match the keys.

    // Strategy: Regex match keys from MOCK_CONCEPTS
    const conceptKeys = Object.keys(MOCK_CONCEPTS);
    // Create a regex pattern: (Machine Learning|Neural Network|...)
    const pattern = new RegExp(`(${conceptKeys.join('|')})|\\[(.*?)\\]`, 'gi');

    const parts = text.split(pattern);

    return (
        <span>
            {parts.map((part, index) => {
                if (!part) return null;

                // Check if part is a known concept (case insensitive match)
                const conceptKey = conceptKeys.find(k => k.toLowerCase() === part.toLowerCase());
                const contentInsideBrackets = text.match(/\[(.*?)\]/); // Simplified check for brackets in current part context is hard after split.

                // Actually, let's simplify: The mock data wraps concepts in [].
                // But the requirement says "Gen ra từ điền: các khái niệm".
                // Let's support both: direct match or explicit markup.

                if (conceptKey) {
                    const concept = MOCK_CONCEPTS[conceptKey];
                    return (
                        <Popover
                            key={index}
                            title={<Space><BookOutlined /> {conceptKey}</Space>}
                            content={
                                <div style={{ maxWidth: 300 }}>
                                    <Paragraph>{concept.definition}</Paragraph>
                                    <Divider style={{ margin: '8px 0' }} />
                                    <Text type="secondary" style={{ fontSize: 12 }}>Nguồn: {concept.source}</Text>
                                </div>
                            }
                        >
                            <Text strong style={{ color: '#1677ff', cursor: 'pointer', borderBottom: '1px dashed #1677ff' }}>
                                {part}
                            </Text>
                        </Popover>
                    );
                }

                return <span key={index}>{part}</span>;
            })}
        </span>
    );
};

// Better Concept Parser that handles the logic correctly
const RichTextRenderer = ({ text }) => {
    // We will replace [Concept] with the Popover
    // And also auto-detect know concepts if they appear (optional, but let's stick to [Concept] for safety or simple exact match)

    // Let's implement a simple split by regex that captures definitions
    const regex = /\[(.*?)\]/g;
    const parts = text.split(regex);
    const matches = text.match(regex) || [];

    // This is a naive splitting, let's reconstruct
    // If text is "Hello [World]", split gives ["Hello ", "World", ""]
    // We need to know which one was inside brackets.

    let result = [];
    let lastIndex = 0;
    text.replace(regex, (match, p1, offset) => {
        // Push text before
        if (offset > lastIndex) {
            result.push(text.slice(lastIndex, offset));
        }

        // Push Concept
        // Check if p1 is in MOCK_CONCEPTS
        const concept = MOCK_CONCEPTS[p1];
        if (concept) {
            result.push(
                <Popover
                    key={offset}
                    title={<Space><BookOutlined /> {p1}</Space>}
                    content={
                        <div style={{ maxWidth: 300 }}>
                            <Paragraph>{concept.definition}</Paragraph>
                            <Divider style={{ margin: '8px 0' }} />
                            <Text type="secondary" style={{ fontSize: 12 }}><InfoCircleOutlined /> Nguồn: {concept.source}</Text>
                        </div>
                    }
                >
                    <Text strong style={{ color: '#1677ff', cursor: 'pointer', backgroundColor: '#e6f7ff', padding: '0 4px', borderRadius: 4 }}>
                        {p1}
                    </Text>
                </Popover>
            );
        } else {
            result.push(match); // Keep original if not found
        }

        lastIndex = offset + match.length;
    });

    if (lastIndex < text.length) {
        result.push(text.slice(lastIndex));
    }

    return <span>{result}</span>;
}

// 2. Admin View
const AdminView = () => {
    const [fileList, setFileList] = useState([
        { uid: '-1', name: 'Quy_tac_Bao_hiem_An_Khang.pdf', status: 'done', size: 1234567, type: 'application/pdf' },
        { uid: '-2', name: 'Slide_Dao_tao_Dai_ly_K15.pptx', status: 'done', size: 2456789, type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
    ]);

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', // Mock upload
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setFileList([...fileList, info.file]);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title="Upload Tài liệu Đào tạo" bordered={false}>
                <Dragger {...props} style={{ padding: 20 }}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined style={{ color: '#1677ff' }} />
                    </p>
                    <p className="ant-upload-text">Nhấp hoặc kéo thả file vào khu vực này để upload</p>
                    <p className="ant-upload-hint">
                        Hỗ trợ upload thư mục, file PDF, Slide, Hình ảnh, Bảng biểu, Công thức.
                    </p>
                </Dragger>
            </Card>

            <Card title="Danh sách tài liệu đã upload" bordered={false}>
                <List
                    itemLayout="horizontal"
                    dataSource={fileList}
                    renderItem={(item) => (
                        <List.Item
                            actions={[<Button type="text" danger icon={<DeleteOutlined />} />]}
                        >
                            <List.Item.Meta
                                avatar={
                                    item.name.endsWith('pdf') ?
                                        <FilePdfOutlined style={{ fontSize: 24, color: 'red' }} /> :
                                        <FilePptOutlined style={{ fontSize: 24, color: 'orange' }} />
                                }
                                title={item.name}
                                description="Đã index xong • Sẵn sàng cho AI"
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </Space>
    );
};

// 3. Student View
const StudentView = () => {
    const [activeTab, setActiveTab] = useState('practice');
    // Chat state
    const [messages, setMessages] = useState(MOCK_CHAT_HISTORY);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Exam state
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            sender: 'user',
            content: inputValue
        };

        setMessages([...messages, newMessage]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI response
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                sender: 'ai',
                content: "Theo quy tắc bảo hiểm, [Người được bảo hiểm] phải kê khai trung thực tình trạng sức khỏe. Nếu vi phạm, hợp đồng có thể bị vô hiệu.",
                sources: [
                    { title: "Luật Kinh doanh Bảo hiểm", page: "Điều 19" },
                    { title: "Quy tắc sản phẩm", page: "Mục Loại trừ trách nhiệm" }
                ]
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    type="card"
                    items={[
                        {
                            key: 'practice',
                            label: <span><CheckCircleOutlined /> Luyện thi & Ôn tập</span>,
                            children: (
                                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                                    <Card title="Câu hỏi ôn tập #15" bordered={false} extra={<Tag color="blue">Mức độ: Trung bình</Tag>}>
                                        <Title level={4}><RichTextRenderer text={MOCK_QUESTIONS[0].question} /></Title>
                                        <Divider />
                                        <Radio.Group
                                            onChange={e => {
                                                setSelectedAnswer(e.target.value);
                                                setShowExplanation(false);
                                            }}
                                            value={selectedAnswer}
                                            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                                        >
                                            {MOCK_QUESTIONS[0].options.map(opt => (
                                                <Radio key={opt.id} value={opt.id} style={{ fontSize: 16 }}>
                                                    <span style={{ fontWeight: 500, marginRight: 8 }}>{opt.id}.</span> {opt.text}
                                                </Radio>
                                            ))}
                                        </Radio.Group>

                                        <Divider />

                                        <Space>
                                            <Button
                                                type="primary"
                                                size="large"
                                                disabled={!selectedAnswer}
                                                onClick={() => setShowExplanation(true)}
                                            >
                                                Kiểm tra đáp án
                                            </Button>
                                        </Space>

                                        {showExplanation && (
                                            <div style={{ marginTop: 24, padding: 16, background: selectedAnswer === MOCK_QUESTIONS[0].correctAnswer ? '#f6ffed' : '#fff1f0', borderRadius: 8, border: `1px solid ${selectedAnswer === MOCK_QUESTIONS[0].correctAnswer ? '#b7eb8f' : '#ffa39e'}` }}>
                                                <Space align="center" style={{ marginBottom: 8 }}>
                                                    {selectedAnswer === MOCK_QUESTIONS[0].correctAnswer ?
                                                        <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 20 }} /> :
                                                        <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
                                                    }
                                                    <Text strong style={{ fontSize: 16 }}>
                                                        {selectedAnswer === MOCK_QUESTIONS[0].correctAnswer ? "Chính xác!" : "Chưa chính xác"}
                                                    </Text>
                                                </Space>
                                                <Paragraph>
                                                    <Text strong>Giải thích chi tiết:</Text> <br />
                                                    <RichTextRenderer text={MOCK_QUESTIONS[0].explanation} />
                                                </Paragraph>
                                                <Tag icon={<BookOutlined />} color="cyan">Nguồn: {MOCK_QUESTIONS[0].source}</Tag>
                                            </div>
                                        )}
                                    </Card>
                                </div>
                            )
                        },
                        {
                            key: 'chat',
                            label: <span><RobotOutlined /> Chat với AI Assistant</span>,
                            children: (
                                <Card
                                    bordered={false}
                                    bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', height: '70vh' }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    {/* Chat Messages */}
                                    <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#f5f5f5' }}>
                                        {messages.map(msg => (
                                            <div
                                                key={msg.id}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                                    marginBottom: 20
                                                }}
                                            >
                                                <div style={{ display: 'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', gap: 12, maxWidth: '80%' }}>
                                                    <Avatar
                                                        icon={msg.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                                                        style={{ backgroundColor: msg.sender === 'user' ? '#1677ff' : '#52c41a', flexShrink: 0 }}
                                                    />
                                                    <div>
                                                        <div
                                                            style={{
                                                                background: msg.sender === 'user' ? '#1677ff' : '#fff',
                                                                color: msg.sender === 'user' ? '#fff' : '#000',
                                                                padding: '12px 16px',
                                                                borderRadius: 12,
                                                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                                                position: 'relative'
                                                            }}
                                                        >
                                                            <RichTextRenderer text={msg.content} />
                                                        </div>
                                                        {/* Sources for AI */}
                                                        {msg.sender === 'ai' && msg.sources && (
                                                            <div style={{ marginTop: 8 }}>
                                                                <Text type="secondary" style={{ fontSize: 12, marginRight: 8 }}>Nguồn trích dẫn:</Text>
                                                                {msg.sources.map((src, idx) => (
                                                                    <Tag key={idx} color="default" style={{ cursor: 'pointer' }}>
                                                                        <BookOutlined /> {src.title} ({src.page})
                                                                    </Tag>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div style={{ display: 'flex', gap: 12 }}>
                                                <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#52c41a' }} />
                                                <div style={{ background: '#fff', padding: '12px 16px', borderRadius: 12 }}>
                                                    <Space>
                                                        <div className="typing-dot" style={{ width: 6, height: 6, background: '#ccc', borderRadius: '50%' }}></div>
                                                        <div className="typing-dot" style={{ width: 6, height: 6, background: '#ccc', borderRadius: '50%' }}></div>
                                                        <div className="typing-dot" style={{ width: 6, height: 6, background: '#ccc', borderRadius: '50%' }}></div>
                                                    </Space>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Input Area */}
                                    <div style={{ padding: 16, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
                                        <Space.Compact style={{ width: '100%' }}>
                                            <Input
                                                size="large"
                                                placeholder="Hỏi về quyền lợi, điều khoản loại trừ..."
                                                value={inputValue}
                                                onChange={e => setInputValue(e.target.value)}
                                                onPressEnter={handleSendMessage}
                                            />
                                            <Button size="large" type="primary" icon={<SendOutlined />} onClick={handleSendMessage}>
                                                Gửi
                                            </Button>
                                        </Space.Compact>
                                    </div>
                                </Card>
                            )
                        }
                    ]}
                />
            </Col>
        </Row>
    )
}

const AIBVLPage = () => {
    return (
        <Layout style={{ minHeight: '100%', background: 'transparent' }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>AI Đào tạo & Luyện thi</Title>
                <Text type="secondary">Hệ thống hỗ trợ học tập thông minh với nguồn dữ liệu từ tài liệu nội bộ.</Text>
            </div>

            <Tabs
                defaultActiveKey="student"
                size="large"
                items={[
                    {
                        key: 'admin',
                        label: 'Quản trị viên (Admin)',
                        children: <AdminView />
                    },
                    {
                        key: 'student',
                        label: 'Học viên (Học & Thi)',
                        children: <StudentView />
                    }
                ]}
            />
        </Layout>
    );
};

export default AIBVLPage;
