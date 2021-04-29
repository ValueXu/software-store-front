import React, { Component } from "react";

import "./Softwares.less";
import MyMasonry from "../../../components/my_masonry/MyMasonry";

const result = {
  list: [
    {
      id: "0",
      name: "IntelliJ Idea",
      type: "1",
      description: "最强java ide",
      imgUrl: "/assets/softwares-imgs/0.png",
      downloadUrl: "/softwares-imgs/1.png",
    },
    {
      id: "1",
      name: "Visual Studio Code",
      type: "1",
      description: "剃头找它",
      imgUrl: "/assets/softwares-imgs/1.png",
      downloadUrl: "/softwares-imgs/1.png",
    },
    {
      id: "2",
      name: "FileZilla",
      type: "1",
      description: "强大的FTP连接工具",
      imgUrl: "/assets/softwares-imgs/2.png",
      downloadUrl: "/softwares-imgs/1.png",
    },
    {
      id: "3",
      name: "Visual Studio Code",
      type: "1",
      description: "剃头找它",
      imgUrl: "/assets/softwares-imgs/1.png",
      downloadUrl: "/softwares-imgs/1.png",
    },
    {
      id: "4",
      name: "Visual Studio Code",
      type: "1",
      description: "剃头找它",
      imgUrl: "/assets/softwares-imgs/1.png",
      downloadUrl: "/softwares-imgs/1.png",
    },
    {
      id: "5",
      name: "Visual Studio Code",
      type: "1",
      description: "剃头找它",
      imgUrl: "/assets/softwares-imgs/1.png",
      downloadUrl: "/softwares-imgs/1.png",
    },
    {
      id: "6",
      name: "Visual Studio Code",
      type: "1",
      description: "剃头找它",
      imgUrl: "/assets/softwares-imgs/1.png",
      downloadUrl: "/softwares-imgs/1.png",
    },
    {
      id: "7",
      name: "Visual Studio Code",
      type: "1",
      description: "剃头找它",
      imgUrl: "/assets/softwares-imgs/1.png",
      downloadUrl: "/softwares-imgs/1.png",
    },
    {
      id: "8",
      name: "Visual Studio Code",
      type: "1",
      description: "剃头找它",
      imgUrl: "/assets/softwares-imgs/1.png",
      downloadUrl: "/softwares-imgs/1.png",
    },
  ],
};

export default class Softwares extends Component {
  state = {
    list: [],
  };
  componentDidMount() {
    this.requestList();
  }
  requestList = () => {
    let list = result.list;
    this.setState({
      list,
    });
  };

  render() {
    return (
      <div className="softwares">
        <MyMasonry list={this.state.list} />
      </div>
    );
  }
}
