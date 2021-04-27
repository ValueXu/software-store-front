import { message, Popconfirm, Rate, Space, Table, Tooltip } from "antd";
import React, { Component } from "react";

import "./Scored.less";

const result = {
  list: [
    {
      id: "02",
      software_id: "01",
      name: "GTA V",
      comment: "太好了，敏感肌也能用，hhhhhhhhhhhhh",
      score: "4",
    },
    {
      id: "08",
      software_id: "02",
      name: "Visual Studio Code",
      comment: "太好了，敏感肌也能用",
      score: "4",
    },
    {
      id: "10",
      software_id: "03",
      name: "砍杀",
      comment: "太好了，敏感肌也能用",
      score: "2",
    },
    {
      id: "13",
      software_id: "10",
      name: "神机规则获取器",
      comment: "太好了，敏感肌也能用",
      score: "1",
    },
  ],
};

export default class Scored extends Component {
  constructor() {
    super();
    this.state = { datasource: [] };
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    let datasource = result.list.map((item, index) => {
      return {
        ...item,
        key: index,
        id: parseInt(item.id),
        score: parseInt(item.score),
        software_id: parseInt(item.software_id),
      };
    });
    this.setState({
      datasource,
    });
  };

  deleteScore = (id) => {
    console.log("删除的打分的id是：", id);
    message.success({
      content: "删除成功",
    });
    this.requestList();
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
            <a
              href="./"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              软件详情
            </a>
            <Popconfirm
              title="确认删除该评论吗？"
              onConfirm={() => {
                this.deleteScore(record.id);
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
