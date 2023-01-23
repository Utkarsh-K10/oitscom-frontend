import { createContext, useContext, useReducer } from "react";
import CategoryReducer from "../../reducers/CategoryReducer";

const CategoryContext = createContext({});

const initialState = {
  isLoading: false,
};

export const CategoryContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CategoryReducer, initialState);
  return (
    <CategoryContext.Provider value={{ ...state }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  return useContext(CategoryContext);
};
