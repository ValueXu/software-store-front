import { message } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ajax } from "../../ajax/myAxios";
import MyMasonry from "../../components/my_masonry/MyMasonry";
import { menuChange } from "../../redux/action/menuChangeActions";

import "./Recommend.less";

class Recommend extends Component {
  state = {
    list: [],
  };

  interval = null;

  componentDidMount() {
    const { dispatch, menuInfo } = this.props;
    this.interval = setInterval(() => {
      if (menuInfo.title.toString() !== "为您推荐") {
        dispatch(
          menuChange({
            title: "为您推荐",
            content: "根据您刚刚下载的软件，您可能对这些软件感兴趣",
          })
        );
      }
    }, 500);

    this.requestList();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
      <div className="recommend">
        <MyMasonry list={this.state.list} />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return { menuInfo: state.menuChangeReducer.menuInfo };
};

export default connect(stateToProps)(Recommend);
