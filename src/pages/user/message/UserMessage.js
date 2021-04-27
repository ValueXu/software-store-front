import React, { Component } from "react";

import { Descriptions, Avatar, Tag } from "antd";

import { UserOutlined } from "@ant-design/icons";

import "./UserMessage.less";
import { connect } from "react-redux";
import { userType } from "../../../utils/typeMap";

class UserMessage extends Component {
  render() {
    const userInfo = this.props.userInfo;
    return (
      <div className="user-message">
        <Descriptions
          title="您的个人信息"
          bordered
          column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="头像">
            <Avatar size="large" icon={<UserOutlined />} />
          </Descriptions.Item>
          <Descriptions.Item label="昵称">{userInfo.name}</Descriptions.Item>
          <Descriptions.Item label="用户名">
            {userInfo.username}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">{userInfo.email}</Descriptions.Item>
          <Descriptions.Item label="用户类型">
            {<Tag color='magenta'>{userType(userInfo.type)}</Tag>}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}
const stateToProps = (state) => {
  return { ...state.signChangeReducer };
};
export default connect(stateToProps)(UserMessage);
