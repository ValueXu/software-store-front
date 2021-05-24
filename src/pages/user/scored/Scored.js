import {
  message,
  notification,
  Popconfirm,
  Rate,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ajax } from "../../../ajax/myAxios";

import "./Scored.less";

class Scored extends Component {
  constructor() {
    super();
    this.state = { datasource: [] };
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    let _this = this;
    const { userInfo } = this.props;
    const username = userInfo.username;
    const config = {
      method: "GET",
      url: "/scores/getAllByUsername",
      params: {
        username,
      },
    };
    ajax(config).then((res) => {
      if (res.code === 1) {
        let datasource = res.result.map((item, index) => {
          return {
            ...item,
            key: index,
            id: parseInt(item.id),
            score: parseInt(item.score),
            software_id: parseInt(item.software_id),
          };
        });
        _this.setState({
          datasource,
        });
      } else if(!res.msg) {
        notification.error({
          message: "请求打分列表错误",
          description: `${res.msg}`,
        });
      }
    });
  };

  deleteScore = (software_id) => {
    let _this=this;
    const { userInfo } = this.props;
    const username = userInfo.username;
    const config = {
      method: "GET",
      url: "/scores/delete",
      params: {
        username,
        software_id,
      },
    };
    ajax(config).then(res=>{
      if(res.code===1){
        message.success({content:'删除成功'})
        _this.requestList();
      }else if(!res.msg){
        notification.error({
          message:'删除失败',
          description:`${res.msg}`
        })
      }
    })
  };

  columns = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
      width: "auto",
      sorter: (a, b) => {
        return a.id - b.id;
      },
    },
    {
      title: "软件名",
      dataIndex: "name",
      key: "name",
      width: "auto",
    },
    {
      title: "评论",
      dataIndex: "comment",
      key: "comment",
      render: (comment) => {
        const cutComment = (comment) => {
          if (comment.length > 10) {
            return (
              <Tooltip title={comment}>
                <span>{comment.slice(0, 9) + "......"}</span>
              </Tooltip>
            );
          }
          return comment;
        };
        return <Space>{cutComment(comment)}</Space>;
      },
    },
    {
      title: "分值",
      dataIndex: "score",
      key: "score",
      width: "auto",
      render: (score) => {
        const desc = ["坏透了", "坏", "正常", "好", "神作"];
        return (
          <Space>
            <Rate tooltips={desc} onChange={(e) => {}} value={score} />
            {score ? (
              <span className="ant-rate-text">{desc[score - 1]}</span>
            ) : (
              ""
            )}
          </Space>
        );
      },
      sorter: (a, b) => {
        return a.score - b.score;
      },
    },
    {
      title: "相关操作",
      width: "auto",
      render: (record) => {
        return (
          <Space>
            <Link to={"/detail/" + record.software_id}>软件详情</Link>
            <Popconfirm
              title="确认删除该评论吗？"
              onConfirm={() => {
                this.deleteScore(record.software_id);
              }}
              okText="确认"
              cancelText="取消"
            >
              <a
                href="./"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                删除打分
              </a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  render() {
    return (
      <div className="usercenter-scored">
        <Table columns={this.columns} dataSource={this.state.datasource} />
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    userInfo: state.signChangeReducer.userInfo,
  };
};

export default connect(stateToProps)(Scored);
