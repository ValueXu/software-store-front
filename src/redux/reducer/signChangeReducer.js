const initialState = {
  userInfo: {
    name: "游客",
    type: 0,
    paths: ["/welcome", "/signin", "/signup", "/homepage"],
  },
};

const signChangeReducer = (state = initialState, action) => {
  const userInfo = action.userInfo;
  switch (action.type) {
    case "SIGN_IN": {
      return { ...state, userInfo };
    }
    case "SIGN_OUT": {
      return { ...state, ...initialState };
    }
    default: {
      return state;
    }
  }
};
export default signChangeReducer;
