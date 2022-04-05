import { SET_REGISTER_PROFILE } from "../constants/action-types";

export const SetRegisterProfile = (data) => ({
  type: SET_REGISTER_PROFILE,
  payload: data,
});
