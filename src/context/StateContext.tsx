import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import Cookies from "js-cookie";

// Define the state and action types
export type State = {
  userInfo: any;
  contactsPage: boolean;
  currentChatUser: any;
};

export type Action = { type: string; payload: any };

// Define the initial state
export const initialState: State = {
  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo")!)
    : undefined,
  contactsPage: false,
  currentChatUser: undefined,
};

// Create the context with types
type StateContextType = [State, Dispatch<Action>];

const StateContext = createContext<StateContextType | undefined>(undefined);

// Define the provider props
type StateProviderProps = {
  initialState: State;
  reducer: (state: State, action: Action) => State;
  children: ReactNode;
};

// Create the StateProvider component
const StateProvider: React.FC<StateProviderProps> = ({
  initialState,
  reducer,
  children,
}) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

// Create a custom hook to access the context
const useStateProvider = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useStateProvider must be used within a StateProvider");
  }
  return context;
};

export { StateProvider, useStateProvider };
