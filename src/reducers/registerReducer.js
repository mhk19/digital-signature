import { SET_REGISTER_PROFILE } from "../constants/action-types";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTER_PROFILE:
      console.log(action.payload.name);
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
      };
    default:
      return state;
  }
}
