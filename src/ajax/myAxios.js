import { notification } from "antd";
import axios from "axios";

import { backEndUrl } from "../configs/baseUrl";

const ajax = ({ method, url, params, data, headers }) => {
  const token = localStorage.getItem("token");
  const baseURL = backEndUrl;
  let promise = new Promise((resolve, reject) => {
    axios({
      url,
      method,
      baseURL,
      timeout: 5000,
      params,
      headers: { ...headers, Authorization: `${token}` },
      data,
    })
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
          return;
        }
        if (res.status === 403) {
          notification.error({
            message: "权限错误",
            description: "当前用户权限不足，请重新登录",
          });
          resolve(res.data);
          return;
        }
        notification.error({
          message: "请求错误",
          description: `${res.data.msg}`,
        });
        resolve(res.data);
        return;
      })
      .catch((e) => {
        notification.error({
          message: "请求错误",
          description: `${e}`,
        });
        resolve(e);
      });
  });
  return promise;
};

const download = (url, software_id, username) => {
  const data = new FormData();
  data.append("software_id", software_id);
  data.append("username", username);

  const config = {
    method: "POST",
    data,
    url: "/record/add",
  };
  ajax(config);
  // window.history.pushState({}, "", `/recommend/${software_id}`);
  // console.log(url);
  window.open(url, "_blank");
};

export { ajax, download };
