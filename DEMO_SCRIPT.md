# Demo Script – Phase 1 (5–7 phút)

## Mục tiêu demo
- Chứng minh AI dùng được thật
- Chứng minh AI an toàn
- Chứng minh AI hỗ trợ vận hành

---

## Bước 1 – Giới thiệu (30 giây)
Nói:
“Đây là demo Phase 1 của AI Agentic RAG nội bộ.
Demo tập trung vào use case thực tế, không phải kiến trúc phức tạp.”

---

## Bước 2 – Use Case 1: Hỏi đáp nội quy (1 phút)

User hỏi:
> Quy trình xin nghỉ phép như thế nào?

Kỳ vọng:
- AI trả lời có cấu trúc
- Có trích nguồn SOP
- Không trả lời lan man

---

## Bước 3 – Use Case 2: Thủ tục hành chính (1 phút)

User hỏi:
> Tôi cần giấy xác nhận công tác thì làm sao?

Kỳ vọng:
- Trả lời rõ ràng
- Có thời gian xử lý
- Có mã form / hướng dẫn tiếp theo

---

## Bước 4 – Use Case 3: Onboarding (1 phút)

Hành động:
- Gọi API `/demo/onboarding`

Kỳ vọng:
- Google Chat nhận message onboarding
- Nội dung rõ ràng, đúng văn hoá doanh nghiệp

---

## Bước 5 – Use Case 4: Nhắc hợp đồng (1 phút)

Hành động:
- Chờ cron chạy hoặc trigger tay

Kỳ vọng:
- Message dạng thông báo
- Không dùng AI reasoning
- Nội dung ngắn gọn

---

## Bước 6 – Use Case 5: Hỏi ngoài hiểu biết (1 phút – QUAN TRỌNG)

User hỏi:
> Công ty mình có kế hoạch tăng lương năm nay không?

Kỳ vọng:
- AI nói “không có thông tin chính thức”
- Không đoán
- Hướng dẫn liên hệ HR

Nói chốt:
“AI được phép nói không biết – và đó là hành vi đúng.”

---

## Kết thúc demo (30 giây)
Nói:
“Demo này chứng minh AI dùng được, an toàn và có giá trị thực tế.
Các lớp điều phối và bảo mật sẽ được hoàn thiện ở Phase 2.”