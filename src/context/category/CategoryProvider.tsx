import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { SET_SUB_CATEGORY } from "../../actions/Category.Actions";
import { API } from "../../constants/baseUrl";
import CategoryReducer from "../../reducers/CategoryReducer";

const CategoryContext = createContext({});

const initialState = {
  isLoading: false,
  subCategories: [],
};

export const CategoryContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(CategoryReducer, initialState);

  const fetchSubCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/subcategory`);
      dispatch({ type: SET_SUB_CATEGORY, payload: data });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleCreateSubCategory = (subCategory: any) => {};

  const handleUpdateSubCategory = (id: number, value: any) => {};

  const handleDeleteSubCategory = (id: number) => {};

  useEffect(() => {
    fetchSubCategory();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        ...state,
        handleCreateSubCategory,
        handleDeleteSubCategory,
        handleUpdateSubCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  return useContext(CategoryContext);
};
