import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import api from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/StateContext";

const MessageBar = () => {
  const [message, setMessage] = useState("");
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

  const handleSendMessage = async () => {
    try {
      const messageData = {
        sender: userInfo?._id,
        receiver: currentChatUser?._id,
        message,
      };
      const result = await api.post("/messages/add-message", messageData);
    
      setMessage("");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="bg-panel-header-background px-4 items-center h-20 flex relative">
      <>
        <div className="flex gap-6 items-center">
          <BsEmojiSmile
            className="text-xl text-panel-header-icon cursor-pointer"
            title="Emoji"
          />
          <ImAttachment
            className="text-xl text-panel-header-icon cursor-pointer"
            title="Attach File"
          />
        </div>
        <div className="flex items-center h-10 mx-4 w-full">
          <input
            type="text"
            onChange={(event: any) => setMessage(event.target.value)}
            value={message}
            className="bg-input-background text-sm focus:outline-none text-white px-4 py-3 w-full rounded-lg h-full"
            placeholder="Type a message"
          />
        </div>
        <div className="flex w-10 items-center">
          <button>
            <MdSend
              className="text-xl text-panel-header-icon cursor-pointer"
              title="Send message"
              onClick={handleSendMessage}
            />
            {/* <FaMicrophone className="text-xl text-panel-header-icon cursor-pointer" title="Record"/> */}
          </button>
        </div>
      </>
    </div>
  );
};

export default MessageBar;
