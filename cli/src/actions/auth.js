import { AUTH, LOGOUT } from "../constants/actionTypes.js";
import * as api from "../api";

export const signinWithGoogle =
  (access_token, navigate) => async (disptach) => {
    try {
      const { data: googleData } = await api.getGoogleUserInfo(access_token);

      const { data } = await api.signInWithGoogle(googleData);

      disptach({ type: AUTH, data: data.result });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
export const signin = (formData, navigate) => async (disptach) => {
  try {
    //log in the user
    const { data } = await api.signIn(formData);
    disptach({ type: AUTH, data: data.result });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (disptach) => {
  try {
    const { data } = await api.signUp(formData);
    disptach({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
