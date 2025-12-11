import React, { useState } from "react";
import {
    Card,
    Upload,
    Button,
    Space,
    Typography,
    Input,
    Tabs,
    message,
    Row,
    Col,
    Divider,
    Alert,
    Tag,
    Modal,
    Spin,
} from "antd";
import {
    UploadOutlined,
    EyeOutlined,
    RobotOutlined,
    SaveOutlined,
    CodeOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    ThunderboltOutlined,
    CopyOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

const AI_TEMPLATES = [
    {
        key: "welcome",
        title: "Trang chào mừng khóa học",
        prompt: "Tạo trang HTML chào mừng học viên với giới thiệu về khóa học, mục tiêu học tập và lộ trình",
    },
    {
        key: "lesson",
        title: "Bài học: Kỹ năng giao tiếp hiệu quả",
        prompt: "Tạo trang HTML bài học về kỹ năng giao tiếp với 5 kỹ năng quan trọng, ví dụ thực tế và câu hỏi ôn tập",
    },
    {
        key: "quiz",
        title: "Trang bài kiểm tra",
        prompt: "Tạo trang HTML bài kiểm tra với câu hỏi trắc nghiệm, checkbox và nút nộp bài",
    },
    {
        key: "video",
        title: "Trang video bài giảng",
        prompt: "Tạo trang HTML với video player, transcript và ghi chú bên cạnh",
    },
];

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nội dung khóa học</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #1677ff;
            border-bottom: 3px solid #1677ff;
            padding-bottom: 10px;
        }
        h2 {
            color: #333;
            margin-top: 30px;
        }
        .highlight {
            background: #e6f7ff;
            padding: 15px;
            border-left: 4px solid #1677ff;
            margin: 20px 0;
        }
        .example {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 4px;
            margin: 15px 0;
        }
        .tip {
            background: #fffbe6;
            padding: 15px;
            border-left: 4px solid #faad14;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎓 Chào mừng đến với khóa học</h1>
        
        <div class="highlight">
            <strong>Mục tiêu khóa học:</strong> Giúp bạn nắm vững kiến thức cơ bản và áp dụng vào thực tế công việc.
        </div>

        <h2>📚 Nội dung chính</h2>
        <p>Trong khóa học này, bạn sẽ học được:</p>
        <ul>
            <li>Kiến thức nền tảng quan trọng</li>
            <li>Kỹ năng thực hành cần thiết</li>
            <li>Ứng dụng vào công việc thực tế</li>
            <li>Các case study thực tế</li>
        </ul>

        <h2>💡 Ví dụ minh họa</h2>
        <div class="example">
            <p><strong>Ví dụ 1:</strong> Áp dụng kiến thức vào tình huống cụ thể...</p>
            <p>Giải pháp: Sử dụng phương pháp ABC để giải quyết vấn đề XYZ.</p>
        </div>

        <div class="tip">
            <strong>💡 Mẹo học tập:</strong> Hãy luyện tập thường xuyên và áp dụng ngay vào công việc để ghi nhớ tốt hơn!
        </div>

        <h2>✅ Bài tập thực hành</h2>
        <ol>
            <li>Hoàn thành bài tập 1 về khái niệm cơ bản</li>
            <li>Thực hành case study trong tài liệu đính kèm</li>
            <li>Tham gia thảo luận nhóm</li>
        </ol>
    </div>
</body>
</html>`;

function AddHTMLToCoursePage() {
    const [htmlContent, setHtmlContent] = useState(DEFAULT_HTML);
    const [activeTab, setActiveTab] = useState("edit");
    const [aiPrompt, setAiPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [showAIModal, setShowAIModal] = useState(false);

    React.useEffect(() => {
        document.title = "Thêm HTML vào khóa học - Mockup App";
    }, []);

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            setHtmlContent(content);
            message.success(`Đã tải file ${file.name} thành công!`);
        };
        reader.readAsText(file);
        return false; // Prevent default upload behavior
    };

    const uploadProps = {
        name: "file",
        accept: ".html,.htm",
        beforeUpload: handleFileUpload,
        showUploadList: false,
    };

    const handleGenerateWithAI = (template) => {
        setIsGenerating(true);
        setShowAIModal(false);

        // Simulate AI generation
        setTimeout(() => {
            let generatedHTML = "";

            switch (template.key) {
                case "welcome":
                    generatedHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chào mừng đến với khóa học</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 40px 20px;
            min-height: 100vh;
        }
        .welcome-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #667eea;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-align: center;
        }
        .intro {
            background: #f0f7ff;
            padding: 25px;
            border-radius: 12px;
            margin: 30px 0;
            border-left: 5px solid #667eea;
        }
        .objectives {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .objective-card {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            transition: transform 0.3s;
        }
        .objective-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .cta-button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 15px 40px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 30px;
            transition: background 0.3s;
        }
        .cta-button:hover {
            background: #5568d3;
        }
    </style>
</head>
<body>
    <div class="welcome-container">
        <h1>🎓 Chào mừng bạn đến với khóa học!</h1>
        
        <div class="intro">
            <h2 style="color: #667eea; margin-top: 0;">Giới thiệu khóa học</h2>
            <p style="font-size: 1.1em; line-height: 1.8;">
                Khóa học này được thiết kế đặc biệt để giúp bạn phát triển kỹ năng và kiến thức 
                cần thiết trong môi trường làm việc hiện đại. Với phương pháp học tập tương tác 
                và thực hành, bạn sẽ nhanh chóng áp dụng được vào công việc thực tế.
            </p>
        </div>

        <h2 style="color: #333; text-align: center;">🎯 Mục tiêu học tập</h2>
        <div class="objectives">
            <div class="objective-card">
                <div style="font-size: 2em; margin-bottom: 10px;">📚</div>
                <h3 style="color: #667eea;">Kiến thức nền tảng</h3>
                <p>Nắm vững các khái niệm cơ bản và nâng cao</p>
            </div>
            <div class="objective-card">
                <div style="font-size: 2em; margin-bottom: 10px;">💡</div>
                <h3 style="color: #667eea;">Kỹ năng thực hành</h3>
                <p>Rèn luyện qua bài tập và case study</p>
            </div>
            <div class="objective-card">
                <div style="font-size: 2em; margin-bottom: 10px;">🚀</div>
                <h3 style="color: #667eea;">Ứng dụng thực tế</h3>
                <p>Áp dụng ngay vào công việc hàng ngày</p>
            </div>
        </div>

        <h2 style="color: #333;">📅 Lộ trình học tập</h2>
        <ol style="font-size: 1.1em; line-height: 2;">
            <li><strong>Tuần 1-2:</strong> Làm quen và nền tảng cơ bản</li>
            <li><strong>Tuần 3-4:</strong> Kiến thức nâng cao và thực hành</li>
            <li><strong>Tuần 5-6:</strong> Dự án thực tế và case study</li>
            <li><strong>Tuần 7:</strong> Tổng kết và nhận chứng chỉ</li>
        </ol>

        <div style="text-align: center; margin-top: 40px;">
            <a href="#" class="cta-button">Bắt đầu học ngay →</a>
        </div>
    </div>
</body>
</html>`;
                    break;

                case "lesson":
                    generatedHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài học - Kỹ năng giao tiếp</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.8;
            color: #333;
            background: #f8f9fa;
        }
        .header {
            background: linear-gradient(135deg, #1677ff 0%, #0958d9 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .container {
            max-width: 900px;
            margin: -30px auto 40px;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        h1 { font-size: 2em; margin-bottom: 10px; }
        h2 {
            color: #1677ff;
            margin-top: 40px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e8e8e8;
        }
        .theory-box {
            background: #f0f7ff;
            padding: 25px;
            border-radius: 8px;
            margin: 25px 0;
            border-left: 4px solid #1677ff;
        }
        .skill-item {
            background: white;
            padding: 15px;
            margin: 15px 0;
            border-radius: 6px;
            border-left: 3px solid #1677ff;
        }
        .example-box {
            background: #f6ffed;
            padding: 25px;
            border-radius: 8px;
            margin: 25px 0;
            border-left: 4px solid #52c41a;
        }
        .tip-box {
            background: #fffbe6;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            border-left: 4px solid #faad14;
        }
        .quiz-section {
            background: #fff7e6;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
        }
        .quiz-question {
            margin: 20px 0;
            padding: 15px;
            background: white;
            border-radius: 6px;
        }
        .highlight {
            background: #e6f7ff;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 500;
        }
        ul, ol { margin-left: 25px; margin-top: 10px; }
        li { margin: 8px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>💬 Bài 1: Kỹ năng giao tiếp hiệu quả</h1>
        <p>Thời gian học: 45 phút | Độ khó: Cơ bản</p>
    </div>

    <div class="container">
        <h2>📚 Lý thuyết cơ bản</h2>
        <div class="theory-box">
            <h3 style="color: #1677ff; margin-bottom: 15px;">Giao tiếp hiệu quả là gì?</h3>
            <p>
                <strong>Định nghĩa:</strong> Giao tiếp hiệu quả là khả năng truyền đạt thông điệp, 
                ý tưởng và cảm xúc một cách rõ ràng, chính xác đến người khác, đồng thời lắng nghe 
                và thấu hiểu những gì họ muốn chia sẻ.
            </p>
            <p style="margin-top: 15px;">
                Trong môi trường làm việc, giao tiếp hiệu quả giúp:
            </p>
            <ul>
                <li>Xây dựng mối quan hệ tốt với đồng nghiệp và khách hàng</li>
                <li>Giảm thiểu hiểu lầm và xung đột</li>
                <li>Tăng năng suất và hiệu quả công việc</li>
                <li>Phát triển sự nghiệp và cơ hội thăng tiến</li>
            </ul>
        </div>

        <h2>🎯 5 kỹ năng giao tiếp quan trọng</h2>
        
        <div class="skill-item">
            <h4 style="color: #1677ff; margin-bottom: 10px;">1. 👂 Lắng nghe tích cực</h4>
            <p>
                Lắng nghe không chỉ là nghe những gì người khác nói, mà còn là <span class="highlight">chú ý đến ngôn ngữ cơ thể, 
                giọng điệu và cảm xúc</span> của họ. Hãy tập trung 100% vào người đang nói, không ngắt lời và đặt câu hỏi 
                để hiểu rõ hơn.
            </p>
        </div>

        <div class="skill-item">
            <h4 style="color: #1677ff; margin-bottom: 10px;">2. 💬 Giao tiếp rõ ràng và súc tích</h4>
            <p>
                Truyền đạt thông điệp một cách <span class="highlight">đơn giản, dễ hiểu</span>. Tránh sử dụng thuật ngữ phức tạp 
                hoặc câu văn dài dòng. Đi thẳng vào vấn đề và đảm bảo người nghe hiểu đúng ý của bạn.
            </p>
        </div>

        <div class="skill-item">
            <h4 style="color: #1677ff; margin-bottom: 10px;">3. 🤝 Thấu hiểu và đồng cảm</h4>
            <p>
                Đặt mình vào vị trí của người khác để <span class="highlight">hiểu cảm xúc và quan điểm</span> của họ. 
                Thấu hiểu giúp bạn phản hồi phù hợp và xây dựng mối quan hệ tin cậy.
            </p>
        </div>

        <div class="skill-item">
            <h4 style="color: #1677ff; margin-bottom: 10px;">4. 😊 Ngôn ngữ cơ thể tích cực</h4>
            <p>
                Ánh mắt, nụ cười, tư thế đứng/ngồi đều ảnh hưởng đến hiệu quả giao tiếp. 
                <span class="highlight">Giao tiếp phi ngôn ngữ</span> có thể mạnh mẽ hơn cả lời nói.
            </p>
        </div>

        <div class="skill-item">
            <h4 style="color: #1677ff; margin-bottom: 10px;">5. ❓ Đặt câu hỏi mở</h4>
            <p>
                Thay vì câu hỏi đóng (có/không), hãy dùng <span class="highlight">câu hỏi mở</span> bắt đầu bằng 
                "Như thế nào", "Tại sao", "Anh/chị nghĩ gì về..." để khuyến khích đối phương chia sẻ nhiều hơn.
            </p>
        </div>

        <h2>💡 Ví dụ thực tế</h2>
        <div class="example-box">
            <h3 style="color: #52c41a; margin-bottom: 15px;">Tình huống: Giao tiếp với khách hàng khó tính</h3>
            <p>
                <strong>Bối cảnh:</strong> Khách hàng gọi điện phàn nàn về sản phẩm bị lỗi và tỏ ra rất khó chịu.
            </p>
            <p style="margin-top: 15px;">
                <strong>❌ Cách giao tiếp SAI:</strong>
            </p>
            <ul>
                <li>"Sản phẩm của chúng tôi không có vấn đề gì, chắc do anh/chị sử dụng sai."</li>
                <li>"Tôi không thể giúp được gì trong trường hợp này."</li>
                <li>Ngắt lời khách hàng khi họ đang giải thích</li>
            </ul>
            
            <p style="margin-top: 15px;">
                <strong>✅ Cách giao tiếp ĐÚNG:</strong>
            </p>
            <ol>
                <li><strong>Lắng nghe:</strong> "Tôi rất tiếc khi nghe điều này. Anh/chị có thể cho tôi biết chi tiết về vấn đề không?"</li>
                <li><strong>Thấu hiểu:</strong> "Tôi hiểu cảm giác khó chịu của anh/chị khi sản phẩm gặp sự cố."</li>
                <li><strong>Giải quyết:</strong> "Chúng tôi sẽ kiểm tra ngay và đổi sản phẩm mới cho anh/chị trong vòng 24h."</li>
                <li><strong>Follow-up:</strong> "Tôi sẽ gọi lại để đảm bảo mọi thứ đã ổn. Cảm ơn anh/chị đã phản hồi."</li>
            </ol>
            <p style="margin-top: 15px;">
                <strong>Kết quả:</strong> Khách hàng cảm thấy được quan tâm, vấn đề được giải quyết nhanh chóng 
                và họ tiếp tục tin tưởng công ty.
            </p>
        </div>

        <div class="tip-box">
            <h4 style="color: #faad14; margin-bottom: 10px;">💡 Mẹo thực hành</h4>
            <ul>
                <li><strong>Quy tắc 7-38-55:</strong> 7% từ ngữ, 38% giọng điệu, 55% ngôn ngữ cơ thể</li>
                <li><strong>Kỹ thuật "LISTEN":</strong> Look (nhìn), Inquire (hỏi), Stay (ở lại), Take notes (ghi chép), 
                Empathize (thấu hiểu), Neutralize (trung lập)</li>
                <li><strong>Luyện tập hàng ngày:</strong> Thực hành với đồng nghiệp, bạn bè hoặc trước gương</li>
            </ul>
        </div>

        <h2>✍️ Câu hỏi ôn tập</h2>
        <div class="quiz-section">
            <div class="quiz-question">
                <p><strong>Câu 1:</strong> Kỹ năng giao tiếp nào là quan trọng nhất trong 5 kỹ năng đã học?</p>
                <div style="margin-top: 10px;">
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q1" value="a"> A. Giao tiếp rõ ràng
                    </label>
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q1" value="b"> B. Lắng nghe tích cực ✓
                    </label>
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q1" value="c"> C. Đặt câu hỏi mở
                    </label>
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q1" value="d"> D. Tất cả đều quan trọng như nhau
                    </label>
                </div>
            </div>

            <div class="quiz-question">
                <p><strong>Câu 2:</strong> Theo quy tắc 7-38-55, yếu tố nào chiếm tỷ lệ lớn nhất trong giao tiếp?</p>
                <div style="margin-top: 10px;">
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q2" value="a"> A. Từ ngữ (7%)
                    </label>
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q2" value="b"> B. Giọng điệu (38%)
                    </label>
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q2" value="c"> C. Ngôn ngữ cơ thể (55%) ✓
                    </label>
                </div>
            </div>

            <div class="quiz-question">
                <p><strong>Câu 3:</strong> Khi khách hàng phàn nàn, điều đầu tiên bạn nên làm là gì?</p>
                <div style="margin-top: 10px;">
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q3" value="a"> A. Giải thích lý do
                    </label>
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q3" value="b"> B. Lắng nghe và thấu hiểu ✓
                    </label>
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q3" value="c"> C. Đưa ra giải pháp ngay
                    </label>
                    <label style="display: block; margin: 8px 0;">
                        <input type="radio" name="q3" value="d"> D. Chuyển cho người khác xử lý
                    </label>
                </div>
            </div>
        </div>

        <div style="text-align: center; margin-top: 40px;">
            <button style="background: #1677ff; color: white; border: none; padding: 12px 30px; border-radius: 6px; font-size: 16px; cursor: pointer;">
                Hoàn thành bài học →
            </button>
        </div>
    </div>
</body>
</html>`;
                    break;

                case "quiz":
                    generatedHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài kiểm tra</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            margin: 0;
        }
        .quiz-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .quiz-header {
            background: linear-gradient(135deg, #fa8c16 0%, #fa541c 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .quiz-body {
            padding: 40px;
        }
        .question-card {
            background: #fafafa;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 25px;
            border: 2px solid #e8e8e8;
            transition: border-color 0.3s;
        }
        .question-card:hover {
            border-color: #fa8c16;
        }
        .question-title {
            font-size: 1.2em;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
        }
        .option {
            display: block;
            padding: 12px 15px;
            margin: 10px 0;
            background: white;
            border: 2px solid #e8e8e8;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .option:hover {
            border-color: #fa8c16;
            background: #fff7e6;
        }
        input[type="radio"], input[type="checkbox"] {
            margin-right: 10px;
        }
        .submit-section {
            text-align: center;
            padding: 30px;
            border-top: 2px solid #e8e8e8;
        }
        .submit-btn {
            background: #fa8c16;
            color: white;
            border: none;
            padding: 15px 50px;
            font-size: 18px;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .submit-btn:hover {
            background: #fa541c;
        }
        .timer {
            background: #fff7e6;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.2em;
            color: #fa8c16;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="quiz-container">
        <div class="quiz-header">
            <h1>📝 Bài kiểm tra cuối khóa</h1>
            <p>Tổng số câu: 5 | Thời gian: 30 phút | Điểm đạt: 7/10</p>
        </div>

        <div class="quiz-body">
            <div class="timer">⏱️ Thời gian còn lại: 29:45</div>

            <div class="question-card">
                <div class="question-title">Câu 1: Khái niệm nào dưới đây là chính xác?</div>
                <label class="option">
                    <input type="radio" name="q1" value="a">
                    A. Đáp án thứ nhất về khái niệm cơ bản
                </label>
                <label class="option">
                    <input type="radio" name="q1" value="b">
                    B. Đáp án thứ hai về định nghĩa chính xác
                </label>
                <label class="option">
                    <input type="radio" name="q1" value="c">
                    C. Đáp án thứ ba về cách hiểu khác
                </label>
                <label class="option">
                    <input type="radio" name="q1" value="d">
                    D. Đáp án thứ tư về quan điểm khác
                </label>
            </div>

            <div class="question-card">
                <div class="question-title">Câu 2: Chọn tất cả các đáp án đúng về quy trình làm việc?</div>
                <label class="option">
                    <input type="checkbox" name="q2" value="a">
                    A. Bước phân tích và lập kế hoạch
                </label>
                <label class="option">
                    <input type="checkbox" name="q2" value="b">
                    B. Bước thực hiện và giám sát
                </label>
                <label class="option">
                    <input type="checkbox" name="q2" value="c">
                    C. Bước đánh giá và cải tiến
                </label>
                <label class="option">
                    <input type="checkbox" name="q2" value="d">
                    D. Bỏ qua feedback khách hàng
                </label>
            </div>

            <div class="question-card">
                <div class="question-title">Câu 3: Trong tình huống bán hàng, kỹ năng nào quan trọng nhất?</div>
                <label class="option">
                    <input type="radio" name="q3" value="a">
                    A. Lắng nghe tích cực
                </label>
                <label class="option">
                    <input type="radio" name="q3" value="b">
                    B. Nói nhiều về sản phẩm
                </label>
                <label class="option">
                    <input type="radio" name="q3" value="c">
                    C. Tập trung vào giá cả
                </label>
                <label class="option">
                    <input type="radio" name="q3" value="d">
                    D. Thuyết phục mạnh mẽ
                </label>
            </div>

            <div class="question-card">
                <div class="question-title">Câu 4: Chọn các yếu tố của giao tiếp hiệu quả?</div>
                <label class="option">
                    <input type="checkbox" name="q4" value="a">
                    A. Ngôn ngữ cơ thể tích cực
                </label>
                <label class="option">
                    <input type="checkbox" name="q4" value="b">
                    B. Giọng nói rõ ràng, tự tin
                </label>
                <label class="option">
                    <input type="checkbox" name="q4" value="c">
                    C. Tương tác hai chiều
                </label>
                <label class="option">
                    <input type="checkbox" name="q4" value="d">
                    D. Chỉ nói một chiều
                </label>
            </div>

            <div class="question-card">
                <div class="question-title">Câu 5: Làm thế nào để xử lý phản đối của khách hàng?</div>
                <label class="option">
                    <input type="radio" name="q5" value="a">
                    A. Tranh luận để chứng minh mình đúng
                </label>
                <label class="option">
                    <input type="radio" name="q5" value="b">
                    B. Lắng nghe, thấu hiểu và đưa ra giải pháp
                </label>
                <label class="option">
                    <input type="radio" name="q5" value="c">
                    C. Bỏ qua và chuyển sang khách khác
                </label>
                <label class="option">
                    <input type="radio" name="q5" value="d">
                    D. Giảm giá ngay lập tức
                </label>
            </div>
        </div>

        <div class="submit-section">
            <button class="submit-btn" onclick="alert('Bài thi đã được nộp! Điểm của bạn: 9/10')">
                Nộp bài →
            </button>
        </div>
    </div>
</body>
</html>`;
                    break;

                case "video":
                    generatedHTML = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video bài giảng</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000;
            color: #fff;
        }
        .video-page {
            display: flex;
            height: 100vh;
        }
        .video-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #181818;
        }
        .video-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            padding: 20px;
        }
        .video-placeholder {
            width: 100%;
            max-width: 1200px;
            aspect-ratio: 16/9;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3em;
        }
        .video-info {
            padding: 20px 30px;
            background: #282828;
        }
        .video-title {
            font-size: 1.5em;
            margin-bottom: 10px;
        }
        .sidebar {
            width: 400px;
            background: #212121;
            overflow-y: auto;
            border-left: 1px solid #333;
        }
        .tabs {
            display: flex;
            background: #181818;
            border-bottom: 1px solid #333;
        }
        .tab {
            flex: 1;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
        }
        .tab:hover {
            background: #282828;
        }
        .tab.active {
            border-bottom-color: #667eea;
            background: #212121;
        }
        .tab-content {
            padding: 20px;
        }
        .transcript-item {
            margin-bottom: 20px;
            padding: 15px;
            background: #282828;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .transcript-item:hover {
            background: #333;
        }
        .timestamp {
            color: #667eea;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .note-box {
            background: #282828;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 15px;
        }
        textarea {
            width: 100%;
            min-height: 100px;
            background: #181818;
            color: #fff;
            border: 1px solid #333;
            border-radius: 4px;
            padding: 10px;
            font-family: inherit;
            resize: vertical;
        }
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        button:hover {
            background: #5568d3;
        }
        @media (max-width: 768px) {
            .video-page {
                flex-direction: column;
            }
            .sidebar {
                width: 100%;
                height: 300px;
            }
        }
    </style>
