import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let conversations = [];
let nextId = 1;

/* ============================ */
app.post("/chat", async (req, res) => {
  const { message, conversationId } = req.body;

  let conversation;

  if (conversationId) {
    conversation = conversations.find((c) => c.id === conversationId);
  }

  if (!conversation) {
    conversation = {
      id: nextId++,
      messages: [],
    };
    conversations.push(conversation);
  }

  conversation.messages.push({
    role: "user",
    content: message,
  });

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Chat IA",
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: conversation.messages,
      }),
    },
  );

  const data = await response.json();

  if (!data.choices || !data.choices[0]) {
    console.log("ERRO DA API:", data);
    return res.json({
      reply: "Erro ao obter resposta da IA",
      conversationId: conversation.id,
    });
  }

  console.log("RESPOSTA COMPLETA:", data);

  const reply = data.choices[0].message.content;

  conversation.messages.push({
    role: "assistant",
    content: reply,
  });

  res.json({
    reply: reply,
    conversationId: conversation.id,
  });
});

/* ============================ */
app.get("/messages/:conversationId", (req, res) => {
  const id = parseInt(req.params.conversationId);

  const conversation = conversations.find((c) => c.id === id);

  if (!conversation) {
    return res.status(404).json({ error: "Conversa não encontrada" });
  }

  res.json(conversation.messages);
});

/* ============================ */
app.delete("/conversations/:id", (req, res) => {
  const id = parseInt(req.params.id);

  conversations = conversations.filter((c) => c.id !== id);

  res.json({ success: true });
});
/* ============================ */

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});
