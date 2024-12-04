import { combineReducers } from "redux";
import globalReducer from "@/modules/global/slice";
import authReducer from "@/modules/auth/slice";
import courseReducer from "@/modules/course/slice";
const rootReducers = combineReducers({
  auth: authReducer,
  global: globalReducer,
  course: courseReducer,
});

export default rootReducers;
