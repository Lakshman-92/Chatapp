# 💬 Real-Time Chat Application

A full-stack **real-time chat application** built with **Node.js, Express, Socket.IO, MongoDB, and React**.  
It allows users to **sign up, log in, and chat instantly** with each other in private or group conversations.  

---

## 🚀 Features
- 🔑 User Authentication (JWT-based login & registration)
- 🧑‍🤝‍🧑 Real-time one-to-one & group messaging
- 🟢 Online/Offline user status
- 📩 Message history (stored in MongoDB)
- 🔔 Real-time notifications (new message alerts)
- 🎨 Responsive UI built with React & Tailwind CSS

---

## 🛠️ Tech Stack
### Frontend:
- React.js (with Hooks & Context API/Redux)
- Tailwind CSS (for styling)
- Axios (for API calls)
- Socket.IO Client (for real-time communication)

### Backend:
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication & Bcrypt (for password hashing)
- Socket.IO Server (for WebSocket communication)

---

## 📂 Project Structure (Backend)

## ⚡ API Endpoints
### Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login & get token  

### Chats
- `GET /api/chats` → Get all user chats  
- `POST /api/chats` → Create new chat  

### Messages
- `GET /api/messages/:chatId` → Get all messages in a chat  
- `POST /api/messages` → Send a new message  

---

## ⚡ Real-Time Events (Socket.IO)
- `connection` → When a user connects  
- `join_chat` → Join specific chat room  
- `send_message` → Send new message  
- `receive_message` → Receive message in real time  
- `disconnect` → When user leaves  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
cd backend
npm install
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
npm start

#frontend
cd frontend
npm install
npm run dev
