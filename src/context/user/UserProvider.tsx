import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  CREATE_CATEGORY,
  SET_CATEGORIES,
} from "../../actions/Category.Actions";
import UserReducer from "../../reducers/UserReducer";

const initialState = {
  isLoading: false,
  admin: {},
  isAdminPresent: false,
  categories: [],
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

  const handleCreateCategory = async (category: any) => {
    try {
      console.log(category);
      const { data } = await axios.post(`${baseUrl}/category`, category);
      dispatch({ type: CREATE_CATEGORY, payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/category`);
      dispatch({ type: SET_CATEGORIES, payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/category/${id}`);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [handleDeleteCategory]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleLogin,
        handleCreateCategory,
        handleDeleteCategory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
