// ChatWindow.js
import React, { useState, useEffect } from "react";
import socket from "socket.io-client";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const socket = socket.connect("http://localhost:5000"); // Replace with your server URL

    socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", newMessage);
    setNewMessage("");
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
