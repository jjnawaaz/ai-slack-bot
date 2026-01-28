import express from "express";
import dotenv from "dotenv";
import slackEventsRouter from "./slack/events.js";
import slackCommandsRouter from "./slack/commands.js";

dotenv.config();

const app = express();

// Slack slash commands are sent as application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/slack", slackEventsRouter);
app.use("/slack", slackCommandsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
