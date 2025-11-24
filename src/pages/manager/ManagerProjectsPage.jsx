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
    DatePicker,
    message,
    Progress,
    Card,
    Row,
    Col,
    Statistic,
} from "antd";
import {
    EyeOutlined,
    CheckOutlined,
    CloseOutlined,
    UserAddOutlined,
    CalendarOutlined,
    EditOutlined,
    PlusOutlined,
    DownloadOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

function ManagerProjectsPage() {
    const [approveModalVisible, setApproveModalVisible] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [assignModalVisible, setAssignModalVisible] = useState(false);
    const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
    const [scoreModalVisible, setScoreModalVisible] = useState(false);
    const [cmeModalVisible, setCmeModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [form] = Form.useForm();

    React.useEffect(() => {
        document.title = "Quản lý đề tài NCKH - Quản lý";
    }, []);

    const getStatusStep = (record) => {
        if (record.cmeIssued) return 4;
        if (record.acceptanceStatus === "Đạt") return 3;
        if (record.approvalStatus === "Đã duyệt") return 2;
        if (record.registerStatus === "Đã duyệt") return 1;
        return 0;
    };

    const handleApprove = (record) => {
        setSelectedRecord(record);
        setApproveModalVisible(true);
    };

    const handleReject = (record) => {
        setSelectedRecord(record);
        setRejectModalVisible(true);
    };

    const handleAssignReviewer = (record) => {
        setSelectedRecord(record);
        setAssignModalVisible(true);
    };

    const handleScheduleMeeting = (record) => {
        setSelectedRecord(record);
        setScheduleModalVisible(true);
    };

    const handleInputScore = (record) => {
        setSelectedRecord(record);
        setScoreModalVisible(true);
    };

    const handleCreateCME = (record) => {
        setSelectedRecord(record);
        setCmeModalVisible(true);
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
            title: "Nhóm nghiên cứu",
            dataIndex: "team",
            key: "team",
            width: 130,
        },
        {
            title: "Khoa/Phòng",
            dataIndex: "department",
            key: "department",
            width: 100,
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
            width: 130,
            render: (status, record) => {
                if (!status) return <Text type="secondary">-</Text>;
                const colors = {
                    "Chờ họp": "orange",
                    "Đã họp": "blue",
                    "Đã duyệt": "green",
                    "Không đạt": "red",
                };
                return (
                    <Space direction="vertical" size="small">
                        <Tag color={colors[status]}>{status}</Tag>
                        {record.reviewer && (
                            <Text type="secondary" style={{ fontSize: 12 }}>
                                PB: {record.reviewer}
                            </Text>
                        )}
                    </Space>
                );
            },
        },
        {
            title: "Nghiệm thu",
            dataIndex: "acceptanceStatus",
            key: "acceptanceStatus",
            width: 130,
            render: (status, record) => {
                if (!status) return <Text type="secondary">-</Text>;
                const colors = {
                    "Chờ họp": "orange",
                    "Đã họp": "blue",
                    "Đạt": "green",
                    "Không đạt": "red",
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
            width: 200,
            render: (_, record) => {
                const step = getStatusStep(record);

                if (record.registerStatus === "Chờ duyệt") {
                    return (
                        <Space size="small">
                            <Button
                                size="small"
                                type="link"
                                icon={<CheckOutlined />}
                                style={{ color: "#52c41a" }}
                                onClick={() => handleApprove(record)}
                            >
                                Duyệt
                            </Button>
                            <Button
                                size="small"
                                type="link"
                                danger
                                icon={<CloseOutlined />}
                                onClick={() => handleReject(record)}
                            >
                                Từ chối
                            </Button>
                        </Space>
                    );
                }

                if (step === 0 && record.registerStatus === "Đã duyệt") {
                    return (
                        <Button
                            size="small"
                            type="primary"
                            icon={<UserAddOutlined />}
                            onClick={() => handleAssignReviewer(record)}
                        >
                            Phân công PB
                        </Button>
                    );
                }

                if (step === 1 && record.approvalStatus === "Chờ họp") {
                    return (
                        <Button
                            size="small"
                            type="primary"
                            icon={<CalendarOutlined />}
                            onClick={() => handleScheduleMeeting(record)}
                        >
                            Lên lịch họp
                        </Button>
                    );
                }

                if (step === 1 && record.approvalStatus === "Đã họp") {
                    return (
                        <Button
                            size="small"
                            type="link"
                            icon={<CheckOutlined />}
                            style={{ color: "#52c41a" }}
                            onClick={() => {
                                message.success("Đã phê duyệt đề cương!");
                            }}
                        >
                            Phê duyệt
                        </Button>
                    );
                }

                if (step === 2 && record.acceptanceStatus === "Chờ họp") {
                    return (
                        <Button
                            size="small"
                            type="primary"
                            icon={<CalendarOutlined />}
                            onClick={() => handleScheduleMeeting(record)}
                        >
                            Lên lịch NT
                        </Button>
                    );
                }

                if (step === 2 && record.acceptanceStatus === "Đã họp") {
                    return (
                        <Button
                            size="small"
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => handleInputScore(record)}
                        >
                            Nhập điểm
                        </Button>
                    );
                }

                if (step === 3 && record.acceptanceStatus === "Đạt" && !record.cmeIssued) {
                    return (
                        <Button
                            size="small"
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => handleCreateCME(record)}
                        >
                            Tạo CME
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
            team: "TS. Nguyễn Văn A",
            department: "Khoa Nội",
            registerStatus: "Đã duyệt",
            approvalStatus: "Chờ họp",
            reviewer: "PGS.TS. Lê Văn C",
            acceptanceStatus: null,
            score: null,
            cmeIssued: false,
            cmePoints: null,
        },
        {
            key: "2",
            title: "Cải tiến quy trình điều dưỡng khoa Ngoại",
            team: "ĐD. Phạm Thị D",
            department: "Khoa Ngoại",
            registerStatus: "Đã duyệt",
            approvalStatus: "Đã duyệt",
            reviewer: "GS.TS. Võ Thị F",
            acceptanceStatus: "Chờ họp",
            score: null,
            cmeIssued: false,
            cmePoints: null,
        },
        {
            key: "3",
            title: "Nghiên cứu phương pháp phẫu thuật nội soi mới",
            team: "BS. Đặng Văn G",
            department: "Khoa Ngoại",
            registerStatus: "Đã duyệt",
            approvalStatus: "Đã duyệt",
            reviewer: "GS.TS. Lê Thị N",
            acceptanceStatus: "Đạt",
            score: 92,
            cmeIssued: false,
            cmePoints: null,
        },
        {
            key: "4",
            title: "Sáng kiến cải tiến phòng khám Nhi",
            team: "BS. Cao Văn G",
            department: "Khoa Nhi",
            registerStatus: "Chờ duyệt",
            approvalStatus: null,
            reviewer: null,
            acceptanceStatus: null,
            score: null,
            cmeIssued: false,
            cmePoints: null,
        },
        {
            key: "5",
            title: "Ứng dụng blockchain trong quản lý hồ sơ",
            team: "DS. Lý Thị I",
            department: "Khoa Dược",
            registerStatus: "Đã duyệt",
            approvalStatus: "Đã duyệt",
            reviewer: "PGS.TS. Trần Văn M",
            acceptanceStatus: "Đạt",
            score: 85,
            cmeIssued: true,
            cmePoints: 12,
        },
    ];

    const stats = {
        total: mockData.length,
        pending: mockData.filter((item) => item.registerStatus === "Chờ duyệt").length,
        approved: mockData.filter((item) => item.registerStatus === "Đã duyệt").length,
        completed: mockData.filter((item) => item.cmeIssued).length,
    };

    return (
        <div style={{ maxWidth: "1800px", margin: "0 auto" }}>
            <Title level={2}>Quản lý đề tài nghiên cứu khoa học</Title>
            <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
                Theo dõi và quản lý toàn bộ quy trình các đề tài NCKH
            </Text>

            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Tổng số đề tài"
                            value={stats.total}
                            valueStyle={{ color: "#1677ff" }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Chờ duyệt"
                            value={stats.pending}
                            valueStyle={{ color: "#faad14" }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Đã duyệt"
                            value={stats.approved}
                            valueStyle={{ color: "#52c41a" }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Đã cấp CME"
                            value={stats.completed}
                            valueStyle={{ color: "#722ed1" }}
                        />
                    </Card>
                </Col>
            </Row>

            <Space style={{ marginBottom: 16 }}>
                <Select style={{ width: 200 }} placeholder="Lọc theo khoa/phòng" defaultValue="all">
                    <Select.Option value="all">Tất cả khoa/phòng</Select.Option>
                    <Select.Option value="noi">Khoa Nội</Select.Option>
                    <Select.Option value="ngoai">Khoa Ngoại</Select.Option>
                    <Select.Option value="nhi">Khoa Nhi</Select.Option>
                </Select>
                <Select style={{ width: 200 }} placeholder="Lọc theo trạng thái" defaultValue="all">
                    <Select.Option value="all">Tất cả trạng thái</Select.Option>
                    <Select.Option value="pending">Chờ duyệt</Select.Option>
                    <Select.Option value="approved">Đã duyệt</Select.Option>
                    <Select.Option value="completed">Hoàn thành</Select.Option>
                </Select>
                <Button icon={<DownloadOutlined />}>Xuất báo cáo</Button>
            </Space>

            <Card>
                <Table
                    columns={columns}
                    dataSource={mockData}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1300 }}
                />
            </Card>

            <Modal
                title="Duyệt đăng ký đề tài"
                open={approveModalVisible}
                onCancel={() => setApproveModalVisible(false)}
                onOk={() => {
                    message.success("Đã duyệt đăng ký thành công!");
                    setApproveModalVisible(false);
                }}
            >
                <Text>Bạn có chắc chắn muốn duyệt đề tài: {selectedRecord?.title}?</Text>
            </Modal>

            <Modal
                title="Từ chối đăng ký"
                open={rejectModalVisible}
                onCancel={() => setRejectModalVisible(false)}
                onOk={() => {
                    message.warning("Đã từ chối đăng ký!");
                    setRejectModalVisible(false);
                }}
            >
                <Form layout="vertical">
                    <Form.Item label="Lý do từ chối" name="reason" required>
                        <TextArea rows={4} placeholder="Nhập lý do từ chối..." />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Phân công phản biện"
                open={assignModalVisible}
                onCancel={() => setAssignModalVisible(false)}
                onOk={() => {
                    form.validateFields().then(() => {
                        message.success("Đã phân công phản biện!");
                        setAssignModalVisible(false);
                        form.resetFields();
                    });
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Người phản biện"
                        name="reviewer"
                        rules={[{ required: true, message: "Vui lòng chọn người phản biện" }]}
                    >
                        <Select placeholder="Chọn người phản biện">
                            <Select.Option value="1">GS.TS. Võ Thị F</Select.Option>
                            <Select.Option value="2">PGS.TS. Mai Văn H</Select.Option>
                            <Select.Option value="3">GS.TS. Bùi Thị L</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Lên lịch họp"
                open={scheduleModalVisible}
                onCancel={() => setScheduleModalVisible(false)}
                onOk={() => {
                    form.validateFields().then(() => {
                        message.success("Đã lên lịch họp!");
                        setScheduleModalVisible(false);
                        form.resetFields();
                    });
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Ngày họp"
                        name="date"
                        rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
                    >
                        <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item label="Địa điểm" name="location">
                        <Input placeholder="Nhập địa điểm họp" />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Nhập điểm nghiệm thu"
                open={scoreModalVisible}
                onCancel={() => setScoreModalVisible(false)}
                onOk={() => {
                    form.validateFields().then(() => {
                        message.success("Đã cập nhật điểm nghiệm thu!");
                        setScoreModalVisible(false);
                        form.resetFields();
                    });
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Điểm số (0-100)"
                        name="score"
                        rules={[{ required: true, message: "Vui lòng nhập điểm" }]}
                    >
                        <InputNumber min={0} max={100} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label="Kết quả"
                        name="result"
                        rules={[{ required: true, message: "Vui lòng chọn kết quả" }]}
                    >
                        <Select placeholder="Chọn kết quả">
                            <Select.Option value="pass">Đạt</Select.Option>
                            <Select.Option value="fail">Không đạt</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Nhận xét" name="comment">
                        <TextArea rows={4} placeholder="Nhập nhận xét..." />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Tạo chứng nhận CME"
                open={cmeModalVisible}
                onCancel={() => setCmeModalVisible(false)}
                onOk={() => {
                    form.validateFields().then(() => {
                        message.success("Đã tạo chứng nhận CME!");
                        setCmeModalVisible(false);
                        form.resetFields();
                    });
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên đề tài">
                        <Input value={selectedRecord?.title} disabled />
                    </Form.Item>
                    <Form.Item
                        label="Số điểm CME"
                        name="cmePoints"
                        rules={[{ required: true, message: "Vui lòng nhập số điểm" }]}
                    >
                        <InputNumber min={1} max={50} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label="Số quyết định"
                        name="decisionNumber"
                        rules={[{ required: true, message: "Vui lòng nhập số quyết định" }]}
                    >
                        <Input placeholder="VD: 123/QĐ-BVĐK" />
                    </Form.Item>
                    <Form.Item
                        label="Ngày cấp"
                        name="issueDate"
                        rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
                    >
                        <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ManagerProjectsPage;
