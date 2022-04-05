import { SET_USER_LOGGED_IN } from "../constants/action-types";

export const SetUserLoggedIn = (data) => ({
  type: SET_USER_LOGGED_IN,
  payload: data,
});
