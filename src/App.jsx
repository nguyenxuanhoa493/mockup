import React from "react";
import { ConfigProvider, Layout, Menu } from "antd";
import { DeleteOutlined, HomeOutlined } from "@ant-design/icons";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useLocation,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import DeleteNotificationPage from "./pages/DeleteNotificationPage";

const { Sider, Content } = Layout;

const menuItems = [
    {
        key: "/",
        label: "Trang chủ",
        icon: <HomeOutlined />,
    },
    {
        key: "/delete-notification",
        label: "Thông báo khi xóa file, thư mục",
        icon: <DeleteOutlined />,
    },
];

function SideNav() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Sider width={250} style={{ background: "#001529" }}>
            <div
                style={{
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid #303030",
                }}
            >
                <h4 style={{ color: "#ffffff", margin: 0 }}>My App</h4>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
                style={{ borderRight: 0 }}
            />
        </Sider>
    );
}

function AppLayout() {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SideNav />
            <Content style={{ padding: 24 }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/delete-notification"
                        element={<DeleteNotificationPage />}
                    />
                </Routes>
            </Content>
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
            <Router>
                <AppLayout />
            </Router>
        </ConfigProvider>
    );
}

export default App;
