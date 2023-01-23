import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORIES,
} from "../../actions/Category.Actions";
import { API } from "../../constants/baseUrl";
import UserReducer from "../../reducers/UserReducer";

const initialState = {
  isLoading: false,
  admin: {},
  isAdminPresent: false,
  categories: [],
};

const baseUrl = API;
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
      console.log("create", category);
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
      const { data } = await axios.delete(`${baseUrl}/category/${id}`);
      if (data?.affected) {
        dispatch({ type: DELETE_CATEGORY, payload: id });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleUpdateCategory = async (id: number, detail: string) => {
    try {
      const { data } = await axios.patch(`${baseUrl}/category/${id}`, detail);
      if (data?.affected) {
        await fetchCategory();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleLogin,
        handleCreateCategory,
        handleDeleteCategory,
        handleUpdateCategory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
