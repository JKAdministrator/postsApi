import { applyMiddleware } from "redux";
import * as api from "../api";
import {
  AUTH,
  LOGOUT,
  GET_GOOGLE_USER_INFO,
} from "../constants/actionTypes.js";
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH: {
      localStorage.setItem("authData", JSON.stringify({ ...action?.data }));
      return { ...state, authData: { ...action?.data } };
    }
    case LOGOUT: {
      localStorage.clear();
      return { ...state, authData: null };
    }
    default: {
      return state;
      break;
    }
  }
};
export default authReducer;
