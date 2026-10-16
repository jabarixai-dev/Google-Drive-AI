/**
 * Phase 1 safe placeholder.
 * Phase 2 will call a provider adapter on the server using Netlify environment variables.
 * Do not add secrets to the frontend or commit them to Git.
 */
export default async (request) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { ...headers, Allow: "POST" },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Please send a valid JSON request." }), {
      status: 400, headers,
    });
  }

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 4000) {
    return new Response(JSON.stringify({ error: "Message must be between 1 and 4000 characters." }), {
      status: 400, headers,
    });
  }

  return new Response(JSON.stringify({
    reply: "The chat interface is connected to its backend, but the AI provider is not configured yet. In Phase 2, we'll connect your chosen AI API securely on the server.",
    mode: "setup",
  }), { status: 200, headers });
};