import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORIES,
} from "../actions/Category.Actions";
import { ADMINLOGIN } from "../constants/admin.contants";

function UserReducer(state: any, action: any) {
  switch (action.type) {
    case ADMINLOGIN:
      const localStoageData = [
        { admin: action.payload },
        { isLoggedInAdmin: true },
      ];
      localStorage.setItem("admin", JSON.stringify(localStoageData));
      return { ...state, admin: action.payload, isAdminPresent: true };
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case CREATE_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case DELETE_CATEGORY:
      const tempCategory = state.categories.filter(
        (category: any) => category.id !== action.payload
      );
      return { ...state, categories: tempCategory };
    default:
      return state;
  }
}

export default UserReducer;
