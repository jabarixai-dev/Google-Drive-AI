import { Bot } from "lucide-react";

export default function Avatar({ small = false }) {
  return (
    <div className={`avatar ${small ? "avatar-small" : ""}`} aria-label="AI assistant">
      <Bot size={small ? 18 : 23} strokeWidth={2.2} />
    </div>
  );
}