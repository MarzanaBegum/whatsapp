import { useStateProvider } from "@/context/StateContext";
import api from "@/utils/ApiRoutes";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatListItem from "./ChatListItem";

const ContactsList = () => {
  const [{ contactsPage }, dispatch] = useStateProvider();
  const [allContacts, setAllContacts] = useState([]);
  
  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await api.get("/auth/get-contacts");
        setAllContacts(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-end p-4">
        <div className="flex gap-6 items-center">
          <BiArrowBack
            className="text-white cursor-pointer text-xl"
            onClick={() =>
              dispatch({ type: "SET_ALL_CONTACTS_PAGE", payload: false })
            }
          />
          <span className="text-white">New Chat</span>
        </div>
      </div>
      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 px-4 items-center h-14 gap-3">
          <div className="bg-panel-header-background w-full px-3 py-1 flex-grow gap-3 rounded-md flex items-center">
            <BiSearchAlt2 className="text-lg text-panel-header-icon cursor-pointer" />
            <div className="w-full">
              <input
                type="text"
                name="search"
                className="bg-transparent w-full focus:outline-none text-white text-sm"
                placeholder="Search contacts"
              />
            </div>
          </div>
        </div>
        {allContacts.map((contact: any) => (
          <div key={contact?._id}>
            <div className="text-teal-light pl-4 py-2">{contact?._id}</div>
            {contact?.users.map((user: any) => (
              <ChatListItem key={user?._id} data={user} isContactPage={true} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
