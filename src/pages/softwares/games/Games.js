import { message } from "antd";
import React, { Component } from "react";
import { ajax } from "../../../ajax/myAxios";
import MyMasonry from "../../../components/my_masonry/MyMasonry";

import "./Games.less";

export default class Games extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    const config = {
      params: { type: 1 },
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
      <div className="games">
        <MyMasonry list={this.state.list} />
      </div>
    );
  }
}
