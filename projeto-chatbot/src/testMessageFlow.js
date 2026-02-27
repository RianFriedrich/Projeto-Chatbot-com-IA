import { createConversation } from "./models/conversationModel.js";
import { saveMessage, getMessages } from "./models/messageModel.js";

async function test() {
  const conversation = await createConversation();
  console.log("Conversa criada:", conversation);

  await saveMessage(conversation.id, "user", "Oi, tudo bem?");

  await saveMessage(conversation.id, "assistant", "Oi! Estou bem! E você?");

  const messages = await getMessages(conversation.id);

  console.log("Histórico da conversa:");
  console.log(messages);
}

test();
