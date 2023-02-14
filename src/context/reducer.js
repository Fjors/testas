import {
  SET_TOKEN,
  SET_USERNAME,
  LOGOUT_USER,
  SET_USER_PROFILE_IMAGE,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === SET_TOKEN) {
    return {
      ...state,
      token: action.payload.access_token,
    };
  }
  if (action.type === SET_USERNAME) {
    return {
      ...state,
      username: action.payload.username,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      username: null,
      token: null,
      userProfileImage: null,
    };
  }
  if (action.type === SET_USER_PROFILE_IMAGE) {
    return {
      ...state,
      userProfileImage: action.payload.image,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
