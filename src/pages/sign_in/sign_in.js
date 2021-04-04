import React from "react";
import { Link } from "react-router-dom";

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        This is sign in page. 没有帐号？<Link to="/signup">点这注册</Link>
      </div>
    );
  }
}
