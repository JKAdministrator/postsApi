import * as api from "../api";
import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  LIKE,
} from "../constants/actionTypes.js";
export const getPosts = () => async (disptach) => {
  try {
    const { data } = await api.fetchPosts();
    disptach({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const createPost = (postData) => async (disptach) => {
  try {
    const { data } = await api.createPost(postData);
    disptach({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, postdata) => async (disptach) => {
  try {
    const { data } = await api.updatePost(id, postdata);
    disptach({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (disptach) => {
  try {
    await api.deletePost(id);
    disptach({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (disptach) => {
  try {
    const { data } = await api.likePost(id);
    disptach({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
