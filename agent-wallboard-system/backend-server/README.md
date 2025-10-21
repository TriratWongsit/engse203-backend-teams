# backend-server

# ✅ รายการตรวจสอบการยืนยัน

## 📋 การตรวจสอบแบ็คเอนด์

### การเชื่อมต่อฐานข้อมูล
- [✅] ไฟล์ฐานข้อมูล SQLite มีอยู่และสามารถเข้าถึงได้  
- [✅] บริการ MongoDB กำลังทำงาน  
- [✅] ฐานข้อมูลทั้งสองเชื่อมต่อสำเร็จเมื่อเริ่มต้นเซิร์ฟเวอร์  
- [✅] ตรรกะการลองใหม่จะทำงานเมื่อ MongoDB ไม่สามารถใช้งานได้ชั่วคราว

### จุดสิ้นสุด API
- [✅] `POST /api/auth/login` ส่งคืนโทเค็นสำหรับข้อมูลประจำตัวที่ถูกต้อง  
- [✅] `PUT /api/agents/:code/status` อัปเดตและบันทึกลงใน MongoDB  
- [✅] `GET /api/agents/team/:teamId` คืนค่าสมาชิกทีมที่ถูกต้อง  
- [✅] `POST /api/messages/send` สร้างข้อความใน MongoDB  
- [✅] `GET /api/messages/agent/:code` ส่งคืนข้อความอย่างถูกต้อง  

### การจำกัดอัตรา (Rate Limit)
- [✅] ขีดจำกัดอัตรา API (100/15 นาที) ทำงานได้  
- [✅] ขีดจำกัดอัตราการตรวจสอบสิทธิ์ (10/15 นาที) ใช้งานได้  
- [✅] การตอบสนองขีดจำกัดอัตราประกอบด้วยส่วนหัวที่เหมาะสม  

### เว็บซ็อกเก็ต (WebSocket)
- [✅] ตัวแทนสามารถเชื่อมต่อและพิสูจน์ตัวตนได้  
- [✅] หัวหน้างานสามารถเชื่อมต่อและรับรองความถูกต้องได้  
- [✅] การอัปเดตสถานะออกอากาศไปยังไคลเอนต์ที่เชื่อมต่อ  
- [✅] ข้อความส่งถึงผู้รับที่ถูกต้อง  
- [✅] การตัดการเชื่อมต่อเหตุการณ์ที่จัดการอย่างถูกต้อง  

### การจัดการข้อผิดพลาด
- [✅] ข้อมูลประจำตัวที่ไม่ถูกต้องส่งคืนข้อผิดพลาด **401**  
- [✅] โทเค็นการตรวจสอบที่ขาดหายไปส่งคืนข้อผิดพลาด **401**  
- [✅] ข้อมูลที่ไม่ถูกต้องส่งคืนข้อผิดพลาด **400** พร้อมรายละเอียด  
- [✅] ข้อผิดพลาดของเซิร์ฟเวอร์ส่งคืน **500** พร้อมข้อความทั่วไป  
- [✅] ข้อผิดพลาดของฐานข้อมูลจะถูกบันทึกพร้อมรายละเอียด  


### Database Connection
- ![alt text](./img/Database-Connection.png) 

## postman test-api
- ![alt text](./img/health-check.png)
- ![alt text](./img/login-agent.png)
- ![alt text](./img/login-supervisor.png)
- ![alt text](./img/update-agent-status.png)
- ![alt text](./img/send-message.png)
- ![alt text](./img/get-agent-message.png)
### users
- ![alt text](./img/get-users.png)
- ![alt text](./img/get-users-id.png)
- ![alt text](./img/post-new-users.png)
- ![alt text](./img/put-update-users.png)
- ![alt text](./img/delete-users.png)
- ![alt text](./img/Login-without-password.png)

## Testing Script (test-api.sh)
- ![alt text](./img/test-api.png)

## Rate Limit
- ![alt text](./img/Rate-Limit-login-Testing.png)
- ![alt text](./img/Rate-Limit-Testing.png)

## WebSocket Testing (test-websocket.js)
- ![alt text](./img/WebSocket-testing.png)

## MongoDB
- ![alt text](./img/MongoDB.png)

## Error Handling
- ![alt text](./img/Missing-auth-token-returns-401-error.png)