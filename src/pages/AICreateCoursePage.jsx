import React, { useState } from "react";
import {
    Card,
    Upload,
    Button,
    Space,
    Typography,
    Input,
    Steps,
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
    Timeline,
    Alert,
    InputNumber,
} from "antd";
import {
    UploadOutlined,
    RobotOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    BookOutlined,
    BulbOutlined,
    ThunderboltOutlined,
    SettingOutlined,
    EyeOutlined,
    DownloadOutlined,
    PlayCircleOutlined,
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
    const [currentStep, setCurrentStep] = useState(0);
    const [fileList, setFileList] = useState([]);
    const [courseConfig, setCourseConfig] = useState({
        targetAudience: "employee",
        level: "beginner",
        numLessons: 12,
        duration: 4,
        includeQuiz: true,
        includeVideo: true,
        style: "practical",
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
            setFileList([...fileList, file]);
            message.success(`Đã tải lên ${file.name}`);
            return false;
        },
        onRemove: (file) => {
            const newFileList = fileList.filter((f) => f !== file);
            setFileList(newFileList);
        },
        fileList,
    };

    const handleGenerateCourse = () => {
        if (fileList.length === 0 && !customPrompt) {
            message.warning("Vui lòng tải lên tài liệu hoặc nhập yêu cầu tùy chỉnh");
            return;
        }

        setIsGenerating(true);
        setProgress(0);
        setCurrentStep(2);

        // Simulate AI generation progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsGenerating(false);
                    setGeneratedCourse(SAMPLE_COURSE);
                    message.success("Đã tạo khóa học thành công!");
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    const steps = [
        {
            title: "Tải tài liệu",
            icon: <UploadOutlined />,
        },
        {
            title: "Cấu hình",
            icon: <SettingOutlined />,
        },
        {
            title: "Tạo khóa học",
            icon: <RobotOutlined />,
        },
    ];

    const stepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <Card title="📁 Bước 1: Tải lên tài liệu học liệu">
                        <Space direction="vertical" style={{ width: "100%" }} size="large">
                            <Alert
                                message="Hỗ trợ nhiều loại file"
                                description="Bạn có thể tải lên PDF, Word, PowerPoint, hoặc file text chứa nội dung đề cương, tài liệu tham khảo để AI phân tích và tạo khóa học."
                                type="info"
                                showIcon
                            />

                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                    <FileTextOutlined style={{ fontSize: 48, color: "#1677ff" }} />
                                </p>
                                <p className="ant-upload-text">
                                    Click hoặc kéo file vào đây để tải lên
                                </p>
                                <p className="ant-upload-hint">
                                    Hỗ trợ: PDF, DOCX, PPTX, TXT (tối đa 10 files)
                                </p>
                            </Dragger>

                            <Divider>HOẶC</Divider>

                            <Card size="small" title="✍️ Nhập yêu cầu tùy chỉnh">
                                <TextArea
                                    rows={6}
                                    placeholder={`Ví dụ:\n- Tạo khóa học về an toàn thông tin cho nhân viên\n- Bao gồm 12 bài học, 4 module\n- Có video, quiz và case study\n- Tập trung vào thực hành\n- Độ khó: Cơ bản đến Trung cấp`}
                                    value={customPrompt}
                                    onChange={(e) => setCustomPrompt(e.target.value)}
                                />
                            </Card>

                            <Button
                                type="primary"
                                size="large"
                                block
                                onClick={() => setCurrentStep(1)}
                                disabled={fileList.length === 0 && !customPrompt}
                            >
                                Tiếp theo →
                            </Button>
                        </Space>
                    </Card>
                );

            case 1:
                return (
                    <Card title="⚙️ Bước 2: Cấu hình khóa học">
                        <Space direction="vertical" style={{ width: "100%" }} size="large">
                            <Row gutter={[16, 16]}>
                                <Col xs={24} md={12}>
                                    <Card size="small" title="Đối tượng học viên">
                                        <Select
                                            style={{ width: "100%" }}
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
                                    </Card>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Card size="small" title="Độ khó">
                                        <Radio.Group
                                            value={courseConfig.level}
                                            onChange={(e) =>
                                                setCourseConfig({ ...courseConfig, level: e.target.value })
                                            }
                                            style={{ width: "100%" }}
                                        >
                                            <Radio value="beginner">Cơ bản</Radio>
                                            <Radio value="intermediate">Trung cấp</Radio>
                                            <Radio value="advanced">Nâng cao</Radio>
                                        </Radio.Group>
                                    </Card>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Card size="small" title="Số lượng bài học">
                                        <Slider
                                            min={6}
                                            max={20}
                                            value={courseConfig.numLessons}
                                            onChange={(value) =>
                                                setCourseConfig({ ...courseConfig, numLessons: value })
                                            }
                                            marks={{
                                                6: "6",
                                                10: "10",
                                                15: "15",
                                                20: "20",
                                            }}
                                        />
                                        <Text type="secondary">
                                            {courseConfig.numLessons} bài học
                                        </Text>
                                    </Card>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Card size="small" title="Thời lượng khóa học">
                                        <InputNumber
                                            min={1}
                                            max={12}
                                            value={courseConfig.duration}
                                            onChange={(value) =>
                                                setCourseConfig({ ...courseConfig, duration: value })
                                            }
                                            addonAfter="tuần"
                                            style={{ width: "100%" }}
                                        />
                                    </Card>
                                </Col>

                                <Col xs={24}>
                                    <Card size="small" title="Phong cách nội dung">
                                        <Radio.Group
                                            value={courseConfig.style}
                                            onChange={(e) =>
                                                setCourseConfig({ ...courseConfig, style: e.target.value })
                                            }
                                            style={{ width: "100%" }}
                                        >
                                            <Space direction="vertical">
                                                <Radio value="theoretical">
                                                    <strong>Lý thuyết:</strong> Tập trung vào kiến thức nền tảng
                                                </Radio>
                                                <Radio value="practical">
                                                    <strong>Thực hành:</strong> Nhiều ví dụ, case study, bài tập
                                                </Radio>
                                                <Radio value="balanced">
                                                    <strong>Cân bằng:</strong> Kết hợp lý thuyết và thực hành
                                                </Radio>
                                            </Space>
                                        </Radio.Group>
                                    </Card>
                                </Col>

                                <Col xs={24}>
                                    <Card size="small" title="Nội dung bao gồm">
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
                                                {courseConfig.includeVideo && <CheckCircleOutlined />} Video bài giảng
                                            </Tag>
                                        </Space>
                                    </Card>
                                </Col>
                            </Row>

                            <Space style={{ width: "100%", justifyContent: "space-between" }}>
                                <Button onClick={() => setCurrentStep(0)}>← Quay lại</Button>
                                <Button type="primary" size="large" onClick={handleGenerateCourse}>
                                    <RobotOutlined /> Tạo khóa học bằng AI
                                </Button>
                            </Space>
                        </Space>
                    </Card>
                );

            case 2:
                return (
                    <Card
                        title={
                            isGenerating
                                ? "🤖 AI đang tạo khóa học..."
                                : "✅ Khóa học đã được tạo thành công!"
                        }
                    >
                        {isGenerating ? (
                            <Space direction="vertical" style={{ width: "100%" }} size="large">
                                <Progress percent={progress} status="active" />
                                <Timeline
                                    items={[
                                        {
                                            color: progress >= 20 ? "green" : "blue",
                                            children: (
                                                <Text>
                                                    Phân tích tài liệu và yêu cầu...{" "}
                                                    {progress >= 20 && <CheckCircleOutlined />}
                                                </Text>
                                            ),
                                        },
                                        {
                                            color: progress >= 40 ? "green" : "gray",
                                            children: (
                                                <Text>
                                                    Tạo cấu trúc khóa học...{" "}
                                                    {progress >= 40 && <CheckCircleOutlined />}
                                                </Text>
                                            ),
                                        },
                                        {
                                            color: progress >= 60 ? "green" : "gray",
                                            children: (
                                                <Text>
                                                    Sinh nội dung bài học...{" "}
                                                    {progress >= 60 && <CheckCircleOutlined />}
                                                </Text>
                                            ),
                                        },
                                        {
                                            color: progress >= 80 ? "green" : "gray",
                                            children: (
                                                <Text>
                                                    Tạo bài kiểm tra và quiz...{" "}
                                                    {progress >= 80 && <CheckCircleOutlined />}
                                                </Text>
                                            ),
                                        },
                                        {
                                            color: progress >= 100 ? "green" : "gray",
                                            children: (
                                                <Text>
                                                    Hoàn thiện và tối ưu hóa...{" "}
                                                    {progress >= 100 && <CheckCircleOutlined />}
                                                </Text>
                                            ),
                                        },
                                    ]}
                                />
                            </Space>
                        ) : generatedCourse ? (
                            <Space direction="vertical" style={{ width: "100%" }} size="large">
                                <Card
                                    size="small"
                                    style={{
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        color: "white",
                                    }}
                                >
                                    <Title level={3} style={{ color: "white", margin: 0 }}>
                                        {generatedCourse.title}
                                    </Title>
                                    <Paragraph style={{ color: "white", marginTop: 10, marginBottom: 0 }}>
                                        {generatedCourse.description}
                                    </Paragraph>
                                </Card>

                                <Row gutter={[16, 16]}>
                                    <Col xs={12} md={6}>
                                        <Card size="small">
                                            <Statistic
                                                title="Thời lượng"
                                                value={generatedCourse.duration}
                                                prefix={<ClockCircleOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Card size="small">
                                            <Statistic
                                                title="Độ khó"
                                                value={generatedCourse.level}
                                                prefix={<BulbOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Card size="small">
                                            <Statistic
                                                title="Số bài học"
                                                value={generatedCourse.totalLessons}
                                                prefix={<BookOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Card size="small">
                                            <Statistic
                                                title="Bài kiểm tra"
                                                value={generatedCourse.totalQuizzes}
                                                prefix={<CheckCircleOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                </Row>

                                <Card title="📚 Cấu trúc khóa học">
                                    <Collapse
                                        items={generatedCourse.modules.map((module, index) => ({
                                            key: index,
                                            label: (
                                                <Space>
                                                    <Tag color="blue">Module {index + 1}</Tag>
                                                    <Text strong>{module.title}</Text>
                                                    <Text type="secondary">
                                                        ({module.lessons.length} bài học)
                                                    </Text>
                                                </Space>
                                            ),
                                            children: (
                                                <List
                                                    dataSource={module.lessons}
                                                    renderItem={(lesson, lessonIndex) => (
                                                        <List.Item>
                                                            <List.Item.Meta
                                                                avatar={
                                                                    <Tag color="geekblue">
                                                                        {lessonIndex + 1}
                                                                    </Tag>
                                                                }
                                                                title={lesson.title}
                                                                description={
                                                                    <Space direction="vertical" size={4}>
                                                                        <Space>
                                                                            <Tag icon={<PlayCircleOutlined />}>
                                                                                {lesson.type}
                                                                            </Tag>
                                                                            <Tag>{lesson.duration}</Tag>
                                                                        </Space>
                                                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                                                            {lesson.topics.join(" • ")}
                                                                        </Text>
                                                                    </Space>
                                                                }
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            ),
                                        }))}
                                    />
                                </Card>

                                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                                    <Button
                                        onClick={() => {
                                            setCurrentStep(0);
                                            setGeneratedCourse(null);
                                            setFileList([]);
                                            setCustomPrompt("");
                                        }}
                                    >
                                        Tạo khóa học mới
                                    </Button>
                                    <Space>
                                        <Button icon={<EyeOutlined />}>Xem chi tiết</Button>
                                        <Button type="primary" icon={<DownloadOutlined />}>
                                            Xuất khóa học
                                        </Button>
                                    </Space>
                                </Space>
                            </Space>
                        ) : null}
                    </Card>
                );

            default:
                return null;
        }
    };

    return (
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
                <Col xs={24} lg={6}>
                    <Card size="small" title="📋 Quy trình">
                        <Steps
                            direction="vertical"
                            current={currentStep}
                            items={steps}
                            style={{ marginTop: 16 }}
                        />

                        <Divider />

                        <Alert
                            message="💡 Mẹo"
                            description={
                                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12 }}>
                                    <li>Tải lên đề cương hoặc tài liệu chi tiết</li>
                                    <li>Cấu hình rõ ràng để AI tạo đúng yêu cầu</li>
                                    <li>Có thể chỉnh sửa sau khi AI tạo xong</li>
                                </ul>
                            }
                            type="info"
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={18}>
                    {stepContent()}
                </Col>
            </Row>
        </div>
    );
}

// Add Statistic component for display
const Statistic = ({ title, value, prefix }) => (
    <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 24, color: "#1677ff", marginBottom: 8 }}>
            {prefix} {value}
        </div>
        <div style={{ color: "#8c8c8c", fontSize: 14 }}>{title}</div>
    </div>
);

// Add missing icon
import { ClockCircleOutlined } from "@ant-design/icons";

export default AICreateCoursePage;
