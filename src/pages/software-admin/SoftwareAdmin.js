import React, { Component } from "react";

import { Button, Card, message, Popconfirm, Space, Table } from "antd";

import "./SoftwareAdmin.less";
import Modal from "antd/lib/modal/Modal";
import Uploader from "./Uploader";

const result = {
  list: [
    {
      id: "01",
      name: "GTAV",
      type: 0,
    },
    {
      id: "02",
      name: "P图",
      type: 1,
    },
    {
      id: "03",
      name: "工具箱",
      type: 2,
    },
  ],
};

export default class SoftwareAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
    this.datasource = [];
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    let datasource = result.list.map((item, index) => {
      return { ...item, key: index };
    });
    this.setState({ datasource });
  };

  deleteItem = (id) => {
    console.log("删除的软件id", id);
    message.success({
      content: "删除成功",
    });
    this.requestList();
  };

  uploaderRef = React.createRef();

  handleUploadForm = () => {
    this.uploaderRef.current
      .validateFields()
      .then((values) => {
        async function submit() {
          console.log("上传的数据：", values);
          return Promise.resolve({ code: 0, msg: "success" });
        }
        submit()
          .then((res) => {
            if (res.code === 0) {
              message.success({
                content: "上传成功",
              });
              this.setState({
                isModalVisible: false,
              });
              this.uploaderRef.current.resetFields();
            }
          })
          .catch((err) => {
            message.error({
              content: `上传失败，${err}`,
            });
          });
      })
      .catch((err) => {});
  };

  columns = [
    {
      title: "软件名",
      dataIndex: "name",
      key: "name",
      width:'20%'
    },
    {
      title: "类别",
      dataIndex: "type",
      key: "type",
      width:'20%',
      render: (type) => {
        let text = "未知";
        switch (type) {
          case 0: {
            text = "游戏";
            break;
          }
          case 1: {
            text = "软件";
            break;
          }
          default: {
            text = "其他";
          }
        }
        return <p>{text}</p>;
      },
    },
    {
      title: "相关操作",
      render: (record) => {
        return (
          <Space>
            <a
              href="./"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ isModalVisible: true });
              }}
            >
              更新信息
            </a>|
            <Popconfirm
              title="确认删除这一项吗？"
              onConfirm={() => {
                this.deleteItem(record.id);
              }}
              okText="确认"
              cancelText="取消"
            >
              <a href="./">删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  render() {
    return (
      <div className="software-admin">
        <Button
          type="primary"
          style={{ margin: "2rem 0" }}
          onClick={() => {
            this.setState({ isModalVisible: true });
          }}
        >
          上传软件
        </Button>
        <Card title="已上传的软件" className="card">
          <Table columns={this.columns} dataSource={this.state.datasource} />
        </Card>
        <Modal
          visible={this.state.isModalVisible}
          onCancel={() => {
            this.setState({ isModalVisible: false });
          }}
          title="上传软件"
          okText="完成"
          cancelText="取消"
          onOk={this.handleUploadForm}
          forceRender
        >
          <Uploader formRef={this.uploaderRef} />
        </Modal>
      </div>
    );
  }
}
