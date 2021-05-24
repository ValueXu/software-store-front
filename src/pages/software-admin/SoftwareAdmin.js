import React, { Component } from "react";

import {
  Button,
  Card,
  message,
  notification,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";

import "./SoftwareAdmin.less";
import Modal from "antd/lib/modal/Modal";
import Uploader from "./Uploader";
import { connect } from "react-redux";
import { ajax } from "../../ajax/myAxios";

class SoftwareAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
    this.datasource = [];
    this.isUpdateSubmite = false;
    this.software_id = null;
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    const { userInfo } = this.props;
    let url = "/software/getAllByAuthor";
    let params = { username: userInfo.username };
    if (userInfo.type === 2) {
      url = "/software/getAllSoftware";
    }
    const config = {
      method: "GET",
      url,
      params,
    };
    let _this = this;
    ajax(config).then((res) => {
      if (res.code === 1) {
        let datasource = res.result.map((item, index) => {
          return { ...item, key: index };
        });
        _this.setState({ datasource });
      } else if(!res.msg) {
        notification.error({
          message: "错误",
          description: `${res.msg}`,
        });
      }
    });
  };

  deleteItem = (id) => {
    console.log("删除的软件id", id);
    const config = {
      url: "/software/deleteSoftware",
      params: {
        software_id: id,
      },
    };
    ajax(config).then((res) => {
      if (res.code === 1) {
        message.success({
          content: "删除成功",
        });
        this.requestList();
      } else if(!res.msg) {
        notification.error({
          message: "删除失败",
          description: `${res.msg}`,
        });
      }
    });
  };

  onUpdate = (record) => {
    this.isUpdateSubmite = true;
    this.software_id = record.id;
    this.uploaderRef.current.setFieldsValue({
      ...record,
      img_url: record.imgUrl,
      download_url: record.downloadUrl,
    });
    this.setState({ isModalVisible: true });
  };

  uploaderRef = React.createRef();

  handleUploadForm = () => {
    let _this = this;
    this.uploaderRef.current
      .validateFields()
      .then((values) => {
        let url = "/software/uploadSoftware";
        let isUpdateSubmite = this.isUpdateSubmite;
        let id = this.software_id;
        let data = new FormData();
        const { userInfo } = this.props;
        const author = userInfo.username;
        data.append("author", author);
        Object.keys(values).forEach((item) => {
          data.append(item, values[item]);
        });
        if (isUpdateSubmite) {
          url = "/software/updateSoftware";
          data.append("id", id);
        }
        const config = {
          method: "POST",
          url,
          data,
        };
        ajax(config).then((res) => {
          if (res.code === 1) {
            let content = "上传成功";
            if (isUpdateSubmite) {
              content = "更新成功";
            }
            message.success({
              content,
            });
            _this.setState({
              isModalVisible: false,
            });
            _this.isUpdateSubmite = false;
            _this.uploaderRef.current.resetFields();
            _this.requestList();
          } else if(!res.msg) {
            notification.error({
              message: "上传失败",
              description: `${res.msg}`,
            });
          }
        });
      })
      .catch((err) => {});
  };

  columns = [
    {
      title: "软件名",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "类别",
      dataIndex: "type",
      key: "type",
      width: "20%",
      render: (type) => {
        let text = "未知";
        let color = "magenta";
        switch (type) {
          case 1: {
            text = "游戏";
            color = "magenta";
            break;
          }
          case 2: {
            text = "软件";
            color = "cyan";
            break;
          }
          default: {
            text = "其他";
            color = "geekblue";
          }
        }
        return <Tag color={color}>{text}</Tag>;
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
                this.onUpdate(record);
              }}
            >
              更新信息
            </a>
            |
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
            this.isUpdateSubmite = false;
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
            this.isUpdateSubmite = false;
            this.setState({ isModalVisible: false });
            this.uploaderRef.current.resetFields();
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

const stateToProps = (state) => {
  return {
    userInfo: state.signChangeReducer.userInfo,
  };
};

export default connect(stateToProps)(SoftwareAdmin);
