import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import axios from "axios";
import { createBrowserHistory } from "history";
import {
  SET_TOKEN,
  SET_USERNAME,
  LOGOUT_USER,
  SET_USER_PROFILE_IMAGE,
} from "./actions";

const history = createBrowserHistory();

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
const userProfileImage = localStorage.getItem("userProfileImage");

const initialState = {
  token: token,
  username: username,
  userProfileImage: userProfileImage,
};

const client_id = process.env.REACT_APP_UNSPLASH_KEY;
const redirect_uri = "https://poetic-sundae-d9daa2.netlify.app/";
const api_auth_uri = "https://unsplash.com/oauth/authorize";
const api_token_uri = "https://unsplash.com/oauth/token";
const response_type = "code";
const scope = [
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos",
  "write_likes",
  "write_followers",
  "read_collections",
  "write_collections",
];
const client_secret = process.env.REACT_APP_UNSPLASH_SECRET;
const grant_type = "authorization_code";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = async () => {
    window.location.href = `${api_auth_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope.join(
      "+"
    )}`;
  };

  const getToken = async () => {
    const coder = window.location.search.split("code=")[1];
    try {
      const { data } = await axios.post(
        `${api_token_uri}?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${coder}&grant_type=${grant_type}`
      );
      const { access_token } = data;
      console.log("tokenas");

      localStorage.setItem("token", access_token);

      dispatch({
        type: SET_TOKEN,
        payload: { access_token },
      });
      const newUrl = window.location.href.split("?")[0];
      history.replace({
        pathname: newUrl,
        state: { some: "state" },
      });
    } catch (error) {
      console.log(error);
      logoutUser();
    }
  };

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(`https://api.unsplash.com/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.token,
        },
      });

      const { username } = data;
      localStorage.setItem("username", username);

      console.log(username);
      dispatch({
        type: SET_USERNAME,
        payload: { username },
      });
    } catch (error) {
      logoutUser();
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userProfileImage");
  };

  const setLike = async (imageId) => {
    try {
      await axios.post(
        `https://api.unsplash.com/photos/${imageId}/like`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.token,
          },
        }
      );
      console.log("like");
    } catch (error) {
      console.log(error);
    }
  };

  const setUnLike = async (imageId) => {
    try {
      await axios.delete(
        `https://api.unsplash.com/photos/${imageId}/like`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.token,
          },
        }
      );
      console.log("unlike");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserProfileImage = async () => {
    try {
      const { data } = await axios.get(
        `https://api.unsplash.com/users/${state.username}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.token,
          },
        }
      );
      const { profile_image } = data;
      const image = profile_image.large;
      localStorage.setItem("userProfileImage", image);

      console.log(profile_image);
      dispatch({
        type: SET_USER_PROFILE_IMAGE,
        payload: { image },
      });
      console.log("profile photo");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleClick,
        getToken,
        getUserProfile,
        logoutUser,
        setLike,
        setUnLike,
        getUserProfileImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, initialState, useAppContext };
