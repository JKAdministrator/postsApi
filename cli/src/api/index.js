import axios from "axios";
//const API = axios.create({ baseURL: "https://posts-api-01.herokuapp.com" }); //"http://localhost:5000/posts";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => {
  return API.patch(`/posts/${id}/likePost`);
};
export const updatePost = (id, postData) => {
  return API.patch(`/posts/${id}`, postData);
};
export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const getGoogleUserInfo = (access_token) => {
  let ret = axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  console.log("getGoogleInfo ret ", ret);
  return ret;
};

export const signIn = (formData) => {
  let ret = API.post("/user/signin", formData);
  console.log("posting to /user/signin", { formData, ret });
  return ret;
};
export const signInWithGoogle = (formData) => {
  let ret = API.post("/user/signinWithGoogle", formData);
  console.log("posting to /user/signinWithGoogle", { formData, ret });
  return ret;
};
export const signUp = (formData) => {
  let ret = API.post("/user/signup", formData);
  console.log("posting to /user/signup", { formData, ret });
  return ret;
};
