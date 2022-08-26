import { SET_USER_LOGGED_IN } from "../constants/action-types";

const initialState = {
  loggedIn: false,
  name: "",
  id: "",
  isProf: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
        name: action.payload.name,
        id: action.payload.id,
        isProf: action.payload.isProf,
      };
    default:
      return state;
  }
}
