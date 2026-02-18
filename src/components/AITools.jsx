// src/components/AITools.jsx
import React, { useState } from "react";
import axios from "axios";

const AITools = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatOutput, setChatOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!chatInput) return;

    const userMessage = { id: Date.now(), user: chatInput, bot: "" };
    setChatOutput(prev => [...prev, userMessage]);
    setChatInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/ai-chat", { message: chatInput });
      const aiReply = res.data.reply;

      setChatOutput(prev =>
        prev.map(msg => (msg.id === userMessage.id ? { ...msg, bot: aiReply } : msg))
      );
    } catch (err) {
      console.error(err);
      setChatOutput(prev =>
        prev.map(msg => (msg.id === userMessage.id ? { ...msg, bot: "AI error. Try again." } : msg))
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-card">
      <h2>AI Diet Assistant</h2>

      <div className="chatbot">
        {chatOutput.map(msg => (
          <div key={msg.id} className="chat-message">
            <p className="user">You: {msg.user}</p>
            <p className="bot">{msg.bot}</p>
          </div>
        ))}
        {loading && <p className="bot">AI is typing...</p>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask AI..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default AITools;
