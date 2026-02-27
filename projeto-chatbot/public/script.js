let currentConversationId = null;
let conversations = [];

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const list = document.getElementById("conversation-list");

function renderConversations() {
  list.innerHTML = "";

  conversations.forEach((conv, index) => {
    const div = document.createElement("div");
    div.className = "conversation-item";

    div.innerHTML = `
      <span onclick="selectConversation(${conv.id})">
        Conversa ${index + 1}
      </span>
      <span class="delete-btn" onclick="deleteConversation(${conv.id})">x</span>
    `;

    list.appendChild(div);
  });
}

function newConversation() {
  currentConversationId = null;
  chat.innerHTML = "";
}

function selectConversation(id) {
  currentConversationId = id;
  chat.innerHTML = "";

  fetch(`/messages/${id}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((msg) => {
        addMessage(msg.content, msg.role);
      });
    });
}

function deleteConversation(id) {
  fetch(`/conversations/${id}`, {
    method: "DELETE",
  }).then(() => {
    conversations = conversations.filter((c) => c.id !== id);
    renderConversations();
  });
}

function addMessage(text, role) {
  const div = document.createElement("div");
  div.className = `message ${role === "user" ? "user" : "bot"}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const message = input.value;
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  const res = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      conversationId: currentConversationId,
    }),
  });

  const data = await res.json();

  addMessage(data.reply, "assistant");

  if (!currentConversationId) {
    currentConversationId = data.conversationId;

    conversations.push({ id: currentConversationId });
    renderConversations();
  }
}
