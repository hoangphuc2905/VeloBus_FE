import React, { useState } from "react";
import "./style.scss";

const Chat = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Xin chào! Tôi có thể giúp gì cho bạn?", from: "bot" },
  ]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, from: "user" }]);
      setMessage("");
    }
  };

  return (
    <div className={`chat-box ${isOpen ? "show" : ""}`}>
      <div className="chat-header">
        <h4>Phúc An Travel</h4>
        <button
          onClick={onClose}
          className="close-chat"
          aria-label="Close chat"
        >
          &times;
        </button>
      </div>
      <div className="chat-content">
        <div className="message-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.from}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="Hãy nhập tin nhắn của bạn..."
          />
          <button onClick={handleSendMessage} aria-label="Send message">
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
