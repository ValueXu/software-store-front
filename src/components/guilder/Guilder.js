import React, { Component } from "react";
import { Menu } from "antd";
import MenuConfig from "../../menuConfig";
import { FcTimeline } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const { SubMenu } = Menu;

export default class Guilder extends Component {
  constructor() {
    super();
    this.state = {};
    this.menus = this.menuRender();
  }
  menus = [];

  menuRender = (menus = MenuConfig) => {
    return menus.map((item, index) => {
      if (item.child && item.child.length !== 0) {
        return (
          <SubMenu
            key={item.path}
            title={item.title}
            icon={item.icon || <FcTimeline />}
          >
            {this.menuRender(item.child)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.path} icon={item.icon || <FcTimeline />}>
            <NavLink to={item.path}>{item.title}</NavLink>
          </Menu.Item>
        );
      }
    });
  };
  render() {
    return (
      <>
        <Menu
          mode="inline"
          theme="light"
          style={{ width: 200 }}
          //   defaultSelectedKeys={[MenuConfig[0].title]}
        >
          {this.menus}
        </Menu>
      </>
    );
  }
}
