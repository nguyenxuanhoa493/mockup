import React, { useState } from "react";
import {
    Typography, Card, Table, Tag, Select, Input, Button, Space, Progress,
    Modal, Form, Badge, Tooltip, Row, Col, Statistic, Divider, Collapse, Tabs,
    Popconfirm, Alert, Checkbox, Segmented,
} from "antd";
import {
    PlusOutlined, SearchOutlined, CheckCircleOutlined, TagsOutlined,
    BookOutlined, RobotOutlined, CheckSquareOutlined, CloseCircleOutlined,
    WarningOutlined, SafetyCertificateOutlined, FileTextOutlined,
    SolutionOutlined, AppstoreOutlined, FilterOutlined,
    RightOutlined, DownOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const CURRICULUM = {
    mach_kien_thuc: [
        {
            ten: "Số và phép tính", ty_trong: "60%",
            noi_dung: ["Số tự nhiên đến lớp triệu","Cấu tạo thập phân của số","Làm tròn số","So sánh số","Phép cộng, trừ, nhân, chia","Tính chất các phép tính","Biểu thức số và biểu thức chứa chữ","Giải toán có lời văn"],
        },
        {
            ten: "Hình học và đo lường", ty_trong: "25%",
            noi_dung: ["Góc (góc nhọn, góc vuông, góc tù, góc bẹt)","Đơn vị đo góc (độ)","Đường thẳng vuông góc","Đường thẳng song song","Hình bình hành","Hình thoi","Đơn vị đo khối lượng (yến, tạ, tấn)","Đơn vị đo diện tích (dm², m², mm²)","Đơn vị đo thời gian (giây, thế kỉ)"],
        },
        {
            ten: "Một số yếu tố thống kê và xác suất", ty_trong: "10%",
            noi_dung: ["Thu thập, phân loại dữ liệu","Sắp xếp số liệu","Đọc và mô tả biểu đồ cột","Tính giá trị trung bình","Kiểm đếm xác suất sự kiện đơn giản"],
        },
        {
            ten: "Hoạt động thực hành và trải nghiệm", ty_trong: "5%",
            noi_dung: ["Vận dụng kiến thức vào thực tế","Tính chu vi, diện tích","Ước lượng khối lượng, dung tích","Giải quyết vấn đề liên quan đến thời gian","Thực hành đo lường"],
        },
    ],
};

const MACH_COLORS = {
    "Số và phép tính": "blue",
    "Hình học và đo lường": "green",
    "Một số yếu tố thống kê và xác suất": "purple",
    "Hoạt động thực hành và trải nghiệm": "orange",
};

// AI review levels
const REVIEW_LEVELS = {
    ok: { label: "Chính xác", color: "success", icon: <CheckCircleOutlined style={{ color: "#52c41a" }} /> },
    warn: { label: "Cảnh báo", color: "warning", icon: <WarningOutlined style={{ color: "#faad14" }} /> },
    error: { label: "Lỗi", color: "error", icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} /> },
};

