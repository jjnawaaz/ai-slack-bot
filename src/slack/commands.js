import express from "express";
import { getRecentMessages } from "./messageStore.js";
import { generatePostFromSlack } from "../services/grok.js";

const router = express.Router();

router.post("/commands", async (req, res) => {
  const { command, response_url } = req.body;

  if (command !== "/suggest-post") {
    return res.json({
      response_type: "ephemeral",
      text: "Unknown command.",
    });
  }

  const recentMessages = getRecentMessages(8);

  if (recentMessages.length === 0) {
    return res.json({
      response_type: "ephemeral",
      text: "Not enough conversation yet 👀",
    });
  }

  const conversationText = recentMessages.map((m) => `- ${m.text}`).join("\n");

  // ✅ Immediate ACK (Slack timeout safety)
  res.json({
    response_type: "ephemeral",
    text: "👀 Analyzing recent conversation...",
  });

  try {
    const aiOutput = await generatePostFromSlack(conversationText);

    // ✅ Send result back to Slack
    await fetch(response_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        response_type: "ephemeral",
        text: aiOutput,
      }),
    });
  } catch (err) {
    console.error("Grok error:", err);
  }
});

export default router;
