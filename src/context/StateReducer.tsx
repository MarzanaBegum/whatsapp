import Cookies from "js-cookie";
import { Action, State } from "./StateContext";

const reducer = (state: State, action: Action) => {
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
    default:
      return state;
  }
};

export default reducer;
