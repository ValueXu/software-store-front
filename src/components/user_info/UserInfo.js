import React, { Component } from "react";
import { Descriptions } from "antd";
import { userType } from "../../utils/typeMap";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="user_info"
        style={{ display: "inline-block", width: "14rem" }}
      >
        <Descriptions
          size="small"
          column={2}
          // style={{ width: "20rem" }}
        >
          <Descriptions.Item label="用户名" key={0}>
            {this.props.name}
          </Descriptions.Item>
          <Descriptions.Item label="用户等级" key={1}>
            {userType(this.props.type)}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}
