import React from "react";
import {
    Card,
    Button,
    Space,
    Typography,
    Row,
    Col,
    Tag,
    Select,
    Input,
    Modal,
    Tabs,
    Avatar,
    Divider,
    Rate,
    Badge,
    Statistic,
    List,
    Empty,
    Tooltip,
    message,
} from "antd";
import {
    AppstoreOutlined,
    UnorderedListOutlined,
    SearchOutlined,
    DownloadOutlined,
    EyeOutlined,
    BookOutlined,
    ClockCircleOutlined,
    UserOutlined,
    StarOutlined,
    CheckCircleOutlined,
    PlayCircleOutlined,
    FileTextOutlined,
    TrophyOutlined,
    GlobalOutlined,
    TeamOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

// Data mẫu - Ngân hàng khóa học
const COURSE_BANK = [
    {
        id: 1,
        name: "Kỹ năng lãnh đạo hiện đại",
        description: "Khóa học toàn diện về kỹ năng lãnh đạo cho quản lý cấp trung và cao cấp",
        category: "Kỹ năng quản lý",
        level: "intermediate",
        duration: 40,
        lessons: 25,
        rating: 4.8,
        reviews: 256,
        students: 1280,
        author: "Dr. Nguyễn Văn A",
        organization: "Harvard Business School",
        thumbnail: "https://placehold.co/300x200/1890ff/fff?text=Leadership",
        tags: ["Quản lý", "Lãnh đạo", "Soft Skills"],
        status: "available",
        price: "Miễn phí",
        language: "Tiếng Việt",
        lastUpdated: "2024-11-15",
        objectives: [
            "Hiểu rõ các phong cách lãnh đạo hiện đại",
            "Phát triển kỹ năng giao tiếp và động viên nhân viên",
            "Xây dựng và quản lý đội nhóm hiệu quả",
            "Đưa ra quyết định chiến lược đúng đắn",
        ],
        curriculum: [
            { module: "Module 1: Tổng quan về lãnh đạo", lessons: 5, duration: 8 },
            { module: "Module 2: Phong cách lãnh đạo", lessons: 6, duration: 10 },
            { module: "Module 3: Giao tiếp và động viên", lessons: 7, duration: 12 },
            { module: "Module 4: Xây dựng đội nhóm", lessons: 7, duration: 10 },
        ],
        requirements: ["Kinh nghiệm quản lý từ 1 năm trở lên", "Hiểu biết cơ bản về quản trị"],
    },
    {
        id: 2,
        name: "Marketing Digital từ A-Z",
        description: "Khóa học Marketing Digital toàn diện cho người mới bắt đầu và chuyên viên Marketing",
        category: "Marketing",
        level: "beginner",
        duration: 35,
        lessons: 30,
        rating: 4.9,
        reviews: 512,
        students: 2450,
        author: "Trần Thị B",
        organization: "Google Digital Garage",
        thumbnail: "https://placehold.co/300x200/52c41a/fff?text=Digital+Marketing",
        tags: ["Marketing", "Digital", "SEO", "Social Media"],
        status: "available",
        price: "Miễn phí",
        language: "Tiếng Việt",
        lastUpdated: "2024-12-01",
        objectives: [
            "Nắm vững các khái niệm Marketing Digital cơ bản",
            "Thực hiện chiến dịch quảng cáo Google Ads",
            "Quản lý và tối ưu hóa Social Media Marketing",
            "Đo lường và phân tích hiệu quả Marketing",
        ],
        curriculum: [
            { module: "Module 1: Giới thiệu Marketing Digital", lessons: 5, duration: 6 },
            { module: "Module 2: SEO & SEM", lessons: 8, duration: 10 },
            { module: "Module 3: Social Media Marketing", lessons: 10, duration: 12 },
            { module: "Module 4: Analytics & Measurement", lessons: 7, duration: 7 },
        ],
        requirements: ["Không yêu cầu kiến thức trước", "Máy tính và kết nối internet"],
    },
    {
        id: 3,
        name: "Data Analytics với Python",
        description: "Học phân tích dữ liệu với Python, Pandas, và các thư viện phổ biến",
        category: "Công nghệ",
        level: "intermediate",
        duration: 50,
        lessons: 35,
        rating: 4.7,
        reviews: 389,
        students: 1850,
        author: "Lê Văn C",
        organization: "Coursera",
        thumbnail: "https://placehold.co/300x200/722ed1/fff?text=Python+Analytics",
        tags: ["Python", "Data Science", "Analytics"],
        status: "available",
        price: "Miễn phí",
        language: "Tiếng Anh + Phụ đề",
        lastUpdated: "2024-11-20",
        objectives: [
            "Làm chủ Python cơ bản và nâng cao",
            "Sử dụng Pandas để xử lý dữ liệu",
            "Tạo visualizations với Matplotlib và Seaborn",
            "Xây dựng dashboard phân tích dữ liệu",
        ],
        curriculum: [
            { module: "Module 1: Python Basics", lessons: 8, duration: 12 },
            { module: "Module 2: Pandas & Data Manipulation", lessons: 10, duration: 15 },
            { module: "Module 3: Data Visualization", lessons: 9, duration: 13 },
            { module: "Module 4: Advanced Analytics", lessons: 8, duration: 10 },
        ],
        requirements: ["Kiến thức lập trình cơ bản", "Hiểu biết về toán học và thống kê"],
    },
    {
        id: 4,
        name: "Giao tiếp thuyết trình hiệu quả",
        description: "Nâng cao kỹ năng giao tiếp và thuyết trình trước đám đông",
        category: "Kỹ năng mềm",
        level: "beginner",
        duration: 25,
        lessons: 18,
        rating: 4.6,
        reviews: 425,
        students: 3200,
        author: "Phạm Thị D",
        organization: "Toastmasters International",
        thumbnail: "https://placehold.co/300x200/faad14/fff?text=Presentation",
        tags: ["Giao tiếp", "Thuyết trình", "Public Speaking"],
        status: "imported",
        price: "Miễn phí",
        language: "Tiếng Việt",
        lastUpdated: "2024-11-10",
        objectives: [
            "Tự tin giao tiếp trước đám đông",
            "Chuẩn bị nội dung thuyết trình hấp dẫn",
            "Sử dụng ngôn ngữ cơ thể hiệu quả",
            "Xử lý các tình huống khó khăn khi thuyết trình",
        ],
        curriculum: [
            { module: "Module 1: Cơ bản về giao tiếp", lessons: 4, duration: 6 },
            { module: "Module 2: Kỹ thuật thuyết trình", lessons: 6, duration: 9 },
            { module: "Module 3: Ngôn ngữ cơ thể", lessons: 4, duration: 5 },
            { module: "Module 4: Thực hành & Feedback", lessons: 4, duration: 5 },
        ],
        requirements: ["Không yêu cầu"],
    },
    {
        id: 5,
        name: "Quản lý dự án Agile & Scrum",
        description: "Khóa học về phương pháp Agile và framework Scrum cho quản lý dự án",
        category: "Quản lý dự án",
        level: "intermediate",
        duration: 30,
        lessons: 20,
        rating: 4.8,
        reviews: 315,
        students: 1650,
        author: "Hoàng Văn E",
        organization: "Scrum Alliance",
        thumbnail: "https://placehold.co/300x200/ff4d4f/fff?text=Agile+Scrum",
        tags: ["Agile", "Scrum", "Project Management"],
        status: "available",
        price: "Miễn phí",
        language: "Tiếng Việt",
        lastUpdated: "2024-12-05",
        objectives: [
            "Hiểu nguyên tắc và giá trị Agile",
            "Thực hiện Scrum Framework hiệu quả",
            "Quản lý Sprint và Daily Standup",
            "Sử dụng công cụ Agile phổ biến",
        ],
        curriculum: [
            { module: "Module 1: Giới thiệu Agile", lessons: 5, duration: 7 },
            { module: "Module 2: Scrum Framework", lessons: 6, duration: 9 },
            { module: "Module 3: Scrum Events", lessons: 5, duration: 8 },
            { module: "Module 4: Scaling Agile", lessons: 4, duration: 6 },
        ],
        requirements: ["Kinh nghiệm quản lý dự án cơ bản"],
    },
    {
        id: 6,
        name: "Excel nâng cao cho Analyst",
        description: "Làm chủ Excel với các hàm nâng cao, PivotTable, và Power Query",
        category: "Công nghệ",
        level: "advanced",
        duration: 28,
        lessons: 22,
        rating: 4.7,
        reviews: 278,
        students: 2100,
        author: "Đỗ Thị F",
        organization: "Microsoft Learn",
        thumbnail: "https://placehold.co/300x200/13c2c2/fff?text=Excel+Advanced",
        tags: ["Excel", "Data Analysis", "Spreadsheet"],
        status: "available",
        price: "Miễn phí",
        language: "Tiếng Việt",
        lastUpdated: "2024-11-25",
        objectives: [
            "Sử dụng hàm Excel nâng cao (VLOOKUP, INDEX, MATCH)",
            "Tạo PivotTable và PivotChart phức tạp",
            "Làm việc với Power Query",
            "Tự động hóa với Macros cơ bản",
        ],
        curriculum: [
            { module: "Module 1: Hàm nâng cao", lessons: 8, duration: 10 },
            { module: "Module 2: PivotTable & Charts", lessons: 6, duration: 8 },
            { module: "Module 3: Power Query", lessons: 5, duration: 7 },
            { module: "Module 4: Macros & VBA", lessons: 3, duration: 3 },
        ],
        requirements: ["Kiến thức Excel cơ bản và trung cấp"],
    },
];

const CATEGORIES = ["Tất cả", "Kỹ năng mềm", "Kỹ năng quản lý", "Marketing", "Công nghệ", "Quản lý dự án"];
const LEVELS = { all: "Tất cả", beginner: "Cơ bản", intermediate: "Trung cấp", advanced: "Nâng cao" };

function CourseBankPage() {
    const [viewMode, setViewMode] = React.useState("grid");
    const [selectedCategory, setSelectedCategory] = React.useState("Tất cả");
    const [selectedLevel, setSelectedLevel] = React.useState("all");
    const [searchText, setSearchText] = React.useState("");
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [showDetailModal, setShowDetailModal] = React.useState(false);

    React.useEffect(() => {
        document.title = "Ngân hàng khóa học - Mockup App";
    }, []);

    // Filter courses
    const filteredCourses = React.useMemo(() => {
        return COURSE_BANK.filter((course) => {
            const categoryMatch = selectedCategory === "Tất cả" || course.category === selectedCategory;
            const levelMatch = selectedLevel === "all" || course.level === selectedLevel;
            const searchMatch =
                searchText === "" ||
                course.name.toLowerCase().includes(searchText.toLowerCase()) ||
                course.description.toLowerCase().includes(searchText.toLowerCase()) ||
                course.tags.some((tag) => tag.toLowerCase().includes(searchText.toLowerCase()));
            return categoryMatch && levelMatch && searchMatch;
        });
    }, [selectedCategory, selectedLevel, searchText]);

    const getLevelTag = (level) => {
        const configs = {
            beginner: { color: "green", text: "Cơ bản" },
            intermediate: { color: "blue", text: "Trung cấp" },
            advanced: { color: "orange", text: "Nâng cao" },
        };
        const config = configs[level] || configs.beginner;
        return <Tag color={config.color}>{config.text}</Tag>;
    };

    const handleImportCourse = (course) => {
        message.success(`Đã lấy khóa học "${course.name}" về hệ thống!`);
        // Update course status to imported
        course.status = "imported";
    };

    const courseCard = (course) => (
        <Card
            key={course.id}
            hoverable
            cover={
                <div style={{ position: "relative", overflow: "hidden" }}>
                    <img 
                        alt={course.name} 
                        src={course.thumbnail} 
                        style={{ 
                            width: "100%", 
                            height: 180, 
                            objectFit: "cover",
                            display: "block"
                        }} 
                    />
                    {course.status === "imported" && (
                        <Tag
                            color="success"
                            icon={<CheckCircleOutlined />}
                            style={{ position: "absolute", top: 8, right: 8 }}
                        >
                            Đã lấy về
                        </Tag>
                    )}
                </div>
            }
            actions={[
                <Tooltip title="Xem chi tiết">
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedCourse(course);
                            setShowDetailModal(true);
                        }}
                    >
                        Chi tiết
                    </Button>
                </Tooltip>,
                course.status === "available" ? (
                    <Tooltip title="Lấy khóa học về sử dụng">
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            onClick={() => handleImportCourse(course)}
                        >
                            Lấy về
                        </Button>
                    </Tooltip>
                ) : (
                    <Button disabled icon={<CheckCircleOutlined />}>
                        Đã lấy về
                    </Button>
                ),
            ]}
        >
            <Card.Meta
                title={
                    <Tooltip title={course.name}>
                        <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {course.name}
                        </div>
                    </Tooltip>
                }
                description={
                    <div>
                        <Paragraph
                            ellipsis={{ rows: 2 }}
                            style={{ fontSize: 12, color: "#8c8c8c", marginBottom: 8 }}
                        >
                            {course.description}
                        </Paragraph>
                        <Space wrap size={[0, 4]} style={{ marginBottom: 8 }}>
                            <Tag color="blue">{course.category}</Tag>
                            {getLevelTag(course.level)}
                        </Space>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                            <Space>
                                <ClockCircleOutlined />
                                <Text type="secondary">{course.duration}h</Text>
                            </Space>
                            <Space>
                                <BookOutlined />
                                <Text type="secondary">{course.lessons} bài</Text>
                            </Space>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                            <Space>
                                <Rate disabled defaultValue={course.rating} style={{ fontSize: 12 }} />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    ({course.reviews})
                                </Text>
                            </Space>
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <Text type="secondary" style={{ fontSize: 11 }}>
                                <UserOutlined /> {course.students.toLocaleString()} học viên
                            </Text>
                        </div>
                    </div>
                }
            />
        </Card>
    );

    const courseListItem = (course) => (
        <List.Item
            key={course.id}
            actions={[
                <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => {
                        setSelectedCourse(course);
                        setShowDetailModal(true);
                    }}
                >
                    Chi tiết
                </Button>,
                course.status === "available" ? (
                    <Button type="primary" icon={<DownloadOutlined />} onClick={() => handleImportCourse(course)}>
                        Lấy về
                    </Button>
                ) : (
                    <Button disabled icon={<CheckCircleOutlined />}>
                        Đã lấy về
                    </Button>
                ),
            ]}
        >
            <List.Item.Meta
                avatar={
                    <img 
                        src={course.thumbnail} 
                        alt={course.name} 
                        style={{ 
                            width: 120, 
                            height: 80, 
                            objectFit: "cover", 
                            borderRadius: 4,
                            display: "block"
                        }} 
                    />
                }
                title={
                    <Space>
                        <Text strong>{course.name}</Text>
                        {course.status === "imported" && (
                            <Tag color="success" icon={<CheckCircleOutlined />}>
                                Đã lấy về
                            </Tag>
                        )}
                    </Space>
                }
                description={
                    <div>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>
                            {course.description}
                        </Paragraph>
                        <Space wrap>
                            <Tag color="blue">{course.category}</Tag>
                            {getLevelTag(course.level)}
                            <Text type="secondary">
                                <ClockCircleOutlined /> {course.duration}h
                            </Text>
                            <Text type="secondary">
                                <BookOutlined /> {course.lessons} bài
                            </Text>
                            <Rate disabled defaultValue={course.rating} style={{ fontSize: 12 }} />
                            <Text type="secondary">({course.reviews} đánh giá)</Text>
                            <Text type="secondary">
                                <UserOutlined /> {course.students.toLocaleString()} HV
                            </Text>
                        </Space>
                    </div>
                }
            />
        </List.Item>
    );

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
                <Title level={2}>
                    <GlobalOutlined style={{ marginRight: 8 }} />
                    Ngân hàng khóa học
                </Title>
                <Text type="secondary">
                    Khám phá và lấy về các khóa học chất lượng từ các tổ chức giáo dục hàng đầu
                </Text>
            </div>

            {/* Statistics */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                <Col xs={12} sm={6}>
                    <Card>
                        <Statistic
                            title="Tổng khóa học"
                            value={COURSE_BANK.length}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: "#1890ff" }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card>
                        <Statistic
                            title="Đã lấy về"
                            value={COURSE_BANK.filter((c) => c.status === "imported").length}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: "#52c41a" }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card>
                        <Statistic
                            title="Tổng học viên"
                            value={COURSE_BANK.reduce((sum, c) => sum + c.students, 0)}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: "#722ed1" }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card>
                        <Statistic
                            title="Đánh giá TB"
                            value={
                                (COURSE_BANK.reduce((sum, c) => sum + c.rating, 0) / COURSE_BANK.length).toFixed(1)
                            }
                            prefix={<StarOutlined />}
                            suffix="/ 5"
                            valueStyle={{ color: "#faad14" }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Filters */}
            <Card style={{ marginBottom: 24 }}>
                <Row gutter={16} align="middle">
                    <Col xs={24} sm={12} md={8}>
                        <Input
                            placeholder="Tìm kiếm khóa học..."
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            allowClear
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select
                            placeholder="Danh mục"
                            style={{ width: "100%" }}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            options={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Select
                            placeholder="Trình độ"
                            style={{ width: "100%" }}
                            value={selectedLevel}
                            onChange={setSelectedLevel}
                            options={Object.entries(LEVELS).map(([value, label]) => ({ value, label }))}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8} style={{ textAlign: "right" }}>
                        <Space>
                            <Text type="secondary">Hiển thị:</Text>
                            <Button
                                type={viewMode === "grid" ? "primary" : "default"}
                                icon={<AppstoreOutlined />}
                                onClick={() => setViewMode("grid")}
                            />
                            <Button
                                type={viewMode === "list" ? "primary" : "default"}
                                icon={<UnorderedListOutlined />}
                                onClick={() => setViewMode("list")}
                            />
                        </Space>
                    </Col>
                </Row>
            </Card>

            {/* Course List */}
            {filteredCourses.length === 0 ? (
                <Card>
                    <Empty description="Không tìm thấy khóa học phù hợp" />
                </Card>
            ) : viewMode === "grid" ? (
                <Row gutter={[16, 16]}>
                    {filteredCourses.map((course) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                            {courseCard(course)}
                        </Col>
                    ))}
                </Row>
            ) : (
                <Card>
                    <List
                        itemLayout="vertical"
                        dataSource={filteredCourses}
                        renderItem={courseListItem}
                        pagination={{
                            pageSize: 10,
                            showTotal: (total) => `Tổng ${total} khóa học`,
                        }}
                    />
                </Card>
            )}

            {/* Detail Modal */}
            <Modal
                title={
                    <Space>
                        <BookOutlined style={{ color: "#1890ff", fontSize: 20 }} />
                        <Text strong>Chi tiết khóa học</Text>
                    </Space>
                }
                open={showDetailModal}
                onCancel={() => setShowDetailModal(false)}
                width={900}
                footer={[
                    <Button key="close" onClick={() => setShowDetailModal(false)}>
                        Đóng
                    </Button>,
                    selectedCourse?.status === "available" && (
                        <Button
                            key="import"
                            type="primary"
                            icon={<DownloadOutlined />}
                            onClick={() => {
                                handleImportCourse(selectedCourse);
                                setShowDetailModal(false);
                            }}
                        >
                            Lấy khóa học về
                        </Button>
                    ),
                ]}
            >
                {selectedCourse && (
                    <Tabs
                        defaultActiveKey="overview"
                        items={[
                            {
                                key: "overview",
                                label: "Tổng quan",
                                children: (
                                    <div>
                                        <img
                                            src={selectedCourse.thumbnail}
                                            alt={selectedCourse.name}
                                            style={{ 
                                                width: "100%", 
                                                height: 300,
                                                objectFit: "cover",
                                                borderRadius: 8, 
                                                marginBottom: 16,
                                                display: "block"
                                            }}
                                        />
                                        <Title level={4}>{selectedCourse.name}</Title>
                                        <Space wrap style={{ marginBottom: 16 }}>
                                            <Tag color="blue">{selectedCourse.category}</Tag>
                                            {getLevelTag(selectedCourse.level)}
                                            {selectedCourse.status === "imported" && (
                                                <Tag color="success" icon={<CheckCircleOutlined />}>
                                                    Đã lấy về
                                                </Tag>
                                            )}
                                        </Space>

                                        <Paragraph>{selectedCourse.description}</Paragraph>

                                        <Row gutter={16} style={{ marginBottom: 16 }}>
                                            <Col span={12}>
                                                <Space direction="vertical" style={{ width: "100%" }}>
                                                    <div>
                                                        <Text type="secondary">Tác giả:</Text>
                                                        <br />
                                                        <Text strong>{selectedCourse.author}</Text>
                                                    </div>
                                                    <div>
                                                        <Text type="secondary">Tổ chức:</Text>
                                                        <br />
                                                        <Text strong>{selectedCourse.organization}</Text>
                                                    </div>
                                                    <div>
                                                        <Text type="secondary">Ngôn ngữ:</Text>
                                                        <br />
                                                        <Text>{selectedCourse.language}</Text>
                                                    </div>
                                                </Space>
                                            </Col>
                                            <Col span={12}>
                                                <Space direction="vertical" style={{ width: "100%" }}>
                                                    <div>
                                                        <Text type="secondary">Thời lượng:</Text>
                                                        <br />
                                                        <Text strong>{selectedCourse.duration} giờ</Text>
                                                    </div>
                                                    <div>
                                                        <Text type="secondary">Số bài học:</Text>
                                                        <br />
                                                        <Text strong>{selectedCourse.lessons} bài</Text>
                                                    </div>
                                                    <div>
                                                        <Text type="secondary">Học viên:</Text>
                                                        <br />
                                                        <Text strong>
                                                            {selectedCourse.students.toLocaleString()}
                                                        </Text>
                                                    </div>
                                                </Space>
                                            </Col>
                                        </Row>

                                        <div style={{ marginBottom: 16 }}>
                                            <Rate disabled value={selectedCourse.rating} />
                                            <Text style={{ marginLeft: 8 }}>
                                                {selectedCourse.rating} / 5 ({selectedCourse.reviews} đánh giá)
                                            </Text>
                                        </div>

                                        <Divider />

                                        <Title level={5}>Mục tiêu khóa học</Title>
                                        <ul>
                                            {selectedCourse.objectives.map((obj, index) => (
                                                <li key={index}>
                                                    <Text>{obj}</Text>
                                                </li>
                                            ))}
                                        </ul>

                                        <Divider />

                                        <Title level={5}>Yêu cầu</Title>
                                        <ul>
                                            {selectedCourse.requirements.map((req, index) => (
                                                <li key={index}>
                                                    <Text>{req}</Text>
                                                </li>
                                            ))}
                                        </ul>

                                        <Divider />

                                        <Title level={5}>Tags</Title>
                                        <Space wrap>
                                            {selectedCourse.tags.map((tag) => (
                                                <Tag key={tag}>{tag}</Tag>
                                            ))}
                                        </Space>
                                    </div>
                                ),
                            },
                            {
                                key: "curriculum",
                                label: "Nội dung khóa học",
                                children: (
                                    <div>
                                        <List
                                            dataSource={selectedCourse.curriculum}
                                            renderItem={(item, index) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Avatar
                                                                style={{ backgroundColor: "#1890ff" }}
                                                                icon={<FileTextOutlined />}
                                                            >
                                                                {index + 1}
                                                            </Avatar>
                                                        }
                                                        title={<Text strong>{item.module}</Text>}
                                                        description={
                                                            <Space>
                                                                <Text type="secondary">
                                                                    <PlayCircleOutlined /> {item.lessons} bài học
                                                                </Text>
                                                                <Divider type="vertical" />
                                                                <Text type="secondary">
                                                                    <ClockCircleOutlined /> {item.duration} giờ
                                                                </Text>
                                                            </Space>
                                                        }
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                ),
                            },
                        ]}
                    />
                )}
            </Modal>
        </div>
    );
}

export default CourseBankPage;
