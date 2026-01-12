import React, { useState } from "react";
import { ConfigProvider, Layout, Menu, Switch, Space, Typography, Avatar, Dropdown } from "antd";
import {
    DeleteOutlined,
    HomeOutlined,
    HistoryOutlined,
    PlayCircleOutlined,
    DashboardOutlined,
    FormOutlined,
    UserOutlined,
    TeamOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ThunderboltOutlined,
    RobotOutlined,
    LineChartOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    TrophyOutlined,
    BellOutlined,
    ClockCircleOutlined,
    VideoCameraOutlined,
    SafetyCertificateOutlined,
    BarChartOutlined,
    GlobalOutlined,
    CameraOutlined,
    DollarOutlined,
    CheckSquareOutlined,
    ApartmentOutlined,
} from "@ant-design/icons";
import {
    HashRouter as Router,
    Routes,
    Route,
    useNavigate,
    useLocation,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import DeleteNotificationPage from "./pages/DeleteNotificationPage";
import AccountHistoryPage from "./pages/AccountHistoryPage";
import PlyrDemoPage from "./pages/PlyrDemoPage";
import { RoleProvider, useRole, ROLES } from "./contexts/RoleContext";

import ResearcherProjectsPage from "./pages/researcher/ResearcherProjectsPage";
import ManagerProjectsPage from "./pages/manager/ManagerProjectsPage";
import OptimisticUpdatePage from "./pages/OptimisticUpdatePage";
import AILearningAssistantPage from "./pages/AILearningAssistantPage";
import LearningReportPage from "./pages/LearningReportPage";
import AddHTMLToCoursePage from "./pages/AddHTMLToCoursePage";
import AICreateCoursePage from "./pages/AICreateCoursePage";
import AIGradingConfigPage from "./pages/AIGradingConfigPage";
import PassFailGradingPage from "./pages/PassFailGradingPage"; // Import new page
import KnowledgeRacePage from "./pages/KnowledgeRacePage";
import PostTrainingManagementPage from "./pages/PostTrainingManagementPage";
import NotificationHistoryPage from "./pages/NotificationHistoryPage";
import ActivityLogPage from "./pages/ActivityLogPage";
import OnlineClassIntegrationPage from "./pages/OnlineClassIntegrationPage";
import OfflineClassActivityLogPage from "./pages/OfflineClassActivityLogPage";
import ExamReportPage from "./pages/ExamReportPage";
import CertificateReportPage from "./pages/CertificateReportPage";
import ReportPage from "./pages/ReportPage";
import CourseBankPage from "./pages/CourseBankPage";
import QuizPreparationPage from "./pages/QuizPreparationPage";
import SalaryV2Page from "./pages/SalaryV2Page";
import BreadcrumbsDemo from "./pages/BreadcrumbsDemo";

const { Sider, Content, Header } = Layout;
const { Text } = Typography;

const menuItems = [
    {
        key: "/",
        label: "Trang chủ",
        icon: <HomeOutlined />,
    },
    {
        key: "/nckh",
        label: "Hệ thống NCKH",
        icon: <DashboardOutlined />,
    },
    {
        key: "/ai-learning-assistant",
        label: "Trợ lý học tập AI",
        icon: <RobotOutlined />,
    },
    {
        key: "/learning-report",
        label: "Báo cáo học tập",
        icon: <LineChartOutlined />,
    },
    {
        key: "/add-html-course",
        label: "Thêm HTML vào khóa học",
        icon: <FileTextOutlined />,
    },
    {
        key: "/ai-create-course",
        label: "Tạo khóa học bằng AI",
        icon: <ThunderboltOutlined />,
    },
    {
        key: "/ai-grading-config",
        label: "Cấu hình chấm điểm AI",
        icon: <CheckCircleOutlined />,
    },
    {
        key: "/pass-fail-grading",
        label: "Chấm điểm Đạt/Chưa đạt",
        icon: <CheckSquareOutlined />,
    },
    {
        key: "/knowledge-race",
        label: "Đường đua tri thức",
        icon: <TrophyOutlined />,
    },
    {
        key: "/post-training-management",
        label: "Quản lý hoạt động sau đào tạo",
        icon: <LineChartOutlined />,
    },
    {
        key: "/notification-history",
        label: "Lịch sử gửi thông báo",
        icon: <BellOutlined />,
    },
    {
        key: "/activity-log",
        label: "Nhật ký hoạt động",
        icon: <ClockCircleOutlined />,
    },
    {
        key: "/online-class-integration",
        label: "Tích hợp đào tạo trực tuyến",
        icon: <VideoCameraOutlined />,
    },
    {
        key: "/offline-class-activity",
        label: "Nhật ký lớp học offline",
        icon: <HistoryOutlined />,
    },
    {
        key: "/exam-report",
        label: "Báo cáo chi tiết kỳ thi",
        icon: <FileTextOutlined />,
    },
    {
        key: "/certificate-report",
        label: "Báo cáo chứng chỉ",
        icon: <SafetyCertificateOutlined />,
    },
    {
        key: "/report",
        label: "Báo cáo tổng hợp",
        icon: <BarChartOutlined />,
    },
    {
        key: "/course-bank",
        label: "Ngân hàng khóa học",
        icon: <GlobalOutlined />,
    },
    {
        key: "/quiz-preparation",
        label: "Chuẩn bị vào thi",
        icon: <CameraOutlined />,
    },
    {
        key: "/salary-v2",
        label: "Tính lương V2",
        icon: <DollarOutlined />,
    },
    {
        key: "/breadcrumbs-demo",
        label: "Breadcrumbs Demo",
        icon: <ApartmentOutlined />,
    },
    {
        key: "/plyr-demo",
        label: "Plyr Media Player Demo",
        icon: <PlayCircleOutlined />,
    },
    {
        key: "/delete-notification",
        label: "Thông báo khi xóa file, thư mục",
        icon: <DeleteOutlined />,
    },
    {
        key: "/account-history",
        label: "Lịch sử tài khoản",
        icon: <HistoryOutlined />,
    },
    {
        key: "/optimistic-update",
        label: "Optimistic Update",
        icon: <ThunderboltOutlined />,
    },
];

function SideNav({ collapsed }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Sider
            width={250}
            style={{
                background: "#001529",
                position: "relative",
                zIndex: 1,
                transition: "all 0.2s",
            }}
            collapsed={collapsed}
            collapsedWidth={80}
            trigger={null}
        >
            <div
                style={{
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid #303030",
                    overflow: "hidden",
                }}
            >
                <h4 style={{ color: "#ffffff", margin: 0, whiteSpace: "nowrap" }}>
                    {collapsed ? "App" : "My App"}
                </h4>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
                style={{ borderRight: 0 }}
                inlineCollapsed={collapsed}
            />
        </Sider>
    );
}

