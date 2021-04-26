import React, { Component } from "react";

import "./Games.less";

const result = {
  list: [
    {
      id: "01",
      title: "GTA V",
      img: "/imgs/game1.png",
      description: "侠盗猎车手 第五部，一代版本一代神",
      score: "4.5",
    },
    {
      id: "02",
      img: "/imgs/game2.png",
      title: "上古卷轴：天际",
      description: "少女卷轴",
      score: "4",
    },
    {
      id: "03",
      img: "/imgs/game3.png",
      title: "Red Dead Redemption 2",
      description: "荒野大镖客2，R星的又一力作",
      score: "4",
    },
    {
      id: "04",
      img: "/imgs/game4.png",
      title: "极速地平线4",
      description: "感受肾上腺素水平在比赛中的此起彼伏",
      score: "4",
    },
    {
      id: "05",
      img: "/imgs/game5.png",
      title: "饥荒",
      description: "Don't starve. Or you'll ......",
      score: "4",
    },
  ],
};

export default class Games extends Component {
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return <div className="games">这里是游戏界面</div>;
  }
}
