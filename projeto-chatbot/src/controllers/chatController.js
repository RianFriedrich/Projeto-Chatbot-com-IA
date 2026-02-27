import {
  createMessage,
  getMessages,
  countMessages,
} from "../models/messageModel.js";

export async function chat(req, res) {
  const { conversationId, message } = req.body;

  try {
    await createMessage(conversationId, message, "user");

    const aiResponse = await getAIResponse(message);

    await createMessage(conversationId, aiResponse, "assistant");

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no chat" });
  }
}
