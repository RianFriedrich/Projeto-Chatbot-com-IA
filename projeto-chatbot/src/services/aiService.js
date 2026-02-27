import fetch from "node-fetch";

export async function getAIResponse(history) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          messages: [
            {
              role: "system",
              content:
                "Você é uma IA amigável, emocional e boa para conversas do dia a dia. Evite respostas muito técnicas ou complexas.",
            },
            ...history,
          ],
        }),
      },
    );

    const data = await response.json();

    console.log("RESPOSTA DA API:", data);

    if (!data.choices || !data.choices[0]) {
      return "A IA não respondeu corretamente!";
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao chamar IA:", error);
    return "Erro interno ao chamar a IA.";
  }
}
