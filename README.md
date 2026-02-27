# Projeto Chatbot com IA (Node.js + OpenRouter)

## Descrição

Este projeto é um chatbot com inteligência artificial desenvolvido em JavaScript, utilizando Node.js no backend e um frontend simples em HTML, CSS e JavaScript.

O objetivo principal é aprendizado, explorando integração com APIs de IA, criação de rotas backend, persistência de dados e estrutura completa de aplicação web.

O projeto utiliza a API do OpenRouter para gerar respostas inteligentes e pode ser integrado com banco de dados PostgreSQL usando o Neon.

---

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- CORS
- Dotenv
- Fetch API

### Frontend
- HTML
- CSS
- JavaScript puro

### Banco de Dados (Opcional)
- PostgreSQL (Neon)

### API de IA
- OpenRouter

---

## Estrutura do Projeto

projeto-chatbot/
│
├── src/
│   └── server.js        # Backend principal
│
├── public/
│   ├── index.html       # Interface do usuário
│   ├── style.css        # Estilo
│   └── script.js        # Lógica do frontend
│
├── .env                 # Variáveis de ambiente
├── open.js              # Script para abrir o navegador
└── package.json         # Dependências e scripts

---

## Instalação

Dentro da pasta do projeto, execute:

npm install express cors dotenv concurrently pg

## Configuração do .env

Crie um arquivo .env na raiz do projeto:

OPENROUTER_API_KEY=sua_chave_aqui
DATABASE_URL=sua_connection_string_aqui

---

## Como Criar o Banco de Dados (Neon)

### 1. Criar Conta
Acesse https://neon.tech.
Crie sua conta e um novo projeto.

### 2. Criar Banco
Após criar o projeto:
- Vá para o Dashboard
- Crie um banco de dados

### 3. Copiar a Connection String
Você verá algo semelhante a:
postgresql://usuario:senha@host/database?sslmode=require

Copie essa string e cole no seu arquivo .env.

### 4. Criar Tabelas
No SQL Editor do Neon, execute:

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations(id),
  role TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

## Como Rodar o Projeto

Execute:

npm run dev

Depois abra no navegador: http://localhost:3000

---

## Fluxo do Sistema

1. O usuário digita uma mensagem no frontend.
2. O frontend envia a mensagem para /chat.
3. O backend:
   - Salva a mensagem.
   - Envia para a API do OpenRouter.
4. A IA responde.
5. O backend retorna a resposta.
6. O frontend exibe na tela.
7. A conversa é armazenada (memória ou banco).

---

## Rotas do Backend

### POST /chat
Envia mensagem para a IA e retorna a resposta.

Exemplo de body:
{
  "message": "Olá",
  "conversationId": 1
}

### GET /messages/:conversationId
Retorna o histórico da conversa.

### DELETE /conversations/:id
Remove uma conversa.

---

## Exemplo de Integração com Banco

### Conexão
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

### Salvar mensagem
await pool.query(
  "INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3)",
  [conversationId, "user", message]
);

### Buscar mensagens
const result = await pool.query(
  "SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at",
  [conversationId]
);

---

## Histórico de Implementação

- [x] Criação do servidor com Express
- [x] Configuração de rotas básicas
- [x] Integração com OpenRouter
- [x] Correção de erros de ES Modules
- [x] Implementação de conversas em memória
- [x] Debug da resposta da API
- [x] Criação do frontend
- [x] Integração frontend-backend
- [x] Estruturação para banco de dados

---

## Possíveis Melhorias Futuras

- [ ] Login de usuários
- [ ] Persistência completa no banco
- [ ] Interface mais avançada
- [ ] Upload de arquivos
- [ ] IA especializada (como aplicação médica)
- [ ] Análise de histórico
