const initialState = {
  menuInfo: {
    title: "",
    content: "",
  },
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MENU_CHANGE": {
      return { ...state, menuInfo: action.menuInfo };
    }
    default: {
      return state;
    }
  }
};
export default menuReducer;
