import React, { Component } from "react";
import { PageHeader } from "antd";
import { connect } from "react-redux";
import UserInfo from "../user_info/UserInfo";

// import { userType } from "../../utils/typeMap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const userInfo = this.props.userInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <div className="header">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={menuInfo.title}
          subTitle={menuInfo.content}
          extra={<UserInfo name={userInfo.name} type={userInfo.type} />}
        ></PageHeader>
      </div>
    );
  }
}

const stateToProps = (state) => {
  const props = {
    menuInfo: state.menuChangeReducer.menuInfo,
    userInfo: state.signChangeReducer.userInfo,
  };
  return props;
};

export default connect(stateToProps)(Header);
