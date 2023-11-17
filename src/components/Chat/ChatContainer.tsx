import { useStateProvider } from "@/context/StateContext";
import formatTimestamp from "@/utils/FormateTime";
import React from "react";
import MessageStatus from "./MessageStatus";

const ChatContainer = () => {
  const [{ currentChatUser, messages, userInfo }] = useStateProvider();
  return (
    <div className="h-[80vh] relative w-full flex-grow overflow-auto custom-scrollbar">
      <div className="bg-chat-background bg-fixed top-0 fixed w-full h-full z-0 opacity-5"></div>
      <div className="mx-10 my-6 bottom-0 left-0 z-40 relative">
        <div className="flex w-full">
          <div className="flex flex-col w-full justify-end gap-1 overflow-auto">
            {messages.map((message) => (
              <div
                key={message?._id}
                className={`flex ${
                  message.sender === currentChatUser?._id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {message.type === "text" && (
                  <div
                    className={`text-white text-sm rounded-md px-2 py-[5px] flex justify-end gap-2 max-w-[40%] ${
                      message.sender === currentChatUser._id
                        ? "bg-incoming-background"
                        : "bg-outgoing-background"
                    }`}
                  >
                    <span className="break-all">{message.message}</span>
                    <div className="flex gap-1 justify-end">
                      <span className="text-bubble-meta text-[11px] min-w-fil">
                        {formatTimestamp(message.date)}
                      </span>
                      <span>
                        {message.sender === userInfo?._id && (
                          <MessageStatus
                            messageStatus={message.messageStatus}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
