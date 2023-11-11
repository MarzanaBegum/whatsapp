import { useStateProvider } from "@/context/StateContext";
import React from "react";
import Avatar from "../shared/Avatar";
import Image from "next/image";

const ChatListHeader = () => {
  const [{ userInfo }, dispatch] = useStateProvider();

  return (
    <div className="h-16 px-4 py-3 flex items-center justify-between">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.picture} />
      </div>
      <div className="flex gap-6">
        <Image
          src="/icons/chat-icon.svg"
          alt="chaticon"
          width={20}
          height={20}
        />
        <Image
          src="/icons/three-dot.svg"
          alt="chaticon"
          width={3}
          height={3}
        />
      </div>
    </div>
  );
};

export default ChatListHeader;
