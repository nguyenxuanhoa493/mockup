# Hệ thống quản lý thù lao V2 - Agribank Chi nhánh Cần Giờ

## 📊 Tổng quan

Hệ thống đánh giá và tính lương thù lao V2 theo quy định của Agribank, với cấu trúc điểm tổng cộng **100 điểm** gồm:

### Cấu trúc điểm đánh giá:

| STT | Chỉ tiêu | Điểm | Người đánh giá |
|-----|----------|------|----------------|
| 1 | **Chỉ tiêu định lượng** | **60 điểm** | User tự cập nhật KPI hàng ngày |
| 1.1 | Tăng trưởng nguồn vốn | 15 điểm | |
| 1.2 | Dịch vụ | 40 điểm | |
| - | Doanh thu phí DV | 20 điểm | |
| - | Thẻ (số lượng, POS/QR, thu dịch vụ) | 10 điểm | |
| - | E-Banking (số lượng, thu dịch vụ) | 10 điểm | |
| 1.3 | Phát triển khách hàng mới | 5 điểm | |
| 2 | **Chỉ tiêu định tính** | **20 điểm** | Trưởng phòng đánh giá |
| 2.1 | Phong cách phục vụ khách hàng | 5 điểm | |
| 2.2 | Năng lực thực hiện nhiệm vụ | 5 điểm | |
| 2.3 | Học tập nâng cao trình độ | 5 điểm | |
| 2.4 | Chỉ tiêu định tính khác | 5 điểm | |
| 3 | **Chấp hành nội quy lao động và văn hóa Agribank** | **20 điểm** | Trưởng phòng đánh giá |
| | **TỔNG CỘNG** | **100 điểm** | |

---

## 🎯 Các Tab chức năng

### 1. **Tổng quan** 📈
- Hiển thị 4 card tổng hợp:
  - Điểm định lượng: ___ / 60
  - Điểm định tính: ___ / 20
  - Chấp hành nội quy: ___ / 20
  - Hệ số hiệu suất: ___ (tính từ tổng điểm)
- Trạng thái đánh giá 3 chỉ tiêu chính
- Biểu đồ tiến độ

### 2. **Chỉ tiêu định lượng (60đ)** 💰
- **Người thực hiện**: User tự nhập
- **Tần suất**: Cập nhật hàng ngày
- Bảng chi tiết với cấu trúc phân cấp:
  - STT (code)
  - Chỉ tiêu (có indent cho các mục con)
  - Đơn vị
  - KH giao (Kế hoạch)
  - TH trong quý (Thực hiện) - **User nhập trực tiếp**
  - % KH (Tỷ lệ hoàn thành)
  - Điểm chuẩn
- Nút: **Lưu KPI**, **Xuất Excel**

### 3. **Đăng ký nghiệp vụ** 📝
- **Mẫu 01**: Phiếu đăng ký huy động vốn
  - Validation: Đăng ký trước ít nhất 1 ngày với KH mới
- **Mẫu 02**: Phiếu đăng ký sản phẩm dịch vụ
  - Validation: Đăng ký trước 30-60 phút
- Danh sách phiếu với trạng thái (Pending/Approved/Rejected)

### 4. **Chỉ tiêu định tính (20đ)** ✍️
- **Người đánh giá**: Trưởng phòng
- Bảng chi tiết với cấu trúc phân cấp:
  - 2.1 Phong cách phục vụ KH (5đ)
  - 2.2 Năng lực thực hiện nhiệm vụ (5đ)
    - 2.2.1 Chương trình công tác (1đ)
    - 2.2.2 Mở TK, NHĐT (2đ)
    - 2.2.3 Thanh toán quốc tế (2đ)
  - 2.3 Học tập nâng cao trình độ (5đ)
  - 2.4 Chỉ tiêu định tính khác (5đ)
    - 2.4.1 Tinh thần phối hợp (3đ)
    - 2.4.2 Hoàn thành báo cáo (1đ)
    - 2.4.3 Lưu trữ hồ sơ (1đ)
- Trưởng phòng nhập điểm trực tiếp
- Tổng điểm tự động tính
- Nút: **Lưu tạm**, **Xác nhận đánh giá**

### 5. **Chấp hành nội quy (20đ)** ✅
- **Người đánh giá**: Trưởng phòng
- Đánh giá 4 khía cạnh:
  - Chấp hành giờ giấc làm việc
  - Tuân thủ quy định nội bộ
  - Văn hóa Agribank
  - Không vi phạm kỷ luật
- Progress bars cho từng tiêu chí
- Ghi chú đánh giá từ Trưởng phòng

