import { createContext, useContext, useEffect, useReducer } from "react";
import UserReducer from "../../reducers/UserReducer";

const initialState = {
  isLoading: false,
  admin: [],
  isAdminPresent: false,
};

const baseUrl = `http://localhost:3000`;
const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const fetchUser = async () => {
    const response = await fetch(`${baseUrl}/admin`);
    const data = await response.json();
    dispatch({ type: "FETCHUSER", payload: data });
  };

  useEffect(() => {
    // fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ ...state }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
