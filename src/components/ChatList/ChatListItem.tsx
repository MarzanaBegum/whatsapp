import React from "react";
import Avatar from "../shared/Avatar";
import { useStateProvider } from "@/context/StateContext";

interface ChatListItemProps {
  isContactPage?: boolean;
  data: any; // Replace YourDataType with the actual type of the 'data' prop
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  isContactPage = false,
  data,
}) => {
  const [{}, dispatch] = useStateProvider();

  const handleCurrentChatUser = () => {
    dispatch({ type: "CHANGE_CURRENT_CHAT_USER", payload: data });
    dispatch({ type: "SET_ALL_CONTACTS_PAGE", payload: false });
  };
  return (
    <div
      className="flex items-center cursor-pointer hover:bg-background-default-hover"
      onClick={handleCurrentChatUser}
    >
      <div className="w-min-fit px-5 pt-3 pb-1">
        <Avatar type="lg" image={data?.picture} />
      </div>
      <div className="min-h-full w-full flex flex-col mt-3 pl-2">
        <div className="flex flex-col">
          <div className="">
            <span className="text-white">{data.name}</span>
          </div>
          <div className="border-b border-conversation-border pb-2">
            <div>
              <span className="text-secondary line-clamp-1 text-sm">
                {data?.about || "\u00A0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
