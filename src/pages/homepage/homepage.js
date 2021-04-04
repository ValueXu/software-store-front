import React from "react";
import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import "./homepage.less";
import { Link } from "react-router-dom";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Result
          icon={<SmileOutlined />}
          title="欢迎来到XXXX软件下载平台，点击下面按钮开始寻找软件吧"
          extra={
            <Link to="/softwares/software">
              <Button type="primary">开始浏览</Button>
            </Link>
          }
        />
      </>
    );
  }
}
