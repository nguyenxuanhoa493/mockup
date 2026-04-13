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
    Tooltip,
    Input,
    Select,
    Modal,
    Descriptions,
    Badge,
    Tabs,
    Progress,
    Divider,
    Alert,
    Switch,
    Slider,
    Radio,
    Statistic,
    List,
    message,
    Collapse,
} from 'antd';
import {
    UserOutlined,
    SearchOutlined,
    EyeOutlined,
    CheckOutlined,
    FileTextOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExportOutlined,
    FileDoneOutlined,
    CopyOutlined,
    LinkOutlined,
    BarChartOutlined,
    InfoCircleOutlined,
    SafetyCertificateOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Rubric definition
const rubricCriteria = [
    {
        key: 'c1',
        name: 'Nội dung & Kiến thức',
        description: 'Bài làm thể hiện sự hiểu biết sâu sắc về chủ đề, trả lời đúng trọng tâm, có dẫn chứng và phân tích.',
        weight: 30,
        levels: [
            { score: 4, label: 'Xuất sắc', description: 'Hiểu biết sâu sắc, phân tích xuất sắc, có dẫn chứng phong phú và chính xác.' },
            { score: 3, label: 'Tốt', description: 'Hiểu biết tốt, phân tích hợp lý, có dẫn chứng phù hợp.' },
            { score: 2, label: 'Đạt', description: 'Hiểu biết cơ bản, phân tích chưa sâu, dẫn chứng hạn chế.' },
            { score: 1, label: 'Chưa đạt', description: 'Hiểu biết sơ sài, thiếu phân tích, không có dẫn chứng.' },
        ],
    },
    {
        key: 'c2',
        name: 'Cấu trúc & Tổ chức',
        description: 'Bài viết có bố cục rõ ràng, logic mạch lạc, các ý liên kết chặt chẽ.',
        weight: 25,
        levels: [
            { score: 4, label: 'Xuất sắc', description: 'Bố cục hoàn hảo, logic chặt chẽ, chuyển ý mượt mà.' },
            { score: 3, label: 'Tốt', description: 'Bố cục rõ ràng, logic hợp lý, chuyển ý tốt.' },
            { score: 2, label: 'Đạt', description: 'Bố cục cơ bản, một số chỗ chưa logic.' },
            { score: 1, label: 'Chưa đạt', description: 'Bố cục lộn xộn, thiếu logic, khó theo dõi.' },
        ],
    },
    {
        key: 'c3',
        name: 'Tư duy phản biện & Sáng tạo',
        description: 'Thể hiện khả năng tư duy phản biện, có quan điểm cá nhân, ý tưởng sáng tạo.',
        weight: 20,
        levels: [
            { score: 4, label: 'Xuất sắc', description: 'Tư duy phản biện sắc bén, quan điểm độc đáo, nhiều ý tưởng sáng tạo.' },
            { score: 3, label: 'Tốt', description: 'Có tư duy phản biện, quan điểm rõ ràng, một số ý sáng tạo.' },
            { score: 2, label: 'Đạt', description: 'Tư duy phản biện hạn chế, ít quan điểm cá nhân.' },
            { score: 1, label: 'Chưa đạt', description: 'Không thể hiện tư duy phản biện, chỉ liệt kê thông tin.' },
        ],
    },
    {
        key: 'c4',
        name: 'Ngôn ngữ & Trình bày',
        description: 'Sử dụng ngôn ngữ học thuật, văn phong phù hợp, ít lỗi chính tả và ngữ pháp.',
        weight: 15,
        levels: [
            { score: 4, label: 'Xuất sắc', description: 'Ngôn ngữ học thuật chuẩn mực, văn phong chuyên nghiệp, không lỗi.' },
            { score: 3, label: 'Tốt', description: 'Ngôn ngữ phù hợp, rất ít lỗi chính tả/ngữ pháp.' },
            { score: 2, label: 'Đạt', description: 'Ngôn ngữ chấp nhận được, một số lỗi chính tả/ngữ pháp.' },
            { score: 1, label: 'Chưa đạt', description: 'Ngôn ngữ không phù hợp, nhiều lỗi chính tả/ngữ pháp.' },
        ],
    },
    {
        key: 'c5',
        name: 'Trích dẫn & Tài liệu tham khảo',
        description: 'Trích dẫn nguồn đầy đủ, đúng định dạng, tài liệu tham khảo phong phú và uy tín.',
        weight: 10,
        levels: [
            { score: 4, label: 'Xuất sắc', description: 'Trích dẫn đầy đủ, đúng chuẩn APA/IEEE, nguồn uy tín và đa dạng.' },
            { score: 3, label: 'Tốt', description: 'Trích dẫn khá đầy đủ, cơ bản đúng định dạng.' },
            { score: 2, label: 'Đạt', description: 'Trích dẫn hạn chế, một số chỗ thiếu hoặc sai định dạng.' },
            { score: 1, label: 'Chưa đạt', description: 'Không trích dẫn hoặc trích dẫn sai hoàn toàn.' },
        ],
    },
];

// Fake student submissions
const submissions = [
    {
        key: '1',
        name: 'Nguyễn Văn An',
        studentId: 'SV2024001',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=An',
        submissionDate: '2024-03-15 09:30',
        fileName: 'BaiTap_ATTT_NguyenVanAn.docx',
        wordCount: 2450,
        status: 'graded',
        rubricScores: { c1: 4, c2: 3, c3: 3, c4: 4, c5: 3 },
        totalScore: 8.65,
        plagiarism: { similarity: 12, status: 'ok', sources: 3 },
        feedback: 'Bài viết thể hiện sự hiểu biết tốt về chủ đề. Cần cải thiện phần tư duy phản biện.',
    },
    {
        key: '2',
        name: 'Trần Thị Bình',
        studentId: 'SV2024002',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Binh',
        submissionDate: '2024-03-15 10:15',
        fileName: 'Assignment_TranThiBinh.pdf',
        wordCount: 1890,
        status: 'graded',
        rubricScores: { c1: 2, c2: 2, c3: 1, c4: 2, c5: 1 },
        totalScore: 4.55,
        plagiarism: { similarity: 45, status: 'warning', sources: 8 },
        feedback: 'Bài viết cần cải thiện nhiều. Độ trùng lặp cao cần được xem xét.',
    },
    {
        key: '3',
        name: 'Lê Hoàng Cường',
        studentId: 'SV2024003',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong',
        submissionDate: '2024-03-15 11:00',
        fileName: 'BaiNop_LeHoangCuong.docx',
        wordCount: 3120,
        status: 'pending',
        rubricScores: {},
        totalScore: null,
        plagiarism: { similarity: 8, status: 'ok', sources: 2 },
        feedback: '',
    },
    {
        key: '4',
        name: 'Phạm Thị Dung',
        studentId: 'SV2024004',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dung',
        submissionDate: '2024-03-15 14:20',
        fileName: 'ATTT_PhamThiDung.pdf',
        wordCount: 2100,
        status: 'graded',
        rubricScores: { c1: 3, c2: 4, c3: 4, c4: 3, c5: 4 },
        totalScore: 8.50,
        plagiarism: { similarity: 5, status: 'ok', sources: 1 },
        feedback: 'Bài viết xuất sắc, tư duy phản biện tốt, trình bày rõ ràng.',
    },
    {
        key: '5',
        name: 'Hoàng Minh Đức',
        studentId: 'SV2024005',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duc',
        submissionDate: '2024-03-16 08:45',
        fileName: 'Assignment_HoangMinhDuc.docx',
        wordCount: 1650,
        status: 'pending',
        rubricScores: {},
        totalScore: null,
        plagiarism: { similarity: 62, status: 'danger', sources: 12 },
        feedback: '',
    },
    {
        key: '6',
        name: 'Vũ Thị Hà',
        studentId: 'SV2024006',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ha',
        submissionDate: '2024-03-16 09:10',
        fileName: 'BaiTap_VuThiHa.pdf',
        wordCount: 2800,
        status: 'graded',
        rubricScores: { c1: 3, c2: 3, c3: 2, c4: 3, c5: 2 },
        totalScore: 6.85,
        plagiarism: { similarity: 18, status: 'ok', sources: 4 },
        feedback: 'Bài viết khá tốt. Cần bổ sung thêm trích dẫn và tài liệu tham khảo.',
    },
];

// Plagiarism detail sources
const plagiarismSources = [
    { key: '1', source: 'vi.wikipedia.org/wiki/An_toàn_thông_tin', matchPercent: 15, matchedWords: 120, type: 'internet' },
    { key: '2', source: 'Bài nộp SV2024005 - Hoàng Minh Đức (cùng lớp)', matchPercent: 22, matchedWords: 180, type: 'student' },
    { key: '3', source: 'luanvan.net/bao-mat-thong-tin-ca-nhan', matchPercent: 10, matchedWords: 85, type: 'internet' },
    { key: '4', source: 'Nguyễn Văn X (2023), "Bảo mật trong kỷ nguyên số", TC CNTT', matchPercent: 8, matchedWords: 65, type: 'publication' },
    { key: '5', source: 'docs.google.com/document/d/1abc...', matchPercent: 5, matchedWords: 40, type: 'internet' },
    { key: '6', source: 'Bài nộp SV2024002 - Trần Thị Bình (cùng lớp)', matchPercent: 2, matchedWords: 18, type: 'student' },
];

const RubricGradingPage = () => {
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [gradingModalVisible, setGradingModalVisible] = useState(false);
    const [plagiarismModalVisible, setPlagiarismModalVisible] = useState(false);
    const [rubricScores, setRubricScores] = useState({});
    const [showPlagiarismInGrading, setShowPlagiarismInGrading] = useState(true);

    React.useEffect(() => {
        document.title = 'Chấm điểm Rubric - Bài nộp Assignment';
    }, []);

    const calculateWeightedScore = (scores) => {
        if (!scores || Object.keys(scores).length === 0) return null;
        let total = 0;
        rubricCriteria.forEach((c) => {
            const score = scores[c.key] || 0;
            total += (score / 4) * c.weight;
        });
        return ((total / 100) * 10).toFixed(2);
    };

    const openGradingModal = (record) => {
        setSelectedSubmission(record);
        setRubricScores(record.rubricScores || {});
        setGradingModalVisible(true);
    };

    const openPlagiarismModal = (record) => {
        setSelectedSubmission(record);
        setPlagiarismModalVisible(true);
    };

    const handleSaveGrading = () => {
        message.success('Đã lưu kết quả chấm điểm thành công!');
        setGradingModalVisible(false);
    };

    const getPlagiarismColor = (similarity) => {
        if (similarity <= 15) return '#52c41a';
        if (similarity <= 30) return '#faad14';
        return '#ff4d4f';
    };

    const getPlagiarismTag = (plagiarism) => {
        if (plagiarism.status === 'ok') return <Tag color="success" icon={<CheckCircleOutlined />}>{plagiarism.similarity}% trùng lặp</Tag>;
        if (plagiarism.status === 'warning') return <Tag color="warning" icon={<WarningOutlined />}>{plagiarism.similarity}% trùng lặp</Tag>;
        return <Tag color="error" icon={<CloseCircleOutlined />}>{plagiarism.similarity}% trùng lặp</Tag>;
    };

    const getLevelColor = (score) => {
        if (score === 4) return '#52c41a';
        if (score === 3) return '#1677ff';
        if (score === 2) return '#faad14';
        return '#ff4d4f';
    };

    const filteredData = submissions.filter((item) => {
        const matchSearch =
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.studentId.toLowerCase().includes(searchText.toLowerCase());
        const matchStatus = statusFilter === 'all' || item.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const columns = [
        {
            title: 'Sinh viên',
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
            title: 'File bài nộp',
            dataIndex: 'fileName',
            key: 'fileName',
            render: (text) => (
                <Space>
                    <FileTextOutlined style={{ color: '#1677ff' }} />
                    <Text>{text}</Text>
                </Space>
            ),
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'submissionDate',
            key: 'submissionDate',
        },
        {
            title: 'Số từ',
            dataIndex: 'wordCount',
            key: 'wordCount',
            render: (val) => <Text>{val.toLocaleString()}</Text>,
        },
        {
            title: 'Kiểm tra trùng lặp',
            key: 'plagiarism',
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    {getPlagiarismTag(record.plagiarism)}
                    <Button type="link" size="small" onClick={() => openPlagiarismModal(record)} style={{ padding: 0 }}>
                        Xem chi tiết
                    </Button>
                </Space>
            ),
        },
        {
            title: 'Điểm Rubric',
            key: 'totalScore',
            render: (_, record) =>
                record.totalScore !== null ? (
                    <Text strong style={{ fontSize: 16, color: record.totalScore >= 5 ? '#52c41a' : '#ff4d4f' }}>
                        {record.totalScore}/10
                    </Text>
                ) : (
                    <Tag>Chưa chấm</Tag>
                ),
            sorter: (a, b) => (a.totalScore || 0) - (b.totalScore || 0),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) =>
                status === 'graded' ? (
                    <Badge status="success" text="Đã chấm" />
                ) : (
                    <Badge status="processing" text="Chờ chấm" />
                ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Chấm điểm / Xem Rubric">
                        <Button type="primary" icon={<EyeOutlined />} onClick={() => openGradingModal(record)}>
                            {record.status === 'graded' ? 'Xem' : 'Chấm'}
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    // Rubric matrix component
    const RubricMatrix = ({ scores, onScoreChange, readOnly }) => (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                    <tr style={{ background: '#fafafa' }}>
                        <th style={{ border: '1px solid #d9d9d9', padding: '10px 12px', textAlign: 'left', width: '18%' }}>Tiêu chí</th>
                        <th style={{ border: '1px solid #d9d9d9', padding: '10px 12px', textAlign: 'left', width: '8%' }}>Trọng số</th>
                        <th style={{ border: '1px solid #d9d9d9', padding: '10px 12px', textAlign: 'center', background: '#fff1f0', width: '18.5%' }}>
                            <Tag color="error">1 - Chưa đạt</Tag>
                        </th>
                        <th style={{ border: '1px solid #d9d9d9', padding: '10px 12px', textAlign: 'center', background: '#fffbe6', width: '18.5%' }}>
                            <Tag color="warning">2 - Đạt</Tag>
                        </th>
                        <th style={{ border: '1px solid #d9d9d9', padding: '10px 12px', textAlign: 'center', background: '#e6f4ff', width: '18.5%' }}>
                            <Tag color="processing">3 - Tốt</Tag>
                        </th>
                        <th style={{ border: '1px solid #d9d9d9', padding: '10px 12px', textAlign: 'center', background: '#f6ffed', width: '18.5%' }}>
                            <Tag color="success">4 - Xuất sắc</Tag>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rubricCriteria.map((criterion) => (
                        <tr key={criterion.key}>
                            <td style={{ border: '1px solid #d9d9d9', padding: '10px 12px', verticalAlign: 'top' }}>
                                <Text strong>{criterion.name}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 11 }}>{criterion.description}</Text>
                            </td>
                            <td style={{ border: '1px solid #d9d9d9', padding: '10px 12px', textAlign: 'center', verticalAlign: 'top' }}>
                                <Tag color="blue">{criterion.weight}%</Tag>
                            </td>
                            {criterion.levels.slice().reverse().map((level) => {
                                const isSelected = scores[criterion.key] === level.score;
                                return (
                                    <td
                                        key={level.score}
                                        onClick={() => !readOnly && onScoreChange && onScoreChange(criterion.key, level.score)}
                                        style={{
                                            border: '1px solid #d9d9d9',
                                            padding: '10px 12px',
                                            verticalAlign: 'top',
                                            cursor: readOnly ? 'default' : 'pointer',
                                            background: isSelected ? `${getLevelColor(level.score)}15` : 'transparent',
                                            outline: isSelected ? `2px solid ${getLevelColor(level.score)}` : 'none',
                                            outlineOffset: '-2px',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <Text style={{ fontSize: 12 }}>{level.description}</Text>
                                        {isSelected && (
                                            <div style={{ marginTop: 6, textAlign: 'center' }}>
                                                <CheckCircleOutlined style={{ color: getLevelColor(level.score), fontSize: 18 }} />
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Plagiarism report component inside grading modal
    const PlagiarismPanel = ({ submission }) => {
        if (!submission) return null;
        const { plagiarism } = submission;
        return (
            <div>
                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={8}>
                        <Card size="small">
                            <Statistic
                                title="Độ trùng lặp"
                                value={plagiarism.similarity}
                                suffix="%"
                                valueStyle={{ color: getPlagiarismColor(plagiarism.similarity) }}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small">
                            <Statistic title="Số nguồn trùng" value={plagiarism.sources} suffix="nguồn" />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card size="small">
                            <Statistic
                                title="Đánh giá"
                                value={plagiarism.similarity <= 15 ? 'Nguyên gốc' : plagiarism.similarity <= 30 ? 'Cần xem xét' : 'Nghi ngờ'}
                                valueStyle={{ color: getPlagiarismColor(plagiarism.similarity), fontSize: 16 }}
                            />
                        </Card>
                    </Col>
                </Row>

                <Progress
                    percent={plagiarism.similarity}
                    strokeColor={getPlagiarismColor(plagiarism.similarity)}
                    format={(val) => `${val}% trùng lặp`}
                    style={{ marginBottom: 16 }}
                />

                {plagiarism.similarity > 15 && (
                    <Alert
                        message="Cảnh báo trùng lặp"
                        description={`Bài nộp có độ trùng lặp ${plagiarism.similarity}%, vượt ngưỡng cho phép (15%). Giảng viên cần xem xét kỹ các nguồn trùng lặp bên dưới trước khi đánh giá.`}
                        type={plagiarism.similarity > 30 ? 'error' : 'warning'}
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                )}

                <Title level={5}>Chi tiết nguồn trùng lặp</Title>
                <List
                    size="small"
                    dataSource={plagiarismSources.slice(0, plagiarism.sources > 6 ? 6 : plagiarism.sources)}
                    renderItem={(item) => (
                        <List.Item
                            extra={
                                <Space>
                                    <Tag color={item.matchPercent > 15 ? 'red' : item.matchPercent > 8 ? 'orange' : 'green'}>
                                        {item.matchPercent}%
                                    </Tag>
                                    <Text type="secondary">{item.matchedWords} từ</Text>
                                </Space>
                            }
                        >
                            <List.Item.Meta
                                avatar={
                                    item.type === 'internet' ? (
                                        <LinkOutlined style={{ fontSize: 18, color: '#1677ff' }} />
                                    ) : item.type === 'student' ? (
                                        <UserOutlined style={{ fontSize: 18, color: '#fa8c16' }} />
                                    ) : (
                                        <FileTextOutlined style={{ fontSize: 18, color: '#722ed1' }} />
                                    )
                                }
                                title={
                                    <Text style={{ fontSize: 13 }}>
                                        {item.source}
                                        <Tag style={{ marginLeft: 8 }} color={item.type === 'internet' ? 'blue' : item.type === 'student' ? 'orange' : 'purple'}>
                                            {item.type === 'internet' ? 'Internet' : item.type === 'student' ? 'Bài nộp SV' : 'Ấn phẩm'}
                                        </Tag>
                                    </Text>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    };

    const gradedCount = submissions.filter((s) => s.status === 'graded').length;
    const pendingCount = submissions.filter((s) => s.status === 'pending').length;
    const highPlagiarism = submissions.filter((s) => s.plagiarism.similarity > 30).length;

    return (
        <div>
            <Title level={3}>
                <FileDoneOutlined style={{ marginRight: 8 }} />
                Chấm điểm bài nộp theo Rubric
            </Title>
            <Paragraph type="secondary">
                Giảng viên mở bài nộp của sinh viên đối với Assignment đã được gán Rubric. Hệ thống hiển thị bài nộp kèm Ma trận Tiêu chí chấm điểm (Rubric) và báo cáo kiểm tra tính nguyên gốc.
            </Paragraph>

            {/* Assignment Info */}
            <Card style={{ marginBottom: 16 }}>
                <Descriptions title="Thông tin Assignment" bordered size="small" column={2}>
                    <Descriptions.Item label="Tên Assignment">Bài tập lớn: Phân tích An toàn Thông tin trong Doanh nghiệp</Descriptions.Item>
                    <Descriptions.Item label="Khóa học">CS301 - An toàn Thông tin</Descriptions.Item>
                    <Descriptions.Item label="Hạn nộp">20/03/2024 23:59</Descriptions.Item>
                    <Descriptions.Item label="Rubric được gán">
                        <Tag color="blue" icon={<CheckCircleOutlined />}>Rubric đánh giá bài tiểu luận (5 tiêu chí)</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Kiểm tra trùng lặp">
                        <Tag color="green" icon={<SafetyCertificateOutlined />}>Đã bật - Turnitin Integration</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngưỡng trùng lặp cho phép">
                        <Text>≤ 15%</Text>
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            {/* Statistics */}
            <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={6}>
                    <Card>
                        <Statistic title="Tổng bài nộp" value={submissions.length} prefix={<FileTextOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Đã chấm" value={gradedCount} valueStyle={{ color: '#52c41a' }} prefix={<CheckCircleOutlined />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Chờ chấm" value={pendingCount} valueStyle={{ color: '#1677ff' }} prefix={<ClockIcon />} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Trùng lặp cao (>30%)" value={highPlagiarism} valueStyle={{ color: '#ff4d4f' }} prefix={<WarningOutlined />} />
                    </Card>
                </Col>
            </Row>

            {/* Filters */}
            <Card style={{ marginBottom: 16 }}>
                <Space wrap>
                    <Input
                        placeholder="Tìm kiếm sinh viên..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 250 }}
                        allowClear
                    />
                    <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 180 }}>
                        <Option value="all">Tất cả trạng thái</Option>
                        <Option value="graded">Đã chấm</Option>
                        <Option value="pending">Chờ chấm</Option>
                    </Select>
                    <Button icon={<ExportOutlined />}>Xuất kết quả</Button>
                </Space>
            </Card>

            {/* Table */}
            <Card>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 10 }}
                    bordered
                    size="middle"
                />
            </Card>

            {/* Grading Modal with Rubric */}
            <Modal
                title={
                    <Space>
                        <FileDoneOutlined />
                        <span>Chấm điểm bài nộp - {selectedSubmission?.name}</span>
                    </Space>
                }
                open={gradingModalVisible}
                onCancel={() => setGradingModalVisible(false)}
                width={1200}
                footer={[
                    <Button key="cancel" onClick={() => setGradingModalVisible(false)}>
                        Đóng
                    </Button>,
                    <Button key="save" type="primary" icon={<CheckOutlined />} onClick={handleSaveGrading}>
                        Lưu kết quả chấm điểm
                    </Button>,
                ]}
            >
                {selectedSubmission && (
                    <Tabs
                        defaultActiveKey="rubric"
                        items={[
                            {
                                key: 'rubric',
                                label: (
                                    <span>
                                        <BarChartOutlined /> Ma trận Rubric
                                    </span>
                                ),
                                children: (
                                    <div>
                                        {/* Student info */}
                                        <Card size="small" style={{ marginBottom: 16, background: '#fafafa' }}>
                                            <Row gutter={16} align="middle">
                                                <Col>
                                                    <Avatar size={48} src={selectedSubmission.avatar} icon={<UserOutlined />} />
                                                </Col>
                                                <Col flex="auto">
                                                    <Descriptions size="small" column={3}>
                                                        <Descriptions.Item label="Sinh viên">
                                                            <Text strong>{selectedSubmission.name}</Text>
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="MSSV">{selectedSubmission.studentId}</Descriptions.Item>
                                                        <Descriptions.Item label="Ngày nộp">{selectedSubmission.submissionDate}</Descriptions.Item>
                                                        <Descriptions.Item label="File">{selectedSubmission.fileName}</Descriptions.Item>
                                                        <Descriptions.Item label="Số từ">{selectedSubmission.wordCount.toLocaleString()}</Descriptions.Item>
                                                        <Descriptions.Item label="Trùng lặp">
                                                            {getPlagiarismTag(selectedSubmission.plagiarism)}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                </Col>
                                            </Row>
                                        </Card>

                                        {/* Rubric Matrix */}
                                        <Title level={5} style={{ marginBottom: 12 }}>
                                            <BarChartOutlined /> Ma trận Tiêu chí chấm điểm (Rubric)
                                        </Title>
                                        <Alert
                                            message="Hướng dẫn: Nhấp vào ô tương ứng với mức đánh giá cho từng tiêu chí để chấm điểm."
                                            type="info"
                                            showIcon
                                            style={{ marginBottom: 12 }}
                                        />
                                        <RubricMatrix
                                            scores={rubricScores}
                                            onScoreChange={(criterionKey, score) => {
                                                setRubricScores((prev) => ({ ...prev, [criterionKey]: score }));
                                            }}
                                            readOnly={selectedSubmission.status === 'graded'}
                                        />

                                        {/* Score summary */}
                                        <Card size="small" style={{ marginTop: 16, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
                                            <Row gutter={16} align="middle">
                                                <Col span={12}>
                                                    <Title level={5} style={{ margin: 0 }}>Tổng điểm:</Title>
                                                    {rubricCriteria.map((c) => (
                                                        <div key={c.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                                                            <Text type="secondary">{c.name} ({c.weight}%):</Text>
                                                            <Text strong style={{ color: getLevelColor(rubricScores[c.key]) }}>
                                                                {rubricScores[c.key] ? `${rubricScores[c.key]}/4` : '—'}
                                                            </Text>
                                                        </div>
                                                    ))}
                                                </Col>
                                                <Col span={12} style={{ textAlign: 'center' }}>
                                                    <Statistic
                                                        title="Điểm tổng kết"
                                                        value={calculateWeightedScore(rubricScores) || '—'}
                                                        suffix={calculateWeightedScore(rubricScores) ? '/10' : ''}
                                                        valueStyle={{
                                                            fontSize: 36,
                                                            color: calculateWeightedScore(rubricScores) >= 5 ? '#52c41a' : '#ff4d4f',
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </div>
                                ),
                            },
                            {
                                key: 'plagiarism',
                                label: (
                                    <span>
                                        <SafetyCertificateOutlined /> Báo cáo trùng lặp
                                        {selectedSubmission.plagiarism.similarity > 15 && (
                                            <Badge count={<WarningOutlined style={{ color: '#faad14', fontSize: 12, marginLeft: 4 }} />} />
                                        )}
                                    </span>
                                ),
                                children: <PlagiarismPanel submission={selectedSubmission} />,
                            },
                            {
                                key: 'submission',
                                label: (
                                    <span>
                                        <FileTextOutlined /> Nội dung bài nộp
                                    </span>
                                ),
                                children: (
                                    <div>
                                        <Card
                                            title={
                                                <Space>
                                                    <FileTextOutlined />
                                                    <Text>{selectedSubmission.fileName}</Text>
                                                </Space>
                                            }
                                            extra={<Button icon={<ExportOutlined />} size="small">Tải về</Button>}
                                        >
                                            <div style={{ background: '#fafafa', padding: 24, borderRadius: 8, minHeight: 400, border: '1px solid #d9d9d9' }}>
                                                <Title level={4} style={{ textAlign: 'center' }}>
                                                    Phân tích An toàn Thông tin trong Doanh nghiệp
                                                </Title>
                                                <Paragraph>
                                                    <Text strong>Sinh viên:</Text> {selectedSubmission.name} - {selectedSubmission.studentId}
                                                </Paragraph>
                                                <Divider />
                                                <Title level={5}>1. Giới thiệu</Title>
                                                <Paragraph>
                                                    Trong bối cảnh chuyển đổi số mạnh mẽ, an toàn thông tin đã trở thành một trong những vấn đề
                                                    quan trọng nhất đối với mọi tổ chức và doanh nghiệp. Với sự gia tăng không ngừng của các
                                                    cuộc tấn công mạng, việc bảo vệ dữ liệu và hệ thống thông tin không chỉ là trách nhiệm
                                                    của bộ phận IT mà còn là mối quan tâm của toàn bộ tổ chức...
                                                </Paragraph>
                                                <Title level={5}>2. Các mối đe dọa an toàn thông tin phổ biến</Title>
                                                <Paragraph>
                                                    Các mối đe dọa an toàn thông tin ngày càng đa dạng và tinh vi hơn. Theo báo cáo của
                                                    Symantec năm 2023, số lượng các cuộc tấn công ransomware đã tăng 150% so với năm trước.
                                                    {selectedSubmission.plagiarism.similarity > 30 && (
                                                        <span style={{ background: '#fff1f0', padding: '2px 4px', borderRadius: 4 }}>
                                                            {' '}Phishing, malware, và social engineering vẫn là các phương thức tấn công phổ biến nhất...
                                                        </span>
                                                    )}
                                                </Paragraph>
                                                <Paragraph type="secondary" style={{ textAlign: 'center', marginTop: 40 }}>
                                                    [Nội dung đầy đủ của bài nộp - {selectedSubmission.wordCount.toLocaleString()} từ]
                                                </Paragraph>
                                            </div>
                                        </Card>
                                    </div>
                                ),
                            },
                        ]}
                    />
                )}
            </Modal>

            {/* Plagiarism Detail Modal */}
            <Modal
                title={
                    <Space>
                        <SafetyCertificateOutlined />
                        <span>Báo cáo kiểm tra tính nguyên gốc - {selectedSubmission?.name}</span>
                    </Space>
                }
                open={plagiarismModalVisible}
                onCancel={() => setPlagiarismModalVisible(false)}
                width={800}
                footer={[
                    <Button key="close" onClick={() => setPlagiarismModalVisible(false)}>
                        Đóng
                    </Button>,
                    <Button key="export" icon={<ExportOutlined />}>
                        Xuất báo cáo
                    </Button>,
                ]}
            >
                {selectedSubmission && <PlagiarismPanel submission={selectedSubmission} />}
            </Modal>
        </div>
    );
};

// Simple clock icon component to avoid import issues
const ClockIcon = () => (
    <span role="img" aria-label="clock" style={{ fontSize: 14 }}>⏳</span>
);

export default RubricGradingPage;
