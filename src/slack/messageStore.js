// Simple in-memory message store (Phase 2 only)

export const messages = [];

export function addMessage(message) {
  messages.push(message);

  // keep only last 50 messages to avoid memory bloat
  if (messages.length > 50) {
    messages.shift();
  }
}

export function getRecentMessages(limit = 10) {
  return messages.slice(-limit);
}
