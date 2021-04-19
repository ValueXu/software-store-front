const initialState = {
  menuInfo: {
    title: "首页",
    content: "这里是首页",
  },
};

const menuReducer = (state=initialState, action) => {
  let menuInfo = action.menuInfo;
  switch (action.type) {
    case "MENU_CHANGE": {
      return { ...state, menuInfo };
    }
    default: {
      return state;
    }
  }
};
export default menuReducer;
