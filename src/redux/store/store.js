import menuChangeReducer from "../reducer/menuChangeReducer";
import signChangeReducer from "../reducer/signChangeReducer";

import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// const initialState = {
//   menuChangeReducer: {
//     userInfo: {
//       name: "游客",
//       type: "0",
//       paths: ["/welcome", "/signin", "/signup", "/homepage"],
//     },
//   },
//   signChangeReducer: {
//     menuInfo: {
//       title: "首页",
//       content: "这里是首页",
//     },
//   },
// };

// 需要给reducer的state提前设初始值，不然报错
const combinedReducers = combineReducers({
  menuChangeReducer,
  signChangeReducer,
});

// redux dev extension只安装在了dev下，build版本请删掉参数

// 用了combineReducers就不要用initialValue了,在被合并的reducer中使用初始值
const store = createStore(
  combinedReducers,
  // initialState,
  composeWithDevTools()
);
export default store;
