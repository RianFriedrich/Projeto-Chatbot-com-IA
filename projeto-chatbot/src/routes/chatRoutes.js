import express from "express";
import {
  createConversation,
  getAllConversations,
  deleteOldestConversation,
} from "../models/conversationModel.js";
import {
  createMessage,
  getMessages,
  countMessages,
} from "../models/messageModel.js";
import { getAIResponse } from "../services/aiService.js";

const router = express.Router();

const MAX_CONVERSATIONS = 6;
const MAX_MESSAGES = 30;

router.post("/", async (req, res) => {
  try {
    const { conversationId, message } = req.body;

    let currentConversationId = conversationId;

    if (!currentConversationId) {
      const conversations = await getAllConversations();

      if (conversations.length >= MAX_CONVERSATIONS) {
        await deleteOldestConversation();
      }

      const newConversation = await createConversation();
      currentConversationId = newConversation.id;
    }

    if (currentConversationId) {
      const conversations = await getAllConversations();
      const exists = conversations.some((c) => c.id === currentConversationId);

      if (!exists) {
        currentConversationId = null;
      }
    }

    await createMessage(currentConversationId, message, "user");

    const totalMessages = await countMessages(currentConversationId);

    if (totalMessages > MAX_MESSAGES) {
      return res.json({
        reply: "Essa conversa ficou muito longa, vamos começar uma nova?",
        conversationId: currentConversationId,
      });
    }

    const history = await getMessages(currentConversationId);

    const formattedHistory = history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const reply = await getAIResponse(formattedHistory);

    await createMessage(currentConversationId, reply, "assistant");

    res.json({
      reply,
      conversationId: currentConversationId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default router;