</head>
<body>
    <div class="video-page">
        <div class="video-section">
            <div class="video-container">
                <div class="video-placeholder">
                    ▶️ Video Player
                </div>
            </div>
            <div class="video-info">
                <div class="video-title">📹 Bài giảng: Kỹ năng giao tiếp hiệu quả</div>
                <p style="color: #aaa;">Thời lượng: 45:30 | Giảng viên: Nguyễn Văn A</p>
            </div>
        </div>

        <div class="sidebar">
            <div class="tabs">
                <div class="tab active" onclick="showTab('transcript')">Transcript</div>
                <div class="tab" onclick="showTab('notes')">Ghi chú</div>
            </div>

            <div id="transcript" class="tab-content">
                <h3 style="margin-bottom: 15px;">📝 Nội dung bài giảng</h3>
                
                <div class="transcript-item" onclick="alert('Chuyển đến thời điểm 00:00')">
                    <div class="timestamp">00:00 - 02:30</div>
                    <p>Giới thiệu về khóa học và mục tiêu bài giảng. Chào mừng các bạn đến với khóa học kỹ năng giao tiếp hiệu quả.</p>
                </div>

                <div class="transcript-item" onclick="alert('Chuyển đến thời điểm 02:30')">
                    <div class="timestamp">02:30 - 08:15</div>
                    <p>Phần 1: Tầm quan trọng của giao tiếp trong công việc. Giao tiếp tốt giúp tăng hiệu suất làm việc nhóm và xây dựng mối quan hệ.</p>
                </div>

                <div class="transcript-item" onclick="alert('Chuyển đến thời điểm 08:15')">
                    <div class="timestamp">08:15 - 15:45</div>
                    <p>Phần 2: Các kỹ năng giao tiếp cơ bản. Bao gồm lắng nghe tích cực, đặt câu hỏi mở và ngôn ngữ cơ thể.</p>
                </div>

                <div class="transcript-item" onclick="alert('Chuyển đến thời điểm 15:45')">
                    <div class="timestamp">15:45 - 25:00</div>
                    <p>Phần 3: Thực hành qua ví dụ cụ thể. Chúng ta sẽ phân tích một số tình huống thực tế trong công việc.</p>
                </div>

                <div class="transcript-item" onclick="alert('Chuyển đến thời điểm 25:00')">
                    <div class="timestamp">25:00 - 35:30</div>
                    <p>Phần 4: Xử lý các tình huống khó khăn. Làm thế nào để giao tiếp hiệu quả khi gặp phản đối hoặc xung đột.</p>
                </div>

                <div class="transcript-item" onclick="alert('Chuyển đến thời điểm 35:30')">
                    <div class="timestamp">35:30 - 45:30</div>
                    <p>Tổng kết và Q&A. Ôn tập lại các điểm chính và giải đáp thắc mắc của học viên.</p>
                </div>
            </div>

            <div id="notes" class="tab-content" style="display: none;">
                <h3 style="margin-bottom: 15px;">✍️ Ghi chú của bạn</h3>
                
                <div class="note-box">
                    <div style="color: #667eea; margin-bottom: 5px;">📌 Ghi chú tại 08:15</div>
                    <p>Lắng nghe tích cực là kỹ năng quan trọng nhất. Cần chú ý đến cả lời nói và ngôn ngữ cơ thể.</p>
                </div>

                <div class="note-box">
                    <div style="color: #667eea; margin-bottom: 5px;">📌 Ghi chú tại 15:45</div>
                    <p>Ví dụ về xử lý phản đối: Lắng nghe → Thấu hiểu → Đưa ra giải pháp. Không tranh luận!</p>
                </div>

                <h4 style="margin: 20px 0 10px;">Thêm ghi chú mới:</h4>
                <textarea placeholder="Nhập ghi chú của bạn..."></textarea>
                <button>💾 Lưu ghi chú</button>
            </div>
        </div>
    </div>

    <script>
        function showTab(tabName) {
            // Hide all tabs
            document.getElementById('transcript').style.display = 'none';
            document.getElementById('notes').style.display = 'none';
            
            // Show selected tab
            document.getElementById(tabName).style.display = 'block';
            
            // Update active tab styling
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
        }
    </script>
