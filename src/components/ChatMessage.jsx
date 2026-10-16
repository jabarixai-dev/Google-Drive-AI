import { CheckCheck, Copy, UserRound } from "lucide-react";
import Avatar from "./Avatar.jsx";

export default function ChatMessage({ message, onCopy }) {
  const isUser = message.role === "user";
  return (
    <div className={`message-row ${isUser ? "user-row" : "assistant-row"}`}>
      {!isUser && <Avatar small />}
      <div className="message-stack">
        <div className={`message-bubble ${isUser ? "user-bubble" : "assistant-bubble"}`}>
          <p>{message.content}</p>
        </div>
        <div className={`message-meta ${isUser ? "user-meta" : ""}`}>
          <span>{message.time}</span>
          {isUser ? <CheckCheck size={14} className="read-icon" /> : (
            <button className="icon-button copy-button" onClick={() => onCopy(message.content)} aria-label="Copy response" title="Copy response">
              <Copy size={13} />
            </button>
          )}
        </div>
      </div>
      {isUser && <div className="user-avatar"><UserRound size={19} /></div>}
    </div>
  );
}