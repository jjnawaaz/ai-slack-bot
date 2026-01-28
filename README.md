# Slack Messages Insight Bot

A lightweight Slack bot that passively listens to real founder conversations and suggests LinkedIn and X posts based on them.

The goal is simple:  
Founders already discuss real product decisions, tradeoffs, and lessons every day.  
This bot turns those conversations into content ideas — without auto-posting or context switching.

---

## ✨ What it does

- Sits quietly in a Slack channel
- Listens to everyday conversations (product, growth, decisions, tradeoffs)
- On command (`/suggest-post`), analyzes recent messages
- Suggests:
  - One LinkedIn post
  - One X (Twitter) post
- Explains nothing publicly and never auto-posts

You stay fully in control.

---

## 🧠 How it works (high level)

1. Slack Events API streams messages to the backend
2. Messages are kept in short-term memory (in-memory store)
3. `/suggest-post` triggers analysis
4. Recent conversation is sent to Grok (OpenAI-compatible API)
5. Grok:
   - Identifies a public, non-sensitive insight
   - Generates LinkedIn + X drafts
6. Output is sent back to Slack as an ephemeral message

---

## 🛠 Tech Stack

- **Node.js + Express**
- **Slack Events API**
- **Slack Slash Commands**
- **Grok (via OpenAI-compatible API)**
- **ngrok** (for local development)

No database and no auto-posting by design.

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-slack-bot
Install dependencies

2. npm install

3. Environment variables

Create a .env file in the root:

GROK_API_KEY=your_grok_api_key_here
PORT=3000

4. Start the server
npm run dev


You should see:

Server running on port 3000

5. Expose the server using ngrok
npx ngrok http 3000


Copy the HTTPS URL shown by ngrok.
You’ll use it in Slack configuration.

🤖 Slack App Setup

1. Create a Slack App

Go to https://api.slack.com/apps

Create a new app (From Scratch)

Add a Bot User

Install the app to your workspace

2. Enable Event Subscriptions

Enable Events

Request URL:

https://<ngrok-url>/slack/events


Subscribe to Bot Events:

message.channels

message.groups

Reinstall the app after saving

3. Create Slash Command

Command:

/suggest-post


Request URL:

https://<ngrok-url>/slack/commands


Reinstall the app

4. Invite the bot to a channel

In Slack:

/invite @YourBotName

🧪 Usage

Have a normal conversation in the channel

Run:

/suggest-post


The bot responds with:

Why the insight is post-worthy

A LinkedIn draft

An X draft

All suggestions are ephemeral and visible only to you.

🔒 Design Decisions

No database (short-term memory only)

No auto-posting

No dashboards

Focused on core value: turning real conversations into content ideas

This keeps the product lightweight, safe, and founder-friendly.




