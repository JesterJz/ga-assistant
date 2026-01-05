# Product Specification – Phase 1 Demo
## AI Agentic RAG for Internal Enterprise Use

---

## Tổng quan
Hệ thống AI Agentic RAG nội bộ hỗ trợ nhân viên:
- Hỏi–đáp tài liệu
- Tra cứu thủ tục hành chính
- Nhận thông báo tự động

Hệ thống phải an toàn, không suy đoán, không trả lời vượt phạm vi dữ liệu.

---

## Use Case 1 – Hỏi đáp nội quy / quy trình (RAG Core)

### Mô tả
Nhân viên hỏi về nội quy, quy trình nội bộ.
AI trả lời dựa trên tài liệu nội bộ đã ingest.

### Ví dụ
User:
> Quy trình xin nghỉ phép như thế nào?

AI:
- Trả lời theo tài liệu
- Có danh sách bước
- Có trích nguồn (tên SOP)

---

## Use Case 2 – Hỏi thủ tục hành chính

### Mô tả
Nhân viên hỏi các thủ tục hành chính lặp lại.

### Ví dụ
User:
> Tôi cần giấy xác nhận công tác thì làm sao?

AI:
- Trả lời theo SOP / biểu mẫu
- Nêu thời gian xử lý
- Đính kèm mã form nếu có

---

## Use Case 3 – Onboarding nhân viên mới (Proactive)

### Mô tả
AI chủ động gửi thông tin onboarding khi được trigger.

### Yêu cầu
- Không cần scheduler thật
- Có thể trigger bằng API `/demo/onboarding`

### Nội dung message
- Chào mừng
- Link nội quy
- Link IT / HR

---

## Use Case 4 – Nhắc hợp đồng sắp hết hạn (Automation)

### Mô tả
AI gửi tin nhắn nhắc hợp đồng sắp hết hạn.

### Yêu cầu
- Cron job đơn giản (demo)
- Gửi Google Chat message dạng thông báo
- Không dùng AI reasoning cho phần này

---

## Use Case 5 – Hỏi ngoài phạm vi hiểu biết (Safety Fallback)

### Mô tả
Khi không tìm thấy tài liệu phù hợp, AI phải từ chối đúng cách.

### Ví dụ
User:
> Công ty mình có kế hoạch tăng lương năm nay không?

AI (BẮT BUỘC):
- Không suy đoán
- Không trả lời chung chung
- Trả lời lịch sự, an toàn
- Hướng dẫn liên hệ HR hoặc chờ thông báo chính thức

---

## Nguyên tắc trả lời chung
- Chỉ trả lời khi có dữ liệu
- Không bịa
- Không vượt quyền
- Có thể nói “không có thông tin”