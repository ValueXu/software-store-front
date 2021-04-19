import { Form, Input } from "antd";
import React, { Component } from "react";

import "./UserPass.less";

const FormItem = Form.Item;

export default class UserPass extends Component {
  layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  form = React.createRef();

  onChange = () => {
    this.form.current.submit();
  };

  render() {
    return (
      <div className="user-pass">
        <Form
          {...this.layout}
          name="userpass"
          className="user-pass-form"
          ref={this.form}
          onChange={this.onChange}
        >
          <FormItem
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "用户名不能为空",
              },
            ]}
          >
            <Input type="text" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "密码不能为空",
              },
            ]}
          >
            <Input type="password" placeholder="请输入密码"></Input>
          </FormItem>
        </Form>
      </div>
    );
  }
}
