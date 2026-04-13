import React, { useState } from 'react';
import {
    Card,
    Table,
    Tag,
    Button,
    Space,
    Typography,
    Row,
    Col,
    Avatar,
    Input,
    Modal,
    DatePicker,
    Slider,
    InputNumber,
    Upload,
    message,
    Tooltip,
    Progress,
    Statistic,
} from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    UserOutlined,
    SearchOutlined,
    EditOutlined,
    EyeOutlined,
    CloudUploadOutlined,
    CalendarOutlined,
    FileTextOutlined,
    FilePdfOutlined,
    FileImageOutlined,
    FileWordOutlined,
    DeleteOutlined,
    PlusOutlined,
    CloseOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

const StudentEvaluationPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');
    const [fileList, setFileList] = useState([]);

    const students = [
        {
            key: '1',
            name: 'Nguyễn Văn An',
            studentId: 'HV001',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=An',
            course: 'Kỹ năng lãnh đạo',
            score: 92,
            status: 'evaluated',
            evaluatedDate: '2024-03-15 14:30',
            comment: 'Hoàn thành xuất sắc các bài tập nhóm.',
        },
        {
            key: '2',
            name: 'Trần Thị Bình',
            studentId: 'HV002',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Binh',
            course: 'Kỹ năng lãnh đạo',
            score: null,
            status: 'pending',
            evaluatedDate: null,
            comment: '',
        },
        {
            key: '3',
            name: 'Lê Hoàng Cường',
            studentId: 'HV003',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong',
            course: 'An toàn lao động',
            score: 78,
            status: 'evaluated',
            evaluatedDate: '2024-03-14 09:00',
            comment: 'Nắm tốt lý thuyết, cần cải thiện thực hành.',
        },
        {
            key: '4',
            name: 'Phạm Thị Dung',
            studentId: 'HV004',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dung',
            course: 'An toàn lao động',
            score: null,
            status: 'pending',
            evaluatedDate: null,
            comment: '',
        },
        {
            key: '5',
            name: 'Hoàng Minh Đức',
            studentId: 'HV005',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duc',
            course: 'Kỹ năng giao tiếp',
            score: 55,
            status: 'evaluated',
            evaluatedDate: '2024-03-13 16:45',
            comment: 'Cần tích cực hơn trong các hoạt động nhóm.',
        },
        {
            key: '6',
            name: 'Vũ Thị Hạnh',
            studentId: 'HV006',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hanh',
            course: 'Kỹ năng giao tiếp',
            score: null,
            status: 'pending',
            evaluatedDate: null,
            comment: '',
        },
    ];

    const openModal = (record) => {
        setSelectedStudent(record);
        setScore(record.score || 0);
        setComment(record.comment || '');
        setFileList([]);
        setIsModalVisible(true);
    };

    const handleSave = () => {
        message.success('Đã lưu đánh giá thành công!');
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const uploadProps = {
        name: 'file',
        multiple: true,
        fileList,
        onChange(info) {
            setFileList(info.fileList);
        },
        beforeUpload() {
            return false;
        },
        accept: '.pdf,.jpg,.jpeg,.png,.doc,.docx',
    };

    const getScoreColor = (val) => {
        if (val >= 80) return '#52c41a';
        if (val >= 60) return '#faad14';
        return '#ff4d4f';
    };

    const columns = [
        {
            title: 'Học viên',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Space>
                    <Avatar src={record.avatar} icon={<UserOutlined />} />
                    <div>
                        <Text strong>{text}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>{record.studentId}</Text>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Khóa học',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Điểm số',
            dataIndex: 'score',
            key: 'score',
            align: 'center',
            render: (val) =>
                val !== null ? (
                    <Text strong style={{ color: getScoreColor(val), fontSize: 16 }}>
                        {val}
                    </Text>
                ) : (
                    <Text type="secondary">—</Text>
                ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (status) =>
                status === 'evaluated' ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">Đã đánh giá</Tag>
                ) : (
                    <Tag icon={<CloseCircleOutlined />} color="default">Chưa đánh giá</Tag>
                ),
        },
        {
            title: 'Ngày đánh giá',
            dataIndex: 'evaluatedDate',
            key: 'evaluatedDate',
            render: (val) => val || <Text type="secondary">—</Text>,
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Đánh giá">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => openModal(record)}
                        >
                            Đánh giá
                        </Button>
                    </Tooltip>
                    {record.status === 'evaluated' && (
                        <Tooltip title="Xem chi tiết">
                            <Button icon={<EyeOutlined />} size="small" />
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    const filteredData = students.filter(
        (s) =>
            s.name.toLowerCase().includes(searchText.toLowerCase()) ||
            s.studentId.toLowerCase().includes(searchText.toLowerCase())
    );

    const evaluated = students.filter((s) => s.status === 'evaluated').length;
    const pending = students.filter((s) => s.status === 'pending').length;

    return (
        <div>
            <Title level={3}>📋 Đánh giá học viên (Checklist)</Title>

            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card>
                        <Statistic title="Tổng học viên" value={students.length} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Đã đánh giá"
                            value={evaluated}
                            valueStyle={{ color: '#52c41a' }}
                            suffix={`/ ${students.length}`}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Chưa đánh giá"
                            value={pending}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Tiến độ" value={Math.round((evaluated / students.length) * 100)} suffix="%" />
                        <Progress
                            percent={Math.round((evaluated / students.length) * 100)}
                            showInfo={false}
                            strokeColor="#1677ff"
                            style={{ marginTop: 8 }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card>
                <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                    <Input
                        placeholder="Tìm kiếm học viên..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                        allowClear
                    />
                </Space>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 10 }}
                    bordered
                />
            </Card>

            {/* Modal Đánh giá kết quả học viên */}
            <Modal
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
                closeIcon={<CloseOutlined style={{ fontSize: 16 }} />}
                title={null}
                styles={{
                    body: { padding: '28px 32px 20px' },
                }}
                destroyOnClose
            >
                <div style={{ marginBottom: 24 }}>
                    <Title level={4} style={{ margin: 0 }}>
                        Đánh giá kết quả học viên
                    </Title>
                    {selectedStudent && (
                        <Text type="secondary" style={{ fontSize: 13 }}>
                            {selectedStudent.name} — {selectedStudent.studentId}
                        </Text>
                    )}
                </div>

                {/* Trường 1: Ngày giờ diễn ra */}
                <div style={{ marginBottom: 20 }}>
                    <Text strong style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>
                        Ngày giờ diễn ra
                    </Text>
                    <DatePicker
                        showTime
                        placeholder="Chọn ngày và giờ"
                        style={{ width: '100%' }}
                        format="DD/MM/YYYY HH:mm"
                        suffixIcon={<CalendarOutlined />}
                        size="large"
                    />
                </div>

                {/* Trường 2: Điểm số */}
                <div style={{ marginBottom: 20 }}>
                    <Text strong style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>
                        Điểm số đạt được (Thang 100)
                    </Text>
                    <Row gutter={16} align="middle">
                        <Col flex="auto">
                            <Slider
                                min={0}
                                max={100}
                                value={score}
                                onChange={setScore}
                                trackStyle={{ backgroundColor: getScoreColor(score) }}
                                handleStyle={{ borderColor: getScoreColor(score) }}
                                styles={{
                                    track: { backgroundColor: getScoreColor(score) },
                                    handle: { borderColor: getScoreColor(score) },
                                }}
                            />
                        </Col>
                        <Col>
                            <InputNumber
                                min={0}
                                max={100}
                                value={score}
                                onChange={(val) => setScore(val || 0)}
                                size="large"
                                style={{ width: 80 }}
                            />
                        </Col>
                    </Row>
                    <div style={{ marginTop: 4 }}>
                        <Text
                            style={{
                                color: getScoreColor(score),
                                fontWeight: 600,
                                fontSize: 13,
                            }}
                        >
                            {score >= 80 ? '🟢 Xuất sắc' : score >= 60 ? '🟡 Đạt' : '🔴 Chưa đạt'}
                        </Text>
                    </div>
                </div>

                {/* Trường 3: Nhận xét */}
                <div style={{ marginBottom: 20 }}>
                    <Text strong style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>
                        Nhận xét của giảng viên
                    </Text>
                    <TextArea
                        rows={4}
                        placeholder="Nhập nhận xét về kết quả học tập của học viên..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        showCount
                        maxLength={500}
                        style={{ resize: 'vertical' }}
                    />
                </div>

                {/* Trường 4: Đính kèm minh chứng */}
                <div style={{ marginBottom: 28 }}>
                    <Text strong style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>
                        Đính kèm minh chứng
                    </Text>
                    <Dragger
                        {...uploadProps}
                        style={{
                            borderRadius: 8,
                            padding: '16px 0',
                        }}
                    >
                        <p style={{ marginBottom: 8 }}>
                            <CloudUploadOutlined style={{ fontSize: 36, color: '#1677ff' }} />
                        </p>
                        <p style={{ fontSize: 14, color: '#595959', margin: '0 0 4px' }}>
                            Kéo thả file vào đây hoặc <Text style={{ color: '#1677ff' }}>nhấn để tải lên</Text>
                        </p>
                        <p style={{ fontSize: 12, color: '#8c8c8c', margin: 0 }}>
                            <FilePdfOutlined /> PDF &nbsp;&nbsp;
                            <FileImageOutlined /> JPG &nbsp;&nbsp;
                            <FileWordOutlined /> Docx
                        </p>
                    </Dragger>
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                    <Button size="large" onClick={handleCancel}>
                        Hủy bỏ
                    </Button>
                    <Button type="primary" size="large" onClick={handleSave}>
                        Lưu đánh giá
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default StudentEvaluationPage;
