import React from "react";
import { Typography, Space, Card } from "antd";

const { Title, Text } = Typography;

function HomePage() {
    // Set page title
    React.useEffect(() => {
        document.title = "Trang chủ - Mockup App";
    }, []);

    return (
        <div
            style={{
                minHeight: "calc(100vh - 120px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "16px",
            }}
        >
            <Card
                style={{
                    textAlign: "center",
                    padding: "40px",
                    borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Space direction="vertical" size="large">
                    <Title
                        level={1}
                        style={{
                            margin: 0,
                            color: "#1677ff",
                            fontSize: "3rem",
                        }}
                    >
                        Hello World
                    </Title>
                    <Text
                        style={{
                            fontSize: "1.2rem",
                            color: "#666",
                            display: "block",
                        }}
                    >
                        Welcome to your new React app with Ant Design!
                    </Text>
                </Space>
            </Card>
        </div>
    );
}

export default HomePage;
