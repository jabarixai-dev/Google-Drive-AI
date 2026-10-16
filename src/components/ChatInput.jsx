import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  function submit(event) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form className="composer" onSubmit={submit}>
      <button type="button" className="composer-attach" title="Attachments will be added later" aria-label="Attachments coming soon">
        <Paperclip size={20} />
      </button>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask me anything..."
        aria-label="Your message"
        disabled={disabled}
      />
      <button className="send-button" type="submit" disabled={!value.trim() || disabled} aria-label="Send message">
        <Send size={19} />
      </button>
    </form>
  );
}