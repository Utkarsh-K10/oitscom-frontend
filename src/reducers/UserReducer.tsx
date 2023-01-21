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
    default:
      return state;
  }
}

export default UserReducer;
