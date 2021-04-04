import React, { Component } from "react";
import Left from "../left/Left";
import Header from "../header/Header";
import "./Wrapper.less";
import Footer from "../footer/Footer";

export default class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="wrapper">
        <div className="left-content">
          <Left />
        </div>
        <div className="right-content">
          <div className="header-wrapper">
            <Header />
          </div>
          <div className="content-wrapper">
            <div className="content-container">{this.props.children}</div>
          </div>
          <div className="footer-wrapper">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
