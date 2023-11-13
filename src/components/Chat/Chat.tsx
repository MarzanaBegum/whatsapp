import React from "react";
import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";

const Chat = () => {
  return (
    <div className="bg-conversation-panel-background border-conversation-border border-l w-full flex flex-col z-10 h-[100vh]">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
};

export default Chat;
