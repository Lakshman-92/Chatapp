import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { Server } from "socket.io";

// ✅ Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// ✅ Connect to MongoDB
connectDB();

// ✅ Global Middlewares (MUST BE BEFORE ROUTES)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "5mb" })); // ✅ Needed to parse req.body

// ✅ Debug route (optional)
app.post("/test-body", (req, res) => {
  console.log("🟢 Received body:", req.body);
  res.json({ received: req.body });
});

// ✅ API Routes
app.use("/api/auth", authRoutes);         // Signup / Login
app.use("/api/users", userRoutes);        // User profiles, sidebar
app.use("/api/messages", messageRoutes);  // Messaging

// ✅ Default Health Check Route
app.get("/", (req, res) => res.send("🚀 Server is running!"));

// ✅ Setup Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Track user sockets
export const userSocket = {};

// ✅ Handle socket connections
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocket[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(userSocket));
  }

  socket.on("disconnect", () => {
    for (const [key, value] of Object.entries(userSocket)) {
      if (value === socket.id) {
        delete userSocket[key];
        break;
      }
    }
    io.emit("onlineUsers", Object.keys(userSocket));
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));
