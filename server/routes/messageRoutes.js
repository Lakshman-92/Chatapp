import express from "express";
import { protectRoutes  } from "../middleware/auth.js";
import {
  sendMessage,
  getMessages,
  markMessageAsSeen,
} from "../controller/messageController.js";

const router = express.Router();

// Route to send a message
router.post("/send", protectRoutes, sendMessage);

// Route to get all messages between logged in user and selected user
router.get("/:userId", protectRoutes, getMessages);

// Route to mark a message as seen
router.put("/mark-seen/:messageId", protectRoutes, markMessageAsSeen);

export default router;
