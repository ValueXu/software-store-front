import { Button, Form, Input, message, notification, Rate } from "antd";
import React, { Component } from "react";
import { ajax } from "../../../ajax/myAxios";

const { TextArea } = Input;

export default class Editor extends Component {
  state = {
    comment: "",
    score: 5,
  };
  onFinish = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((item) => {
      data.append(item, values[item]);
    });
    data.append("software_id", this.props.software_id);
    data.append("username", this.props.username);
    const config = {
      method: "POST",
      url: "/scores/add",
      data,
    };
    ajax(config).then((res) => {
      if (res.code === 1) {
        message.success({ content: "评论成功" });
        this.formRef.current.resetFields();
        this.props.request(this.props.software_id);
      } else {
        notification.info({
          message: "评论失败",
          description: `${res.msg}`,
        });
      }
    });
  };

  formRef = React.createRef();

  render() {
    return (
      <>
        <Form ref={this.formRef} onFinish={this.onFinish}>
          <Form.Item name="score">
            <Rate
              onChange={(score) => {
                this.setState({ score });
              }}
              value={this.state.score}
            />
          </Form.Item>
          <Form.Item name="comment">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="sumbit" type="primary">
              添加打分
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
