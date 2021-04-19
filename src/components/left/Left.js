import React, { Component } from "react";
import { Button } from "antd";
import Guilder from "../guilder/Guilder";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import "./Left.less";

export default class Left extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className="left">
        <div className="menu-change">
          <Button
            onClick={this.toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {this.state.collapsed ? (
              <MenuUnfoldOutlined />
            ) : (
              <MenuFoldOutlined />
            )}
          </Button>
        </div>
        <Guilder collapsed={this.state.collapsed} />
      </div>
    );
  }
}
