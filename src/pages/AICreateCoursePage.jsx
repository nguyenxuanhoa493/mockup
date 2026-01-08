import React, { useState } from "react";
import {
    Card,
    Upload,
    Button,
    Space,
    Typography,
    Input,
    message,
    Row,
    Col,
    Select,
    Slider,
    Radio,
    Divider,
    Tag,
    List,
    Progress,
    Collapse,
    Alert,
    InputNumber,
    Segmented,
    Badge,
} from "antd";
import {
    UploadOutlined,
    RobotOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    BookOutlined,
    BulbOutlined,
    ThunderboltOutlined,
    EyeOutlined,
    DownloadOutlined,
    PlayCircleOutlined,
    DeleteOutlined,
    ClockCircleOutlined,
    LoadingOutlined,
    EditOutlined,
    FileAddOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

const SAMPLE_COURSE = {
    title: "Kỹ năng an toàn thông tin khi sử dụng dịch vụ trực tuyến",
    description: "Khóa học cung cấp kiến thức và kỹ năng cần thiết để bảo vệ thông tin cá nhân và dữ liệu khi sử dụng các dịch vụ trực tuyến.",
    duration: "4 tuần",
    level: "Cơ bản đến Trung cấp",
    totalLessons: 12,
    totalQuizzes: 4,
    modules: [
        {
            title: "Module 1: Giới thiệu về An toàn thông tin",
            lessons: [
                {
                    title: "Bài 1: An toàn thông tin là gì?",
                    duration: "30 phút",
                    type: "video + text",
                    topics: ["Định nghĩa ATTT", "Tầm quan trọng", "Các mối đe dọa phổ biến"],
                },
                {
                    title: "Bài 2: Các loại tấn công mạng phổ biến",
                    duration: "45 phút",
                    type: "video + case study",
                    topics: ["Phishing", "Malware", "Ransomware", "Social Engineering"],
                },
                {
                    title: "Bài 3: Bài kiểm tra Module 1",
                    duration: "20 phút",
                    type: "quiz",
                    topics: ["15 câu hỏi trắc nghiệm"],
                },
            ],
        },
        {
            title: "Module 2: Bảo mật tài khoản và mật khẩu",
            lessons: [
                {
                    title: "Bài 4: Cách tạo mật khẩu mạnh",
                    duration: "30 phút",
                    type: "video + interactive",
                    topics: ["Quy tắc tạo mật khẩu", "Password manager", "2FA/MFA"],
                },
                {
                    title: "Bài 5: Quản lý và lưu trữ mật khẩu an toàn",
                    duration: "35 phút",
                    type: "video + demo",
                    topics: ["Sử dụng Password Manager", "Best practices", "Thực hành"],
                },
                {
                    title: "Bài 6: Xác thực hai yếu tố (2FA)",
                    duration: "25 phút",
                    type: "video + hands-on",
                    topics: ["Thiết lập 2FA", "Google Authenticator", "SMS vs App"],
                },
            ],
        },
        {
            title: "Module 3: An toàn khi sử dụng Email và Internet",
            lessons: [
                {
                    title: "Bài 7: Nhận diện email lừa đảo (Phishing)",
                    duration: "40 phút",
                    type: "video + quiz",
                    topics: ["Dấu hiệu nhận biết", "Ví dụ thực tế", "Cách xử lý"],
                },
                {
                    title: "Bài 8: Duyệt web an toàn",
                    duration: "35 phút",
                    type: "video + checklist",
                    topics: ["HTTPS", "Cookie", "VPN", "Private browsing"],
                },
                {
                    title: "Bài 9: Bảo mật khi mua sắm trực tuyến",
                    duration: "30 phút",
                    type: "video + tips",
                    topics: ["Kiểm tra website", "Thanh toán an toàn", "Bảo vệ thông tin thẻ"],
                },
            ],
        },
        {
            title: "Module 4: Bảo vệ dữ liệu cá nhân",
            lessons: [
                {
                    title: "Bài 10: Quản lý quyền riêng tư trên mạng xã hội",
                    duration: "35 phút",
                    type: "video + settings guide",
                    topics: ["Cài đặt Facebook", "Instagram", "LinkedIn", "TikTok"],
                },
                {
                    title: "Bài 11: Sao lưu và mã hóa dữ liệu",
                    duration: "40 phút",
                    type: "video + tutorial",
                    topics: ["Cloud backup", "Encryption", "Best practices"],
                },
                {
                    title: "Bài 12: Tổng kết và kiểm tra cuối khóa",
                    duration: "60 phút",
                    type: "final exam",
                    topics: ["30 câu hỏi tổng hợp", "Case study", "Chứng chỉ"],
                },
            ],
        },
    ],
};

function AICreateCoursePage() {
    const [contentType, setContentType] = useState("course"); // 'course', 'content', 'exercise'
    const [fileList, setFileList] = useState([]);
    const [fileStatus, setFileStatus] = useState({}); // Track embedding status per file
    const [courseConfig, setCourseConfig] = useState({
        targetAudience: "employee",
        level: "beginner",
        numLessons: 12,
        duration: 4,
        includeQuiz: true,
        includeVideo: true,
        style: "practical",
    });
    const [contentConfig, setContentConfig] = useState({
        contentType: "video-script",
        length: "medium",
        format: "structured",
    });
    const [exerciseConfig, setExerciseConfig] = useState({
        exerciseType: "quiz",
        difficulty: "medium",
        numQuestions: 10,
    });
    const [customPrompt, setCustomPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCourse, setGeneratedCourse] = useState(null);
    const [progress, setProgress] = useState(0);

    React.useEffect(() => {
        document.title = "Tạo khóa học bằng AI - Mockup App";
    }, []);

    const uploadProps = {
        name: "file",
        multiple: true,
        accept: ".pdf,.docx,.txt,.pptx",
        beforeUpload: (file) => {
            const fileId = file.uid || `${file.name}-${Date.now()}`;
            setFileList([...fileList, { ...file, uid: fileId }]);
            setFileStatus({
                ...fileStatus,
                [fileId]: { status: "pending", progress: 0 },
            });
            message.success(`Đã tải lên ${file.name}`);
            
            // Simulate embedding process
            setTimeout(() => {
                setFileStatus((prev) => ({
                    ...prev,
                    [fileId]: { status: "processing", progress: 0 },
                }));
                
                const interval = setInterval(() => {
                    setFileStatus((prev) => {
                        const current = prev[fileId]?.progress || 0;
                        if (current >= 100) {
                            clearInterval(interval);
                            return {
                                ...prev,
                                [fileId]: { 
                                    status: "completed", 
                                    progress: 100,
                                    vectors: Math.floor(Math.random() * 500) + 100,
                                    chunks: Math.floor(Math.random() * 50) + 10,
                                },
                            };
                        }
                        return {
                            ...prev,
                            [fileId]: { ...prev[fileId], progress: current + 20 },
                        };
                    });
                }, 300);
            }, 500);
            
            return false;
        },
        onRemove: (file) => {
            const fileId = file.uid;
            const newFileList = fileList.filter((f) => f.uid !== fileId);
            setFileList(newFileList);
            const newStatus = { ...fileStatus };
            delete newStatus[fileId];
            setFileStatus(newStatus);
        },
        fileList,
    };

    const handleGenerateCourse = () => {
        if (fileList.length === 0 && !customPrompt) {
            message.warning("Vui lòng tải lên tài liệu hoặc nhập yêu cầu tùy chỉnh");
            return;
        }

        // Check if all files are embedded
        const allFilesEmbedded = fileList.every(
            (file) => fileStatus[file.uid]?.status === "completed"
        );
        
        if (!allFilesEmbedded && fileList.length > 0) {
            message.warning("Vui lòng đợi tất cả file được xử lý xong");
            return;
        }

        setIsGenerating(true);
        setProgress(0);

        // Simulate AI generation progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsGenerating(false);
                    setGeneratedCourse(SAMPLE_COURSE);
                    message.success(`Đã tạo ${contentType === 'course' ? 'khóa học' : contentType === 'content' ? 'nội dung' : 'bài tập'} thành công!`);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    const getEmbeddingStats = () => {
        const completed = fileList.filter(f => fileStatus[f.uid]?.status === "completed").length;
        const processing = fileList.filter(f => fileStatus[f.uid]?.status === "processing").length;
        const pending = fileList.filter(f => fileStatus[f.uid]?.status === "pending").length;
        const totalVectors = fileList.reduce((sum, f) => sum + (fileStatus[f.uid]?.vectors || 0), 0);
        const totalChunks = fileList.reduce((sum, f) => sum + (fileStatus[f.uid]?.chunks || 0), 0);
        
        return { completed, processing, pending, totalVectors, totalChunks, total: fileList.length };
    };

    const stats = getEmbeddingStats();

    const renderConfigPanel = () => {
        switch (contentType) {
            case "course":
                return (
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <div>
                                    <Text strong>Đối tượng học viên</Text>
                                    <Select
                                        style={{ width: "100%", marginTop: 8 }}
                                        value={courseConfig.targetAudience}
                                        onChange={(value) =>
                                            setCourseConfig({ ...courseConfig, targetAudience: value })
                                        }
                                        options={[
                                            { value: "employee", label: "Nhân viên văn phòng" },
                                            { value: "manager", label: "Quản lý cấp trung" },
                                            { value: "technical", label: "Nhân viên IT/Kỹ thuật" },
                                            { value: "sales", label: "Nhân viên kinh doanh" },
                                            { value: "general", label: "Tất cả nhân viên" },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <Text strong>Độ khó</Text>
                                    <Select
                                        style={{ width: "100%", marginTop: 8 }}
                                        value={courseConfig.level}
                                        onChange={(value) =>
                                            setCourseConfig({ ...courseConfig, level: value })
                                        }
                                        options={[
                                            { value: "beginner", label: "Cơ bản" },
                                            { value: "intermediate", label: "Trung cấp" },
                                            { value: "advanced", label: "Nâng cao" },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <Text strong>Số lượng bài học: {courseConfig.numLessons}</Text>
                                    <Slider
                                        min={6}
                                        max={20}
                                        value={courseConfig.numLessons}
                                        onChange={(value) =>
                                            setCourseConfig({ ...courseConfig, numLessons: value })
                                        }
                                        marks={{ 6: "6", 10: "10", 15: "15", 20: "20" }}
                                        style={{ marginTop: 8 }}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <Text strong>Thời lượng (tuần)</Text>
                                    <InputNumber
                                        min={1}
                                        max={12}
                                        value={courseConfig.duration}
                                        onChange={(value) =>
                                            setCourseConfig({ ...courseConfig, duration: value })
                                        }
                                        style={{ width: "100%", marginTop: 8 }}
                                    />
                                </div>
                            </Col>
                            <Col span={24}>
                                <div>
                                    <Text strong>Phong cách</Text>
                                    <Radio.Group
                                        value={courseConfig.style}
                                        onChange={(e) =>
                                            setCourseConfig({ ...courseConfig, style: e.target.value })
                                        }
                                        style={{ marginTop: 8, display: "block" }}
                                    >
                                        <Space direction="vertical">
                                            <Radio value="theoretical">Lý thuyết</Radio>
                                            <Radio value="practical">Thực hành</Radio>
                                            <Radio value="balanced">Cân bằng</Radio>
                                        </Space>
                                    </Radio.Group>
                                </div>
                            </Col>
                            <Col span={24}>
                                <div>
                                    <Text strong>Bao gồm</Text>
                                    <div style={{ marginTop: 8 }}>
                                        <Space wrap>
                                            <Tag
                                                color={courseConfig.includeQuiz ? "blue" : "default"}
                                                style={{ cursor: "pointer", padding: "5px 15px" }}
                                                onClick={() =>
                                                    setCourseConfig({
                                                        ...courseConfig,
                                                        includeQuiz: !courseConfig.includeQuiz,
                                                    })
                                                }
                                            >
                                                {courseConfig.includeQuiz && <CheckCircleOutlined />} Bài kiểm tra
                                            </Tag>
                                            <Tag
                                                color={courseConfig.includeVideo ? "blue" : "default"}
                                                style={{ cursor: "pointer", padding: "5px 15px" }}
                                                onClick={() =>
                                                    setCourseConfig({
                                                        ...courseConfig,
                                                        includeVideo: !courseConfig.includeVideo,
                                                    })
                                                }
                                            >
                                                {courseConfig.includeVideo && <CheckCircleOutlined />} Video
                                            </Tag>
                                        </Space>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Space>
                );

            case "content":
                return (
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <div>
                                    <Text strong>Loại nội dung</Text>
                                    <Select
                                        style={{ width: "100%", marginTop: 8 }}
                                        value={contentConfig.contentType}
                                        onChange={(value) =>
                                            setContentConfig({ ...contentConfig, contentType: value })
                                        }
                                        options={[
                                            { value: "video-script", label: "Video Script" },
                                            { value: "reading", label: "Tài liệu đọc" },
                                            { value: "case-study", label: "Case Study" },
                                            { value: "presentation", label: "Bài thuyết trình" },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <Text strong>Độ dài</Text>
                                    <Select
                                        style={{ width: "100%", marginTop: 8 }}
                                        value={contentConfig.length}
                                        onChange={(value) =>
                                            setContentConfig({ ...contentConfig, length: value })
                                        }
                                        options={[
                                            { value: "short", label: "Ngắn (5-10 phút)" },
                                            { value: "medium", label: "Trung bình (10-20 phút)" },
                                            { value: "long", label: "Dài (20-30 phút)" },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <Text strong>Định dạng</Text>
                                    <Select
                                        style={{ width: "100%", marginTop: 8 }}
                                        value={contentConfig.format}
                                        onChange={(value) =>
                                            setContentConfig({ ...contentConfig, format: value })
                                        }
                                        options={[
                                            { value: "structured", label: "Có cấu trúc" },
                                            { value: "narrative", label: "Tự sự" },
                                            { value: "interactive", label: "Tương tác" },
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Space>
                );

            case "exercise":
                return (
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <div>
                                    <Text strong>Loại bài tập</Text>
                                    <Select
                                        style={{ width: "100%", marginTop: 8 }}
                                        value={exerciseConfig.exerciseType}
                                        onChange={(value) =>
                                            setExerciseConfig({ ...exerciseConfig, exerciseType: value })
                                        }
                                        options={[
                                            { value: "quiz", label: "Trắc nghiệm" },
                                            { value: "assignment", label: "Bài tập thực hành" },
                                            { value: "case-study", label: "Phân tích tình huống" },
                                            { value: "project", label: "Dự án" },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <Text strong>Độ khó</Text>
                                    <Select
                                        style={{ width: "100%", marginTop: 8 }}
                                        value={exerciseConfig.difficulty}
                                        onChange={(value) =>
                                            setExerciseConfig({ ...exerciseConfig, difficulty: value })
                                        }
                                        options={[
                                            { value: "easy", label: "Dễ" },
                                            { value: "medium", label: "Trung bình" },
                                            { value: "hard", label: "Khó" },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <Text strong>Số lượng câu hỏi</Text>
                                    <InputNumber
                                        min={5}
                                        max={50}
                                        value={exerciseConfig.numQuestions}
                                        onChange={(value) =>
                                            setExerciseConfig({ ...exerciseConfig, numQuestions: value })
                                        }
                                        style={{ width: "100%", marginTop: 8 }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Space>
                );

            default:
                return null;
        }
    };

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                }}
            >
                <Title level={2} style={{ margin: 0 }}>
                    <ThunderboltOutlined style={{ marginRight: 8 }} />
                    Tạo khóa học bằng AI
                </Title>
                <Tag color="purple" style={{ fontSize: 14, padding: "5px 15px" }}>
                    <RobotOutlined /> AI-Powered
                </Tag>
            </div>

            <Row gutter={[24, 24]}>
                {/* LEFT PANEL - Upload & Embedding Status */}
                <Col xs={24} lg={10}>
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        {/* File Upload Section */}
                        <Card title={<><UploadOutlined /> Tải lên tài liệu</>}>
                            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                <Dragger {...uploadProps}>
                                    <p className="ant-upload-drag-icon">
                                        <FileTextOutlined style={{ fontSize: 48, color: "#1677ff" }} />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click hoặc kéo file vào đây
                                    </p>
                                    <p className="ant-upload-hint">
                                        Hỗ trợ: PDF, DOCX, PPTX, TXT
                                    </p>
                                </Dragger>

                                <Divider style={{ margin: "8px 0" }}>HOẶC</Divider>

                                <TextArea
                                    rows={4}
                                    placeholder="Nhập mô tả yêu cầu tùy chỉnh..."
                                    value={customPrompt}
                                    onChange={(e) => setCustomPrompt(e.target.value)}
                                />
                            </Space>
                        </Card>

                        {/* Embedding Status Section */}
                        {fileList.length > 0 && (
                            <Card 
                                title={
                                    <Space>
                                        <LoadingOutlined spin={stats.processing > 0} />
                                        Trạng thái xử lý
                                    </Space>
                                }
                            >
                                <Space direction="vertical" style={{ width: "100%" }} size="small">
                                    {/* Overall Stats */}
                                    <Row gutter={8}>
                                        <Col span={8}>
                                            <Card size="small" style={{ textAlign: "center" }}>
                                                <Badge status={stats.processing > 0 ? "processing" : "success"} />
                                                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                                                    {stats.completed}/{stats.total}
                                                </div>
                                                <Text type="secondary" style={{ fontSize: 12 }}>Hoàn thành</Text>
                                            </Card>
                                        </Col>
                                        <Col span={8}>
                                            <Card size="small" style={{ textAlign: "center" }}>
                                                <FileTextOutlined style={{ fontSize: 16, color: "#1677ff" }} />
                                                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                                                    {stats.totalChunks}
                                                </div>
                                                <Text type="secondary" style={{ fontSize: 12 }}>Chunks</Text>
                                            </Card>
                                        </Col>
                                        <Col span={8}>
                                            <Card size="small" style={{ textAlign: "center" }}>
                                                <ThunderboltOutlined style={{ fontSize: 16, color: "#52c41a" }} />
                                                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                                                    {stats.totalVectors}
                                                </div>
                                                <Text type="secondary" style={{ fontSize: 12 }}>Vectors</Text>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Divider style={{ margin: "12px 0" }} />

                                    {/* File Status List */}
                                    <List
                                        size="small"
                                        dataSource={fileList}
                                        renderItem={(file) => {
                                            const status = fileStatus[file.uid] || {};
                                            return (
                                                <List.Item
                                                    actions={[
                                                        <Button
                                                            type="text"
                                                            size="small"
                                                            danger
                                                            icon={<DeleteOutlined />}
                                                            onClick={() => uploadProps.onRemove(file)}
                                                        />
                                                    ]}
                                                >
                                                    <List.Item.Meta
                                                        avatar={
                                                            status.status === "completed" ? (
                                                                <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 20 }} />
                                                            ) : status.status === "processing" ? (
                                                                <LoadingOutlined style={{ color: "#1677ff", fontSize: 20 }} />
                                                            ) : (
                                                                <ClockCircleOutlined style={{ color: "#faad14", fontSize: 20 }} />
                                                            )
                                                        }
                                                        title={
                                                            <Text ellipsis style={{ maxWidth: 200 }}>
                                                                {file.name}
                                                            </Text>
                                                        }
                                                        description={
                                                            status.status === "completed" ? (
                                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                                    {status.chunks} chunks • {status.vectors} vectors
                                                                </Text>
                                                            ) : status.status === "processing" ? (
                                                                <Progress percent={status.progress} size="small" />
                                                            ) : (
                                                                <Text type="secondary" style={{ fontSize: 12 }}>Đang chờ...</Text>
                                                            )
                                                        }
                                                    />
                                                </List.Item>
                                            );
                                        }}
                                    />
                                </Space>
                            </Card>
                        )}
                    </Space>
                </Col>

                {/* RIGHT PANEL - Configuration & Generation */}
                <Col xs={24} lg={14}>
                    <Space direction="vertical" style={{ width: "100%" }} size="middle">
                        {/* Content Type Selection */}
                        <Card title={<><FileAddOutlined /> Loại nội dung</>}>
                            <Segmented
                                block
                                value={contentType}
                                onChange={setContentType}
                                options={[
                                    {
                                        label: (
                                            <div style={{ padding: "8px 0" }}>
                                                <div><BookOutlined /> Tạo khóa học</div>
                                                <Text type="secondary" style={{ fontSize: 11 }}>
                                                    Khóa học hoàn chỉnh với modules
                                                </Text>
                                            </div>
                                        ),
                                        value: "course",
                                    },
                                    {
                                        label: (
                                            <div style={{ padding: "8px 0" }}>
                                                <div><FileTextOutlined /> Tạo nội dung</div>
                                                <Text type="secondary" style={{ fontSize: 11 }}>
                                                    Nội dung đơn lẻ hoặc bài học
                                                </Text>
                                            </div>
                                        ),
                                        value: "content",
                                    },
                                    {
                                        label: (
                                            <div style={{ padding: "8px 0" }}>
                                                <div><EditOutlined /> Bài tập</div>
                                                <Text type="secondary" style={{ fontSize: 11 }}>
                                                    Quiz và bài tập thực hành
                                                </Text>
                                            </div>
                                        ),
                                        value: "exercise",
                                    },
                                ]}
                            />
                        </Card>

                        {/* Dynamic Configuration Panel */}
                        <Card title={<><BulbOutlined /> Cấu hình</>}>
                            {renderConfigPanel()}
                        </Card>

                        {/* Custom Prompt Section */}
                        <Card title={<><RobotOutlined /> Prompt tùy chỉnh</>}>
                            <TextArea
                                rows={6}
                                placeholder={
                                    contentType === "course"
                                        ? "Ví dụ:\n- Tạo khóa học về an toàn thông tin cho nhân viên\n- Bao gồm 12 bài học, 4 module\n- Có video, quiz và case study\n- Tập trung vào thực hành\n- Độ khó: Cơ bản đến Trung cấp"
                                        : contentType === "content"
                                        ? "Ví dụ:\n- Tạo video script về bảo mật mật khẩu\n- Thời lượng 10 phút\n- Phong cách: Dễ hiểu, có ví dụ thực tế\n- Bao gồm demo và checklist"
                                        : "Ví dụ:\n- Tạo 20 câu hỏi trắc nghiệm về an toàn thông tin\n- Độ khó: Trung bình\n- Có giải thích đáp án\n- Bao gồm case study"
                                }
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                            />
                        </Card>

                        {/* Generate Button */}
                        <Button
                            type="primary"
                            size="large"
                            block
                            icon={isGenerating ? <LoadingOutlined /> : <ThunderboltOutlined />}
                            onClick={handleGenerateCourse}
                            disabled={isGenerating || (fileList.length === 0 && !customPrompt) || stats.processing > 0}
                            loading={isGenerating}
                        >
                            {isGenerating ? `Đang tạo... ${progress}%` : `Tạo ${contentType === 'course' ? 'khóa học' : contentType === 'content' ? 'nội dung' : 'bài tập'} bằng AI`}
                        </Button>

                        {/* Generation Progress */}
                        {isGenerating && (
                            <Card>
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <Progress percent={progress} status="active" />
                                    <List
                                        size="small"
                                        dataSource={[
                                            { step: "Phân tích tài liệu", threshold: 20 },
                                            { step: "Tạo cấu trúc", threshold: 40 },
                                            { step: "Sinh nội dung", threshold: 60 },
                                            { step: "Tạo bài kiểm tra", threshold: 80 },
                                            { step: "Hoàn thiện", threshold: 100 },
                                        ]}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <Space>
                                                    {progress >= item.threshold ? (
                                                        <CheckCircleOutlined style={{ color: "#52c41a" }} />
                                                    ) : progress >= item.threshold - 20 ? (
                                                        <LoadingOutlined />
                                                    ) : (
                                                        <ClockCircleOutlined style={{ color: "#d9d9d9" }} />
                                                    )}
                                                    <Text
                                                        type={progress >= item.threshold ? "success" : "secondary"}
                                                    >
                                                        {item.step}
                                                    </Text>
                                                </Space>
                                            </List.Item>
                                        )}
                                    />
                                </Space>
                            </Card>
                        )}

                        {/* Generated Result */}
                        {generatedCourse && !isGenerating && (
                            <Card
                                title={<><CheckCircleOutlined style={{ color: "#52c41a" }} /> Kết quả</>}
                                extra={
                                    <Space>
                                        <Button icon={<EyeOutlined />}>Xem chi tiết</Button>
                                        <Button type="primary" icon={<DownloadOutlined />}>
                                            Xuất
                                        </Button>
                                    </Space>
                                }
                            >
                                <Alert
                                    message="Đã tạo thành công!"
                                    description={`${contentType === 'course' ? 'Khóa học' : contentType === 'content' ? 'Nội dung' : 'Bài tập'} đã được tạo và sẵn sàng sử dụng.`}
                                    type="success"
                                    showIcon
                                />
                                <Divider />
                                {/* Show preview based on content type */}
                                <div>
                                    <Title level={4}>{generatedCourse.title}</Title>
                                    <Paragraph>{generatedCourse.description}</Paragraph>
                                    <Space wrap>
                                        <Tag icon={<ClockCircleOutlined />}>{generatedCourse.duration}</Tag>
                                        <Tag icon={<BookOutlined />}>{generatedCourse.totalLessons} bài học</Tag>
                                        <Tag icon={<CheckCircleOutlined />}>{generatedCourse.totalQuizzes} bài kiểm tra</Tag>
                                    </Space>
                                </div>
                            </Card>
                        )}
                    </Space>
                </Col>
            </Row>
        </div>
    );
}

export default AICreateCoursePage;
