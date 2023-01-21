import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import UserReducer from "../../reducers/UserReducer";

const initialState = {
  isLoading: false,
  admin: {},
  isAdminPresent: false,
};

const baseUrl = `http://localhost:3000`;
const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const handleLogin = async (values: any) => {
    try {
      const { data } = await axios.post(`${baseUrl}/admin/login`, {
        ...values,
      });
      dispatch({ type: "ADMINLOGIN", payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    // fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
