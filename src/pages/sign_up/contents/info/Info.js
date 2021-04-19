import { Form, Input, Select } from "antd";
import React, { Component } from "react";
import "./Info.less";

const FormItem = Form.Item;
const { Option } = Select;

export default class Info extends Component {
  state = {
    selectValue: null,
  };

  layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  form = React.createRef();

  onChange = (values) => {
    // console.log(this.form.current.getFieldsValue());
    this.form.current.submit();
    // console.log(values);
  };

  onSelectChange = (value) => {
    this.form.current.submit();
  };

  render() {
    return (
      <div className="info">
        <Form
          ref={this.form}
          {...this.layout}
          name="info"
          onChange={this.onChange}
          className="info-form"
        >
          <FormItem
            label="昵称："
            name="name"
            rules={[
              {
                required: true,
                message: "请输入对外昵称",
              },
            ]}
          >
            <Input type="text" placeholder="在这输入您的对外昵称吧"></Input>
          </FormItem>
          <FormItem
            label="邮箱："
            name="email"
            rules={[
              {
                required: true,
                message: "邮箱不能为空",
              },
            ]}
          >
            <Input type="email" placeholder="在这输入邮箱，方便我们联系您" />
          </FormItem>
          <FormItem
            label="用户类型"
            name="type"
            rules={[
              {
                required: true,
                message: "请选择您的用户类型",
              },
            ]}
          >
            <Select
              placeholder="选择您的帐号类型"
              allowClear
                onChange={this.onSelectChange}
            >
              <Option value={0}>普通用户</Option>
              <Option value={1}>开发人员</Option>
              <Option value={2}>管理员</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    );
  }
}
