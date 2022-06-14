import { AUTH, LOGOUT } from "../constants/actionTypes.js";
import * as api from "../api";

export const auth = (access_token, profile) => (disptach) => {
  try {
    disptach({ type: AUTH, data: { access_token, profile } });
  } catch (error) {
    console.log(error);
  }
};
