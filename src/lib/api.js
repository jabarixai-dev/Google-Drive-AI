/**
 * Frontend API boundary. This file must never contain provider secrets.
 * The backend decides which AI provider to use.
 */
export async function sendChatMessage({ message, history }) {
  const response = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "The assistant is temporarily unavailable.");
  }
  return data.reply || "I couldn't generate a response. Please try again.";
}