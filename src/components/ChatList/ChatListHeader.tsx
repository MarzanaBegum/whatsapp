import { useStateProvider } from "@/context/StateContext";
import React from "react";
import Avatar from "../shared/Avatar";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";

const ChatListHeader = () => {
  const [{ userInfo }, dispatch] = useStateProvider();

  return (
    <div className="h-16 px-4 py-3 flex items-center justify-between">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.picture} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="text-xl text-panel-header-icon cursor-pointer"
          title="New Chat"
          onClick={() =>
            dispatch({ type: "SET_ALL_CONTACTS_PAGE", payload: true })
          }
        />
        <BsThreeDotsVertical
          className="text-xl text-panel-header-icon cursor-pointer"
          title="Menu"
        />
      </div>
    </div>
  );
};

export default ChatListHeader;
