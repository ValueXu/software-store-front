import { Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { Component } from "react";

const FormItem = Form.Item;
const Option = Select.Option;

export default class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  render() {
    return (
      <div className="software-uploader">
        <Form ref={this.props.formRef} {...this.layout}>
          <FormItem
            name="name"
            label="软件名"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input type="text" placeholder="在这输入软件名" />
          </FormItem>
          <FormItem name="description" label="描述">
            <TextArea placeholder="在这输入软件的描述" />
          </FormItem>
          <FormItem
            name="type"
            label="类型"
            rules={[
              {
                required: true,
                message: "请选择软件类型",
              },
            ]}
          >
            <Select placeholder="请选择软件类型">
              <Option value="0">游戏</Option>
              <Option value="1">软件</Option>
              <Option value="2">其他</Option>
            </Select>
          </FormItem>
          <FormItem name="imgUrl" label="图片">
            <Input type="text" disabled />
          </FormItem>
          <FormItem
            name="downloadUrl"
            label="文件"
            rules={[
              {
                required: true,
                message: "请上传您的软件源文件",
              },
            ]}
          >
            <Input type="text" />
          </FormItem>
        </Form>
      </div>
    );
  }
}
