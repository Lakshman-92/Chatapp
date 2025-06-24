import Message from "../models/message.js";

// Send message to another user
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      return res.status(400).json({ message: "Receiver ID and message are required" });
    }

    const newMessage = await Message.create({
      senderId: req.user._id,
      receiverId,
      message,
    });

    res.status(201).json({ success: true, message: newMessage });

  } catch (error) {
    res.status(500).json({ message: "Failed to send message" });
  }
};

// Get all messages between current user and selected user
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: req.user._id, receiverId: userId },
        { senderId: userId, receiverId: req.user._id },
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// Mark a specific message as seen
export const markMessageAsSeen = async (req, res) => {
  try {
    const { messageId } = req.params;

    const updated = await Message.findByIdAndUpdate(messageId, { isSeen: true }, { new: true });

    res.status(200).json({ message: "Message marked as seen", updated });

  } catch (error) {
    res.status(500).json({ message: "Failed to update message status" });
  }
};