const INITIAL_QUESTIONS = [
    {
        id: 1,
        noi_dung: "Số 3 456 789 có chữ số hàng triệu là bao nhiêu?",
        dap_an: "3",
        lua_chon: ["1","2","3","4"],
        mach: "Số và phép tính",
        chu_de: "Số tự nhiên đến lớp triệu",
        do_kho: "Dễ",
        duyet: false,
        ai_review: {
            GPT:   { noi_dung: "ok", dap_an: "ok",   phan_loai: "ok",   note: "" },
            Gemini:{ noi_dung: "ok", dap_an: "warn",  phan_loai: "ok",   note: "Đáp án nên ghi rõ '3 triệu' thay vì chỉ '3'" },
            Grok:  { noi_dung: "ok", dap_an: "ok",   phan_loai: "ok",   note: "" },
        },
    },
    {
        id: 2,
        noi_dung: "Tính chu vi hình bình hành có cạnh a = 8cm, b = 5cm.",
        dap_an: "26cm",
        lua_chon: ["13cm","24cm","26cm","40cm"],
        mach: "Hình học và đo lường",
        chu_de: "Hình bình hành",
        do_kho: "Trung bình",
        duyet: false,
        ai_review: {
            GPT:   { noi_dung: "ok",   dap_an: "ok",   phan_loai: "ok",   note: "" },
            Gemini:{ noi_dung: "ok",   dap_an: "ok",   phan_loai: "ok",   note: "" },
            Grok:  { noi_dung: "warn", dap_an: "ok",   phan_loai: "ok",   note: "Nên bổ sung hình minh họa để rõ hơn" },
        },
    },
    {
        id: 3,
        noi_dung: "Một lớp học có điểm kiểm tra: 7, 8, 9, 6, 10. Tính điểm trung bình.",
        dap_an: "8",
        lua_chon: ["7","7.5","8","8.5"],
        mach: "Một số yếu tố thống kê và xác suất",
        chu_de: "Tính giá trị trung bình",
        do_kho: "Trung bình",
        duyet: true,
        ai_review: {
            GPT:   { noi_dung: "ok", dap_an: "ok", phan_loai: "ok", note: "" },
            Gemini:{ noi_dung: "ok", dap_an: "ok", phan_loai: "ok", note: "" },
            Grok:  { noi_dung: "ok", dap_an: "ok", phan_loai: "ok", note: "" },
        },
    },
    {
        id: 4,
        noi_dung: "Góc nào lớn hơn 90°?",
        dap_an: "Góc tù",
        lua_chon: ["Góc nhọn","Góc vuông","Góc tù","Góc bẹt"],
        mach: "Hình học và đo lường",
        chu_de: "Góc (góc nhọn, góc vuông, góc tù, góc bẹt)",
        do_kho: "Dễ",
        duyet: false,
        ai_review: {
            GPT:   { noi_dung: "warn",  dap_an: "error", phan_loai: "ok",   note: "Câu hỏi mơ hồ — góc bẹt (180°) cũng lớn hơn 90°. Đáp án nên là 'Góc tù hoặc Góc bẹt'" },
            Gemini:{ noi_dung: "warn",  dap_an: "error", phan_loai: "ok",   note: "Đáp án chưa chính xác, góc bẹt = 180° > 90°" },
            Grok:  { noi_dung: "error", dap_an: "error", phan_loai: "ok",   note: "Câu hỏi và đáp án đều cần chỉnh sửa" },
        },
    },
    {
        id: 5,
        noi_dung: "Một cửa hàng bán được 1 250 kg gạo trong 5 ngày. Hỏi mỗi ngày bán được bao nhiêu kg?",
        dap_an: "250 kg",
        lua_chon: ["200 kg","225 kg","250 kg","300 kg"],
        mach: "Số và phép tính",
        chu_de: "Giải toán có lời văn",
        do_kho: "Khó",
        duyet: false,
        ai_review: {
            GPT:   { noi_dung: "ok", dap_an: "ok", phan_loai: "warn", note: "Bài này độ khó nên là 'Trung bình' hơn là 'Khó'" },
            Gemini:{ noi_dung: "ok", dap_an: "ok", phan_loai: "ok",   note: "" },
            Grok:  { noi_dung: "ok", dap_an: "ok", phan_loai: "ok",   note: "" },
        },
    },
];

// ─── Review Tag helper ───────────────────────────────────────────────────────
function ReviewTag({ level, note }) {
    const cfg = REVIEW_LEVELS[level] || REVIEW_LEVELS.ok;
    const tag = (
        <Tag color={cfg.color} icon={cfg.icon} style={{ cursor: note ? "pointer" : "default" }}>
            {cfg.label}
        </Tag>
    );
    if (note) return <Tooltip title={note}>{tag}</Tooltip>;
    return tag;
}

