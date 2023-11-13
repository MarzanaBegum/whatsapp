import React from "react";
import ChatList from "../ChatList/ChatList";
import Empty from "../Empty";
import Chat from "./Chat";
import { useStateProvider } from "@/context/StateContext";

const ChatPage = () => {
  const [{ currentChatUser }] = useStateProvider();
  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {currentChatUser && currentChatUser !== undefined ? (
          <Chat />
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default ChatPage;
