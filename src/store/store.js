import { createStore, combineReducers } from "redux";
import registerReducer from "../reducers/registerReducer";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  registerProfile: registerReducer,
  userStore: userReducer,
});

const store = createStore(rootReducer);
export default store;
