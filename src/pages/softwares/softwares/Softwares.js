import React, { Component } from "react";

import "./Softwares.less";
import MyMasonry from "../../../components/my_masonry/MyMasonry";
import { ajax } from "../../../ajax/myAxios";
import { message } from "antd";

// const result = {
//   list: [
//     {
//       id: "0",
//       name: "IntelliJ Idea",
//       type: "1",
//       description: "最强java ide",
//       imgUrl: "/assets/softwares-imgs/0.png",
//       downloadUrl: "/softwares-imgs/1.png",
//       score: "4",
//     },
//     {
//       id: "1",
//       name: "Visual Studio Code",
//       type: "1",
//       description: "剃头找它",
//       imgUrl: "/assets/softwares-imgs/1.png",
//       downloadUrl: "/softwares-imgs/1.png",
//       score: "4",
//     },
//     {
//       id: "2",
//       name: "FileZilla",
//       type: "1",
//       description: "强大的FTP连接工具",
//       imgUrl: "/assets/softwares-imgs/2.png",
//       downloadUrl: "/softwares-imgs/1.png",
//       score: "4",
//     },
//     {
//       id: "3",
//       name: "Visual Studio Code",
//       type: "1",
//       description: "剃头找它",
//       imgUrl: "/assets/softwares-imgs/1.png",
//       downloadUrl: "/softwares-imgs/1.png",
//       score: "4",
//     },
//     {
//       id: "4",
//       name: "Visual Studio Code",
//       type: "1",
//       description: "剃头找它",
//       imgUrl: "/assets/softwares-imgs/1.png",
//       downloadUrl: "/softwares-imgs/1.png",
//       score: "4",
//     },
//     {
//       id: "5",
//       name: "Visual Studio Code",
//       type: "1",
//       description: "剃头找它",
//       imgUrl: "/assets/softwares-imgs/1.png",
//       downloadUrl: "/softwares-imgs/1.png",
//       score: "4",
//     },
//     {
//       id: "6",
//       name: "Visual Studio Code",
//       type: "1",
//       description: "剃头找它",
//       imgUrl: "/assets/softwares-imgs/1.png",
//       downloadUrl: "/softwares-imgs/1.png",
//       score: "3",
//     },
//     {
//       id: "7",
//       name: "Visual Studio Code",
//       type: "1",
//       description: "剃头找它",
//       imgUrl: "/assets/softwares-imgs/1.png",
//       downloadUrl: "/softwares-imgs/1.png",
//       score: "5",
//     },
//     {
//       id: "8",
//       name: "Visual Studio Code",
//       type: "1",
//       description: "剃头找它",
//       imgUrl: "/assets/softwares-imgs/1.png",
//       downloadUrl: "/softwares-imgs/1.png",
//       score: "2",
//     },
//   ],
// };

export default class Softwares extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    const config = {
      params: { type: 2 },
      method: "GET",
      url: "/software/getAllByType",
    };
    let _this = this;
    ajax(config)
      .then((res) => {
        if (res.code === 1) {
          let result = [];
          result = res.result;
          let list = result.map((item) => {
            return {
              ...item,
              id: parseInt(item.id),
              score: parseInt(item.score),
            };
          });
          _this.setState({
            list,
          });
        } else {
          message.info({
            content: `${res.msg}`,
          });
        }
      })
      .catch((e) => {});
  };

  render() {
    return (
      <div className="softwares">
        <MyMasonry list={this.state.list} />
      </div>
    );
  }
}
