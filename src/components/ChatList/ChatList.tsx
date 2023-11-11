import React from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";

const ChatList = () => {
  return (
    <div className="bg-panel-header-background max-h-screen z-10 flex flex-col">
      <ChatListHeader />
      <SearchBar />
      <List />
    </div>
  );
};

export default ChatList;
