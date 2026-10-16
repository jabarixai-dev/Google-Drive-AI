export default async () => new Response(
  JSON.stringify({ ok: true, phase: 1, message: "Chatbot backend is reachable." }),
  { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
);