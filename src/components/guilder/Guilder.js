import React, { Component } from "react";
import { Menu } from "antd";
import MenuConfig from "../../menuConfig";
import { FcTimeline } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { menuChange } from "../../redux/action/menuChangeActions";

const { SubMenu } = Menu;

class Guilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: ["/homepage"],
    };
    this.menus = this.menuRender();
  }

  componentDidMount() {
    const locationToSelectedKey = () => {
      let selectedKeys = [window.location.pathname];
      if (this.state.selectedKeys[0] !== selectedKeys[0]) {
        this.setState({
          selectedKeys,
        });
      }
    };
    this.inteval = setInterval(locationToSelectedKey, 500);
  }

  componentWillUnmount() {
    clearInterval(this.inteval);
  }

  menus = [];

  onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    const { dispatch } = this.props;
    dispatch(
      menuChange({ title: item.props.title, content: item.props.content })
    );
    console.log(key, keyPath, selectedKeys);
    this.setState({
      selectedKeys,
    });
  };

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
      } else if (
        item.userType.includes(this.props.signChangeReducer.userInfo.type)
      ) {
        return (
          <Menu.Item
            key={item.path}
            icon={item.icon || <FcTimeline />}
            content={item.content}
            title={item.title}
          >
            <NavLink to={item.path}>{item.title}</NavLink>
          </Menu.Item>
        );
      }
      return null;
    });
  };
  render() {
    const collapsed =
      this.props.collapsed === undefined ? false : this.props.collapsed;
    return (
      <>
        <Menu
          mode="inline"
          theme="light"
          // style={{ width: 200 }}
          //   defaultSelectedKeys={[MenuConfig[0].title]}
          inlineCollapsed={collapsed}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
          {this.menus}
        </Menu>
      </>
    );
  }
}

const stateToProps = (state) => {
  return { ...state };
};

export default connect(stateToProps)(Guilder);
