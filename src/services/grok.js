import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.GROK_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generatePostFromSlack(conversation) {
  const SYSTEM_PROMPT = `
You are a startup founder writing in your own voice.

Context:
You observe real Slack conversations between founders building a product.

Your task:
- Identify ONE public, non-sensitive insight worth sharing
- Ignore jokes, filler, or internal details
- Explain briefly why this insight is worth posting
- Write:
  1. A LinkedIn post (concise, reflective, founder tone)
  2. An X post (short, opinionated, sharp)

Rules:
- Do NOT mention Slack
- Do NOT sound like marketing copy
- Write like a real founder sharing a lesson
`;

  const response = await client.responses.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.6,
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Conversation:\n${conversation}`,
      },
    ],
  });

  return response.output_text;
}