// ─── Tab 1: Phân loại câu hỏi ────────────────────────────────────────────────
function ClassifyTab({ questions, setQuestions }) {
    const [filterMach, setFilterMach] = useState(null);
    const [filterChuDe, setFilterChuDe] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [form] = Form.useForm();

    const availableChuDe = filterMach
        ? CURRICULUM.mach_kien_thuc.find((m) => m.ten === filterMach)?.noi_dung || []
        : CURRICULUM.mach_kien_thuc.flatMap((m) => m.noi_dung);

    const filtered = questions.filter((q) => {
        const matchMach = filterMach ? q.mach === filterMach : true;
        const matchChuDe = filterChuDe ? q.chu_de === filterChuDe : true;
        const matchSearch = searchText ? q.noi_dung.toLowerCase().includes(searchText.toLowerCase()) : true;
        return matchMach && matchChuDe && matchSearch;
    });

    const openAdd = () => { setEditingQuestion(null); form.resetFields(); setModalOpen(true); };
    const openEdit = (r) => { setEditingQuestion(r); form.setFieldsValue(r); setModalOpen(true); };
    const handleDelete = (id) => setQuestions((prev) => prev.filter((q) => q.id !== id));

    const handleSave = () => {
        form.validateFields().then((values) => {
            if (editingQuestion) {
                setQuestions((prev) => prev.map((q) => q.id === editingQuestion.id ? { ...q, ...values } : q));
            } else {
                const newId = Math.max(0, ...questions.map((q) => q.id)) + 1;
                const emptyReview = { noi_dung: "ok", dap_an: "ok", phan_loai: "ok", note: "" };
                setQuestions((prev) => [...prev, { id: newId, duyet: false, lua_chon: [], ai_review: { GPT: { ...emptyReview }, Gemini: { ...emptyReview }, Grok: { ...emptyReview } }, ...values }]);
            }
            setModalOpen(false);
        });
    };

    const formMach = Form.useWatch("mach", form);
    const formChuDeOptions = formMach ? CURRICULUM.mach_kien_thuc.find((m) => m.ten === formMach)?.noi_dung || [] : [];

    const columns = [
        { title: "STT", key: "stt", width: 55, render: (_, __, i) => i + 1 },
        { title: "Nội dung câu hỏi", dataIndex: "noi_dung", key: "noi_dung", ellipsis: true, render: (t) => <Tooltip title={t}><Text>{t}</Text></Tooltip> },
        { title: "Đáp án", dataIndex: "dap_an", key: "dap_an", width: 120, render: (t) => <Tag color="cyan">{t || "—"}</Tag> },
        { title: "Mạch kiến thức", dataIndex: "mach", key: "mach", width: 200, render: (m) => <Tag color={MACH_COLORS[m] || "default"}>{m}</Tag> },
        { title: "Chủ đề", dataIndex: "chu_de", key: "chu_de", width: 200, render: (t) => <Text type="secondary" style={{ fontSize: 12 }}>{t}</Text> },
        { title: "Độ khó", dataIndex: "do_kho", key: "do_kho", width: 100, render: (v) => { const map = { Dễ: "success", "Trung bình": "warning", Khó: "error" }; return <Badge status={map[v] || "default"} text={v} />; } },
        {
            title: "Thao tác", key: "action", width: 120,
            render: (_, r) => (
                <Space>
                    <Button size="small" onClick={() => openEdit(r)}>Sửa</Button>
                    <Popconfirm title="Xóa câu hỏi này?" onConfirm={() => handleDelete(r.id)} okText="Xóa" cancelText="Hủy">
                        <Button size="small" danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row gutter={[12, 12]} style={{ marginBottom: 16 }} align="middle">
                <Col flex="auto">
                    <Space wrap>
                        <Input placeholder="Tìm kiếm câu hỏi..." prefix={<SearchOutlined />} value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ width: 240 }} allowClear />
                        <Select placeholder="Lọc theo mạch kiến thức" value={filterMach} onChange={(v) => { setFilterMach(v); setFilterChuDe(null); }} allowClear style={{ width: 220 }}>
                            {CURRICULUM.mach_kien_thuc.map((m) => <Option key={m.ten} value={m.ten}><Tag color={MACH_COLORS[m.ten]}>{m.ty_trong}</Tag> {m.ten}</Option>)}
                        </Select>
                        <Select placeholder="Lọc theo chủ đề" value={filterChuDe} onChange={setFilterChuDe} allowClear style={{ width: 240 }} disabled={!availableChuDe.length}>
                            {availableChuDe.map((nd) => <Option key={nd} value={nd}>{nd}</Option>)}
                        </Select>
                    </Space>
                </Col>
                <Col><Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>Thêm câu hỏi</Button></Col>
            </Row>

            <Card size="small">
                <Table dataSource={filtered} columns={columns} rowKey="id" size="small"
                    pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `Tổng ${t} câu hỏi` }}
                    locale={{ emptyText: "Chưa có câu hỏi nào" }} />
            </Card>

            <Modal title={editingQuestion ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi mới"} open={modalOpen} onOk={handleSave} onCancel={() => setModalOpen(false)} okText="Lưu" cancelText="Hủy" width={620}>
                <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
                    <Form.Item name="noi_dung" label="Nội dung câu hỏi" rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}>
                        <TextArea rows={3} placeholder="Nhập nội dung câu hỏi..." />
                    </Form.Item>
                    <Form.Item name="dap_an" label="Đáp án đúng" rules={[{ required: true, message: "Vui lòng nhập đáp án" }]}>
                        <Input placeholder="Nhập đáp án đúng..." />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="mach" label="Mạch kiến thức" rules={[{ required: true, message: "Vui lòng chọn mạch" }]}>
                                <Select placeholder="Chọn mạch kiến thức" onChange={() => form.setFieldValue("chu_de", undefined)}>
                                    {CURRICULUM.mach_kien_thuc.map((m) => <Option key={m.ten} value={m.ten}><Tag color={MACH_COLORS[m.ten]}>{m.ty_trong}</Tag> {m.ten}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="chu_de" label="Chủ đề / Nội dung" rules={[{ required: true, message: "Vui lòng chọn chủ đề" }]}>
                                <Select placeholder="Chọn chủ đề" disabled={!formMach}>
                                    {formChuDeOptions.map((nd) => <Option key={nd} value={nd}>{nd}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="do_kho" label="Độ khó" rules={[{ required: true, message: "Vui lòng chọn độ khó" }]}>
                        <Select placeholder="Chọn độ khó">
                            <Option value="Dễ"><Badge status="success" text="Dễ" /></Option>
                            <Option value="Trung bình"><Badge status="warning" text="Trung bình" /></Option>
                            <Option value="Khó"><Badge status="error" text="Khó" /></Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

// ─── Tab 2: Phân loại nhanh ───────────────────────────────────────────────────
const MACH_SHORT = {
    "Số và phép tính": "Số & PT",
    "Hình học và đo lường": "HH & ĐL",
    "Một số yếu tố thống kê và xác suất": "TK & XS",
    "Hoạt động thực hành và trải nghiệm": "TH & TN",
};

function QuickClassifyTab({ questions, setQuestions }) {
    const [searchText, setSearchText] = useState("");
    const [filterMach, setFilterMach] = useState(null);
    const [filterStatus, setFilterStatus] = useState(null);
    const [expandedMach, setExpandedMach] = useState({});
    const [viewMode, setViewMode] = useState("columns"); // "columns" | "dropdown"

    const isClassified = (q) => q.mach && q.chu_de;

    const filtered = questions.filter((q) => {
        const matchMach = filterMach ? q.mach === filterMach : true;
        const matchStatus = filterStatus === "classified" ? isClassified(q) : filterStatus === "unclassified" ? !isClassified(q) : true;
        const matchSearch = searchText ? q.noi_dung.toLowerCase().includes(searchText.toLowerCase()) : true;
        return matchMach && matchStatus && matchSearch;
    });

    const toggleExpand = (machTen) => setExpandedMach((prev) => ({ ...prev, [machTen]: !prev[machTen] }));

    const handleTickMach = (id, machTen) => {
        setQuestions((prev) => prev.map((q) => {
            if (q.id !== id) return q;
            if (q.mach === machTen) return { ...q, mach: undefined, chu_de: undefined };
            return { ...q, mach: machTen, chu_de: undefined };
        }));
    };

    const handleTickChuDe = (id, machTen, chuDe) => {
        setQuestions((prev) => prev.map((q) => {
            if (q.id !== id) return q;
            if (q.mach === machTen && q.chu_de === chuDe) return { ...q, mach: undefined, chu_de: undefined };
            return { ...q, mach: machTen, chu_de: chuDe };
        }));
    };

    const handleSelectChuDe = (id, machTen, chuDe) => {
        setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, mach: machTen, chu_de: chuDe } : q));
    };

    const totalClassified = questions.filter(isClassified).length;

    // ── View mode: columns (checkbox expand/collapse) ──
    const buildColumnsCols = () => CURRICULUM.mach_kien_thuc.flatMap((m) => {
        const isExpanded = expandedMach[m.ten];
        const headerTitle = (
            <span style={{ cursor: "pointer", whiteSpace: "nowrap" }} onClick={() => toggleExpand(m.ten)}>
                {isExpanded ? <DownOutlined style={{ fontSize: 9, marginRight: 4 }} /> : <RightOutlined style={{ fontSize: 9, marginRight: 4 }} />}
                <Tag color={MACH_COLORS[m.ten]} style={{ fontSize: 10, margin: 0 }}>{MACH_SHORT[m.ten]}</Tag>
            </span>
        );

        if (!isExpanded) {
            return [{
                title: headerTitle,
                key: `mach_${m.ten}`,
                width: 90,
                align: "center",
                render: (_, r) => (
                    <Tooltip title={r.mach === m.ten && r.chu_de ? r.chu_de : ""}>
                        <Checkbox
                            checked={r.mach === m.ten}
                            onChange={() => handleTickMach(r.id, m.ten)}
                        />
                    </Tooltip>
                ),
            }];
        }

        return [{
            title: headerTitle,
            key: `mach_${m.ten}`,
            align: "center",
            children: m.noi_dung.map((nd) => ({
                title: <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 11, lineHeight: 1.2, whiteSpace: "nowrap", padding: "4px 0" }}>{nd}</div>,
                key: `cd_${m.ten}_${nd}`,
                width: 40,
                align: "center",
                render: (_, r) => (
                    <Checkbox
                        checked={r.mach === m.ten && r.chu_de === nd}
                        onChange={() => handleTickChuDe(r.id, m.ten, nd)}
                    />
                ),
            })),
        }];
    });

    // ── View mode: dropdown ──
    const buildDropdownCols = () => CURRICULUM.mach_kien_thuc.map((m) => ({
        title: <Tag color={MACH_COLORS[m.ten]} style={{ fontSize: 10, margin: 0 }}>{MACH_SHORT[m.ten]}</Tag>,
        key: `mach_${m.ten}`,
        width: 180,
        align: "center",
        render: (_, r) => {
            const checked = r.mach === m.ten;
            return (
                <Space size={4}>
                    <Checkbox
                        checked={checked}
                        onChange={() => handleTickMach(r.id, m.ten)}
                    />
                    {checked && (
                        <Select
                            value={r.chu_de || undefined}
                            placeholder="Chủ đề"
                            onChange={(v) => handleSelectChuDe(r.id, m.ten, v)}
                            style={{ width: 140 }}
                            size="small"
                        >
                            {m.noi_dung.map((nd) => <Option key={nd} value={nd}>{nd}</Option>)}
                        </Select>
                    )}
                </Space>
            );
        },
    }));

    const machCols = viewMode === "columns" ? buildColumnsCols() : buildDropdownCols();

    const columns = [
        { title: "STT", key: "stt", width: 45, render: (_, __, i) => i + 1, fixed: "left" },
        {
            title: "Câu hỏi", key: "cauhoi", width: 280, fixed: "left",
            render: (_, r) => (
                <div>
                    <Tooltip title={r.noi_dung}>
                        <Text style={{ fontSize: 12 }}>{r.noi_dung.length > 70 ? r.noi_dung.slice(0, 70) + "…" : r.noi_dung}</Text>
                    </Tooltip>
                    {r.dap_an && <div style={{ marginTop: 2 }}><Text type="secondary" style={{ fontSize: 11 }}>ĐA: </Text><Tag color="cyan" style={{ fontSize: 10 }}>{r.dap_an}</Tag></div>}
                </div>
            ),
        },
        ...machCols,
    ];

    return (
        <>
            {/* Summary + Filters */}
            <Row gutter={[12, 12]} style={{ marginBottom: 16 }} align="middle">
                <Col>
                    <Space>
                        <Tag color="green">{totalClassified}/{questions.length} đã phân loại</Tag>
                        {CURRICULUM.mach_kien_thuc.map((m) => {
                            const cnt = questions.filter((q) => q.mach === m.ten).length;
                            return <Tag key={m.ten} color={MACH_COLORS[m.ten]} style={{ cursor: "pointer" }} onClick={() => setFilterMach(filterMach === m.ten ? null : m.ten)}>{MACH_SHORT[m.ten]}: {cnt}</Tag>;
                        })}
                    </Space>
                </Col>
                <Col flex="auto" />
                <Col>
                    <Space>
                        <Segmented size="small" value={viewMode} onChange={setViewMode} options={[
                            { label: "Cột", value: "columns" },
                            { label: "Dropdown", value: "dropdown" },
                        ]} />
                        <Input placeholder="Tìm kiếm..." prefix={<SearchOutlined />} value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ width: 200 }} allowClear size="small" />
                        <Select placeholder="Trạng thái" value={filterStatus} onChange={setFilterStatus} allowClear style={{ width: 140 }} size="small">
                            <Option value="classified">Đã phân loại</Option>
                            <Option value="unclassified">Chưa phân loại</Option>
                        </Select>
                    </Space>
                </Col>
            </Row>

            {/* Table */}
            <Card size="small">
                <Table
                    dataSource={filtered}
                    columns={columns}
                    rowKey="id"
                    size="small"
                    bordered
                    scroll={{ x: 800 }}
                    pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (t) => `${t} câu` }}
                    locale={{ emptyText: "Không có câu hỏi nào" }}
                />
            </Card>
        </>
    );
}

