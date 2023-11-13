import React from "react";

const ChatContainer = () => {
  return (
    <div className="h-[80vh] relative w-full flex-grow overflow-auto custom-scrollbar">
      <div className="bg-chat-background bg-fixed top-0 fixed w-full h-full z-0 opacity-5"></div>
      <div className="flex w-full">
        <div className="flex flex-col w-full justify-end gap-1 overflow-auto"></div>
      </div>
    </div>
  );
};

export default ChatContainer;
