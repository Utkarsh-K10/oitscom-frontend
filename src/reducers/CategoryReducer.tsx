import { SET_SUB_CATEGORY } from "../actions/Category.Actions";

const CategoryReducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_SUB_CATEGORY:
      return { ...state, subCategories: action.payload };
    default:
      return "Nothing found";
  }
};

export default CategoryReducer;
