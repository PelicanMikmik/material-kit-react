import React, { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import FrameEditor from "./Frame editor/FrameEditor";
import Dashboard from "../dashboard/Dashboard";


const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          socket={socket}
          messages={messages}
        />
        <FrameEditor socket={socket} />
        <Dashboard />
      </div>
    </div>
  );
};

export default ChatPage;
