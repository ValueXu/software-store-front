import { message, notification, Popconfirm, Space, Table, Tag } from "antd";
import React, { Component } from "react";
import { ajax } from "../../ajax/myAxios";

import "./UserAdmin.less";

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
            text = "游客";
            color = "green";
            break;
          }
          case 2: {
            text = "管理员";
            color = "blue";
            break;
          }
          case 3: {
            text = "普通用户";
            color = "gold";
            break;
          }
          case 4: {
            text = "开发者";
            color = "pink";
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
              {record.type - 2 > 0 ? (
                <a
                  href="./"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  删除
                </a>
              ) : null}
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  requestList = () => {
    let datasource = [];

    const config = {
      method: "GET",
      url: "/user/getAll",
    };
    ajax(config).then((res) => {
      if (res.code === 1) {
        for (let i = 0; i < res.result.length; i++) {
          let item = res.result[i];
          if (parseInt(item) !== 0) {
            datasource.push({ ...item, key: i, type: parseInt(item.type) });
          }
        }
        this.setState({
          datasource,
        });
      } else if(!res.msg) {
        notification.error({
          message: "错误",
          description: `${res.msg}`,
        });
      }
    });
  };
  handleDelete = (username) => {
    const data = new FormData();
    data.append("username", username);
    const config = {
      method: "POST",
      url: "user/delete",
      data,
    };
    ajax(config).then((res) => {
      if (res.code === 1) {
        message.success({ content: "删除成功" });
        this.requestList();
      } else if(!res.msg) {
        notification.error({
          message: "删除失败",
          description: `${res.msg}`,
        });
      }
    });
  };
  render() {
    return (
      <div className="userAdmin">
        <Table columns={this.columns} dataSource={this.state.datasource} />
      </div>
    );
  }
}
