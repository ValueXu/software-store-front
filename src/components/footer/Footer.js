import React from "react";
import "./Footer.less";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        {/* <span>毕设：基于关联规则挖掘的软件下载平台</span> */}
        <span>作者：许伟</span>
        <span>导师：钱忠胜</span>
        <span>计算机171 信息管理学院 江西财经大学</span>
      </div>
    );
  }
}
