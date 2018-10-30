import axios from "axios";
import { GET_ERRORS } from "./types";

export const addReview = review => dispatch => {
  axios
    .post("/api/review", review)
    .then(res => {
      //redirect to /
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getRating = movieName => dispatch => {
  axios
    .get(`/api/review/rating/${movieName}`)
    .then(rating => {
      //set rating
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
