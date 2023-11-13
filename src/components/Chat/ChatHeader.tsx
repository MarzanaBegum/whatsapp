import React from "react";
import Avatar from "../shared/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";

const ChatHeader = () => {
  const [{ currentChatUser }, dispatch] = useStateProvider();

  return (
    <div className="h-16 bg-panel-header-background p-3 flex justify-between items-center z-10">
      <div className="flex items-center gap-6 justify-center">
        <div>
          <Avatar type="sm" image={currentChatUser?.picture} />
        </div>
        <div className="flex flex-col">
          <span className="text-primary-strong ">{currentChatUser?.name}</span>
          <span className="text-secondary text-sm">online/offline</span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall className="text-xl text-panel-header-icon cursor-pointer" />
        <IoVideocam className="text-xl text-panel-header-icon cursor-pointer" />
        <BiSearchAlt2 className="text-xl text-panel-header-icon cursor-pointer" />
        <BsThreeDotsVertical className="text-xl text-panel-header-icon cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatHeader;
