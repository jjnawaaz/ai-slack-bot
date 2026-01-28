import express from "express";
import { addMessage } from "./messageStore.js";

const router = express.Router();

router.post("/events", (req, res) => {
  const body = req.body;

  if (body.type === "url_verification") {
    return res.status(200).json({ challenge: body.challenge });
  }

  if (body.type === "event_callback") {
    const event = body.event;

    if (event?.type === "message" && !event.bot_id) {
      const user = event.user || event.message?.user || "unknown";

      const text = event.text || event.message?.text || "";

      const message = {
        user,
        text,
        channel: event.channel,
        ts: event.ts,
      };

      addMessage(message);
      console.log("📩 Stored Slack message:", message);
    }
  }

  res.sendStatus(200);
});

export default router;
