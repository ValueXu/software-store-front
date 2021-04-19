import React, { Component } from "react";

import { Button, Result } from "antd";

import { Link } from "react-router-dom";

export default class SignUpResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const status = this.props.result || "success";
    const title = this.props.info || "您已成功注册帐号";
    const subTitle =
      this.props.msg ||
      "现在，你可以作为XX用户的身份，浏览本网站并下载、管理软件了。祝您冲浪愉快";
    return (
      <div className="result">
        <Result
          status={status}
          title={title}
          subTitle={subTitle}
          extra={[
            <Link to="/signin" key="signin">
              <Button type="primary">点此登录</Button>
            </Link>,
            <Link to="/homepage" key="homepage">
              <Button>进入首页</Button>
            </Link>,
          ]}
        />
      </div>
    );
  }
}
