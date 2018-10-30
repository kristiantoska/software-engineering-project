import { select_movie } from "./types";
export const selectMovie = movie => ({
  type: select_movie,
  payload: movie
});