function TopHeader({ collapsed, setCollapsed }) {
    const { currentRole, switchRole, ROLES } = useRole();
    const navigate = useNavigate();
    const location = useLocation();

    const isNCKHRoute = location.pathname.startsWith("/nckh");

    const handleRoleChange = (checked) => {
        switchRole(checked ? ROLES.MANAGER : ROLES.RESEARCHER);
        if (checked) {
            navigate("/nckh/manager");
        } else {
            navigate("/nckh");
        }
    };

    const roleMenuItems = [
        {
            key: 'researcher',
            label: (
                <Space>
                    <UserOutlined />
                    <span>Người nghiên cứu</span>
                </Space>
            ),
            onClick: () => {
                switchRole(ROLES.RESEARCHER);
                navigate("/nckh");
            }
        },
        {
            key: 'manager',
            label: (
                <Space>
                    <TeamOutlined />
                    <span>Quản lý NCKH</span>
                </Space>
            ),
            onClick: () => {
                switchRole(ROLES.MANAGER);
                navigate("/nckh/manager");
            }
        }
    ];

    return (
        <Header
            style={{
                background: "#fff",
                padding: "0 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #f0f0f0",
                height: "64px",
                lineHeight: "64px",
                position: "relative",
                zIndex: 10,
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                {collapsed ? (
                    <MenuUnfoldOutlined
                        style={{
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#1677ff",
                            transition: "color 0.3s",
                        }}
                        onClick={() => setCollapsed(false)}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#40a9ff"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#1677ff"}
                    />
                ) : (
                    <MenuFoldOutlined
                        style={{
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#1677ff",
                            transition: "color 0.3s",
                        }}
                        onClick={() => setCollapsed(true)}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#40a9ff"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#1677ff"}
                    />
                )}
            </div>

            {isNCKHRoute && (
                <Dropdown menu={{ items: roleMenuItems }} placement="bottomRight">
                    <Space style={{ cursor: "pointer" }}>
                        <Avatar
                            icon={currentRole === ROLES.MANAGER ? <TeamOutlined /> : <UserOutlined />}
                            style={{
                                backgroundColor: currentRole === ROLES.MANAGER ? "#52c41a" : "#1677ff"
                            }}
                        />
                        <Text strong>
                            {currentRole === ROLES.MANAGER ? "Quản lý NCKH" : "Người nghiên cứu"}
                        </Text>
                    </Space>
                </Dropdown>
            )}
        </Header>
    );
}

function AppLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SideNav collapsed={collapsed} />
            <Layout style={{ transition: "all 0.2s" }}>
                <TopHeader collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    style={{
                        padding: "24px",
                        minHeight: "calc(100vh - 64px)",
                        transition: "all 0.2s",
                        background: "#f0f2f5",
                    }}
                >
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/ai-learning-assistant" element={<AILearningAssistantPage />} />
                        <Route path="/learning-report" element={<LearningReportPage />} />
                        <Route path="/add-html-course" element={<AddHTMLToCoursePage />} />
                        <Route path="/ai-create-course" element={<AICreateCoursePage />} />
                        <Route path="/ai-grading-config" element={<AIGradingConfigPage />} />
                        <Route path="/pass-fail-grading" element={<PassFailGradingPage />} />
                        <Route path="/knowledge-race" element={<KnowledgeRacePage />} />
                        <Route path="/post-training-management" element={<PostTrainingManagementPage />} />
                        <Route path="/notification-history" element={<NotificationHistoryPage />} />
                        <Route path="/activity-log" element={<ActivityLogPage />} />
                        <Route path="/online-class-integration" element={<OnlineClassIntegrationPage />} />
                        <Route path="/offline-class-activity" element={<OfflineClassActivityLogPage />} />
                        <Route path="/exam-report" element={<ExamReportPage />} />
                        <Route path="/certificate-report" element={<CertificateReportPage />} />
                        <Route path="/report" element={<ReportPage />} />
                        <Route path="/course-bank" element={<CourseBankPage />} />
                        <Route path="/quiz-preparation" element={<QuizPreparationPage />} />
                        <Route path="/salary-v2" element={<SalaryV2Page />} />
                        <Route path="/breadcrumbs-demo" element={<BreadcrumbsDemo />} />
                        <Route path="/plyr-demo" element={<PlyrDemoPage />} />
                        <Route
                            path="/delete-notification"
                            element={<DeleteNotificationPage />}
                        />
                        <Route
                            path="/account-history"
                            element={<AccountHistoryPage />}
                        />
                        <Route
                            path="/optimistic-update"
                            element={<OptimisticUpdatePage />}
                        />

                        <Route path="/nckh" element={<ResearcherProjectsPage />} />
                        <Route path="/nckh/manager" element={<ManagerProjectsPage />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#1677ff",
                    borderRadius: 8,
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                },
                components: {
                    Layout: {
                        siderBg: "#001529",
                        headerBg: "#ffffff",
                    },
                },
            }}
        >
            <RoleProvider>
                <Router>
                    <AppLayout />
                </Router>
            </RoleProvider>
        </ConfigProvider>
    );
}

export default App;
