function UserReducer(state: any, action: any) {
  switch (action.type) {
    case "FETCHUSER":
      return { ...state, admin: action.payload };
  }
}

export default UserReducer;