### 6. **Phê duyệt** ✓
- Dành cho Quản lý/Admin
- Danh sách chờ phê duyệt

### 7. **Cấu hình** ⚙️
- Dành cho Admin
- Cấu hình hệ số V2 theo quý
- Quản lý quyết định kỷ luật

---

## 🔢 Công thức tính toán

### 1. Hệ số hiệu suất (Performance Factor)
```javascript
if (tổng_điểm >= 101 && tổng_điểm <= 120):
    hệ_số = 1.0 + (tổng_điểm - 100) / 100  // 1.01 - 1.20
elif (tổng_điểm >= 66 && tổng_điểm <= 100):
    hệ_số = tổng_điểm / 100                // 0.66 - 1.00
elif (tổng_điểm <= 65):
    hệ_số = 0.65
```

### 2. Thù lao cuối cùng
```javascript
Thù lao = (Hệ số V2 * Hệ số điều chỉnh + Hệ số thu hút) 
          * Hệ số hiệu suất 
          * Giá trị 1 hệ số V2
```

### 3. Điểm định lượng - Thưởng vượt chỉ tiêu
- **Nguồn vốn**: Tăng 1% so với KH → +1 điểm (max +10đ)
- **Dư nợ**: Tăng 10% so với KH → +1 điểm (max +5đ)

### 4. Điểm định lượng - Phạt giảm so kỳ gốc
- **Nguồn vốn**: Giảm 1% so với kỳ gốc → -1 điểm (min -5đ)
- **Dư nợ**: Giảm 10% so với kỳ gốc → -1 điểm (min -5đ)

---

## 📝 Data mẫu (Mock Data)

### Chỉ tiêu định lượng (mockKPIData)
- 11 records với cấu trúc phân cấp
- Các trường: code, targetName, unit, planned, actual, score, achievement, isParent, indent

### Chỉ tiêu định tính (mockQualitativeCriteria)
- 10 records với cấu trúc phân cấp
- Các trường: code, criteria, maxScore, managerScore, isParent, indent

### Phiếu đăng ký (mockRegistrations)
- Mẫu 01 và Mẫu 02
- Trạng thái: pending, approved, rejected

---

## 🎨 UI/UX Features

### Hiển thị phân cấp
- Sử dụng `indent` để tạo padding left
- `isParent = true` → **bold** text, không cho nhập số liệu
- `isParent = false` → normal text, có InputNumber để nhập

### Color coding
- **Điểm định lượng**: Blue (#1677ff)
- **Điểm định tính**: Green (#52c41a)
- **Chấp hành nội quy**: Purple (#722ed1)
- **Hệ số hiệu suất**: Orange (#fa8c16)

### Icons
- 🏆 Tổng quan: TrophyOutlined
- 📈 Chỉ tiêu định lượng: RiseOutlined
- 📝 Đăng ký nghiệp vụ: FileTextOutlined
- ✍️ Chỉ tiêu định tính: EditOutlined
- ✅ Chấp hành nội quy: CheckCircleOutlined
- 👤 Phê duyệt: UserOutlined
- ⚙️ Cấu hình: SettingOutlined

---

## 🚀 Truy cập

```
http://localhost:5173/#/salary-v2
```

Hoặc click menu **"Tính lương V2"** 💰 trên navigation bar.

---

## 📊 Dashboard Stats Demo

Điểm hiện tại (Mock data):
- Điểm định lượng: **58** / 60
- Điểm định tính: **17.5** / 20 (Trưởng phòng đã chấm)
- Chấp hành nội quy: **18.5** / 20
- **Tổng điểm**: **94** / 100
- **Hệ số hiệu suất**: **0.94**

---

## 🔧 Cần thực hiện tiếp

1. **Backend API**:
   - CRUD cho KPI targets
   - CRUD cho scoring sheets
   - CRUD cho registration forms
   - CRUD cho system configs
   
2. **Real-time calculation**:
   - Tự động tính % KH khi nhập TH trong quý
   - Tự động tính tổng điểm định tính
   - Tự động tính hệ số hiệu suất

3. **Validation**:
   - Validation thời gian đăng ký Mẫu 01, 02
   - Validation điểm không vượt quá max
   
4. **Export Excel**:
   - Xuất bảng KPI định lượng
   - Xuất bảng chấm điểm tổng hợp

5. **Email notifications**:
   - Thông báo khi có phiếu chờ duyệt
   - Thông báo khi hoàn thành đánh giá

---

Hệ thống đã sẵn sàng cho demo! ✨
