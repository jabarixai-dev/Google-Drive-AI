import { useEffect, useRef, useState } from "react";
import {
  Bot, ChevronDown, Clock3, Menu, MessageCircle, MoreHorizontal,
  Plus, Search, Settings2, Sparkles, Sun, X
} from "lucide-react";
import Avatar from "./components/Avatar.jsx";
import ChatMessage from "./components/ChatMessage.jsx";
import ChatInput from "./components/ChatInput.jsx";
import { sendChatMessage } from "./lib/api.js";

const welcomeMessage = {
  id: "welcome",
  role: "assistant",
  content: "Hello! 👋 I'm your AI assistant. I can help answer questions using information from my approved knowledge base. What would you like to know?",
  time: "Just now",
};

const suggestions = [
  { icon: "✦", title: "What can you help me with?", subtitle: "Explore what this assistant can do" },
  { icon: "⌕", title: "Find information for me", subtitle: "Search the available knowledge" },
  { icon: "↗", title: "Help me get started", subtitle: "Ask a question in plain language" },
];

function timeNow() {
  return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

export default function App() {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), [messages, loading]);

  function notify(text) {
    setToast(text);
    window.setTimeout(() => setToast(""), 2200);
  }

  function newChat() {
    setMessages([{ ...welcomeMessage, id: `welcome-${Date.now()}`, time: "Just now" }]);
    setLoading(false);
    setSidebarOpen(false);
  }

  async function sendMessage(content) {
    if (!content.trim() || loading) return;
    const userMessage = { id: crypto.randomUUID(), role: "user", content: content.trim(), time: timeNow() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setLoading(true);
    setSidebarOpen(false);

    try {
      // Only the current page's conversation is sent. Nothing is saved to a database in Phase 1.
      const history = nextMessages
        .filter((item) => item.id !== "welcome")
        .slice(-12)
        .map(({ role, content: text }) => ({ role, content: text }));
      const reply = await sendChatMessage({ message: content.trim(), history });
      setMessages((current) => [...current, {
        id: crypto.randomUUID(), role: "assistant", content: reply, time: timeNow(),
      }]);
    } catch (error) {
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: error.message || "I couldn't connect just now. Please try again.",
        time: timeNow(),
      }]);
    } finally {
      setLoading(false);
    }
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      notify("Response copied");
    } catch {
      notify("Copy isn't available in this browser");
    }
  }

  const isWelcome = messages.length === 1 && messages[0].role === "assistant";

  return (
    <div className="app-shell">
      {sidebarOpen && <button className="mobile-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <Avatar />
          <div className="brand-copy">
            <strong>Nova AI</strong>
            <span>Your thinking companion</span>
          </div>
          <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar"><X size={18} /></button>
        </div>

        <button className="new-chat-button" onClick={newChat}><Plus size={18} /> New chat</button>

        <div className="nav-label">WORKSPACE</div>
        <button className="nav-item active"><MessageCircle size={18} /> Chat <span className="nav-dot" /></button>
        <button className="nav-item" onClick={() => notify("Chat history is not saved in Phase 1")}><Clock3 size={18} /> History</button>
        <button className="nav-item" onClick={() => notify("Settings will be added in a later phase")}><Settings2 size={18} /> Settings</button>

        <div className="sidebar-bottom">
          <div className="knowledge-card">
            <div className="knowledge-icon"><Sparkles size={16} /></div>
            <div>
              <strong>Knowledge base</strong>
              <span>Connection coming soon</span>
            </div>
            <span className="status-dot" />
          </div>
          <div className="profile">
            <div className="profile-avatar">N</div>
            <div className="profile-copy"><strong>Guest session</strong><span>Conversation only</span></div>
            <MoreHorizontal size={19} />
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
            <div className="topbar-avatar"><Avatar small /></div>
            <div className="heading-copy">
              <div className="assistant-title">Nova AI <span className="online-dot" /></div>
              <div className="assistant-subtitle">Your personal AI companion</div>
            </div>
            <ChevronDown className="title-chevron" size={16} />
          </div>
          <div className="topbar-actions">
            <span className="secure-label"><span className="secure-dot" /> Secure session</span>
            <button className="icon-button" onClick={() => notify("Theme options coming soon")} aria-label="Theme options"><Sun size={19} /></button>
            <button className="icon-button" onClick={() => notify("More options coming soon")} aria-label="More options"><MoreHorizontal size={21} /></button>
          </div>
        </header>

        <section className={`conversation ${isWelcome ? "conversation-welcome" : ""}`} aria-label="Chat messages">
          {isWelcome && (
            <div className="welcome-panel">
              <div className="welcome-orb"><div className="orb-inner"><Bot size={31} /></div><span className="orb-spark">✦</span></div>
              <div className="eyebrow"><span /> AI ASSISTANT</div>
              <h1>A little help goes<br className="desktop-break" /> a long way.</h1>
              <p>Ask a question, explore an idea, or find the information you need. Let's figure it out together.</p>
              <div className="suggestion-grid">
                {suggestions.map((item) => (
                  <button className="suggestion-card" key={item.title} onClick={() => sendMessage(item.title)}>
                    <span className="suggestion-icon">{item.icon}</span>
                    <span className="suggestion-text"><strong>{item.title}</strong><small>{item.subtitle}</small></span>
                    <span className="suggestion-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="messages-list">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} onCopy={copyText} />
            ))}
            {loading && (
              <div className="message-row assistant-row">
                <Avatar small />
                <div className="typing-bubble" aria-label="Assistant is thinking"><span /><span /><span /></div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </section>

        <footer className="chat-footer">
          <div className="composer-wrap">
            <ChatInput onSend={sendMessage} disabled={loading} />
            <div className="footer-note"><span><Search size={12} /> Answers will use approved sources once connected</span><span>AI can make mistakes</span></div>
          </div>
        </footer>
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}