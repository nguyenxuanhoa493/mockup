import React, { useState } from "react";
import {
    Typography,
    Table,
    Tag,
    Button,
    Space,
    Modal,
    Form,
    Input,
    Select,
    InputNumber,
    Upload,
    message,
    Card,
    Progress,
} from "antd";
import {
    PlusOutlined,
    UploadOutlined,
    SyncOutlined,
    EyeOutlined,
    ClockCircleOutlined,
    DownloadOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

function ResearcherProjectsPage() {
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const [memberCount, setMemberCount] = useState(1);
    const [form] = Form.useForm();

    React.useEffect(() => {
        document.title = "Quản lý đề tài NCKH - Người nghiên cứu";
    }, []);

    const getStatusStep = (record) => {
        if (record.cmeIssued) return 4;
        if (record.acceptanceStatus === "Đạt") return 3;
        if (record.approvalStatus === "Đã duyệt") return 2;
        if (record.registerStatus === "Đã duyệt") return 1;
        return 0;
    };

    const handleRegister = () => {
        setRegisterModalVisible(true);
    };

    const handleSubmitRegister = (values) => {
        message.success("Đã gửi đăng ký đề tài thành công!");
        setRegisterModalVisible(false);
        form.resetFields();
    };

    const handleUploadProposal = (record) => {
        message.success(`Đã tải lên đề cương cho đề tài: ${record.title}`);
    };

    const handleUploadReport = (record) => {
        message.success(`Đã nộp báo cáo nghiệm thu cho đề tài: ${record.title}`);
    };

    const handleExtension = (record) => {
        Modal.confirm({
            title: "Yêu cầu gia hạn",
            content: `Bạn có chắc chắn muốn yêu cầu gia hạn cho đề tài: ${record.title}?`,
            onOk: () => {
                message.success("Đã gửi yêu cầu gia hạn!");
            },
        });
    };

    const handleDownloadCertificate = (record) => {
        message.success(`Đang tải chứng nhận CME cho đề tài: ${record.title}`);
    };

    const columns = [
        {
            title: "Tên đề tài",
            dataIndex: "title",
            key: "title",
            width: 200,
            fixed: "left",
        },
        {
            title: "Lĩnh vực",
            dataIndex: "field",
            key: "field",
            width: 130,
        },
        {
            title: "Tiến độ",
            key: "progress",
            width: 180,
            render: (_, record) => {
                const currentStep = getStatusStep(record);
                const steps = ["Đăng ký", "Xét duyệt", "Nghiệm thu", "CME"];
                const displayStep = Math.min(currentStep + 1, 4);
                const percent = (displayStep / 4) * 100;
                const status = currentStep === 4 ? "success" : "active";
                const stepText = currentStep === 4 ? "Hoàn thành" : steps[Math.min(currentStep, 3)];
                
                return (
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                        <Progress 
                            percent={percent} 
                            size="small" 
                            status={status}
                            format={() => `${displayStep}/4`}
                        />
                        <Text type={currentStep === 4 ? "success" : "secondary"} style={{ fontSize: 12 }}>
                            {stepText}
                        </Text>
                    </Space>
                );
            },
        },
        {
            title: "Đăng ký",
            dataIndex: "registerStatus",
            key: "registerStatus",
            width: 100,
            render: (status) => {
                const colors = {
                    "Đã gửi": "blue",
                    "Chờ duyệt": "orange",
                    "Đã duyệt": "green",
                    "Bị từ chối": "red",
                };
                return <Tag color={colors[status]}>{status}</Tag>;
            },
        },
        {
            title: "Xét duyệt",
            dataIndex: "approvalStatus",
            key: "approvalStatus",
            width: 120,
            render: (status) => {
                if (!status) return <Text type="secondary">-</Text>;
                const colors = {
                    "Chờ họp": "orange",
                    "Đã họp": "blue",
                    "Đã duyệt": "green",
                    "Không đạt": "red",
                };
                return <Tag color={colors[status]}>{status}</Tag>;
            },
        },
        {
            title: "Nghiệm thu",
            dataIndex: "acceptanceStatus",
            key: "acceptanceStatus",
            width: 120,
            render: (status, record) => {
                if (!status) return <Text type="secondary">-</Text>;
                const colors = {
                    "Chờ họp": "orange",
                    "Đã họp": "blue",
                    "Đạt": "green",
                    "Không đạt": "red",
                    "Gia hạn": "cyan",
                };
                return (
                    <Space direction="vertical" size="small">
                        <Tag color={colors[status]}>{status}</Tag>
                        {record.score && <Text type="secondary">{record.score}/100</Text>}
                    </Space>
                );
            },
        },
        {
            title: "CME",
            dataIndex: "cmeIssued",
            key: "cmeIssued",
            width: 100,
            render: (issued, record) => {
                if (!issued) return <Text type="secondary">-</Text>;
                return <Tag color="green">{record.cmePoints} điểm</Tag>;
            },
        },
        {
            title: "Thao tác",
            key: "action",
            fixed: "right",
            width: 180,
            render: (_, record) => {
                const step = getStatusStep(record);
                
                if (step === 0 && record.registerStatus === "Đã duyệt") {
                    return (
                        <Upload showUploadList={false}>
                            <Button
                                size="small"
                                type="primary"
                                icon={<UploadOutlined />}
                                onClick={() => handleUploadProposal(record)}
                            >
                                Tải đề cương
                            </Button>
                        </Upload>
                    );
                }

                if (step === 1 && record.approvalStatus === "Đã duyệt") {
                    return (
                        <Space size="small" direction="vertical">
                            <Upload showUploadList={false}>
                                <Button
                                    size="small"
                                    type="primary"
                                    icon={<UploadOutlined />}
                                    onClick={() => handleUploadReport(record)}
                                >
                                    Nộp báo cáo
                                </Button>
                            </Upload>
                            <Button
                                size="small"
                                icon={<ClockCircleOutlined />}
                                onClick={() => handleExtension(record)}
                            >
                                Gia hạn
                            </Button>
                        </Space>
                    );
                }

                if (step === 4) {
                    return (
                        <Button
                            size="small"
                            type="primary"
                            icon={<DownloadOutlined />}
                            onClick={() => handleDownloadCertificate(record)}
                        >
                            Tải CME
                        </Button>
                    );
                }

                return <Text type="secondary">-</Text>;
            },
        },
    ];

    const mockData = [
        {
            key: "1",
            title: "Nghiên cứu ứng dụng AI trong chẩn đoán X-quang",
            field: "Đề tài chuyên môn",
            registerStatus: "Đã duyệt",
            approvalStatus: "Chờ họp",
            acceptanceStatus: null,
            score: null,
            cmeIssued: false,
            cmePoints: null,
        },
        {
            key: "2",
            title: "Cải tiến quy trình điều dưỡng khoa Ngoại",
            field: "Cải tiến chất lượng",
            registerStatus: "Đã duyệt",
            approvalStatus: "Đã duyệt",
            acceptanceStatus: "Chờ họp",
            score: null,
            cmeIssued: false,
            cmePoints: null,
        },
        {
            key: "3",
            title: "Nghiên cứu phương pháp phẫu thuật nội soi mới",
            field: "Đề tài chuyên môn",
            registerStatus: "Đã duyệt",
            approvalStatus: "Đã duyệt",
            acceptanceStatus: "Đạt",
            score: 92,
            cmeIssued: true,
            cmePoints: 15,
        },
        {
            key: "4",
            title: "Sáng kiến cải tiến phòng khám Nhi",
            field: "Sáng kiến quản lý",
            registerStatus: "Chờ duyệt",
            approvalStatus: null,
            acceptanceStatus: null,
            score: null,
            cmeIssued: false,
            cmePoints: null,
        },
        {
            key: "5",
            title: "Ứng dụng blockchain trong quản lý hồ sơ",
            field: "Đề tài chuyên môn",
            registerStatus: "Đã duyệt",
            approvalStatus: "Đã duyệt",
            acceptanceStatus: "Đạt",
            score: 85,
            cmeIssued: true,
            cmePoints: 12,
        },
    ];

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <Space style={{ marginBottom: 24, justifyContent: "space-between", width: "100%" }}>
                <div>
                    <Title level={2} style={{ margin: 0 }}>
                        Quản lý đề tài nghiên cứu
                    </Title>
                    <Text type="secondary">Theo dõi tiến độ các đề tài của bạn</Text>
                </div>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleRegister}>
                    Đăng ký đề tài mới
                </Button>
            </Space>

            <Card>
                <Table
                    columns={columns}
                    dataSource={mockData}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1200 }}
                />
            </Card>

            <Modal
                title="Đăng ký đề tài mới"
                open={registerModalVisible}
                onCancel={() => setRegisterModalVisible(false)}
                onOk={() => form.submit()}
                width={800}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmitRegister}>
                    <Form.Item
                        label="Tên đề tài"
                        name="title"
                        rules={[{ required: true, message: "Vui lòng nhập tên đề tài" }]}
                    >
                        <Input placeholder="Nhập tên đề tài" />
                    </Form.Item>

                    <Form.Item
                        label="Lĩnh vực"
                        name="field"
                        rules={[{ required: true, message: "Vui lòng chọn lĩnh vực" }]}
                    >
                        <Select placeholder="Chọn lĩnh vực">
                            <Select.Option value="chuyen_mon">Đề tài chuyên môn</Select.Option>
                            <Select.Option value="cai_tien">
                                Cải tiến chất lượng dịch vụ
                            </Select.Option>
                            <Select.Option value="sang_kien">Sáng kiến</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Số lượng thành viên">
                        <InputNumber
                            min={1}
                            max={20}
                            value={memberCount}
                            onChange={setMemberCount}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    {Array.from({ length: memberCount }).map((_, index) => (
                        <Card
                            key={index}
                            type="inner"
                            title={`Thành viên ${index + 1}`}
                            style={{ marginBottom: 16 }}
                            size="small"
                        >
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <Form.Item
                                    label="Họ và tên"
                                    name={`member_${index}_name`}
                                    rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                                >
                                    <Input placeholder="Nhập họ và tên" />
                                </Form.Item>
                                <Form.Item
                                    label="Vai trò"
                                    name={`member_${index}_role`}
                                    rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
                                >
                                    <Select placeholder="Chọn vai trò">
                                        <Select.Option value="chinh">Tác giả chính</Select.Option>
                                        <Select.Option value="dong">Đồng tác giả</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Space>
                        </Card>
                    ))}

                    <Form.Item
                        label="Email liên hệ"
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email" },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input placeholder="Nhập email công vụ" />
                    </Form.Item>

                    <Form.Item label="Ghi chú" name="note">
                        <TextArea rows={3} placeholder="Nhập ghi chú (nếu có)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ResearcherProjectsPage;
