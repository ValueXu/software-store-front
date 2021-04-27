import { message, Popconfirm, Space, Table, Tag } from "antd";
import React, { Component } from "react";

import "./UserAdmin.less";

const result = {
  list: [
    {
      username: "valuexu",
      name: "xx",
      email: "valuexu@outlook.com",
      type: "1",
    },
    {
      username: "fackbook",
      name: "脸书",
      email: "xxx@xxx.com",
      type: "2",
    },
    {
      username: "alibaba",
      name: "阿里巴巴",
      email: "xxx@xxx.com",
      type: "2",
    },
    {
      username: "gifp",
      name: "鹏哥",
      email: "xxx@xxx.com",
      type: "1",
    },
    {
      username: "bai",
      name: "秋月之白",
      email: "xxx@xxx.com",
      type: "1",
    },
    {
      username: "backrunner",
      name: "逆行者",
      email: "xxx@xxx.com",
      type: "1",
    },
  ],
};

export default class UserAdmin extends Component {
  state = {
    datasource: [],
  };
  componentDidMount() {
    this.requestList();
  }
  columns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => {
        return a.username.localeCompare(b.username);
      },
    },
    {
      title: "昵称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      render: (email) => {
        return <a href={`mailto:${email}`}>{email}</a>;
      },
    },
    {
      title: "用户类型",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => {
        return a.type - b.type;
      },
      render: (type) => {
        let text = "";
        let color = "";
        switch (type) {
          case 1: {
            text = "普通用户";
            color = "green";
            break;
          }
          case 2: {
            text = "开发者";
            color = "blue";
            break;
          }
          case 3: {
            text = "管理员";
            color = "gold";
            break;
          }
          default: {
            text = "其他";
            color = "pink";
          }
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "操作",
      render: (record) => {
        return (
          <Space>
            <Popconfirm
              title="确认删除该用户吗"
              onConfirm={() => {
                this.handleDelete(record.username);
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
                删除
              </a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  requestList = () => {
    let datasource = [];
    for (let i = 0; i < result.list.length; i++) {
      let item = result.list[i];
      if (parseInt(item) !== 0) {
        datasource.push({ ...item, key: i, type: parseInt(item.type) });
      }
    }

    this.setState({
      datasource,
    });
  };
  handleDelete = (id) => {
    console.log(id);
    message.success({ content: "删除成功" });
  };
  render() {
    return (
      <div className="userAdmin">
        <Table columns={this.columns} dataSource={this.state.datasource} />
      </div>
    );
  }
}
