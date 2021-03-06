import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  LIKE,
} from "../constants/actionTypes.js";
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL: {
      return action.payload ? action.payload : null;
    }
    case CREATE: {
      return [...posts, action.payload];
    }
    case UPDATE:
    case LIKE: {
      return posts.map((post) => {
        return post._id === action.payload._id ? action.payload : post;
      });
    }
    case DELETE: {
      return posts.filter((post) => {
        return post._id !== action.payload;
      });
    }
    default: {
      return posts;
    }
  }
};
