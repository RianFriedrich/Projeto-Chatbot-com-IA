import express from "express";
import path from "path";
import { chat } from "./controllers/chatController.js";

console.log("ENV TEST:", process.env.AI_API_KEY);

const app = express();
app.use(express.static("public"));
app.use(express.json());


app.post("/chat", chat);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
