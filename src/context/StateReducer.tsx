import Cookies from "js-cookie";
import { Action, State } from "./StateContext";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER_INFO": {
      Cookies.set("userInfo", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    }
    case "SET_ALL_CONTACTS_PAGE": {
      return { ...state, contactsPage: action.payload };
    }
    case "CHANGE_CURRENT_CHAT_USER":
      return {
        ...state,
        currentChatUser: action.payload,
      };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_SOCKET":
      return { ...state, socket: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return state;
  }
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  picture: string;
  newUser: boolean;
};

export type Message = {
  _id: string;
  _v: number;
  sender: string;
  receiver: string;
  date: string;
  type: string;
  message: string;
  messageStatus: string;
};
