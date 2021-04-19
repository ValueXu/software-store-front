import { Form } from "antd";
import React, { Component } from "react";

const FormItem = Form.Item;

export default class Email extends Component {
  render() {
    return (
      <div className="Email">
        <Form>
          <FormItem name='邮箱地址'></FormItem>
        </Form>
      </div>
    );
  }
}
