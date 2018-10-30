const INITIAL_STATE = {
  selectedMovie: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "select_movie":
      return { ...state, selectedMovie: action.payload };
    default:
      return state;
  }
};
