import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loginUser = userData => dispatch => {
  axios
    .post("/api/user/login", userData)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      setAuthToken(token);
      //decode token and set user to state
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const registerUser = userData => dispatch => {
  axios
    .post("/api/user/register", userData)
    .then(res => {
      //redirect to login or dashboard
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = decodedTokenData => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedTokenData
  };
};
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
