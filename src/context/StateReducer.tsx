import Cookies from "js-cookie";
import { Action, State } from "./StateContext";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER_INFO": {
      Cookies.set("userInfo", JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
