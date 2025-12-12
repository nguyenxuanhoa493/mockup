import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Space, Alert, Typography, Row, Col, Progress, Modal } from "antd";
import {
    CameraOutlined,
    AudioOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
    PlayCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import camGuideImg from "../assets/cam.png";
import micGuideImg from "../assets/mic.png";

const { Title, Text } = Typography;

const QuizPreparationPage = () => {
    const [cameraStatus, setCameraStatus] = useState("checking");
    const [microphoneStatus, setMicrophoneStatus] = useState("checking");
    const [cameraStream, setCameraStream] = useState(null);
    const [isTestingCamera, setIsTestingCamera] = useState(false);
    const [isTestingMicrophone, setIsTestingMicrophone] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [modalConfig, setModalConfig] = useState({ visible: false, title: "", content: "" });
    
    const videoRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationRef = useRef(null);

    const showModal = (title, content) => {
        setModalConfig({ visible: true, title, content });
    };

    const closeModal = () => {
        setModalConfig({ visible: false, title: "", content: "" });
    };

    useEffect(() => {
        checkPermissions();
        return () => {
            stopAllStreams();
            stopAudioAnalysis();
        };
    }, []);

    const checkPermissions = async () => {
        await checkCameraPermission();
        await checkMicrophonePermission();
    };

    const checkCameraPermission = async () => {
        try {
            setCameraStatus("checking");
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStatus("granted");
            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                setCameraStatus("denied");
                showModal(
                    "Quyền camera bị từ chối",
                    "Vui lòng vào cài đặt trình duyệt để cấp quyền camera cho trang web này. Nhấn vào biểu tượng khóa/camera trên thanh địa chỉ và chọn 'Cho phép'."
                );
            } else if (error.name === "NotFoundError") {
                setCameraStatus("not-found");
                showModal(
                    "Không tìm thấy camera",
                    "Vui lòng kiểm tra kết nối camera của bạn và thử lại."
                );
            } else {
                setCameraStatus("error");
                showModal(
                    "Lỗi khi truy cập camera",
                    error.message
                );
            }
        }
    };

    const checkMicrophonePermission = async () => {
        try {
            setMicrophoneStatus("checking");
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMicrophoneStatus("granted");
            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                setMicrophoneStatus("denied");
                showModal(
                    "Quyền microphone bị từ chối",
                    "Vui lòng vào cài đặt trình duyệt để cấp quyền microphone cho trang web này. Nhấn vào biểu tượng khóa/microphone trên thanh địa chỉ và chọn 'Cho phép'."
                );
            } else if (error.name === "NotFoundError") {
                setMicrophoneStatus("not-found");
                showModal(
                    "Không tìm thấy microphone",
                    "Vui lòng kiểm tra kết nối microphone của bạn và thử lại."
                );
            } else {
                setMicrophoneStatus("error");
                showModal(
                    "Lỗi khi truy cập microphone",
                    error.message
                );
            }
        }
    };

    const testCamera = async () => {
        if (isTestingCamera) {
            stopCamera();
            return;
        }

        try {
            setIsTestingCamera(true);
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 640, height: 480 } 
            });
            setCameraStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            setCameraStatus("error");
            setIsTestingCamera(false);
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsTestingCamera(false);
    };

    const testMicrophone = async () => {
        if (isTestingMicrophone) {
            stopMicrophone();
            return;
        }

        try {
            setIsTestingMicrophone(true);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const microphone = audioContextRef.current.createMediaStreamSource(stream);
            
            analyserRef.current.smoothingTimeConstant = 0.8;
            analyserRef.current.fftSize = 1024;
            
            microphone.connect(analyserRef.current);
            
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            
            const updateAudioLevel = () => {
                analyserRef.current.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                setAudioLevel(Math.min(100, (average / 128) * 100));
                animationRef.current = requestAnimationFrame(updateAudioLevel);
            };
            
            updateAudioLevel();
            
            setTimeout(() => {
                stream.getTracks().forEach(track => track.stop());
            }, 100000);
            
        } catch (error) {
            console.error("Error accessing microphone:", error);
            setMicrophoneStatus("error");
            setIsTestingMicrophone(false);
        }
    };

    const stopMicrophone = () => {
        stopAudioAnalysis();
        setIsTestingMicrophone(false);
        setAudioLevel(0);
    };

    const stopAudioAnalysis = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
    };

    const stopAllStreams = () => {
        stopCamera();
        stopMicrophone();
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "checking":
                return <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} />;
            case "granted":
                return <CheckCircleOutlined style={{ fontSize: 24, color: "#52c41a" }} />;
            case "denied":
            case "not-found":
            case "error":
                return <CloseCircleOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />;
            default:
                return <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} />;
        }
    };

    const getStatusText = (status, deviceType) => {
        switch (status) {
            case "checking":
                return `Đang kiểm tra ${deviceType}...`;
            case "granted":
                return `${deviceType} đã được cấp quyền`;
            case "denied":
                return `Bạn đã từ chối quyền truy cập ${deviceType}. Vui lòng cấp quyền trong cài đặt trình duyệt.`;
            case "not-found":
                return `Không tìm thấy ${deviceType}. Vui lòng kiểm tra kết nối thiết bị.`;
            case "error":
                return `Lỗi khi kiểm tra ${deviceType}. Vui lòng thử lại.`;
            default:
                return `Đang kiểm tra ${deviceType}...`;
        }
    };

    const canStartQuiz = cameraStatus === "granted" && microphoneStatus === "granted";

    return (
        <div style={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
            <Title level={3} style={{ marginBottom: 16 }}>
                Chuẩn bị vào thi
            </Title>

            {!canStartQuiz && (
                <Alert
                    message="Vui lòng cấp quyền truy cập camera và microphone"
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Space>
                                <CameraOutlined />
                                <span>Camera</span>
                            </Space>
                        }
                        extra={getStatusIcon(cameraStatus)}
                        size="small"
                    >
                        <Space direction="vertical" style={{ width: "100%" }} size="middle">
                            <Text type={cameraStatus === "granted" ? "success" : "danger"}>
                                {cameraStatus === "granted" ? "Đã cấp quyền" : "Chưa cấp quyền"}
                            </Text>
                            
                            <div 
                                style={{ 
                                    width: "100%", 
                                    height: "200px", 
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                }}
                            >
                                {isTestingCamera ? (
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        style={{ 
                                            width: "100%", 
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : cameraStatus !== "granted" ? (
                                    <img 
                                        src={camGuideImg} 
                                        alt="Hướng dẫn cấp quyền camera" 
                                        style={{ 
                                            width: "100%", 
                                            height: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : (
                                    <CameraOutlined style={{ fontSize: 36, color: "#d9d9d9" }} />
                                )}
                            </div>

                            <Space>
                                {cameraStatus === "granted" ? (
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={testCamera}
                                        icon={isTestingCamera ? <CloseCircleOutlined /> : <PlayCircleOutlined />}
                                    >
                                        {isTestingCamera ? "Dừng" : "Test"}
                                    </Button>
                                ) : (
                                    <Button 
                                        type="primary" 
                                        size="small" 
                                        onClick={checkCameraPermission}
                                        loading={cameraStatus === "checking"}
                                    >
                                        Cấp quyền
                                    </Button>
                                )}
                            </Space>
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Space>
                                <AudioOutlined />
                                <span>Microphone</span>
                            </Space>
                        }
                        extra={getStatusIcon(microphoneStatus)}
                        size="small"
                    >
                        <Space direction="vertical" style={{ width: "100%" }} size="middle">
                            <Text type={microphoneStatus === "granted" ? "success" : "danger"}>
                                {microphoneStatus === "granted" ? "Đã cấp quyền" : "Chưa cấp quyền"}
                            </Text>
                            
                            <div 
                                style={{ 
                                    width: "100%", 
                                    height: "200px", 
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "4px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "16px",
                                }}
                            >
                                {microphoneStatus !== "granted" && !isTestingMicrophone ? (
                                    <img 
                                        src={micGuideImg} 
                                        alt="Hướng dẫn cấp quyền microphone" 
                                        style={{ 
                                            width: "100%", 
                                            height: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : (
                                    <>
                                        <AudioOutlined 
                                            style={{ 
                                                fontSize: 36, 
                                                color: isTestingMicrophone && audioLevel > 10 ? "#52c41a" : "#d9d9d9",
                                                marginBottom: 16,
                                            }} 
                                        />
                                        {isTestingMicrophone && (
                                            <>
                                                <Text style={{ marginBottom: 8, fontSize: 12 }}>
                                                    Hãy nói gì đó
                                                </Text>
                                                <Progress
                                                    percent={Math.round(audioLevel)}
                                                    strokeColor={{
                                                        "0%": "#108ee9",
                                                        "100%": "#87d068",
                                                    }}
                                                    status="active"
                                                    style={{ width: "80%" }}
                                                    size="small"
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            <Space>
                                {microphoneStatus === "granted" ? (
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={testMicrophone}
                                        icon={isTestingMicrophone ? <CloseCircleOutlined /> : <PlayCircleOutlined />}
                                    >
                                        {isTestingMicrophone ? "Dừng" : "Test"}
                                    </Button>
                                ) : (
                                    <Button 
                                        type="primary" 
                                        size="small" 
                                        onClick={checkMicrophonePermission}
                                        loading={microphoneStatus === "checking"}
                                    >
                                        Cấp quyền
                                    </Button>
                                )}
                            </Space>
                        </Space>
                    </Card>
                </Col>
            </Row>

            <Card size="small" style={{ marginTop: 16 }}>
                <Space direction="vertical" style={{ width: "100%" }} size="small">
                    <Text strong>Lưu ý:</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        • Đảm bảo camera/mic hoạt động tốt • Môi trường yên tĩnh, đủ ánh sáng • Không tắt/chuyển tab
                    </Text>
                    
                    <div style={{ textAlign: "center", marginTop: 8 }}>
                        <Button
                            type="primary"
                            disabled={!canStartQuiz}
                            onClick={() => {
                                stopAllStreams();
                                showModal("Thành công", "Bắt đầu làm bài thi!");
                            }}
                        >
                            Bắt đầu làm bài
                        </Button>
                    </div>
                </Space>
            </Card>

            <Modal
                title={
                    <Space>
                        <ExclamationCircleOutlined style={{ color: "#faad14" }} />
                        {modalConfig.title}
                    </Space>
                }
                open={modalConfig.visible}
                onOk={closeModal}
                onCancel={closeModal}
                cancelButtonProps={{ style: { display: "none" } }}
                okText="Đã hiểu"
            >
                <p>{modalConfig.content}</p>
            </Modal>
        </div>
    );
};

export default QuizPreparationPage;
