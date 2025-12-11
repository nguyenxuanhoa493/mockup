import React, { useState } from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Input,
    InputNumber,
    Table,
    message,
    Row,
    Col,
    Select,
    Radio,
    Divider,
    Tag,
    Switch,
    Slider,
    Alert,
    Descriptions,
    Modal,
    Form,
} from "antd";
import {
    PlusOutlined,
    DeleteOutlined,
    EditOutlined,
    SaveOutlined,
    EyeOutlined,
    RobotOutlined,
    CheckCircleOutlined,
    WarningOutlined,
    FileSearchOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const DEFAULT_CRITERIA = [
    {
        key: "1",
        name: "Nội dung và độ chính xác",
        description: "Bài làm trả lời đúng trọng tâm câu hỏi, nội dung chính xác, logic rõ ràng",
        weight: 30,
        maxScore: 3,
    },
    {
        key: "2",
        name: "Tính sáng tạo và tư duy phản biện",
        description: "Có quan điểm độc đáo, phân tích sâu sắc, đưa ra ví dụ thực tế",
        weight: 20,
        maxScore: 2,
    },
    {
        key: "3",
        name: "Cấu trúc và tổ chức",
        description: "Bài viết có cấu trúc rõ ràng: mở bài, thân bài, kết luận. Ý logic, mạch lạc",
        weight: 20,
        maxScore: 2,
    },
    {
        key: "4",
        name: "Ngôn ngữ và văn phong",
        description: "Sử dụng ngôn ngữ phù hợp, văn phong học thuật/chuyên nghiệp, ít lỗi chính tả",
        weight: 15,
        maxScore: 1.5,
    },
    {
        key: "5",
        name: "Độ dài và đầy đủ",
        description: "Đạt yêu cầu về độ dài (300-500 từ), trả lời đầy đủ các phần của câu hỏi",
        weight: 15,
        maxScore: 1.5,
    },
];

function AIGradingConfigPage() {
    const [contestName, setContestName] = useState("Cuộc thi viết về An toàn thông tin");
    const [essayQuestion, setEssayQuestion] = useState(
        "Phân tích tầm quan trọng của việc bảo vệ thông tin cá nhân trong thời đại số. Đưa ra ít nhất 3 giải pháp cụ thể để bảo vệ dữ liệu cá nhân khi sử dụng dịch vụ trực tuyến."
    );
    const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);
    const [gradingStyle, setGradingStyle] = useState("moderate");
    const [detectAI, setDetectAI] = useState(true);
    const [aiSensitivity, setAiSensitivity] = useState(70);
    const [detectPlagiarism, setDetectPlagiarism] = useState(true);
    const [plagiarismThreshold, setPlagiarismThreshold] = useState(30);
    const [requirements, setRequirements] = useState(
        "- Độ dài: 300-500 từ\n- Có ít nhất 3 giải pháp cụ thể\n- Dẫn chứng thực tế hoặc số liệu\n- Không sao chép từ nguồn khác\n- Viết bằng tiếng Việt"
    );
    const [showPreview, setShowPreview] = useState(false);
    const [editingKey, setEditingKey] = useState("");
    const [form] = Form.useForm();

    React.useEffect(() => {
        document.title = "Cấu hình chấm điểm AI - Mockup App";
    }, []);

    const totalWeight = criteria.reduce((sum, item) => sum + item.weight, 0);

    const handleAddCriterion = () => {
        const newKey = String(criteria.length + 1);
        const newCriterion = {
            key: newKey,
            name: "Tiêu chí mới",
            description: "Mô tả tiêu chí",
            weight: 0,
            maxScore: 1,
        };
        setCriteria([...criteria, newCriterion]);
    };

    const handleDeleteCriterion = (key) => {
        setCriteria(criteria.filter((item) => item.key !== key));
        message.success("Đã xóa tiêu chí");
    };

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: "",
            description: "",
            weight: 0,
            maxScore: 0,
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...criteria];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setCriteria(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const columns = [
        {
            title: "STT",
            width: 60,
            render: (_, __, index) => index + 1,
        },
        {
            title: "Tiêu chí",
            dataIndex: "name",
            width: 200,
            editable: true,
            render: (text, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form.Item name="name" style={{ margin: 0 }} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                ) : (
                    <Text strong>{text}</Text>
                );
            },
        },
        {
            title: "Mô tả chi tiết",
            dataIndex: "description",
            editable: true,
            render: (text, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form.Item name="description" style={{ margin: 0 }}>
                        <TextArea rows={2} />
                    </Form.Item>
                ) : (
                    <Text type="secondary">{text}</Text>
                );
            },
        },
        {
            title: "Trọng số (%)",
            dataIndex: "weight",
            width: 120,
            editable: true,
            render: (text, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form.Item
                        name="weight"
                        style={{ margin: 0 }}
                        rules={[{ required: true, type: "number", min: 0, max: 100 }]}
                    >
                        <InputNumber min={0} max={100} />
                    </Form.Item>
                ) : (
                    <Tag color="blue">{text}%</Tag>
                );
            },
        },
        {
            title: "Điểm tối đa",
            dataIndex: "maxScore",
            width: 100,
            editable: true,
            render: (text, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form.Item
                        name="maxScore"
                        style={{ margin: 0 }}
                        rules={[{ required: true, type: "number", min: 0 }]}
                    >
                        <InputNumber min={0} step={0.5} />
                    </Form.Item>
                ) : (
                    <Text>{text} điểm</Text>
                );
            },
        },
        {
            title: "Thao tác",
            width: 120,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size="small">
                        <Button type="link" onClick={() => save(record.key)} size="small">
                            Lưu
                        </Button>
                        <Button type="link" onClick={cancel} size="small">
                            Hủy
                        </Button>
                    </Space>
                ) : (
                    <Space size="small">
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => edit(record)}
                            disabled={editingKey !== ""}
                            size="small"
                        >
                            Sửa
                        </Button>
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteCriterion(record.key)}
                            disabled={editingKey !== ""}
                            size="small"
                        >
                            Xóa
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const handleSaveConfig = () => {
        if (totalWeight !== 100) {
            message.error("Tổng trọng số phải bằng 100%!");
            return;
        }

        message.success("Đã lưu cấu hình chấm điểm thành công!");
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
                    <RobotOutlined style={{ marginRight: 8 }} />
                    Cấu hình AI chấm điểm tự động
                </Title>
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => setShowPreview(true)}>
                        Xem trước
                    </Button>
                    <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        size="large"
                        onClick={handleSaveConfig}
                    >
                        Lưu cấu hình
                    </Button>
                </Space>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24}>
                    <Card title="📋 Thông tin cuộc thi">
                        <Space direction="vertical" style={{ width: "100%" }} size="middle">
                            <div>
                                <Text strong>Tên cuộc thi/bài thi:</Text>
                                <Input
                                    value={contestName}
                                    onChange={(e) => setContestName(e.target.value)}
                                    placeholder="Nhập tên cuộc thi"
                                    style={{ marginTop: 8 }}
                                />
                            </div>
                            <div>
                                <Text strong>Câu hỏi tự luận:</Text>
                                <TextArea
                                    rows={4}
                                    value={essayQuestion}
                                    onChange={(e) => setEssayQuestion(e.target.value)}
                                    placeholder="Nhập câu hỏi tự luận"
                                    style={{ marginTop: 8 }}
                                />
                            </div>
                            <div>
                                <Text strong>Yêu cầu cụ thể:</Text>
                                <TextArea
                                    rows={5}
                                    value={requirements}
                                    onChange={(e) => setRequirements(e.target.value)}
                                    placeholder="Nhập các yêu cầu cụ thể (độ dài, nội dung, format...)"
                                    style={{ marginTop: 8 }}
                                />
                            </div>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24}>
                    <Card
                        title="📊 Tiêu chí chấm điểm và trọng số"
                        extra={
                            <Space>
                                <Text>
                                    Tổng trọng số:{" "}
                                    <Tag color={totalWeight === 100 ? "success" : "error"}>
                                        {totalWeight}%
                                    </Tag>
                                </Text>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={handleAddCriterion}
                                    disabled={editingKey !== ""}
                                >
                                    Thêm tiêu chí
                                </Button>
                            </Space>
                        }
                    >
                        {totalWeight !== 100 && (
                            <Alert
                                message="Cảnh báo"
                                description={`Tổng trọng số hiện tại là ${totalWeight}%. Vui lòng điều chỉnh để tổng bằng 100%.`}
                                type="warning"
                                showIcon
                                style={{ marginBottom: 16 }}
                            />
                        )}
                        <Form form={form} component={false}>
                            <Table
                                dataSource={criteria}
                                columns={columns}
                                pagination={false}
                                bordered
                                size="middle"
                            />
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="🎯 Phong cách chấm điểm">
                        <Space direction="vertical" style={{ width: "100%" }} size="large">
                            <Radio.Group
                                value={gradingStyle}
                                onChange={(e) => setGradingStyle(e.target.value)}
                                style={{ width: "100%" }}
                            >
                                <Space direction="vertical">
                                    <Radio value="strict">
                                        <Space direction="vertical" size={0}>
                                            <Text strong>Nghiêm khắc</Text>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                Yêu cầu cao, chấm điểm chặt chẽ, ít khoan hồng
                                            </Text>
                                        </Space>
                                    </Radio>
                                    <Radio value="moderate">
                                        <Space direction="vertical" size={0}>
                                            <Text strong>Vừa phải (Khuyến nghị)</Text>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                Cân bằng giữa nghiêm túc và linh hoạt
                                            </Text>
                                        </Space>
                                    </Radio>
                                    <Radio value="lenient">
                                        <Space direction="vertical" size={0}>
                                            <Text strong>Linh hoạt</Text>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                Khuyến khích, dễ đạt điểm cao hơn
                                            </Text>
                                        </Space>
                                    </Radio>
                                </Space>
                            </Radio.Group>

                            <Divider />

                            <div>
                                <Space style={{ marginBottom: 12 }}>
                                    <Text strong>Phản hồi chi tiết cho học viên:</Text>
                                    <Switch defaultChecked />
                                </Space>
                                <Paragraph type="secondary" style={{ fontSize: 12, margin: 0 }}>
                                    AI sẽ cung cấp nhận xét chi tiết cho từng tiêu chí và gợi ý cải thiện
                                </Paragraph>
                            </div>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Space>
                                <WarningOutlined style={{ color: "#faad14" }} />
                                <span>Phát hiện nội dung từ AI</span>
                            </Space>
                        }
                    >
                        <Space direction="vertical" style={{ width: "100%" }} size="large">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text>Bật tính năng phát hiện:</Text>
                                <Switch checked={detectAI} onChange={setDetectAI} />
                            </div>

                            {detectAI && (
                                <>
                                    <div>
                                        <Text>Độ nhạy phát hiện:</Text>
                                        <Slider
                                            value={aiSensitivity}
                                            onChange={setAiSensitivity}
                                            marks={{
                                                0: "Thấp",
                                                50: "Trung bình",
                                                100: "Cao",
                                            }}
                                            tooltip={{
                                                formatter: (value) => `${value}%`,
                                            }}
                                        />
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            Hiện tại: {aiSensitivity}% - Nếu bài làm có{" "}
                                            <Text strong>{aiSensitivity}%</Text> hoặc cao hơn khả năng
                                            được viết bởi AI sẽ được cảnh báo
                                        </Text>
                                    </div>

                                    <Alert
                                        message="Xử lý khi phát hiện"
                                        description={
                                            <Radio.Group defaultValue="warn">
                                                <Space direction="vertical">
                                                    <Radio value="warn">
                                                        Cảnh báo và giảm 20% điểm
                                                    </Radio>
                                                    <Radio value="fail">Tự động cho điểm 0</Radio>
                                                    <Radio value="review">
                                                        Đánh dấu để giám khảo xem xét
                                                    </Radio>
                                                </Space>
                                            </Radio.Group>
                                        }
                                        type="warning"
                                        showIcon
                                    />
                                </>
                            )}
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Space>
                                <FileSearchOutlined style={{ color: "#ff4d4f" }} />
                                <span>Phát hiện đạo văn (Plagiarism)</span>
                            </Space>
                        }
                    >
                        <Space direction="vertical" style={{ width: "100%" }} size="large">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text>Bật tính năng phát hiện:</Text>
                                <Switch checked={detectPlagiarism} onChange={setDetectPlagiarism} />
                            </div>

                            {detectPlagiarism && (
                                <>
                                    <div>
                                        <Text>Ngưỡng cảnh báo:</Text>
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            value={plagiarismThreshold}
                                            onChange={setPlagiarismThreshold}
                                            addonAfter="%"
                                            style={{ width: "100%", marginTop: 8 }}
                                        />
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            Cảnh báo nếu tỷ lệ trùng lặp ≥{" "}
                                            <Text strong>{plagiarismThreshold}%</Text>
                                        </Text>
                                    </div>

                                    <div>
                                        <Text strong>Nguồn kiểm tra:</Text>
                                        <Space wrap style={{ marginTop: 8 }}>
                                            <Tag color="blue" icon={<CheckCircleOutlined />}>
                                                Internet
                                            </Tag>
                                            <Tag color="blue" icon={<CheckCircleOutlined />}>
                                                Bài làm khác trong cuộc thi
                                            </Tag>
                                            <Tag color="blue" icon={<CheckCircleOutlined />}>
                                                Cơ sở dữ liệu nội bộ
                                            </Tag>
                                        </Space>
                                    </div>

                                    <Alert
                                        message="Xử lý khi phát hiện"
                                        description={
                                            <Radio.Group defaultValue="penalty">
                                                <Space direction="vertical">
                                                    <Radio value="penalty">
                                                        Trừ điểm theo tỷ lệ đạo văn
                                                    </Radio>
                                                    <Radio value="fail">Tự động loại</Radio>
                                                    <Radio value="manual">
                                                        Chuyển giám khảo xử lý thủ công
                                                    </Radio>
                                                </Space>
                                            </Radio.Group>
                                        }
                                        type="error"
                                        showIcon
                                    />
                                </>
                            )}
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="⚙️ Cấu hình nâng cao">
                        <Space direction="vertical" style={{ width: "100%" }} size="middle">
                            <div>
                                <Space style={{ marginBottom: 8 }}>
                                    <Text strong>Cho phép chấm lại:</Text>
                                    <Switch defaultChecked />
                                </Space>
                                <Paragraph type="secondary" style={{ fontSize: 12, margin: 0 }}>
                                    Học viên có thể yêu cầu chấm lại nếu không đồng ý với kết quả
                                </Paragraph>
                            </div>

                            <div>
                                <Space style={{ marginBottom: 8 }}>
                                    <Text strong>Hiển thị điểm từng tiêu chí:</Text>
                                    <Switch defaultChecked />
                                </Space>
                                <Paragraph type="secondary" style={{ fontSize: 12, margin: 0 }}>
                                    Cho học viên xem chi tiết điểm của từng tiêu chí
                                </Paragraph>
                            </div>

                            <div>
                                <Space style={{ marginBottom: 8 }}>
                                    <Text strong>Lưu lại lịch sử chấm:</Text>
                                    <Switch defaultChecked />
                                </Space>
                                <Paragraph type="secondary" style={{ fontSize: 12, margin: 0 }}>
                                    Lưu trữ kết quả chấm và phản hồi để tham khảo sau này
                                </Paragraph>
                            </div>

                            <Divider />

                            <div>
                                <Text strong>Ngôn ngữ AI phản hồi:</Text>
                                <Select
                                    style={{ width: "100%", marginTop: 8 }}
                                    defaultValue="vi"
                                    options={[
                                        { value: "vi", label: "Tiếng Việt" },
                                        { value: "en", label: "English" },
                                        { value: "both", label: "Song ngữ" },
                                    ]}
                                />
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Modal
                title="👁️ Xem trước cấu hình chấm điểm"
                open={showPreview}
                onCancel={() => setShowPreview(false)}
                width={900}
                footer={[
                    <Button key="close" onClick={() => setShowPreview(false)}>
                        Đóng
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSaveConfig}>
                        Lưu cấu hình
                    </Button>,
                ]}
            >
                <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <Descriptions bordered size="small">
                        <Descriptions.Item label="Cuộc thi" span={3}>
                            {contestName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phong cách chấm" span={3}>
                            <Tag color="blue">
                                {gradingStyle === "strict"
                                    ? "Nghiêm khắc"
                                    : gradingStyle === "moderate"
                                    ? "Vừa phải"
                                    : "Linh hoạt"}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Phát hiện AI" span={3}>
                            {detectAI ? (
                                <Text>
                                    Bật (Ngưỡng: {aiSensitivity}%)
                                </Text>
                            ) : (
                                <Text type="secondary">Tắt</Text>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phát hiện đạo văn" span={3}>
                            {detectPlagiarism ? (
                                <Text>Bật (Ngưỡng: {plagiarismThreshold}%)</Text>
                            ) : (
                                <Text type="secondary">Tắt</Text>
                            )}
                        </Descriptions.Item>
                    </Descriptions>

                    <div>
                        <Title level={5}>📊 Tiêu chí chấm điểm ({criteria.length} tiêu chí)</Title>
                        <Table
                            dataSource={criteria}
                            columns={[
                                { title: "STT", render: (_, __, i) => i + 1, width: 60 },
                                { title: "Tiêu chí", dataIndex: "name" },
                                {
                                    title: "Trọng số",
                                    dataIndex: "weight",
                                    render: (w) => <Tag color="blue">{w}%</Tag>,
                                    width: 100,
                                },
                                {
                                    title: "Điểm tối đa",
                                    dataIndex: "maxScore",
                                    render: (s) => `${s} điểm`,
                                    width: 100,
                                },
                            ]}
                            pagination={false}
                            size="small"
                        />
                    </div>

                    <Alert
                        message="Cấu hình hoàn chỉnh"
                        description="Bạn có thể lưu cấu hình này để AI bắt đầu chấm điểm tự động cho các bài thi."
                        type="success"
                        showIcon
                    />
                </Space>
            </Modal>
        </div>
    );
}

export default AIGradingConfigPage;
