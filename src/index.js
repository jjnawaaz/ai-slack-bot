import express from "express";
import slackEventsRouter from "./slack/events.js";

import "dotenv/config";

const app = express();

// Parse JSON bodies
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/slack", slackEventsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
