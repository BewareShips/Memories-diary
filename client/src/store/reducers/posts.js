import {
  FETCH_ALL,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  SET_CURRENT_ID,
} from "../action-constans/constans";

let initialState = {
  postsItems: [],
  currentIdOfPost: null,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, postsItems: action.payload };
    case CREATE_POST:
      return { ...state, postsItems: [...state.postsItems, action.payload] };
    case UPDATE_POST:
      const currentPostItem = state.postsItems.map((el) =>
        el._id === action.payload._id ? action.payload : el
      );
      return { ...state, postsItems: currentPostItem };
    case LIKE_POST:
      const likeRecieved = {likeCount: action.payload.likeCount}
      const currentLikePostItem = state.postsItems.map((el) =>
        el._id === action.payload._id ? {...el,...likeRecieved} : el
      );
      return { ...state, postsItems: currentLikePostItem };
    case DELETE_POST:
      const filteredPostItem = state.postsItems.filter(
        (el) => el._id !== action.payload
      );
      return { ...state, postsItems: filteredPostItem };
    case SET_CURRENT_ID:
      return { ...state, currentIdOfPost: action.payload };
    default:
      return state;
  }
};

export default posts;
