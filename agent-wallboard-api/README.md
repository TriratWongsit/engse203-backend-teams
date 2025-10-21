# Agent Wallboard API - Enhanced Phase 1

> Professional Node.js API สำหรับจัดการ Call Center Agents แบบ Real-time

## ✨ Features Enhanced
- 🏗️ Professional MVC project structure  
- ✅ Input validation with Joi
- 🛡️ Security middleware (Helmet)
- 📝 Request logging และ performance monitoring
- ⚠️ Global error handling
- 📊 Consistent API response format

## 🚀 Quick Start

```bash
# 1. Clone และ install dependencies
npm install

# 2. สร้าง environment file
cp .env.example .env

# 3. Start development server
npm run dev

# 4. Test API
curl http://localhost:3001/api/health

```
## Testing & Integration
- GET http://localhost:3001/
![alt text](/agent-wallboard-api/img/api.png)

- GET http://localhost:3001/api/health
![alt text](/agent-wallboard-api/api-health.png)

- GET http://localhost:3001/api/agents
![alt text](/agent-wallboard-api/img/api-agents.png)

- GET http://localhost:3001/api/agents?status=Available
![alt text](/agent-wallboard-api/img/api-agents1.png)

- GET http://localhost:3001/api/agents?department=Sales
![alt text](/agent-wallboard-api/img/api-agents2.png)

- POST http://localhost:3001/api/agents
![alt text](/agent-wallboard-api/img/post-api-agents.png)

- POST http://localhost:3001/api/agents
![alt text](/agent-wallboard-api/img/post-api-agents1.png)

- PATCH http://localhost:3001/api/agents/1757367391699dcsdcwj6l/status
![alt text](/agent-wallboard-api/img/patch-api-agents.png)

- PATCH http://localhost:3001/api/agents/1757367391699dcsdcwj6l/status
![alt text](/agent-wallboard-api/img/patch-api-agents1.png)