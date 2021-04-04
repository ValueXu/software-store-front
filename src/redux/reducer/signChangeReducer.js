const initialState = {
  paths: ["/welcome", "/signin", "/signup", "/homepage"],
};

const signChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN": {
      return { ...state, paths: action.paths };
    }
    case "SIGN_OUT": {
      return { ...state, initialState };
    }
    default: {
      return state;
    }
  }
};
export default signChangeReducer;
