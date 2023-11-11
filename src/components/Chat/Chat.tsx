import React from "react";
import ChatList from "../ChatList/ChatList";
import Empty from "../Empty";

const Chat = () => {
  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        <Empty />
      </div>
    </>
  );
};

export default Chat;