</body>
</html>`;
                    break;

                default:
                    generatedHTML = DEFAULT_HTML;
            }

            setHtmlContent(generatedHTML);
            setIsGenerating(false);
            message.success(`Đã tạo nội dung HTML: "${template.title}"`);
        }, 2000);
    };

    const handleCustomAIPrompt = () => {
        if (!aiPrompt.trim()) {
            message.warning("Vui lòng nhập mô tả nội dung");
            return;
        }

        setIsGenerating(true);
        setShowAIModal(false);

        setTimeout(() => {
            message.success("Đã tạo nội dung HTML từ mô tả của bạn!");
            setIsGenerating(false);
            setAiPrompt("");
        }, 2500);
    };

    const handleSave = () => {
        message.success("Đã lưu nội dung HTML vào khóa học thành công!");
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(htmlContent);
        message.success("Đã sao chép code HTML!");
    };

    const highlightHTML = (code) => {
        let highlighted = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Comments - Green
        highlighted = highlighted.replace(
            /(&lt;!--[\s\S]*?--&gt;)/g,
            '<span style="color: #6A9955; font-style: italic;">$1</span>'
        );

        // Doctype - Blue
        highlighted = highlighted.replace(
            /(&lt;!DOCTYPE[^&]*&gt;)/gi,
            '<span style="color: #569CD6;">$1</span>'
        );

        // CSS in style tags
        highlighted = highlighted.replace(
            /(&lt;style[^&]*&gt;)([\s\S]*?)(&lt;\/style&gt;)/gi,
            function(match, openTag, content, closeTag) {
                return openTag.replace(/(&lt;\/?)(style)/gi, '$1<span style="color: #4EC9B0;">$2</span>') + 
                       '<span style="color: #CE9178;">' + content + '</span>' + 
                       closeTag.replace(/(&lt;\/?)(style)/gi, '$1<span style="color: #4EC9B0;">$2</span>');
            }
        );

        // Script content
        highlighted = highlighted.replace(
            /(&lt;script[^&]*&gt;)([\s\S]*?)(&lt;\/script&gt;)/gi,
            function(match, openTag, content, closeTag) {
                return openTag.replace(/(&lt;\/?)(script)/gi, '$1<span style="color: #4EC9B0;">$2</span>') + 
                       '<span style="color: #DCDCAA;">' + content + '</span>' + 
                       closeTag.replace(/(&lt;\/?)(script)/gi, '$1<span style="color: #4EC9B0;">$2</span>');
            }
        );

        // HTML tags - Blue/Teal
        highlighted = highlighted.replace(
            /(&lt;\/?)(html|head|body|meta|title|link)/gi,
            '$1<span style="color: #569CD6;">$2</span>'
        );
        
        highlighted = highlighted.replace(
            /(&lt;\/?)(div|span|p|h[1-6]|ul|ol|li|a|button|input|textarea|select|option|form|label|table|tr|td|th|thead|tbody|section|article|header|footer|nav|aside|main)/gi,
            '$1<span style="color: #4EC9B0;">$2</span>'
        );

        highlighted = highlighted.replace(
            /(&lt;\/?)(strong|em|b|i|u|code|pre|br|hr)/gi,
            '$1<span style="color: #4EC9B0;">$2</span>'
        );

        // Attributes - Light Blue
        highlighted = highlighted.replace(
            /([\w-]+)(?==)/g,
            '<span style="color: #9CDCFE;">$1</span>'
        );

        // Attribute values - Orange
        highlighted = highlighted.replace(
            /=&quot;([^&]*?)&quot;/g,
            '=<span style="color: #CE9178;">&quot;$1&quot;</span>'
        );

        return highlighted;
    };

    const editorTab = (
        <div 
            style={{ 
                height: "calc(100vh - 300px)", 
                position: "relative",
                background: "#1e1e1e",
                borderRadius: "8px",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "#1e1e1e",
                    overflow: "auto",
                    padding: "16px 16px 16px 50px",
                }}
            >
                <pre
                    style={{
                        margin: 0,
                        fontFamily: "'Fira Code', 'Courier New', Consolas, monospace",
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#d4d4d4",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        pointerEvents: "none",
                        minHeight: "100%",
                    }}
                    dangerouslySetInnerHTML={{ __html: highlightHTML(htmlContent) }}
                />
            </div>
            <TextArea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "100%",
                    fontFamily: "'Fira Code', 'Courier New', Consolas, monospace",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "transparent",
                    caretColor: "#528bff",
                    background: "transparent",
                    border: "none",
                    padding: "16px 16px 16px 50px",
                    resize: "none",
                    outline: "none",
                    WebkitTextFillColor: "transparent",
                }}
                placeholder="Nhập hoặc chỉnh sửa code HTML..."
                spellCheck={false}
            />
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "40px",
                    height: "100%",
                    background: "#1e1e1e",
                    borderRight: "1px solid #3e3e42",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "16px",
                    color: "#858585",
                    fontSize: "12px",
                    fontFamily: "'Fira Code', 'Courier New', Consolas, monospace",
                    lineHeight: "1.6",
                    pointerEvents: "none",
                }}
            >
                {htmlContent.split('\n').map((_, i) => (
                    <div key={i} style={{ height: "22.4px" }}>
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );

    const previewTab = (
        <div
            style={{
                height: "calc(100vh - 300px)",
                overflow: "auto",
                background: "#fff",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
            }}
        >
            <iframe
                srcDoc={htmlContent}
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                }}
                title="HTML Preview"
            />
        </div>
    );

    return (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                }}
            >
                <Title level={2} style={{ margin: 0 }}>
                    <FileTextOutlined style={{ marginRight: 8 }} />
                    Thêm nội dung HTML vào khóa học
                </Title>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={8}>
                    <Space direction="vertical" style={{ width: "100%" }} size="large">
                        <Card
                            title="1️⃣ Tạo nội dung"
                            size="small"
                            extra={
                                <Tag color="blue" icon={<ThunderboltOutlined />}>
                                    AI-Powered
                                </Tag>
                            }
                        >
                            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                <Dragger {...uploadProps}>
                                    <p className="ant-upload-drag-icon">
                                        <UploadOutlined style={{ color: "#1677ff" }} />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click hoặc kéo file HTML vào đây
                                    </p>
                                    <p className="ant-upload-hint">
                                        Hỗ trợ file .html, .htm
                                    </p>
                                </Dragger>

                                <Divider>HOẶC</Divider>

                                <Button
                                    type="primary"
                                    icon={<RobotOutlined />}
                                    block
                                    size="large"
                                    onClick={() => setShowAIModal(true)}
                                >
                                    Tạo bằng AI
                                </Button>

                                {isGenerating && (
                                    <Alert
                                        message="Đang tạo nội dung..."
                                        description="AI đang tạo HTML content cho bạn"
                                        type="info"
                                        showIcon
                                        icon={<Spin />}
                                    />
                                )}
                            </Space>
                        </Card>

                        <Card title="2️⃣ Lưu nội dung" size="small">
                            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                <Button
                                    type="primary"
                                    icon={<SaveOutlined />}
                                    block
                                    size="large"
                                    onClick={handleSave}
                                >
                                    Lưu vào khóa học
                                </Button>

                                <Button
                                    icon={<CopyOutlined />}
                                    block
                                    onClick={handleCopyCode}
                                >
                                    Sao chép code HTML
                                </Button>
                            </Space>
                        </Card>

                        <Alert
                            message="💡 Hướng dẫn"
                            description={
                                <ul style={{ margin: 0, paddingLeft: 20 }}>
                                    <li>Upload file HTML có sẵn</li>
                                    <li>Tạo bằng AI với các template</li>
                                    <li>Chỉnh sửa trong tab Editor (có syntax highlighting)</li>
                                    <li>Xem trước kết quả trong tab Preview</li>
                                    <li>Lưu vào khóa học</li>
                                </ul>
                            }
                            type="info"
                            showIcon
                        />
                    </Space>
                </Col>

                <Col xs={24} lg={16}>
                    <Card
                        title={
                            <Space>
                                <CodeOutlined />
                                <span>HTML Editor & Preview</span>
                            </Space>
                        }
                        bodyStyle={{ padding: 0 }}
                    >
                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            items={[
                                {
                                    key: "edit",
                                    label: (
                                        <span>
                                            <CodeOutlined /> Editor
                                        </span>
                                    ),
                                    children: <div style={{ padding: 16 }}>{editorTab}</div>,
                                },
                                {
                                    key: "preview",
                                    label: (
                                        <span>
                                            <EyeOutlined /> Preview
                                        </span>
                                    ),
                                    children: <div style={{ padding: 16 }}>{previewTab}</div>,
                                },
                            ]}
                            tabBarExtraContent={
                                <Tag color={activeTab === "edit" ? "blue" : "green"}>
                                    {activeTab === "edit" ? "Chế độ chỉnh sửa với syntax highlighting" : "Xem trước kết quả"}
                                </Tag>
                            }
                        />
                    </Card>
                </Col>
            </Row>

            <Modal
                title={
                    <Space>
                        <RobotOutlined style={{ color: "#1677ff" }} />
                        <span>Tạo nội dung HTML bằng AI</span>
                    </Space>
                }
                open={showAIModal}
                onCancel={() => setShowAIModal(false)}
                footer={null}
                width={700}
            >
                <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <div>
                        <Title level={5}>Chọn template có sẵn:</Title>
                        <Row gutter={[12, 12]}>
                            {AI_TEMPLATES.map((template) => (
                                <Col span={12} key={template.key}>
                                    <Card
                                        hoverable
                                        size="small"
                                        onClick={() => handleGenerateWithAI(template)}
                                        style={{ height: "100%" }}
                                    >
                                        <Space direction="vertical" size={4}>
                                            <Text strong>{template.title}</Text>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                {template.prompt}
                                            </Text>
                                        </Space>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <Divider>HOẶC</Divider>

                    <div>
                        <Title level={5}>Tạo từ mô tả của bạn:</Title>
                        <TextArea
                            rows={4}
                            placeholder="Ví dụ: Tạo trang HTML giới thiệu về công ty với logo, thông tin liên hệ và Google Maps..."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                        />
                        <Button
                            type="primary"
                            icon={<RobotOutlined />}
                            block
                            size="large"
                            style={{ marginTop: 12 }}
                            onClick={handleCustomAIPrompt}
                        >
                            Tạo nội dung
                        </Button>
                    </div>
                </Space>
            </Modal>
        </div>
    );
}

export default AddHTMLToCoursePage;
