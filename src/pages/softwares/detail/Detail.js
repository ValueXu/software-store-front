import { Comment, Rate, Spin, List, Image, Button, notification } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ajax, download } from "../../../ajax/myAxios";
import { menuChange } from "../../../redux/action/menuChangeActions";

import "./Detail.less";
import Editor from "./Editor";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {
        id: "3",
        name: "GTA V",
        author: "RockStar Game",
        desciption: "一代佳作",
        imgUrl: "/assets/softwares-imgs/2.png",
        downloadUrl: "/assets/softwares-imgs/3.png",
        score: "5",
      },
      scores: [],
      loading: true,
    };
  }

  componentDidMount() {
    if (this.props.match.params.id === undefined) {
      notification.error({
        message: "错误",
        description: "请回去先选择想要查看的软件",
      });
      return null;
    }
    this.id = this.props.match.params.id;
    this.requestResult(this.id);
  }
  requestResult = (id) => {
    let _this = this;
    const detailConfig = {
      method: "GET",
      url: "/software/getById",
      params: {
        id,
      },
    };
    ajax(detailConfig).then((res) => {
      if (res.code === 1) {
        const { dispatch, menuInfo } = _this.props;
        setTimeout(() => {
          if (menuInfo.title.toString !== "详情") {
            dispatch(menuChange({ title: "详情" }));
          }
        }, 500);
        _this.setState({
          detail: res.result,
          loading: false,
        });
      } else {
        notification.error({
          message: "获取软件详情错误",
          description: `${res.msg}`,
        });
      }
    });
    const scoresConfig = {
      method: "GET",
      url: "/scores/getAllBySoftware",
      params: {
        id,
      },
    };
    ajax(scoresConfig).then((res) => {
      if (res.code === 1) {
        _this.setState({
          scores: res.result,
        });
      } else {
        notification.error({
          message: "获取打分列表错误",
          description: `${res.msg}`,
        });
      }
    });
  };

  onDownload = (e) => {
    // e.preventDefault();
    const { userInfo } = this.props;
    const detail = this.state.detail;
    download(detail.downloadUrl, detail.id, userInfo.username);
  };

  render() {
    const { detail, scores } = this.state;
    const { name, imgUrl, description, score } = detail;
    return (
      <div className="software-detail">
        <Spin className="detail-spin" spinning={this.state.loading}>
          <h2 className="detail-title">{name}</h2>
          {/* <div className="detail-wrapper"></div> */}
          <div className="detail-left">
            <div className="detail-item">
              <span className="detail-label">软件名称：</span>
              <span className="detail-content">{name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">预览图：</span>
              <span className="detail-content">
                <Image
                  width={200}
                  // src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  src={imgUrl}
                />
                {/* <img src={imgUrl} alt={name} width={100} height="auto" /> */}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">介绍：</span>
              <span className="detail-content">{description}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">评分：</span>
              <span className="detail-content">
                <Rate onChange={() => {}} value={score} />
              </span>
            </div>
            <Link to={"/recommend/" + this.id} onClick={this.onDownload}>
              <Button
                type="primary"
                style={{ marginLeft: "6rem", marginTop: "1rem" }}
              >
                点击下载
              </Button>
            </Link>
          </div>
          <div className="detail-right">
            <List
              className="comment-list"
              header={`共 ${scores.length} 条评分`}
              itemLayout="horizontal"
              dataSource={scores}
              renderItem={(item) => {
                return (
                  <li>
                    <Comment
                      author={item.username}
                      avatar={item.avatar}
                      content={item.comment}
                    />
                  </li>
                );
              }}
            />
            <Comment
              content={
                <Editor
                  request={this.requestResult}
                  software_id={this.id}
                  username={this.props.userInfo.username}
                />
              }
            />
          </div>
        </Spin>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    menuInfo: state.menuChangeReducer.menuInfo,
    userInfo: state.signChangeReducer.userInfo,
  };
};

export default connect(stateToProps)(Detail);
