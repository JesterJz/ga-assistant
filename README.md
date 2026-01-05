# Phase 1 Demo - AI Agentic RAG

## Overview
Minimal demo for Phase 1:
- Google Chat webhook -> intent routing -> RAG answer
- Safe fallback for out-of-scope questions
- Proactive onboarding + contract reminder
- Basic logging

## Requirements
- Node.js 18+
- (Optional) Google Chat incoming webhook URL

## Setup
```bash
cp .env.example .env
npm install
npm start
```

## Endpoints
- `POST /webhook` - Google Chat webhook
- `POST /demo/onboarding` - send onboarding message
- `POST /demo/contract-reminder` - send contract reminder
- `GET /health` - health check

## Demo Script (mapping)
1) Ask leave policy question via `/webhook`:
```bash
curl -s -X POST http://localhost:3000/webhook \
  -H 'Content-Type: application/json' \
  -d '{"message": {"text": "Quy trinh xin nghi phep nhu the nao?"}}'
```

2) Ask admin procedure question via `/webhook`:
```bash
curl -s -X POST http://localhost:3000/webhook \
  -H 'Content-Type: application/json' \
  -d '{"message": {"text": "Toi can giay xac nhan cong tac thi lam sao?"}}'
```

3) Trigger onboarding:
```bash
curl -s -X POST http://localhost:3000/demo/onboarding
```

4) Trigger contract reminder:
```bash
curl -s -X POST http://localhost:3000/demo/contract-reminder
```

5) Ask out-of-scope question:
```bash
curl -s -X POST http://localhost:3000/webhook \
  -H 'Content-Type: application/json' \
  -d '{"message": {"text": "Cong ty minh co ke hoach tang luong nam nay khong?"}}'
```

## Notes
- Knowledge base lives in `data/docs.json` and is searched with lightweight keyword scoring.
- Replace the search in `src/rag.js` with Qdrant or another vector DB in Phase 2.
