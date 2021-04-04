import menuChangeReducer from "../reducer/menuChangeReducer";
import signChangeReducer from "../reducer/signChangeReducer";

import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  paths: ["/welcome", "/signin", "/signup", "/homepage"],
  menuInfo: {
    title: "",
    content: "",
  },
};

const combinedReducers = combineReducers({
  menuChangeReducer,
  signChangeReducer,
});

const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools()
);
export default store;
