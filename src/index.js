import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
// import App from './App';
import reportWebVitals from "./reportWebVitals";

import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import { ConfigProvider } from "antd";

import { Provider } from "react-redux";
import store from "./redux/store/store";

import MyRouter from "./router";

moment.locale("zh-cn");

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <MyRouter />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
