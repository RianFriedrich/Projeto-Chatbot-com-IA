import { createConversation } from "./models/conversationModel.js";

async function test() {
  const conv = await createConversation();
  console.log("Conversa criada:", conv);
}

test();
