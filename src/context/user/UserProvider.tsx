import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import {
  CLOSE_SNAKCBAR,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORIES,
  SHOW_SNAKCBAR,
} from "../../actions/Category.Actions";
import { API } from "../../constants/baseUrl";
import UserReducer from "../../reducers/UserReducer";
import { MESSAGES } from "../../utils/messages";

const initialState = {
  isLoading: false,
  admin: {},
  isAdminPresent: false,
  categories: [],
  open: false,
  message: "",
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
      dispatchSnackBar(MESSAGES("Category").error);
    }
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/category`);
      dispatch({ type: SET_CATEGORIES, payload: data });
    } catch (error) {
      dispatchSnackBar(MESSAGES("Category").error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/category/${id}`);
      if (data?.affected) {
        dispatch({ type: DELETE_CATEGORY, payload: id });
        dispatchSnackBar(MESSAGES("Category").delete);
      }
    } catch (error) {
      dispatchSnackBar(MESSAGES("Category").error);
    }
  };

  const handleUpdateCategory = async (id: number, detail: string) => {
    try {
      const { data } = await axios.patch(`${baseUrl}/category/${id}`, detail);
      if (data?.affected) {
        await fetchCategory();
      }
    } catch (error) {
      dispatchSnackBar(MESSAGES("Category").error);
    }
  };

  const dispatchSnackBar = (message: string) => {
    dispatch({ type: SHOW_SNAKCBAR, payload: message });
  };

  const dispatchCloaseSnackBar = () => {
    dispatch({ type: CLOSE_SNAKCBAR });
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
        dispatchSnackBar,
        dispatchCloaseSnackBar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
