import React, { useState } from "react";

const DiscussionForum = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: "John Doe", text: "Hello! Is anyone here?", time: "10:30 AM" },
    { id: 2, user: "Alice Smith", text: "Yes! What's up?", time: "10:32 AM" },
    { id: 3, user: "John Doe", text: "I have a question regarding React hooks.", time: "10:35 AM" }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      user: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="container py-5" style={{height: '100%'}}>
      <div className="card shadow-sm rounded-4">
        
        {/* Chat Header */}
     

        {/* Chat Messages */}
        <div className="card-body chat-box p-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
          {messages.map((msg) => (
            <div key={msg.id} className={`d-flex mb-3 ${msg.user === "You" ? "justify-content-end" : ""}`}>
              
              {/* Avatar */}
              {msg.user !== "You" && (
                <div className="me-2">
                  <i className="fa-solid fa-user-circle fa-2x text-secondary"></i>
                </div>
              )}

              <div className={`p-3 rounded-4 ${msg.user === "You" ? "bg-primary text-white" : "bg-light"}`} style={{ maxWidth: "75%" }}>
                <div className="d-flex justify-content-between">
                  <strong>{msg.user}</strong>
                  <small className="text-muted ms-3">{msg.time}</small>
                </div>
                <p className="m-0">{msg.text}</p>
              </div>

              {/* Avatar for 'You' */}
              {msg.user === "You" && (
                <div className="ms-2">
                  <i className="fa-solid fa-user-circle fa-2x text-secondary"></i>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="card-footer bg-light p-3 d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;
