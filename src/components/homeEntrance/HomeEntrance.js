import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./HomeEntrance.less";

export default class HomeEntrance extends Component {
  state = {
    willUnmout: false,
  };

  componentWillUnmount() {
    // this.setState({
    //   willUnmout: true,
    // });
  }

  render() {
    return (
      <div
        className={
          this.state.willUnmout ? "home-entrance-willunmount" : "home-entrance"
        }
      >
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
        <Link className="homepage-link" to="/homepage">
          <div className="homepage-button-container">
            <Button className="button" type="primary">
              <p>进入首页</p>
            </Button>
          </div>
        </Link>
      </div>
    );
  }
}
