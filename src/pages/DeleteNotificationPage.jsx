import React, { useState } from "react";
import {
    Typography,
    Space,
    Card,
    Button,
    Modal,
    List,
    message,
    Divider,
} from "antd";
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function DeleteNotificationPage() {
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [deleteType, setDeleteType] = useState("file");
    const [deleteItems, setDeleteItems] = useState([]);

    // Mock data for files and folders
    const mockFiles = [
        {
            id: 1,
            name: "document.pdf",
            type: "file",
            size: "2.5 MB",
        },
        {
            id: 2,
            name: "image.jpg",
            type: "file",
            size: "1.8 MB",
        },
        {
            id: 3,
            name: "report.docx",
            type: "file",
            size: "3.2 MB",
        },
    ];

    const mockFolders = [
        {
            id: 4,
            name: "Documents",
            type: "folder",
            items: 15,
        },
        { id: 5, name: "Images", type: "folder", items: 8 },
        {
            id: 6,
            name: "Projects",
            type: "folder",
            items: 3,
        },
    ];

    const handleDeleteFile = () => {
        setDeleteType("file");
        setDeleteItems([mockFiles[0]]);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteFolder = () => {
        setDeleteType("folder");
        setDeleteItems([mockFolders[0]]);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        message.success(
            `${
                deleteType === "file" ? "File" : "Thư mục"
            } đã được xóa thành công!`
        );
        setIsDeleteModalVisible(false);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
    };

    const renderDeleteModal = () => (
        <Modal
            title={
                <Space>
                    <DeleteOutlined
                        style={{ color: "#ff4d4f", fontSize: "18px" }}
                    />
                    <span>Xác nhận xóa</span>
                </Space>
            }
            open={isDeleteModalVisible}
            onCancel={handleCancelDelete}
            footer={[
                <Button key="cancel" onClick={handleCancelDelete}>
                    Hủy
                </Button>,
                <Button
                    key="confirm"
                    type="primary"
                    danger
                    onClick={handleConfirmDelete}
                >
                    Xóa
                </Button>,
            ]}
            width={400}
        >
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <Text strong>
                        Bạn sắp xóa {deleteType === "file" ? "file" : "thư mục"}
                        : {deleteItems[0]?.name}
                    </Text>
                </div>

                <div style={{ marginLeft: "0px" }}>
                    <Text type="secondary">
                        {deleteType === "file"
                            ? `Kích thước: ${deleteItems[0]?.size}`
                            : `Thư mục chứa ${deleteItems[0]?.items} tệp tin, 3 thư mục con`}
                    </Text>
                </div>

                <div
                    style={{
                        backgroundColor: "#fff1f0",
                        border: "1px solid #ffa39e",
                        borderRadius: "6px",
                        padding: "12px",
                        marginLeft: "0px",
                    }}
                >
                    <Space>
                        <ExclamationCircleOutlined
                            style={{ color: "#ff4d4f" }}
                        />
                        <Text style={{ color: "#a8071a", fontSize: "13px" }}>
                            {deleteType === "file"
                                ? "Tệp này sẽ bị xóa vĩnh viễn và không thể khôi phục."
                                : "Thư mục này và tất cả nội dung bên trong sẽ bị xóa vĩnh viễn."}
                        </Text>
                    </Space>
                </div>
            </Space>
        </Modal>
    );

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Card>
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                >
                    <div style={{ textAlign: "center" }}>
                        <Title level={2}>Thông báo khi xóa file, thư mục</Title>
                        <Text type="secondary">
                            Demo các loại thông báo khi xóa file hoặc thư mục
                        </Text>
                    </div>

                    <Divider />

                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            type="primary"
                            size="large"
                            icon={<DeleteOutlined />}
                            onClick={handleDeleteFile}
                        >
                            Xóa File
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            icon={<DeleteOutlined />}
                            onClick={handleDeleteFolder}
                        >
                            Xóa Thư mục
                        </Button>
                    </div>

                    <Divider />
                </Space>
            </Card>

            {renderDeleteModal()}
        </div>
    );
}

export default DeleteNotificationPage;
