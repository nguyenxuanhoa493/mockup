import React, { useState } from "react";
import {
    Card,
    Tabs,
    Table,
    Button,
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
    Modal,
    Tag,
    Progress,
    Space,
    Statistic,
    Row,
    Col,
    Descriptions,
    Badge,
    message,
    Divider,
} from "antd";
import {
    DollarOutlined,
    UserOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    SettingOutlined,
    TrophyOutlined,
    RiseOutlined,
    FallOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    BarChartOutlined,
    TeamOutlined,
    CalendarOutlined,
    FolderOpenOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

// Mock data - Chỉ tiêu định lượng (60 điểm)
const mockKPIData = [
    {
        key: "1",
        code: "1.1",
        targetName: "Tăng trưởng nguồn vốn",
        unit: "triệu đồng",
        planned: 5000,
        actual: 4800,
        score: 15,
        achievement: 96,
        isParent: false,
    },
    {
        key: "2",
        code: "1.2",
        targetName: "Dịch vụ",
        unit: "",
        planned: 0,
        actual: 0,
        score: 40,
        achievement: 0,
        isParent: true,
    },
    {
        key: "2.1",
        code: "1.2.1",
        targetName: "Doanh thu phí DV (TTQT, KDNH, Bảo hiểm, POS, Thẻ, NHĐT, DV khác...)",
        unit: "triệu đồng",
        planned: 50,
        actual: 48,
        score: 20,
        achievement: 96,
        isParent: false,
        indent: 1,
    },
    {
        key: "2.2",
        code: "1.2.2",
        targetName: "Thẻ",
        unit: "",
        planned: 0,
        actual: 0,
        score: 10,
        achievement: 0,
        isParent: true,
        indent: 1,
    },
    {
        key: "2.2.1",
        code: "1.2.2.1",
        targetName: "Số lượng thẻ",
        unit: "cái",
        planned: 100,
        actual: 95,
        score: 2,
        achievement: 95,
        isParent: false,
        indent: 2,
    },
    {
        key: "2.2.2",
        code: "1.2.2.2",
        targetName: "Số lượng POS / Đơn vị thanh toán QR code",
        unit: "máy/đơn vị",
        planned: 20,
        actual: 22,
        score: 4,
        achievement: 110,
        isParent: false,
        indent: 2,
    },
    {
        key: "2.2.3",
        code: "1.2.2.3",
        targetName: "Thu từ dịch vụ thẻ",
        unit: "triệu đồng",
        planned: 10,
        actual: 11,
        score: 4,
        achievement: 110,
        isParent: false,
        indent: 2,
    },
    {
        key: "2.3",
        code: "1.2.3",
        targetName: "E-Banking",
        unit: "",
        planned: 0,
        actual: 0,
        score: 10,
        achievement: 0,
        isParent: true,
        indent: 1,
    },
    {
        key: "2.3.1",
        code: "1.2.3.1",
        targetName: "Số lượng đăng ký E-Banking",
        unit: "khách hàng",
        planned: 50,
        actual: 55,
        score: 5,
        achievement: 110,
        isParent: false,
        indent: 2,
    },
    {
        key: "2.3.2",
        code: "1.2.3.2",
        targetName: "Thu từ dịch vụ E-Banking",
        unit: "triệu đồng",
        planned: 5,
        actual: 5.5,
        score: 5,
        achievement: 110,
        isParent: false,
        indent: 2,
    },
    {
        key: "3",
        code: "1.3",
        targetName: "Phát triển khách hàng mới",
        unit: "khách hàng",
        planned: 30,
        actual: 28,
        score: 5,
        achievement: 93,
        isParent: false,
    },
];

const mockRegistrations = [
    {
        key: "1",
        formType: "Mẫu 01",
        customerName: "Nguyễn Văn A",
        transactionType: "Gửi mới (KH mới)",
        amount: 1000000000,
        registeredDate: "2024-12-20",
        status: "approved",
    },
    {
        key: "2",
        formType: "Mẫu 02",
        customerName: "Trần Thị B",
        transactionType: "Mở tài khoản",
        amount: 500000000,
        registeredDate: "2024-12-22",
        status: "pending",
    },
];

// Mock data - Task Assignments (Quản lý giao việc)
const mockTasks = [
    {
        key: "1",
        taskName: "Khảo sát nhu cầu khách hàng doanh nghiệp",
        assignee: "Nguyễn Văn A",
        priority: "high",
        deadline: "2024-12-30",
        status: "in_progress",
        progress: 60,
        description: "Khảo sát 20 doanh nghiệp trong khu công nghiệp về nhu cầu vay vốn và dịch vụ ngân hàng",
    },
    {
        key: "2",
        taskName: "Tổ chức workshop sản phẩm mới",
        assignee: "Trần Thị B",
        priority: "medium",
        deadline: "2025-01-05",
        status: "pending",
        progress: 0,
        description: "Tổ chức buổi giới thiệu sản phẩm E-Banking cho khách hàng cá nhân",
    },
    {
        key: "3",
        taskName: "Báo cáo kết quả kinh doanh Q4",
        assignee: "Lê Văn C",
        priority: "high",
        deadline: "2024-12-28",
        status: "completed",
        progress: 100,
        description: "Tổng hợp và báo cáo kết quả kinh doanh quý 4/2024",
    },
    {
        key: "4",
        taskName: "Đào tạo nhân viên mới",
        assignee: "Phạm Thị D",
        priority: "low",
        deadline: "2025-01-10",
        status: "pending",
        progress: 0,
        description: "Đào tạo quy trình làm việc cho 2 nhân viên mới",
    },
];

// Mock data - Department Targets (Chỉ tiêu đơn vị)
const mockDepartmentTargets = [
    {
        key: "1",
        quarter: "Q4/2024",
        department: "P. Khách hàng",
        capitalTarget: 50000,
        loanTarget: 80000,
        serviceTarget: 150,
        cardTarget: 100,
        ebankingTarget: 80,
        newCustomerTarget: 50,
        status: "active",
    },
    {
        key: "2",
        quarter: "Q4/2024",
        department: "P. KH&QLRR",
        capitalTarget: 40000,
        loanTarget: 60000,
        serviceTarget: 120,
        cardTarget: 80,
        ebankingTarget: 60,
        newCustomerTarget: 40,
        status: "active",
    },
    {
        key: "3",
        quarter: "Q4/2024",
        department: "P. Kế toán",
        capitalTarget: 35000,
        loanTarget: 50000,
        serviceTarget: 100,
        cardTarget: 60,
        ebankingTarget: 50,
        newCustomerTarget: 30,
        status: "active",
    },
    {
        key: "4",
        quarter: "Q4/2024",
        department: "P. Tổng hợp",
        capitalTarget: 30000,
        loanTarget: 45000,
        serviceTarget: 80,
        cardTarget: 50,
        ebankingTarget: 40,
        newCustomerTarget: 25,
        status: "active",
    },
];

// Mock data - Employee Targets (Chỉ tiêu nhân viên)
const mockEmployeeTargets = [
    {
        key: "1",
        quarter: "Q4/2024",
        employeeCode: "NV001",
        employeeName: "Nguyễn Văn A",
        department: "P. Khách hàng",
        position: "Giao dịch viên",
        capitalTarget: 5000,
        loanTarget: 8000,
        serviceTarget: 15,
        cardTarget: 10,
        ebankingTarget: 8,
        newCustomerTarget: 5,
        status: "assigned",
    },
    {
        key: "2",
        quarter: "Q4/2024",
        employeeCode: "NV002",
        employeeName: "Trần Thị B",
        department: "P. KH&QLRR",
        position: "Chuyên viên KHDN",
        capitalTarget: 6000,
        loanTarget: 10000,
        serviceTarget: 20,
        cardTarget: 15,
        ebankingTarget: 12,
        newCustomerTarget: 8,
        status: "assigned",
    },
    {
        key: "3",
        quarter: "Q4/2024",
        employeeCode: "NV003",
        employeeName: "Lê Văn C",
        department: "P. Kế toán",
        position: "Kế toán viên",
        capitalTarget: 4500,
        loanTarget: 7000,
        serviceTarget: 12,
        cardTarget: 8,
        ebankingTarget: 6,
        newCustomerTarget: 4,
        status: "assigned",
    },
    {
        key: "4",
        quarter: "Q4/2024",
        employeeCode: "NV004",
        employeeName: "Phạm Thị D",
        department: "P. Tổng hợp",
        position: "Chuyên viên",
        capitalTarget: 4000,
        loanTarget: 6000,
        serviceTarget: 10,
        cardTarget: 6,
        ebankingTarget: 5,
        newCustomerTarget: 3,
        status: "assigned",
    },
    {
        key: "5",
        quarter: "Q4/2024",
        employeeCode: "NV005",
        employeeName: "Hoàng Văn E",
        department: "P. Khách hàng",
        position: "Phó phòng",
        capitalTarget: 7000,
        loanTarget: 12000,
        serviceTarget: 25,
        cardTarget: 20,
        ebankingTarget: 15,
        newCustomerTarget: 10,
        status: "assigned",
    },
];

// Mock data - Salary Calculation Report (Báo cáo tính toán chỉ số lương v2)
const mockSalaryCalculation = [
    {
        key: "1",
        employeeCode: "NV001",
        employeeName: "Nguyễn Văn A",
        position: "Giao dịch viên",
        department: "P. Khách hàng",
        quantitativeScore: 58.0,
        qualitativeScore: 17.5,
        complianceScore: 18.5,
        totalScore: 94.0,
        performanceFactor: 0.94,
        baseCoefficient: 3.2,
        adjustmentCoefficient: 0.15,
        attractionCoefficient: 0.20,
        finalCoefficient: 3.55,
        coefficientValue: 5000000,
        estimatedSalary: 17750000,
    },
    {
        key: "2",
        employeeCode: "NV002",
        employeeName: "Trần Thị B",
        position: "Chuyên viên KHDN",
        department: "P. KH&QLRR",
        quantitativeScore: 55.2,
        qualitativeScore: 16.8,
        complianceScore: 18.2,
        totalScore: 90.2,
        performanceFactor: 0.90,
        baseCoefficient: 3.5,
        adjustmentCoefficient: 0.12,
        attractionCoefficient: 0.18,
        finalCoefficient: 3.80,
        coefficientValue: 5000000,
        estimatedSalary: 19000000,
    },
    {
        key: "3",
        employeeCode: "NV003",
        employeeName: "Lê Văn C",
        position: "Kế toán viên",
        department: "P. Kế toán",
        quantitativeScore: 56.8,
        qualitativeScore: 18.0,
        complianceScore: 18.8,
        totalScore: 93.6,
        performanceFactor: 0.94,
        baseCoefficient: 3.3,
        adjustmentCoefficient: 0.14,
        attractionCoefficient: 0.19,
        finalCoefficient: 3.63,
        coefficientValue: 5000000,
        estimatedSalary: 18150000,
    },
    {
        key: "4",
        employeeCode: "NV004",
        employeeName: "Phạm Thị D",
        position: "Chuyên viên",
        department: "P. Tổng hợp",
        quantitativeScore: 52.5,
        qualitativeScore: 16.0,
        complianceScore: 17.5,
        totalScore: 86.0,
        performanceFactor: 0.86,
        baseCoefficient: 3.0,
        adjustmentCoefficient: 0.10,
        attractionCoefficient: 0.15,
        finalCoefficient: 3.25,
        coefficientValue: 5000000,
        estimatedSalary: 16250000,
    },
    {
        key: "5",
        employeeCode: "NV005",
        employeeName: "Hoàng Văn E",
        position: "Phó phòng",
        department: "P. Khách hàng",
        quantitativeScore: 59.5,
        qualitativeScore: 18.8,
        complianceScore: 19.2,
        totalScore: 97.5,
        performanceFactor: 0.98,
        baseCoefficient: 4.0,
        adjustmentCoefficient: 0.18,
        attractionCoefficient: 0.22,
        finalCoefficient: 4.40,
        coefficientValue: 5000000,
        estimatedSalary: 22000000,
    },
];

// Mock data - Department Statistics Report (Báo cáo thống kê theo phòng)
const mockDepartmentReport = [
    {
        key: "1",
        stt: "I",
        criteria: "Chỉ tiêu định lượng",
        pKhachHang: null,
        pKHQLRR: null,
        pKeToan: null,
        pTongHop: null,
        isCategory: true,
    },
    {
        key: "1.1",
        stt: "1",
        criteria: "Nguồn vốn",
        pKhachHang: 15.2,
        pKHQLRR: 14.8,
        pKeToan: 13.5,
        pTongHop: 12.0,
        isCategory: false,
    },
    {
        key: "1.2",
        stt: "2",
        criteria: "Dư nợ",
        pKhachHang: 18.5,
        pKHQLRR: 17.2,
        pKeToan: 16.8,
        pTongHop: 15.5,
        isCategory: false,
    },
    {
        key: "1.3",
        stt: "3",
        criteria: "Không phát sinh nợ xấu",
        pKhachHang: 5.0,
        pKHQLRR: 5.0,
        pKeToan: 5.0,
        pTongHop: 5.0,
        isCategory: false,
    },
    {
        key: "1.4",
        stt: "4",
        criteria: "Thu nợ xấu, XLRR, nợ bán VAMC",
        pKhachHang: 3.2,
        pKHQLRR: 3.5,
        pKeToan: 3.8,
        pTongHop: 3.0,
        isCategory: false,
    },
    {
        key: "1.5",
        stt: "5",
        criteria: "Thu lãi vay đúng theo quy định/thỏa thuận",
        pKhachHang: 4.5,
        pKHQLRR: 4.8,
        pKeToan: 4.2,
        pTongHop: 4.0,
        isCategory: false,
    },
    {
        key: "1.6",
        stt: "6",
        criteria: "Dịch vụ",
        pKhachHang: 8.2,
        pKHQLRR: 7.8,
        pKeToan: 8.5,
        pTongHop: 7.5,
        isCategory: false,
    },
    {
        key: "1.7",
        stt: "7",
        criteria: "Điểm số bút toán",
        pKhachHang: 4.8,
        pKHQLRR: 4.5,
        pKeToan: 5.0,
        pTongHop: 4.2,
        isCategory: false,
    },
    {
        key: "2",
        stt: "II",
        criteria: "Chỉ tiêu định tính",
        pKhachHang: null,
        pKHQLRR: null,
        pKeToan: null,
        pTongHop: null,
        isCategory: true,
    },
    {
        key: "2.1",
        stt: "1",
        criteria: "Phong cách giao dịch/giao tiếp/Thái độ làm việc",
        pKhachHang: 4.5,
        pKHQLRR: 4.2,
        pKeToan: 4.8,
        pTongHop: 4.0,
        isCategory: false,
    },
    {
        key: "2.2",
        stt: "2",
        criteria: "Năng lực thực hiện chuyên môn",
        pKhachHang: 8.5,
        pKHQLRR: 8.2,
        pKeToan: 8.8,
        pTongHop: 8.0,
        isCategory: false,
    },
    {
        key: "2.3",
        stt: "3",
        criteria: "Học tập nâng cao trình độ",
        pKhachHang: 4.2,
        pKHQLRR: 4.5,
        pKeToan: 4.0,
        pTongHop: 3.8,
        isCategory: false,
    },
    {
        key: "2.4",
        stt: "4",
        criteria: "Chỉ tiêu định tính khác",
        pKhachHang: 3.8,
        pKHQLRR: 4.0,
        pKeToan: 3.5,
        pTongHop: 3.2,
        isCategory: false,
    },
    {
        key: "3",
        stt: "III",
        criteria: "Chấp hành NQLĐ & văn hóa Agribank",
        pKhachHang: 18.5,
        pKHQLRR: 18.2,
        pKeToan: 18.8,
        pTongHop: 17.5,
        isCategory: false,
    },
];

// Mock data - Chỉ tiêu định tính (20 điểm) - Trưởng phòng đánh giá
const mockQualitativeCriteria = [
    {
        key: "1",
        code: "2.1",
        criteria: "Phong cách phục vụ khách hàng (Hướng dẫn, tư vấn tận tình chu đáo, chính xác và hiệu quả; không để khách phàn nàn, phản ánh phong cách phục vụ)",
        maxScore: 5,
        managerScore: 4.5,
        isParent: false,
    },
    {
        key: "2",
        code: "2.2",
        criteria: "Năng lực thực hiện nhiệm vụ chuyên môn",
        maxScore: 5,
        managerScore: 0,
        isParent: true,
    },
    {
        key: "2.1",
        code: "2.2.1",
        criteria: "Đăng ký chương trình công tác cụ thể hàng tháng, thực hiện tốt chương trình công tác về thời gian và hiệu quả công tác. Hoàn thành tốt các nhiệm vụ được giao, thực hiện nghiệp vụ chuyên môn theo đúng nguyên tắc, chế độ, thể lệ",
        maxScore: 1,
        managerScore: 0.8,
        isParent: false,
        indent: 1,
    },
    {
        key: "2.2",
        code: "2.2.2",
        criteria: "Mở TK mới, NHĐT (E-Mobile, Internet Banking..)",
        maxScore: 2,
        managerScore: 1.8,
        isParent: false,
        indent: 1,
    },
    {
        key: "2.3",
        code: "2.2.3",
        criteria: "Thanh toán quốc tế: Thực hiện các nghiệp vụ giao dịch hối đoái, dịch vụ kiều hối, xử lý hạch toán các nghiệp vụ thanh toán quốc tế trực tiếp và kinh doanh ngoại tệ theo quy định",
        maxScore: 2,
        managerScore: 1.9,
        isParent: false,
        indent: 1,
    },
    {
        key: "3",
        code: "2.3",
        criteria: "Học tập nâng cao trình độ (Nghiên cứu, cập nhật kịp thời các văn bản, chế độ về công tác Dịch vụ và các văn bản chế độ có liên quan đến mặt nghiệp vụ do mình phụ trách)",
        maxScore: 5,
        managerScore: 4.2,
        isParent: false,
    },
    {
        key: "4",
        code: "2.4",
        criteria: "Chỉ tiêu định tính khác",
        maxScore: 5,
        managerScore: 0,
        isParent: true,
    },
    {
        key: "4.1",
        code: "2.4.1",
        criteria: "Có tinh thần phối hợp công tác với bộ phận khác, hỗ trợ đồng nghiệp hoàn thành nhiệm vụ",
        maxScore: 3,
        managerScore: 2.8,
        isParent: false,
        indent: 1,
    },
    {
        key: "4.2",
        code: "2.4.2",
        criteria: "Hoàn thành các báo cáo có chất lượng, đúng thời gian quy định",
        maxScore: 1,
        managerScore: 0.9,
        isParent: false,
        indent: 1,
    },
    {
        key: "4.3",
        code: "2.4.3",
        criteria: "Sắp xếp, lưu trữ, bảo quản hồ sơ ngăn nắp, khoa học",
        maxScore: 1,
        managerScore: 0.8,
        isParent: false,
        indent: 1,
    },
];

const SalaryV2Page = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [registrationModalVisible, setRegistrationModalVisible] = useState(false);
    const [configModalVisible, setConfigModalVisible] = useState(false);
    const [qualitativeScores, setQualitativeScores] = useState(mockQualitativeCriteria);
    const [form] = Form.useForm();
    
    // KPI Update Modal states
    const [kpiUpdateModalVisible, setKpiUpdateModalVisible] = useState(false);
    const [kpiDetailModalVisible, setKpiDetailModalVisible] = useState(false);
    const [selectedKPI, setSelectedKPI] = useState(null);
    const [kpiUpdateForm] = Form.useForm();
    
    // Task Management states
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskForm] = Form.useForm();
    const [tasks, setTasks] = useState(mockTasks);
    
    // Report Management states
    const [selectedPeriod, setSelectedPeriod] = useState("Quý 4/2024");
    const [reportData] = useState(mockDepartmentReport);
    const [salaryCalculationData] = useState(mockSalaryCalculation);
    
    // Contract Management states
    const [contractTab, setContractTab] = useState("department");
    const [departmentTargets, setDepartmentTargets] = useState(mockDepartmentTargets);
    const [employeeTargets, setEmployeeTargets] = useState(mockEmployeeTargets);
    const [targetModalVisible, setTargetModalVisible] = useState(false);
    const [selectedTarget, setSelectedTarget] = useState(null);
    const [targetForm] = Form.useForm();
    
    // Mock KPI History Data
    const [kpiHistory, setKpiHistory] = useState({
        "1": [ // Tăng trưởng nguồn vốn
            {
                id: "1",
                date: "2024-12-20T08:30:00Z",
                amount: 500,
                notes: "Khách hàng Công ty TNHH ABC mở tài khoản tiết kiệm 500 triệu",
                createdBy: "Nguyễn Văn A",
            },
            {
                id: "2",
                date: "2024-12-21T10:15:00Z",
                amount: 1000,
                notes: "Khách hàng Nguyễn Thị B gửi tiết kiệm kỳ hạn 12 tháng",
                createdBy: "Nguyễn Văn A",
            },
            {
                id: "3",
                date: "2024-12-22T14:20:00Z",
                amount: 800,
                notes: "Khách hàng doanh nghiệp XYZ gửi tiền thanh toán",
                createdBy: "Nguyễn Văn A",
            },
        ],
        "2.2.1": [ // Số lượng thẻ
            {
                id: "1",
                date: "2024-12-19T09:00:00Z",
                amount: 5,
                notes: "Phát hành 5 thẻ ATM cho sinh viên",
                createdBy: "Nguyễn Văn A",
            },
            {
                id: "2",
                date: "2024-12-20T11:30:00Z",
                amount: 3,
                notes: "Phát hành 3 thẻ tín dụng cho khách hàng cá nhân",
                createdBy: "Nguyễn Văn A",
            },
        ],
        "2.3.1": [ // Số lượng đăng ký E-Banking
            {
                id: "1",
                date: "2024-12-18T08:00:00Z",
                amount: 10,
                notes: "Đăng ký E-Banking cho 10 khách hàng doanh nghiệp",
                createdBy: "Nguyễn Văn A",
            },
            {
                id: "2",
                date: "2024-12-21T15:45:00Z",
                amount: 8,
                notes: "Hướng dẫn và kích hoạt Mobile Banking cho 8 khách hàng cá nhân",
                createdBy: "Nguyễn Văn A",
            },
        ],
    });

    // Dashboard Stats
    const quantitativeScore = 58;
    const qualitativeScore = qualitativeScores
        .filter((item) => !item.isParent)
        .reduce((sum, item) => sum + (item.managerScore || 0), 0);
    const complianceScore = 18.5; // Chấp hành nội quy lao động (20 điểm max)
    const totalScore = quantitativeScore + qualitativeScore + complianceScore;
    const performanceFactor = (totalScore / 100).toFixed(2);

    // KPI Table Columns
    const kpiColumns = [
        {
            title: "STT",
            dataIndex: "code",
            key: "code",
            width: 80,
            render: (text, record) => (
                <span style={{ paddingLeft: (record.indent || 0) * 20 }}>
                    {text}
                </span>
            ),
        },
        {
            title: "Chỉ tiêu",
            dataIndex: "targetName",
            key: "targetName",
            render: (text, record) => (
                <span 
                    style={{ 
                        paddingLeft: (record.indent || 0) * 20,
                        fontWeight: record.isParent ? "bold" : "normal"
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Đơn vị",
            dataIndex: "unit",
            key: "unit",
            width: 120,
            align: "center",
        },
        {
            title: "KH giao",
            dataIndex: "planned",
            key: "planned",
            width: 100,
            align: "right",
            render: (val, record) => 
                record.isParent ? "" : val ? val.toLocaleString() : "0",
        },
        {
            title: "TH trong quý",
            dataIndex: "actual",
            key: "actual",
            width: 120,
            align: "right",
            render: (val, record) => {
                if (record.isParent) return "";
                const totalFromHistory = (kpiHistory[record.key] || [])
                    .reduce((sum, item) => sum + item.amount, 0);
                return (
                    <span style={{ fontWeight: "bold", color: "#1677ff" }}>
                        {totalFromHistory > 0 ? totalFromHistory.toLocaleString() : val.toLocaleString()}
                    </span>
                );
            },
        },
        {
            title: "% KH",
            dataIndex: "achievement",
            key: "achievement",
            width: 100,
            align: "center",
            render: (val, record) => {
                if (record.isParent || val === 0) return "";
                return (
                    <Space>
                        {val >= 100 ? (
                            <RiseOutlined style={{ color: "#52c41a" }} />
                        ) : (
                            <FallOutlined style={{ color: "#ff4d4f" }} />
                        )}
                        <span
                            style={{
                                color: val >= 100 ? "#52c41a" : "#ff4d4f",
                                fontWeight: "bold",
                            }}
                        >
                            {val}%
                        </span>
                    </Space>
                );
            },
        },
        {
            title: "Điểm chuẩn",
            dataIndex: "score",
            key: "score",
            width: 100,
            align: "center",
            render: (val, record) => (
                <span style={{ fontWeight: record.isParent ? "bold" : "normal" }}>
                    {val}
                </span>
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            width: 180,
            align: "center",
            render: (_, record) => {
                if (record.isParent) return null;
                const historyCount = kpiHistory[record.key]?.length || 0;
                return (
                    <Space size="small">
                        <Button
                            type="primary"
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={() => handleOpenKPIUpdate(record)}
                        >
                            Cập nhật
                        </Button>
                        <Button
                            size="small"
                            icon={<EyeOutlined />}
                            onClick={() => handleOpenKPIDetail(record)}
                            disabled={historyCount === 0}
                        >
                            Chi tiết ({historyCount})
                        </Button>
                    </Space>
                );
            },
        },
    ];

    // Registration Form Columns
    const registrationColumns = [
        {
            title: "Loại phiếu",
            dataIndex: "formType",
            key: "formType",
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: "Khách hàng",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Loại GD",
            dataIndex: "transactionType",
            key: "transactionType",
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount",
            render: (val) => `${val.toLocaleString()} VNĐ`,
        },
        {
            title: "Ngày đăng ký",
            dataIndex: "registeredDate",
            key: "registeredDate",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const statusConfig = {
                    approved: { color: "success", text: "Đã duyệt", icon: <CheckCircleOutlined /> },
                    pending: { color: "warning", text: "Chờ duyệt", icon: <ClockCircleOutlined /> },
                    rejected: { color: "error", text: "Từ chối", icon: <ClockCircleOutlined /> },
                };
                const config = statusConfig[status];
                return (
                    <Badge status={config.color} text={config.text} />
                );
            },
        },
    ];

    // Qualitative Scoring Columns (Trưởng phòng đánh giá)
    const qualitativeColumns = [
        {
            title: "STT",
            dataIndex: "code",
            key: "code",
            width: 80,
            render: (text, record) => (
                <span style={{ paddingLeft: (record.indent || 0) * 20 }}>
                    {text}
                </span>
            ),
        },
        {
            title: "Tiêu chí",
            dataIndex: "criteria",
            key: "criteria",
            render: (text, record) => (
                <span 
                    style={{ 
                        paddingLeft: (record.indent || 0) * 20,
                        fontWeight: record.isParent ? "bold" : "normal"
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Điểm tối đa",
            dataIndex: "maxScore",
            key: "maxScore",
            width: 100,
            align: "center",
            render: (val, record) => (
                <span style={{ fontWeight: record.isParent ? "bold" : "normal" }}>
                    {val}
                </span>
            ),
        },
        {
            title: "Trưởng phòng đánh giá",
            key: "managerScore",
            width: 180,
            align: "center",
            render: (_, record, index) => {
                if (record.isParent) return "";
                return (
                    <InputNumber
                        min={0}
                        max={record.maxScore}
                        step={0.1}
                        value={record.managerScore}
                        onChange={(value) => {
                            const newScores = [...qualitativeScores];
                            newScores[index].managerScore = value;
                            setQualitativeScores(newScores);
                        }}
                        style={{ width: 100 }}
                    />
                );
            },
        },
    ];

    const handleRegistrationSubmit = (values) => {
        console.log("Registration values:", values);
        message.success("Đã gửi phiếu đăng ký thành công!");
        setRegistrationModalVisible(false);
        form.resetFields();
    };

    const handleSaveScoring = () => {
        const total = qualitativeScores
            .filter((item) => !item.isParent)
            .reduce((sum, item) => sum + (item.managerScore || 0), 0);
        message.success(`Đã lưu bảng chấm điểm! Tổng điểm: ${total.toFixed(1)}`);
    };

    const handleSubmitScoring = () => {
        const total = qualitativeScores
            .filter((item) => !item.isParent)
            .reduce((sum, item) => sum + (item.managerScore || 0), 0);
        Modal.confirm({
            title: "Xác nhận gửi",
            content: `Bạn có chắc chắn muốn gửi bảng chấm điểm với tổng điểm ${total.toFixed(1)}?`,
            onOk: () => {
                message.success("Đã gửi bảng chấm điểm chờ duyệt!");
            },
        });
    };

    // KPI Update handlers
    const handleOpenKPIUpdate = (record) => {
        setSelectedKPI(record);
        kpiUpdateForm.resetFields();
        setKpiUpdateModalVisible(true);
    };

    const handleOpenKPIDetail = (record) => {
        setSelectedKPI(record);
        setKpiDetailModalVisible(true);
    };

    const handleKPIUpdateSubmit = (values) => {
        const newHistory = {
            id: Math.random().toString(),
            date: new Date().toISOString(),
            amount: values.amount,
            notes: values.notes,
            createdBy: "Nguyễn Văn A",
        };

        setKpiHistory((prev) => ({
            ...prev,
            [selectedKPI.key]: [...(prev[selectedKPI.key] || []), newHistory],
        }));

        message.success("Đã cập nhật KPI thành công!");
        setKpiUpdateModalVisible(false);
        kpiUpdateForm.resetFields();
    };

    // Task Management handlers
    const handleOpenTaskModal = (task = null) => {
        if (task) {
            setSelectedTask(task);
            taskForm.setFieldsValue(task);
        } else {
            setSelectedTask(null);
            taskForm.resetFields();
        }
        setTaskModalVisible(true);
    };

    const handleTaskSubmit = (values) => {
        if (selectedTask) {
            // Update existing task
            setTasks(tasks.map(t => t.key === selectedTask.key ? { ...t, ...values } : t));
            message.success("Đã cập nhật công việc thành công!");
        } else {
            // Add new task
            const newTask = {
                key: (tasks.length + 1).toString(),
                ...values,
                progress: 0,
                status: "pending",
            };
            setTasks([...tasks, newTask]);
            message.success("Đã thêm công việc mới thành công!");
        }
        setTaskModalVisible(false);
        taskForm.resetFields();
    };

    const handleDeleteTask = (taskKey) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa công việc này?",
            onOk: () => {
                setTasks(tasks.filter(t => t.key !== taskKey));
                message.success("Đã xóa công việc!");
            },
        });
    };

    const handleViewTaskDetail = (task) => {
        setSelectedTask(task);
        setTaskDetailModalVisible(true);
    };

    // Calculate total scores
    const calculateDepartmentTotal = (department) => {
        return reportData
            .filter(item => !item.isCategory && item[department] !== null)
            .reduce((sum, item) => sum + item[department], 0);
    };

    // Contract Management handlers
    const handleOpenTargetModal = (target = null, type = "department") => {
        if (target) {
            setSelectedTarget({ ...target, type });
            targetForm.setFieldsValue(target);
        } else {
            setSelectedTarget({ type });
            targetForm.resetFields();
        }
        setTargetModalVisible(true);
    };

    const handleTargetSubmit = (values) => {
        if (selectedTarget?.type === "department") {
            if (selectedTarget.key) {
                // Update existing
                setDepartmentTargets(
                    departmentTargets.map(t => 
                        t.key === selectedTarget.key ? { ...t, ...values } : t
                    )
                );
                message.success("Đã cập nhật chỉ tiêu đơn vị!");
            } else {
                // Add new
                const newTarget = {
                    key: (departmentTargets.length + 1).toString(),
                    ...values,
                    status: "active",
                };
                setDepartmentTargets([...departmentTargets, newTarget]);
                message.success("Đã thêm chỉ tiêu đơn vị mới!");
            }
        } else {
            if (selectedTarget.key) {
                // Update existing
                setEmployeeTargets(
                    employeeTargets.map(t => 
                        t.key === selectedTarget.key ? { ...t, ...values } : t
                    )
                );
                message.success("Đã cập nhật chỉ tiêu nhân viên!");
            } else {
                // Add new
                const newTarget = {
                    key: (employeeTargets.length + 1).toString(),
                    ...values,
                    status: "assigned",
                };
                setEmployeeTargets([...employeeTargets, newTarget]);
                message.success("Đã thêm chỉ tiêu nhân viên mới!");
            }
        }
        setTargetModalVisible(false);
        targetForm.resetFields();
    };

    const handleDeleteTarget = (key, type) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa chỉ tiêu này?",
            onOk: () => {
                if (type === "department") {
                    setDepartmentTargets(departmentTargets.filter(t => t.key !== key));
                } else {
                    setEmployeeTargets(employeeTargets.filter(t => t.key !== key));
                }
                message.success("Đã xóa chỉ tiêu!");
            },
        });
    };

    return (
        <div style={{ padding: "24px" }}>
            <Card
                title={
                    <Space>
                        <DollarOutlined style={{ fontSize: 24, color: "#1677ff" }} />
                        <span style={{ fontSize: 20, fontWeight: "bold" }}>
                            Hệ thống quản lý thù lao V2 - Agribank Chi nhánh Cần Giờ
                        </span>
                    </Space>
                }
            >
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    {/* Dashboard Tab */}
                    <TabPane
                        tab={
                            <span>
                                <TrophyOutlined />
                                Tổng quan
                            </span>
                        }
                        key="dashboard"
                    >
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            {/* Score Summary */}
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="Điểm định lượng"
                                            value={quantitativeScore}
                                            suffix="/ 60"
                                            valueStyle={{ color: "#1677ff" }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="Điểm định tính"
                                            value={qualitativeScore.toFixed(1)}
                                            suffix="/ 20"
                                            valueStyle={{ color: "#52c41a" }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="Chấp hành nội quy"
                                            value={complianceScore}
                                            suffix="/ 20"
                                            valueStyle={{ color: "#722ed1" }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="Hệ số hiệu suất"
                                            value={performanceFactor}
                                            valueStyle={{ color: "#fa8c16" }}
                                        />
                                        <div style={{ fontSize: 12, color: "#8c8c8c", marginTop: 8 }}>
                                            Tổng điểm: {totalScore.toFixed(1)} / 100
                                        </div>
                                    </Card>
                                </Col>
                            </Row>

                            <Divider />

                            {/* 1. Chỉ tiêu định lượng */}
                            <Card 
                                title={
                                    <Space>
                                        <RiseOutlined style={{ color: "#1677ff" }} />
                                        <span>1. Chỉ tiêu định lượng - Quý 4/2024 (60 điểm)</span>
                                        <Tag color="blue">User tự cập nhật KPI hàng ngày</Tag>
                                    </Space>
                                }
                                extra={
                                    <Space>
                                        <Button type="primary" size="small">Lưu KPI</Button>
                                        <Button size="small">Xuất Excel</Button>
                                    </Space>
                                }
                            >
                                <Table
                                    columns={kpiColumns}
                                    dataSource={mockKPIData}
                                    pagination={false}
                                    bordered
                                    size="small"
                                />
                            </Card>

                            <Divider />

                            {/* 2. Chỉ tiêu định tính */}
                            <Card
                                title={
                                    <Space>
                                        <EditOutlined style={{ color: "#52c41a" }} />
                                        <span>2. Chỉ tiêu định tính (20 điểm)</span>
                                        <Tag color="green">Trưởng phòng đánh giá</Tag>
                                        <Tag color="blue">
                                            Tổng: {qualitativeScores
                                                .filter((item) => !item.isParent)
                                                .reduce((sum, item) => sum + (item.managerScore || 0), 0)
                                                .toFixed(1)} / 20 điểm
                                        </Tag>
                                    </Space>
                                }
                                extra={
                                    <Space>
                                        <Button onClick={handleSaveScoring} size="small">Lưu tạm</Button>
                                        <Button type="primary" onClick={handleSubmitScoring} size="small">
                                            Xác nhận đánh giá
                                        </Button>
                                    </Space>
                                }
                            >
                                <Table
                                    columns={qualitativeColumns}
                                    dataSource={qualitativeScores}
                                    pagination={false}
                                    bordered
                                    size="small"
                                />
                            </Card>

                            <Divider />

                            {/* 3. Chấp hành nội quy */}
                            <Card 
                                title={
                                    <Space>
                                        <CheckCircleOutlined style={{ color: "#722ed1" }} />
                                        <span>3. Chấp hành nội quy lao động và văn hóa Agribank (20 điểm)</span>
                                        <Tag color="green">Trưởng phòng đánh giá</Tag>
                                        <Tag color="purple">
                                            Điểm: {complianceScore} / 20
                                        </Tag>
                                    </Space>
                                }
                            >
                                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                    <Descriptions bordered column={2} size="small">
                                        <Descriptions.Item label="Chấp hành giờ giấc làm việc">
                                            <Progress percent={95} status="success" size="small" />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Tuân thủ quy định nội bộ">
                                            <Progress percent={92} status="success" size="small" />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Văn hóa Agribank">
                                            <Progress percent={93} status="success" size="small" />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Không vi phạm kỷ luật">
                                            <Badge status="success" text="Không có vi phạm" />
                                        </Descriptions.Item>
                                    </Descriptions>
                                    <div style={{ background: "#f0f5ff", padding: 16, borderRadius: 8 }}>
                                        <Space direction="vertical" style={{ width: "100%" }}>
                                            <div style={{ fontWeight: "bold", color: "#1677ff" }}>
                                                📋 Ghi chú đánh giá từ Trưởng phòng:
                                            </div>
                                            <div style={{ color: "#666" }}>
                                                Nhân viên chấp hành tốt nội quy lao động, đến đúng giờ, 
                                                tham gia đầy đủ các hoạt động văn hóa của ngân hàng. 
                                                Không có vi phạm kỷ luật trong quý.
                                            </div>
                                        </Space>
                                    </div>
                                </Space>
                            </Card>
                        </Space>
                    </TabPane>

                    {/* Quantitative KPI Tab - User nhập */}
                    <TabPane
                        tab={
                            <span>
                                <RiseOutlined />
                                Chỉ tiêu định lượng (60đ)
                            </span>
                        }
                        key="quantitative"
                    >
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Card 
                                title={
                                    <Space>
                                        <span>Chỉ tiêu định lượng - Quý 4/2024</span>
                                        <Tag color="blue">User tự cập nhật KPI hàng ngày</Tag>
                                    </Space>
                                }
                                extra={
                                    <Space>
                                        <Button type="primary">Lưu KPI</Button>
                                        <Button>Xuất Excel</Button>
                                    </Space>
                                }
                            >
                                <Table
                                    columns={kpiColumns}
                                    dataSource={mockKPIData}
                                    pagination={false}
                                    bordered
                                    size="small"
                                />
                            </Card>
                        </Space>
                    </TabPane>

                    {/* Registration Tab */}
                    <TabPane
                        tab={
                            <span>
                                <FileTextOutlined />
                                Đăng ký nghiệp vụ
                            </span>
                        }
                        key="registration"
                    >
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Card
                                title="Phiếu đăng ký nghiệp vụ"
                                extra={
                                    <Space>
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => setRegistrationModalVisible(true)}
                                        >
                                            Mẫu 01
                                        </Button>
                                        <Button
                                            icon={<PlusOutlined />}
                                            onClick={() => setRegistrationModalVisible(true)}
                                        >
                                            Mẫu 02
                                        </Button>
                                    </Space>
                                }
                            >
                                <Table
                                    columns={registrationColumns}
                                    dataSource={mockRegistrations}
                                />
                            </Card>
                        </Space>
                    </TabPane>

                    {/* Qualitative Scoring Tab - Manager */}
                    <TabPane
                        tab={
                            <span>
                                <EditOutlined />
                                Chỉ tiêu định tính (20đ)
                            </span>
                        }
                        key="scoring"
                    >
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Card
                                title={
                                    <Space>
                                        <span>Bảng chấm điểm định tính</span>
                                        <Tag color="green">Trưởng phòng đánh giá</Tag>
                                        <Tag color="blue">
                                            Tổng:{" "}
                                            {qualitativeScores
                                                .filter((item) => !item.isParent)
                                                .reduce((sum, item) => sum + (item.managerScore || 0), 0)
                                                .toFixed(1)}{" "}
                                            / 20 điểm
                                        </Tag>
                                    </Space>
                                }
                                extra={
                                    <Space>
                                        <Button onClick={handleSaveScoring}>Lưu tạm</Button>
                                        <Button type="primary" onClick={handleSubmitScoring}>
                                            Xác nhận đánh giá
                                        </Button>
                                    </Space>
                                }
                            >
                                <Table
                                    columns={qualitativeColumns}
                                    dataSource={qualitativeScores}
                                    pagination={false}
                                    bordered
                                />
                            </Card>
                        </Space>
                    </TabPane>

                    {/* Compliance Tab */}
                    <TabPane
                        tab={
                            <span>
                                <CheckCircleOutlined />
                                Chấp hành nội quy (20đ)
                            </span>
                        }
                        key="compliance"
                    >
                        <Card 
                            title={
                                <Space>
                                    <span>Chấp hành nội quy lao động và văn hóa Agribank</span>
                                    <Tag color="green">Trưởng phòng đánh giá</Tag>
                                </Space>
                            }
                            extra={
                                <Tag color="purple" style={{ fontSize: 14 }}>
                                    Điểm hiện tại: {complianceScore} / 20
                                </Tag>
                            }
                        >
                            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                <Descriptions bordered column={1}>
                                    <Descriptions.Item label="Chấp hành giờ giấc làm việc">
                                        <Progress percent={95} status="success" />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tuân thủ quy định nội bộ">
                                        <Progress percent={92} status="success" />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Văn hóa Agribank">
                                        <Progress percent={93} status="success" />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Không vi phạm kỷ luật">
                                        <Badge status="success" text="Không có vi phạm" />
                                    </Descriptions.Item>
                                </Descriptions>
                                <div style={{ background: "#f0f5ff", padding: 16, borderRadius: 8 }}>
                                    <Space direction="vertical" style={{ width: "100%" }}>
                                        <div style={{ fontWeight: "bold", color: "#1677ff" }}>
                                            📋 Ghi chú đánh giá từ Trưởng phòng:
                                        </div>
                                        <div style={{ color: "#666" }}>
                                            Nhân viên chấp hành tốt nội quy lao động, đến đúng giờ, 
                                            tham gia đầy đủ các hoạt động văn hóa của ngân hàng. 
                                            Không có vi phạm kỷ luật trong quý.
                                        </div>
                                    </Space>
                                </div>
                            </Space>
                        </Card>
                    </TabPane>

                    {/* Manager Approval Tab - Admin Only */}
                    <TabPane
                        tab={
                            <span>
                                <UserOutlined />
                                Phê duyệt
                            </span>
                        }
                        key="approval"
                    >
                        <Card title="Danh sách chờ phê duyệt">
                            <p style={{ color: "#8c8c8c", textAlign: "center", padding: 40 }}>
                                Chức năng dành cho Quản lý/Admin
                            </p>
                        </Card>
                    </TabPane>

                    {/* Admin Config Tab */}
                    <TabPane
                        tab={
                            <span>
                                <SettingOutlined />
                                Cấu hình
                            </span>
                        }
                        key="config"
                    >
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Card
                                title="Cấu hình hệ số V2"
                                extra={
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => setConfigModalVisible(true)}
                                    >
                                        Thêm cấu hình
                                    </Button>
                                }
                            >
                                <Descriptions bordered column={2}>
                                    <Descriptions.Item label="Quý/Năm">Q4/2024</Descriptions.Item>
                                    <Descriptions.Item label="Giá trị 1 hệ số">
                                        5,000,000 VNĐ
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Hệ số điều chỉnh">1.0</Descriptions.Item>
                                    <Descriptions.Item label="Hệ số thu hút">0.2</Descriptions.Item>
                                    <Descriptions.Item label="Hiệu lực" span={2}>
                                        01/10/2024 - 31/12/2024
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Space>
                    </TabPane>

                    {/* Reports Tab */}
                    <TabPane
                        tab={
                            <span>
                                <BarChartOutlined />
                                Báo cáo
                            </span>
                        }
                        key="reports"
                    >
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Card
                                title={
                                    <Space>
                                        <BarChartOutlined style={{ color: "#1677ff" }} />
                                        <span>Báo cáo thống kê chỉ số theo phòng</span>
                                    </Space>
                                }
                                extra={
                                    <Space>
                                        <Select
                                            value={selectedPeriod}
                                            onChange={setSelectedPeriod}
                                            style={{ width: 200 }}
                                        >
                                            <Option value="Tháng 12/2024">Tháng 12/2024</Option>
                                            <Option value="Quý 4/2024">Quý 4/2024</Option>
                                            <Option value="Năm 2024">Năm 2024</Option>
                                        </Select>
                                        <Button type="primary" icon={<FolderOpenOutlined />}>
                                            Xuất Excel
                                        </Button>
                                    </Space>
                                }
                            >
                                <Table
                                    dataSource={reportData}
                                    columns={[
                                        {
                                            title: "STT",
                                            dataIndex: "stt",
                                            key: "stt",
                                            width: 80,
                                            align: "center",
                                            render: (text, record) => (
                                                <span style={{ fontWeight: record.isCategory ? "bold" : "normal" }}>
                                                    {text}
                                                </span>
                                            ),
                                        },
                                        {
                                            title: "Chỉ tiêu",
                                            dataIndex: "criteria",
                                            key: "criteria",
                                            width: 350,
                                            render: (text, record) => (
                                                <span style={{ 
                                                    fontWeight: record.isCategory ? "bold" : "normal",
                                                    color: record.isCategory ? "#1677ff" : "inherit"
                                                }}>
                                                    {text}
                                                </span>
                                            ),
                                        },
                                        {
                                            title: "P. Khách hàng",
                                            dataIndex: "pKhachHang",
                                            key: "pKhachHang",
                                            width: 150,
                                            align: "center",
                                            render: (val, record) => 
                                                val !== null ? (
                                                    <span style={{ fontWeight: record.isCategory ? "bold" : "normal" }}>
                                                        {val.toFixed(1)}
                                                    </span>
                                                ) : "",
                                        },
                                        {
                                            title: "P. KH&QLRR",
                                            dataIndex: "pKHQLRR",
                                            key: "pKHQLRR",
                                            width: 150,
                                            align: "center",
                                            render: (val, record) => 
                                                val !== null ? (
                                                    <span style={{ fontWeight: record.isCategory ? "bold" : "normal" }}>
                                                        {val.toFixed(1)}
                                                    </span>
                                                ) : "",
                                        },
                                        {
                                            title: "P. Kế toán",
                                            dataIndex: "pKeToan",
                                            key: "pKeToan",
                                            width: 150,
                                            align: "center",
                                            render: (val, record) => 
                                                val !== null ? (
                                                    <span style={{ fontWeight: record.isCategory ? "bold" : "normal" }}>
                                                        {val.toFixed(1)}
                                                    </span>
                                                ) : "",
                                        },
                                        {
                                            title: "P. Tổng hợp",
                                            dataIndex: "pTongHop",
                                            key: "pTongHop",
                                            width: 150,
                                            align: "center",
                                            render: (val, record) => 
                                                val !== null ? (
                                                    <span style={{ fontWeight: record.isCategory ? "bold" : "normal" }}>
                                                        {val.toFixed(1)}
                                                    </span>
                                                ) : "",
                                        },
                                    ]}
                                    pagination={false}
                                    bordered
                                    size="small"
                                    summary={() => (
                                        <Table.Summary fixed>
                                            <Table.Summary.Row style={{ background: "#fafafa" }}>
                                                <Table.Summary.Cell index={0} colSpan={2} align="right">
                                                    <strong style={{ fontSize: 16 }}>Tổng điểm</strong>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={2} align="center">
                                                    <strong style={{ color: "#1677ff", fontSize: 16 }}>
                                                        {calculateDepartmentTotal("pKhachHang").toFixed(1)}
                                                    </strong>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={3} align="center">
                                                    <strong style={{ color: "#1677ff", fontSize: 16 }}>
                                                        {calculateDepartmentTotal("pKHQLRR").toFixed(1)}
                                                    </strong>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={4} align="center">
                                                    <strong style={{ color: "#1677ff", fontSize: 16 }}>
                                                        {calculateDepartmentTotal("pKeToan").toFixed(1)}
                                                    </strong>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={5} align="center">
                                                    <strong style={{ color: "#1677ff", fontSize: 16 }}>
                                                        {calculateDepartmentTotal("pTongHop").toFixed(1)}
                                                    </strong>
                                                </Table.Summary.Cell>
                                            </Table.Summary.Row>
                                        </Table.Summary>
                                    )}
                                />
                            </Card>
                        </Space>
                    </TabPane>

                    {/* Salary Calculation Tab */}
                    <TabPane
                        tab={
                            <span>
                                <DollarOutlined />
                                Tính toán chỉ số lương v2
                            </span>
                        }
                        key="salary-calculation"
                    >
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Card
                                title={
                                    <Space>
                                        <DollarOutlined style={{ color: "#52c41a" }} />
                                        <span>Báo cáo tính toán chỉ số lương V2 - {selectedPeriod}</span>
                                    </Space>
                                }
                                extra={
                                    <Space>
                                        <Select
                                            value={selectedPeriod}
                                            onChange={setSelectedPeriod}
                                            style={{ width: 200 }}
                                        >
                                            <Option value="Tháng 12/2024">Tháng 12/2024</Option>
                                            <Option value="Quý 4/2024">Quý 4/2024</Option>
                                            <Option value="Năm 2024">Năm 2024</Option>
                                        </Select>
                                        <Button type="primary" icon={<FolderOpenOutlined />}>
                                            Xuất Excel
                                        </Button>
                                    </Space>
                                }
                            >
                                <Table
                                    dataSource={salaryCalculationData}
                                    columns={[
                                        {
                                            title: "Mã NV",
                                            dataIndex: "employeeCode",
                                            key: "employeeCode",
                                            width: 90,
                                            fixed: "left",
                                        },
                                        {
                                            title: "Họ và tên",
                                            dataIndex: "employeeName",
                                            key: "employeeName",
                                            width: 150,
                                            fixed: "left",
                                            render: (text) => <strong>{text}</strong>,
                                        },
                                        {
                                            title: "Chức vụ",
                                            dataIndex: "position",
                                            key: "position",
                                            width: 140,
                                        },
                                        {
                                            title: "Phòng ban",
                                            dataIndex: "department",
                                            key: "department",
                                            width: 130,
                                        },
                                        {
                                            title: "Điểm định lượng (60đ)",
                                            dataIndex: "quantitativeScore",
                                            key: "quantitativeScore",
                                            width: 120,
                                            align: "center",
                                            render: (val) => (
                                                <Tag color="blue">{val.toFixed(1)}</Tag>
                                            ),
                                        },
                                        {
                                            title: "Điểm định tính (20đ)",
                                            dataIndex: "qualitativeScore",
                                            key: "qualitativeScore",
                                            width: 120,
                                            align: "center",
                                            render: (val) => (
                                                <Tag color="green">{val.toFixed(1)}</Tag>
                                            ),
                                        },
                                        {
                                            title: "Chấp hành NQ (20đ)",
                                            dataIndex: "complianceScore",
                                            key: "complianceScore",
                                            width: 120,
                                            align: "center",
                                            render: (val) => (
                                                <Tag color="purple">{val.toFixed(1)}</Tag>
                                            ),
                                        },
                                        {
                                            title: "Tổng điểm (100đ)",
                                            dataIndex: "totalScore",
                                            key: "totalScore",
                                            width: 110,
                                            align: "center",
                                            render: (val) => (
                                                <Tag color={val >= 95 ? "success" : val >= 85 ? "processing" : "warning"}>
                                                    <strong>{val.toFixed(1)}</strong>
                                                </Tag>
                                            ),
                                        },
                                        {
                                            title: "Hệ số hiệu suất",
                                            dataIndex: "performanceFactor",
                                            key: "performanceFactor",
                                            width: 110,
                                            align: "center",
                                            render: (val) => (
                                                <strong style={{ color: "#1677ff" }}>{val.toFixed(2)}</strong>
                                            ),
                                        },
                                        {
                                            title: "Hệ số cơ bản",
                                            dataIndex: "baseCoefficient",
                                            key: "baseCoefficient",
                                            width: 100,
                                            align: "center",
                                            render: (val) => val.toFixed(2),
                                        },
                                        {
                                            title: "HS điều chỉnh",
                                            dataIndex: "adjustmentCoefficient",
                                            key: "adjustmentCoefficient",
                                            width: 100,
                                            align: "center",
                                            render: (val) => <span style={{ color: "#ff7a45" }}>{val.toFixed(2)}</span>,
                                        },
                                        {
                                            title: "HS thu hút",
                                            dataIndex: "attractionCoefficient",
                                            key: "attractionCoefficient",
                                            width: 100,
                                            align: "center",
                                            render: (val) => <span style={{ color: "#52c41a" }}>{val.toFixed(2)}</span>,
                                        },
                                        {
                                            title: "Hệ số cuối cùng",
                                            dataIndex: "finalCoefficient",
                                            key: "finalCoefficient",
                                            width: 110,
                                            align: "center",
                                            render: (val) => (
                                                <Tag color="cyan">
                                                    <strong>{val.toFixed(2)}</strong>
                                                </Tag>
                                            ),
                                        },
                                        {
                                            title: "Giá trị 1 hệ số (VNĐ)",
                                            dataIndex: "coefficientValue",
                                            key: "coefficientValue",
                                            width: 140,
                                            align: "right",
                                            render: (val) => val.toLocaleString(),
                                        },
                                        {
                                            title: "Thu nhập dự kiến (VNĐ)",
                                            dataIndex: "estimatedSalary",
                                            key: "estimatedSalary",
                                            width: 150,
                                            align: "right",
                                            fixed: "right",
                                            render: (val) => (
                                                <strong style={{ color: "#52c41a", fontSize: 14 }}>
                                                    {val.toLocaleString()}
                                                </strong>
                                            ),
                                        },
                                    ]}
                                    scroll={{ x: 2000 }}
                                    pagination={{ pageSize: 10 }}
                                    bordered
                                    size="small"
                                    summary={(pageData) => {
                                        const totalSalary = pageData.reduce((sum, item) => sum + item.estimatedSalary, 0);
                                        const avgScore = pageData.reduce((sum, item) => sum + item.totalScore, 0) / pageData.length;
                                        return (
                                            <Table.Summary fixed>
                                                <Table.Summary.Row style={{ background: "#f0f5ff" }}>
                                                    <Table.Summary.Cell index={0} colSpan={7} align="right">
                                                        <strong style={{ fontSize: 14 }}>Trung bình / Tổng:</strong>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={7} align="center">
                                                        <Tag color="processing">
                                                            <strong>{avgScore.toFixed(1)}</strong>
                                                        </Tag>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={8} colSpan={6} />
                                                    <Table.Summary.Cell index={14} align="right">
                                                        <strong style={{ color: "#52c41a", fontSize: 15 }}>
                                                            {totalSalary.toLocaleString()}
                                                        </strong>
                                                    </Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            </Table.Summary>
                                        );
                                    }}
                                />
                                <Divider />
                                <div style={{ background: "#f0f5ff", padding: 16, borderRadius: 8 }}>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Space direction="vertical" style={{ width: "100%" }}>
                                                <div style={{ fontWeight: "bold", color: "#1677ff", fontSize: 15 }}>
                                                    📊 Công thức tính toán:
                                                </div>
                                                <div style={{ marginLeft: 16 }}>
                                                    <div>1. <strong>Hệ số hiệu suất</strong> = Tổng điểm / 100</div>
                                                    <div>2. <strong>Hệ số cuối cùng</strong> = Hệ số cơ bản + HS điều chỉnh + HS thu hút</div>
                                                    <div>3. <strong>Thu nhập dự kiến</strong> = Hệ số cuối cùng × Giá trị 1 hệ số × Hệ số hiệu suất</div>
                                                </div>
                                            </Space>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Space>
                    </TabPane>

                    {/* Contract Management Tab */}
                    <TabPane
                        tab={
                            <span>
                                <FileTextOutlined />
                                Giao khoán (Kế hoạch)
                            </span>
                        }
                        key="contract"
                    >
                        <Card>
                            <Tabs 
                                activeKey={contractTab} 
                                onChange={setContractTab}
                                tabBarExtraContent={
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => handleOpenTargetModal(null, contractTab)}
                                    >
                                        {contractTab === "department" ? "Thêm chỉ tiêu đơn vị" : "Thêm chỉ tiêu nhân viên"}
                                    </Button>
                                }
                            >
                                {/* Department Targets Tab */}
                                <TabPane tab="Chỉ tiêu đơn vị" key="department">
                                    <Table
                                        dataSource={departmentTargets}
                                        columns={[
                                            {
                                                title: "Kỳ",
                                                dataIndex: "quarter",
                                                key: "quarter",
                                                width: 100,
                                                render: (text) => <Tag color="blue">{text}</Tag>,
                                            },
                                            {
                                                title: "Đơn vị",
                                                dataIndex: "department",
                                                key: "department",
                                                width: 150,
                                                render: (text) => <strong>{text}</strong>,
                                            },
                                            {
                                                title: "Nguồn vốn (triệu)",
                                                dataIndex: "capitalTarget",
                                                key: "capitalTarget",
                                                width: 130,
                                                align: "right",
                                                render: (val) => val.toLocaleString(),
                                            },
                                            {
                                                title: "Dư nợ (triệu)",
                                                dataIndex: "loanTarget",
                                                key: "loanTarget",
                                                width: 130,
                                                align: "right",
                                                render: (val) => val.toLocaleString(),
                                            },
                                            {
                                                title: "Dịch vụ (giao dịch)",
                                                dataIndex: "serviceTarget",
                                                key: "serviceTarget",
                                                width: 140,
                                                align: "center",
                                                render: (val) => <Tag color="green">{val}</Tag>,
                                            },
                                            {
                                                title: "Thẻ (cái)",
                                                dataIndex: "cardTarget",
                                                key: "cardTarget",
                                                width: 100,
                                                align: "center",
                                            },
                                            {
                                                title: "E-Banking (KH)",
                                                dataIndex: "ebankingTarget",
                                                key: "ebankingTarget",
                                                width: 130,
                                                align: "center",
                                            },
                                            {
                                                title: "KH mới",
                                                dataIndex: "newCustomerTarget",
                                                key: "newCustomerTarget",
                                                width: 90,
                                                align: "center",
                                            },
                                            {
                                                title: "Trạng thái",
                                                dataIndex: "status",
                                                key: "status",
                                                width: 110,
                                                render: (status) => (
                                                    <Tag color={status === "active" ? "success" : "default"}>
                                                        {status === "active" ? "Đang áp dụng" : "Ngừng"}
                                                    </Tag>
                                                ),
                                            },
                                            {
                                                title: "Thao tác",
                                                key: "action",
                                                width: 150,
                                                fixed: "right",
                                                render: (_, record) => (
                                                    <Space size="small">
                                                        <Button
                                                            size="small"
                                                            icon={<EditOutlined />}
                                                            onClick={() => handleOpenTargetModal(record, "department")}
                                                        >
                                                            Sửa
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            danger
                                                            icon={<DeleteOutlined />}
                                                            onClick={() => handleDeleteTarget(record.key, "department")}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </Space>
                                                ),
                                            },
                                        ]}
                                        scroll={{ x: 1400 }}
                                        pagination={{ pageSize: 10 }}
                                        bordered
                                        size="small"
                                    />
                                </TabPane>

                                {/* Employee Targets Tab */}
                                <TabPane tab="Chỉ tiêu nhân viên" key="employee">
                                    <Table
                                        dataSource={employeeTargets}
                                        columns={[
                                            {
                                                title: "Kỳ",
                                                dataIndex: "quarter",
                                                key: "quarter",
                                                width: 100,
                                                render: (text) => <Tag color="blue">{text}</Tag>,
                                            },
                                            {
                                                title: "Mã NV",
                                                dataIndex: "employeeCode",
                                                key: "employeeCode",
                                                width: 90,
                                                fixed: "left",
                                            },
                                            {
                                                title: "Họ và tên",
                                                dataIndex: "employeeName",
                                                key: "employeeName",
                                                width: 140,
                                                fixed: "left",
                                                render: (text) => <strong>{text}</strong>,
                                            },
                                            {
                                                title: "Phòng ban",
                                                dataIndex: "department",
                                                key: "department",
                                                width: 130,
                                            },
                                            {
                                                title: "Chức vụ",
                                                dataIndex: "position",
                                                key: "position",
                                                width: 130,
                                            },
                                            {
                                                title: "Nguồn vốn (triệu)",
                                                dataIndex: "capitalTarget",
                                                key: "capitalTarget",
                                                width: 130,
                                                align: "right",
                                                render: (val) => val.toLocaleString(),
                                            },
                                            {
                                                title: "Dư nợ (triệu)",
                                                dataIndex: "loanTarget",
                                                key: "loanTarget",
                                                width: 130,
                                                align: "right",
                                                render: (val) => val.toLocaleString(),
                                            },
                                            {
                                                title: "Dịch vụ",
                                                dataIndex: "serviceTarget",
                                                key: "serviceTarget",
                                                width: 90,
                                                align: "center",
                                                render: (val) => <Tag color="green">{val}</Tag>,
                                            },
                                            {
                                                title: "Thẻ",
                                                dataIndex: "cardTarget",
                                                key: "cardTarget",
                                                width: 70,
                                                align: "center",
                                            },
                                            {
                                                title: "E-Banking",
                                                dataIndex: "ebankingTarget",
                                                key: "ebankingTarget",
                                                width: 90,
                                                align: "center",
                                            },
                                            {
                                                title: "KH mới",
                                                dataIndex: "newCustomerTarget",
                                                key: "newCustomerTarget",
                                                width: 80,
                                                align: "center",
                                            },
                                            {
                                                title: "Trạng thái",
                                                dataIndex: "status",
                                                key: "status",
                                                width: 110,
                                                render: (status) => (
                                                    <Tag color={status === "assigned" ? "processing" : "default"}>
                                                        {status === "assigned" ? "Đã giao" : "Chưa giao"}
                                                    </Tag>
                                                ),
                                            },
                                            {
                                                title: "Thao tác",
                                                key: "action",
                                                width: 150,
                                                fixed: "right",
                                                render: (_, record) => (
                                                    <Space size="small">
                                                        <Button
                                                            size="small"
                                                            icon={<EditOutlined />}
                                                            onClick={() => handleOpenTargetModal(record, "employee")}
                                                        >
                                                            Sửa
                                                        </Button>
                                                        <Button
                                                            size="small"
                                                            danger
                                                            icon={<DeleteOutlined />}
                                                            onClick={() => handleDeleteTarget(record.key, "employee")}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </Space>
                                                ),
                                            },
                                        ]}
                                        scroll={{ x: 1600 }}
                                        pagination={{ pageSize: 10 }}
                                        bordered
                                        size="small"
                                    />
                                </TabPane>
                            </Tabs>
                        </Card>
                    </TabPane>

                    {/* Task Management Tab */}
                    <TabPane
                        tab={
                            <span>
                                <TeamOutlined />
                                Quản lý giao việc
                            </span>
                        }
                        key="tasks"
                    >
                        <Space direction="vertical" size="large" style={{ width: "100%" }}>
                            <Card
                                title="Danh sách công việc"
                                extra={
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => handleOpenTaskModal()}
                                    >
                                        Giao việc mới
                                    </Button>
                                }
                            >
                                <Table
                                    dataSource={tasks}
                                    columns={[
                                        {
                                            title: "Tên công việc",
                                            dataIndex: "taskName",
                                            key: "taskName",
                                            width: 250,
                                        },
                                        {
                                            title: "Người thực hiện",
                                            dataIndex: "assignee",
                                            key: "assignee",
                                            width: 150,
                                            render: (text) => (
                                                <Space>
                                                    <UserOutlined />
                                                    {text}
                                                </Space>
                                            ),
                                        },
                                        {
                                            title: "Độ ưu tiên",
                                            dataIndex: "priority",
                                            key: "priority",
                                            width: 120,
                                            render: (priority) => {
                                                const priorityConfig = {
                                                    high: { color: "red", text: "Cao" },
                                                    medium: { color: "orange", text: "Trung bình" },
                                                    low: { color: "blue", text: "Thấp" },
                                                };
                                                const config = priorityConfig[priority];
                                                return <Tag color={config.color}>{config.text}</Tag>;
                                            },
                                        },
                                        {
                                            title: "Hạn hoàn thành",
                                            dataIndex: "deadline",
                                            key: "deadline",
                                            width: 130,
                                            render: (date) => (
                                                <Space>
                                                    <CalendarOutlined />
                                                    {date}
                                                </Space>
                                            ),
                                        },
                                        {
                                            title: "Tiến độ",
                                            dataIndex: "progress",
                                            key: "progress",
                                            width: 150,
                                            render: (progress) => (
                                                <Progress
                                                    percent={progress}
                                                    size="small"
                                                    status={progress === 100 ? "success" : "active"}
                                                />
                                            ),
                                        },
                                        {
                                            title: "Trạng thái",
                                            dataIndex: "status",
                                            key: "status",
                                            width: 120,
                                            render: (status) => {
                                                const statusConfig = {
                                                    pending: { color: "default", text: "Chưa bắt đầu" },
                                                    in_progress: { color: "processing", text: "Đang thực hiện" },
                                                    completed: { color: "success", text: "Hoàn thành" },
                                                };
                                                const config = statusConfig[status];
                                                return <Tag color={config.color}>{config.text}</Tag>;
                                            },
                                        },
                                        {
                                            title: "Thao tác",
                                            key: "action",
                                            width: 200,
                                            render: (_, record) => (
                                                <Space size="small">
                                                    <Button
                                                        size="small"
                                                        icon={<EyeOutlined />}
                                                        onClick={() => handleViewTaskDetail(record)}
                                                    >
                                                        Chi tiết
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        icon={<EditOutlined />}
                                                        onClick={() => handleOpenTaskModal(record)}
                                                    >
                                                        Sửa
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => handleDeleteTask(record.key)}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </Space>
                                            ),
                                        },
                                    ]}
                                    pagination={{ pageSize: 10 }}
                                />
                            </Card>
                        </Space>
                    </TabPane>
                </Tabs>
            </Card>

            {/* Registration Modal */}
            <Modal
                title="Phiếu đăng ký nghiệp vụ"
                open={registrationModalVisible}
                onCancel={() => {
                    setRegistrationModalVisible(false);
                    form.resetFields();
                }}
                footer={null}
                width={700}
            >
                <Form form={form} layout="vertical" onFinish={handleRegistrationSubmit}>
                    <Form.Item
                        label="Tên khách hàng"
                        name="customerName"
                        rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
                    >
                        <Input placeholder="Nhập tên khách hàng" />
                    </Form.Item>
                    <Form.Item
                        label="Số tiền (VNĐ)"
                        name="amount"
                        rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Loại giao dịch"
                        name="transactionType"
                        rules={[{ required: true, message: "Vui lòng chọn loại giao dịch" }]}
                    >
                        <Select placeholder="Chọn loại giao dịch">
                            <Option value="new_customer">Gửi mới (KH mới)</Option>
                            <Option value="old_customer">Gửi mới (KH cũ)</Option>
                            <Option value="withdrawal">Tất toán</Option>
                            <Option value="renewal">Gia hạn</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Ngày giao dịch dự kiến"
                        name="transactionDate"
                        rules={[{ required: true, message: "Vui lòng chọn ngày giao dịch" }]}
                    >
                        <DatePicker showTime style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item label="Ghi chú" name="notes">
                        <TextArea rows={3} />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                        <Space>
                            <Button onClick={() => setRegistrationModalVisible(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit">
                                Gửi phiếu
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Config Modal */}
            <Modal
                title="Thêm cấu hình hệ số"
                open={configModalVisible}
                onCancel={() => setConfigModalVisible(false)}
                footer={null}
                width={700}
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Quý" name="quarter">
                                <Select placeholder="Chọn quý">
                                    <Option value={1}>Quý 1</Option>
                                    <Option value={2}>Quý 2</Option>
                                    <Option value={3}>Quý 3</Option>
                                    <Option value={4}>Quý 4</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Năm" name="year">
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Giá trị 1 hệ số V2 (VNĐ)" name="baseValue">
                        <InputNumber
                            style={{ width: "100%" }}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Hệ số điều chỉnh" name="adjustmentCoefficient">
                                <InputNumber style={{ width: "100%" }} step={0.1} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Hệ số thu hút" name="attractionCoefficient">
                                <InputNumber style={{ width: "100%" }} step={0.1} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                        <Space>
                            <Button onClick={() => setConfigModalVisible(false)}>Hủy</Button>
                            <Button type="primary">Lưu cấu hình</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* KPI Update Modal */}
            <Modal
                title={
                    <Space>
                        <PlusOutlined style={{ color: "#1677ff" }} />
                        <span>Cập nhật KPI: {selectedKPI?.targetName}</span>
                    </Space>
                }
                open={kpiUpdateModalVisible}
                onCancel={() => {
                    setKpiUpdateModalVisible(false);
                    kpiUpdateForm.resetFields();
                }}
                footer={null}
                width={600}
            >
                {selectedKPI && (
                    <div style={{ marginBottom: 16 }}>
                        <Descriptions bordered column={1} size="small">
                            <Descriptions.Item label="Mã chỉ tiêu">{selectedKPI.code}</Descriptions.Item>
                            <Descriptions.Item label="Tên chỉ tiêu">{selectedKPI.targetName}</Descriptions.Item>
                            <Descriptions.Item label="Đơn vị">{selectedKPI.unit}</Descriptions.Item>
                            <Descriptions.Item label="Kế hoạch">
                                {selectedKPI.planned.toLocaleString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Đã thực hiện">
                                {selectedKPI.actual.toLocaleString()}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
                <Form
                    form={kpiUpdateForm}
                    layout="vertical"
                    onFinish={handleKPIUpdateSubmit}
                >
                    <Form.Item
                        label="Số lượng cập nhật"
                        name="amount"
                        rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            placeholder="Nhập số lượng cập nhật"
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ghi chú"
                        name="notes"
                        rules={[{ required: true, message: "Vui lòng nhập ghi chú" }]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Nhập ghi chú cho lần cập nhật này (ví dụ: mở tài khoản cho khách hàng X, phát hành thẻ cho công ty Y...)"
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                        <Space>
                            <Button onClick={() => setKpiUpdateModalVisible(false)}>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Lưu cập nhật
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* KPI Detail History Modal */}
            <Modal
                title={
                    <Space>
                        <EyeOutlined style={{ color: "#1677ff" }} />
                        <span>Lịch sử cập nhật: {selectedKPI?.targetName}</span>
                    </Space>
                }
                open={kpiDetailModalVisible}
                onCancel={() => setKpiDetailModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setKpiDetailModalVisible(false)}>
                        Đóng
                    </Button>,
                ]}
                width={900}
            >
                {selectedKPI && (
                    <div>
                        <div style={{ marginBottom: 16 }}>
                            <Descriptions bordered column={2} size="small">
                                <Descriptions.Item label="Mã chỉ tiêu">{selectedKPI.code}</Descriptions.Item>
                                <Descriptions.Item label="Đơn vị">{selectedKPI.unit}</Descriptions.Item>
                                <Descriptions.Item label="Kế hoạch">
                                    {selectedKPI.planned.toLocaleString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Tổng đã thực hiện">
                                    <span style={{ fontWeight: "bold", color: "#1677ff" }}>
                                        {(kpiHistory[selectedKPI.key] || [])
                                            .reduce((sum, item) => sum + item.amount, 0)
                                            .toLocaleString()}
                                    </span>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>

                        <Table
                            dataSource={kpiHistory[selectedKPI.key] || []}
                            columns={[
                                {
                                    title: "STT",
                                    key: "index",
                                    width: 60,
                                    align: "center",
                                    render: (_, __, index) => index + 1,
                                },
                                {
                                    title: "Thời gian",
                                    dataIndex: "date",
                                    key: "date",
                                    width: 180,
                                    render: (date) => new Date(date).toLocaleString("vi-VN"),
                                },
                                {
                                    title: "Số lượng",
                                    dataIndex: "amount",
                                    key: "amount",
                                    width: 120,
                                    align: "right",
                                    render: (val) => (
                                        <span style={{ fontWeight: "bold", color: "#1677ff" }}>
                                            {val.toLocaleString()}
                                        </span>
                                    ),
                                },
                                {
                                    title: "Ghi chú",
                                    dataIndex: "notes",
                                    key: "notes",
                                },
                                {
                                    title: "Người cập nhật",
                                    dataIndex: "createdBy",
                                    key: "createdBy",
                                    width: 150,
                                },
                            ]}
                            pagination={false}
                            bordered
                            size="small"
                            locale={{
                                emptyText: (
                                    <div style={{ padding: 20, textAlign: "center" }}>
                                        <EyeOutlined style={{ fontSize: 32, color: "#d9d9d9" }} />
                                        <p style={{ color: "#8c8c8c", marginTop: 8 }}>
                                            Chưa có lần cập nhật nào
                                        </p>
                                    </div>
                                ),
                            }}
                            summary={(pageData) => {
                                if (pageData.length === 0) return null;
                                const total = pageData.reduce((sum, item) => sum + item.amount, 0);
                                return (
                                    <Table.Summary fixed>
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell index={0} colSpan={2} align="right">
                                                <strong>Tổng cộng:</strong>
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={2} align="right">
                                                <strong style={{ color: "#1677ff", fontSize: 16 }}>
                                                    {total.toLocaleString()}
                                                </strong>
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={3} colSpan={2} />
                                        </Table.Summary.Row>
                                    </Table.Summary>
                                );
                            }}
                        />
                    </div>
                )}
            </Modal>

            {/* Task Management Modal */}
            <Modal
                title={
                    <Space>
                        <TeamOutlined style={{ color: "#1677ff" }} />
                        <span>{selectedTask ? "Cập nhật công việc" : "Giao việc mới"}</span>
                    </Space>
                }
                open={taskModalVisible}
                onCancel={() => {
                    setTaskModalVisible(false);
                    taskForm.resetFields();
                }}
                footer={null}
                width={700}
            >
                <Form form={taskForm} layout="vertical" onFinish={handleTaskSubmit}>
                    <Form.Item
                        label="Tên công việc"
                        name="taskName"
                        rules={[{ required: true, message: "Vui lòng nhập tên công việc" }]}
                    >
                        <Input placeholder="Nhập tên công việc" />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Người thực hiện"
                                name="assignee"
                                rules={[{ required: true, message: "Vui lòng chọn người thực hiện" }]}
                            >
                                <Select placeholder="Chọn người thực hiện">
                                    <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
                                    <Option value="Trần Thị B">Trần Thị B</Option>
                                    <Option value="Lê Văn C">Lê Văn C</Option>
                                    <Option value="Phạm Thị D">Phạm Thị D</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Độ ưu tiên"
                                name="priority"
                                rules={[{ required: true, message: "Vui lòng chọn độ ưu tiên" }]}
                            >
                                <Select placeholder="Chọn độ ưu tiên">
                                    <Option value="high">Cao</Option>
                                    <Option value="medium">Trung bình</Option>
                                    <Option value="low">Thấp</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Hạn hoàn thành"
                                name="deadline"
                                rules={[{ required: true, message: "Vui lòng chọn hạn hoàn thành" }]}
                            >
                                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                            </Form.Item>
                        </Col>
                        {selectedTask && (
                            <Col span={12}>
                                <Form.Item
                                    label="Trạng thái"
                                    name="status"
                                    rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                                >
                                    <Select placeholder="Chọn trạng thái">
                                        <Option value="pending">Chưa bắt đầu</Option>
                                        <Option value="in_progress">Đang thực hiện</Option>
                                        <Option value="completed">Hoàn thành</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        )}
                    </Row>
                    {selectedTask && (
                        <Form.Item
                            label="Tiến độ (%)"
                            name="progress"
                            rules={[{ required: true, message: "Vui lòng nhập tiến độ" }]}
                        >
                            <InputNumber
                                min={0}
                                max={100}
                                style={{ width: "100%" }}
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                            />
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Mô tả công việc"
                        name="description"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                    >
                        <TextArea rows={4} placeholder="Nhập mô tả chi tiết về công việc" />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                        <Space>
                            <Button onClick={() => setTaskModalVisible(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit">
                                {selectedTask ? "Cập nhật" : "Tạo mới"}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Target Modal (Department/Employee) */}
            <Modal
                title={
                    <Space>
                        <FileTextOutlined style={{ color: "#1677ff" }} />
                        <span>
                            {selectedTarget?.key 
                                ? `Cập nhật chỉ tiêu ${selectedTarget?.type === "department" ? "đơn vị" : "nhân viên"}`
                                : `Thêm chỉ tiêu ${selectedTarget?.type === "department" ? "đơn vị" : "nhân viên"}`
                            }
                        </span>
                    </Space>
                }
                open={targetModalVisible}
                onCancel={() => {
                    setTargetModalVisible(false);
                    targetForm.resetFields();
                }}
                footer={null}
                width={800}
            >
                <Form form={targetForm} layout="vertical" onFinish={handleTargetSubmit}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Kỳ"
                                name="quarter"
                                rules={[{ required: true, message: "Vui lòng nhập kỳ" }]}
                            >
                                <Input placeholder="Ví dụ: Q4/2024" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={selectedTarget?.type === "department" ? "Đơn vị" : "Phòng ban"}
                                name="department"
                                rules={[{ required: true, message: "Vui lòng chọn đơn vị/phòng ban" }]}
                            >
                                <Select placeholder="Chọn đơn vị/phòng ban">
                                    <Option value="P. Khách hàng">P. Khách hàng</Option>
                                    <Option value="P. KH&QLRR">P. KH&QLRR</Option>
                                    <Option value="P. Kế toán">P. Kế toán</Option>
                                    <Option value="P. Tổng hợp">P. Tổng hợp</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    {selectedTarget?.type === "employee" && (
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label="Mã nhân viên"
                                    name="employeeCode"
                                    rules={[{ required: true, message: "Vui lòng nhập mã NV" }]}
                                >
                                    <Input placeholder="Ví dụ: NV001" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Họ và tên"
                                    name="employeeName"
                                    rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                                >
                                    <Input placeholder="Nhập họ và tên" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Chức vụ"
                                    name="position"
                                    rules={[{ required: true, message: "Vui lòng chọn chức vụ" }]}
                                >
                                    <Select placeholder="Chọn chức vụ">
                                        <Option value="Trưởng phòng">Trưởng phòng</Option>
                                        <Option value="Phó phòng">Phó phòng</Option>
                                        <Option value="Chuyên viên">Chuyên viên</Option>
                                        <Option value="Chuyên viên KHDN">Chuyên viên KHDN</Option>
                                        <Option value="Giao dịch viên">Giao dịch viên</Option>
                                        <Option value="Kế toán viên">Kế toán viên</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    )}

                    <Divider>Chỉ tiêu</Divider>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Nguồn vốn (triệu đồng)"
                                name="capitalTarget"
                                rules={[{ required: true, message: "Vui lòng nhập chỉ tiêu" }]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    min={0}
                                    placeholder="Nhập số tiền"
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Dư nợ (triệu đồng)"
                                name="loanTarget"
                                rules={[{ required: true, message: "Vui lòng nhập chỉ tiêu" }]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    min={0}
                                    placeholder="Nhập số tiền"
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Dịch vụ (giao dịch)"
                                name="serviceTarget"
                                rules={[{ required: true, message: "Vui lòng nhập chỉ tiêu" }]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    min={0}
                                    placeholder="Số lượng"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Thẻ (cái)"
                                name="cardTarget"
                                rules={[{ required: true, message: "Vui lòng nhập chỉ tiêu" }]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    min={0}
                                    placeholder="Số lượng"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="E-Banking (khách hàng)"
                                name="ebankingTarget"
                                rules={[{ required: true, message: "Vui lòng nhập chỉ tiêu" }]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    min={0}
                                    placeholder="Số lượng"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Khách hàng mới"
                                name="newCustomerTarget"
                                rules={[{ required: true, message: "Vui lòng nhập chỉ tiêu" }]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    min={0}
                                    placeholder="Số lượng"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                        <Space>
                            <Button onClick={() => setTargetModalVisible(false)}>
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {selectedTarget?.key ? "Cập nhật" : "Thêm mới"}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Task Detail Modal */}
            <Modal
                title={
                    <Space>
                        <EyeOutlined style={{ color: "#1677ff" }} />
                        <span>Chi tiết công việc</span>
                    </Space>
                }
                open={taskDetailModalVisible}
                onCancel={() => setTaskDetailModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setTaskDetailModalVisible(false)}>
                        Đóng
                    </Button>,
                ]}
                width={700}
            >
                {selectedTask && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Tên công việc">{selectedTask.taskName}</Descriptions.Item>
                        <Descriptions.Item label="Người thực hiện">
                            <Space>
                                <UserOutlined />
                                {selectedTask.assignee}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Độ ưu tiên">
                            <Tag color={
                                selectedTask.priority === "high" ? "red" :
                                selectedTask.priority === "medium" ? "orange" : "blue"
                            }>
                                {selectedTask.priority === "high" ? "Cao" :
                                 selectedTask.priority === "medium" ? "Trung bình" : "Thấp"}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Hạn hoàn thành">
                            <Space>
                                <CalendarOutlined />
                                {selectedTask.deadline}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag color={
                                selectedTask.status === "completed" ? "success" :
                                selectedTask.status === "in_progress" ? "processing" : "default"
                            }>
                                {selectedTask.status === "completed" ? "Hoàn thành" :
                                 selectedTask.status === "in_progress" ? "Đang thực hiện" : "Chưa bắt đầu"}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tiến độ">
                            <Progress
                                percent={selectedTask.progress}
                                status={selectedTask.progress === 100 ? "success" : "active"}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Mô tả">
                            {selectedTask.description}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

        </div>
    );
};

export default SalaryV2Page;