// ─── Tab 3: Review ngân hàng ─────────────────────────────────────────────────
const AI_LIST = ["GPT", "Gemini", "Grok"];
const CRITERIA = [
    { key: "noi_dung", label: "Nội dung", icon: <FileTextOutlined /> },
    { key: "dap_an",   label: "Đáp án",   icon: <SolutionOutlined /> },
    { key: "phan_loai",label: "Phân loại", icon: <AppstoreOutlined /> },
];

const LEVEL_COLOR = { ok: "#52c41a", warn: "#faad14", error: "#ff4d4f" };

function overallStatus(ai_review) {
    const levels = AI_LIST.flatMap((ai) => CRITERIA.map((c) => ai_review?.[ai]?.[c.key]));
    if (levels.includes("error")) return "error";
    if (levels.includes("warn")) return "warn";
    return "ok";
}

function ReviewTab({ questions, setQuestions }) {
    const [filterStatus, setFilterStatus] = useState(null);
    const [filterDuyet, setFilterDuyet] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [detailRecord, setDetailRecord] = useState(null);

    const handleDuyet = (id, val) => setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, duyet: val } : q));

    const filtered = questions.filter((q) => {
        const status = overallStatus(q.ai_review);
        const matchStatus = filterStatus ? status === filterStatus : true;
        const matchDuyet = filterDuyet !== null ? q.duyet === filterDuyet : true;
        const matchSearch = searchText ? q.noi_dung.toLowerCase().includes(searchText.toLowerCase()) : true;
        return matchStatus && matchDuyet && matchSearch;
    });

    // Build one column per AI with icons for each criteria
    const aiCols = AI_LIST.map((ai) => ({
        title: ai,
        key: `ai_${ai}`,
        width: 120,
        align: "center",
        render: (_, r) => {
            const review = r.ai_review?.[ai];
            return (
                <Space size={4}>
                    {CRITERIA.map((c) => {
                        const level = review?.[c.key] || "ok";
                        const color = LEVEL_COLOR[level] || LEVEL_COLOR.ok;
                        const note = c.key === "noi_dung" ? review?.note : "";
                        const icon = <span style={{ color, fontSize: 16 }}>{c.icon}</span>;
                        return (
                            <Tooltip key={c.key} title={`${c.label}: ${REVIEW_LEVELS[level]?.label || level}${note ? " — " + note : ""}`}>
                                <Tag style={{ margin: 0, padding: "2px 5px", borderColor: color, color, background: `${color}11` }}>
                                    {icon}
                                </Tag>
                            </Tooltip>
                        );
                    })}
                </Space>
            );
        },
    }));

    const columns = [
        { title: "STT", key: "stt", width: 50, render: (_, __, i) => i + 1, fixed: "left" },
        {
            title: "Câu hỏi", key: "cauhoi", width: 220, fixed: "left",
            render: (_, r) => (
                <div>
                    <Tooltip title={r.noi_dung}><Text style={{ fontSize: 12 }}>{r.noi_dung.length > 60 ? r.noi_dung.slice(0, 60) + "…" : r.noi_dung}</Text></Tooltip>
                    <div style={{ marginTop: 4 }}>
                        <Tag color={MACH_COLORS[r.mach]} style={{ fontSize: 10 }}>{r.mach}</Tag>
                    </div>
                </div>
            ),
        },
        { title: "Đáp án", dataIndex: "dap_an", key: "dap_an", width: 90, render: (t) => <Tag color="cyan">{t || "—"}</Tag> },
        { title: "Độ khó", dataIndex: "do_kho", key: "do_kho", width: 90, render: (v) => { const map = { Dễ: "success", "Trung bình": "warning", Khó: "error" }; return <Badge status={map[v] || "default"} text={v} />; } },
        {
            title: "Tổng quan AI",
            key: "overall",
            width: 100,
            align: "center",
            render: (_, r) => {
                const s = overallStatus(r.ai_review);
                return <ReviewTag level={s} note="" />;
            },
        },
        ...aiCols,
        {
            title: "Trạng thái duyệt", key: "duyet", width: 130, fixed: "right", align: "center",
            render: (_, r) => r.duyet
                ? <Tag icon={<SafetyCertificateOutlined />} color="success">Đã duyệt</Tag>
                : <Tag color="default">Chưa duyệt</Tag>,
        },
        {
            title: "Thao tác", key: "action", width: 160, fixed: "right", align: "center",
            render: (_, r) => (
                <Space direction="vertical" size={4}>
                    <Button size="small" icon={<SearchOutlined />} onClick={() => setDetailRecord(r)}>Chi tiết</Button>
                    {r.duyet
                        ? <Popconfirm title="Hủy duyệt câu hỏi này?" onConfirm={() => handleDuyet(r.id, false)} okText="Hủy duyệt" cancelText="Không">
                            <Button size="small" danger icon={<CloseCircleOutlined />}>Hủy duyệt</Button>
                          </Popconfirm>
                        : <Popconfirm title="Xác nhận duyệt câu hỏi này?" onConfirm={() => handleDuyet(r.id, true)} okText="Duyệt" cancelText="Hủy">
                            <Button size="small" type="primary" icon={<CheckSquareOutlined />}>Duyệt</Button>
                          </Popconfirm>
                    }
                </Space>
            ),
        },
    ];

    const totalDuyet = questions.filter((q) => q.duyet).length;
    const totalError = questions.filter((q) => overallStatus(q.ai_review) === "error").length;
    const totalWarn  = questions.filter((q) => overallStatus(q.ai_review) === "warn").length;

    return (
        <>
            {/* Summary */}
            <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
                <Col xs={8} sm={6} lg={4}>
                    <Card size="small" style={{ textAlign: "center" }}>
                        <Statistic title="Đã duyệt" value={totalDuyet} suffix={`/ ${questions.length}`} valueStyle={{ color: "#52c41a", fontSize: 20 }} />
                    </Card>
                </Col>
                <Col xs={8} sm={6} lg={4}>
                    <Card size="small" style={{ textAlign: "center" }}>
                        <Statistic title="Cảnh báo" value={totalWarn} valueStyle={{ color: "#faad14", fontSize: 20 }} />
                    </Card>
                </Col>
                <Col xs={8} sm={6} lg={4}>
                    <Card size="small" style={{ textAlign: "center" }}>
                        <Statistic title="Có lỗi" value={totalError} valueStyle={{ color: "#ff4d4f", fontSize: 20 }} />
                    </Card>
                </Col>
            </Row>

            {/* Filters */}
            <Row gutter={[12, 12]} style={{ marginBottom: 16 }} align="middle">
                <Col flex="auto">
                    <Space wrap>
                        <Input placeholder="Tìm kiếm câu hỏi..." prefix={<SearchOutlined />} value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ width: 240 }} allowClear />
                        <Select placeholder="Lọc theo kết quả AI" value={filterStatus} onChange={setFilterStatus} allowClear style={{ width: 180 }}>
                            <Option value="ok"><Tag color="success">Chính xác</Tag></Option>
                            <Option value="warn"><Tag color="warning">Cảnh báo</Tag></Option>
                            <Option value="error"><Tag color="error">Có lỗi</Tag></Option>
                        </Select>
                        <Select placeholder="Lọc theo duyệt" value={filterDuyet} onChange={setFilterDuyet} allowClear style={{ width: 160 }}>
                            <Option value={true}>Đã duyệt</Option>
                            <Option value={false}>Chưa duyệt</Option>
                        </Select>
                    </Space>
                </Col>
            </Row>

            <Card size="small" style={{ overflowX: "auto" }}>
                <Table
                    dataSource={filtered} columns={columns} rowKey="id" size="small"
                    scroll={{ x: 1600 }}
                    pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `Tổng ${t} câu hỏi` }}
                    locale={{ emptyText: "Không có câu hỏi nào" }}
                    rowClassName={(r) => r.duyet ? "row-duyet" : ""}
                />
            </Card>

            {/* Detail modal */}
            <Modal
                title={<Space><RobotOutlined /> Chi tiết review AI</Space>}
                open={!!detailRecord}
                onCancel={() => setDetailRecord(null)}
                footer={
                    detailRecord && (
                        <Space>
                            {detailRecord.duyet
                                ? <Popconfirm title="Hủy duyệt câu hỏi này?" onConfirm={() => { handleDuyet(detailRecord.id, false); setDetailRecord({ ...detailRecord, duyet: false }); }} okText="Hủy duyệt" cancelText="Không">
                                    <Button danger icon={<CloseCircleOutlined />}>Hủy duyệt</Button>
                                  </Popconfirm>
                                : <Popconfirm title="Xác nhận duyệt câu hỏi này?" onConfirm={() => { handleDuyet(detailRecord.id, true); setDetailRecord({ ...detailRecord, duyet: true }); }} okText="Duyệt" cancelText="Hủy">
                                    <Button type="primary" icon={<CheckSquareOutlined />}>Duyệt câu hỏi</Button>
                                  </Popconfirm>
                            }
                            <Button onClick={() => setDetailRecord(null)}>Đóng</Button>
                        </Space>
                    )
                }
                width={700}
            >
                {detailRecord && (
                    <div>
                        <Card size="small" style={{ marginBottom: 16, background: "#fafafa" }}>
                            <Text strong>Nội dung: </Text><Text>{detailRecord.noi_dung}</Text><br />
                            <Text strong>Đáp án: </Text><Tag color="cyan">{detailRecord.dap_an || "—"}</Tag>
                            <Tag color={MACH_COLORS[detailRecord.mach]}>{detailRecord.mach}</Tag>
                            <Text type="secondary" style={{ fontSize: 12 }}>{detailRecord.chu_de}</Text><br />
                            <div style={{ marginTop: 8 }}>
                                {detailRecord.duyet
                                    ? <Tag icon={<SafetyCertificateOutlined />} color="success">Đã duyệt</Tag>
                                    : <Tag color="default">Chưa duyệt</Tag>}
                            </div>
                        </Card>

                        <Table
                            size="small"
                            pagination={false}
                            dataSource={AI_LIST.map((ai) => ({ ai, ...detailRecord.ai_review?.[ai] }))}
                            rowKey="ai"
                            columns={[
                                { title: "AI", dataIndex: "ai", key: "ai", width: 80, render: (v) => <Tag icon={<RobotOutlined />}>{v}</Tag> },
                                { title: "Nội dung", dataIndex: "noi_dung", key: "noi_dung", width: 110, align: "center", render: (v, r) => <ReviewTag level={v} note={r.note} /> },
                                { title: "Đáp án", dataIndex: "dap_an", key: "dap_an", width: 110, align: "center", render: (v) => <ReviewTag level={v} /> },
                                { title: "Phân loại", dataIndex: "phan_loai", key: "phan_loai", width: 110, align: "center", render: (v) => <ReviewTag level={v} /> },
                                { title: "Ghi chú", dataIndex: "note", key: "note", render: (v) => v ? <Alert message={v} type="warning" showIcon style={{ padding: "2px 8px", fontSize: 12 }} /> : <Text type="secondary">—</Text> },
                            ]}
                        />
                    </div>
                )}
            </Modal>
        </>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function Math4CurriculumPage() {
    const [questions, setQuestions] = useState(INITIAL_QUESTIONS);

    React.useEffect(() => { document.title = "Phân loại câu hỏi Toán lớp 4"; }, []);

    const stats = CURRICULUM.mach_kien_thuc.map((mach) => ({
        ...mach,
        count: questions.filter((q) => q.mach === mach.ten).length,
    }));

    const tabItems = [
        {
            key: "classify",
            label: <Space><TagsOutlined />Phân loại câu hỏi</Space>,
            children: <ClassifyTab questions={questions} setQuestions={setQuestions} />,
        },
        {
            key: "quick-classify",
            label: (
                <Space>
                    <FilterOutlined />
                    Phân loại
                    {questions.filter((q) => !q.mach || !q.chu_de).length > 0 && (
                        <Badge count={questions.filter((q) => !q.mach || !q.chu_de).length} size="small" />
                    )}
                </Space>
            ),
            children: <QuickClassifyTab questions={questions} setQuestions={setQuestions} />,
        },
        {
            key: "review",
            label: (
                <Space>
                    <RobotOutlined />
                    Review ngân hàng
                    {questions.filter((q) => !q.duyet).length > 0 && (
                        <Badge count={questions.filter((q) => !q.duyet).length} size="small" />
                    )}
                </Space>
            ),
            children: <ReviewTab questions={questions} setQuestions={setQuestions} />,
        },
    ];

    return (
        <div style={{ padding: "0 4px" }}>
            <Space align="center" style={{ marginBottom: 8 }}>
                <BookOutlined style={{ fontSize: 24, color: "#1677ff" }} />
                <Title level={3} style={{ margin: 0 }}>Phân loại câu hỏi Toán lớp 4</Title>
            </Space>
            <Text type="secondary" style={{ display: "block", marginBottom: 20 }}>
                Gán và phân loại nội dung câu hỏi vào khung chương trình Toán lớp 4
            </Text>

            {/* Stats */}
            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
                {stats.map((mach) => (
                    <Col xs={24} sm={12} lg={6} key={mach.ten}>
                        <Card size="small">
                            <Statistic
                                title={<Space><Tag color={MACH_COLORS[mach.ten]}>{mach.ty_trong}</Tag><Text style={{ fontSize: 12 }}>{mach.ten}</Text></Space>}
                                value={mach.count} suffix="câu"
                                valueStyle={{ fontSize: 20 }}
                            />
                            <Progress
                                percent={questions.length ? Math.round((mach.count / questions.length) * 100) : 0}
                                size="small"
                                strokeColor={{ blue: "#1677ff", green: "#52c41a", purple: "#722ed1", orange: "#fa8c16" }[MACH_COLORS[mach.ten]]}
                                style={{ marginTop: 8 }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Curriculum reference */}
            <Collapse size="small" style={{ marginBottom: 20, background: "#fff" }} items={[{
                key: "curriculum",
                label: (
                    <Space>
                        <TagsOutlined />
                        <Text strong>Khung chương trình tham chiếu</Text>
                        <Text type="secondary" style={{ fontWeight: "normal" }}>— Toán lớp 4 - Chương trình GDPT 2018</Text>
                    </Space>
                ),
                children: (
                    <Row gutter={[16, 8]}>
                        {CURRICULUM.mach_kien_thuc.map((mach) => (
                            <Col xs={24} sm={12} key={mach.ten}>
                                <Space align="start">
                                    <Tag color={MACH_COLORS[mach.ten]} style={{ marginTop: 2 }}>{mach.ty_trong}</Tag>
                                    <div>
                                        <Text strong>{mach.ten}</Text>
                                        <div style={{ marginTop: 4 }}>
                                            {mach.noi_dung.map((nd) => (
                                                <div key={nd} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                                                    <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 11 }} />
                                                    <Text style={{ fontSize: 12 }}>{nd}</Text>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Space>
                            </Col>
                        ))}
                    </Row>
                ),
            }]} />

            <Divider style={{ margin: "0 0 16px" }} />

            <Tabs items={tabItems} defaultActiveKey="classify" />
        </div>
    );
}

export default Math4CurriculumPage;
