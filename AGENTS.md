# Agent Instructions – Phase 1 Demo (AI Agentic RAG)

## Mục tiêu
Xây dựng một DEMO CHẠY ĐƯỢC cho Phase 1 của hệ thống AI Agentic RAG nội bộ.
Demo tập trung vào use case thực tế, không yêu cầu kiến trúc đầy đủ như production.

## Nguyên tắc bắt buộc
- Ưu tiên demo kết quả thực tế, không over-engineering
- Không xây full multi-agent architecture
- Không cần LangGraph đầy đủ
- Có thể dùng rule-based + lightweight LLM
- Hệ thống phải chạy local được
- Code rõ ràng, dễ đọc, dễ thay thế ở Phase 2

## Phạm vi kỹ thuật
- Interface: Google Chat Bot (Webhook)
- Backend: Node.js (Express)
- AI: LLM API (OpenAI / Azure)
- Knowledge: RAG (vector search)
- Vector DB: Qdrant (ưu tiên) hoặc mock tạm nếu cần
- Automation: Cron job / manual trigger

## BẮT BUỘC CÓ
1. Webhook nhận message từ Google Chat
2. Intent routing (rule-based trước, LLM classify nếu cần)
3. RAG hỏi–đáp tài liệu nội bộ
4. Fallback an toàn khi không có dữ liệu phù hợp
5. Gửi tin nhắn chủ động (onboarding, nhắc hợp đồng)
6. Logging cơ bản (request / response / lỗi)

## KHÔNG LÀM Ở PHASE 1
- Không fine-tune model
- Không RBAC phức tạp
- Không Web UI
- Không workflow phê duyệt

## Deliverables
- Code chạy được
- README.md hướng dẫn setup
- .env.example
- Script demo theo kịch bản đã định nghĩa