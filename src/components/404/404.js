import React, { Component } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export default class NoMatch extends Component {
  render() {
    return (
      <>
        <Result
          status="404"
          title="404"
          subTitle="抱歉，没有找到您要访问的界面，点击回到首页。"
          extra={
            <Link to="/homepage">
              <Button type="primary">回到首页</Button>
            </Link>
          }
        />
      </>
    );
  }
}
