import express from "express";
const router = express.Router();

const messages = [];

router.post("/events", (req, res) => {
  const body = req.body;

  // slack url verification
  if (body.type === "url_verification") {
    return res.json({
      challenge: body.challenge,
    });
  }

  // Slack event callback
  if (body.type === "event_callback") {
    const event = body.event;

    // capture user messages
    if (event?.type === "message" && !event.bot_id) {
      const message = {
        user: user.event,
        text: user.text,
        channel: event.channel,
        ts: event.ts,
      };

      messages.push(message);
      console.log("Slack message received:", message);
    }
  }
  res.sendStatus(200);
});
export default router;
