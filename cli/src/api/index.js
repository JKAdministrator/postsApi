import axios from "axios";

const url = "https://posts-api-01.herokuapp.com/posts"; //"http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, postData) => {
  return axios.patch(`${url}/${id}`, postData);
};
export const deletePost = (id) => {
  return axios.delete(`${url}/${id}`);
};
export const likePost = (id) => {
  return axios.patch(`${url}/${id}/likePost`);
};