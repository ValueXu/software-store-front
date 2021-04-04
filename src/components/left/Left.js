import React, { Component } from "react";
import Guilder from "../guilder/Guilder";

import "./Left.less";

export default class Left extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="left">
        <div className="logo-container"></div>
        <Guilder />
      </div>
    );
  }
}
